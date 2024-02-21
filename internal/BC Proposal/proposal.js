(()=>{var kt=function(e){let t=[],n=0;for(let i=0;i<e.length;i++){let r=e.charCodeAt(i);r<128?t[n++]=r:r<2048?(t[n++]=r>>6|192,t[n++]=r&63|128):(r&64512)===55296&&i+1<e.length&&(e.charCodeAt(i+1)&64512)===56320?(r=65536+((r&1023)<<10)+(e.charCodeAt(++i)&1023),t[n++]=r>>18|240,t[n++]=r>>12&63|128,t[n++]=r>>6&63|128,t[n++]=r&63|128):(t[n++]=r>>12|224,t[n++]=r>>6&63|128,t[n++]=r&63|128)}return t},ce=function(e){let t=[],n=0,i=0;for(;n<e.length;){let r=e[n++];if(r<128)t[i++]=String.fromCharCode(r);else if(r>191&&r<224){let s=e[n++];t[i++]=String.fromCharCode((r&31)<<6|s&63)}else if(r>239&&r<365){let s=e[n++],o=e[n++],a=e[n++],c=((r&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;t[i++]=String.fromCharCode(55296+(c>>10)),t[i++]=String.fromCharCode(56320+(c&1023))}else{let s=e[n++],o=e[n++];t[i++]=String.fromCharCode((r&15)<<12|(s&63)<<6|o&63)}}return t.join("")},Nt={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();let n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let r=0;r<e.length;r+=3){let s=e[r],o=r+1<e.length,a=o?e[r+1]:0,c=r+2<e.length,l=c?e[r+2]:0,d=s>>2,h=(s&3)<<4|a>>4,p=(a&15)<<2|l>>6,m=l&63;c||(m=64,o||(p=64)),i.push(n[d],n[h],n[p],n[m])}return i.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(kt(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):ce(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();let n=t?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let r=0;r<e.length;){let s=n[e.charAt(r++)],a=r<e.length?n[e.charAt(r)]:0;++r;let l=r<e.length?n[e.charAt(r)]:64;++r;let h=r<e.length?n[e.charAt(r)]:64;if(++r,s==null||a==null||l==null||h==null)throw new tt;let p=s<<2|a>>4;if(i.push(p),l!==64){let m=a<<4&240|l>>2;if(i.push(m),h!==64){let g=l<<6&192|h;i.push(g)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}},tt=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},le=function(e){let t=kt(e);return Nt.encodeByteArray(t,!0)},et=function(e){return le(e).replace(/\./g,"")},he=function(e){try{return Nt.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};function de(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}var ue=()=>de().__FIREBASE_DEFAULTS__,fe=()=>{if(typeof process=="undefined"||typeof process.env=="undefined")return;let e=process.env.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},pe=()=>{if(typeof document=="undefined")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let t=e&&he(e[1]);return t&&JSON.parse(t)},Pt=()=>{try{return ue()||fe()||pe()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},me=e=>{var t,n;return(n=(t=Pt())===null||t===void 0?void 0:t.emulatorHosts)===null||n===void 0?void 0:n[e]},Lt=e=>{let t=me(e);if(!t)return;let n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);let i=parseInt(t.substring(n+1),10);return t[0]==="["?[t.substring(1,n-1),i]:[t.substring(0,n),i]},nt=()=>{var e;return(e=Pt())===null||e===void 0?void 0:e.config};var W=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,i))}}};function Mt(){try{return typeof indexedDB=="object"}catch{return!1}}function Bt(){return new Promise((e,t)=>{try{let n=!0,i="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(i);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(i),e(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var s;t(((s=r.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){t(n)}})}var ge="FirebaseError",y=class e extends Error{constructor(t,n,i){super(n),this.code=t,this.customData=i,this.name=ge,Object.setPrototypeOf(this,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,L.prototype.create)}},L=class{constructor(t,n,i){this.service=t,this.serviceName=n,this.errors=i}create(t,...n){let i=n[0]||{},r=`${this.service}/${t}`,s=this.errors[t],o=s?be(s,i):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new y(r,a,i)}};function be(e,t){return e.replace(_e,(n,i)=>{let r=t[i];return r!=null?String(r):`<${i}?>`})}var _e=/\{\$([^}]+)}/g;function j(e,t){if(e===t)return!0;let n=Object.keys(e),i=Object.keys(t);for(let r of n){if(!i.includes(r))return!1;let s=e[r],o=t[r];if(Ot(s)&&Ot(o)){if(!j(s,o))return!1}else if(s!==o)return!1}for(let r of i)if(!n.includes(r))return!1;return!0}function Ot(e){return e!==null&&typeof e=="object"}var Fn=4*60*60*1e3;function H(e){return e&&e._delegate?e._delegate:e}var E=class{constructor(t,n,i){this.name=t,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}};var C="[DEFAULT]";var it=class{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){let n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){let i=new W;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{let r=this.getOrInitializeService({instanceIdentifier:n});r&&i.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){var n;let i=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(n=t==null?void 0:t.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(ye(t))try{this.getOrInitializeService({instanceIdentifier:C})}catch{}for(let[n,i]of this.instancesDeferred.entries()){let r=this.normalizeInstanceIdentifier(n);try{let s=this.getOrInitializeService({instanceIdentifier:r});i.resolve(s)}catch{}}}}clearInstance(t=C){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){let t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=C){return this.instances.has(t)}getOptions(t=C){return this.instancesOptions.get(t)||{}}initialize(t={}){let{options:n={}}=t,i=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let r=this.getOrInitializeService({instanceIdentifier:i,options:n});for(let[s,o]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(s);i===a&&o.resolve(r)}return r}onInit(t,n){var i;let r=this.normalizeInstanceIdentifier(n),s=(i=this.onInitCallbacks.get(r))!==null&&i!==void 0?i:new Set;s.add(t),this.onInitCallbacks.set(r,s);let o=this.instances.get(r);return o&&t(o,r),()=>{s.delete(t)}}invokeOnInitCallbacks(t,n){let i=this.onInitCallbacks.get(n);if(i)for(let r of i)try{r(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let i=this.instances.get(t);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:we(t),options:n}),this.instances.set(t,i),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(i,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,i)}catch{}return i||null}normalizeInstanceIdentifier(t=C){return this.component?this.component.multipleInstances?t:C:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function we(e){return e===C?void 0:e}function ye(e){return e.instantiationMode==="EAGER"}var V=class{constructor(t){this.name=t,this.providers=new Map}addComponent(t){let n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);let n=new it(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}};var Ee=[],f;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(f||(f={}));var ve={debug:f.DEBUG,verbose:f.VERBOSE,info:f.INFO,warn:f.WARN,error:f.ERROR,silent:f.SILENT},xe=f.INFO,Se={[f.DEBUG]:"log",[f.VERBOSE]:"log",[f.INFO]:"info",[f.WARN]:"warn",[f.ERROR]:"error"},De=(e,t,...n)=>{if(t<e.logLevel)return;let i=new Date().toISOString(),r=Se[t];if(r)console[r](`[${i}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)},z=class{constructor(t){this.name=t,this._logLevel=xe,this._logHandler=De,this._userLogHandler=null,Ee.push(this)}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in f))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?ve[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,f.DEBUG,...t),this._logHandler(this,f.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,f.VERBOSE,...t),this._logHandler(this,f.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,f.INFO,...t),this._logHandler(this,f.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,f.WARN,...t),this._logHandler(this,f.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,f.ERROR,...t),this._logHandler(this,f.ERROR,...t)}};var Ce=(e,t)=>t.some(n=>e instanceof n),Rt,$t;function Ae(){return Rt||(Rt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ie(){return $t||($t=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var Ut=new WeakMap,st=new WeakMap,Ft=new WeakMap,rt=new WeakMap,at=new WeakMap;function Te(e){let t=new Promise((n,i)=>{let r=()=>{e.removeEventListener("success",s),e.removeEventListener("error",o)},s=()=>{n(w(e.result)),r()},o=()=>{i(e.error),r()};e.addEventListener("success",s),e.addEventListener("error",o)});return t.then(n=>{n instanceof IDBCursor&&Ut.set(n,e)}).catch(()=>{}),at.set(t,e),t}function Oe(e){if(st.has(e))return;let t=new Promise((n,i)=>{let r=()=>{e.removeEventListener("complete",s),e.removeEventListener("error",o),e.removeEventListener("abort",o)},s=()=>{n(),r()},o=()=>{i(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",s),e.addEventListener("error",o),e.addEventListener("abort",o)});st.set(e,t)}var ot={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return st.get(e);if(t==="objectStoreNames")return e.objectStoreNames||Ft.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return w(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function Wt(e){ot=e(ot)}function ke(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){let i=e.call(G(this),t,...n);return Ft.set(i,t.sort?t.sort():[t]),w(i)}:Ie().includes(e)?function(...t){return e.apply(G(this),t),w(Ut.get(this))}:function(...t){return w(e.apply(G(this),t))}}function Ne(e){return typeof e=="function"?ke(e):(e instanceof IDBTransaction&&Oe(e),Ce(e,Ae())?new Proxy(e,ot):e)}function w(e){if(e instanceof IDBRequest)return Te(e);if(rt.has(e))return rt.get(e);let t=Ne(e);return t!==e&&(rt.set(e,t),at.set(t,e)),t}var G=e=>at.get(e);function Ht(e,t,{blocked:n,upgrade:i,blocking:r,terminated:s}={}){let o=indexedDB.open(e,t),a=w(o);return i&&o.addEventListener("upgradeneeded",c=>{i(w(o.result),c.oldVersion,c.newVersion,w(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}var Pe=["get","getKey","getAll","getAllKeys","count"],Le=["put","add","delete","clear"],ct=new Map;function jt(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(ct.get(t))return ct.get(t);let n=t.replace(/FromIndex$/,""),i=t!==n,r=Le.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(r||Pe.includes(n)))return;let s=async function(o,...a){let c=this.transaction(o,r?"readwrite":"readonly"),l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),r&&c.done]))[0]};return ct.set(t,s),s}Wt(e=>({...e,get:(t,n,i)=>jt(t,n)||e.get(t,n,i),has:(t,n)=>!!jt(t,n)||e.has(t,n)}));var ht=class{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Me(n)){let i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}};function Me(e){let t=e.getComponent();return(t==null?void 0:t.type)==="VERSION"}var dt="@firebase/app",Vt="0.9.27";var A=new z("@firebase/app"),Be="@firebase/app-compat",Re="@firebase/analytics-compat",$e="@firebase/analytics",Ue="@firebase/app-check-compat",Fe="@firebase/app-check",We="@firebase/auth",je="@firebase/auth-compat",He="@firebase/database",Ve="@firebase/database-compat",ze="@firebase/functions",Ge="@firebase/functions-compat",qe="@firebase/installations",Je="@firebase/installations-compat",Ke="@firebase/messaging",Ye="@firebase/messaging-compat",Xe="@firebase/performance",Qe="@firebase/performance-compat",Ze="@firebase/remote-config",tn="@firebase/remote-config-compat",en="@firebase/storage",nn="@firebase/storage-compat",rn="@firebase/firestore",sn="@firebase/firestore-compat",on="firebase";var ut="[DEFAULT]",an={[dt]:"fire-core",[Be]:"fire-core-compat",[$e]:"fire-analytics",[Re]:"fire-analytics-compat",[Fe]:"fire-app-check",[Ue]:"fire-app-check-compat",[We]:"fire-auth",[je]:"fire-auth-compat",[He]:"fire-rtdb",[Ve]:"fire-rtdb-compat",[ze]:"fire-fn",[Ge]:"fire-fn-compat",[qe]:"fire-iid",[Je]:"fire-iid-compat",[Ke]:"fire-fcm",[Ye]:"fire-fcm-compat",[Xe]:"fire-perf",[Qe]:"fire-perf-compat",[Ze]:"fire-rc",[tn]:"fire-rc-compat",[en]:"fire-gcs",[nn]:"fire-gcs-compat",[rn]:"fire-fst",[sn]:"fire-fst-compat","fire-js":"fire-js",[on]:"fire-js-all"};var q=new Map,ft=new Map;function cn(e,t){try{e.container.addComponent(t)}catch(n){A.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function M(e){let t=e.name;if(ft.has(t))return A.debug(`There were multiple attempts to register component ${t}.`),!1;ft.set(t,e);for(let n of q.values())cn(n,e);return!0}function Jt(e,t){let n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}var ln={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},x=new L("app","Firebase",ln);var pt=class{constructor(t,n,i){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new E("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw x.create("app-deleted",{appName:this._name})}};function bt(e,t={}){let n=e;typeof t!="object"&&(t={name:t});let i=Object.assign({name:ut,automaticDataCollectionEnabled:!1},t),r=i.name;if(typeof r!="string"||!r)throw x.create("bad-app-name",{appName:String(r)});if(n||(n=nt()),!n)throw x.create("no-options");let s=q.get(r);if(s){if(j(n,s.options)&&j(i,s.config))return s;throw x.create("duplicate-app",{appName:r})}let o=new V(r);for(let c of ft.values())o.addComponent(c);let a=new pt(n,i,o);return q.set(r,a),a}function Kt(e=ut){let t=q.get(e);if(!t&&e===ut&&nt())return bt();if(!t)throw x.create("no-app",{appName:e});return t}function S(e,t,n){var i;let r=(i=an[e])!==null&&i!==void 0?i:e;n&&(r+=`-${n}`);let s=r.match(/\s|\//),o=t.match(/\s|\//);if(s||o){let a=[`Unable to register library "${r}" with version "${t}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),A.warn(a.join(" "));return}M(new E(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}var hn="firebase-heartbeat-database",dn=1,B="firebase-heartbeat-store",lt=null;function Yt(){return lt||(lt=Ht(hn,dn,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(B)}catch(n){console.warn(n)}}}}).catch(e=>{throw x.create("idb-open",{originalErrorMessage:e.message})})),lt}async function un(e){try{let n=(await Yt()).transaction(B),i=await n.objectStore(B).get(Xt(e));return await n.done,i}catch(t){if(t instanceof y)A.warn(t.message);else{let n=x.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});A.warn(n.message)}}}async function zt(e,t){try{let i=(await Yt()).transaction(B,"readwrite");await i.objectStore(B).put(t,Xt(e)),await i.done}catch(n){if(n instanceof y)A.warn(n.message);else{let i=x.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});A.warn(i.message)}}}function Xt(e){return`${e.name}!${e.options.appId}`}var fn=1024,pn=30*24*60*60*1e3,mt=class{constructor(t){this.container=t,this._heartbeatsCache=null;let n=this.container.getProvider("app").getImmediate();this._storage=new gt(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var t,n;let r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Gt();if(!(((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null))&&!(this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)))return this._heartbeatsCache.heartbeats.push({date:s,agent:r}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{let a=new Date(o.date).valueOf();return Date.now()-a<=pn}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){var t;if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let n=Gt(),{heartbeatsToSend:i,unsentEntries:r}=mn(this._heartbeatsCache.heartbeats),s=et(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=n,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}};function Gt(){return new Date().toISOString().substring(0,10)}function mn(e,t=fn){let n=[],i=e.slice();for(let r of e){let s=n.find(o=>o.agent===r.agent);if(s){if(s.dates.push(r.date),qt(n)>t){s.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),qt(n)>t){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}var gt=class{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Mt()?Bt().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let n=await un(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var n;if(await this._canUseIndexedDBPromise){let r=await this.read();return zt(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var n;if(await this._canUseIndexedDBPromise){let r=await this.read();return zt(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}};function qt(e){return et(JSON.stringify({version:2,heartbeats:e})).length}function gn(e){M(new E("platform-logger",t=>new ht(t),"PRIVATE")),M(new E("heartbeat",t=>new mt(t),"PRIVATE")),S(dt,Vt,e),S(dt,Vt,"esm2017"),S("fire-js","")}gn("");var bn="firebase",_n="10.8.0";S(bn,_n,"app");var wn="type.googleapis.com/google.protobuf.Int64Value",yn="type.googleapis.com/google.protobuf.UInt64Value";function ee(e,t){let n={};for(let i in e)e.hasOwnProperty(i)&&(n[i]=t(e[i]));return n}function _t(e){if(e==null)return null;if(e instanceof Number&&(e=e.valueOf()),typeof e=="number"&&isFinite(e)||e===!0||e===!1||Object.prototype.toString.call(e)==="[object String]")return e;if(e instanceof Date)return e.toISOString();if(Array.isArray(e))return e.map(t=>_t(t));if(typeof e=="function"||typeof e=="object")return ee(e,t=>_t(t));throw new Error("Data cannot be encoded in JSON: "+e)}function J(e){if(e==null)return e;if(e["@type"])switch(e["@type"]){case wn:case yn:{let t=Number(e.value);if(isNaN(t))throw new Error("Data cannot be decoded from JSON: "+e);return t}default:throw new Error("Data cannot be decoded from JSON: "+e)}return Array.isArray(e)?e.map(t=>J(t)):typeof e=="function"||typeof e=="object"?ee(e,t=>J(t)):e}var vt="functions";var Qt={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},D=class extends y{constructor(t,n,i){super(`${vt}/${t}`,n||""),this.details=i}};function En(e){if(e>=200&&e<300)return"ok";switch(e){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function vn(e,t){let n=En(e),i=n,r;try{let s=t&&t.error;if(s){let o=s.status;if(typeof o=="string"){if(!Qt[o])return new D("internal","internal");n=Qt[o],i=o}let a=s.message;typeof a=="string"&&(i=a),r=s.details,r!==void 0&&(r=J(r))}}catch{}return n==="ok"?null:new D(n,i,r)}var wt=class{constructor(t,n,i){this.auth=null,this.messaging=null,this.appCheck=null,this.auth=t.getImmediate({optional:!0}),this.messaging=n.getImmediate({optional:!0}),this.auth||t.get().then(r=>this.auth=r,()=>{}),this.messaging||n.get().then(r=>this.messaging=r,()=>{}),this.appCheck||i.get().then(r=>this.appCheck=r,()=>{})}async getAuthToken(){if(this.auth)try{let t=await this.auth.getToken();return t==null?void 0:t.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(t){if(this.appCheck){let n=t?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return n.error?null:n.token}return null}async getContext(t){let n=await this.getAuthToken(),i=await this.getMessagingToken(),r=await this.getAppCheckToken(t);return{authToken:n,messagingToken:i,appCheckToken:r}}};var yt="us-central1";function xn(e){let t=null;return{promise:new Promise((n,i)=>{t=setTimeout(()=>{i(new D("deadline-exceeded","deadline-exceeded"))},e)}),cancel:()=>{t&&clearTimeout(t)}}}var Et=class{constructor(t,n,i,r,s=yt,o){this.app=t,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new wt(n,i,r),this.cancelAllRequests=new Promise(a=>{this.deleteService=()=>Promise.resolve(a())});try{let a=new URL(s);this.customDomain=a.origin,this.region=yt}catch{this.customDomain=null,this.region=s}}_delete(){return this.deleteService()}_url(t){let n=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${n}/${this.region}/${t}`:this.customDomain!==null?`${this.customDomain}/${t}`:`https://${this.region}-${n}.cloudfunctions.net/${t}`}};function Sn(e,t,n){e.emulatorOrigin=`http://${t}:${n}`}function Dn(e,t,n){return i=>An(e,t,i,n||{})}async function Cn(e,t,n,i){n["Content-Type"]="application/json";let r;try{r=await i(e,{method:"POST",body:JSON.stringify(t),headers:n})}catch{return{status:0,json:null}}let s=null;try{s=await r.json()}catch{}return{status:r.status,json:s}}function An(e,t,n,i){let r=e._url(t);return In(e,r,n,i)}async function In(e,t,n,i){n=_t(n);let r={data:n},s={},o=await e.contextProvider.getContext(i.limitedUseAppCheckTokens);o.authToken&&(s.Authorization="Bearer "+o.authToken),o.messagingToken&&(s["Firebase-Instance-ID-Token"]=o.messagingToken),o.appCheckToken!==null&&(s["X-Firebase-AppCheck"]=o.appCheckToken);let a=i.timeout||7e4,c=xn(a),l=await Promise.race([Cn(t,r,s,e.fetchImpl),c.promise,e.cancelAllRequests]);if(c.cancel(),!l)throw new D("cancelled","Firebase Functions instance was deleted.");let d=vn(l.status,l.json);if(d)throw d;if(!l.json)throw new D("internal","Response is not valid JSON object.");let h=l.json.data;if(typeof h=="undefined"&&(h=l.json.result),typeof h=="undefined")throw new D("internal","Response is missing data field.");return{data:J(h)}}var Zt="@firebase/functions",te="0.11.1";var Tn="auth-internal",On="app-check-internal",kn="messaging-internal";function Nn(e,t){let n=(i,{instanceIdentifier:r})=>{let s=i.getProvider("app").getImmediate(),o=i.getProvider(Tn),a=i.getProvider(kn),c=i.getProvider(On);return new Et(s,o,a,c,r,e)};M(new E(vt,n,"PUBLIC").setMultipleInstances(!0)),S(Zt,te,t),S(Zt,te,"esm2017")}function ne(e=Kt(),t=yt){let i=Jt(H(e),vt).getImmediate({identifier:t}),r=Lt("functions");return r&&Pn(i,...r),i}function Pn(e,t,n){Sn(H(e),t,n)}function xt(e,t,n){return Dn(H(e),t,n)}Nn(fetch.bind(self));var Ln={apiKey:"AIzaSyAUwu40VKds_nt5hVANQTLgXBe6HY_CABY",authDomain:"bc-web-projects-1703845016786.firebaseapp.com",projectId:"bc-web-projects-1703845016786",storageBucket:"bc-web-projects-1703845016786.appspot.com",messagingSenderId:"1052182286356",appId:"1:1052182286356:web:05ee5f1fb4a77eb5009701"},Mn=bt(Ln),ie=ne(Mn);var re=document,u=(e,t=re)=>t.querySelector(e),_=(e,t=re)=>t.querySelectorAll(e),I=async(e,t=!0)=>{try{let n=await e;if(n instanceof Response&&t){let i=n;if(!i.ok){let r=await i.text();throw new Error(r)}n=await i.json()}return[n,null]}catch(n){return[null,n]}},se=({file:e,maxSize:t,allowedTypes:n}={file:e})=>new Promise((i,r)=>{let s=e==null?void 0:e.size,o=e==null?void 0:e.type,a=e==null?void 0:e.name.split(" ").join("_"),c=a.substr(0,a.lastIndexOf(".")),l=c||a,d=o==="image/jpeg"?"jpg":o==="image/png"?"png":o==="application/pdf"?"pdf":null,h=new FileReader;(!n.includes(d)||d===null)&&r("File format is not supported."),s>t&&r("File size exceeded. 1MB max."),h.onload=()=>{let p={fileSize:s,fileType:o,fileNameRaw:a,noExtName:c,fileName:l,fileExt:d,fileResult:h.result,fileData:e};i(p)},e&&h.readAsDataURL(e)});var oe=async()=>{let[e,t]=await I(fetch("https://ipinfo.io?token=b31525eea9051f"));return t?{ip:""}:e},K=e=>{var t=["mousedown","click","mouseup"];t.forEach(n=>e.dispatchEvent(new MouseEvent(n,{view:window,bubbles:!0,cancelable:!0,buttons:1})))};var T=class{constructor(t,n,i,r){if(isNaN(t)||isNaN(n))throw new Error(`Point is invalid: (${t}, ${n})`);this.x=+t,this.y=+n,this.pressure=i||0,this.time=r||Date.now()}distanceTo(t){return Math.sqrt(Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2))}equals(t){return this.x===t.x&&this.y===t.y&&this.pressure===t.pressure&&this.time===t.time}velocityFrom(t){return this.time!==t.time?this.distanceTo(t)/(this.time-t.time):0}},St=class e{constructor(t,n,i,r,s,o){this.startPoint=t,this.control2=n,this.control1=i,this.endPoint=r,this.startWidth=s,this.endWidth=o}static fromPoints(t,n){let i=this.calculateControlPoints(t[0],t[1],t[2]).c2,r=this.calculateControlPoints(t[1],t[2],t[3]).c1;return new e(t[1],i,r,t[2],n.start,n.end)}static calculateControlPoints(t,n,i){let r=t.x-n.x,s=t.y-n.y,o=n.x-i.x,a=n.y-i.y,c={x:(t.x+n.x)/2,y:(t.y+n.y)/2},l={x:(n.x+i.x)/2,y:(n.y+i.y)/2},d=Math.sqrt(r*r+s*s),h=Math.sqrt(o*o+a*a),p=c.x-l.x,m=c.y-l.y,g=h/(d+h),v={x:l.x+p*g,y:l.y+m*g},F=n.x-v.x,P=n.y-v.y;return{c1:new T(c.x+F,c.y+P),c2:new T(l.x+F,l.y+P)}}length(){let n=0,i,r;for(let s=0;s<=10;s+=1){let o=s/10,a=this.point(o,this.startPoint.x,this.control1.x,this.control2.x,this.endPoint.x),c=this.point(o,this.startPoint.y,this.control1.y,this.control2.y,this.endPoint.y);if(s>0){let l=a-i,d=c-r;n+=Math.sqrt(l*l+d*d)}i=a,r=c}return n}point(t,n,i,r,s){return n*(1-t)*(1-t)*(1-t)+3*i*(1-t)*(1-t)*t+3*r*(1-t)*t*t+s*t*t*t}},Dt=class{constructor(){try{this._et=new EventTarget}catch{this._et=document}}addEventListener(t,n,i){this._et.addEventListener(t,n,i)}dispatchEvent(t){return this._et.dispatchEvent(t)}removeEventListener(t,n,i){this._et.removeEventListener(t,n,i)}};function Bn(e,t=250){let n=0,i=null,r,s,o,a=()=>{n=Date.now(),i=null,r=e.apply(s,o),i||(s=null,o=[])};return function(...l){let d=Date.now(),h=t-(d-n);return s=this,o=l,h<=0||h>t?(i&&(clearTimeout(i),i=null),n=d,r=e.apply(s,o),i||(s=null,o=[])):i||(i=window.setTimeout(a,h)),r}}var Y=class e extends Dt{constructor(t,n={}){super(),this.canvas=t,this._drawningStroke=!1,this._isEmpty=!0,this._lastPoints=[],this._data=[],this._lastVelocity=0,this._lastWidth=0,this._handleMouseDown=i=>{i.buttons===1&&(this._drawningStroke=!0,this._strokeBegin(i))},this._handleMouseMove=i=>{this._drawningStroke&&this._strokeMoveUpdate(i)},this._handleMouseUp=i=>{i.buttons===1&&this._drawningStroke&&(this._drawningStroke=!1,this._strokeEnd(i))},this._handleTouchStart=i=>{if(i.cancelable&&i.preventDefault(),i.targetTouches.length===1){let r=i.changedTouches[0];this._strokeBegin(r)}},this._handleTouchMove=i=>{i.cancelable&&i.preventDefault();let r=i.targetTouches[0];this._strokeMoveUpdate(r)},this._handleTouchEnd=i=>{if(i.target===this.canvas){i.cancelable&&i.preventDefault();let s=i.changedTouches[0];this._strokeEnd(s)}},this._handlePointerStart=i=>{this._drawningStroke=!0,i.preventDefault(),this._strokeBegin(i)},this._handlePointerMove=i=>{this._drawningStroke&&(i.preventDefault(),this._strokeMoveUpdate(i))},this._handlePointerEnd=i=>{this._drawningStroke&&(i.preventDefault(),this._drawningStroke=!1,this._strokeEnd(i))},this.velocityFilterWeight=n.velocityFilterWeight||.7,this.minWidth=n.minWidth||.5,this.maxWidth=n.maxWidth||2.5,this.throttle="throttle"in n?n.throttle:16,this.minDistance="minDistance"in n?n.minDistance:5,this.dotSize=n.dotSize||0,this.penColor=n.penColor||"black",this.backgroundColor=n.backgroundColor||"rgba(0,0,0,0)",this.compositeOperation=n.compositeOperation||"source-over",this._strokeMoveUpdate=this.throttle?Bn(e.prototype._strokeUpdate,this.throttle):e.prototype._strokeUpdate,this._ctx=t.getContext("2d"),this.clear(),this.on()}clear(){let{_ctx:t,canvas:n}=this;t.fillStyle=this.backgroundColor,t.clearRect(0,0,n.width,n.height),t.fillRect(0,0,n.width,n.height),this._data=[],this._reset(this._getPointGroupOptions()),this._isEmpty=!0}fromDataURL(t,n={}){return new Promise((i,r)=>{let s=new Image,o=n.ratio||window.devicePixelRatio||1,a=n.width||this.canvas.width/o,c=n.height||this.canvas.height/o,l=n.xOffset||0,d=n.yOffset||0;this._reset(this._getPointGroupOptions()),s.onload=()=>{this._ctx.drawImage(s,l,d,a,c),i()},s.onerror=h=>{r(h)},s.crossOrigin="anonymous",s.src=t,this._isEmpty=!1})}toDataURL(t="image/png",n){switch(t){case"image/svg+xml":return typeof n!="object"&&(n=void 0),`data:image/svg+xml;base64,${btoa(this.toSVG(n))}`;default:return typeof n!="number"&&(n=void 0),this.canvas.toDataURL(t,n)}}on(){this.canvas.style.touchAction="none",this.canvas.style.msTouchAction="none",this.canvas.style.userSelect="none";let t=/Macintosh/.test(navigator.userAgent)&&"ontouchstart"in document;window.PointerEvent&&!t?this._handlePointerEvents():(this._handleMouseEvents(),"ontouchstart"in window&&this._handleTouchEvents())}off(){this.canvas.style.touchAction="auto",this.canvas.style.msTouchAction="auto",this.canvas.style.userSelect="auto",this.canvas.removeEventListener("pointerdown",this._handlePointerStart),this.canvas.removeEventListener("pointermove",this._handlePointerMove),this.canvas.ownerDocument.removeEventListener("pointerup",this._handlePointerEnd),this.canvas.removeEventListener("mousedown",this._handleMouseDown),this.canvas.removeEventListener("mousemove",this._handleMouseMove),this.canvas.ownerDocument.removeEventListener("mouseup",this._handleMouseUp),this.canvas.removeEventListener("touchstart",this._handleTouchStart),this.canvas.removeEventListener("touchmove",this._handleTouchMove),this.canvas.removeEventListener("touchend",this._handleTouchEnd)}isEmpty(){return this._isEmpty}fromData(t,{clear:n=!0}={}){n&&this.clear(),this._fromData(t,this._drawCurve.bind(this),this._drawDot.bind(this)),this._data=this._data.concat(t)}toData(){return this._data}_getPointGroupOptions(t){return{penColor:t&&"penColor"in t?t.penColor:this.penColor,dotSize:t&&"dotSize"in t?t.dotSize:this.dotSize,minWidth:t&&"minWidth"in t?t.minWidth:this.minWidth,maxWidth:t&&"maxWidth"in t?t.maxWidth:this.maxWidth,velocityFilterWeight:t&&"velocityFilterWeight"in t?t.velocityFilterWeight:this.velocityFilterWeight,compositeOperation:t&&"compositeOperation"in t?t.compositeOperation:this.compositeOperation}}_strokeBegin(t){this.dispatchEvent(new CustomEvent("beginStroke",{detail:t}));let n=this._getPointGroupOptions(),i=Object.assign(Object.assign({},n),{points:[]});this._data.push(i),this._reset(n),this._strokeUpdate(t)}_strokeUpdate(t){if(this._data.length===0){this._strokeBegin(t);return}this.dispatchEvent(new CustomEvent("beforeUpdateStroke",{detail:t}));let n=t.clientX,i=t.clientY,r=t.pressure!==void 0?t.pressure:t.force!==void 0?t.force:0,s=this._createPoint(n,i,r),o=this._data[this._data.length-1],a=o.points,c=a.length>0&&a[a.length-1],l=c?s.distanceTo(c)<=this.minDistance:!1,d=this._getPointGroupOptions(o);if(!c||!(c&&l)){let h=this._addPoint(s,d);c?h&&this._drawCurve(h,d):this._drawDot(s,d),a.push({time:s.time,x:s.x,y:s.y,pressure:s.pressure})}this.dispatchEvent(new CustomEvent("afterUpdateStroke",{detail:t}))}_strokeEnd(t){this._strokeUpdate(t),this.dispatchEvent(new CustomEvent("endStroke",{detail:t}))}_handlePointerEvents(){this._drawningStroke=!1,this.canvas.addEventListener("pointerdown",this._handlePointerStart),this.canvas.addEventListener("pointermove",this._handlePointerMove),this.canvas.ownerDocument.addEventListener("pointerup",this._handlePointerEnd)}_handleMouseEvents(){this._drawningStroke=!1,this.canvas.addEventListener("mousedown",this._handleMouseDown),this.canvas.addEventListener("mousemove",this._handleMouseMove),this.canvas.ownerDocument.addEventListener("mouseup",this._handleMouseUp)}_handleTouchEvents(){this.canvas.addEventListener("touchstart",this._handleTouchStart),this.canvas.addEventListener("touchmove",this._handleTouchMove),this.canvas.addEventListener("touchend",this._handleTouchEnd)}_reset(t){this._lastPoints=[],this._lastVelocity=0,this._lastWidth=(t.minWidth+t.maxWidth)/2,this._ctx.fillStyle=t.penColor,this._ctx.globalCompositeOperation=t.compositeOperation}_createPoint(t,n,i){let r=this.canvas.getBoundingClientRect();return new T(t-r.left,n-r.top,i,new Date().getTime())}_addPoint(t,n){let{_lastPoints:i}=this;if(i.push(t),i.length>2){i.length===3&&i.unshift(i[0]);let r=this._calculateCurveWidths(i[1],i[2],n),s=St.fromPoints(i,r);return i.shift(),s}return null}_calculateCurveWidths(t,n,i){let r=i.velocityFilterWeight*n.velocityFrom(t)+(1-i.velocityFilterWeight)*this._lastVelocity,s=this._strokeWidth(r,i),o={end:s,start:this._lastWidth};return this._lastVelocity=r,this._lastWidth=s,o}_strokeWidth(t,n){return Math.max(n.maxWidth/(t+1),n.minWidth)}_drawCurveSegment(t,n,i){let r=this._ctx;r.moveTo(t,n),r.arc(t,n,i,0,2*Math.PI,!1),this._isEmpty=!1}_drawCurve(t,n){let i=this._ctx,r=t.endWidth-t.startWidth,s=Math.ceil(t.length())*2;i.beginPath(),i.fillStyle=n.penColor;for(let o=0;o<s;o+=1){let a=o/s,c=a*a,l=c*a,d=1-a,h=d*d,p=h*d,m=p*t.startPoint.x;m+=3*h*a*t.control1.x,m+=3*d*c*t.control2.x,m+=l*t.endPoint.x;let g=p*t.startPoint.y;g+=3*h*a*t.control1.y,g+=3*d*c*t.control2.y,g+=l*t.endPoint.y;let v=Math.min(t.startWidth+l*r,n.maxWidth);this._drawCurveSegment(m,g,v)}i.closePath(),i.fill()}_drawDot(t,n){let i=this._ctx,r=n.dotSize>0?n.dotSize:(n.minWidth+n.maxWidth)/2;i.beginPath(),this._drawCurveSegment(t.x,t.y,r),i.closePath(),i.fillStyle=n.penColor,i.fill()}_fromData(t,n,i){for(let r of t){let{points:s}=r,o=this._getPointGroupOptions(r);if(s.length>1)for(let a=0;a<s.length;a+=1){let c=s[a],l=new T(c.x,c.y,c.pressure,c.time);a===0&&this._reset(o);let d=this._addPoint(l,o);d&&n(d,o)}else this._reset(o),i(s[0],o)}}toSVG({includeBackgroundColor:t=!1}={}){let n=this._data,i=Math.max(window.devicePixelRatio||1,1),r=0,s=0,o=this.canvas.width/i,a=this.canvas.height/i,c=document.createElementNS("http://www.w3.org/2000/svg","svg");if(c.setAttribute("xmlns","http://www.w3.org/2000/svg"),c.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink"),c.setAttribute("viewBox",`${r} ${s} ${o} ${a}`),c.setAttribute("width",o.toString()),c.setAttribute("height",a.toString()),t&&this.backgroundColor){let l=document.createElement("rect");l.setAttribute("width","100%"),l.setAttribute("height","100%"),l.setAttribute("fill",this.backgroundColor),c.appendChild(l)}return this._fromData(n,(l,{penColor:d})=>{let h=document.createElement("path");if(!isNaN(l.control1.x)&&!isNaN(l.control1.y)&&!isNaN(l.control2.x)&&!isNaN(l.control2.y)){let p=`M ${l.startPoint.x.toFixed(3)},${l.startPoint.y.toFixed(3)} C ${l.control1.x.toFixed(3)},${l.control1.y.toFixed(3)} ${l.control2.x.toFixed(3)},${l.control2.y.toFixed(3)} ${l.endPoint.x.toFixed(3)},${l.endPoint.y.toFixed(3)}`;h.setAttribute("d",p),h.setAttribute("stroke-width",(l.endWidth*2.25).toFixed(3)),h.setAttribute("stroke",d),h.setAttribute("fill","none"),h.setAttribute("stroke-linecap","round"),c.appendChild(h)}},(l,{penColor:d,dotSize:h,minWidth:p,maxWidth:m})=>{let g=document.createElement("circle"),v=h>0?h:(p+m)/2;g.setAttribute("r",v.toString()),g.setAttribute("cx",l.x.toString()),g.setAttribute("cy",l.y.toString()),g.setAttribute("fill",d),c.appendChild(g)}),c.outerHTML}};var X=e=>new Y(e,{minWidth:1,maxWidth:3,throttle:5,penColor:"#333"}),Q=e=>{let t=Math.max(window.devicePixelRatio||1,1);e.width=e.offsetWidth*t,e.height=e.offsetHeight*t,e.getContext("2d",{willReadFrequently:!0}).scale(t,t),X(e).fromData(X(e).toData())},Ct=e=>{let t=document.createElement("canvas"),n=t.getContext("2d",{willReadFrequently:!0});t.width=e.width,t.height=e.height,n.drawImage(e,0,0);let i=t.width,r=t.height,s={x:[],y:[]},o=n.getImageData(0,0,t.width,t.height),a,c,l;for(c=0;c<r;c++)for(a=0;a<i;a++)l=(c*i+a)*4,o.data[l+3]>0&&(s.x.push(a),s.y.push(c));s.x.sort((p,m)=>p-m),s.y.sort((p,m)=>p-m);let d=s.x.length-1;i=s.x[d]-s.x[0],r=s.y[d]-s.y[0];let h=n.getImageData(s.x[0],s.y[0],i,r);return t.width=i,t.height=r,n.putImageData(h,0,0),t.toDataURL()};var k="",O="draw",$=u(".p-1-body-content"),Z=u('[data-el="signature-form"]'),N=u("canvas.signature-pad",Z),At=X(N),It=u('[data-el="signature-text-input"]',Z),U=u("#signUpload",Z),ae=u(".signing-preloader"),Rn=u("[data-sign-error]"),$n=u("[data-clear=signature]"),R=u("#textCanvas").getContext("2d"),Un=()=>{u(".sign-uploaded-wrapper").style.display="none",u(".sign-upload-field-wrapper").style.display="flex",u(".sign-uploaded-image").src="",k="",It.value="",U.value="",At.clear()};(async()=>{let e=_("[data-audit-loc]"),t=_("[data-audit-ip]"),{ip:n,city:i,region:r,country:s,timezone:o}=await oe();if(window.bc_client.timezone=o,!n||!s){e.forEach(a=>a.parentNode.closest("div").remove());return}e.forEach(a=>a.textContent=`${i}, ${r}, ${s}`),t.forEach(a=>a.textContent=n),u("[data-audit-file]").innerHTML=window.bc_client.document_title.replaceAll("_","_<wbr>")})();u('[data-el="signature-trigger"]').addEventListener("click",e=>{e.preventDefault();let t=_("input[data-solution]"),n=!1;for(let i of t)if(i.checked){n=!0;break}if(!n)return $.classList.add("is--requesting-solution"),u(".is--work-statement").scrollIntoView(),setTimeout(()=>{let i=u('[data-bc-dropdown-close="signature-modal"]');K(i)},500),!1;$.classList.remove("is--requesting-solution"),N.width=N.offsetWidth,setTimeout(()=>Q(N),500)});_(".p-1-tabs-menu-link").forEach(e=>{e.addEventListener("click",()=>{O=e.getAttribute("data-w-tab")})});_("[data-bc-dropdown-close]").forEach(e=>{e.addEventListener("click",()=>{let t=e.closest(".w-dropdown[data-bc-dropdown]"),n=u(".w-dropdown-toggle",t);n.classList.contains("w--open")&&K(n)})});_("[data-solution-option-list] input").forEach(e=>{e.addEventListener("change",()=>{e.checked&&(u("[data-solution-error]").style.cssText+="display: none !important")})});It.addEventListener("keyup",function(){let e="   "+this.value+"   ";R.canvas.width=R.measureText(e).width,R.font="4em Great Vibes",R.fillText(e,0,70)},!1);U.addEventListener("change",async()=>{if(U.value){let[e,t]=await I(se({file:U.files[0],allowedTypes:["jpg","png"],maxSize:1048576}));if(t)return alert("Upload failed: "+t);console.log(e),k=e.fileResult,u(".sign-uploaded-image").src=k,u(".sign-upload-field-wrapper").style.display="none",u(".sign-uploaded-wrapper").style.display="inline-block"}});$n.addEventListener("click",()=>Un());document.addEventListener("keydown",e=>{let t=u(".p-1-body-content").classList.contains("is--signing");if(e.key==="Escape"){if(t){e.preventDefault(),e.stopPropagation();return}_(".w-dropdown[data-bc-dropdown]").forEach(n=>{let i=u(".w-dropdown-toggle",n),r=()=>{let s=_(".w-dropdown[data-bc-dropdown]",n);return s.length?![...s].some(a=>u(".w-dropdown-toggle",a).classList.contains("w--open")):!0};if(i.classList.contains("w--open")){if(!r)return;K(i)}})}});Z.addEventListener("submit",async e=>{var Tt;e.preventDefault(),e.stopPropagation(),$.classList.add("is--signing");let t=()=>{ae.style.display="none",Rn.style.display="block",$.classList.remove("is--signing")};if(_("[class^=signature-response]").forEach(b=>b.style.display="none"),ae.style.display="block",O==="draw"&&At.isEmpty()||O==="type"&&!It.value||O==="upload"&&!U.value){t();return}O==="draw"&&(k=Ct(At.canvas)),O==="type"&&(k=Ct(R.canvas));let n=u("input[data-solution]:checked"),i=n.getAttribute("data-solution"),r=n.value,s=n.getAttribute("data-solution-duration"),o=n.getAttribute("data-solution-cost"),a=u(`a[data-target="${i}"]`);if(a){u("[data-solution-name-target]").textContent=r,u("[data-solution-duration-target]").textContent=s,u("[data-solution-cost-target]").textContent=o;let[,b]=await I(htmx.ajax("GET",`${a}`,{select:`#${i}`,target:"#solutions"}));if(b)return t(),alert(b)}for(let b of _("[data-el-signature-image]"))b.dataset.elSignatureImage==="bc"&&(b.src="bc_signature"),b.dataset.elSignatureImage==="client"&&(b.src="client_signature"),b.nextElementSibling&&(b.nextElementSibling.style.display="none");for(let b of _('[data-el="signature-date"]'))b.textContent="signature_date";let c=u('link[href$="css"]').getAttribute("href"),[l,d]=await I(fetch(c),!1);if(d)return t(),console.error(d);let h=await l.text(),p=u("[data-page-style]").innerHTML,m=`
			<!DOCTYPE html>
			<html>
				<head>
					<style>${h}</style>
					<style>${p}</style>
					<style>
						.w-dropdown-list.w--open,
						img[data-el-signature-image] ~ div,
						.p-1-page [data-bc-modal-signature] {
							display: none !important;
							opacity: 0 !important;
						}

						img[data-el-signature-image],
						.p-1-page.is--audit {
							display: block !important;
						}
					</style>
				</head>
				<body class="body-proposal">
					${$.outerHTML}
				</body>
			</html>
	`;window.bc_client.signed_time=new Date().toISOString(),window.bc_client.signature=k,window.bc_client.email=window.bc_client.email||"bakercreativedesign1@gmail.com";let g={content:m,details:window.bc_client},v=xt(ie,"processPdf"),[F,P]=await I(v(g));if(P)return t(),console.error(P);window.location.replace(`/success/proposal-success?file=${encodeURIComponent((Tt=F.file_share_link)!=null?Tt:"")}`)});window.addEventListener("resize",Q(N));Q(N);})();
/*! Bundled license information:

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/functions/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/functions/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

signature_pad/dist/signature_pad.js:
  (*!
   * Signature Pad v4.1.6 | https://github.com/szimek/signature_pad
   * (c) 2023 Szymon Nowak | Released under the MIT license
   *)
*/
//# sourceMappingURL=index.js.map
