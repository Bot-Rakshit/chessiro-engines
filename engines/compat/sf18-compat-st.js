var Sf18CompatSt=(()=>{var _scriptName=globalThis.document?.currentScript?.src;return async function(moduleArg={}){var moduleRtn;var h=moduleArg,aa=!!globalThis.window,m=!!globalThis.WorkerGlobalScope,n=globalThis.process?.versions?.node&&"renderer"!=globalThis.process?.type;h.print=function(a){h.listener?h.listener(a):console.log(a)};h.printErr=function(a){h.listener?h.listener(a):console.error(a)};h.terminate=function(){"undefined"!==typeof PThread&&PThread.G()};var q=[],t="./this.program",u=(a,b)=>{throw b;};"undefined"!=typeof __filename?_scriptName=__filename:m&&(_scriptName=self.location.href);var v="",w,y;
if(n){var fs=require("node:fs");v=__dirname+"/";y=a=>{a=z(a)?new URL(a):a;return fs.readFileSync(a)};w=async a=>{a=z(a)?new URL(a):a;return fs.readFileSync(a,void 0)};1<process.argv.length&&(t=process.argv[1].replace(/\\/g,"/"));q=process.argv.slice(2);u=(a,b)=>{process.exitCode=a;throw b;}}else if(aa||m){try{v=(new URL(".",_scriptName)).href}catch{}m&&(y=a=>{var b=new XMLHttpRequest;b.open("GET",a,!1);b.responseType="arraybuffer";b.send(null);return new Uint8Array(b.response)});w=async a=>{a=await fetch(a,
{credentials:"same-origin"});if(a.ok)return a.arrayBuffer();throw Error(a.status+" : "+a.url);}}var B=console.log.bind(console),C=console.error.bind(console),D=!1,z=a=>a.startsWith("file://"),E,F,G,H,I,J,ba,K,ca=!1;function da(){var a=L.buffer;G=new Int8Array(a);new Int16Array(a);H=new Uint8Array(a);new Uint16Array(a);I=new Int32Array(a);J=new Uint32Array(a);new Float32Array(a);ba=new Float64Array(a);K=new BigInt64Array(a);new BigUint64Array(a)}
function M(a){a="Aborted("+a+")";C(a);D=!0;a=new WebAssembly.RuntimeError(a+". Build with -sASSERTIONS for more info.");F?.(a);throw a;}var ea;async function fa(a){try{var b=await w(a);return new Uint8Array(b)}catch{}if(y)a=y(a);else throw"both async and sync fetching of the wasm failed";return a}async function ha(a,b){try{var d=await fa(a);return await WebAssembly.instantiate(d,b)}catch(c){C(`failed to asynchronously prepare wasm: ${c}`),M(c)}}
async function ia(a){var b=ea;if(!n)try{var d=fetch(b,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(d,a)}catch(c){C(`wasm streaming compile failed: ${c}`),C("falling back to ArrayBuffer instantiation")}return ha(b,a)}class N{name="ExitStatus";constructor(a){this.message=`Program terminated with exit(${a})`;this.status=a}}
var ja=globalThis.TextDecoder&&new TextDecoder,ka=(a,b=0)=>{var d=b;for(var c=d+void 0;a[d]&&!(d>=c);)++d;if(16<d-b&&a.buffer&&ja)return ja.decode(a.subarray(b,d));for(c="";b<d;){var e=a[b++];if(e&128){var g=a[b++]&63;if(192==(e&224))c+=String.fromCharCode((e&31)<<6|g);else{var f=a[b++]&63;e=224==(e&240)?(e&15)<<12|g<<6|f:(e&7)<<18|g<<12|f<<6|a[b++]&63;65536>e?c+=String.fromCharCode(e):(e-=65536,c+=String.fromCharCode(55296|e>>10,56320|e&1023))}}else c+=String.fromCharCode(e)}return c},O=(a,b,d)=>
{var c=H;if(!(0<d))return 0;var e=b;d=b+d-1;for(var g=0;g<a.length;++g){var f=a.codePointAt(g);if(127>=f){if(b>=d)break;c[b++]=f}else if(2047>=f){if(b+1>=d)break;c[b++]=192|f>>6;c[b++]=128|f&63}else if(65535>=f){if(b+2>=d)break;c[b++]=224|f>>12;c[b++]=128|f>>6&63;c[b++]=128|f&63}else{if(b+3>=d)break;c[b++]=240|f>>18;c[b++]=128|f>>12&63;c[b++]=128|f>>6&63;c[b++]=128|f&63;g++}}c[b]=0;return b-e},P=[],Q={},la=()=>{if(!R){var a={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",
LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:t||"./this.program"},b;for(b in Q)void 0===Q[b]?delete a[b]:a[b]=Q[b];var d=[];for(b in a)d.push(`${b}=${a[b]}`);R=d}return R},R,ma=a=>{for(var b=0,d=0;d<a.length;++d){var c=a.charCodeAt(d);127>=c?b++:2047>=c?b+=2:55296<=c&&57343>=c?(b+=4,++d):b+=3}return b},na=[null,[],[]],oa=a=>{var b=ma(a)+1,d=S(b);O(a,d,b);return d},T=a=>{try{a()}catch(b){M(b)}},pa=a=>{if(!D)try{return a()}catch(b){b instanceof N||"unwind"==b||u(1,b)}finally{}};
function qa(a){var b=(...d)=>{U.push(a);try{return a(...d)}finally{D||(U.pop(),V&&1===W&&0===U.length&&(W=0,T(ra),"undefined"!=typeof Fibers&&Fibers.H()))}};sa.set(a,b);return b}var W=0,V=null,ta=0,U=[],X=new Map,ua=new Map,sa=new Map,va=0,Y=null,wa=[];function xa(){return new Promise((a,b)=>{Y={resolve:a,reject:b}})}function ya(){var a=za(10485772),b=a+12;J[a>>2]=b;J[a+4>>2]=b+10485760;b=U[0];if(!X.has(b)){var d=va++;X.set(b,d);ua.set(d,b)}b=X.get(b);I[a+8>>2]=b;return a}
function Aa(){var a=ua.get(I[V+8>>2]);a=sa.get(a);return pa(a)}
function Ba(a){if(!D){if(0===W){var b=!1,d=!1;a((c=0)=>{if(!D&&(ta=c,b=!0,d)){W=2;T(()=>Ca(V));"undefined"!=typeof MainLoop&&MainLoop.C&&MainLoop.resume();c=!1;try{var e=Aa()}catch(l){e=l,c=!0}var g=!1;if(!V){var f=Y;f&&(Y=null,(c?f.reject:f.resolve)(e),g=!0)}if(c&&!g)throw e;}});d=!0;b||(W=1,V=ya(),"undefined"!=typeof MainLoop&&MainLoop.C&&MainLoop.pause(),T(()=>Da(V)))}else 2===W?(W=0,T(Ea),Fa(V),V=null,wa.forEach(pa)):M(`invalid state: ${W}`);return ta}}var Ga=a=>Ba(async b=>{b(await a())});
h.print&&(B=h.print);h.printErr&&(C=h.printErr);h.ccall=(a,b,d,c,e)=>{function g(k){0!==r&&Ha(r);return"string"===b?k?ka(H,k):"":"boolean"===b?!!k:k}var f={string:k=>{var A=0;null!==k&&void 0!==k&&0!==k&&(A=oa(k));return A},array:k=>{var A=S(k.length);G.set(k,A);return A}};a=h["_"+a];var l=[],r=0;if(c)for(var p=0;p<c.length;p++){var x=f[d[p]];x?(0===r&&(r=Ia()),l[p]=x(c[p])):l[p]=c[p]}d=V;c=a(...l);e=e?.async;if(V!=d)return xa().then(g);c=g(c);return e?Promise.resolve(c):c};
var Ja={6678944:()=>{try{h.onDoneSearching()}catch(a){}}},Ka,Fa,za,Ha,S,Ia,dynCall_vi,dynCall_v,dynCall_vii,dynCall_iii,Da,ra,Ca,Ea,L,La={b:function(){return 0},f:function(){return 0},g:function(){},j:()=>M(""),m:(a,b,d,c)=>{var e=(new Date).getFullYear(),g=(new Date(e,0,1)).getTimezoneOffset();e=(new Date(e,6,1)).getTimezoneOffset();J[a>>2]=60*Math.max(g,e);I[b>>2]=Number(g!=e);b=f=>{var l=Math.abs(f);return`UTC${0<=f?"-":"+"}${String(Math.floor(l/60)).padStart(2,"0")}${String(l%60).padStart(2,"0")}`};
a=b(g);b=b(e);e<g?(O(a,d,17),O(b,c,17)):(O(a,c,17),O(b,d,17))},h:function(a,b,d){if(!(0<=a&&3>=a))return 28;K[d>>3]=BigInt(Math.round(1E6*(0===a?Date.now():performance.now())));return 0},k:(a,b,d)=>{P.length=0;for(var c;c=H[b++];){var e=105!=c;e&=112!=c;d+=e&&d%8?4:0;P.push(112==c?J[d>>2]:106==c?K[d>>3]:105==c?I[d>>2]:ba[d>>3]);d+=e?8:4}return Ja[a](...P)},l:()=>2147483648,i:a=>{var b=H.length;a>>>=0;if(2147483648<a)return!1;for(var d=1;4>=d;d*=2){var c=b*(1+.2/d);c=Math.min(c,a+100663296);a:{c=(Math.min(2147483648,
65536*Math.ceil(Math.max(a,c)/65536))-L.buffer.byteLength+65535)/65536|0;try{L.grow(c);da();var e=1;break a}catch(g){}e=void 0}if(e)return!0}return!1},q:function(a){return Ga(()=>new Promise(b=>setTimeout(b,a)))},n:(a,b)=>{var d=0,c=0,e;for(e of la()){var g=b+d;J[a+c>>2]=g;d+=O(e,g,Infinity)+1;c+=4}return 0},o:(a,b)=>{var d=la();J[a>>2]=d.length;a=0;for(var c of d)a+=ma(c)+1;J[b>>2]=a;return 0},a:a=>{u(a,new N(a))},c:()=>52,p:()=>52,e:function(){return 70},d:(a,b,d,c)=>{for(var e=0,g=0;g<d;g++){var f=
J[b>>2],l=J[b+4>>2];b+=8;for(var r=0;r<l;r++){var p=a,x=H[f+r],k=na[p];0===x||10===x?((1===p?B:C)(ka(k)),k.length=0):k.push(x)}e+=l}J[c>>2]=e;return 0}};function Ma(a=[]){var b=Ka;a.unshift(t);var d=a.length,c=S(4*(d+1)),e=c,g;for(g of a)J[e>>2]=oa(g),e+=4;J[e>>2]=0;try{var f=b(d,c);u(f,new N(f))}catch(l){l instanceof N||"unwind"==l||u(1,l)}}var Z;
Z=await (async function(){var a={a:La};ea??=h.locateFile?h.locateFile("sf18-compat-st.wasm",v):v+"sf18-compat-st.wasm";var b=Z=(await ia(a)).instance.exports;a={};for(let [d,c]of Object.entries(b))"function"==typeof c?(b=qa(c),a[d]=b):a[d]=c;a=Z=a;Ka=h._main=a.t;h._command=a.u;Fa=a.v;h._isSearching=a.w;za=a.x;Ha=a.y;S=a.z;Ia=a.A;dynCall_vi=a.B;dynCall_v=a.D;dynCall_vii=a.E;dynCall_iii=a.F;Da=a.X;ra=a.Y;Ca=a.Z;Ea=a._;L=a.r;da();return Z}());
(function(a=q){h.calledRun=!0;D||(ca=!0,Z.s(),E?.(h),Ma(a))})();ca?moduleRtn=h:moduleRtn=new Promise((a,b)=>{E=a;F=b});
;return moduleRtn}})();if(typeof exports==="object"&&typeof module==="object"){module.exports=Sf18CompatSt;module.exports.default=Sf18CompatSt}else if(typeof define==="function"&&define["amd"])define([],()=>Sf18CompatSt);
if (typeof onmessage !== "undefined" && (typeof window === "undefined" || typeof window.document === "undefined")) {
    (function() {
        var engine = {};
        var queue = [];
        var startUpQueue = [];

        function sendCommand(cmd) {
            engine.ccall("command", null, ["string"], [cmd], {async: typeof IS_ASYNCIFY !== "undefined" && /^go\b/.test(cmd)});
            if (cmd === "quit") {
                try { engine.terminate(); } catch(e) {}
                try { self.close(); } catch(e) {}
            }
        }

        function processQueue() {
            while (queue.length && (!engine._isSearching || !engine._isSearching())) {
                sendCommand(queue.shift());
            }
        }

        function processCommand(cmd) {
            cmd = cmd.trim();
            if (cmd.substring(0, 2) === "go" || cmd.substring(0, 9) === "setoption") {
                queue.push(cmd);
            } else {
                sendCommand(cmd);
            }
            processQueue();
        }

        function checkIfReady() {
            if (engine._isReady && !engine._isReady()) {
                return setTimeout(checkIfReady, 10);
            }
            engine.onDoneSearching = function() { setTimeout(processQueue, 1); };
            engine.processCommand = processCommand;
            if (startUpQueue.length) {
                startUpQueue.forEach(processCommand);
                startUpQueue = [];
            }
        }

        var wasmUrl = (typeof self !== "undefined" && self.location && self.location.href)
            ? self.location.href.replace(/\.js(\?.*)?$/, ".wasm")
            : "";
        engine = {
            locateFile: function(path) {
                if (path.indexOf(".wasm") > -1) {
                    if (wasmUrl) return wasmUrl;
                    if (typeof __filename !== "undefined") return __filename.replace(/\.js$/, ".wasm");
                }
                if (typeof self !== "undefined" && self.location) {
                    return self.location.origin + self.location.pathname + "#" + wasmUrl + ",worker";
                }
                return path;
            },
            listener: function(line) { postMessage(line); },
        };

        var factory = typeof Sf18CompatSt !== "undefined" ? Sf18CompatSt
                   : typeof Sf18CompatMt !== "undefined" ? Sf18CompatMt
                   : typeof Sf18LiteSt !== "undefined" ? Sf18LiteSt
                   : typeof Sf18LiteMt !== "undefined" ? Sf18LiteMt
                   : typeof Stockfish !== "undefined" ? Stockfish
                   : null;
        if (!factory) { throw new Error("No engine factory found"); }
        factory(engine).then(checkIfReady).catch(function(e) {
            setTimeout(function() { throw e; }, 1);
        });

        if (!onmessage) {
            onmessage = function(event) {
                if (engine.processCommand) {
                    engine.processCommand(event.data);
                } else {
                    startUpQueue.push(event.data);
                }
                if (event.data === "quit") {
                    try { self.close(); } catch(e) {}
                }
            };
        }
    }());
}
