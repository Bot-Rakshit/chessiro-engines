#!/usr/bin/env python3
"""Simple HTTP server with COOP/COEP headers for SharedArrayBuffer support."""
import http.server
import os
import sys
from pathlib import Path

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
ROOT = Path(sys.argv[2]).resolve() if len(sys.argv) > 2 else Path(__file__).resolve().parents[1]
os.chdir(ROOT)

class CORSHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def guess_type(self, path):
        if path.endswith('.wasm'):
            return 'application/wasm'
        if path.endswith('.js'):
            return 'application/javascript'
        return super().guess_type(path)

print(f"Serving {ROOT} on http://localhost:{PORT} with COOP/COEP headers")
print(f"Open http://localhost:{PORT}/pages/bench-compat-vs-chesscom.html")
print(f"Open http://localhost:{PORT}/pages/match-depth-handicap-no-draw.html")
http.server.HTTPServer(('', PORT), CORSHandler).serve_forever()
