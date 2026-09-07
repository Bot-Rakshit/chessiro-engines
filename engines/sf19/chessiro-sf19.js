/*
 * chessiro-sf19.js — picks the best Stockfish 19 WASM build for this device.
 *
 * Usage (main thread):
 *
 *   <script src="/engines/sf19/chessiro-sf19.js"></script>
 *   const pick = await ChessiroSF19.select({ baseUrl: "/engines/sf19/" });
 *   // pick = { variant: "sf19-mt-relaxed", url: ".../sf19-mt-relaxed.js", threads: true, simd: "relaxed", maxThreads: 8 }
 *   const engine = new Worker(pick.url);
 *   engine.onmessage = (e) => console.log(e.data);
 *   engine.postMessage("uci");
 *   if (pick.threads) engine.postMessage("setoption name Threads value " + pick.maxThreads);
 *
 * Or in one call:  const engine = await ChessiroSF19.createWorker({ baseUrl: "/engines/sf19/" });
 *
 * Variant matrix (all embed the same 1.2 MB network, identical playing strength per node):
 *
 *   sf19-mt-relaxed  pthreads + relaxed SIMD   fastest; needs SharedArrayBuffer (COOP/COEP headers)
 *   sf19-mt          pthreads + SIMD
 *   sf19-st-relaxed  single thread + relaxed SIMD
 *   sf19-st          single thread + SIMD      works everywhere modern (Safari 16.4+, Chrome 91+, Firefox 89+)
 *   sf19-st-nosimd   single thread, scalar     last resort for very old browsers (~4x slower)
 *
 * Works as a classic script, CommonJS module (Node) or via import() (UMD).
 */
(function (root, factory) {
    if (typeof module === "object" && module.exports) module.exports = factory();
    else root.ChessiroSF19 = factory();
}(typeof self !== "undefined" ? self : this, function () {
    "use strict";

    // Feature-test modules (from the wasm-feature-detect project, MIT).
    var SIMD_MODULE = new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11]);
    var RELAXED_MODULE = new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11]);
    var THREADS_MODULE = new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]);

    function validate(bytes) {
        try { return typeof WebAssembly === "object" && WebAssembly.validate(bytes); } catch (e) { return false; }
    }

    function hasThreads() {
        if (!validate(THREADS_MODULE)) return false;
        if (typeof SharedArrayBuffer === "undefined") return false;
        // Node has SAB unconditionally; browsers need cross-origin isolation.
        var isNode = typeof process === "object" && process.versions && process.versions.node;
        if (isNode) return true;
        if (typeof crossOriginIsolated !== "undefined" && !crossOriginIsolated) return false;
        try {
            // Verifies SAB is actually postMessage-able (some engines expose the constructor but block sharing).
            new MessageChannel().port1.postMessage(new SharedArrayBuffer(1));
            return true;
        } catch (e) { return false; }
    }

    function hardwareThreads() {
        var n = 1;
        try {
            if (typeof navigator !== "undefined" && navigator.hardwareConcurrency) n = navigator.hardwareConcurrency;
            else if (typeof require === "function") n = require("os").cpus().length;
        } catch (e) {}
        return Math.max(1, n | 0);
    }

    function detect() {
        var simd = validate(SIMD_MODULE);
        return {
            wasm: typeof WebAssembly === "object",
            simd: simd,
            relaxedSimd: simd && validate(RELAXED_MODULE),
            threads: hasThreads(),
            hardwareConcurrency: hardwareThreads()
        };
    }

    /**
     * @param {Object=} opts
     * @param {string=} opts.baseUrl   directory holding the sf19-*.js/.wasm files (default: this script's directory)
     * @param {boolean=} opts.allowThreads   set false to force single-threaded (default true)
     * @param {boolean=} opts.allowRelaxedSimd   set false to avoid relaxed-simd builds (default true)
     * @param {number=} opts.maxThreads   cap for the suggested thread count (default: cores - 1, min 1, max 16)
     */
    function select(opts) {
        opts = opts || {};
        var f = detect();
        if (!f.wasm) throw new Error("WebAssembly is not supported in this environment");

        var base = opts.baseUrl;
        if (base == null) {
            var src = (typeof document !== "undefined" && document.currentScript && document.currentScript.src) || "";
            base = src ? src.replace(/[^\/]*$/, "") : "";
        }
        if (base && !/\/$/.test(base)) base += "/";

        var threads = f.threads && opts.allowThreads !== false;
        var relaxed = f.relaxedSimd && opts.allowRelaxedSimd !== false;
        var simd = f.simd ? (relaxed ? "relaxed" : "simd") : "none";

        var variant;
        if (!f.simd) variant = "sf19-st-nosimd";
        else variant = "sf19-" + (threads ? "mt" : "st") + (relaxed ? "-relaxed" : "");

        var cores = f.hardwareConcurrency;
        var suggested = Math.max(1, Math.min(opts.maxThreads || 16, cores > 2 ? cores - 1 : cores));

        return {
            variant: variant,
            url: base + variant + ".js",
            wasmUrl: base + variant + ".wasm",
            threads: threads,
            simd: simd,
            maxThreads: threads ? suggested : 1,
            features: f
        };
    }

    /** Creates a Worker running the best variant and applies the thread count. Returns the Worker. */
    function createWorker(opts) {
        var pick = select(opts);
        var w = new Worker(pick.url);
        w.chessiro = pick;
        if (pick.threads && pick.maxThreads > 1 && (!opts || opts.autoThreads !== false)) {
            w.postMessage("setoption name Threads value " + pick.maxThreads);
        }
        return w;
    }

    return { detect: detect, select: select, createWorker: createWorker, version: "19.0.0" };
}));
