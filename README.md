# chessiro-engines

Production-focused WASM Stockfish builds for Chessiro.

## Engines

- `sf18-compat-st` (single-thread)
  - Files: `engines/compat/sf18-compat-st.js`, `engines/compat/sf18-compat-st.wasm`
  - Best fallback for all browsers/devices
- `sf18-compat-mt` (multi-thread)
  - Files: `engines/compat/sf18-compat-mt.js`, `engines/compat/sf18-compat-mt.wasm`
  - Higher throughput when `SharedArrayBuffer` is available

## Quick Start (Local)

From repo root:

```bash
python3 tools/serve.py 8090
```

Open:

- `http://localhost:8090/pages/`

## Using The Engine In Your App

### Single-thread (recommended default)

```js
const engine = new Worker('/engines/compat/sf18-compat-st.js');

engine.onmessage = (e) => {
  const line = String(e.data || '');
  console.log(line);
};

engine.postMessage('uci');
engine.postMessage('isready');
engine.postMessage('ucinewgame');
engine.postMessage('position startpos');
engine.postMessage('go movetime 1000');
```

### Multi-thread (when SAB is enabled)

```js
const engine = new Worker('/engines/compat/sf18-compat-mt.js');

engine.onmessage = (e) => {
  const line = String(e.data || '');
  console.log(line);
};

engine.postMessage('uci');
engine.postMessage('setoption name Threads value 4');
engine.postMessage('isready');
engine.postMessage('position startpos');
engine.postMessage('go movetime 1000');
```

## Deployment Notes

- For MT builds, serve with cross-origin isolation headers:
  - `Cross-Origin-Opener-Policy: same-origin`
  - `Cross-Origin-Embedder-Policy: require-corp`
- Keep `.js` and `.wasm` together at stable URLs.
- Prefer gzip/brotli for network transfer.

## License

See `LICENSE`.
