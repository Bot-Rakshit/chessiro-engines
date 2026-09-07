#!/usr/bin/env node
// Headless-Chrome smoke test for every SF19 variant, with and without
// cross-origin isolation.
//
//   npm i puppeteer-core            (once, anywhere; set PPTR_DIR if not cwd)
//   node tools/browser-test.js [chrome-path]
//
// Starts tools/serve.py twice (COOP/COEP on :18791, plain on :18792), opens
// pages/sf19-selftest.html?autorun&variant=... in headless Chrome and prints
// the self-test verdict for each variant.

"use strict";
const path = require("path");
const { spawn } = require("child_process");

const root = path.resolve(__dirname, "..");
const pptrDir = process.env.PPTR_DIR || process.cwd();
const puppeteer = require(require.resolve("puppeteer-core", { paths: [pptrDir, root] }));

const chromePath = process.argv[2] || process.env.CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

function serve(port, isolated) {
    const p = spawn("python3", [path.join(root, "tools/serve.py"), String(port), root, ...(isolated ? [] : ["--no-coi"])], { stdio: "ignore" });
    return p;
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
    const s1 = serve(18791, true), s2 = serve(18792, false);
    await wait(800);
    const browser = await puppeteer.launch({ executablePath: chromePath, headless: true,
        args: ["--no-sandbox", "--enable-features=WebAssemblyExperimentalJSPI"] });
    const cases = [
        [18791, "auto"], [18791, "sf19-mt-relaxed"], [18791, "sf19-mt"],
        [18792, "auto"], [18792, "sf19-st-relaxed"], [18792, "sf19-st"], [18792, "sf19-st-nosimd"],
    ];
    let failed = 0;
    for (const [port, variant] of cases) {
        const page = await browser.newPage();
        const errors = [];
        page.on("pageerror", (e) => errors.push(String(e)));
        page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
        const url = `http://localhost:${port}/pages/sf19-selftest.html?autorun&variant=${variant}&depth=14`;
        const resp = await page.goto(url);
        if (!resp || !resp.ok()) errors.push("http " + (resp && resp.status()));
        try {
            await page.waitForFunction("window.__results && window.__results.done", { timeout: 120000 });
        } catch (e) { errors.push("timeout"); }
        const r = (await page.evaluate("window.__results")) || {};
        const coi = await page.evaluate("self.crossOriginIsolated");
        const tag = `${port === 18791 ? "COI " : "noCOI"} ${variant.padEnd(16)} -> ${(r.variant || "?").padEnd(16)}`;
        if (r.ok) console.log(`PASS ${tag} load=${r.loadMs}ms nps=${r.nps} stop=${r.stopLatencyMs}ms coi=${coi} threads=${r.features && r.features.threads}`);
        else { failed++; console.log(`FAIL ${tag} status=${r.status} errors=${errors.join(" | ")}`); console.log((r.lines || []).slice(-8).join("\n")); }
        await page.close();
    }
    await browser.close();
    s1.kill(); s2.kill();
    process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
