#!/usr/bin/env node
// Generic UCI stdin/stdout adapter for emscripten Stockfish builds.
//
//   node tools/uci-node.js engines/sf19/sf19-st.js
//   node tools/uci-node.js engines/compat/sf18-compat-st.js
//
// Works with the Chessiro SF19 builds (chessiro_command export) and the older
// nmrugg-style builds (command export). Used by the match/bench scripts and
// usable with cutechess-cli / fastchess as an engine command line.

"use strict";

const path = require("path");
const readline = require("readline");

const file = path.resolve(process.argv[2] || "");
if (!file) {
    console.error("usage: uci-node.js <engine.js>");
    process.exit(2);
}

const factory = require(file);
const wasmPath = file.replace(/\.js$/, ".wasm");

let inst = null;
let cmdName = null;      // exported entry point
let asyncGo = false;     // single-threaded (asyncify) builds need async ccall for long commands
let searching = false;   // waiting for bestmove
let inflight = false;
const startup = [];
const queue = [];
let quitting = false;

const PASSTHROUGH = /^(stop|ponderhit|isready|quit|uci|d)\b/;

function out(line) {
    if (/^bestmove\b/.test(line)) { searching = false; if (!inflight) setTimeout(flush, 0); }
    process.stdout.write(line + "\n");
}

function isBusy() { return searching || inflight; }

function send(cmd) {
    const isGo = /^go\b/.test(cmd) && !/^go\s+perft\b/.test(cmd);
    const isLong = isGo || /^(bench|speedtest)\b/.test(cmd);
    if (isGo) searching = true;
    if (asyncGo && isLong) {
        inflight = true;
        Promise.resolve(inst.ccall(cmdName, null, ["string"], [cmd], { async: true }))
            .then(() => { inflight = false; searching = false; setTimeout(flush, 0); },
                  (e) => { inflight = false; searching = false; out("info string ERROR: " + e); setTimeout(flush, 0); });
    } else {
        inst.ccall(cmdName, null, ["string"], [cmd]);
    }
    if (cmd === "quit") {
        quitting = true;
        setTimeout(() => process.exit(0), 20);
    }
}

function flush() { while (queue.length && !isBusy()) send(queue.shift()); }

function handle(cmd) {
    cmd = String(cmd).trim();
    if (!cmd || quitting) return;
    if (!inst) { startup.push(cmd); return; }
    if (isBusy() && !PASSTHROUGH.test(cmd)) { queue.push(cmd); return; }
    send(cmd);
}

factory({
    locateFile: (p) => (/\.wasm$/.test(p) ? wasmPath : p),
    listener: out,
    print: out,
    printErr: out,
}).then((m) => {
    inst = m;
    if (typeof m._chessiro_command === "function") cmdName = "chessiro_command";
    else if (typeof m._command === "function") cmdName = "command";
    else { console.error("no UCI entry point export found"); process.exit(1); }
    // Asyncify builds expose asyncify_* helpers on the exports; use that as the signal.
    asyncGo = !!(m.asm && m.asm.asyncify_start_unwind) || /asyncify|Asyncify/.test(factory.toString());
    // nmrugg builds: wait for _isReady in multi-threaded mode
    const start = () => { const s = startup.splice(0); s.forEach(handle); };
    if (typeof m._isReady === "function") {
        (function waitReady() { if (!m._isReady()) return setTimeout(waitReady, 5); start(); }());
    } else start();
});

readline.createInterface({ input: process.stdin, terminal: false })
    .on("line", handle)
    .on("close", () => {
        (function waitIdle() {
            if (inst && !isBusy() && queue.length === 0) return handle("quit");
            setTimeout(waitIdle, 20);
        }());
    });
