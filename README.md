# chessiro-engines

Production WebAssembly builds of **Stockfish 19** for Chessiro — small (1.7 MB per
variant, network included), fast, and runnable on every device that has
WebAssembly.

| File | Threads | SIMD | Needs | Use when |
|---|---|---|---|---|
| `engines/sf19/sf19-mt-relaxed.js/.wasm` | pthreads | relaxed | SharedArrayBuffer (COOP/COEP) + relaxed-simd | Fastest. Chrome/Edge 114+, Firefox 134+, Node 20+ |
| `engines/sf19/sf19-mt.js/.wasm` | pthreads | simd | SharedArrayBuffer (COOP/COEP) | Safari 16.4+ with COI, older Chrome/Firefox |
| `engines/sf19/sf19-st-relaxed.js/.wasm` | 1 | relaxed | relaxed-simd | No COI headers, modern browser |
| `engines/sf19/sf19-st.js/.wasm` | 1 | simd | wasm SIMD | **Universal default.** iOS/Safari 16.4+, Chrome 91+, Firefox 89+ |
| `engines/sf19/sf19-st-nosimd.js/.wasm` | 1 | none | any wasm | Last resort (≈4× slower): Safari < 16.4, old Android WebViews |

`engines/sf19/chessiro-sf19.js` is a tiny loader that feature-detects
SIMD / relaxed-SIMD / SharedArrayBuffer and returns the right file, so you never
have to think about the table above.

Every variant embeds the same network and produces bit-identical search
results (`bench` = 2793281, same as the native engine); they differ only in speed.

## Quick start

```html
<script src="/engines/sf19/chessiro-sf19.js"></script>
<script>
  // Picks the best variant for this browser, spawns the Worker and sets Threads.
  const engine = ChessiroSF19.createWorker({ baseUrl: "/engines/sf19/" });
  engine.onmessage = (e) => console.log(e.data);   // one UCI line per message
  engine.postMessage("uci");
  engine.postMessage("position startpos moves e2e4");
  engine.postMessage("go movetime 1000");
</script>
```

Or choose explicitly — each `sf19-*.js` is itself a self-contained UCI Worker:

```js
const engine = new Worker("/engines/sf19/sf19-st.js");
engine.onmessage = (e) => console.log(e.data);
engine.postMessage("uci");
engine.postMessage("setoption name Hash value 32");
engine.postMessage("position fen r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3");
engine.postMessage("go depth 20");
// engine.postMessage("stop");  works mid-search in every variant
```

`ChessiroSF19.select({ baseUrl })` returns `{ variant, url, threads, simd, maxThreads, features }`
if you want to create the Worker yourself; `ChessiroSF19.detect()` returns the raw feature flags.

### Node

```bash
node engines/sf19/sf19-st.js          # interactive UCI on stdin/stdout
echo bench | node engines/sf19/sf19-mt-relaxed.js
node tools/uci-node.js engines/sf19/sf19-st.js   # generic adapter, also drives the old builds
```

## Behaviour notes

- **Protocol**: plain UCI over `postMessage`. Commands sent while a search is
  running are queued until `bestmove`, except `stop`, `ponderhit`, `isready`,
  `uci`, `d`, `quit`, which are delivered immediately (like a well-behaved GUI).
- **Bad input never kills the engine.** Stockfish 19 normally terminates the
  process on an invalid FEN or `go depth abc`; these builds answer with
  `info string ERROR: ...` and `bestmove (none)` instead.
- **Threads**: `setoption name Threads value N` (max 64) on `-mt` builds. Each
  thread is a Web Worker; leave one core for the UI. `-st` builds accept the
  option but ignore it.
- **Memory**: starts at 64 MB, grows on demand (`Hash` up to 2 GB in theory —
  keep it ≤ 256 MB on phones).
- **`quit`** closes the Worker.
- **Stop latency** on single-threaded builds is bounded by the yield interval
  (25 ms of wall time); multi-threaded builds react immediately.

## Serving

- `.js` and `.wasm` must live in the same directory (the `.js` derives the
  `.wasm` URL from its own URL). `Content-Type: application/wasm` and
  gzip/brotli (the wasm compresses to ≈ 1.1 MB).
- Multi-threaded builds only run when the *page* is cross-origin isolated:
  `Cross-Origin-Opener-Policy: same-origin` and
  `Cross-Origin-Embedder-Policy: require-corp` (or `credentialless`). Without them
  the loader transparently falls back to a single-threaded build.
- The pthread workers re-fetch the same `.js`; serve it with normal caching.

Local test server: `python3 tools/serve.py 8090` (COOP/COEP on) or
`python3 tools/serve.py 8091 . --no-coi`, then open
`http://localhost:8090/pages/sf19-selftest.html`.

## Results

Single thread, Node 26, Apple M4, `bench` NPS (higher is better):

| Build | Net | NPS |
|---|---|---|
| Stockfish 18 lite (chess.com `stockfish-18-lite-single`, 6.6 MB net) | 256×2 HalfKAv2, no threats | ≈ 1.55 M |
| **sf19-st** | 1024 P_hm (1.2 MB) | ≈ 1.30 M |
| **sf19-st-relaxed** (+PGO) | 1024 P_hm (1.2 MB) | ≈ 1.70 M |
| sf19-st-nosimd | 1024 P_hm (1.2 MB) | ≈ 0.29 M |
| sf19-mt-relaxed, 4 threads | | ≈ 4.2 M |
| Native SF 19 smallnet, apple-silicon, 1 thread | | ≈ 2.5 M |

Match, `sf19-st-relaxed` vs `sf18-compat-st` (Stockfish 18 lite build), 5s+0.05s,
Hash 32, 8moves_v3 openings, 300 games, both engines under Node:

```
Results of sf19-smallnet vs sf18-lite (5+0.05, 1t, 32MB, 8moves_v3.pgn):
Elo: 72.85 +/- 22.33, nElo: 132.30 +/- 39.32
LOS: 100.00 %, DrawRatio: 52.00 %, PairsRatio: 5.55
Games: 300, Wins: 78, Losses: 16, Draws: 206, Points: 181.0 (60.33 %)
Ptnml(0-2): [1, 10, 78, 48, 13], WL/DD Ratio: 0.05
--------------------------------------------------

Player: sf19-smallnet
  Timeouts: 2
```

The SF19 small network is 5.5× smaller than the SF18 lite network *and* much
stronger; the extra per-node cost of the 1024-wide layer is more than paid for.

## How it is built

`build/build.sh` clones Stockfish at the `sf_19` tag, applies
`build/patches/*.patch`, downloads the network and produces all variants with
profile-guided optimisation, verifying the bench signature of each output.

Patches:

1. `0001-simple-mirrored-piece-square-features.patch` — sscg13's
   *size-optimize-nnue* architecture (P_hm features, 1024×32×32), rebased onto
   SF 19 by Niklas Fiekas for lichess. Network `nn-61e7af4bb97d.nnue` (1.2 MB).
   Fishtest: +9.75 Elo vs a 15 MB SF 18 net.
2. `0002-Chessiro-WebAssembly-build-...patch` — everything WASM-specific:
   - `src/chessiro/`: em++ Makefile, C++ glue, Worker/Node JS glue, PGO script,
     network embedding through a wasm-dialect `.incbin` (no INCBIN, no FS, no
     separate fetch).
   - Single-threaded flavour: no pthreads; the search yields to the event loop
     from `check_time()` via Asyncify (`ASYNCIFY_IGNORE_INDIRECT`, measured
     overhead ≈ 3%), using a MessageChannel round-trip (setTimeout-free) in
     browsers and `setImmediate` in Node so `stop` is honoured within ~25 ms.
   - Multi-threaded flavour: the normal UCI loop runs on a proxied pthread and
     blocks on a mutex/condvar queue fed from the Worker's `onmessage`.
   - Malformed commands are reported instead of terminating the process.
   - `Threads` capped at 64, NUMA/log-file options hidden, `elapsed_time() >= 1`.
   - Direct (non-virtual) `SearchManager::check_time` call so the Asyncify call
     graph stays fully direct.

Compiler flags: `-O3 -flto -fno-exceptions -fno-rtti -msimd128 [-mrelaxed-simd]
-DUSE_SSE41 -DUSE_SLOPPY_ATOMICS -DNO_PREFETCH -DNO_TABLEBASES`, closure-compiled
JS, `INITIAL_MEMORY=64MB`, `ALLOW_MEMORY_GROWTH`, PGO from `bench`.

## Testing

- `node tools/browser-test.js` — headless Chrome, all variants, with and
  without cross-origin isolation (needs `npm i puppeteer-core`; set `PPTR_DIR`).
- `pages/sf19-selftest.html` — the same test, interactive.
- `tools/uci-node.js` — UCI adapter usable as a `fastchess`/`cutechess-cli`
  engine command (`cmd=node args="tools/uci-node.js engines/sf19/sf19-st.js"`).

## Legacy

`engines/compat/` (Stockfish 18 lite builds) and `engines/reference/`
(Stockfish 17 lite) are kept for comparison only.

## License

GPL-3.0 (Stockfish). See `LICENSE`. Network `nn-61e7af4bb97d.nnue` © the
Stockfish developers / sscg13, distributed under the same terms.
