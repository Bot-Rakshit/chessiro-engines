#!/usr/bin/env python3
"""Static server for local testing.

    python3 tools/serve.py [port] [root] [--no-coi]

By default sends COOP/COEP headers so that SharedArrayBuffer (multi-threaded
engines) works. Pass --no-coi to simulate a host without those headers, which
is what the single-threaded builds are for.
"""
import http.server
import os
import sys
from pathlib import Path

args = [a for a in sys.argv[1:] if not a.startswith('--')]
NO_COI = '--no-coi' in sys.argv
PORT = int(args[0]) if len(args) > 0 else 8080
ROOT = Path(args[1]).resolve() if len(args) > 1 else Path(__file__).resolve().parents[1]
os.chdir(ROOT)


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        if not NO_COI:
            self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
            self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
        self.send_header('Cross-Origin-Resource-Policy', 'cross-origin')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

    def guess_type(self, path):
        if path.endswith('.wasm'):
            return 'application/wasm'
        if path.endswith('.js'):
            return 'application/javascript'
        return super().guess_type(path)

    def log_message(self, fmt, *a):
        if os.environ.get('SERVE_VERBOSE'):
            super().log_message(fmt, *a)


class Server(http.server.ThreadingHTTPServer):
    allow_reuse_address = True


print(f"Serving {ROOT} on http://localhost:{PORT} ({'no COOP/COEP' if NO_COI else 'with COOP/COEP headers'})")
print(f"  http://localhost:{PORT}/pages/sf19-selftest.html")
Server(('', PORT), Handler).serve_forever()
