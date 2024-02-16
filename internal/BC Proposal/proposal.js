(()=>{var ke=function(t){let e=[],n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},ct=function(t){let e=[],n=0,i=0;for(;n<t.length;){let s=t[n++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){let r=t[n++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){let r=t[n++],o=t[n++],a=t[n++],c=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{let r=t[n++],o=t[n++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Ne={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();let n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<t.length;s+=3){let r=t[s],o=s+1<t.length,a=o?t[s+1]:0,c=s+2<t.length,l=c?t[s+2]:0,d=r>>2,h=(r&3)<<4|a>>4,p=(a&15)<<2|l>>6,m=l&63;c||(m=64,o||(p=64)),i.push(n[d],n[h],n[p],n[m])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(ke(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):ct(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();let n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<t.length;){let r=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;let l=s<t.length?n[t.charAt(s)]:64;++s;let h=s<t.length?n[t.charAt(s)]:64;if(++s,r==null||a==null||l==null||h==null)throw new Z;let p=r<<2|a>>4;if(i.push(p),l!==64){let m=a<<4&240|l>>2;if(i.push(m),h!==64){let g=l<<6&192|h;i.push(g)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},Z=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},lt=function(t){let e=ke(t);return Ne.encodeByteArray(e,!0)},ee=function(t){return lt(t).replace(/\./g,"")},ht=function(t){try{return Ne.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function dt(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}var ut=()=>dt().__FIREBASE_DEFAULTS__,ft=()=>{if(typeof process=="undefined"||typeof process.env=="undefined")return;let t=process.env.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},pt=()=>{if(typeof document=="undefined")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=t&&ht(t[1]);return e&&JSON.parse(e)},Pe=()=>{try{return ut()||ft()||pt()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},mt=t=>{var e,n;return(n=(e=Pe())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Le=t=>{let e=mt(t);if(!e)return;let n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},te=()=>{var t;return(t=Pe())===null||t===void 0?void 0:t.config};var U=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}};function Me(){try{return typeof indexedDB=="object"}catch{return!1}}function Be(){return new Promise((t,e)=>{try{let n=!0,i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var r;e(((r=s.error)===null||r===void 0?void 0:r.message)||"")}}catch(n){e(n)}})}var gt="FirebaseError",w=class t extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=gt,Object.setPrototypeOf(this,t.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,N.prototype.create)}},N=class{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){let i=n[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?bt(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new w(s,a,i)}};function bt(t,e){return t.replace(yt,(n,i)=>{let s=e[i];return s!=null?String(s):`<${i}?>`})}var yt=/\{\$([^}]+)}/g;function F(t,e){if(t===e)return!0;let n=Object.keys(t),i=Object.keys(e);for(let s of n){if(!i.includes(s))return!1;let r=t[s],o=e[s];if(Oe(r)&&Oe(o)){if(!F(r,o))return!1}else if(r!==o)return!1}for(let s of i)if(!n.includes(s))return!1;return!0}function Oe(t){return t!==null&&typeof t=="object"}var Un=4*60*60*1e3;function W(t){return t&&t._delegate?t._delegate:t}var E=class{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var S="[DEFAULT]";var ne=class{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){let i=new U;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{let s=this.getOrInitializeService({instanceIdentifier:n});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;let i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(wt(e))try{this.getOrInitializeService({instanceIdentifier:S})}catch{}for(let[n,i]of this.instancesDeferred.entries()){let s=this.normalizeInstanceIdentifier(n);try{let r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=S){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=S){return this.instances.has(e)}getOptions(e=S){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let s=this.getOrInitializeService({instanceIdentifier:i,options:n});for(let[r,o]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,n){var i;let s=this.normalizeInstanceIdentifier(n),r=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;r.add(e),this.onInitCallbacks.set(s,r);let o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){let i=this.onInitCallbacks.get(n);if(i)for(let s of i)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:_t(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=S){return this.component?this.component.multipleInstances?e:S:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function _t(t){return t===S?void 0:t}function wt(t){return t.instantiationMode==="EAGER"}var j=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let n=new ne(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}};var Et=[],f;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(f||(f={}));var vt={debug:f.DEBUG,verbose:f.VERBOSE,info:f.INFO,warn:f.WARN,error:f.ERROR,silent:f.SILENT},xt=f.INFO,Dt={[f.DEBUG]:"log",[f.VERBOSE]:"log",[f.INFO]:"info",[f.WARN]:"warn",[f.ERROR]:"error"},St=(t,e,...n)=>{if(e<t.logLevel)return;let i=new Date().toISOString(),s=Dt[e];if(s)console[s](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},H=class{constructor(e){this.name=e,this._logLevel=xt,this._logHandler=St,this._userLogHandler=null,Et.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in f))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?vt[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,f.DEBUG,...e),this._logHandler(this,f.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,f.VERBOSE,...e),this._logHandler(this,f.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,f.INFO,...e),this._logHandler(this,f.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,f.WARN,...e),this._logHandler(this,f.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,f.ERROR,...e),this._logHandler(this,f.ERROR,...e)}};var Ct=(t,e)=>e.some(n=>t instanceof n),Re,$e;function At(){return Re||(Re=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function It(){return $e||($e=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var Ue=new WeakMap,se=new WeakMap,Fe=new WeakMap,ie=new WeakMap,oe=new WeakMap;function Tt(t){let e=new Promise((n,i)=>{let s=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(_(t.result)),s()},o=()=>{i(t.error),s()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Ue.set(n,t)}).catch(()=>{}),oe.set(e,t),e}function Ot(t){if(se.has(t))return;let e=new Promise((n,i)=>{let s=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),s()},o=()=>{i(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});se.set(t,e)}var re={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return se.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Fe.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return _(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function We(t){re=t(re)}function kt(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){let i=t.call(V(this),e,...n);return Fe.set(i,e.sort?e.sort():[e]),_(i)}:It().includes(t)?function(...e){return t.apply(V(this),e),_(Ue.get(this))}:function(...e){return _(t.apply(V(this),e))}}function Nt(t){return typeof t=="function"?kt(t):(t instanceof IDBTransaction&&Ot(t),Ct(t,At())?new Proxy(t,re):t)}function _(t){if(t instanceof IDBRequest)return Tt(t);if(ie.has(t))return ie.get(t);let e=Nt(t);return e!==t&&(ie.set(t,e),oe.set(e,t)),e}var V=t=>oe.get(t);function He(t,e,{blocked:n,upgrade:i,blocking:s,terminated:r}={}){let o=indexedDB.open(t,e),a=_(o);return i&&o.addEventListener("upgradeneeded",c=>{i(_(o.result),c.oldVersion,c.newVersion,_(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{r&&c.addEventListener("close",()=>r()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}var Pt=["get","getKey","getAll","getAllKeys","count"],Lt=["put","add","delete","clear"],ae=new Map;function je(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(ae.get(e))return ae.get(e);let n=e.replace(/FromIndex$/,""),i=e!==n,s=Lt.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Pt.includes(n)))return;let r=async function(o,...a){let c=this.transaction(o,s?"readwrite":"readonly"),l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),s&&c.done]))[0]};return ae.set(e,r),r}We(t=>({...t,get:(e,n,i)=>je(e,n)||t.get(e,n,i),has:(e,n)=>!!je(e,n)||t.has(e,n)}));var le=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Mt(n)){let i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}};function Mt(t){let e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}var he="@firebase/app",Ve="0.9.19";var C=new H("@firebase/app"),Bt="@firebase/app-compat",Rt="@firebase/analytics-compat",$t="@firebase/analytics",Ut="@firebase/app-check-compat",Ft="@firebase/app-check",Wt="@firebase/auth",jt="@firebase/auth-compat",Ht="@firebase/database",Vt="@firebase/database-compat",zt="@firebase/functions",Gt="@firebase/functions-compat",qt="@firebase/installations",Jt="@firebase/installations-compat",Kt="@firebase/messaging",Yt="@firebase/messaging-compat",Xt="@firebase/performance",Qt="@firebase/performance-compat",Zt="@firebase/remote-config",en="@firebase/remote-config-compat",tn="@firebase/storage",nn="@firebase/storage-compat",sn="@firebase/firestore",rn="@firebase/firestore-compat",on="firebase";var de="[DEFAULT]",an={[he]:"fire-core",[Bt]:"fire-core-compat",[$t]:"fire-analytics",[Rt]:"fire-analytics-compat",[Ft]:"fire-app-check",[Ut]:"fire-app-check-compat",[Wt]:"fire-auth",[jt]:"fire-auth-compat",[Ht]:"fire-rtdb",[Vt]:"fire-rtdb-compat",[zt]:"fire-fn",[Gt]:"fire-fn-compat",[qt]:"fire-iid",[Jt]:"fire-iid-compat",[Kt]:"fire-fcm",[Yt]:"fire-fcm-compat",[Xt]:"fire-perf",[Qt]:"fire-perf-compat",[Zt]:"fire-rc",[en]:"fire-rc-compat",[tn]:"fire-gcs",[nn]:"fire-gcs-compat",[sn]:"fire-fst",[rn]:"fire-fst-compat","fire-js":"fire-js",[on]:"fire-js-all"};var z=new Map,ue=new Map;function cn(t,e){try{t.container.addComponent(e)}catch(n){C.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function P(t){let e=t.name;if(ue.has(e))return C.debug(`There were multiple attempts to register component ${e}.`),!1;ue.set(e,t);for(let n of z.values())cn(n,t);return!0}function Je(t,e){let n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}var ln={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},v=new N("app","Firebase",ln);var fe=class{constructor(e,n,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new E("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw v.create("app-deleted",{appName:this._name})}};function ge(t,e={}){let n=t;typeof e!="object"&&(e={name:e});let i=Object.assign({name:de,automaticDataCollectionEnabled:!1},e),s=i.name;if(typeof s!="string"||!s)throw v.create("bad-app-name",{appName:String(s)});if(n||(n=te()),!n)throw v.create("no-options");let r=z.get(s);if(r){if(F(n,r.options)&&F(i,r.config))return r;throw v.create("duplicate-app",{appName:s})}let o=new j(s);for(let c of ue.values())o.addComponent(c);let a=new fe(n,i,o);return z.set(s,a),a}function Ke(t=de){let e=z.get(t);if(!e&&t===de&&te())return ge();if(!e)throw v.create("no-app",{appName:t});return e}function x(t,e,n){var i;let s=(i=an[t])!==null&&i!==void 0?i:t;n&&(s+=`-${n}`);let r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){let a=[`Unable to register library "${s}" with version "${e}":`];r&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),C.warn(a.join(" "));return}P(new E(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}var hn="firebase-heartbeat-database",dn=1,L="firebase-heartbeat-store",ce=null;function Ye(){return ce||(ce=He(hn,dn,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(L)}}}).catch(t=>{throw v.create("idb-open",{originalErrorMessage:t.message})})),ce}async function un(t){try{return await(await Ye()).transaction(L).objectStore(L).get(Xe(t))}catch(e){if(e instanceof w)C.warn(e.message);else{let n=v.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});C.warn(n.message)}}}async function ze(t,e){try{let i=(await Ye()).transaction(L,"readwrite");await i.objectStore(L).put(e,Xe(t)),await i.done}catch(n){if(n instanceof w)C.warn(n.message);else{let i=v.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});C.warn(i.message)}}}function Xe(t){return`${t.name}!${t.options.appId}`}var fn=1024,pn=30*24*60*60*1e3,pe=class{constructor(e){this.container=e,this._heartbeatsCache=null;let n=this.container.getProvider("app").getImmediate();this._storage=new me(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){let n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Ge();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i)))return this._heartbeatsCache.heartbeats.push({date:i,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(s=>{let r=new Date(s.date).valueOf();return Date.now()-r<=pn}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";let e=Ge(),{heartbeatsToSend:n,unsentEntries:i}=mn(this._heartbeatsCache.heartbeats),s=ee(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}};function Ge(){return new Date().toISOString().substring(0,10)}function mn(t,e=fn){let n=[],i=t.slice();for(let s of t){let r=n.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),qe(n)>e){r.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),qe(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}var me=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Me()?Be().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await un(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){let s=await this.read();return ze(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){let s=await this.read();return ze(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}};function qe(t){return ee(JSON.stringify({version:2,heartbeats:t})).length}function gn(t){P(new E("platform-logger",e=>new le(e),"PRIVATE")),P(new E("heartbeat",e=>new pe(e),"PRIVATE")),x(he,Ve,t),x(he,Ve,"esm2017"),x("fire-js","")}gn("");var bn="firebase",yn="10.4.0";x(bn,yn,"app");var _n="type.googleapis.com/google.protobuf.Int64Value",wn="type.googleapis.com/google.protobuf.UInt64Value";function tt(t,e){let n={};for(let i in t)t.hasOwnProperty(i)&&(n[i]=e(t[i]));return n}function be(t){if(t==null)return null;if(t instanceof Number&&(t=t.valueOf()),typeof t=="number"&&isFinite(t)||t===!0||t===!1||Object.prototype.toString.call(t)==="[object String]")return t;if(t instanceof Date)return t.toISOString();if(Array.isArray(t))return t.map(e=>be(e));if(typeof t=="function"||typeof t=="object")return tt(t,e=>be(e));throw new Error("Data cannot be encoded in JSON: "+t)}function G(t){if(t==null)return t;if(t["@type"])switch(t["@type"]){case _n:case wn:{let e=Number(t.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+t);return e}default:throw new Error("Data cannot be decoded from JSON: "+t)}return Array.isArray(t)?t.map(e=>G(e)):typeof t=="function"||typeof t=="object"?tt(t,e=>G(e)):t}var Ee="functions";var Qe={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},D=class extends w{constructor(e,n,i){super(`${Ee}/${e}`,n||""),this.details=i}};function En(t){if(t>=200&&t<300)return"ok";switch(t){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function vn(t,e){let n=En(t),i=n,s;try{let r=e&&e.error;if(r){let o=r.status;if(typeof o=="string"){if(!Qe[o])return new D("internal","internal");n=Qe[o],i=o}let a=r.message;typeof a=="string"&&(i=a),s=r.details,s!==void 0&&(s=G(s))}}catch{}return n==="ok"?null:new D(n,i,s)}var ye=class{constructor(e,n,i){this.auth=null,this.messaging=null,this.appCheck=null,this.auth=e.getImmediate({optional:!0}),this.messaging=n.getImmediate({optional:!0}),this.auth||e.get().then(s=>this.auth=s,()=>{}),this.messaging||n.get().then(s=>this.messaging=s,()=>{}),this.appCheck||i.get().then(s=>this.appCheck=s,()=>{})}async getAuthToken(){if(this.auth)try{let e=await this.auth.getToken();return e==null?void 0:e.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.appCheck){let n=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return n.error?null:n.token}return null}async getContext(e){let n=await this.getAuthToken(),i=await this.getMessagingToken(),s=await this.getAppCheckToken(e);return{authToken:n,messagingToken:i,appCheckToken:s}}};var _e="us-central1";function xn(t){let e=null;return{promise:new Promise((n,i)=>{e=setTimeout(()=>{i(new D("deadline-exceeded","deadline-exceeded"))},t)}),cancel:()=>{e&&clearTimeout(e)}}}var we=class{constructor(e,n,i,s,r=_e,o){this.app=e,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new ye(n,i,s),this.cancelAllRequests=new Promise(a=>{this.deleteService=()=>Promise.resolve(a())});try{let a=new URL(r);this.customDomain=a.origin,this.region=_e}catch{this.customDomain=null,this.region=r}}_delete(){return this.deleteService()}_url(e){let n=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${n}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${n}.cloudfunctions.net/${e}`}};function Dn(t,e,n){t.emulatorOrigin=`http://${e}:${n}`}function Sn(t,e,n){return i=>An(t,e,i,n||{})}async function Cn(t,e,n,i){n["Content-Type"]="application/json";let s;try{s=await i(t,{method:"POST",body:JSON.stringify(e),headers:n})}catch{return{status:0,json:null}}let r=null;try{r=await s.json()}catch{}return{status:s.status,json:r}}function An(t,e,n,i){let s=t._url(e);return In(t,s,n,i)}async function In(t,e,n,i){n=be(n);let s={data:n},r={},o=await t.contextProvider.getContext(i.limitedUseAppCheckTokens);o.authToken&&(r.Authorization="Bearer "+o.authToken),o.messagingToken&&(r["Firebase-Instance-ID-Token"]=o.messagingToken),o.appCheckToken!==null&&(r["X-Firebase-AppCheck"]=o.appCheckToken);let a=i.timeout||7e4,c=xn(a),l=await Promise.race([Cn(e,s,r,t.fetchImpl),c.promise,t.cancelAllRequests]);if(c.cancel(),!l)throw new D("cancelled","Firebase Functions instance was deleted.");let d=vn(l.status,l.json);if(d)throw d;if(!l.json)throw new D("internal","Response is not valid JSON object.");let h=l.json.data;if(typeof h=="undefined"&&(h=l.json.result),typeof h=="undefined")throw new D("internal","Response is missing data field.");return{data:G(h)}}var Ze="@firebase/functions",et="0.10.0";var Tn="auth-internal",On="app-check-internal",kn="messaging-internal";function Nn(t,e){let n=(i,{instanceIdentifier:s})=>{let r=i.getProvider("app").getImmediate(),o=i.getProvider(Tn),a=i.getProvider(kn),c=i.getProvider(On);return new we(r,o,a,c,s,t)};P(new E(Ee,n,"PUBLIC").setMultipleInstances(!0)),x(Ze,et,e),x(Ze,et,"esm2017")}function nt(t=Ke(),e=_e){let i=Je(W(t),Ee).getImmediate({identifier:e}),s=Le("functions");return s&&Pn(i,...s),i}function Pn(t,e,n){Dn(W(t),e,n)}function ve(t,e,n){return Sn(W(t),e,n)}Nn(fetch.bind(self));var Ln={apiKey:"AIzaSyAUwu40VKds_nt5hVANQTLgXBe6HY_CABY",authDomain:"bc-web-projects-1703845016786.firebaseapp.com",projectId:"bc-web-projects-1703845016786",storageBucket:"bc-web-projects-1703845016786.appspot.com",messagingSenderId:"1052182286356",appId:"1:1052182286356:web:05ee5f1fb4a77eb5009701"},Mn=ge(Ln),it=nt(Mn);var A=class{constructor(e,n,i,s){if(isNaN(e)||isNaN(n))throw new Error(`Point is invalid: (${e}, ${n})`);this.x=+e,this.y=+n,this.pressure=i||0,this.time=s||Date.now()}distanceTo(e){return Math.sqrt(Math.pow(this.x-e.x,2)+Math.pow(this.y-e.y,2))}equals(e){return this.x===e.x&&this.y===e.y&&this.pressure===e.pressure&&this.time===e.time}velocityFrom(e){return this.time!==e.time?this.distanceTo(e)/(this.time-e.time):0}},xe=class t{constructor(e,n,i,s,r,o){this.startPoint=e,this.control2=n,this.control1=i,this.endPoint=s,this.startWidth=r,this.endWidth=o}static fromPoints(e,n){let i=this.calculateControlPoints(e[0],e[1],e[2]).c2,s=this.calculateControlPoints(e[1],e[2],e[3]).c1;return new t(e[1],i,s,e[2],n.start,n.end)}static calculateControlPoints(e,n,i){let s=e.x-n.x,r=e.y-n.y,o=n.x-i.x,a=n.y-i.y,c={x:(e.x+n.x)/2,y:(e.y+n.y)/2},l={x:(n.x+i.x)/2,y:(n.y+i.y)/2},d=Math.sqrt(s*s+r*r),h=Math.sqrt(o*o+a*a),p=c.x-l.x,m=c.y-l.y,g=h/(d+h),b={x:l.x+p*g,y:l.y+m*g},Ie=n.x-b.x,Te=n.y-b.y;return{c1:new A(c.x+Ie,c.y+Te),c2:new A(l.x+Ie,l.y+Te)}}length(){let n=0,i,s;for(let r=0;r<=10;r+=1){let o=r/10,a=this.point(o,this.startPoint.x,this.control1.x,this.control2.x,this.endPoint.x),c=this.point(o,this.startPoint.y,this.control1.y,this.control2.y,this.endPoint.y);if(r>0){let l=a-i,d=c-s;n+=Math.sqrt(l*l+d*d)}i=a,s=c}return n}point(e,n,i,s,r){return n*(1-e)*(1-e)*(1-e)+3*i*(1-e)*(1-e)*e+3*s*(1-e)*e*e+r*e*e*e}},De=class{constructor(){try{this._et=new EventTarget}catch{this._et=document}}addEventListener(e,n,i){this._et.addEventListener(e,n,i)}dispatchEvent(e){return this._et.dispatchEvent(e)}removeEventListener(e,n,i){this._et.removeEventListener(e,n,i)}};function Bn(t,e=250){let n=0,i=null,s,r,o,a=()=>{n=Date.now(),i=null,s=t.apply(r,o),i||(r=null,o=[])};return function(...l){let d=Date.now(),h=e-(d-n);return r=this,o=l,h<=0||h>e?(i&&(clearTimeout(i),i=null),n=d,s=t.apply(r,o),i||(r=null,o=[])):i||(i=window.setTimeout(a,h)),s}}var q=class t extends De{constructor(e,n={}){super(),this.canvas=e,this._drawningStroke=!1,this._isEmpty=!0,this._lastPoints=[],this._data=[],this._lastVelocity=0,this._lastWidth=0,this._handleMouseDown=i=>{i.buttons===1&&(this._drawningStroke=!0,this._strokeBegin(i))},this._handleMouseMove=i=>{this._drawningStroke&&this._strokeMoveUpdate(i)},this._handleMouseUp=i=>{i.buttons===1&&this._drawningStroke&&(this._drawningStroke=!1,this._strokeEnd(i))},this._handleTouchStart=i=>{if(i.cancelable&&i.preventDefault(),i.targetTouches.length===1){let s=i.changedTouches[0];this._strokeBegin(s)}},this._handleTouchMove=i=>{i.cancelable&&i.preventDefault();let s=i.targetTouches[0];this._strokeMoveUpdate(s)},this._handleTouchEnd=i=>{if(i.target===this.canvas){i.cancelable&&i.preventDefault();let r=i.changedTouches[0];this._strokeEnd(r)}},this._handlePointerStart=i=>{this._drawningStroke=!0,i.preventDefault(),this._strokeBegin(i)},this._handlePointerMove=i=>{this._drawningStroke&&(i.preventDefault(),this._strokeMoveUpdate(i))},this._handlePointerEnd=i=>{this._drawningStroke&&(i.preventDefault(),this._drawningStroke=!1,this._strokeEnd(i))},this.velocityFilterWeight=n.velocityFilterWeight||.7,this.minWidth=n.minWidth||.5,this.maxWidth=n.maxWidth||2.5,this.throttle="throttle"in n?n.throttle:16,this.minDistance="minDistance"in n?n.minDistance:5,this.dotSize=n.dotSize||0,this.penColor=n.penColor||"black",this.backgroundColor=n.backgroundColor||"rgba(0,0,0,0)",this.compositeOperation=n.compositeOperation||"source-over",this._strokeMoveUpdate=this.throttle?Bn(t.prototype._strokeUpdate,this.throttle):t.prototype._strokeUpdate,this._ctx=e.getContext("2d"),this.clear(),this.on()}clear(){let{_ctx:e,canvas:n}=this;e.fillStyle=this.backgroundColor,e.clearRect(0,0,n.width,n.height),e.fillRect(0,0,n.width,n.height),this._data=[],this._reset(this._getPointGroupOptions()),this._isEmpty=!0}fromDataURL(e,n={}){return new Promise((i,s)=>{let r=new Image,o=n.ratio||window.devicePixelRatio||1,a=n.width||this.canvas.width/o,c=n.height||this.canvas.height/o,l=n.xOffset||0,d=n.yOffset||0;this._reset(this._getPointGroupOptions()),r.onload=()=>{this._ctx.drawImage(r,l,d,a,c),i()},r.onerror=h=>{s(h)},r.crossOrigin="anonymous",r.src=e,this._isEmpty=!1})}toDataURL(e="image/png",n){switch(e){case"image/svg+xml":return typeof n!="object"&&(n=void 0),`data:image/svg+xml;base64,${btoa(this.toSVG(n))}`;default:return typeof n!="number"&&(n=void 0),this.canvas.toDataURL(e,n)}}on(){this.canvas.style.touchAction="none",this.canvas.style.msTouchAction="none",this.canvas.style.userSelect="none";let e=/Macintosh/.test(navigator.userAgent)&&"ontouchstart"in document;window.PointerEvent&&!e?this._handlePointerEvents():(this._handleMouseEvents(),"ontouchstart"in window&&this._handleTouchEvents())}off(){this.canvas.style.touchAction="auto",this.canvas.style.msTouchAction="auto",this.canvas.style.userSelect="auto",this.canvas.removeEventListener("pointerdown",this._handlePointerStart),this.canvas.removeEventListener("pointermove",this._handlePointerMove),this.canvas.ownerDocument.removeEventListener("pointerup",this._handlePointerEnd),this.canvas.removeEventListener("mousedown",this._handleMouseDown),this.canvas.removeEventListener("mousemove",this._handleMouseMove),this.canvas.ownerDocument.removeEventListener("mouseup",this._handleMouseUp),this.canvas.removeEventListener("touchstart",this._handleTouchStart),this.canvas.removeEventListener("touchmove",this._handleTouchMove),this.canvas.removeEventListener("touchend",this._handleTouchEnd)}isEmpty(){return this._isEmpty}fromData(e,{clear:n=!0}={}){n&&this.clear(),this._fromData(e,this._drawCurve.bind(this),this._drawDot.bind(this)),this._data=this._data.concat(e)}toData(){return this._data}_getPointGroupOptions(e){return{penColor:e&&"penColor"in e?e.penColor:this.penColor,dotSize:e&&"dotSize"in e?e.dotSize:this.dotSize,minWidth:e&&"minWidth"in e?e.minWidth:this.minWidth,maxWidth:e&&"maxWidth"in e?e.maxWidth:this.maxWidth,velocityFilterWeight:e&&"velocityFilterWeight"in e?e.velocityFilterWeight:this.velocityFilterWeight,compositeOperation:e&&"compositeOperation"in e?e.compositeOperation:this.compositeOperation}}_strokeBegin(e){this.dispatchEvent(new CustomEvent("beginStroke",{detail:e}));let n=this._getPointGroupOptions(),i=Object.assign(Object.assign({},n),{points:[]});this._data.push(i),this._reset(n),this._strokeUpdate(e)}_strokeUpdate(e){if(this._data.length===0){this._strokeBegin(e);return}this.dispatchEvent(new CustomEvent("beforeUpdateStroke",{detail:e}));let n=e.clientX,i=e.clientY,s=e.pressure!==void 0?e.pressure:e.force!==void 0?e.force:0,r=this._createPoint(n,i,s),o=this._data[this._data.length-1],a=o.points,c=a.length>0&&a[a.length-1],l=c?r.distanceTo(c)<=this.minDistance:!1,d=this._getPointGroupOptions(o);if(!c||!(c&&l)){let h=this._addPoint(r,d);c?h&&this._drawCurve(h,d):this._drawDot(r,d),a.push({time:r.time,x:r.x,y:r.y,pressure:r.pressure})}this.dispatchEvent(new CustomEvent("afterUpdateStroke",{detail:e}))}_strokeEnd(e){this._strokeUpdate(e),this.dispatchEvent(new CustomEvent("endStroke",{detail:e}))}_handlePointerEvents(){this._drawningStroke=!1,this.canvas.addEventListener("pointerdown",this._handlePointerStart),this.canvas.addEventListener("pointermove",this._handlePointerMove),this.canvas.ownerDocument.addEventListener("pointerup",this._handlePointerEnd)}_handleMouseEvents(){this._drawningStroke=!1,this.canvas.addEventListener("mousedown",this._handleMouseDown),this.canvas.addEventListener("mousemove",this._handleMouseMove),this.canvas.ownerDocument.addEventListener("mouseup",this._handleMouseUp)}_handleTouchEvents(){this.canvas.addEventListener("touchstart",this._handleTouchStart),this.canvas.addEventListener("touchmove",this._handleTouchMove),this.canvas.addEventListener("touchend",this._handleTouchEnd)}_reset(e){this._lastPoints=[],this._lastVelocity=0,this._lastWidth=(e.minWidth+e.maxWidth)/2,this._ctx.fillStyle=e.penColor,this._ctx.globalCompositeOperation=e.compositeOperation}_createPoint(e,n,i){let s=this.canvas.getBoundingClientRect();return new A(e-s.left,n-s.top,i,new Date().getTime())}_addPoint(e,n){let{_lastPoints:i}=this;if(i.push(e),i.length>2){i.length===3&&i.unshift(i[0]);let s=this._calculateCurveWidths(i[1],i[2],n),r=xe.fromPoints(i,s);return i.shift(),r}return null}_calculateCurveWidths(e,n,i){let s=i.velocityFilterWeight*n.velocityFrom(e)+(1-i.velocityFilterWeight)*this._lastVelocity,r=this._strokeWidth(s,i),o={end:r,start:this._lastWidth};return this._lastVelocity=s,this._lastWidth=r,o}_strokeWidth(e,n){return Math.max(n.maxWidth/(e+1),n.minWidth)}_drawCurveSegment(e,n,i){let s=this._ctx;s.moveTo(e,n),s.arc(e,n,i,0,2*Math.PI,!1),this._isEmpty=!1}_drawCurve(e,n){let i=this._ctx,s=e.endWidth-e.startWidth,r=Math.ceil(e.length())*2;i.beginPath(),i.fillStyle=n.penColor;for(let o=0;o<r;o+=1){let a=o/r,c=a*a,l=c*a,d=1-a,h=d*d,p=h*d,m=p*e.startPoint.x;m+=3*h*a*e.control1.x,m+=3*d*c*e.control2.x,m+=l*e.endPoint.x;let g=p*e.startPoint.y;g+=3*h*a*e.control1.y,g+=3*d*c*e.control2.y,g+=l*e.endPoint.y;let b=Math.min(e.startWidth+l*s,n.maxWidth);this._drawCurveSegment(m,g,b)}i.closePath(),i.fill()}_drawDot(e,n){let i=this._ctx,s=n.dotSize>0?n.dotSize:(n.minWidth+n.maxWidth)/2;i.beginPath(),this._drawCurveSegment(e.x,e.y,s),i.closePath(),i.fillStyle=n.penColor,i.fill()}_fromData(e,n,i){for(let s of e){let{points:r}=s,o=this._getPointGroupOptions(s);if(r.length>1)for(let a=0;a<r.length;a+=1){let c=r[a],l=new A(c.x,c.y,c.pressure,c.time);a===0&&this._reset(o);let d=this._addPoint(l,o);d&&n(d,o)}else this._reset(o),i(r[0],o)}}toSVG({includeBackgroundColor:e=!1}={}){let n=this._data,i=Math.max(window.devicePixelRatio||1,1),s=0,r=0,o=this.canvas.width/i,a=this.canvas.height/i,c=document.createElementNS("http://www.w3.org/2000/svg","svg");if(c.setAttribute("xmlns","http://www.w3.org/2000/svg"),c.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink"),c.setAttribute("viewBox",`${s} ${r} ${o} ${a}`),c.setAttribute("width",o.toString()),c.setAttribute("height",a.toString()),e&&this.backgroundColor){let l=document.createElement("rect");l.setAttribute("width","100%"),l.setAttribute("height","100%"),l.setAttribute("fill",this.backgroundColor),c.appendChild(l)}return this._fromData(n,(l,{penColor:d})=>{let h=document.createElement("path");if(!isNaN(l.control1.x)&&!isNaN(l.control1.y)&&!isNaN(l.control2.x)&&!isNaN(l.control2.y)){let p=`M ${l.startPoint.x.toFixed(3)},${l.startPoint.y.toFixed(3)} C ${l.control1.x.toFixed(3)},${l.control1.y.toFixed(3)} ${l.control2.x.toFixed(3)},${l.control2.y.toFixed(3)} ${l.endPoint.x.toFixed(3)},${l.endPoint.y.toFixed(3)}`;h.setAttribute("d",p),h.setAttribute("stroke-width",(l.endWidth*2.25).toFixed(3)),h.setAttribute("stroke",d),h.setAttribute("fill","none"),h.setAttribute("stroke-linecap","round"),c.appendChild(h)}},(l,{penColor:d,dotSize:h,minWidth:p,maxWidth:m})=>{let g=document.createElement("circle"),b=h>0?h:(p+m)/2;g.setAttribute("r",b.toString()),g.setAttribute("cx",l.x.toString()),g.setAttribute("cy",l.y.toString()),g.setAttribute("fill",d),c.appendChild(g)}),c.outerHTML}};var J=t=>new q(t,{minWidth:1,maxWidth:3,throttle:8,penColor:"#333"}),K=t=>{let e=Math.max(window.devicePixelRatio||1,1);t.width=t.offsetWidth*e,t.height=t.offsetHeight*e,t.getContext("2d",{willReadFrequently:!0}).scale(e,e),J(t).fromData(J(t).toData())},Se=t=>{let e=document.createElement("canvas"),n=e.getContext("2d",{willReadFrequently:!0});e.width=t.width,e.height=t.height,n.drawImage(t,0,0);let i=e.width,s=e.height,r={x:[],y:[]},o=n.getImageData(0,0,e.width,e.height),a,c,l;for(c=0;c<s;c++)for(a=0;a<i;a++)l=(c*i+a)*4,o.data[l+3]>0&&(r.x.push(a),r.y.push(c));r.x.sort((p,m)=>p-m),r.y.sort((p,m)=>p-m);let d=r.x.length-1;i=r.x[d]-r.x[0],s=r.y[d]-r.y[0];let h=n.getImageData(r.x[0],r.y[0],i,s);return e.width=i,e.height=s,n.putImageData(h,0,0),e.toDataURL()};var st=document,u=(t,e=st)=>e.querySelector(t),y=(t,e=st)=>e.querySelectorAll(t),I=async t=>{try{return[await t,null]}catch(e){return[null,e]}},rt=({file:t,maxSize:e,allowedTypes:n}={file:t})=>new Promise((i,s)=>{let r=t==null?void 0:t.size,o=t==null?void 0:t.type,a=t==null?void 0:t.name.split(" ").join("_"),c=a.substr(0,a.lastIndexOf(".")),l=c||a,d=o==="image/jpeg"?"jpg":o==="image/png"?"png":o==="application/pdf"?"pdf":null,h=new FileReader;(!n.includes(d)||d===null)&&s("File format is not supported."),r>e&&s("File size exceeded. 1MB max."),h.onload=()=>{let p={fileSize:r,fileType:o,fileNameRaw:a,noExtName:c,fileName:l,fileExt:d,fileResult:h.result,fileData:t};i(p)},t&&h.readAsDataURL(t)});var ot=async()=>{let[t,e]=await I(fetch("https://ipinfo.io?token=b31525eea9051f"));return e?{ip:""}:await t.json()},Y=t=>{var e=["mousedown","click","mouseup"];e.forEach(n=>t.dispatchEvent(new MouseEvent(n,{view:window,bubbles:!0,cancelable:!0,buttons:1})))};var O="",T="draw",Q=u(".p-1-body-content"),$=u('[data-el="signature-form"]'),k=u("canvas.signature-pad",$),Ce=J(k),Ae=u('[data-el="signature-text-input"]',$),R=u("#signUpload",$),M=u(".signing-preloader"),X=u("[data-sign-error]"),Rn=u("[data-clear=signature]"),B=u("#textCanvas").getContext("2d"),$n=()=>{u(".sign-uploaded-wrapper").style.display="none",u(".sign-upload-field-wrapper").style.display="flex",u(".sign-uploaded-image").src="",O="",Ae.value="",R.value="",Ce.clear()},at="";(async()=>{let t=y("[data-audit-loc]"),e=y("[data-audit-ip]"),{ip:n,city:i,region:s,country:r,timezone:o}=await ot();if(at=o,!n||!r){t.forEach(a=>a.parentNode.closest("div").remove());return}t.forEach(a=>a.textContent=`${i}, ${s}, ${r}`),e.forEach(a=>a.textContent=n),u("[data-audit-file]").innerHTML=window.bc_client.document_title.replaceAll("_","_<wbr>")})();u('[data-el="signature-trigger"]').addEventListener("click",t=>{t.preventDefault();let e=y("input[data-solution]"),n=!1;for(let i of e)if(i.checked){n=!0;break}if(!n)return Q.classList.add("is--requesting-solution"),u(".is--work-statement").scrollIntoView(),setTimeout(()=>{let i=u('[data-bc-dropdown-close="signature-modal"]');Y(i)},500),!1;Q.classList.remove("is--requesting-solution"),k.width=k.offsetWidth,setTimeout(()=>K(k),500)});y(".p-1-tabs-menu-link").forEach(t=>{t.addEventListener("click",()=>{T=t.getAttribute("data-w-tab")})});y("[data-bc-dropdown-close]").forEach(t=>{t.addEventListener("click",()=>{let e=t.closest(".w-dropdown[data-bc-dropdown]"),n=u(".w-dropdown-toggle",e);n.classList.contains("w--open")&&Y(n)})});y("[data-solution-option-list] input").forEach(t=>{t.addEventListener("change",()=>{t.checked&&(u("[data-solution-error]").style.cssText+="display: none !important")})});Ae.addEventListener("keyup",function(){let t="   "+this.value+"   ";B.canvas.width=B.measureText(t).width,B.font="4em Great Vibes",B.fillText(t,0,70)},!1);R.addEventListener("change",async()=>{if(console.log("Changed..."),R.value){let[t,e]=await I(rt({file:R.files[0],allowedTypes:["jpg","png"],maxSize:1048576}));if(e)return alert("Upload failed: "+e);console.log(t),O=t.fileResult,u(".sign-uploaded-image").src=O,u(".sign-upload-field-wrapper").style.display="none",u(".sign-uploaded-wrapper").style.display="inline-block"}});Rn.addEventListener("click",()=>$n());document.addEventListener("keydown",t=>{let e=u(".p-1-body-content").classList.contains("is--signing");(t.key==="Escape"||!e)&&y(".w-dropdown[data-bc-dropdown]").forEach(n=>{let i=u(".w-dropdown-toggle",n),s=()=>{let r=y(".w-dropdown[data-bc-dropdown]",n);return r.length?![...r].some(a=>u(".w-dropdown-toggle",a).classList.contains("w--open")):!0};if(i.classList.contains("w--open")){if(!s)return;Y(i)}})});$.addEventListener("submit",async t=>{t.preventDefault();let e=u("[type=submit]",$);if(y("[class^=signature-response]").forEach(b=>b.style.display="none"),M.style.display="block",T==="draw"&&Ce.isEmpty()||T==="type"&&!Ae.value||T==="upload"&&!R.value){M.style.display="none",X.style.display="block";return}T==="draw"&&(O=Se(Ce.canvas)),T==="type"&&(O=Se(B.canvas));let n=u("input[data-solution]:checked").getAttribute("data-solution"),i=u(`a[data-target="${n}"]`),[,s]=await I(htmx.ajax("GET",`${i}`,{select:`#${n}`,target:"#solutions"}));if(s)return M.style.display="none",X.style.display="block",alert(s);for(let b of y("[data-el-signature-image]"))b.dataset.elSignatureImage==="bc"&&(b.src="bc_signature"),b.dataset.elSignatureImage==="client"&&(b.src="client_signature"),b.nextElementSibling&&(b.nextElementSibling.style.display="none");for(let b of y('[data-el="signature-date"]'))b.textContent="signature_date";Q.classList.add("is--signing");let r=u('link[href$="css"]').getAttribute("href"),[o,a]=await I(fetch(r));if(a)return M.style.display="none",X.style.display="block",console.error(a);let c=await o.text(),l=u("[data-page-style]").innerHTML,d=`
			<!DOCTYPE html>
			<html>
				<head>
					<style>${c}</style>
					<style>${l}</style>
					<style>
						.w-dropdown-list.w--open,
						img[data-el-signature-image] ~ div {
							display: none !important;
						}

						img[data-el-signature-image],
						.p-1-page.is--audit {
							display: block !important;
						}
					</style>
				</head>
				<body class="body-proposal">
					${Q.outerHTML}
				</body>
			</html>
	`,h=u(".p-1-body-content.is--signing").clientHeight;window.bc_client.signed_time=new Date().toISOString();let p=ve(it,"processPDF"),[m,g]=await I(p({pageHtml:d,details:{signatureImageURL:O,pageHeight:h,time:{accessed:window.bc_client.access_time,signed:window.bc_client.signed_time,zone:at}}}));if(g)return M.style.display="none",X.style.display="block",console.error(g);window.location.replace(`/success/proposal-success?file=${encodeURIComponent(m.data.file_share_link)}`)});window.addEventListener("resize",K(k));K(k);})();
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
