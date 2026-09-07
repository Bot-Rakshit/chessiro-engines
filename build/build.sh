#!/usr/bin/env bash
# Reproducible build of every Chessiro Stockfish 19 WASM variant.
#
#   build/build.sh            # clone SF 19, apply patches, PGO-build all variants into engines/sf19/
#   build/build.sh st relaxed # build a single variant (FLAVOR SIMD)
#   NO_PGO=1 build/build.sh   # skip profile-guided optimisation (faster)
#
# Requirements: emscripten 5.x (em++ on PATH), node >= 18, git, curl, make.
set -euo pipefail

ROOT=$(cd "$(dirname "$0")/.." && pwd)
WORK=${WORK:-$ROOT/build/work}
SF_REPO=https://github.com/official-stockfish/Stockfish
SF_COMMIT=edb0d9db6731067ec50ce619ff372b463bc4dd5d   # tag sf_19
NNUE=nn-61e7af4bb97d.nnue
NNUE_URL=https://tests.stockfishchess.org/api/nn/$NNUE
OUT=$ROOT/engines/sf19
EXPECTED_BENCH=2793281

echo "emcc: $(emcc --version | head -1)"

mkdir -p "$WORK"
if [ ! -d "$WORK/Stockfish/.git" ]; then
  git clone -q "$SF_REPO" "$WORK/Stockfish"
fi
cd "$WORK/Stockfish"
git fetch -q origin
git checkout -q -f "$SF_COMMIT"
git clean -qfdx src >/dev/null || true
for p in "$ROOT"/build/patches/*.patch; do
  git -c user.name=build -c user.email=build@localhost am -q "$p"
done

cd src
if [ ! -f "$NNUE" ] || [ "$(shasum -a 256 "$NNUE" | cut -c1-12)" != "61e7af4bb97d" ]; then
  echo "downloading $NNUE"; curl -sSL -o "$NNUE" "$NNUE_URL"
fi
echo "net: $(shasum -a 256 "$NNUE" | cut -c1-12) $(stat -f%z "$NNUE" 2>/dev/null || stat -c%s "$NNUE") bytes"

variants=("st simd" "st relaxed" "st nosimd" "mt simd" "mt relaxed")
if [ $# -ge 2 ]; then variants=("$1 $2"); fi

mkdir -p "$OUT"
for v in "${variants[@]}"; do
  set -- $v
  FLAVOR=$1; SIMD=$2
  NAME=sf19-$FLAVOR; [ "$SIMD" != simd ] && NAME=$NAME-$SIMD
  echo
  echo "=================== $NAME"
  if [ -n "${NO_PGO:-}" ]; then
    make -f chessiro/Makefile FLAVOR=$FLAVOR SIMD=$SIMD -j"$(nproc 2>/dev/null || sysctl -n hw.ncpu)" 2>&1 | grep -E "error|warning: [^C]" || true
  else
    chessiro/pgo.sh $FLAVOR $SIMD -j"$(nproc 2>/dev/null || sysctl -n hw.ncpu)" 2>&1 | grep -E "^==|Nodes/second|error" || true
  fi
  cp chessiro/out/$NAME.js chessiro/out/$NAME.wasm "$OUT/"
  # verify: bench signature must match the native engine
  sig=$(printf 'setoption name Threads value 1\nbench\n' | node "$OUT/$NAME.js" 2>&1 | awk '/Nodes searched/ {print $4}')
  if [ "$sig" != "$EXPECTED_BENCH" ]; then echo "!! $NAME bench signature $sig != $EXPECTED_BENCH"; exit 1; fi
  echo "ok  $NAME  bench=$sig  $(stat -f%z "$OUT/$NAME.wasm" 2>/dev/null || stat -c%s "$OUT/$NAME.wasm") bytes"
done

echo
ls -la "$OUT"
