var Sf18CompatMt=(()=>{var _scriptName=globalThis.document?.currentScript?.src;return async function(moduleArg={}){var moduleRtn;var g=moduleArg,aa=!!globalThis.window,k=!!globalThis.WorkerGlobalScope,l=globalThis.process?.versions?.node&&"renderer"!=globalThis.process?.type,p=k&&self.name?.startsWith("em-pthread");if(l){var q=require("node:worker_threads");global.Worker=q.Worker;p=(k=!q.Ga)&&"em-pthread"==q.workerData}g.print=function(a){g.listener?g.listener(a):console.log(a)};g.printErr=function(a){g.listener?g.listener(a):console.error(a)};g.terminate=function(){"undefined"!==typeof ba&&ca()};
var da=[],t="./this.program",u=(a,b)=>{throw b;};"undefined"!=typeof __filename?_scriptName=__filename:k&&(_scriptName=self.location.href);var w="",x,y;
if(l){var fs=require("node:fs");w=__dirname+"/";y=a=>{a=ea(a)?new URL(a):a;return fs.readFileSync(a)};x=async a=>{a=ea(a)?new URL(a):a;return fs.readFileSync(a,void 0)};1<process.argv.length&&(t=process.argv[1].replace(/\\/g,"/"));da=process.argv.slice(2);u=(a,b)=>{process.exitCode=a;throw b;}}else if(aa||k){try{w=(new URL(".",_scriptName)).href}catch{}l||(k&&(y=a=>{var b=new XMLHttpRequest;b.open("GET",a,!1);b.responseType="arraybuffer";b.send(null);return new Uint8Array(b.response)}),x=async a=>
{a=await fetch(a,{credentials:"same-origin"});if(a.ok)return a.arrayBuffer();throw Error(a.status+" : "+a.url);})}var fa=console.log.bind(console),ha=console.error.bind(console);if(l){var ia=require("node:util"),ja=a=>"object"==typeof a?ia.inspect(a):a;fa=(...a)=>fs.writeSync(1,a.map(ja).join(" ")+"\n");ha=(...a)=>fs.writeSync(2,a.map(ja).join(" ")+"\n")}var z=fa,A=ha,B,C=!1,D,ea=a=>a.startsWith("file://");function E(){F.buffer!=ka.buffer&&G()}var la,na;
if(l&&p){globalThis.self=globalThis;var oa=q.parentPort;globalThis.postMessage||(oa.on("message",a=>globalThis.onmessage?.({data:a})),globalThis.postMessage=a=>oa.postMessage(a));process.on("uncaughtException",a=>{postMessage({ta:"uncaughtException",error:a});process.exit(1)})}var pa;
if(p){var qa=!1;self.onunhandledrejection=b=>{throw b.reason||b;};function a(b){try{var c=b.data,d=c.ta;if("load"===d){let f=[];self.onmessage=e=>f.push(e);pa=()=>{postMessage({ta:"loaded"});for(let e of f)a(e);self.onmessage=a};for(const e of c.Aa)if(!g[e]||g[e].proxy)g[e]=(...h)=>{postMessage({ta:"callHandler",za:e,args:h})},"print"==e&&(z=g[e]),"printErr"==e&&(A=g[e]);F=c.Ea;G();B=c.Fa;ra();sa()}else if("run"===d){ta(c.ua);ua(c.ua,0,0,1,0,0);va();wa(c.ua);qa||=!0;try{xa(c.Ca,c.wa)}catch(f){if("unwind"!=
f)throw f;}}else"setimmediate"!==c.target&&("checkMailbox"===d?qa&&H():d&&(A(`worker: received unknown command ${d}`),A(c)))}catch(f){throw ya(),f;}}self.onmessage=a}var ka,I,J,K,L,M,za=!1;function G(){var a=F.buffer;ka=new Int8Array(a);new Int16Array(a);I=new Uint8Array(a);new Uint16Array(a);J=new Int32Array(a);K=new Uint32Array(a);new Float32Array(a);L=new Float64Array(a);M=new BigInt64Array(a);new BigUint64Array(a)}function Aa(){za=!0;p?pa():N.G()}
function Ba(a){a="Aborted("+a+")";A(a);C=!0;a=new WebAssembly.RuntimeError(a+". Build with -sASSERTIONS for more info.");na?.(a);throw a;}var Ca;async function Da(a){try{var b=await x(a);return new Uint8Array(b)}catch{}if(y)a=y(a);else throw"both async and sync fetching of the wasm failed";return a}async function Ea(a,b){try{var c=await Da(a);return await WebAssembly.instantiate(c,b)}catch(d){A(`failed to asynchronously prepare wasm: ${d}`),Ba(d)}}
async function Fa(a){var b=Ca;if(!l)try{var c=fetch(b,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(c,a)}catch(d){A(`wasm streaming compile failed: ${d}`),A("falling back to ArrayBuffer instantiation")}return Ea(b,a)}function Ga(){Ia={D:Ja,f:Ka,u:La,v:Ma,p:Na,n:Oa,C:Pa,e:Qa,k:Ra,m:wa,h:Sa,s:Ta,E:Ua,F:Va,l:Wa,b:Xa,g:Ya,o:Za,y:$a,d:ab,q:bb,w:cb,r:db,A:eb,B:fb,c:O,i:gb,t:hb,z:ib,j:jb,a:F,x:kb};return{a:Ia}}
async function ra(){function a(c,d){N=c.exports;lb.push(N.P);c=N;g.__ZdlPvm=c.H;g._main=c.J;g._command=c.K;g._isReady=c.L;g.__ZdlPv=c.M;g._isSearching=c.N;g._emscripten_builtin_free=c.O;P=c.Q;mb=g.__emscripten_proxy_main=c.R;ua=c.S;ya=c.T;nb=c.U;ob=c.V;pb=c.W;qb=c.X;g._emscripten_builtin_malloc=c.Y;g._strdup=c.Z;g._strndup=c._;rb=c.$;g.__ZdaPv=c.aa;g.__ZdaPvm=c.ba;g.__Znaj=c.ca;g.__ZnajSt11align_val_t=c.da;g.__Znwj=c.ea;g.__ZnwjSt11align_val_t=c.fa;g.___libc_calloc=c.ga;g.___libc_free=c.ha;g.___libc_malloc=
c.ia;g.___libc_realloc=c.ja;g._emscripten_builtin_calloc=c.ka;g._emscripten_builtin_realloc=c.la;g._malloc_size=c.ma;g._malloc_usable_size=c.na;g._reallocf=c.oa;sb=c.pa;Q=c.qa;R=c.ra;tb=c.sa;ub=c.I;B=d;return N}var b=Ga();if(p)return b=new WebAssembly.Instance(B,Ga()),a(b,B);Ca??=g.locateFile?g.locateFile("sf18-compat-mt.wasm",w):w+"sf18-compat-mt.wasm";return function(c){return a(c.instance,c.module)}(await Fa(b))}
class vb{name="ExitStatus";constructor(a){this.message=`Program terminated with exit(${a})`;this.status=a}}
var wb=a=>{a.terminate();a.onmessage=()=>{}},xb=[],zb=a=>{if(0==S.length){var b=_scriptName;g.mainScriptUrlOrBlob&&(b=g.mainScriptUrlOrBlob,"string"!=typeof b&&(b=URL.createObjectURL(b)));b=new Worker(b,{workerData:"em-pthread",name:"em-pthread"});S.push(b);yb()}b=S.pop();if(!b)return 6;T.push(b);U[a.ua]=b;b.ua=a.ua;var c={ta:"run",Ca:a.Ba,wa:a.wa,ua:a.ua};l&&b.unref();b.postMessage(c,a.ya);return 0},V=0,db=()=>0<V,W=(a,b,c,...d)=>{var f=16*d.length,e=tb(),h=R(f),m=h>>3,n;for(n of d)"bigint"==typeof n?
((E(),M)[m++]=1n,(E(),M)[m++]=n):((E(),M)[m++]=0n,(E(),L)[m++]=n);a=ob(a,b,f,h,c);Q(e);return a};function Ab(a){if(p)return W(0,0,1,a);D=a;0<V||(ca(),C=!0);u(a,new vb(a))}function Bb(a){if(p)return W(1,0,0,a);--V;O(a)}var O=a=>{D=a;if(p)throw Bb(a),"unwind";Ab(a)},S=[],T=[],lb=[],U={},ca=()=>{for(var a of T)wb(a);for(a of S)wb(a);S=[];T=[];U={}},Cb=a=>{var b=a.ua;delete U[b];S.push(a);T.splice(T.indexOf(a),1);a.ua=0;l&&a.unref();pb(b)};function va(){lb.forEach(a=>a())}
var yb=()=>{var a=S[0];new Promise(b=>{a.onmessage=e=>{var h=e.data;e=h.ta;if(h.va&&h.va!=P()){var m=U[h.va];m?m.postMessage(h,h.ya):A(`Internal error! Worker sent a message "${e}" to target pthread ${h.va}, but that thread no longer exists!`)}else if("checkMailbox"===e)H();else if("spawnThread"===e)zb(h);else if("cleanupThread"===e)Db(()=>{Cb(U[h.Da])});else if("loaded"===e)a.loaded=!0,b(a);else if("setimmediate"===h.target)a.postMessage(h);else if("uncaughtException"===e)a.onerror(h.error);else if("callHandler"===
e)g[h.za](...h.args);else e&&A(`worker sent an unknown command ${e}`)};a.onerror=e=>{A(`${"worker sent an error!"} ${e.filename}:${e.lineno}: ${e.message}`);throw e;};l&&(a.on("message",e=>a.onmessage({data:e})),a.on("error",e=>a.onerror(e)));var c=[],d=["print","printErr"],f;for(f of d)g.propertyIsEnumerable(f)&&c.push(f);a.postMessage({ta:"load",Aa:c,Ea:F,Fa:B})})},ba={};function ta(a){var b=(E(),K)[a+52>>2];a=(E(),K)[a+56>>2];sb(b,b-a);Q(b)}
var Eb=[],xa=(a,b)=>{V=0;var c=Eb[a];c||(Eb[a]=c=ub.get(a));a=c(b);0<V?D=a:qb(a)},F;function Fb(a,b,c,d){return p?W(2,0,1,a,b,c,d):Ja(a,b,c,d)}
var Ja=(a,b,c,d)=>{if(!globalThis.SharedArrayBuffer)return 6;var f=[];if(p&&0===f.length)return Fb(a,b,c,d);a={Ba:c,ua:a,wa:d,ya:f};return p?(a.ta="spawnThread",postMessage(a,f),0):zb(a)},Gb=globalThis.TextDecoder&&new TextDecoder,Hb=(a,b=0)=>{var c=b;for(var d=c+void 0;a[c]&&!(c>=d);)++c;if(16<c-b&&a.buffer&&Gb)return Gb.decode(a.buffer instanceof ArrayBuffer?a.subarray(b,c):a.slice(b,c));for(d="";b<c;){var f=a[b++];if(f&128){var e=a[b++]&63;if(192==(f&224))d+=String.fromCharCode((f&31)<<6|e);else{var h=
a[b++]&63;f=224==(f&240)?(f&15)<<12|e<<6|h:(f&7)<<18|e<<12|h<<6|a[b++]&63;65536>f?d+=String.fromCharCode(f):(f-=65536,d+=String.fromCharCode(55296|f>>10,56320|f&1023))}}else d+=String.fromCharCode(f)}return d},Ib=a=>a?Hb((E(),I),a):"";function Ka(a,b,c){return p?W(3,0,1,a,b,c):0}function La(a,b,c){return p?W(4,0,1,a,b,c):0}function Ma(a,b,c,d){if(p)return W(5,0,1,a,b,c,d)}
var Na=()=>Ba(""),Oa=a=>{ua(a,!k,1,!aa,65536,!1);va()},Jb=a=>{a instanceof vb||"unwind"==a||u(1,a)},Db=a=>{if(!C)try{return a()}catch(b){Jb(b)}finally{if(!(0<V))try{p?P()&&qb(D):O(D)}catch(b){Jb(b)}}},Kb=!Atomics.waitAsync||globalThis.Ha||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]),wa=a=>{Kb||(Atomics.waitAsync((E(),J),a>>2,a).value.then(H),a+=128,Atomics.store((E(),J),a>>2,1))},H=()=>Db(()=>{var a=P();a&&(wa(a),rb())}),Pa=(a,b)=>{a==
b?setTimeout(H):p?postMessage({va:a,ta:"checkMailbox"}):(a=U[a])&&a.postMessage({ta:"checkMailbox"})},Lb=[],Qa=(a,b,c,d,f,e,h)=>{Lb.length=0;c=f>>3;for(d=f+d>>3;c<d;){var m;(E(),M)[c++]?m=(E(),M)[c++]:m=(E(),L)[c++];Lb.push(m)}a=(b?Mb[b]:Nb[a])(...Lb);if(e)a.then(n=>nb(e,h,n));else return a},Ra=a=>{p?postMessage({ta:"cleanupThread",Da:a}):Cb(U[a])},Sa=a=>{l&&U[a].ref()},X=(a,b,c)=>{var d=(E(),I);if(0<c){var f=b;c=b+c-1;for(var e=0;e<a.length;++e){var h=a.codePointAt(e);if(127>=h){if(b>=c)break;d[b++]=
h}else if(2047>=h){if(b+1>=c)break;d[b++]=192|h>>6;d[b++]=128|h&63}else if(65535>=h){if(b+2>=c)break;d[b++]=224|h>>12;d[b++]=128|h>>6&63;d[b++]=128|h&63}else{if(b+3>=c)break;d[b++]=240|h>>18;d[b++]=128|h>>12&63;d[b++]=128|h>>6&63;d[b++]=128|h&63;e++}}d[b]=0;a=b-f}else a=0;return a},Ta=(a,b,c,d)=>{var f=(new Date).getFullYear(),e=(new Date(f,0,1)).getTimezoneOffset();f=(new Date(f,6,1)).getTimezoneOffset();var h=Math.max(e,f);(E(),K)[a>>2]=60*h;(E(),J)[b>>2]=Number(e!=f);b=m=>{var n=Math.abs(m);return`UTC${0<=
m?"-":"+"}${String(Math.floor(n/60)).padStart(2,"0")}${String(n%60).padStart(2,"0")}`};a=b(e);b=b(f);f<e?(X(a,c,17),X(b,d,17)):(X(a,d,17),X(b,c,17))},ab=()=>performance.timeOrigin+performance.now(),Xa=()=>Date.now(),Ob=1;function Ua(a,b,c){if(!(0<=a&&3>=a))return 28;if(0===a)a=Date.now();else if(Ob)a=performance.timeOrigin+performance.now();else return 52;a=Math.round(1E6*a);(E(),M)[c>>3]=BigInt(a);return 0}
var Y=[],Va=(a,b,c)=>{Y.length=0;for(var d;d=(E(),I)[b++];){var f=105!=d;f&=112!=d;c+=f&&c%8?4:0;Y.push(112==d?(E(),K)[c>>2]:106==d?(E(),M)[c>>3]:105==d?(E(),J)[c>>2]:(E(),L)[c>>3]);c+=f?8:4}return p?W(0,a,0,...Y):Mb[a](...Y)},Z=()=>{var a="Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread";Z.xa||(Z.xa={});Z.xa[a]||(Z.xa[a]=1,l&&(a="warning: "+a),A(a))},Wa=()=>{l||k||(Z(),Ba("Blocking on the main thread is not allowed by default. See https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread"))},
Ya=a=>A(Ib(a)),Za=()=>{V+=1;throw"unwind";},$a=()=>2147483648,bb=()=>l?require("node:os").cpus().length:navigator.hardwareConcurrency,cb=a=>{var b=(E(),I).length;a>>>=0;if(a<=b||2147483648<a)return!1;for(var c=1;4>=c;c*=2){var d=b*(1+.2/c);d=Math.min(d,a+100663296);a:{d=(Math.min(2147483648,65536*Math.ceil(Math.max(a,d)/65536))-F.buffer.byteLength+65535)/65536|0;try{F.grow(d);G();var f=1;break a}catch(e){}f=void 0}if(f)return!0}return!1},Pb={},Rb=()=>{if(!Qb){var a={USER:"web_user",LOGNAME:"web_user",
PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:t||"./this.program"},b;for(b in Pb)void 0===Pb[b]?delete a[b]:a[b]=Pb[b];var c=[];for(b in a)c.push(`${b}=${a[b]}`);Qb=c}return Qb},Qb;function eb(a,b){if(p)return W(6,0,1,a,b);var c=0,d=0,f;for(f of Rb()){var e=b+c;(E(),K)[a+d>>2]=e;c+=X(f,e,Infinity)+1;d+=4}return 0}
var Sb=a=>{for(var b=0,c=0;c<a.length;++c){var d=a.charCodeAt(c);127>=d?b++:2047>=d?b+=2:55296<=d&&57343>=d?(b+=4,++c):b+=3}return b};function fb(a,b){if(p)return W(7,0,1,a,b);var c=Rb();(E(),K)[a>>2]=c.length;a=0;for(var d of c)a+=Sb(d)+1;(E(),K)[b>>2]=a;return 0}function gb(a){return p?W(8,0,1,a):52}function hb(a,b,c,d){return p?W(9,0,1,a,b,c,d):52}function ib(a,b,c,d){return p?W(10,0,1,a,b,c,d):70}var Tb=[null,[],[]];
function jb(a,b,c,d){if(p)return W(11,0,1,a,b,c,d);for(var f=0,e=0;e<c;e++){var h=(E(),K)[b>>2],m=(E(),K)[b+4>>2];b+=8;for(var n=0;n<m;n++){var r=a,v=(E(),I)[h+n],ma=Tb[r];0===v||10===v?((1===r?z:A)(Hb(ma)),ma.length=0):ma.push(v)}f+=m}(E(),K)[d>>2]=f;return 0}
var Ub=()=>{if(l){var a=require("node:crypto");return b=>a.randomFillSync(b)}return b=>b.set(crypto.getRandomValues(new Uint8Array(b.byteLength)))},Vb=a=>{(Vb=Ub())(a)},kb=(a,b)=>{Vb((E(),I).subarray(a,a+b));return 0},Wb=a=>{var b=Sb(a)+1,c=R(b);X(a,c,b);return c};p||(F=new WebAssembly.Memory({initial:2048,maximum:32768,shared:!0}),G());g.print&&(z=g.print);g.printErr&&(A=g.printErr);
g.ccall=(a,b,c,d)=>{var f={string:r=>{var v=0;null!==r&&void 0!==r&&0!==r&&(v=Wb(r));return v},array:r=>{var v=R(r.length);(E(),ka).set(r,v);return v}};a=g["_"+a];var e=[],h=0;if(d)for(var m=0;m<d.length;m++){var n=f[c[m]];n?(0===h&&(h=tb()),e[m]=n(d[m])):e[m]=d[m]}c=a(...e);return c=function(r){0!==h&&Q(h);return"string"===b?Ib(r):"boolean"===b?!!r:r}(c)};var Nb=[Ab,Bb,Fb,Ka,La,Ma,eb,fb,gb,hb,ib,jb],Mb={6688808:()=>{try{g.onDoneSearching()}catch(a){}}},P,mb,ua,ya,nb,ob,pb,qb,rb,sb,Q,R,tb,ub,Ia;
function Xb(a=[]){var b=mb;V+=1;a.unshift(t);var c=a.length,d=R(4*(c+1)),f=d,e;for(e of a)(E(),K)[f>>2]=Wb(e),f+=4;(E(),K)[f>>2]=0;try{var h=b(c,d);O(h,!0)}catch(m){Jb(m)}}function sa(){var a=da;if(p)la?.(g),Aa();else{for(var b=xb;0<b.length;)b.shift()(g);g.calledRun=!0;C||(Aa(),la?.(g),Xb(a))}}var N;p||(N=await (ra()),sa());za?moduleRtn=g:moduleRtn=new Promise((a,b)=>{la=a;na=b});
;return moduleRtn}})();if(typeof exports==="object"&&typeof module==="object"){module.exports=Sf18CompatMt;module.exports.default=Sf18CompatMt}else if(typeof define==="function"&&define["amd"])define([],()=>Sf18CompatMt);var isPthread=globalThis.self?.name?.startsWith("em-pthread");var isNode=globalThis.process?.versions?.node&&globalThis.process?.type!="renderer";if(isNode)isPthread=require("node:worker_threads").workerData==="em-pthread";isPthread&&Sf18CompatMt();
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
