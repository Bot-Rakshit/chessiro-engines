# chessiro-engines

WASM engine pack and browser test pages for Chessiro.

This repo currently ships:

- `SF18 Compat ST (ours)`
- `SF18 Compat MT (ours)`
- `Chess.com SF17 Lite ST` reference build (for A/B testing)

## Repo Layout

- `engines/compat/`
  - `sf18-compat-st.js`
  - `sf18-compat-st.wasm`
  - `sf18-compat-mt.js`
  - `sf18-compat-mt.wasm`
- `engines/reference/`
  - `stockfish-17-lite-single.js`
  - `stockfish-17-lite-single.wasm`
- `pages/`
  - `bench-compat-vs-chesscom.html`
  - `match-2games-compat-vs-chesscom.html`
  - `match-depth-handicap-no-draw.html`
- `tools/`
  - `serve.py` (local COOP/COEP static server)

## Quick Start

From repo root:

```bash
python3 tools/serve.py 8090
```

Open:

- `http://localhost:8090/pages/bench-compat-vs-chesscom.html`
- `http://localhost:8090/pages/match-2games-compat-vs-chesscom.html`
- `http://localhost:8090/pages/match-depth-handicap-no-draw.html`

## Notes

- Use Chrome/Edge for stable Worker timing.
- MT engine needs SharedArrayBuffer-compatible environment (COOP/COEP).
- No-draw/eval-tiebreak match modes are useful for quick separation but are not a strict Elo measurement.

## License

`LICENSE` in this repo applies.

