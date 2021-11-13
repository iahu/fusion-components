var an=Object.defineProperty,ln=Object.defineProperties;var cn=Object.getOwnPropertyDescriptors;var vt=Object.getOwnPropertySymbols;var sn=Object.prototype.hasOwnProperty,dn=Object.prototype.propertyIsEnumerable;var yt=(e,t,n)=>t in e?an(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ve=(e,t)=>{for(var n in t||(t={}))sn.call(t,n)&&yt(e,n,t[n]);if(vt)for(var n of vt(t))dn.call(t,n)&&yt(e,n,t[n]);return e},xt=(e,t)=>ln(e,cn(t));var wt=(e,t,n)=>{if(!t.has(e))throw TypeError("Cannot "+n)};var kt=(e,t,n)=>(wt(e,t,"read from private field"),n?n.call(e):t.get(e)),Ct=(e,t,n)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,n)},_t=(e,t,n,i)=>(wt(e,t,"write to private field"),i?i.call(e,n):t.set(e,n),n);import{s as Ot,p as d,r as fn,o as pn,n as g,e as hn,a as un,l as bn,d as $t,b as Et,i as Je,t as Qe,c as gn,f as mn,F as vn,g as At,h as yn,j as It,k as xn,m as wn,q as kn,u as Cn,v as _n,w as On,x as $n}from"./vendor.68e6d396.js";const En=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}};En();var An=`<h4>\u7B80\u5355\u4F7F\u7528</h4>
<fc-button>default</fc-button>

<fc-button disabled="false">not disabled</fc-button>

<h4>\u5916\u89C2</h4>
<fc-button>default</fc-button>
<fc-button sharp>sharp</fc-button>
<fc-button outline>outline</fc-button>
<fc-button sharp outline>sharp outline</fc-button>

<h4>\u5F3A\u8C03\u7EA7\u522B</h4>
<div>
  <span style="display: inline-block; width: 60px">\u6B63\u5E38</span>
  <fc-button accent="primary">primary</fc-button>
  <fc-button accent="secondary">secondary</fc-button>
  <fc-button accent="ghost">ghost</fc-button>
</div>

<div>
  <span style="display: inline-block; width: 60px">disabled</span>
  <fc-button accent="primary" disabled>dissabled</fc-button>
  <fc-button accent="secondary" disabled>dissabled</fc-button>
  <fc-button accent="ghost" disabled>disabled</fc-button>
</div>

<h4>\u662F\u5426\u53EF\u9009</h4>
<fc-button selectable>\u53EF\u9009</fc-button>
<fc-button>\u4E0D\u53EF\u9009</fc-button>

<h4>\u72B6\u6001</h4>
<fc-button>default</fc-button>
<fc-button disabled>disabled</fc-button>
<fc-button selectable>selectable</fc-button>
<fc-button selectable selected>selected</fc-button>
<fc-button selectable selected disabled>selected disabled</fc-button>
<p><em>*</em> selectable \u7684 fc-button\uFF0C\u5728\u9009\u4E2D\u540E\u4F1A\u6709\u4E00\u4E2A \`select\` \u4E8B\u4EF6\uFF0C\u5DF2\u5728 \`selected\` \u72B6\u6001\u66F4\u65B0\u540E\u83B7\u53D6\u6700\u65B0\u72B6\u6001</p>

<h4>autofocus</h4>
<fc-button autofocus>autofocus</fc-button>

<h4>\u8FB9\u6846</h4>
<fc-button outline selectable selected>outline selected</fc-button>
<fc-button outline disabled>outline disabled</fc-button>
<fc-button outline selectable selected sharp>outline selected sharp</fc-button>
<fc-button outline selectable selected disabled sharp>outline selected disabled sharp</fc-button>

<h4>size \u5C5E\u6027</h4>
<fc-button outline size="xs">\u9ED8\u8BA4(xs)</fc-button>
<fc-button outline size="s">\u5C0F(s)</fc-button>
<fc-button outline size="m">\u4E2D(m)</fc-button>
<fc-button outline size="l">\u5927(l)</fc-button>
<fc-button outline size="xl">\u8D85\u5927(xl)</fc-button>
<fc-button outline size="xxl">\u8D85\u8D85\u5927(xxl)</fc-button>
<fc-button outline size="xxxl">\u8D85\u8D85\u8D85\u5927(xxxl)</fc-button>

<h4>value \u5C5E\u6027</h4>
<fc-button outline value="a">a</fc-button>
<fc-button outline value="b">b</fc-button>
<fc-button outline value="c">c</fc-button>

<h4>Slot \u5C5E\u6027</h4>
<fc-button outline style="width: 100px"><span slot="before">\u{1F697}</span><span>before</span></fc-button>
<fc-button outline style="width: 100px"><span>after</span><span slot="after">\u{1F69C}</span></fc-button>

<h4>\u548C form \u4E00\u8D77\u4F7F\u7528</h4>
<form action="#" id="form-1">
  <input type="text" name="text" value="foo" />
  <fc-button type="submit" id="submit">submit</fc-button>
</form>
<fc-button type="reset" id="reset-btn" form="form-1">reset</fc-button>
`;const Fe=function(e,t,n){return function(i,o){const r=i.connectedCallback;i.connectedCallback=function(){r.call(this);const a=f=>{const h=typeof f=="string"?f:"slot:not([name])";return Array.from(this.renderRoot.querySelectorAll(h)||[])},s=()=>a(e).reduce((f,h)=>{const y=h==null?void 0:h.assignedElements(n),v=t?y==null?void 0:y.filter(x=>x.matches(t)):y;return f.concat(v)},[]),c=()=>{Reflect.set(this,o,s())};this.updateComplete.then(c)}}},In=e=>Object.prototype.toString.call(e).slice(8,-1),St=e=>Array.isArray(e)||In(e)==="Array",zt=e=>typeof e=="symbol",Sn=e=>typeof e=="function",O=e=>e instanceof HTMLElement,zn=["fc-divider","area","base","br","col","embed","hr","keygen","link","meta","param","source","track","wbr"],Pn=e=>O(e)&&zn.includes(e.nodeName.toLowerCase()),Pt=e=>O(e)?!document.contains(e)||e.hasAttribute("hidden")||e.hasAttribute("aria-hidden"):!1,Ze=e=>e.hasAttribute("disabled"),Ve=e=>O(e)&&!Ze(e)&&(Lt(e)||e.hasAttribute("tabindex"))&&!Pt(e),Lt=e=>["input","textarea","button","select"].includes(e.nodeName.toLowerCase())&&O(e)&&!Ze(e),Ln=e=>O(e)&&!Ze(e)&&e.hasAttribute("tabindex")&&!Pt(e),fe=e=>O(e)&&(Lt(e)||Ln(e)),Ne=(e,t)=>(e+t)%t,Tn=e=>e===document.activeElement,Tt=e=>e===document.activeElement||e.getAttribute("tabindex")==="0",Ee=(e,t,n,i=Tt)=>{const{length:o}=e,{activeElement:r}=document;let a=e.findIndex(i);const s=a+t;for(a=n?Ne(s,o):s,e.forEach(c=>c.tabIndex=-1);e[a];){const c=e[a];if(fe(c)&&r!==c)return c.tabIndex=0,c;const f=a+t;if(f===a)return c;a=n?Ne(f,o):f}},Ae=(e,t,n=!0,i=!1,o=Tt)=>{const r=Ee(e,t,n,o);return r==null||r.focus({preventScroll:i}),r},Dn=(e,t,n=!0)=>{const i=e.findIndex(Tn),{activeElement:o}=document,{length:r}=e,a=i+t;let s=n?Ne(a,r):a;for(;e[s];){const c=e[s];if(fe(c)&&o!==c)return c;const f=s+t;if(f===s)return c;s=n?Ne(f,r):f}};function p(e,t,n,i){e.addEventListener(t,n,i),e.addEventListener("disconnected",()=>{e.removeEventListener(t,n,i)},{once:!0})}const Mn=e=>e.trim(),Dt=(e,t=";",n=":")=>e.split(t).reduce((i,o)=>{const[r,a]=o.split(n).map(Mn);return r!==""&&(i[r]=a),i},{}),Mt=(e,t=";",n=":")=>Object.entries(e).map(([i,o])=>[i,o].join(n)).join(t),et=(e,t)=>{e.style.cssText=Mt(ve(ve({},Dt(e.style.cssText)),t))},jn=(e,t)=>{const n=Dt(e.style.cssText);delete n[t],e.style.cssText=Mt(n)},Bn=(e,t=!0)=>{let n=e.findIndex(o=>o.tabIndex===0);const i=e[n];if(!t&&i)return i;for(e.forEach(o=>o.setAttribute("tabindex","-1")),n=0;e[n];){const o=e[n];if(Ve(o)&&!Pn(o))return o.tabIndex=0,o;n+=1}},Rn=(e,t)=>St(e)&&St(t)?e.length!==t.length||e.some(n=>t.indexOf(n)===-1):e!==t,jt=e=>zt(e)?e.toString().slice(7,-1):e.toString(),Bt=(e,t)=>{let n;zt(t)?n=Symbol(t.toString().slice(7,-1)+"Changed"):n=`${t.toString()}Changed`;const i=Reflect.get(e,n);if(Sn(i))return i},Fn=(e,t,n)=>Math.min(t,Math.max(e,n));function tt(e){const t=e==null?void 0:e();return{then(n){n==null||n(t)}}}tt.resolve=tt;const Vn=(e,t)=>typeof t=="string"?t:`_.${e.toString()}`,Rt=e=>e==null,Ft=e=>!(e===!1||e===null||e===void 0||e==="false"),Nn={string:e=>Rt(e)?"":String(e),number:Number,boolean:e=>!(e===!1||e===null||e===void 0||e==="false"),any:e=>e},nt=(e,t,n)=>{const i=n!=null?n:typeof Reflect.get(e,t);return Nn[i]},ot=(e,t,n,i)=>{i?e.toggleAttribute(t,Ft(n)):Rt(n)||n===""?e.removeAttribute(t):e.setAttribute(t,String(n))},Kn=(e,t,n)=>{if(!n)return e.getAttribute(t);const i=e.getAttribute(t);return i===null?!1:i==="true"?!0:i==="false"?!1:e.hasAttribute(t)},qn=(e,t,n)=>!0,N=(e,t)=>e!==void 0,ne="observedProperties",l=function(e){const{reflect:t=!1,attribute:n=!0,init:i=!0,initCallback:o=!1,hasChanged:r=qn}=e||{};return function(a,s){const c=a.constructor;let f=Reflect.get(c,ne,c);if(!Object.prototype.hasOwnProperty.call(c,ne)){const h=Reflect.get(a.constructor,ne,c);h?f=new Map(h):f=new Map,Reflect.set(c,ne,f)}f.set(s.toLowerCase(),xt(ve({},e),{propKey:s,reflect:t,attribute:n,init:i,initCallback:o}))}};function Hn(e,t){const n=e.get(t);if(!n)return;const{propKey:i,attribute:o,reflect:r,converter:a,tempKey:s,sync:c,hasChanged:f,initCallback:h}=n!=null?n:{};if(!i)return;const y=jt(i),v=typeof o=="string"?o:y,x=s?Vn(i,s):"";let R,ee=!1,Re;Object.defineProperty(this,i,{configurable:!0,get(){return s?Reflect.get(this,x):R},set(ut){var gt;const te=Reflect.get(this,i),Ye=(gt=n.type)!=null?gt:typeof te,on=Ye==="boolean",bt=a!=null?a:nt(this,i,Ye),$e=bt?bt(ut,this):ut;if(te!==$e){if(R=$e,s&&Reflect.set(this,x,$e),!n.type&&te&&(n.type=Ye),(f==null?void 0:f(te,$e,this))===!1)return;(c&&this.isConnected?tt():this.updateComplete).then(()=>{const Xe=Reflect.get(this,i);if(Xe!==$e)return;const rn=!(te===void 0&&this.hasAttribute(v));r&&rn&&ot(this,v,Xe,on);const mt=Bt(this,i);!Re&&typeof mt=="function"&&(Re=mt),(ee||h||!o||te!==void 0)&&typeof Re=="function"&&Re.call(this,te,Xe),ee||(ee=!0)}),this.requestUpdate(i,te,{attribute:v,noAccessor:!0})}}})}const ye=function(e){return function(t,n){const i=t.willUpdate;t.willUpdate=function(o){i.call(this,o),e&&Reflect.set(this,n,Array.from(this.querySelectorAll(e)))}}},it=function(e,t=!1){return function(n,i){const o=n.willUpdate;n.willUpdate=function(r){if(o.call(this,r),e){const a=()=>{var h;const c=(t?this.renderRoot:this).querySelector(e),f=Reflect.get(this,i);Reflect.set(this,i,c),Rn(f,c)&&((h=Bt(this,i))==null||h.call(this,f,c))};t?this.updateComplete.then(a):a()}}}},Un=Reflect.get(customElements,"define");Object.defineProperty(customElements,"define",{value:function(e,t,n){if(customElements.get(e)){console.warn(`re-define customElement: ${e}`);return}Reflect.apply(Un,this,[e,t,n])}});var Gn=Object.defineProperty,Wn=Object.getOwnPropertyDescriptor,rt=(e,t,n,i)=>{for(var o=i>1?void 0:i?Wn(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&Gn(t,n,o),o};const Yn=["selected","hidden","disabled","readonly","readOnly","expanded","checked","required"];class Ke extends Ot{constructor(){super();this.size="",this.sharp=!1;const t=Reflect.get(this.constructor,ne);if(!t)return;const n=Hn.bind(this,t);Array.from(t.keys()).forEach(n)}get control(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector(".control")}static get observedAttributes(){const t=super.observedAttributes,n=Reflect.get(this,ne);return n?t.concat([...n.keys()]):t}attributeChangedCallback(t,n,i){const o=this.constructor,r=Reflect.get(o,ne),a=r==null?void 0:r.get(t);if(a){const{propKey:s,type:c,converter:f}=a,v=(c!=null?c:typeof Reflect.get(this,s))==="boolean"?Ft(i):i,x=f!=null?f:nt(this,t,c),R=x?x(v,this):v;Reflect.get(this,s)!==R?Reflect.set(this,s,R):v===!1&&i!==null&&this.removeAttribute(t),Yn.includes(t)&&this.setAttribute(`aria-${t}`,R.toString())}}connectedCallback(){super.connectedCallback(),this.dispatchEvent(new CustomEvent("connected",{composed:!0,bubbles:!1,cancelable:!1}));const t=Reflect.get(this.constructor,ne);!t||Array.from(t.keys()).forEach(n=>{const i=t.get(n);if(!i)return;const{propKey:o,init:r,attribute:a,type:s,converter:c}=i!=null?i:{};if(!o)return;const f=jt(o),h=typeof a=="string"?a:f;if(typeof r=="function")Reflect.set(this,o,r(this));else if(a&&this.hasAttribute(f)){const v=(s!=null?s:typeof Reflect.get(this,o))==="boolean",x=Kn(this,h,v),R=c!=null?c:nt(this,o,s),ee=R?R(x,this):x;Reflect.set(this,o,ee)}})}disconnectedCallback(){super.disconnectedCallback(),this.dispatchEvent(new CustomEvent("disconnected",{composed:!0,bubbles:!1,cancelable:!1}))}get slotElements(){const t={};return this.renderRoot.querySelectorAll("slot").forEach(n=>{t[n.name||"default"]=n}),t}get slottedElements(){var n;const t=(n=this.shadowRoot)==null?void 0:n.querySelector("slot:not([name])");return t instanceof HTMLSlotElement?t.assignedElements():[]}classnameChanged(t,n){n&&(console.warn("should use class instead of className"),this.setAttribute("class",n),this.removeAttribute("className"))}$emit(t,n){const i=ve({bubbles:!0,composed:!0,cancelable:!1},n),o=new CustomEvent(t,i);if(t==="change"){o.simulated=!0;const r=Reflect.get(this,"_valueTracker"),a=Reflect.get(this,"value");o.value=Symbol("nextValue"),r&&r.setValue(a);const{nodeName:s}=this,c=Reflect.get(this,"type");let f=["radio","checkbox"].includes(c)?"input":"select";this.nodeName!=="input"&&this.nodeName!=="select"&&Object.defineProperty(this,"nodeName",{configurable:!0,get(){return f!=null?f:s}}),this.dispatchEvent(o),f=void 0}else this.dispatchEvent(o)}emit(t,n){this.$emit(t,{detail:n})}render(){return d``}}rt([l({type:"string"})],Ke.prototype,"classname",2);rt([l({reflect:!0})],Ke.prototype,"size",2);rt([l({type:"boolean"})],Ke.prototype,"sharp",2);const w=Ke;var Xn=Object.defineProperty,Jn=Object.getOwnPropertyDescriptor,qe=(e,t,n,i)=>{for(var o=i>1?void 0:i?Jn(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&Xn(t,n,o),o};const at="form-associated-proxy",xe="ElementInternals"in window&&"setFormValue"in window.ElementInternals.prototype;var Be;class K extends w{constructor(t){super();Ct(this,Be,void 0);this.initialValue="",this.dirtyValue=!1,this.proxyInitialized=!1,this.proxyEventsToBlock=["change","click"],_t(this,Be,n=>{n.stopPropagation()}),this.name="",this.disabled=!1,this.required=!1,this.handleProxyChange=n=>{var o;const{proxy:i}=this;if(i instanceof HTMLInputElement&&i.type==="file"){const{files:r}=i;if(!r)return;let a="";r.length===1?a=(o=i.value.split(/[/\\]/g).pop())!=null?o:"":r.length>1&&(a=`${r.length} \u4E2A\u6587\u4EF6`),Reflect.set(this,"_.value",a),this.requestUpdate("value")}else this.value=i.value;this.checkValidity()},this.initialValue=this.value||"",this.required=!1,this.proxy=t||document.createElement("input"),Reflect.has(this,"attachInternals")&&(this.elementInternals=this.attachInternals())}static get formAssociated(){return xe}get InternalOrProxy(){return xe&&this.elementInternals?this.elementInternals:this.proxy}connectedCallback(){var t;super.connectedCallback(),this.addEventListener("keydown",this._handleKeydown),(t=this.form)==null||t.addEventListener("reset",this.handleFormReset),this.initialValue=this.value||this.getAttribute("value")||this.initialValue,!xe&&this.proxy&&this.attachProxy(),this.proxy.addEventListener("invalid",this.handleProxyInvalid),this.proxy.addEventListener("change",this.handleProxyChange)}disconnectedCallback(){var t;super.disconnectedCallback(),this.removeEventListener("keydown",this._handleKeydown),(t=this.form)==null||t.removeEventListener("reset",this.handleFormReset),this.proxy||this.detachProxy(),this.proxy.removeEventListener("invalid",this.handleProxyInvalid),this.proxy.removeEventListener("change",this.handleProxyChange),this.value=void 0}attachProxy(){this.proxyInitialized||(this.proxyInitialized=!0,this.proxy.style.cssText="position: absolute; margin: 0; z-index: -1; opacity: 0; pointer-events: none;",this.proxyEventsToBlock.forEach(t=>this.proxy.addEventListener(t,kt(this,Be))),this.proxy.disabled=this.disabled,this.proxy.required=this.required,typeof this.name=="string"&&(this.proxy.name=this.name),typeof this.value=="string"&&(this.proxy.value=this.value),this.proxy.setAttribute("slot",at),this.appendChild(this.proxy),this.updateComplete.then(()=>{var n;const t=this.renderRoot.querySelector(`slot[${at}]`);t?this.proxySlot=t:(this.proxySlot=document.createElement("slot"),this.proxySlot.setAttribute("name",at),(n=this.shadowRoot)==null||n.appendChild(this.proxySlot))}))}detachProxy(){var t;this.removeChild(this.proxy),this.proxySlot&&((t=this.shadowRoot)==null||t.removeChild(this.proxySlot))}get form(){return xe&&this.elementInternals?this.elementInternals.form:this.proxy.closest("form")}get labels(){return Object.freeze(Array.from(this.InternalOrProxy.labels||[]))}get validationMessage(){return this.InternalOrProxy.validationMessage}get validated(){return this.InternalOrProxy.validity}get willValidate(){return this.InternalOrProxy.willValidate}checkValidity(){return this.InternalOrProxy.checkValidity()}reportValidity(){return this.InternalOrProxy.reportValidity()}setFormValue(t,n){xe&&this.elementInternals&&this.elementInternals.setFormValue(t,n)}setValidity(t,n,i){xe&&this.elementInternals?this.elementInternals.setValidity(t,n,i):typeof n=="string"&&this.proxy.setCustomValidity(n)}get validity(){return this.InternalOrProxy.validity}nameChanged(t,n){this.proxy&&(this.proxy.name=n)}valueChanged(t,n){this.dirtyValue=!0;const{proxy:i}=this;this.proxy instanceof HTMLInputElement&&(typeof n=="string"?i.value=n:n===null&&(i.value="")),this.setFormValue(n),this.validate()}validate(){this.proxy instanceof HTMLElement&&this.setValidity(this.proxy.validity,this.proxy.validationMessage)}requiredChanged(t,n){this.proxy instanceof HTMLElement&&(this.proxy.required=n),this.validate()}_handleKeydown(t){var n;t.key==="Enter"&&t.target instanceof HTMLEmbedElement&&((n=this.form)==null||n.submit())}handleFormReset(){this.value=this.initialValue,this.dirtyValue=!1}handleProxyInvalid(t){t.isTrusted&&this.dispatchEvent(new CustomEvent("invalid",{detail:t,bubbles:!0,composed:!0}))}}Be=new WeakMap;qe([l({reflect:!0})],K.prototype,"name",2);qe([l({type:"any",initCallback:!0,converter(e,t){const{proxy:n}=t;return n instanceof HTMLInputElement&&n.type==="file"?(console.error("Failed to set value on File Input"),t.value):e},tempKey:"_.value"})],K.prototype,"value",2);qe([l({type:"boolean",reflect:!0})],K.prototype,"disabled",2);qe([l({type:"boolean"})],K.prototype,"required",2);var Qn=`:host {
  --fc-unit-size: 1px;
  --user-select: none;
  --control-min-width: calc(var(--fc-unit-size) * 140);
  --list-max-height: calc(var(--fc-unit-size) * 164);

  /*size*/
  --host-line-height: 1;
  --line-height: 1.5;
  --font-size-xs: calc(var(--fc-unit-size) * 12);
  --font-size-s: calc(var(--fc-unit-size) * 13);
  --font-size-m: calc(var(--fc-unit-size) * 14);
  --font-size-l: calc(var(--fc-unit-size) * 15);
  --font-size-xl: calc(var(--fc-unit-size) * 16);
  --font-size-xxl: calc(var(--fc-unit-size) * 17);
  --font-size-xxxl: calc(var(--fc-unit-size) * 18);
  --border-radius: calc(var(--fc-unit-size) * 2);

  --padding-l: clamp(
    calc(var(--fc-unit-size) * 2),
    calc(var(--font-size) - var(--fc-unit-size) * 7),
    calc(var(--fc-unit-size) * 5)
  );
  --padding-r: var(--padding-l);
  --padding-t: calc(var(--fc-unit-size) * 1);
  /*clamp(
    calc(var(--fc-unit-size) * 2),
    calc(var(--font-size) - var(--fc-unit-size) * 10),
    calc(var(--fc-unit-size) * 5)
  );*/
  --padding-b: var(--padding-t);
  --padding: var(--padding-t) var(--padding-r) var(--padding-b) var(--padding-l);

  --border-width: calc(var(--fc-unit-size) * 1);

  /*color variables*/
  --black: hsl(0, 0%, 0%);
  --blue: hsl(210, 50%, 60%);
  --blue-vibrant: hsl(203, 98%, 56%);
  --blue2: hsla(210, 13%, 40%, 0.75);
  --blue3: hsla(210, 7%, 40%, 0.5);
  --blue4: hsl(210, 7%, 40%);
  --blue5: hsla(203, 98%, 56%, 0.5);
  --blue6: hsl(203, 98%, 64%);
  --green: hsl(114, 31%, 68%);
  --darker-grey: hsl(0, 0%, 30%);
  --dark-grey: hsl(0, 0%, 40%);
  --grey: hsl(0, 0%, 50%);
  --light-grey: hsl(0, 0%, 60%);
  --lighter-grey: hsl(0, 0%, 65%);
  --orange: hsl(32, 93%, 66%);
  --orange2: hsl(32, 85%, 55%);
  --orange3: hsl(40, 94%, 68%);
  --pink: hsl(300, 30%, 68%);
  --red: hsl(357, 79%, 65%);
  --red2: hsl(13, 93%, 66%);
  --white: hsl(0, 0%, 100%);
  --white2: hsl(0, 0%, 97%);
  --white3: hsl(219, 28%, 88%);

  --body-background: #333;
  --box-background: hsla(203, 7%, 7%, 1);

  /* foreground colors*/
  --foreground: hsla(255, 0%, 88%, 1);
  --foreground-hover: hsla(255, 0%, 94%, 1);
  --foreground-active: hsla(255, 0%, 100%, 1);
  --foreground-disabled: hsla(255, 0%, 62%, 1);
  --foreground-selected: hsla(255, 0%, 100%, 1);

  --foreground-secondary: var(--grey);

  /*background colors*/
  --background: hsla(206, 5%, 28%, 1);
  --background-hover: hsla(203, 3%, 34%, 1);
  --background-active: hsla(203, 3%, 40%, 1);
  --background-selected: hsla(203, 14%, 42%, 1);
  --background-selected-disabled: hsla(203, 34%, 47%, 1);
  --background-selected-hover: var(--background-selected);
  --background-selected-active: var(--background-selected);
  --background-disabled: hsla(203, 0%, 27%, 1);

  /*border-colors*/
  --border-color: hsla(203, 5%, 36%, 1);
  --border-color-selected: hsla(203, 9%, 37%, 1);
  --border-color-hover: hsla(203, 9%, 37%, 1);
  --border-color-active: hsla(203, 9%, 46%, 1);
  --border-color-disabled: hsla(203, 0%, 34%, 1);

  --outline-offset: calc(var(--fc-unit-size) * 1);
  --outline-width: calc(var(--fc-unit-size) * 1);
  --outline-color: hsla(32, 92%, 66%, 0.7);

  --accent-color: hsl(203, 92%, 56%);
  --accent-color-hover: hsl(203, 92%, 66%);
  --accent-color-disabled: hsla(203, 98%, 56%, 0.5);
  --caret: hsl(32, 93%, 66%);
  --line-highlight: var(--blue2);
  --selection: hsla(210, 13%, 40%, 0.75);
  --selection-border: var(--blue4);
  --inactive-selection: var(--blue2);
  --misspelling: var(--red);
  --shadow: hsla(0, 0%, 0%, 0.25);
  --active-guide: var(--blue5);
  --stack-guide: hsla(180, 36.17%, 53.92%, 0.5);
  --highlight: var(--blue5);
  --find-highlight-foreground: var(--grey);
  --find-highlight: var(--orange3);

  --stroke-width: calc(var(--fc-unit-size) * 1);
  --stroke-color: rgba(128, 128, 128, 1);
  --stroke: 0 0 0 var(--stroke-width) var(--stroke-color);

  --box-shadow-color: rgba(0, 0, 0, 0.15);
  --box-shadow-offset-x: 0;
  --box-shadow-offset-y: 0;
  --box-shadow-offset-blur: calc(var(--fc-unit-size) * 5);
  --box-shadow-offset-spread: 0;
  --box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y) var(--box-shadow-offset-blur)
    var(--box-shadow-offset-spread) var(--box-shadow-color);
}

:host {
  line-height: var(--line-height);
  --font-size: var(--font-size-xs);
  font-size: var(--font-size);
  /*user-select: var(--user-select);*/
  color: var(--foreground);
  fill: currentColor;
  border-radius: var(--border-radius);
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: calc(var(--fc-unit-size) * 6);
  height: calc(var(--fc-unit-size) * 6);
  background: var(--box-background);
}

::-webkit-scrollbar-thumb {
  background: var(--background);
  cursor: pointer;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--background-hover);
}

:host([sharp]) {
  border-radius: 0;
}

:host([outline]) .control {
  border-color: var(--border-color);
}

:host([outline]:hover) .control {
  border-color: var(--border-color-hover);
}

:host([outline]:focus-within) .control {
  border-color: var(--border-color-active);
}

:host(:is(:disabled, [disabled], [readonly])) {
  --foreground: var(--foreground-disabled);
  --background: var(--background-disabled);
  --stroke-color: rgba(128, 128, 128, 0.4);
}
:host(:is(:disabled, [disabled])) {
  pointer-events: none;
}

:host([outline]:disabled) {
  border-color: var(--border-color-disabled);
}

:host([hidden]) {
  display: none;
}

:host([size='xs']) {
  --font-size: var(--font-size-xs);
}
:host([size='s']) {
  --font-size: var(--font-size-s);
}
:host([size='m']) {
  --font-size: var(--font-size-m);
}
:host([size='l']) {
  --font-size: var(--font-size-l);
}
:host([size='xl']) {
  --font-size: var(--font-size-xl);
}
:host([size='xxl']) {
  --font-size: var(--font-size-xxl);
}
:host([size='xxxl']) {
  --font-size: var(--font-size-xxxl);
}

:host *:not(:focus-visible) {
  outline: none;
}

.control {
  font: inherit;
  color: inherit;
  cursor: inherit;
  fill: inherit;
  border-radius: inherit;
  height: inherit;
  width: inherit;
  will-change: border-color background-color;
  transition: border-color 0.2s, background-color;
}

.fc-focus-overlay,
.fc-focus-visible-overlay,
.fc-outline:focus-visible,
.fc-focus-outline,
.fc-inner-outline,
:host(:focus-visible) {
  position: relative;
  outline: none;
}

:host(:focus) .fc-focus-overlay,
:host(:focus-visible) .fc-focus-visible-overlay,
.fc-outline:focus-visible::after,
.fc-focus-outline:focus::after,
.fc-focusin-outline:focus-within::after,
:host(:focus-visible) .fc-inner-outline::after,
:host(:focus-visible)::after {
  content: '';
  position: absolute;
  display: block;
  left: calc(var(--outline-offset) * -1);
  top: calc(var(--outline-offset) * -1);
  display: block;
  width: calc(100% + var(--outline-offset) * 2 - var(--outline-width) * 2);
  height: calc(100% + var(--outline-offset) * 2 - var(--outline-width) * 2);
  box-sizing: content-box;
  border-radius: var(--border-radius);
  border: var(--outline-width) solid var(--outline-color);
  pointer-events: none;
}

.no-fc-outline::after {
  content: unset;
}
`;const m=(...e)=>fn`
    ${pn([Qn,...e].join(""))}
  `,$=e=>d`<slot name="before" part="before">${e}</slot>`,E=e=>d`<slot name="after" part="after">${e}</slot>`;var Zn=`:host {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  /*vertical-align: bottom;*/
  cursor: pointer;
  color: var(--foreground);
  border-radius: var(--border-radius);
  background: var(--background);
  padding: var(--padding);
  box-sizing: border-box;
  user-select: var(--user-select);
  height: fit-content;
}

:host([outline]) {
  border: var(--border-width) solid var(--border-color);
  height: calc(100% - 2 * var(--border-width));
}

.proxy {
  display: none;
}

.control .before,
.control .aftter {
  flex-grow: 0;
}
/*.control .content {
  flex: 1;
}*/

:host([sharp]) {
  border-radius: 0;
}

:host([selected]) {
  color: var(--foreground-selected);
  background: var(--background-selected);
}

:host([outline]) {
  border-color: var(--border-color);
}

:host([outline][selected]) {
  border-color: var(--border-color-selected);
}

/*secondary*/
:host([accent='secondary']) {
  background: var(--accent-color);
  color: var(--background);
}
:host(:not([disabled])[accent='secondary']) {
  border-color: var(--accent-color-hover);
  color: var(--background-hover);
}
:host(:not([disabled])[accent='secondary']:hover) {
  background: var(--accent-color-hover);
  color: var(--background-hover);
}

:host(:not([disabled])[accent='secondary']:active) {
  background: var(--accent-color-hover);
  color: var(--background-hover);
}

:host([accent='secondary']) {
  background: var(--accent-color);
}

:host([accent='secondary'][disabled]) {
  background: var(--accent-color-disabled);
}

:host([accent='ghost']),
:host([accent='ghost']:hover) {
  background: none;
  border: var(--border-width) solid var(--border-color);
}

::slotted(:not([slot])) {
  margin-left: auto;
  margin-right: auto;
}

:host(:not(:disabled):focus-visible) {
  background: var(--background-hover);
  color: var(--foreground-hover);
  border-color: var(--border-color-hover);
}

:host(:not([disabled]):hover) {
  background: var(--background-hover);
  color: var(--foreground-hover);
  border-color: var(--border-color-hover);
}

:host([selected]:not([disabled]):hover) {
  background: var(--background-selected-hover);
}

:host([selected][disabled]) {
  background: var(--background-disabled);
}

:host(:not([disabled]):active) {
  background: var(--background-active);
  color: var(--foreground-active);
  border-color: var(--border-color-active);
}

:host(:not([disabled])[selectable]:active) {
  background: var(--background-selected-active);
}

:host(:disabled) {
  opacity: 0.3;
  color: var(--foreground-disabled);
  --background: var(--background-disabled);
  cursor: not-allowed;
}
:host([outline]:disabled) {
  border-color: var(--border-color-disabled);
}
`,eo=Object.defineProperty,to=Object.getOwnPropertyDescriptor,C=(e,t,n,i)=>{for(var o=i>1?void 0:i?to(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&eo(t,n,o),o};const no=()=>document.createElement("input");let k=class extends K{constructor(){super(no());this.autofocus=!1,this.disabled=!1,this.type="button",this.formid="",this.formaction="",this.formenctype="",this.formnovalidate="",this.formtarget="_self",this.selectable=!1,this.selected=!1,this.outline=!1,this.readonly=!1,this.sharp=!1,this.accent="primary",this.tabIndex=0}connectedCallback(){super.connectedCallback(),p(this,"click",this.handleClick),p(this,"keydown",this.handleKeydown),this.hasAttribute("autofocus")&&!document.activeElement&&(this.hasAttribute("tabindex")||this.setAttribute("tabindex","0"),this.focus({preventScroll:!0}))}disconnectedCallback(){super.disconnectedCallback(),this.proxy.removeEventListener("click",this.handleSubmission),this.proxy.removeEventListener("click",this.handleClick),this.proxy.removeEventListener("click",this.handleReset)}disabledChanged(e,t){this.proxy.toggleAttribute("disabled",t)}typeChanged(e,t){switch(this.proxy instanceof HTMLInputElement&&(this.proxy.type=t),e){case"submit":this.removeEventListener("click",this.handleSubmission);break;case"reset":this.removeEventListener("click",this.handleReset);break;default:this.removeEventListener("click",this.handleClick);break}switch(t){case"submit":p(this,"click",this.handleSubmission);break;case"reset":p(this,"click",this.handleReset);break;default:p(this,"click",this.handleClick);break}}formidChanged(e,t){this.proxy.setAttribute("form",t)}formactionChanged(e,t){this.proxy.setAttribute("formaction",t)}formenctypeChanged(e,t){this.proxy.setAttribute("formenctype",t)}formnovalidateChanged(e,t){this.proxy.setAttribute("formnovalidate",t)}formtargetChanged(e,t){this.proxy.setAttribute("formtarget",t)}selectableChanged(e,t){this.selected=this.hasAttribute("selected")}selectedChanged(e,t){if(!this.selectable){Reflect.set(this,"selected",!1);return}this.setAttribute("aria-pressed",t.toString()),this.emit("select")}readonlyChanged(e,t){this.toggleAttribute("readonly",t)}handleClick(e){this.disabled&&e.stopImmediatePropagation(),setTimeout(()=>{!e.defaultPrevented&&this.selectable&&(e.preventDefault(),this.selected=!this.selected)})}handleSubmission(e){setTimeout(()=>{var t,n;e.defaultPrevented||(typeof((t=this.form)==null?void 0:t.requestSubmit)=="function"&&this.proxy?this.form.requestSubmit():this.form?this.form.submit():(n=this.proxy)==null||n.click())})}handleReset(e){var t;e.defaultPrevented||typeof((t=this.form)==null?void 0:t.reset)=="function"&&this.form.reset()}handleKeydown(e){e.target===this&&[" ","Enter"].includes(e.key)&&(e.preventDefault(),this.emit("click",{originalEvent:e}))}render(){return d`
      ${$()}
      <slot></slot>
      ${E()}
    `}};k.styles=m(Zn);C([l({type:"boolean"})],k.prototype,"autofocus",2);C([l({type:"boolean",reflect:!0})],k.prototype,"disabled",2);C([l({reflect:!0})],k.prototype,"type",2);C([l({hasChanged:N})],k.prototype,"formid",2);C([l({hasChanged:N})],k.prototype,"formaction",2);C([l({hasChanged:N})],k.prototype,"formenctype",2);C([l({hasChanged:N})],k.prototype,"formnovalidate",2);C([l({hasChanged:N})],k.prototype,"formtarget",2);C([l({reflect:!0,hasChanged:N})],k.prototype,"selectable",2);C([l({reflect:!0})],k.prototype,"selected",2);C([l({reflect:!0})],k.prototype,"outline",2);C([l()],k.prototype,"readonly",2);C([l({type:"boolean",reflect:!0})],k.prototype,"sharp",2);C([l()],k.prototype,"accent",2);C([l()],k.prototype,"hotkey",2);C([l({reflect:!0})],k.prototype,"tabIndex",2);k=C([g("fc-button")],k);var oo={parameters:{storySource:{source:`import book from './book.html?raw'

import './index'

export default { title: 'Button', order: 1 }

export const Button = () => book
`,locationsMap:{button:{startLoc:{col:22,line:7},endLoc:{col:32,line:7},startBody:{col:22,line:7},endBody:{col:32,line:7}}}}},title:"Button",order:1};const io=()=>An,ro=["Button"];var ao=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:oo,Button:io,__namedExportsOrder:ro}),lo=`<h4>\u7B80\u5355\u4F7F\u7528</h4>
<fc-checkbox value="apple" name="fruit">\u82F9\u679C</fc-checkbox>
<fc-checkbox value="orange" name="fruit">\u6A58\u5B50</fc-checkbox>

<h4>\u534A\u9009\u72B6\u6001</h4>
<fc-checkbox name="orange" indeterminate>\u6A58\u5B50</fc-checkbox>

<h4>\u4E0D\u53EF\u7528</h4>
<fc-checkbox disabled>\u82F9\u679C</fc-checkbox>
<fc-checkbox checked disabled>\u82F9\u679C</fc-checkbox>

<h4>\u4EC5\u53EF\u8BFB</h4>
<fc-checkbox readonly>\u82F9\u679C</fc-checkbox>

<h4>\u5DF2\u9009\u4E2D</h4>
<fc-checkbox checked>\u82F9\u679C</fc-checkbox>

<h4>\u81EA\u5B9A\u4E49 value</h4>
<fc-checkbox value="apple" name="fruit">\u82F9\u679C</fc-checkbox>

<h4>\u81EA\u5B9A\u4E49\u56FE\u6807</h4>
<fc-checkbox value="apple" name="fruit">
  <span slot="checked-indicator">\u2705</span>
  \u82F9\u679C
</fc-checkbox>

<h4>\u8DDF Form \u4E00\u8D77\u4F7F\u7528</h4>
<form action="#" id="form-1">
  <label>
    <input type="checkbox" value="apple" name="fruit" checked />
    apple
  </label>
  <fc-checkbox value="banana" name="fruit" required>banana</fc-checkbox>
  <label>
    <input type="checkbox" value="orange" name="fruit" checked />
    orange
  </label>
  <br />
  <input type="submit" />
</form>
`,Vt=`:host {
  display: inline-flex;
  align-items: center;
  vertical-align: bottom;
}

:host(:not(:disabled)) {
  cursor: pointer;
}

:host(:disabled) {
  background: none;
}

:host(:focus-visible)::after {
  content: unset;
}

.checkbox.control {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: var(--font-size);
  height: var(--font-size);
  overflow: visible;
  background: var(--background);
  box-shadow: inset var(--stroke);
  border-radius: var(--border-radius);
  user-select: none;
}

.checkbox .default-indicator {
  display: inline-block;
  width: 100%;
  height: 100%;
  /*border: var(--stroke-width) solid var(--stroke-color);*/
  box-sizing: border-box;
}

:host(:is([checked], [indeterminate])) .control {
  background: var(--accent-color);
  color: var(--box-background);
  box-shadow: none;
}

:host([checked]) .default-indicator,
:host([indeterminate]) .default-indicator {
  display: none;
}

:host(:not([disabled])) .control:hover,
:host(:not([readonly])) .control:hover {
  --background: var(--background-hover);
}

:host(:not([disabled]):not([readonly])[checked]) .control:hover {
  --background: var(--accent-color-hover);
}

:host(.readonly) .control,
:host([disabled]) .control {
  --accent-color: var(--accent-color-disabled);
  cursor: not-allowed;
}

:host([disabled][checked]) .control,
:host(.readonly[checked]) .control {
  --background: var(--accent-color-disabled) !important;
}
:is(:host(.readonly), :host([disabled])) .label {
  color: var(--foreground-disabled);
  cursor: auto;
}

.checked-indicator,
::slotted([slot='checked-indicator']) {
  display: none;
}

.checked-indicator,
::slotted([slot='indeterminate-indicator']) {
  display: none;
}

:host([checked]) .checked-indicator,
:host([checked]) ::slotted([slot='checked-indicator']) {
  display: inline-flex;
}

:host([indeterminate]) .indeterminate-indicator,
:host([checked]) ::slotted([slot='indeterminate-indicator']) {
  display: inline-flex;

  width: 60%;
  height: calc(var(--fc-unit-size) * 2);
  background: var(--box-background);
  /*border-radius: var(--border-radius);*/
}

.label {
  margin-left: calc(var(--font-size) / 2);
  cursor: inherit;
  user-select: var(--user-select);
}
`,co=Object.defineProperty,so=Object.getOwnPropertyDescriptor,oe=(e,t,n,i)=>{for(var o=i>1?void 0:i?so(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&co(t,n,o),o};const fo=()=>{const e=document.createElement("input");return e.type="checkbox",e};let q=class extends K{constructor(){super(fo());this.value="on",this.role="checkbox",this.tabIndex=0,this.checked=!1,this.defaultChecked=!1,this.indeterminate=!1,this.readOnly=!1,this.type="checkbox"}connectedCallback(){super.connectedCallback(),this.checked=this.hasAttribute("checked"),this.defaultChecked=this.checked,p(this,"click",this.handleClick),p(this,"keydown",this.handleKeydown)}valueChanged(e,t){super.valueChanged(e,t),this.dirtyValue=!0,this.proxy&&(this.proxy.value=t),this.updateForm()}checkedChanged(e,t){this.proxy instanceof HTMLInputElement&&(this.proxy.checked=t),this.updateForm()}readOnlyChanged(){this.classList.toggle("readonly",this.readOnly)}updateForm(){const{value:e,checked:t}=this,n=t?e:null;this.setFormValue(n,n),this.validate()}toggleSelect(){if(!this.disabled&&!this.readOnly)return this.updateForm(),this.indeterminate&&(this.indeterminate=!1),this.checked=!(this.checked||this.indeterminate),this.emit("change"),!0}handleClick(e){this.toggleSelect()&&e.preventDefault()}handleKeydown(e){e.key===" "&&this.toggleSelect()&&e.preventDefault()}render(){return d`
      <div class="checkbox control fc-inner-outline" part="control">
        <slot name="default-indicator">
          <div class="default-indicator"></div>
        </slot>
        <slot name="checked-indicator">
          <svg
            class="checked-indicator"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill-rule="evenodd"
            xmlns:v="https://vecta.io/nano"
          >
            <path d="M3.586 8.353l5.657-5.657 1.414 1.414L5 9.767z" />
            <path d="M2.879 4.817l3.536 3.536L5 9.767 1.464 6.231z" />
          </svg>
        </slot>
        <slot name="indeterminate-indicator">
          <div class="indeterminate-indicator"></div>
        </slot>
      </div>
      <label class="label" part="label"><slot></slot></label>
    `}};q.styles=m(Vt);oe([l()],q.prototype,"value",2);oe([l({reflect:!0})],q.prototype,"role",2);oe([l({reflect:!0})],q.prototype,"tabIndex",2);oe([l({type:"boolean",reflect:!0})],q.prototype,"checked",2);oe([l({type:"boolean",attribute:"checked"})],q.prototype,"defaultChecked",2);oe([l({type:"boolean",reflect:!0})],q.prototype,"indeterminate",2);oe([l({type:"boolean",reflect:!0})],q.prototype,"readOnly",2);q=oe([g("fc-checkbox")],q);var po={parameters:{storySource:{source:`import book from './book.html?raw'

import './index'

export default { title: 'Checkbox', order: 1 }

export const Checkbox = () => book
`,locationsMap:{checkbox:{startLoc:{col:24,line:7},endLoc:{col:34,line:7},startBody:{col:24,line:7},endBody:{col:34,line:7}}}}},title:"Checkbox",order:1};const ho=()=>lo,uo=["Checkbox"];var bo=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:po,Checkbox:ho,__namedExportsOrder:uo}),go=`<fc-combobox value="baz">
  <fc-list-option value="foo"></fc-list-option>
  <fc-list-option value="bar"></fc-list-option>
  <fc-list-option value="baz"></fc-list-option>
</fc-combobox>

<h4>\u7B80\u5355\u4F7F\u7528</h4>
<p>\u8F93\u5165\u5185\u5BB9\u4F1A\u6709\u81EA\u52A8\u8865\u5168\u63D0\u793A\uFF0C\u5229\u7528\u4E0A\u4E0B\u952E\u53EF\u8FDB\u884C\u9009\u62E9\u64CD\u4F5C</p>
<fc-combobox placeholder="\u8BF7\u9009\u62E9\u6216\u8F93\u5165">
  <fc-list-option value="1">Ada</fc-list-option>
  <fc-list-option value="2">Alex</fc-list-option>
  <fc-list-option value="3">Alice</fc-list-option>
  <fc-list-option value="4">Belle</fc-list-option>
  <fc-list-option value="5">Babs</fc-list-option>
  <fc-list-option value="6">Barbara</fc-list-option>
  <fc-list-option value="7">Camilla</fc-list-option>
  <fc-list-option value="8">Candice</fc-list-option>
  <fc-list-option value="9">Carla</fc-list-option>
</fc-combobox>

<h4>\u9ED8\u8BA4\u503C</h4>
<fc-combobox value="1">
  <fc-list-option value="1">Ada</fc-list-option>
  <fc-list-option value="2">Alex</fc-list-option>
  <fc-list-option value="3">Alice</fc-list-option>
  <fc-list-option value="4">Belle</fc-list-option>
  <fc-list-option value="5">Babs</fc-list-option>
  <fc-list-option value="6">Barbara</fc-list-option>
  <fc-list-option value="7">Camilla</fc-list-option>
  <fc-list-option value="8">Candice</fc-list-option>
  <fc-list-option value="9">Carla</fc-list-option>
</fc-combobox>

<h4>\u5927\u5C0F\u5199\u654F\u611F</h4>
<fc-combobox autocomplete="inline" casesensitive placeholder="\u8BF7\u8F93\u5165">
  <fc-list-option value="1">Ada</fc-list-option>
  <fc-list-option value="2">Alex</fc-list-option>
  <fc-list-option value="3">Alice</fc-list-option>
  <fc-list-option value="4">Belle</fc-list-option>
  <fc-list-option value="5">Babs</fc-list-option>
  <fc-list-option value="6">Barbara</fc-list-option>
  <fc-list-option value="7">Camilla</fc-list-option>
  <fc-list-option value="8">Candice</fc-list-option>
  <fc-list-option value="9">Carla</fc-list-option>
</fc-combobox>
`,mo=`:host {
  display: inline-flex;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  white-space: nowrap;
  /*background: var(--background);*/
  /*overflow: hidden;*/
}

:host(:hover) {
  background: var(--background-hover);
}

:host(:focus),
:host([focused]) {
  background-color: var(--background-active);
}

:host([hidden]) {
  display: none;
}

:host([selected]) {
  background: var(--accent-color);
}
:host([selected][focused]) {
  background: var(--accent-color-hover);
}

:host(:disabled) {
  color: var(--foreground-disabled);
  background: var(--background-disabled);
  background: transparent;
  cursor: not-allowed;
}

:host([selected]:disabled) {
  background: var(--accent-color-disabled);
}
.control {
  display: flex;
  color: inherit;
  align-items: center;
  background-color: inherit;
  box-sizing: border-box;
  padding: var(--padding-t) var(--padding-r) var(--padding-b) var(--padding-l);
  outline: none;
}

.control:not(:focus-visible) {
  outline: none;
}

.icon {
  display: inline-flex;
  width: calc(var(--font-size) * 0.8);
  height: calc(var(--font-size) * 0.8);
  justify-content: center;
  align-items: center;
  transform-origin: center center;
}

:host(:not([selected])) .icon {
  visibility: hidden;
}

.icon svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}
`,vo=Object.defineProperty,yo=Object.getOwnPropertyDescriptor,we=(e,t,n,i)=>{for(var o=i>1?void 0:i?yo(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&vo(t,n,o),o};const Nt=e=>e.tagName.toLowerCase()==="fc-list-option"||e instanceof F,xo=()=>{const e=document.createElement("input");return e.type="radio",e};let F=class extends K{constructor(){super(xo());var e;this.hidden=!1,this.role="option",this.selectable=!0,this.selected=!1,this.defaultSelected=this.hasAttribute("selected"),this.value=(e=this.getAttribute("value"))!=null?e:""}connectedCallback(){super.connectedCallback(),p(this,"click",this.handleClick),p(this,"blur",this.handleBlur)}selectedChanged(e,t){this.emit("select"),this.setAttribute("tabindex",String(Number(t)-1)),this.proxy instanceof HTMLInputElement&&(this.proxy.checked=t)}select(e=!0){e!==this.selected&&(this.selected=e)}valueChanged(e,t){super.valueChanged(e,t),this.proxy&&(this.proxy.value=t)}focusItem(e=!0){this.toggleAttribute("focused",e)}get focused(){return this.hasAttribute("focused")}get form(){return this.closest("form")}get index(){const{parentElement:e}=this;return e?Array.from(e.querySelectorAll("fc-list-option:not([hidden])")).findIndex(t=>t===this):-1}get text(){return this.getAttribute("label")||this.textContent||this.value||""}handleClick(e){e.preventDefault(),this.selected=!this.disabled&&this.selectable}handleBlur(e){this.toggleAttribute("focused",!1)}render(){return d`<div class="control" part="control" role="option">
      ${$()}
      <span class="icon">
        <slot name="icon">
          <svg
            class="checked-indicator"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
            style="enable-background:new 0 0 12 12"
            xml:space="preserve"
          >
            <path
              d="M4.4 10c-.3 0-.5-.1-.7-.3l-3-3.1c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l2.3 2.4 5.5-5.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-6.2 6c-.2.2-.4.3-.7.3z"
            />
          </svg>
        </slot>
      </span>
      <span class="content">
        <slot>${this.text}</slot>
      </span>
      ${E()}
    </div>`}};F.styles=m(mo);we([l({type:"boolean",reflect:!0})],F.prototype,"hidden",2);we([l({reflect:!0})],F.prototype,"role",2);we([l()],F.prototype,"selectable",2);we([l({reflect:!0,converter(e,t){return t.selectable&&e}})],F.prototype,"selected",2);we([l({attribute:!1})],F.prototype,"defaultSelected",2);F=we([g("fc-list-option")],F);var wo=`:host {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  padding: var(--padding-t) var(--padding-l) var(--padding-b) var(--padding-l);
  background: var(--box-background);
  border: var(--border-width) solid var(--border-color);
}

:host(:disabled) {
  color: var(--foreground-disabled);
  background-color: var(--background-disabled);
  border-color: var(--border-color-disabled);
}
`,ko=Object.defineProperty,Co=Object.getOwnPropertyDescriptor,Y=(e,t,n,i)=>{for(var o=i>1?void 0:i?Co(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&ko(t,n,o),o};const _o=()=>document.createElement("select"),He=(e,t)=>e.text.toLowerCase().startsWith(t);let L=class extends K{constructor(){super(_o());var e;this.disabled=!1,this.role="listbox",this.value=(e=this.getAttribute("value"))!=null?e:"",this.selectable=!0,this.tabindex="0",this.options=[],this.matchedText=""}connectedCallback(){super.connectedCallback(),p(this,"keydown",this.handleKeydown),p(this,"select",this.handleSelect),this.setAttribute("aria-orientation","vertical")}disabledChanged(){this.disabled&&this.updateComplete.then(()=>{this.options.forEach(e=>e.disabled=!0)})}valueChanged(e,t){var i;if(!this.selectable||!this.hasAttribute("value")&&!t)return;(i=this.visibleOptions.find(o=>o.select))==null||i.select(!1);const n=this.visibleOptions.find(o=>o.value===t);n&&n.select(!0)}get visibleOptions(){return Array.from(this.children).filter(Nt).filter(e=>!e.hidden)}set visibleOptions(e){this.innerHTML="",e.forEach(t=>this.appendChild(t))}get length(){return this.visibleOptions.length}set length(e){this.options=this.options.slice(0,e)}getItem(e){return this.visibleOptions.find(t=>t.index===e)}selectedOptionChanged(e,t){e&&(e.focusItem(!1),e.select(!1)),t?(this.value=t.value,this.displayValue=t.text,t.focusItem(!0)):(this.value="",this.displayValue=void 0),this.emit("change",{old:e,next:t})}handleKeydown(e){const t=e.metaKey||e.ctrlKey||e.altKey?this.length:0;switch(e.key){case"ArrowDown":e.preventDefault(),this.focusNextOption(1+t);break;case"ArrowUp":e.preventDefault(),this.focusNextOption(-1-t);break;case"Enter":e.preventDefault(),this.focusedItem instanceof F&&(e.preventDefault(),this.select(this.focusedItem));break;case"Escape":e.preventDefault(),this.blur();break;default:this.gotoMatch(e)}}focusNextOption(e=1){const t=Ee(this.visibleOptions,e,!0);t&&(this.visibleOptions.forEach(n=>n.removeAttribute("focused")),t.toggleAttribute("focused",!0),t.scrollIntoView({block:"nearest"}))}select(e){const{selectedOption:t}=this;e!==t&&(this.selectedOption=e,e.select(!0))}handleSelect(e){e.stopImmediatePropagation();const{target:t}=e;!this.selectable||t instanceof F&&t.selected&&t!==this.selectedOption&&(this.selectedOption&&(this.selectedOption.selected=!1),this.selectedOption=t)}get focusedItem(){return this.visibleOptions.find(e=>e.hasAttribute("focused"))}gotoMatch(e){const t=e.key.toLocaleLowerCase();if(!(t.length===1&&t>="a"&&t<="z"))return;const n=this.matchedText+t;let i=!1;const{visibleOptions:o,selectedOption:r}=this;if(r&&(i=He(r,n),!i)){const s=o.find(c=>He(c,n))||o.filter(c=>c!==r).find(c=>He(c,t));if(s){this.selectedOption=s,this.matchedText=t;return}}if(i)this.matchedText+=t;else{const a=this.visibleOptions.find(s=>He(s,t));a?(e.preventDefault(),this.selectedOption=a,this.matchedText=t):(this.matchedText="",this.selectedOption=void 0)}}render(){return d`<slot></slot>`}};L.styles=m(wo);Y([l({attribute:!1,init:!1,type:"string"})],L.prototype,"displayValue",2);Y([l()],L.prototype,"disabled",2);Y([l({reflect:!0})],L.prototype,"role",2);Y([l({initCallback:!0})],L.prototype,"value",2);Y([l()],L.prototype,"selectable",2);Y([l({reflect:!0})],L.prototype,"tabindex",2);Y([l({attribute:!1}),Fe()],L.prototype,"options",2);Y([l({attribute:!1,initCallback:!0})],L.prototype,"selectedOption",2);L=Y([g("fc-listbox")],L);var Kt=`:host {
  position: relative;
  fill: var(--foreground);
  display: inline-flex;
  flex-direction: column;
  min-width: var(--control-min-width);
  height: fit-content;
  word-break: keep-all;
  --client-height: calc(var(--border-width) + var(--padding-b) + var(--padding-t) + var(--font-size));
}

:host {
  outline: none;
}

.control {
  position: relative;
  fill: inherit;
  display: inline-flex;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: inline-flex;
  padding: var(--padding-t) var(--padding-l) var(--padding-b) var(--padding-l);
  cursor: pointer;
}

:host([outline]) .control {
  border: var(--border-width) solid var(--border-color);
}

:host(:focus) .control {
  border-color: var(--border-color-active);
}

.control:hover {
  background: var(--background-hover);
  border-color: var(--border-color);
}

:host(:is(:disabled, [disabled], [readonly])) {
  background: var(--background-disabled);
  --foreground: var(--foreground-disabled);
  --background-hover: var(--background-disabled);
  --stroke-color: rgba(128, 128, 128, 0.4);
}

:host(:disabled) .control {
  cursor: not-allowed;
  border-color: var(--border-color-disabled);
}

.selected-value {
  flex: 1;
}

.icon-indicator {
  width: var(--font-size);
  height: var(--font-size);
  vertical-align: middle;
}

.listbox {
  outline: none;
  --padding-t: calc(var(--fc-unit-size) * 4);
  --padding-b: calc(var(--fc-unit-size) * 4);
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 1;
  width: 100%;
  left: 0;
  box-sizing: border-box;
  background: var(--box-background);
  padding: var(--padding-t) var(--padding-r) var(--padding-b) var(--padding-l);
  max-height: var(--max-height, 164px);
  overflow: auto;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.listbox:focus-visible {
  border-color: var(--outline-color);
}

.listbox[position='bottom'] {
  top: 0;
  margin-top: calc(var(--client-height) - var(--border-width));
}

.listbox[position='top'] {
  bottom: 0;
  margin-bottom: calc(var(--client-height) - var(--border-width));
}

:host(:not([open])) .listbox {
  display: none;
}

.listbox[has-options] slot[name='empty'] {
  display: none;
}

slot[name='empty'] {
  color: var(--foreground-disabled);
}

.indicator {
  pointer-events: none;
}
.indicator svg {
  fill: currentColor;
  width: calc(var(--font-size) * 0.8);
  height: calc(var(--font-size) * 0.8);
}

slot[name='placeholder'] {
  opacity: 0.5;
  display: block;
}
`,Oo=Object.defineProperty,$o=Object.getOwnPropertyDescriptor,pe=(e,t,n,i)=>{for(var o=i>1?void 0:i?$o(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&Oo(t,n,o),o},lt;(function(e){e.top="top",e.bottom="bottom"})(lt||(lt={}));let H=class extends L{constructor(){super(...arguments);this.role="listbox",this.tabindex="0",this.open=this.hasAttribute("open"),this.placeholder="\u8BF7\u9009\u62E9",this.outline=!0,this.position="bottom"}connectedCallback(){super.connectedCallback(),p(this,"focusout",this.handleFocusout)}displayValueChanged(e,t){typeof e=="string"&&(this.open=!1)}valueChanged(e,t){var i,o;if(!this.selectable)return;(i=super.valueChanged)==null||i.call(this,e,t),(o=this.visibleOptions.find(r=>r.select))==null||o.select(!1);const n=this.visibleOptions.find(r=>r.value===t);n&&n.select(!0),this.emit("change",{old:e,next:t})}openChanged(e,t){this.setAttribute("aria-expanded",String(t)),t?(this.focus(),et(this,{"--client-height":`${this.clientHeight}px`}),this.updateComplete.then(()=>{var n;(n=this.selectedOption)==null||n.scrollIntoView({block:"nearest"})})):jn(this,"--client-height")}handleKeydown(e){!this.open&&["ArrowDown","ArrowUp","Enter"].includes(e.key)?(e.preventDefault(),this.open=!0):super.handleKeydown(e)}handleClickControl(e){e.preventDefault(),this.disabled||(this.open=!this.open)}handleFocusout(e){const{relatedTarget:t}=e;t instanceof Node&&this.contains(t)||(this.open=!1)}render(){var e;return d`
      <div
        class="control"
        id="control"
        part="control"
        role="comobox"
        aria-haspopup="listbox"
        @click="${this.handleClickControl}"
        disabled="${this.disabled}"
      >
        ${$()}
        <slot name="button-container">
          <div class="selected-value" part="selected-value">
            ${(e=this.displayValue)!=null?e:d`<slot name="placeholder" part="placeholder">${this.placeholder}</slot>`}
          </div>
          <div class="indicator" part="indicator">
            <slot name="indicator">
              <svg class="icon-indicator" part="icon-indicator" viewBox="0 0 12 7" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.85.65c.2.2.2.5 0 .7L6.4 6.84a.55.55 0 01-.78 0L.14 1.35a.5.5 0 11.71-.7L6 5.8 11.15.65c.2-.2.5-.2.7 0z"
                />
              </svg>
            </slot>
          </div>
        </slot>
        ${E()}
      </div>
      <div
        class="listbox"
        ?has-options="${this.length>0}"
        part="listbox"
        ?hidden=${!this.open}
        role="listbox"
        ?disabled="${this.disabled}"
        position="${this.position}"
        tabindex="${this.open?"0":""}"
      >
        <slot></slot>
        ${this.length===0?d`<slot name="empty">--空--</slot>`:null}
      </div>
    `}};H.styles=m(Kt);pe([l({reflect:!0})],H.prototype,"role",2);pe([l({reflect:!0})],H.prototype,"tabindex",2);pe([l({reflect:!0,initCallback:!0})],H.prototype,"open",2);pe([l()],H.prototype,"placeholder",2);pe([l({reflect:!0})],H.prototype,"outline",2);pe([l({converter(e,t){const n=t.getAttribute("position")||"";if(Object.keys(lt).includes(n))return n;const{top:i,height:o}=t.getBoundingClientRect();return i+o/2>window.innerHeight/2?"top":"bottom"}})],H.prototype,"position",2);H=pe([g("fc-select")],H);var Eo=`.selected-value {
  width: 100%;
  background: transparent;
  padding: 0;
  width: 100%;
  height: calc(var(--fc-unit-size) * 16);
  color: inherit;
  background-color: transparent;
  border: none;
  outline: none;
  caret-color: var(--caret);
  font: inherit;
}
`,Ao=Object.defineProperty,Io=Object.getOwnPropertyDescriptor,ke=(e,t,n,i)=>{for(var o=i>1?void 0:i?Io(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&Ao(t,n,o),o};let ie=class extends H{constructor(){super(...arguments);var e;this.inputRef=hn(),this.role="combobox",this.autocomplete="",this.casesensitive=!1,this.placeholder="",this.inputValue=(e=this.getAttribute("value"))!=null?e:""}connectedCallback(){super.connectedCallback(),p(this,"select",this.handleSelect)}caseCompaire(e,t){return this.translateCase(e)==this.translateCase(t)}translateCase(e){return this.casesensitive?e:e.toLowerCase()}filterOptions(e){let t=!1;this.options.forEach(n=>{const i=e===""||this.translateCase(n.text).startsWith(this.translateCase(e));n.hidden=!i,i&&e===n.text&&(this.selectedOption=n,t=!0)}),t||(this.selectedOption=void 0)}get input(){var e;return(e=this.shadowRoot)==null?void 0:e.querySelector(".selected-value")}displayValueChanged(e,t){typeof e=="string"&&(this.open=!1),this.inputValue=t}selectedOptionChanged(e,t){super.selectedOptionChanged(e,t),t&&(this.inputValue=t.text)}valueChanged(e,t){!this.selectable||(this.updateComplete.then(()=>{var i;(i=this.visibleOptions.find(o=>o.select))==null||i.select(!1);const n=this.options.find(o=>o.value===t);n?(n.select(!0),this.selectedOption=n):this.inputValue=t}),this.emit("change",{old:e,next:t}),this.setFormValue(t),this.validate())}inputValueChanged(e,t){e?this.filterOptions(t):this.updateComplete.then(()=>this.filterOptions(t)),this.displayValue=t}handleLabelClick(e){var n;e.stopPropagation();const t=(n=this.shadowRoot)==null?void 0:n.querySelector(".selected-value");t instanceof HTMLElement&&t.focus()}handleFocus(){this.open=!0}handleSelect(e){if(!this.selectable||this.disabled)return;const{target:t}=e;t instanceof HTMLElement&&Nt(t)&&t.selected&&(this.open=!1,this.inputValue=t.text,this.value=t.value)}handleInputChange(){this.open=!1;const e=this.input.value;this.filterOptions(e),this.selectedOption=this.visibleOptions.find(t=>this.caseCompaire(t.text,e.trim()))}handleInput(e){e.stopPropagation(),this.open=!0;const{value:t}=e.target;this.selectedOption=void 0,this.inputValue=t.trim(),this.filterOptions(t.trim())}render(){return d`
      <label
        for="input"
        class="control"
        id="control"
        part="control"
        role="comobox"
        aria-haspopup="listbox"
        @click="${this.handleLabelClick}"
      >
        ${$()}
        <slot name="button-container">
          <input
            class="selected-value"
            part="selected-value"
            .value="${this.inputValue}"
            @input="${this.handleInput}"
            @change="${this.handleInputChange}"
            @focus="${this.handleFocus}"
            placeholder="${this.placeholder}"
            ${un(this.inputRef)}
          ></input>
          <div class="indicator" part="indicator">
            <slot name="indicator">
              <svg
                class="select-indicator"
                part="select-indicator"
                viewBox="0 0 12 7"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.85.65c.2.2.2.5 0 .7L6.4 6.84a.55.55 0 01-.78 0L.14 1.35a.5.5 0 11.71-.7L6 5.8 11.15.65c.2-.2.5-.2.7 0z"
                />
              </svg>
            </slot>
          </div>
        </slot>
        ${E()}
      </label>
      <div
        class="listbox"
        ?has-options="${this.length>0}"
        part="listbox"
        role="listbox"
        ?disabled="${this.disabled}"
        position="${this.position}"
        tabindex="${this.open?"0":""}"
      >
        <slot></slot>
        <slot name="empty">--空--</slot>
      </div>
    `}};ie.styles=m(Kt,Eo);ke([l({reflect:!0})],ie.prototype,"role",2);ke([l()],ie.prototype,"autocomplete",2);ke([l({type:"boolean"})],ie.prototype,"casesensitive",2);ke([l()],ie.prototype,"placeholder",2);ke([l({attribute:!1})],ie.prototype,"inputValue",2);ie=ke([g("fc-combobox")],ie);var So={parameters:{storySource:{source:`import book from './book.html?raw'

import './index'

export default { title: 'Combobox', order: 6 }

export const Combobox = () => book
`,locationsMap:{combobox:{startLoc:{col:24,line:7},endLoc:{col:34,line:7},startBody:{col:24,line:7},endBody:{col:34,line:7}}}}},title:"Combobox",order:6};const zo=()=>go,Po=["Combobox"];var Lo=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:So,Combobox:zo,__namedExportsOrder:Po}),To=`<style>
  .inline-grid {
    display: inline-grid;
    width: auto;
    margin-right: 16px;
  }
  .inline-grid > p {
    margin-bottom: 6px;
  }
  .up,
  .down {
    display: none;
    font-style: normal;
    color: #ff0;
  }
  [order='asc'] .down {
    display: inline-block;
  }
  [order='desc'] .up {
    display: inline-block;
  }
  .sortable-header:not([sortindex='4']) :is(.up, .down) {
    display: none;
  }
</style>

<h4>\u7B80\u5355\u4F7F\u7528</h4>
<fc-data-grid>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u5F20\u4E09</fc-data-grid-cell>
    <fc-data-grid-cell>\u7537</fc-data-grid-cell>
    <fc-data-grid-cell>20\u5C81</fc-data-grid-cell>
    <fc-data-grid-cell>\u5B66\u751F</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u674E\u56DB</fc-data-grid-cell>
    <fc-data-grid-cell>\u7537</fc-data-grid-cell>
    <fc-data-grid-cell>23\u5C81</fc-data-grid-cell>
    <fc-data-grid-cell>\u5DE5\u4EBA</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u738B\u4E94</fc-data-grid-cell>
    <fc-data-grid-cell>\u7537</fc-data-grid-cell>
    <fc-data-grid-cell>24\u5C81</fc-data-grid-cell>
    <fc-data-grid-cell>\u5BFC\u6E38</fc-data-grid-cell>
  </fc-data-grid-row>
</fc-data-grid>

<h4>\u5E26\u8868\u5934</h4>
<fc-data-grid class="inline-grid">
  <fc-data-grid-row slot="row-header">
    <fc-data-grid-cell>\u59D3\u540D</fc-data-grid-cell>
    <fc-data-grid-cell>\u6027\u522B</fc-data-grid-cell>
    <fc-data-grid-cell>\u5E74\u9F84</fc-data-grid-cell>
    <fc-data-grid-cell>\u804C\u4E1A</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u5F20\u4E09</fc-data-grid-cell>
    <fc-data-grid-cell>\u7537</fc-data-grid-cell>
    <fc-data-grid-cell>20\u5C81</fc-data-grid-cell>
    <fc-data-grid-cell>\u5B66\u751F</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u674E\u56DB</fc-data-grid-cell>
    <fc-data-grid-cell>\u7537</fc-data-grid-cell>
    <fc-data-grid-cell>23\u5C81</fc-data-grid-cell>
    <fc-data-grid-cell>\u5DE5\u4EBA</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u738B\u4E94</fc-data-grid-cell>
    <fc-data-grid-cell>\u7537</fc-data-grid-cell>
    <fc-data-grid-cell>24\u5C81</fc-data-grid-cell>
    <fc-data-grid-cell>\u5BFC\u6E38</fc-data-grid-cell>
  </fc-data-grid-row>
</fc-data-grid>

<h4>\u663E\u793A\u8FB9\u6846</h4>
<fc-data-grid outline class="inline-grid">
  <fc-data-grid-row>
    <fc-data-grid-cell>\u5F20\u4E09</fc-data-grid-cell>
    <fc-data-grid-cell>\u7537</fc-data-grid-cell>
    <fc-data-grid-cell>20\u5C81</fc-data-grid-cell>
    <fc-data-grid-cell>\u5B66\u751F</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u674E\u56DB</fc-data-grid-cell>
    <fc-data-grid-cell>\u7537</fc-data-grid-cell>
    <fc-data-grid-cell>23\u5C81</fc-data-grid-cell>
    <fc-data-grid-cell>\u5DE5\u4EBA</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u738B\u4E94</fc-data-grid-cell>
    <fc-data-grid-cell>\u7537</fc-data-grid-cell>
    <fc-data-grid-cell>24\u5C81</fc-data-grid-cell>
    <fc-data-grid-cell>\u5BFC\u6E38</fc-data-grid-cell>
  </fc-data-grid-row>
</fc-data-grid>

<h4>\u663E\u793A\u7F51\u683C</h4>
<fc-data-grid outline grid class="inline-grid">
  <fc-data-grid-row>
    <fc-data-grid-cell>\u5F20\u4E09</fc-data-grid-cell>
    <fc-data-grid-cell>\u7537</fc-data-grid-cell>
    <fc-data-grid-cell>20\u5C81</fc-data-grid-cell>
    <fc-data-grid-cell>\u5B66\u751F</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u674E\u56DB</fc-data-grid-cell>
    <fc-data-grid-cell>\u7537</fc-data-grid-cell>
    <fc-data-grid-cell>23\u5C81</fc-data-grid-cell>
    <fc-data-grid-cell>\u5DE5\u4EBA</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u738B\u4E94</fc-data-grid-cell>
    <fc-data-grid-cell>\u7537</fc-data-grid-cell>
    <fc-data-grid-cell>24\u5C81</fc-data-grid-cell>
    <fc-data-grid-cell>\u5BFC\u6E38</fc-data-grid-cell>
  </fc-data-grid-row>
</fc-data-grid>
<fc-data-grid grid class="inline-grid">
  <fc-data-grid-row>
    <fc-data-grid-cell>\u5F20\u4E09</fc-data-grid-cell>
    <fc-data-grid-cell>\u7537</fc-data-grid-cell>
    <fc-data-grid-cell>20\u5C81</fc-data-grid-cell>
    <fc-data-grid-cell>\u5B66\u751F</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u674E\u56DB</fc-data-grid-cell>
    <fc-data-grid-cell>\u7537</fc-data-grid-cell>
    <fc-data-grid-cell>23\u5C81</fc-data-grid-cell>
    <fc-data-grid-cell>\u5DE5\u4EBA</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u738B\u4E94</fc-data-grid-cell>
    <fc-data-grid-cell>\u7537</fc-data-grid-cell>
    <fc-data-grid-cell>24\u5C81</fc-data-grid-cell>
    <fc-data-grid-cell>\u5BFC\u6E38</fc-data-grid-cell>
  </fc-data-grid-row>
</fc-data-grid>

<h4>\u8DE8\u5355\u5143\u683C</h4>
<fc-data-grid outline grid>
  <fc-data-grid-row role="rowheader">
    <fc-data-grid-cell colspan="2" rowspan="2">\u53EF\u89C1\u6027</fc-data-grid-cell>
    <fc-data-grid-cell colspan="3">\u6295\u5F71/\u8868\u9762</fc-data-grid-cell>
    <fc-data-grid-cell colspan="2">\u622A\u9762</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row role="rowheader">
    <fc-data-grid-cell>\u7EBF</fc-data-grid-cell>
    <fc-data-grid-cell>\u586B\u5145\u56FE\u6848</fc-data-grid-cell>
    <fc-data-grid-cell>\u900F\u660E\u5EA6</fc-data-grid-cell>
    <fc-data-grid-cell>\u7EBF</fc-data-grid-cell>
    <fc-data-grid-cell>\u586B\u5145\u56FE\u6848</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>1</fc-data-grid-cell>
    <fc-data-grid-cell>2</fc-data-grid-cell>
    <fc-data-grid-cell>3</fc-data-grid-cell>
    <fc-data-grid-cell>4</fc-data-grid-cell>
    <fc-data-grid-cell>5</fc-data-grid-cell>
    <fc-data-grid-cell>6</fc-data-grid-cell>
    <fc-data-grid-cell>7</fc-data-grid-cell>
  </fc-data-grid-row>
</fc-data-grid>

<h4>\u6298\u53E0 row</h4>
<fc-data-grid outline grid>
  <fc-data-grid-row role="rowheader">
    <fc-data-grid-cell colspan="2" rowspan="2">\u53EF\u89C1\u6027</fc-data-grid-cell>
    <fc-data-grid-cell colspan="3">\u6295\u5F71/\u8868\u9762</fc-data-grid-cell>
    <fc-data-grid-cell colspan="2">\u622A\u9762</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row role="rowheader">
    <fc-data-grid-cell>\u7EBF</fc-data-grid-cell>
    <fc-data-grid-cell>\u586B\u5145\u56FE\u6848</fc-data-grid-cell>
    <fc-data-grid-cell>\u900F\u660E\u5EA6</fc-data-grid-cell>
    <fc-data-grid-cell>\u7EBF</fc-data-grid-cell>
    <fc-data-grid-cell>\u586B\u5145\u56FE\u6848</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>1</fc-data-grid-cell>
    <fc-data-grid-cell>2</fc-data-grid-cell>
    <fc-data-grid-cell>3</fc-data-grid-cell>
    <fc-data-grid-cell>4</fc-data-grid-cell>
    <fc-data-grid-cell>5</fc-data-grid-cell>
    <fc-data-grid-cell>6</fc-data-grid-cell>
    <fc-data-grid-cell>7</fc-data-grid-cell>

    <fc-data-grid-cell slot="collapse" colspan="2">collapse 1</fc-data-grid-cell>
    <fc-data-grid-cell slot="collapse" colspan="5">collapse 2</fc-data-grid-cell>
  </fc-data-grid-row>

  <fc-data-grid-row>
    <fc-data-grid-cell>1</fc-data-grid-cell>
    <fc-data-grid-cell>2</fc-data-grid-cell>
    <fc-data-grid-cell>3</fc-data-grid-cell>
    <fc-data-grid-cell>4</fc-data-grid-cell>
    <fc-data-grid-cell>5</fc-data-grid-cell>
    <fc-data-grid-cell>6</fc-data-grid-cell>
    <fc-data-grid-cell>7</fc-data-grid-cell>
  </fc-data-grid-row>
</fc-data-grid>

<h4>\u6392\u5E8F</h4>
<div class="inline-grid">
  <p>\u6309\u59D3\u540D</p>
  <fc-data-grid outline grid sortIndex="1">
    <fc-data-grid-row slot="row-header">
      <fc-data-grid-cell>
        <span>\u59D3\u540D</span>
        <span slot="after"><i class="up">\u2193</i><i class="down">\u2191</i></span>
      </fc-data-grid-cell>
      <fc-data-grid-cell>\u6027\u522B</fc-data-grid-cell>
      <fc-data-grid-cell>\u5E74\u9F84</fc-data-grid-cell>
      <fc-data-grid-cell>\u6210\u7EE9</fc-data-grid-cell>
    </fc-data-grid-row>

    <fc-data-grid-row>
      <fc-data-grid-cell>\u5F20\u4E09</fc-data-grid-cell>
      <fc-data-grid-cell>\u5973</fc-data-grid-cell>
      <fc-data-grid-cell>23</fc-data-grid-cell>
      <fc-data-grid-cell>C</fc-data-grid-cell>
    </fc-data-grid-row>
    <fc-data-grid-row>
      <fc-data-grid-cell>\u674E\u56DB</fc-data-grid-cell>
      <fc-data-grid-cell>\u7537</fc-data-grid-cell>
      <fc-data-grid-cell>21</fc-data-grid-cell>
      <fc-data-grid-cell>B</fc-data-grid-cell>
    </fc-data-grid-row>
    <fc-data-grid-row>
      <fc-data-grid-cell>\u738B\u4E94</fc-data-grid-cell>
      <fc-data-grid-cell>\u7537</fc-data-grid-cell>
      <fc-data-grid-cell>25</fc-data-grid-cell>
      <fc-data-grid-cell>A</fc-data-grid-cell>
    </fc-data-grid-row>
    <fc-data-grid-row>
      <fc-data-grid-cell>\u8D75\u516D</fc-data-grid-cell>
      <fc-data-grid-cell>\u5973</fc-data-grid-cell>
      <fc-data-grid-cell>20</fc-data-grid-cell>
      <fc-data-grid-cell>D</fc-data-grid-cell>
    </fc-data-grid-row>
  </fc-data-grid>
</div>

<div class="inline-grid">
  <p>\u6309\u5E74\u9F84\u6392\u5217</p>
  <fc-data-grid outline grid sortIndex="2">
    <fc-data-grid-row slot="row-header">
      <fc-data-grid-cell>\u59D3\u540D</fc-data-grid-cell>
      <fc-data-grid-cell>\u6027\u522B</fc-data-grid-cell>
      <fc-data-grid-cell>
        <span>\u5E74\u9F84</span>
        <span slot="after"><i class="up">\u2193</i><i class="down">\u2191</i></span>
      </fc-data-grid-cell>
      <fc-data-grid-cell>\u6210\u7EE9</fc-data-grid-cell>
    </fc-data-grid-row>

    <fc-data-grid-row>
      <fc-data-grid-cell>\u5F20\u4E09</fc-data-grid-cell>
      <fc-data-grid-cell>\u5973</fc-data-grid-cell>
      <fc-data-grid-cell>23</fc-data-grid-cell>
      <fc-data-grid-cell>C</fc-data-grid-cell>
    </fc-data-grid-row>
    <fc-data-grid-row>
      <fc-data-grid-cell>\u674E\u56DB</fc-data-grid-cell>
      <fc-data-grid-cell>\u7537</fc-data-grid-cell>
      <fc-data-grid-cell>21</fc-data-grid-cell>
      <fc-data-grid-cell>B</fc-data-grid-cell>
    </fc-data-grid-row>
    <fc-data-grid-row>
      <fc-data-grid-cell>\u738B\u4E94</fc-data-grid-cell>
      <fc-data-grid-cell>\u7537</fc-data-grid-cell>
      <fc-data-grid-cell>25</fc-data-grid-cell>
      <fc-data-grid-cell>A</fc-data-grid-cell>
    </fc-data-grid-row>
    <fc-data-grid-row>
      <fc-data-grid-cell>\u8D75\u516D</fc-data-grid-cell>
      <fc-data-grid-cell>\u5973</fc-data-grid-cell>
      <fc-data-grid-cell>20</fc-data-grid-cell>
      <fc-data-grid-cell>D</fc-data-grid-cell>
    </fc-data-grid-row>
  </fc-data-grid>
</div>

<div class="inline-grid">
  <p>\u6309\u6210\u7EE9\u964D\u5E8F\u6392\u5217</p>
  <fc-data-grid outline grid sortIndex="3" order="desc">
    <fc-data-grid-row slot="row-header">
      <fc-data-grid-cell>\u59D3\u540D</fc-data-grid-cell>
      <fc-data-grid-cell>\u6027\u522B</fc-data-grid-cell>
      <fc-data-grid-cell>\u5E74\u9F84</fc-data-grid-cell>
      <fc-data-grid-cell>
        <span>\u6210\u7EE9</span>
        <span slot="after"><i class="up">\u2193</i><i class="down">\u2191</i></span>
      </fc-data-grid-cell>
    </fc-data-grid-row>

    <fc-data-grid-row>
      <fc-data-grid-cell>\u5F20\u4E09</fc-data-grid-cell>
      <fc-data-grid-cell>\u5973</fc-data-grid-cell>
      <fc-data-grid-cell>23</fc-data-grid-cell>
      <fc-data-grid-cell>C</fc-data-grid-cell>
    </fc-data-grid-row>
    <fc-data-grid-row>
      <fc-data-grid-cell>\u674E\u56DB</fc-data-grid-cell>
      <fc-data-grid-cell>\u7537</fc-data-grid-cell>
      <fc-data-grid-cell>21</fc-data-grid-cell>
      <fc-data-grid-cell>B</fc-data-grid-cell>
    </fc-data-grid-row>
    <fc-data-grid-row>
      <fc-data-grid-cell>\u738B\u4E94</fc-data-grid-cell>
      <fc-data-grid-cell>\u7537</fc-data-grid-cell>
      <fc-data-grid-cell>25</fc-data-grid-cell>
      <fc-data-grid-cell>A</fc-data-grid-cell>
    </fc-data-grid-row>
    <fc-data-grid-row>
      <fc-data-grid-cell>\u8D75\u516D</fc-data-grid-cell>
      <fc-data-grid-cell>\u5973</fc-data-grid-cell>
      <fc-data-grid-cell>20</fc-data-grid-cell>
      <fc-data-grid-cell>D</fc-data-grid-cell>
    </fc-data-grid-row>
  </fc-data-grid>
</div>

<div class="inline-grid">
  <p>\u70B9\u51FB\u8868\u5934\u53EF\u6392\u5E8F \uFF08<i>* \u6027\u522B\u8BBE\u7F6E\u4E86\u4E0D\u53EF\u6392\u5E8F</i>\uFF09</p>
  <fc-data-grid outline grid sortIndex="4" order="desc" class="sortable-header">
    <fc-data-grid-row slot="row-header" sortable>
      <fc-data-grid-cell>\u59D3\u540D</fc-data-grid-cell>
      <fc-data-grid-cell sortable="false">\u6027\u522B</fc-data-grid-cell>
      <fc-data-grid-cell>\u5E74\u9F84</fc-data-grid-cell>
      <fc-data-grid-cell>
        <span>\u6210\u7EE9</span>
        <span slot="after"><i class="up">\u2193</i><i class="down">\u2191</i></span>
      </fc-data-grid-cell>
    </fc-data-grid-row>

    <fc-data-grid-row>
      <fc-data-grid-cell>\u5F20\u4E09</fc-data-grid-cell>
      <fc-data-grid-cell>\u5973</fc-data-grid-cell>
      <fc-data-grid-cell>23</fc-data-grid-cell>
      <fc-data-grid-cell>C</fc-data-grid-cell>
    </fc-data-grid-row>
    <fc-data-grid-row>
      <fc-data-grid-cell>\u674E\u56DB</fc-data-grid-cell>
      <fc-data-grid-cell>\u7537</fc-data-grid-cell>
      <fc-data-grid-cell>21</fc-data-grid-cell>
      <fc-data-grid-cell>B</fc-data-grid-cell>
    </fc-data-grid-row>
    <fc-data-grid-row>
      <fc-data-grid-cell>\u738B\u4E94</fc-data-grid-cell>
      <fc-data-grid-cell>\u7537</fc-data-grid-cell>
      <fc-data-grid-cell>25</fc-data-grid-cell>
      <fc-data-grid-cell>A</fc-data-grid-cell>
    </fc-data-grid-row>
    <fc-data-grid-row>
      <fc-data-grid-cell>\u8D75\u516D</fc-data-grid-cell>
      <fc-data-grid-cell>\u5973</fc-data-grid-cell>
      <fc-data-grid-cell>20</fc-data-grid-cell>
      <fc-data-grid-cell>D</fc-data-grid-cell>
    </fc-data-grid-row>
  </fc-data-grid>
</div>
<p><span>*</span> \u6392\u5E8F\u5B8C\u4F1A\u89E6\u53D1 <code>sorted</code> \u4E8B\u4EF6</p>

<h4>\u56FA\u5B9A\u8868\u5934</h4>
<p>
  <span>\u53EF\u4EE5\u8BD5\u8BD5\u6309\u952E\u76D8 <kbd>Tab</kbd> \u83B7\u5F97\u7126\u70B9\uFF0C</span>
  <span>\u7136\u540E\u7528<kbd>\u2193</kbd> <kbd>\u2191</kbd> <kbd>\u2192</kbd> <kbd>\u2190</kbd> \u5BFC\u822A\uFF0C</span>
  <span>\u5E76\u914D\u5408<kbd>Ctrl</kbd>\u8DF3\u5230\u8FB9\u754C\u4F4D\u7F6E</span>\uFF0C
  <span>\u914D\u5408<kbd>Alt</kbd>\u53EF\u4EE5\u6B63\u5E38\u6EDA\u52A8\u9875\u9762</span>
</p>

<fc-data-grid sticky max-rows="10">
  <fc-data-grid-row slot="row-header" sortable>
    <fc-data-grid-cell>\u59D3\u540D</fc-data-grid-cell>
    <fc-data-grid-cell>\u6027\u522B</fc-data-grid-cell>
    <fc-data-grid-cell>\u5E74\u9F84</fc-data-grid-cell>
    <fc-data-grid-cell>\u804C\u4E1A</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u5F20\u5343\u632F</fc-data-grid-cell>
    <fc-data-grid-cell>\u7537</fc-data-grid-cell>
    <fc-data-grid-cell>31</fc-data-grid-cell>
    <fc-data-grid-cell>\u804C\u5DE5</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u5218\u51B0\u8389</fc-data-grid-cell>
    <fc-data-grid-cell>\u5973</fc-data-grid-cell>
    <fc-data-grid-cell>33</fc-data-grid-cell>
    <fc-data-grid-cell>\u804C\u5DE5</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u5B54\u4E3D\u5A1F</fc-data-grid-cell>
    <fc-data-grid-cell>\u5973</fc-data-grid-cell>
    <fc-data-grid-cell>31</fc-data-grid-cell>
    <fc-data-grid-cell>\u804C\u5DE5</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u5B59\u76DB\u5B87</fc-data-grid-cell>
    <fc-data-grid-cell>\u7537</fc-data-grid-cell>
    <fc-data-grid-cell>34</fc-data-grid-cell>
    <fc-data-grid-cell>\u804C\u5DE5</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u5218\u783E\u4E39</fc-data-grid-cell>
    <fc-data-grid-cell>\u5973</fc-data-grid-cell>
    <fc-data-grid-cell>29</fc-data-grid-cell>
    <fc-data-grid-cell>\u804C\u5DE5</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u5362\u6D0B\u5578</fc-data-grid-cell>
    <fc-data-grid-cell>\u5973</fc-data-grid-cell>
    <fc-data-grid-cell>30</fc-data-grid-cell>
    <fc-data-grid-cell>\u804C\u5DE5</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u5F20\u6587\u7426</fc-data-grid-cell>
    <fc-data-grid-cell>\u5973</fc-data-grid-cell>
    <fc-data-grid-cell>29</fc-data-grid-cell>
    <fc-data-grid-cell>\u804C\u5DE5</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u738B\u6D77\u9F99</fc-data-grid-cell>
    <fc-data-grid-cell>\u7537</fc-data-grid-cell>
    <fc-data-grid-cell>40</fc-data-grid-cell>
    <fc-data-grid-cell>\u804C\u5DE5</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u6881\u79CB\u5B9E</fc-data-grid-cell>
    <fc-data-grid-cell>\u5973</fc-data-grid-cell>
    <fc-data-grid-cell>32</fc-data-grid-cell>
    <fc-data-grid-cell>\u804C\u5DE5</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u7530\u5E73</fc-data-grid-cell>
    <fc-data-grid-cell>\u5973</fc-data-grid-cell>
    <fc-data-grid-cell>31</fc-data-grid-cell>
    <fc-data-grid-cell>\u804C\u5DE5</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u81E7\u632F\u539F</fc-data-grid-cell>
    <fc-data-grid-cell>\u5973</fc-data-grid-cell>
    <fc-data-grid-cell>32</fc-data-grid-cell>
    <fc-data-grid-cell>\u804C\u5DE5</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u5F20\u6D77\u670B</fc-data-grid-cell>
    <fc-data-grid-cell>\u7537</fc-data-grid-cell>
    <fc-data-grid-cell>32</fc-data-grid-cell>
    <fc-data-grid-cell>\u804C\u5DE5</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u5218\u5F64</fc-data-grid-cell>
    <fc-data-grid-cell>\u5973</fc-data-grid-cell>
    <fc-data-grid-cell>29</fc-data-grid-cell>
    <fc-data-grid-cell>\u804C\u5DE5</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u5357\u535A</fc-data-grid-cell>
    <fc-data-grid-cell>\u5973</fc-data-grid-cell>
    <fc-data-grid-cell>29</fc-data-grid-cell>
    <fc-data-grid-cell>\u804C\u5DE5</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u51B7\u73A5</fc-data-grid-cell>
    <fc-data-grid-cell>\u5973</fc-data-grid-cell>
    <fc-data-grid-cell>28</fc-data-grid-cell>
    <fc-data-grid-cell>\u804C\u5DE5</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u738B\u8FEA</fc-data-grid-cell>
    <fc-data-grid-cell>\u7537</fc-data-grid-cell>
    <fc-data-grid-cell>37</fc-data-grid-cell>
    <fc-data-grid-cell>\u804C\u5DE5</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u9648\u7EA2\u5175</fc-data-grid-cell>
    <fc-data-grid-cell>\u7537</fc-data-grid-cell>
    <fc-data-grid-cell>51</fc-data-grid-cell>
    <fc-data-grid-cell>\u804C\u5DE5</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u5BAB\u518D\u6B23</fc-data-grid-cell>
    <fc-data-grid-cell>\u5973</fc-data-grid-cell>
    <fc-data-grid-cell>29</fc-data-grid-cell>
    <fc-data-grid-cell>\u804C\u5DE5</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u5218\u723D</fc-data-grid-cell>
    <fc-data-grid-cell>\u5973</fc-data-grid-cell>
    <fc-data-grid-cell>28</fc-data-grid-cell>
    <fc-data-grid-cell>\u804C\u5DE5</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u5B59\u6167\u9896</fc-data-grid-cell>
    <fc-data-grid-cell>\u5973</fc-data-grid-cell>
    <fc-data-grid-cell>30</fc-data-grid-cell>
    <fc-data-grid-cell>\u804C\u5DE5</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u5218\u5E05</fc-data-grid-cell>
    <fc-data-grid-cell>\u7537</fc-data-grid-cell>
    <fc-data-grid-cell>30</fc-data-grid-cell>
    <fc-data-grid-cell>\u804C\u5DE5</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u5510\u94ED\u6CFD</fc-data-grid-cell>
    <fc-data-grid-cell>\u7537</fc-data-grid-cell>
    <fc-data-grid-cell>31</fc-data-grid-cell>
    <fc-data-grid-cell>\u804C\u5DE5</fc-data-grid-cell>
  </fc-data-grid-row>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u80E1\u4FCA\u7537</fc-data-grid-cell>
    <fc-data-grid-cell>\u5973</fc-data-grid-cell>
    <fc-data-grid-cell>29</fc-data-grid-cell>
    <fc-data-grid-cell>\u804C\u5DE5</fc-data-grid-cell>
  </fc-data-grid-row>
</fc-data-grid>

<h4>\u4E0E\u8868\u5355\u4E00\u8D77\u4F7F\u7528</h4>
<fc-data-grid grid>
  <fc-data-grid-row>
    <fc-data-grid-cell>\u89C6\u56FE\u6BD4\u4F8B</fc-data-grid-cell>
    <fc-data-grid-cell>
      <fc-input value="1:100"></fc-input>
    </fc-data-grid-cell>
  </fc-data-grid-row>

  <fc-data-grid-row>
    <fc-data-grid-cell>\u6BD4\u4F8B\u503C 1:</fc-data-grid-cell>
    <fc-data-grid-cell>
      <fc-input readonly value="100"></fc-input>
    </fc-data-grid-cell>
  </fc-data-grid-row>

  <fc-data-grid-row>
    <fc-data-grid-cell>\u663E\u793A\u6A21\u578B</fc-data-grid-cell>
    <fc-data-grid-cell>
      <fc-select value="1">
        <fc-list-option value="1">\u6807\u51C6</fc-list-option>
        <fc-list-option value="2">\u7B80\u5355</fc-list-option>
      </fc-select>
    </fc-data-grid-cell>
  </fc-data-grid-row>

  <fc-data-grid-row>
    <fc-data-grid-cell>\u8BE6\u7EC6\u7A0B\u5EA6</fc-data-grid-cell>
    <fc-data-grid-cell>
      <fc-select value="1">
        <fc-list-option value="1">\u7C97\u7565</fc-list-option>
        <fc-list-option value="2">\u7CBE\u7EC6</fc-list-option>
      </fc-select>
    </fc-data-grid-cell>
  </fc-data-grid-row>

  <fc-data-grid-row>
    <fc-data-grid-cell>\u96F6\u4EF6\u53EF\u89C1\u6027</fc-data-grid-cell>
    <fc-data-grid-cell>
      <fc-button>\u7F16\u8F91...</fc-button>
    </fc-data-grid-cell>
  </fc-data-grid-row>

  <fc-data-grid-row>
    <fc-data-grid-cell>\u56FE\u5F62\u663E\u793A\u9009\u9879</fc-data-grid-cell>
    <fc-data-grid-cell>
      <fc-button>\u7F16\u8F91...</fc-button>
    </fc-data-grid-cell>
  </fc-data-grid-row>

  <fc-data-grid-row>
    <fc-data-grid-cell>\u65B9\u5411</fc-data-grid-cell>
    <fc-data-grid-cell>
      <fc-select value="1">
        <fc-list-option value="1">\u9879\u76EE\u5317</fc-list-option>
        <fc-list-option value="2">\u6B63\u5317</fc-list-option>
      </fc-select>
    </fc-data-grid-cell>
  </fc-data-grid-row>
</fc-data-grid>
`,Do=`:host {
  position: relative;
  display: flex;
  justify-content: var(--data-grid-align);
  padding: var(--padding);
  --outline-offset: 0px;
  --border-radius: 0;
  border-right: var(--grid-border-right-width, --border-width) solid var(--border-color);
  border-bottom: var(--grid-border-bottom-width, --border-width) solid var(--border-color);
  vertical-align: middle;
}

:host(:last-child) {
  border-right: 0;
}

:host([role='columnheader']) {
  font-weight: bold;
  background: var(--background-active);
}

.collpase-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  color: var(--foreground);
  padding: var(--padding);
  cursor: pointer;
}
`,Mo=Object.defineProperty,jo=Object.getOwnPropertyDescriptor,X=(e,t,n,i)=>{for(var o=i>1?void 0:i?jo(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&Mo(t,n,o),o};let z=class extends w{constructor(){super(...arguments);this.tabIndex=-1,this.colIndex=-1,this.colSpan=1,this.collpase=!1,this.open=!1,this.role="cell",this.sortable=this.hasAttribute("sortable"),this.rowSpan=1,this.handleFocus=e=>{e.target===this&&this.focusItem(!0)},this.handleBlur=e=>{e.target===this&&this.focusItem(!1)},this.handleClick=e=>{e.target===this&&(this.tabIndex=0)}}connectedCallback(){super.connectedCallback(),p(this,"focusin",this.handleFocus),p(this,"blur",this.handleBlur),p(this,"click",this.handleClick)}colIndexChanged(e,t){t>=0?this.setAttribute("aria-colindex",t.toString()):this.removeAttribute("aria-colindex")}colSpanChanged(e,t){t>1?this.style.gridColumnEnd=`span ${t}`:this.style.gridColumnEnd=""}openChanged(e,t){this.emit("open",{old:e,next:t})}rowSpanChanged(e,t){t>1?this.style.gridRowEnd=`span ${t}`:this.style.gridRowEnd=""}focusItem(e=!0){this.toggleAttribute("focused",Boolean(e))}handleCollpase(e){e.preventDefault(),e.stopPropagation(),this.open=!this.open}render(){const e=d`
      <svg class="arrow-right" viewBox="0 0 12 12" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
        <path d="m9 6-6 5.5V.5z" fill-rule="evenodd" />
      </svg>
    `,t=d`<svg
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      xmlns:v="https://vecta.io/nano"
    >
      <path d="M6 9L.5 3h11z" fill-rule="evenodd" />
    </svg>`;return d`
      ${$()}
      ${this.collpase?d`
            <button class="collpase-button" part="collpase-button" tabindex="-1" @click="${this.handleCollpase}">
              ${this.open?d`<slot name="collapse-button">${t}</slot>`:d`<slot name="expand-button">${e}</slot>`}
            </button>
          `:null}
      <slot></slot>
      ${E()}
      <span class="fc-focus-overlay"></span>
    `}};z.styles=m(Do);X([l({reflect:!0})],z.prototype,"tabIndex",2);X([l({hasChanged:N})],z.prototype,"colIndex",2);X([l()],z.prototype,"colSpan",2);X([l({reflect:!0})],z.prototype,"collpase",2);X([l({reflect:!0,hasChanged:N})],z.prototype,"open",2);X([l({reflect:!0,init(e){const{parentElement:t}=e;return t&&t.getAttribute("role")=="rowheader"?"columnheader":"cell"}})],z.prototype,"role",2);X([l()],z.prototype,"sortable",2);X([l()],z.prototype,"rowSpan",2);z=X([g("fc-data-grid-cell")],z);var Bo=`:host {
  /*\u4E5F\u8BB8\u4F1A\u7528 shadow DOM \u6765\u5B9E\u73B0*/
  display: contents;
  border-radius: 0;
}

:host([open]:last-child) ::slotted(:not([slot])) {
  --grid-border-bottom-width: var(--border-width);
  --grid-border-right-width: var(--border-width);
}

:host(:not([open])) ::slotted([slot='collapse']) {
  display: none;
}

:host(:last-child) ::slotted(:not([slot]):last-child) {
  --grid-border-right-width: 0;
}
`,Ro=Object.defineProperty,Fo=Object.getOwnPropertyDescriptor,re=(e,t,n,i)=>{for(var o=i>1?void 0:i?Fo(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&Ro(t,n,o),o};let U=class extends w{constructor(){super(...arguments);this.cells=[],this.collapseCells=[],this.open=!1,this.role="row",this.rowIndex=-1,this.rowIndexElements=[],this.sortable=this.hasAttribute("sortable")}connectedCallback(){super.connectedCallback(),p(this,"open",this.handleOpen)}cellsChanged(e,t){t.forEach((n,i)=>{n.colIndex=i+1}),this.emit("cellsChanged")}collapseCellsChanged(e,t){t.length&&this.cells.length&&(this.cells[0].collpase=!0,et(this.cells[this.cells.length-1],{"--grid-border-right-width":"0"}))}roleChanged(e,t){t==="rowheader"&&this.cells.forEach(n=>{n.role="columnheader"})}rowIndexChanged(e,t){t>=0&&this.setAttribute("aria-rowindex",this.rowIndex.toString())}rowIndexElementsChanged(){this.cells=Array.from(this.querySelectorAll("fc-data-grid-cell:not([slot])"))}sortableChanged(e,t){this.cells.forEach(n=>{n.sortable=t})}handleOpen(e){e.target instanceof z&&(this.open=e.target.open)}render(){return d`
      ${$()}
      <slot></slot>
      <slot name="collapse"></slot>
      ${E()}
    `}};U.styles=m(Bo);re([l({attribute:!1}),Fe()],U.prototype,"cells",2);re([l({attribute:!1}),Fe('slot[name="collapse"]')],U.prototype,"collapseCells",2);re([l({reflect:!0})],U.prototype,"open",2);re([l({reflect:!0,hasChanged:N,init:e=>e.slot==="row-header"?"rowheader":"row"})],U.prototype,"role",2);re([l()],U.prototype,"rowIndex",2);re([l({init(e){return Array.from(e.querySelectorAll('fc-data-grid-cell[slot="row-index"]'))}})],U.prototype,"rowIndexElements",2);re([l({reflect:!0})],U.prototype,"sortable",2);U=re([g("fc-data-grid-row")],U);var Vo=`:host {
  display: grid;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  grid-template-columns: var(--grid-template-columns, repeat(var(--max-cell-count), 1fr));

  --grid-border-bottom-width: var(--border-width);
}

:host([grid]) {
  --grid-border-right-width: var(--border-width);
}

:host([max-rows]) {
  overflow-y: auto;
}

:host([sticky]) ::slotted([slot='row-header']) {
  position: sticky;
  left: 0;
  top: 0;
  background: var(--background);
  z-index: 2;
}

:host([outline]) {
  border: var(--border-width) solid var(--border-color);
}

::slotted([role^='row']:last-child) {
  --grid-border-bottom-width: 0;
}
`,No=Object.defineProperty,Ko=Object.getOwnPropertyDescriptor,T=(e,t,n,i)=>{for(var o=i>1?void 0:i?Ko(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&No(t,n,o),o};let A=class extends w{constructor(){super(...arguments);this.grid=!1,this.outline=!1,this.role="grid",this.sticky=!1,this.maxRows=-1,this.colCount=-1,this.sortIndex=-1,this.handleSort=()=>{var o;const{sortIndex:e,colCount:t,dataRows:n,ownerDocument:i}=this;if(e>0&&e<=t&&n){const r=this.onSort.bind(this),a=n.sort(r),s=i.activeElement;this.innerHTML="";const{rowHeader:c=[]}=this,f=Number(!c.length),h=c.concat(a);h.forEach((y,v)=>{this.appendChild(y),y.rowIndex=v+1,y.setAttribute("data-index",(v+f).toString())}),((o=this.activeElement)==null?void 0:o.parentElement)||(this.activeElement=h[0].cells[0]),s===this.activeElement&&this.activeElement.focus(),this.emit("sorted")}},this.order="asc"}connectedCallback(){super.connectedCallback(),p(this,"keydown",this.handleKeydown),p(this,"click",this.handleClick)}activeElementChanged(e,t){var a,s;if(e&&(e.tabIndex=-1),!t)return;t.tabIndex=0;const{rows:n}=this;if(!n)return;const i=n.findIndex(c=>c.contains(t)),o=n[i];this.activeRow=o==null?void 0:o.cells;const r=(s=(a=o==null?void 0:o.cells)==null?void 0:a.findIndex(c=>c===t))!=null?s:-1;this.activeCol=n.map(c=>{var f;return(f=c.cells)==null?void 0:f[r]}).filter(c=>!!c)}maxRowsChanged(e,t){t>0?this.setAttribute("max-rows",t.toString()):this.removeAttribute("max-rows")}rowsChanged(e,t=[]){const{maxRows:n,rowHeader:i=[]}=this;!this.activeElement&&t.length&&this.updateComplete.then(()=>{this.activeElement=t[0].querySelector("fc-data-grid-cell")});const o=[],r=Number(!i.length);t.forEach((h,y)=>{h.rowIndex=y+1,h.dataset.index=(y+r).toString(),o.push(h.updateComplete)}),Promise.all(o).then(()=>this.handleSort());const a=t.map(h=>h.cells.reduce((y,v)=>(y+=v.colSpan,y),0)),s=Math.max(...a,0),c=t==null?void 0:t[n];let f="";c&&(f=c.offsetTop+c.offsetHeight+"px"),et(this,{"max-height":f,"--grid-template-columns":`repeat(${s}, 1fr)`}),this.setAttribute("aria-rowcount",t.length.toString()),this.setAttribute("aria-colcount",s.toString()),this.colCount=s}sortIndexChanged(e,t){this.handleSort()}orderChanged(e,t){this.handleSort()}onSort(e,t){var s,c,f,h,y,v;const{sortIndex:n,order:i}=this,o=i==="desc"?-1:1,r=((f=(c=(s=e.cells)==null?void 0:s.find(x=>x.colIndex===n))==null?void 0:c.textContent)==null?void 0:f.trim())||"",a=((v=(y=(h=t.cells)==null?void 0:h.find(x=>x.colIndex===n))==null?void 0:y.textContent)==null?void 0:v.trim())||"";return r==a?0:o*(r==null?void 0:r.localeCompare(a,"co",{numeric:!0}))}handleKeydown(e){const{activeElement:t,activeRow:n,activeCol:i}=this;if(!!(t&&n&&i)&&e.target instanceof z)switch(e.key){case"Escape":t.blur();break;case"ArrowUp":case"ArrowDown":case"ArrowLeft":case"ArrowRight":this.focusNext(e);break;case"Enter":this.handleClick(e)}}focusNext(e){const{activeElement:t,activeRow:n,activeCol:i}=this,r={ArrowLeft:[n,-1],ArrowRight:[n,1],ArrowUp:[i,-1],ArrowDown:[i,1]}[e.key];if(r){const[a,s]=r,c=a.findIndex(x=>x===t),{length:f}=a,h=Fn(0,f-1,s*f),y=e.ctrlKey?h-c:s,v=Ae(a,y,!e.altKey);if(v){e.preventDefault(),v.scrollIntoView({block:"nearest"}),this.activeElement=v;const{offsetParent:x,offsetTop:R,offsetHeight:ee}=v;x&&x.scrollTop>=R&&(x.scrollTop-=ee)}}}handleClick(e){const{target:t}=e;if(!(t instanceof HTMLElement))return;const n=t.closest("fc-data-grid-cell");if(n&&(this.activeElement=n,n.sortable)){const i=n.colIndex;i!==this.sortIndex?this.sortIndex=i:this.order=this.order==="desc"?"asc":"desc"}}render(){return d`
      <slot name="row-header" sticky="${this.sticky}"></slot>
      <slot></slot>
    `}};A.styles=m(Vo);T([l({attribute:!1})],A.prototype,"activeElement",2);T([l({reflect:!0})],A.prototype,"grid",2);T([l({reflect:!0})],A.prototype,"outline",2);T([l({reflect:!0})],A.prototype,"role",2);T([l({reflect:!0})],A.prototype,"sticky",2);T([l({attribute:"max-rows"})],A.prototype,"maxRows",2);T([l({attribute:!1}),ye("[slot=row-header]")],A.prototype,"rowHeader",2);T([l({attribute:!1}),ye("fc-data-grid-row")],A.prototype,"rows",2);T([ye("fc-data-grid-row:not([slot])")],A.prototype,"dataRows",2);T([l({reflect:!0})],A.prototype,"sortIndex",2);T([l({reflect:!0})],A.prototype,"order",2);A=T([g("fc-data-grid")],A);var qo={parameters:{storySource:{source:`import book from './book.html?raw'

import './index'

// data-grid
export default { title: 'Data Grid ' }

export const DataGrid = () => book
`,locationsMap:{"data-grid":{startLoc:{col:24,line:8},endLoc:{col:34,line:8},startBody:{col:24,line:8},endBody:{col:34,line:8}}}}},title:"Data Grid "};const Ho=()=>To,Uo=["DataGrid"];var Go=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:qo,DataGrid:Ho,__namedExportsOrder:Uo}),Wo=`<h4>\u7B80\u5355\u4F7F\u7528</h4>
<fc-button id="btn-1">button</fc-button>
<fc-dialog anchor="#btn-1">
  <h3>\u5956\u5B66\u91D1\u7533\u8BF7 \u4E00</h3>

  <div>
    <label for="money"> \u91D1\u989D\uFF1A</label>
    <fc-input id="money" value="10000"></fc-input>
  </div>

  <div>
    <fc-radio>\u540C\u610F</fc-radio>
  </div>

  <div>
    <fc-checkbox>\u540C\u610F</fc-checkbox>
  </div>
</fc-dialog>

<h4>\u80CC\u666F\u4E0D\u53EF\u5173\u95ED</h4>
<fc-button id="btn-2">\u80CC\u666F\u4E0D\u53EF\u5173\u95ED</fc-button>
<fc-dialog anchor="#btn-2" overlay-closable="false">
  <h3>\u5956\u5B66\u91D1\u7533\u8BF7 \u4E8C</h3>

  <div>
    <label for="money"> \u91D1\u989D\uFF1A</label>
    <fc-input id="money" value="10000"></fc-input>
  </div>

  <div>
    <fc-radio>\u540C\u610F</fc-radio>
  </div>

  <div>
    <fc-checkbox>\u540C\u610F</fc-checkbox>
  </div>
</fc-dialog>

<h4>esc \u4E0D\u53EF\u5173\u95ED</h4>
<fc-button id="btn-3">esc \u4E0D\u53EF\u5173\u95ED</fc-button>
<fc-dialog anchor="#btn-3" esc-closable="false">
  <h3>\u5956\u5B66\u91D1\u7533\u8BF7 \u4E09</h3>

  <div>
    <label for="money"> \u91D1\u989D\uFF1A</label>
    <fc-input id="money" value="10000"></fc-input>
  </div>

  <div>
    <fc-radio>\u540C\u610F</fc-radio>
  </div>

  <div>
    <fc-checkbox>\u540C\u610F</fc-checkbox>
  </div>
</fc-dialog>

<h4>\u6CA1\u6709\u80CC\u666F</h4>
<fc-button id="btn-4">click me</fc-button>
<fc-dialog anchor="#btn-4" esc-closable modal="false">
  <h3>\u5956\u5B66\u91D1\u7533\u8BF7 \u56DB</h3>

  <div>
    <label for="money"> \u91D1\u989D\uFF1A</label>
    <fc-input id="money" value="10000"></fc-input>
  </div>

  <div>
    <fc-radio>\u540C\u610F</fc-radio>
  </div>

  <div>
    <fc-checkbox>\u540C\u610F</fc-checkbox>
  </div>
</fc-dialog>

<h4>\u4E0E fc-panel \u4E00\u8D77\u4F7F\u7528</h4>

<fc-button id="btn-5">click me</fc-button>
<fc-dialog anchor="#btn-5" id="dialog-5">
  <fc-panel>
    <fc-panel-header slot="panel-header" closeTarget="#dialog-5">\u5956\u5B66\u91D1\u7533\u8BF7</fc-panel-header>
    <div>
      <label for="money"> \u91D1\u989D\uFF1A</label>
      <fc-input id="money" value="10000"></fc-input>
    </div>

    <div>
      <fc-radio>\u540C\u610F</fc-radio>
    </div>

    <div>
      <fc-checkbox>\u540C\u610F</fc-checkbox>
    </div>
  </fc-panel>
</fc-dialog>
`,Yo=`:host {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  display: flex;
  overflow: auto;
  z-index: 999;

  padding: calc(var(--fc-unit-size) * 6);
}

:host([role='dialog']:focus-visible) {
  position: fixed;
}

:host([role='dialog']:focus-visible)::after {
  content: none;
}

.overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: var(--box-background);
  opacity: 0.5;
  outline: none;
}

.control {
  margin: auto;
  position: relative;
  background: var(--box-background);
  box-shadow: var(--box-shadow);
  width: fit-content;
  height: fit-content;
}
`,Xo=Object.defineProperty,Jo=Object.getOwnPropertyDescriptor,ae=(e,t,n,i)=>{for(var o=i>1?void 0:i?Jo(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&Xo(t,n,o),o};let G=class extends w{constructor(){super(...arguments);this.anchor=this.getAttribute("anchor"),this.modal=!0,this.overlayClosable=!0,this.tabindex="-1",this.escClosable=!0,this.hidden=!0,this.role="dialog",this.handleClick=e=>{const{target:t}=e,{anchor:n}=this;t instanceof HTMLElement&&n&&t.closest(n)&&(e.preventDefault(),this.hidden=!1)},this.handleKeydown=e=>{this.escClosable&&e.key==="Escape"&&e.target===this&&(e.preventDefault(),this.hidden=!0)},this.handleClickOverlay=e=>{e.preventDefault(),this.overlayClosable&&(this.hidden=!0,this.emit("dismiss"))}}connectedCallback(){super.connectedCallback(),p(this,"keydown",this.handleKeydown),p(this,"close",this.handleClose)}anchorChanged(){var t;const{anchor:e}=this;e&&((t=this.anchorElements)==null||t.forEach(n=>n.removeEventListener("click",this.handleClick)),this.anchorElements=Array.from(this.renderRoot.ownerDocument.querySelectorAll(e)),this.anchorElements.forEach(n=>n.addEventListener("click",this.handleClick)))}hiddenChanged(e,t){t||this.updateComplete.then(()=>{this.focus()}),typeof e=="boolean"&&(this.emit("change",{old:e,next:t}),this.emit("visibleChange",{old:e,next:t}))}show(){this.hidden=!1}hide(){this.hidden=!0}handleClose(e){e instanceof CustomEvent&&e.detail&&this.matches(e.detail)&&(this.hidden=!0)}render(){return d`
      ${this.modal?d`<div
            class="overlay"
            part="overlay"
            role="presentation"
            tabindex="0"
            @click="${this.handleClickOverlay}"
          ></div>`:""}
      <div class="control" part="control" role="dialog">
        <slot name="dialog-header"></slot>
        <slot></slot>
      </div>
    `}};G.styles=m(Yo);ae([l({initCallback:!0})],G.prototype,"anchor",2);ae([l({reflect:!0})],G.prototype,"modal",2);ae([l({attribute:"overlay-closable"})],G.prototype,"overlayClosable",2);ae([l({reflect:!0})],G.prototype,"tabindex",2);ae([l({attribute:"esc-closable"})],G.prototype,"escClosable",2);ae([l({reflect:!0})],G.prototype,"hidden",2);ae([l({reflect:!0})],G.prototype,"role",2);G=ae([g("fc-dialog")],G);var Qo={parameters:{storySource:{source:`import book from './book.html?raw'

import './index'

export default { title: 'Dialog', order: 1 }

export const Dialog = () => book
`,locationsMap:{dialog:{startLoc:{col:22,line:7},endLoc:{col:32,line:7},startBody:{col:22,line:7},endBody:{col:32,line:7}}}}},title:"Dialog",order:1};const Zo=()=>Wo,ei=["Dialog"];var ti=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Qo,Dialog:Zo,__namedExportsOrder:ei}),ni=`<h4>\u7B80\u5355\u4F7F\u7528</h4>
<fc-dropdown>
  <div>foo</div>
  <div>bar</div>
  <div>baz</div>
</fc-dropdown>

<h4>\u6307\u5B9A button</h4>
<fc-dropdown>
  <fc-button slot="button">dropdown</fc-button>
  <ul style="color: white; list-style: none; margin: 0; padding: 12px; width: 100px">
    <li>menu-1</li>
    <li>menu-2</li>
    <li>menu-3</li>
  </ul>
</fc-dropdown>

<h4>\u548C fc-menu \u4E00\u8D77\u4F7F\u7528</h4>
<fc-dropdown>
  <fc-menu>
    <fc-menu-item role="menuitemcheckbox">
      <span>menu-1</span>
      <fc-menu slot="submenu">
        <fc-menu-item style="--padding: 8px">
          <span slot="before">\u{1F600}</span>
          <div>menu-1-1</div>
        </fc-menu-item>
        <fc-menu-item style="--padding: 8px">
          <span slot="before">\u{1F383}</span>
          <div>menu-1-2</div>
        </fc-menu-item>
      </fc-menu>
    </fc-menu-item>
    <fc-menu-item role="menuitemcheckbox">menu-2</fc-menu-item>
    <fc-menu-item role="menuitemcheckbox">menu-3</fc-menu-item>
  </fc-menu>
</fc-dropdown>

<h4>\u548C fc-listbox \u4E00\u8D77\u4F7F\u7528</h4>
<fc-dropdown>
  <fc-listbox>
    <fc-list-option>option-1</fc-list-option>
    <fc-list-option>option-2</fc-list-option>
    <fc-list-option>option-3</fc-list-option>
  </fc-listbox>
</fc-dropdown>

<h4>\u8D85\u957F\u5217\u8868</h4>
<fc-dropdown>
  <fc-listbox>
    <fc-list-option>option-1</fc-list-option>
    <fc-list-option>option-2</fc-list-option>
    <fc-list-option>option-3</fc-list-option>
    <fc-list-option>option-4</fc-list-option>
    <fc-list-option>option-5</fc-list-option>
    <fc-list-option>option-6</fc-list-option>
    <fc-list-option>option-7</fc-list-option>
    <fc-list-option>option-8</fc-list-option>
    <fc-list-option>option-9</fc-list-option>
    <fc-list-option>option-10</fc-list-option>
    <fc-list-option>option-11</fc-list-option>
    <fc-list-option>option-12</fc-list-option>
    <fc-list-option>option-13</fc-list-option>
    <fc-list-option>option-14</fc-list-option>
    <fc-list-option>option-15</fc-list-option>
    <fc-list-option>option-16</fc-list-option>
    <fc-list-option>option-17</fc-list-option>
    <fc-list-option>option-18</fc-list-option>
    <fc-list-option>option-19</fc-list-option>
    <fc-list-option>option-20</fc-list-option>
  </fc-listbox>
</fc-dropdown>

<h4>\u5B9A\u4F4D</h4>
<fc-dropdown placement="bottom">
  <fc-button slot="button">bottom</fc-button>
  <fc-listbox>
    <fc-list-option>option-1</fc-list-option>
    <fc-list-option>option-2</fc-list-option>
    <fc-list-option>option-3</fc-list-option>
  </fc-listbox>
</fc-dropdown>

<fc-dropdown placement="top">
  <fc-button slot="button">top</fc-button>
  <fc-listbox>
    <fc-list-option>option-1</fc-list-option>
    <fc-list-option>option-2</fc-list-option>
    <fc-list-option>option-3</fc-list-option>
  </fc-listbox>
</fc-dropdown>
`,oi=`:host {
  position: relative;
  display: inline-block;
}

.button {
  font: inherit;
  display: block;
  background: var(--background);
  padding: var(--padding);
  border: none;
  color: var(--foreground);
  cursor: pointer;
}

.listbox {
  display: none;
  position: absolute;
  z-index: 9;
  /*overflow-y: auto;*/
  background: var(--box-background);
  box-shadow: var(--box-shadow);
}

:host([open]) .listbox {
  display: block;
}

.listbox slot {
  display: block;
  max-height: var(--list-max-height);
}
`,ii=Object.defineProperty,ri=Object.getOwnPropertyDescriptor,le=(e,t,n,i)=>{for(var o=i>1?void 0:i?ri(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&ii(t,n,o),o};let W=class extends w{constructor(){super(...arguments);this.disabled=!1,this.open=!1,this.placement="auto",this.placeholder="\u8BF7\u9009\u62E9",this.tabindex="0"}connectedCallback(){super.connectedCallback(),p(this,"click",this.handleClick),p(this,"keydown",this.handleKeydown),p(this,"focusout",this.handleFocusout),this.updateComplete.then(()=>{const e=this.firstAssigned;e&&!fe(e)&&Ve(e)&&(e.tabIndex=-1)})}get firstAssigned(){var t;const e=(t=this.slotElements.default)==null?void 0:t.assignedElements();return e==null?void 0:e[0]}openChanged(e,t){if(t){const{height:n,bottom:i}=this.getBoundingClientRect();this.updateComplete.then(()=>{const{firstAssigned:o}=this;if(!o||(fe(o)?o.focus({preventScroll:!0}):O(o)&&(o.setAttribute("tabindex","-1"),o.focus({preventScroll:!0})),!this.listboxNode))return;let{placement:r}=this;const{height:a}=this.slotElements.default.getBoundingClientRect();r==="auto"&&(r=i+a>window.innerHeight?"top":"bottom"),r=="top"?this.listboxNode.style.marginTop=`${-1*(n+a)}px`:this.listboxNode.style.marginTop=""})}this.emit("change",{old:e,next:t})}handleClick(e){e.preventDefault(),this.open=!this.disabled}handleKeydown(e){switch(e.key){case"Enter":this.click();break;case"Escape":{const{firstAssigned:t}=this;O(t)?t.blur():this.blur();break}case" ":case"ArrowDown":!this.open&&!this.disabled&&(e.preventDefault(),this.open=!0);break}}handleFocusout(e){const{relatedTarget:t}=e;O(t)&&this.contains(t)||(this.open=!1)}render(){return d`
      ${$()}
      <slot name="button" aria-haspopup="listbox" aria-expanded="${this.open}">
        <button class="button" part="button" role="button">${this.placeholder}</button>
      </slot>

      <div
        class="listbox fc-inner-outline"
        part="listbox"
        tabindex="0"
        role="listbox"
        aria-label="${this.placeholder}"
        aria-hidden="${!this.open}"
      >
        <slot></slot>
      </div>
      ${E()}
    `}};W.styles=m(oi);le([l({reflect:!0})],W.prototype,"disabled",2);le([it(".listbox",!0)],W.prototype,"listboxNode",2);le([l({reflect:!0})],W.prototype,"open",2);le([l({reflect:!0})],W.prototype,"placement",2);le([l()],W.prototype,"placeholder",2);le([l({reflect:!0,converter(e,t){return t.listButton?null:e}})],W.prototype,"tabindex",2);le([it('[slot="button"]')],W.prototype,"listButton",2);W=le([g("fc-dropdown")],W);var ai={parameters:{storySource:{source:`import book from './book.html?raw'

import './index'

// dropdown
export default { title: 'Dropdown' }

export const Dropdown = () => book
`,locationsMap:{dropdown:{startLoc:{col:24,line:8},endLoc:{col:34,line:8},startBody:{col:24,line:8},endBody:{col:34,line:8}}}}},title:"Dropdown"};const li=()=>ni,ci=["Dropdown"];var si=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:ai,Dropdown:li,__namedExportsOrder:ci}),di=`<fc-icon>\u{1F697}</fc-icon>
`,fi=`:host {
  display: inline-block;
  width: var(--font-size);
  height: var(--font-size);
  fill: var(--foreground);
  position: relative;
}

::slotted(*) {
  width: 100%;
  height: 100%;
  fill: inherit;
}
`,pi=Object.defineProperty,hi=Object.getOwnPropertyDescriptor,ui=(e,t,n,i)=>{for(var o=i>1?void 0:i?hi(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&pi(t,n,o),o};let ct=class extends w{render(){return d`<slot part="control"></slot>`}};ct.styles=m(fi);ct=ui([g("fc-icon")],ct);var bi={parameters:{storySource:{source:`import book from './book.html?raw'

import './index'

export default { title: 'Icon', order: 4 }

export const Icon = () => book
`,locationsMap:{icon:{startLoc:{col:20,line:7},endLoc:{col:30,line:7},startBody:{col:20,line:7},endBody:{col:30,line:7}}}}},title:"Icon",order:4};const gi=()=>di,mi=["Icon"];var vi=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:bi,Icon:gi,__namedExportsOrder:mi}),yi=`<h4>\u7B80\u5355\u4F7F\u7528</h4>
<fc-input></fc-input>

<h4>\u76F4\u89D2</h4>
<fc-input sharp></fc-input>

<h4>\u5E26\u8FB9\u6846</h4>
<fc-input outline placeholder="outline"></fc-input>

<h4>\u5360\u4F4D\u7B26</h4>
<fc-input placeholder="placeholder"></fc-input>

<h4>disabled</h4>
<fc-input disabled placeholder="disabled"></fc-input>

<h4>\u6307\u5B9A type \u5C5E\u6027</h4>
<fc-input type="number" placeholder="type: number"></fc-input>

<h4>before</h4>
<fc-input><span slot="before">\u{1F697}</span></fc-input>

<h4>after</h4>
<fc-input><span slot="after">\u{1F69C}</span></fc-input>

<h4>\u5E26 label</h4>
<fc-input label="foo">foo</fc-input>
<fc-input>
  <span slot="label">bar</span>
  <span>bar</span>
</fc-input>

<h4>label \u4E0E input \u5782\u76F4\u5C55\u793A</h4>
<fc-input label="foo" orientation="vertical">foo</fc-input>
<fc-input orientation="vertical">
  <span slot="label">bar</span>
  <span>bar</span>
</fc-input>

<h4>\u4E0E form \u4E00\u8D77\u4F7F\u7528</h4>
<form action="#">
  <fc-input required name="foo"></fc-input>
  <fc-input required name="bar" type="file"></fc-input>
  <input type="submit" />
</form>
`,qt=`:host {
  position: relative;
  display: inline-flex;
  color: var(--foreground);
  transition: all 0.14s;
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  box-sizing: border-box;
  min-width: var(--control-min-width);
}

:host(:focus-visible)::after {
  content: none;
}

.control {
  position: relative;
  display: inline-flex;
  border-radius: var(--border-radius);
  border: var(--border-width) solid transparent;
  padding: var(--padding-t) var(--padding-r) var(--padding-b) var(--padding-l);
  background-color: var(--background);
  transition: all 0.05s;
  width: 100%;
  box-sizing: border-box;
  /*min-width: inherit;*/
}

.control[focused]::after {
  content: '';
}

:host([type='file']) .control {
  cursor: pointer;
}

:host([sharp]) {
  --border-radius: 0;
}

:host([orientation='horizontal']) ::slotted([slot='label']),
:host([orientation='horizontal']) .label {
  margin-right: calc(var(--font-size) / 2);
}

:host([orientation='vertical']) {
  flex-direction: column;
}

::slotted([slot='form-associated-proxy']) {
  font: inherit;
  border-radius: inherit;
  padding: 0;
  width: 100%;
  min-width: auto;
  height: 100%;
  color: inherit;
  background-color: transparent;
  border: none;
  outline: none;
  caret-color: var(--caret);
}

:host(:not([disabled]):hover) .control {
  background-color: var(--background-hover);
}

:host(:not([disabled]):focus-visible) .control {
  background-color: var(--background-active);
}

:host([disabled]) .control {
  background: var(--background-disabled);
  color: var(--foreground-disabled);
  cursor: not-allowed;
}
:host([outline][disabled]) .control {
  border-color: var(--border-color-disabled);
}

/*outline*/
:host([outline]) .control {
  border-color: var(--border-color);
}

:host([outline]:focus-within) .control,
:host([outline]:focus-visible) .control {
  border-color: var(--border-color-active);
}
:host([outline]:hover) .control {
  border-color: var(--border-color-hover);
}

slot[has-value='false'] {
  color: var(--foreground-disabled);
}

:host([type='file']) ::slotted([slot='form-associated-proxy']) {
  position: absolute;
  opacity: 0;
  pointer-events: none;
  /*z-index: -1;*/
}

.control:focus-within::after {
  content: '';
}
`,xi=Object.defineProperty,wi=Object.getOwnPropertyDescriptor,b=(e,t,n,i)=>{for(var o=i>1?void 0:i?wi(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&xi(t,n,o),o},Ht=(e,t,n)=>{if(!t.has(e))throw TypeError("Cannot "+n)},ki=(e,t,n)=>(Ht(e,t,"read from private field"),n?n.call(e):t.get(e)),Ci=(e,t,n)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,n)},Ut=(e,t,n,i)=>(Ht(e,t,"write to private field"),i?i.call(e,n):t.set(e,n),n),Ie;let u=class extends K{constructor(){super(...arguments);this.accept="",this.outline=!1,this.type="text",this.name="",this.autofocus=!1,this.checked=!1,this.disabled=!1,this.orientation="horizontal",this.multiple=!1,this.readonly=!1,this.src="",this.tabIndex=0,Ci(this,Ie,!1)}get shadowInput(){return this.proxy instanceof HTMLInputElement?this.proxy:null}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),["type","name","value","placeholder","autofocus","checked","disabled","form","formaction","formtarget","formnovalidate","height","list","max","maxlength","min","minlength","pattern","readonly","required","src","step","width","inputMode"].includes(e)&&(n?this.proxy.setAttribute(e,n):this.proxy.removeAttribute(e))}connectedCallback(){super.connectedCallback(),p(this,"focusin",this.handleFocusin),p(this,"focusout",this.handleFocusout),p(this,"click",this.handleClick),p(this,"keydown",this.handleKeyDown),this.attachProxy(),this.proxy.style.cssText="",this.autofocus&&!document.activeElement&&this.focus()}acceptChanged(e,t){this.proxy instanceof HTMLInputElement&&(this.proxy.accept=t)}blur(){var e;(e=this.shadowInput)==null||e.blur(),this.$emit("blur",{bubbles:!1,composed:!0})}typeChanged(e,t){this.proxy instanceof HTMLInputElement&&(this.proxy.type=t),t==="file"?this.placeholder="\u8BF7\u9009\u62E9\u6587\u4EF6":["number","text"].includes(t)&&(this.placeholder="\u8BF7\u8F93\u5165")}get files(){if(this.proxy instanceof HTMLInputElement)return this.proxy.files}multipleChanged(e,t){this.proxy instanceof HTMLInputElement&&(this.proxy.multiple=t)}readonlyChanged(){this.classList.toggle("read-only",this.readonly)}valueChanged(e,t){super.valueChanged(e,t),this.emit("change",{old:e,next:t})}handleFocusin(e){var t;(t=this.shadowInput)==null||t.focus(),Ut(this,Ie,!0),this.requestUpdate()}handleFocusout(e){var t;(t=this.shadowInput)==null||t.blur(),Ut(this,Ie,!1),this.requestUpdate()}handleClick(e){this.proxy&&this.proxy.click()}handleKeyDown(e){["Enter"," "].includes(e.key)&&this.click()}render(){return d`
      <slot name="label">${this.label?d`<span class="label">${this.label}</span`:null}</slot>
      <div class="control fc-focusin-outline" part="control" focused="${ki(this,Ie)}">
        ${$()}
        ${this.type==="file"?d`<slot has-value="${!!this.value}">${this.value||this.placeholder}</slot>`:d`<slot name="form-associated-proxy"></slot>`}
        ${E()}
      </div>
    `}};Ie=new WeakMap;u.styles=m(qt);b([l({reflect:!0})],u.prototype,"accept",2);b([l()],u.prototype,"outline",2);b([l()],u.prototype,"type",2);b([l()],u.prototype,"name",2);b([l()],u.prototype,"placeholder",2);b([l()],u.prototype,"autofocus",2);b([l()],u.prototype,"checked",2);b([l()],u.prototype,"disabled",2);b([l()],u.prototype,"formaction",2);b([l()],u.prototype,"formenctype",2);b([l()],u.prototype,"formmethod",2);b([l()],u.prototype,"formnovalidate",2);b([l()],u.prototype,"formtarget",2);b([l()],u.prototype,"height",2);b([l({type:"string"})],u.prototype,"label",2);b([l({reflect:!0})],u.prototype,"orientation",2);b([l()],u.prototype,"list",2);b([l()],u.prototype,"max",2);b([l()],u.prototype,"maxlength",2);b([l()],u.prototype,"min",2);b([l()],u.prototype,"minlength",2);b([l()],u.prototype,"multiple",2);b([l()],u.prototype,"pattern",2);b([l()],u.prototype,"readonly",2);b([l()],u.prototype,"src",2);b([l()],u.prototype,"step",2);b([l({reflect:!0})],u.prototype,"tabIndex",2);b([l()],u.prototype,"width",2);u=b([g("fc-input")],u);var _i={parameters:{storySource:{source:`import book from './book.html?raw'

import './index'

export default { title: 'Input', order: 2 }

export const Input = () => book
`,locationsMap:{input:{startLoc:{col:21,line:7},endLoc:{col:31,line:7},startBody:{col:21,line:7},endBody:{col:31,line:7}}}}},title:"Input",order:2};const Oi=()=>yi,$i=["Input"];var Ei=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:_i,Input:Oi,__namedExportsOrder:$i}),Ai=`<h4>\u7B80\u5355\u4F7F\u7528</h4>
<fc-link href="#">fc-component</fc-link>

<h4>\u7981\u7528</h4>
<fc-link href="#" disabled>fc-component</fc-link>

<h4>\u5916\u89C2</h4>
<fc-link appearance="button" href="https://twitter.com">\u6309\u94AE\u6837\u5F0F</fc-link>
<fc-link appearance="text" href="https://www.google.com/">\u6587\u672C\u6837\u5F0F</fc-link>

<h4>\u4E0B\u8F7D</h4>
<p>
  \u8FD9\u662F
  <fc-link appearance="text" href="/?path=/story/select--select" download="select.html">fc-select</fc-link>
  \u7684\u4E0B\u8F7D\u5730\u5740
</p>

<p>\u8FD9\u662F\u4E2A\u6CA1\u6709[href]\u5C5E\u6027\u7684 <fc-link appearance="text">fc-link</fc-link></p>
`,Ii=`:host {
  display: inline-flex;
  vertical-align: bottom;
  cursor: pointer;
  color: var(--foreground);
  border-radius: var(--border-radius);
  background: var(--background);
  padding: var(--padding-t, 0) var(--padding-r, 0) var(--padding-b, 0) var(--padding-l, 0);
  border: 1px solid transparent;
}

:host .control {
  text-decoration: none;
  user-select: auto;
  font-size: inherit;
}

:host([appearance='text']),
:host([appearance='text']:hover) {
  font: inherit;
  padding: 0;
  background: none;
  border: none;
}

:host([href][appearance='text']:focus-visible),
:host([href][appearance='text']),
:host([href][appearance='text']:hover) {
  text-decoration: underline;
}

:host(:not([href])) {
  text-decoration: none;
  cursor: auto;
}

.control {
  flex: 1;
  background: none;
  outline: none;
  border: none;
  display: inline-flex;
  justify-self: space-between;
  word-break: keep-all;
  white-space: nowrap;
  line-height: var(--line-height);
  /*user-select: none;*/
  padding: 0;
}

.before,
.aftter {
  flex-grow: 0;
}

:host([appearance='button']) .control {
  justify-content: center;
}

:host([appearance='button']:hover) {
  background: var(--background-hover);
}

:host([appearance='button']:active) {
  background: var(--background-active);
}

.control:focus {
  text-decoration: underline !important;
}
`,Si=Object.defineProperty,zi=Object.getOwnPropertyDescriptor,D=(e,t,n,i)=>{for(var o=i>1?void 0:i?zi(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&Si(t,n,o),o};let I=class extends w{constructor(){super(...arguments);this.appearance="button",this.download="",this.href="",this.hreflang="",this.ping="",this.ref="",this.role="link",this.target="",this.tabindex="0",this.type=""}connectedCallback(){super.connectedCallback(),p(this,"click",this.handleClick),p(this,"keydown",this.handleKeydown)}downloadChanged(e,t){this.control&&ot(this.control,"download",t,!1)}hrefChanged(e,t){this.control&&ot(this.control,"href",t,!1)}handleClick(e){this.shadowAnchor&&this.shadowAnchor.click()}handleKeydown(e){e.key==="Enter"&&this.click()}render(){return d`<a
      class="control"
      part="control"
      tabindex="-1"
      .download="${this.download}"
      .href="${bn(this.href)}"
      .hreflang="${this.hreflang}"
      .ping="${this.ping}"
      .ref="${this.ref}"
      .target="${this.target}"
      .type="${this.type}"
      class="control"
      part="control"
      part="control"
    >
      ${$()}
      <span part="content"><slot></slot></span>
      ${E()}
    </a>`}};I.styles=m(Ii);D([l({reflect:!0})],I.prototype,"appearance",2);D([l({reflect:!0,initCallback:!0})],I.prototype,"download",2);D([l({reflect:!0,initCallback:!0})],I.prototype,"href",2);D([l()],I.prototype,"hreflang",2);D([l()],I.prototype,"ping",2);D([l()],I.prototype,"ref",2);D([l({reflect:!0})],I.prototype,"role",2);D([l()],I.prototype,"target",2);D([l({reflect:!0})],I.prototype,"tabindex",2);D([l()],I.prototype,"type",2);D([it("a",!0)],I.prototype,"shadowAnchor",2);I=D([g("fc-link")],I);var Pi={parameters:{storySource:{source:`import book from './book.html?raw'

import './index'

export default { title: 'Link', order: 7 }

export const Link = () => book
`,locationsMap:{link:{startLoc:{col:20,line:7},endLoc:{col:30,line:7},startBody:{col:20,line:7},endBody:{col:30,line:7}}}}},title:"Link",order:7};const Li=()=>Ai,Ti=["Link"];var Di=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Pi,Link:Li,__namedExportsOrder:Ti}),Mi=`<h4>\u7B80\u5355\u4F7F\u7528</h4>
<fc-list-option>\u82F9\u679C</fc-list-option>

<h4>\u8BBE\u7F6E value</h4>
<fc-list-option value="foo">foo</fc-list-option>
<fc-list-option value="bar"></fc-list-option>

<h4>\u9ED8\u8BA4\u9009\u4E2D</h4>
<fc-list-option selected>\u82F9\u679C</fc-list-option>

<h4>\u7981\u7528</h4>
<fc-list-option disabled>\u82F9\u679C</fc-list-option>
<fc-list-option selected disabled>\u82F9\u679C</fc-list-option>

<h4>\u4E0D\u53EF\u89C1</h4>
<fc-list-option>\u82F9\u679C</fc-list-option>
<fc-list-option hidden>\u6A58\u5B50</fc-list-option>

<p>\u6A58\u5B50\u88AB\u9690\u85CF\u4E86</p>
`,ji={parameters:{storySource:{source:`import book from './book.html?raw'

import './index'

export default { title: 'List Option', order: 1 }

export const ListOption = () => book
`,locationsMap:{"list-option":{startLoc:{col:26,line:7},endLoc:{col:36,line:7},startBody:{col:26,line:7},endBody:{col:36,line:7}}}}},title:"List Option",order:1};const Bi=()=>Mi,Ri=["ListOption"];var Fi=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:ji,ListOption:Bi,__namedExportsOrder:Ri}),Vi=`<h4>\u6B63\u5E38\u4F7F\u7528</h4>
<fc-listbox>
  <fc-list-option value="apple">\u82F9\u679C</fc-list-option>
  <fc-list-option value="banana">\u9999\u8549</fc-list-option>
  <fc-list-option value="orange">\u6A58\u5B50</fc-list-option>
  <fc-list-option value="pear">\u674E\u5B50</fc-list-option>
</fc-listbox>

<h4>\u9ED8\u8BA4\u503C</h4>
<p>\u8BD5\u8BD5\u7528 <kbd>\u2191</kbd> <kbd>\u2193</kbd> \u952E\u53BB\u9009\u62E9</p>
<fc-listbox value="banana">
  <fc-list-option value="">\u8BF7\u9009\u62E9</fc-list-option>
  <fc-list-option value="apple">\u82F9\u679C</fc-list-option>
  <fc-list-option value="banana">\u9999\u8549</fc-list-option>
  <fc-list-option value="orange">\u6A58\u5B50</fc-list-option>
  <fc-list-option value="pear">\u674E\u5B50</fc-list-option>
</fc-listbox>

<h4>\u5305\u62EC\u4E0D\u53EF\u7528\u9009\u9879</h4>
<fc-listbox>
  <fc-list-option>\u82F9\u679C</fc-list-option>
  <fc-list-option>\u9999\u8549</fc-list-option>
  <fc-list-option disabled>\u6A58\u5B50</fc-list-option>
  <fc-list-option>\u674E\u5B50</fc-list-option>
</fc-listbox>

<h4>\u4E0D\u53EF\u9009</h4>
<fc-listbox selectable="false" value="banana">
  <fc-list-option value="">\u8BF7\u9009\u62E9</fc-list-option>
  <fc-list-option value="apple">\u82F9\u679C</fc-list-option>
  <fc-list-option value="banana">\u9999\u8549</fc-list-option>
  <fc-list-option value="orange">\u6A58\u5B50</fc-list-option>
  <fc-list-option value="pear">\u674E\u5B50</fc-list-option>
</fc-listbox>

<h4>\u7981\u7528</h4>
<fc-listbox disabled value="banana">
  <fc-list-option value="">\u8BF7\u9009\u62E9</fc-list-option>
  <fc-list-option value="apple">\u82F9\u679C</fc-list-option>
  <fc-list-option value="banana">\u9999\u8549</fc-list-option>
  <fc-list-option value="orange">\u6A58\u5B50</fc-list-option>
  <fc-list-option value="pear">\u674E\u5B50</fc-list-option>
</fc-listbox>

<h4>\u9690\u85CF\u9879</h4>
<fc-listbox>
  <fc-list-option>\u82F9\u679C</fc-list-option>
  <fc-list-option>\u9999\u8549</fc-list-option>
  <fc-list-option>\u6A58\u5B50</fc-list-option>
  <fc-list-option hidden>\u9F99\u773C</fc-list-option>
  <fc-list-option hidden>\u83E0\u841D</fc-list-option>
  <fc-list-option hidden>\u8354\u679D</fc-list-option>
  <fc-list-option>\u674E\u5B50</fc-list-option>
</fc-listbox>
<p>\u6709\u51E0\u4E2A\u70ED\u5E26\u6C34\u679C\u88AB\u96EA\u85CF\u4E86</p>

<h4>\u952E\u5165\u4EE5\u5B9A\u4F4D</h4>
<p>\u70B9\u51FB\u8FD9\u91CC\uFF0C\u7136\u540E\u6309 <kbd>Tab</kbd> \u8BA9\u4E0B\u9762\u7684 listbox \u83B7\u53D6\u7126\u70B9\uFF0C\u7136\u540E\u6309\u4E0B <kbd>f</kbd>\uFF0C\u6216\u6309\u4E24\u4E0B<kbd>b</kbd> \u952E</p>
<fc-listbox>
  <fc-list-option>Foo</fc-list-option>
  <fc-list-option>Bar</fc-list-option>
  <fc-list-option>Baz</fc-list-option>
</fc-listbox>
`,Ni={parameters:{storySource:{source:`import book from './book.html?raw'
import './index'

export default { title: 'Listbox', order: 5 }

export const Listbox = () => book
`,locationsMap:{listbox:{startLoc:{col:23,line:6},endLoc:{col:33,line:6},startBody:{col:23,line:6},endBody:{col:33,line:6}}}}},title:"Listbox",order:5};const Ki=()=>Vi,qi=["Listbox"];var Hi=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Ni,Listbox:Ki,__namedExportsOrder:qi}),Ui=`<h4>\u7B80\u5355\u4F7F\u7528</h4>
<fc-menu-item>\u70E7\u997C</fc-menu-item>

<h4>\u4E0D\u53EF\u7528\uFF08disabled\uFF09</h4>
<fc-menu-item disabled>\u70E7\u997C</fc-menu-item>

<h4>before/after</h4>
<fc-menu-item>
  <span slot="before">\u{1F96E}</span>
  \u6708\u997C
</fc-menu-item>

<br />

<fc-menu-item>
  <span slot="after">\uFFE510</span>
  \u6708\u997C
</fc-menu-item>

<br />

<fc-menu-item>
  <span slot="before">\u5E7F\u5F0F</span>
  \u6708\u997C
  <span slot="after">\uFFE510</span>
</fc-menu-item>

<h4>checkbox</h4>
<fc-menu-item role="menuitemcheckbox">\u540C\u610F</fc-menu-item>

<h4>radio</h4>
<fc-menu-item role="menuitemradio">\u540C\u610F</fc-menu-item>

<h4>\u94FE\u63A5</h4>
<fc-menu-item href="#menu-item">\u94FE\u63A5 <span slot="after">\u70B9\u51FB\u8DF3\u8F6C</span></fc-menu-item>

<h4>\u5B50\u83DC\u5355</h4>
<fc-menu-item style="display: inline-flex">
  <span>\u6C34\u679C</span>
  <fc-menu slot="submenu">
    <fc-menu-item>\u82F9\u679C</fc-menu-item>
    <fc-menu-item>\u9999\u8549</fc-menu-item>
  </fc-menu>
</fc-menu-item>

<p>\u9ED8\u8BA4\u5C55\u5F00</p>
<fc-menu-item expanded style="display: inline-flex">
  <span>\u6C34\u679C</span>
  <fc-menu slot="submenu">
    <fc-menu-item>\u82F9\u679C</fc-menu-item>
    <fc-menu-item>\u9999\u8549</fc-menu-item>
  </fc-menu>
</fc-menu-item>

<br />
<br />
`,Gt=`:host {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  outline: none;
}

:host(:disabled) {
  background: none;
  cursor: auto;
}

.radio.control {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: var(--font-size);
  height: var(--font-size);
  background: var(--background);
  border-radius: 50%;
  box-shadow: inset var(--stroke);
  user-select: none;
}
:host(:focus-visible)::after {
  content: none;
}

:host(:focus-visible) .radio.control:after {
  border-radius: 50%;
}

.radio .checked-indicator {
  visibility: hidden;
  width: 50%;
  height: 50%;
  border-radius: 50%;
  background: var(--box-background);
}

.label {
  margin-left: calc(var(--font-size) / 2);
  cursor: pointer;
}

:host([checked]) .control {
  background: var(--accent-color);
  box-shadow: none;
}

:host([checked]) .checked-indicator {
  visibility: visible;
}

:host([disabled]) .control {
  background-color: var(--background-disabled);
  cursor: not-allowed;
}

:host([disabled]) .label {
  color: var(--foreground-disabled);
  cursor: not-allowed;
}
:host([checked][disabled]) .control {
  background-color: var(--accent-color-disabled);
}
:host([disabled]) .checked-indicator {
  background-color: var(--box-background);
}

:host(.readonly),
:host(.readonly) .control,
:host(.readonly) .label {
  cursor: auto;
}
`,Gi=`:host {
  position: relative;
  display: flex;
  padding: var(--padding);
  color: var(--foreground);
  background: var(--box-background);
  --outline-offset: 0px;
}

:host([disabled]) {
  --foreground: var(--foreground-disabled);
  color: var(--foreground-disabled);
  /*background: var(--background);*/
  cursor: not-allowed;
}

:host(:not([disabled]):hover),
:host(:not([disabled]):focus-visible),
:host([expanded]) {
  background: var(--background-hover);
}

:host([role='menuitem']:not([disabled])) > .content:active {
  background: var(--background-active);
}

/*
:host([role='menuitem']:not([disabled]):active),
:host(:not([disabled])[checked]) {
  background: var(--background-active);
}*/

:host ::slotted([slot='after']) {
  margin-left: auto;
}

:host ::slotted([slot='before']) {
  margin-right: calc(var(--fc-unit-size) * 6);
}

::slotted([slot='after']),
::slotted([slot='before']) {
  color: var(--foreground-secondary);
}

.input-container {
  display: inline-flex;
  align-items: center;
  margin-inline-end: calc(var(--font-size) / 2);
}

.content {
  flex: 1;
  width: 100%;
  height: 100%;
  color: var(--foreground);
  outline: none;
  margin-right: var(--font-size);
  text-decoration: none;
}

.submenu {
  position: absolute;
  top: 0;
  left: calc(100% - var(--padding-l));
  width: 100%;
  height: 100%;
  z-index: 2;
}

.fc-inner-outline {
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
`,Wi=Object.defineProperty,Yi=Object.getOwnPropertyDescriptor,ce=(e,t,n,i)=>{for(var o=i>1?void 0:i?Yi(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&Wi(t,n,o),o};const Xi=["menuitemradio","menuitemcheckbox"],se=e=>e instanceof _||e instanceof Element&&e.nodeName.toLowerCase()==="fc-menu-item";let _=class extends w{constructor(){super(...arguments);var e,t;this.checked=!1,this.disabled=!1,this.expanded=this.hasAttribute("expanded"),this.role=(e=this.getAttribute("role"))!=null?e:"menuitem",this.tabindex=(t=this.getAttribute("tabindex"))!=null?t:"-1"}connectedCallback(){super.connectedCallback(),p(this,"click",this.handleClick)}get isInputRole(){return Xi.includes(this.role)}checkedChanged(e,t){if(this.isInputRole){if(this.disabled)return;this.toggleAttribute("aria-checked",t),this.toggleAttribute("checked",t),typeof e=="boolean"&&this.emit("change")}else this.removeAttribute("aria-checked")}expandedChanged(e,t){this.setAttribute("aria-expanded",t.toString())}handleClick(e){e.target===this&&(this.checked=!this.disabled&&this.isInputRole&&(this.role==="menuitemradio"||!this.checked))}render(){var e;return d`
      ${$()}
      ${this.isInputRole?d`<span class="input-container" ?checkable="${this.isInputRole}">
            ${this.role==="menuitemradio"?d`<slot name="radio-indicator">
                  <div class="radio control" part="control">
                    <div class="checked-indicator"></div>
                  </div>
                </slot>`:null}
            ${this.role==="menuitemcheckbox"?d`<slot name="checkbox-indicator">
                  <div class="checkbox control" part="control">
                    <slot name="default-indicator">
                      <div class="default-indicator"></div>
                    </slot>
                    <slot name="checked-indicator">
                      <svg
                        class="checked-indicator"
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill-rule="evenodd"
                        xmlns:v="https://vecta.io/nano"
                      >
                        <path d="M3.586 8.353l5.657-5.657 1.414 1.414L5 9.767z" />
                        <path d="M2.879 4.817l3.536 3.536L5 9.767 1.464 6.231z" />
                      </svg>
                    </slot>
                    <slot name="indeterminate-indicator">
                      <div class="indeterminate-indicator"></div>
                    </slot>
                  </div>
                </slot> `:null}
          </span>`:null}
      ${typeof this.href=="string"?d`<a href="${this.href}" class="content" part="content"><slot></slot></a>`:d`<span class="content" part="content" tabindex="-1"><slot></slot></span>`}
      ${((e=this.submenu)==null?void 0:e.length)?d`<slot name="expand"
            ><svg class="arrow-right" viewBox="0 0 12 12" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
              <path d="m9 6-6 5.5V.5z" fill-rule="evenodd" /></svg
          ></slot>`:null}
      ${E()} ${this.expanded?d`<div class="submenu" part="submenu"><slot name="submenu"></slot></div>`:null}
      <span class="fc-inner-outline"></span>
    `}};_.styles=m(Gt,Vt,Gi);ce([l({type:"boolean",hasChanged(e,t,n){return!n.disabled}})],_.prototype,"checked",2);ce([l()],_.prototype,"disabled",2);ce([l({type:"string",reflect:!0})],_.prototype,"href",2);ce([l({reflect:!0,hasChanged(e,t,n){return e!==void 0&&!n.disabled}})],_.prototype,"expanded",2);ce([l({reflect:!0})],_.prototype,"role",2);ce([l({attribute:!1}),ye('[slot="submenu"]')],_.prototype,"submenu",2);ce([l({reflect:!0})],_.prototype,"tabindex",2);_=ce([g("fc-menu-item")],_);var Ji={parameters:{storySource:{source:`import book from './book.html?raw'

import './index'

// menu-item
export default { title: 'Menu Item' }

export const MenuItem = () => book
`,locationsMap:{"menu-item":{startLoc:{col:24,line:8},endLoc:{col:34,line:8},startBody:{col:24,line:8},endBody:{col:34,line:8}}}}},title:"Menu Item"};const Qi=()=>Ui,Zi=["MenuItem"];var er=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Ji,MenuItem:Qi,__namedExportsOrder:Zi}),tr=`<h4>\u7B80\u5355\u4F7F\u7528</h4>
<fc-menu>
  <fc-menu-item>\u82F9\u679C</fc-menu-item>
  <fc-menu-item>\u9999\u8549</fc-menu-item>
  <fc-menu-item>\u6A58\u5B50</fc-menu-item>
  <fc-menu-item>\u68A8</fc-menu-item>
</fc-menu>

<h4>\u7981\u7528\u9009\u9879</h4>
<fc-menu>
  <fc-menu-item>\u82F9\u679C</fc-menu-item>
  <fc-menu-item>\u9999\u8549</fc-menu-item>
  <fc-menu-item disabled>\u6A58\u5B50</fc-menu-item>
  <fc-menu-item>\u68A8</fc-menu-item>
</fc-menu>

<h4>\u5206\u5272\u7EBF</h4>
<fc-menu>
  <fc-menu-item>\u897F\u7EA2\u67FF</fc-menu-item>
  <fc-menu-item>\u9EC4\u74DC</fc-menu-item>
  <fc-divider></fc-divider>
  <fc-menu-item>\u82F9\u679C</fc-menu-item>
  <fc-menu-item>\u9999\u8549</fc-menu-item>
</fc-menu>

<h4>\u4F7F\u7528\u4E0D\u540C\u7684 role/\u5143\u7D20</h4>
<fc-menu>
  <fc-menu-item role="menuitemcheckbox">\u82F9\u679C</fc-menu-item>
  <fc-menu-item role="menuitemcheckbox">\u9999\u8549</fc-menu-item>
  <fc-menu-item role="menuitemcheckbox" disabled>\u6A58\u5B50</fc-menu-item>
  <fc-menu-item role="menuitemcheckbox">\u68A8</fc-menu-item>
</fc-menu>

<fc-menu>
  <fc-menu-item role="menuitemradio">\u82F9\u679C</fc-menu-item>
  <fc-menu-item role="menuitemradio">\u9999\u8549</fc-menu-item>
  <fc-menu-item role="menuitemradio" disabled>\u6A58\u5B50</fc-menu-item>
  <fc-menu-item role="menuitemradio">\u68A8</fc-menu-item>
</fc-menu>

<fc-menu>
  <fc-menu-item role="menuitem" disabled>\u51CF\u80A5\u5BA3\u8A00</fc-menu-item>
  <fc-menu-item role="menuitemradio">\u5C11\u5403</fc-menu-item>
  <fc-menu-item role="menuitemradio">\u591A\u8FD0\u52A8</fc-menu-item>
  <fc-menu-item role="menuitemcheckbox">\u540C\u610F</fc-menu-item>
</fc-menu>

<fc-menu>
  <div>\u6211\u662F div</div>
  <fc-divider></fc-divider>
  <fc-link href="http://www.google.com/">\u6211\u7684 link</fc-link>
  <fc-divider></fc-divider>
  <fc-button>\u6211\u662F\u6309\u94AE</fc-button>
</fc-menu>

<h4>\u9ED8\u8BA4\u9009\u4E2D</h4>
<fc-menu>
  <fc-menu-item role="menuitem" disabled>\u4F7F\u7528\u6761\u6B3E</fc-menu-item>
  <fc-divider></fc-divider>
  <fc-menu-item checked role="menuitemcheckbox">\u4F60\u7684\u5C31\u662F\u6211\u7684</fc-menu-item>
  <fc-menu-item checked role="menuitemcheckbox">\u6211\u7684\u8FD8\u662F\u6211\u7684</fc-menu-item>
  <fc-menu-item role="menuitemcheckbox">\u540C\u610F</fc-menu-item>
</fc-menu>

<h4>before/after</h4>
<fc-menu>
  <fc-menu-item role="menuitemcheckbox"><span slot="before">\u{1F34E}</span>\u82F9\u679C<span slot="after">\uFFE55.00</span></fc-menu-item>
  <fc-menu-item role="menuitemcheckbox"><span slot="before">\u{1F34C}</span>\u9999\u8549<span slot="after">\uFFE56.00</span></fc-menu-item>
  <fc-menu-item role="menuitemcheckbox" disabled
    ><span slot="before">\u{1F34A}</span>\u6A58\u5B50<span slot="after">\u65E0\u8D27</span></fc-menu-item
  >
  <fc-menu-item role="menuitemcheckbox"><span slot="before">\u{1F350}</span>\u68A8<span slot="after">\uFFE54.00</span></fc-menu-item>
</fc-menu>

<h4>\u5B50\u83DC\u5355</h4>
<fc-menu>
  <fc-menu-item>
    <span>\u6C34\u679C</span>
    <fc-menu slot="submenu">
      <fc-menu-item role="menuitemcheckbox">\u82F9\u679C</fc-menu-item>
      <fc-menu-item>
        <span>\u9999\u8549</span>
        <fc-menu slot="submenu">
          <fc-menu-item role="menuitemradio">\u56FD\u4EA7</fc-menu-item>
          <fc-menu-item role="menuitemradio">\u8FDB\u53E3</fc-menu-item>
        </fc-menu>
      </fc-menu-item>
    </fc-menu>
  </fc-menu-item>
  <fc-menu-item>
    <span>\u852C\u83DC</span>
    <fc-menu slot="submenu">
      <fc-menu-item>\u8304\u5B50</fc-menu-item>
      <fc-menu-item>\u8C46\u89D2</fc-menu-item>
    </fc-menu>
  </fc-menu-item>
  <fc-menu-item>
    <span>\u5E72\u679C</span>
    <fc-menu slot="submenu">
      <fc-menu-item>\u82B1\u751F</fc-menu-item>
      <fc-menu-item>\u74DC\u5B50</fc-menu-item>
    </fc-menu>
  </fc-menu-item>

  <fc-menu-item><span slot="after">\u65E0\u8D27</span>\u836F\u54C1</fc-menu-item>
</fc-menu>
<br />
<br />

<h4>\u63A7\u5236\u9F20\u6807\u201C\u60AC\u505C\u201D\u5C55\u5F00\u5B50\u83DC\u5355\u7684\u5EF6\u8FDF\u65F6\u95F4(700ms)</h4>
<p>\u6CE8\u610F\uFF1A\u5728\u5EF6\u8FDF\u4E4B\u524D\u70B9\u51FB\u53EF\u4EE5\u76F4\u63A5\u5C55\u5F00</p>
<fc-menu mouseenterDelay="700">
  <fc-menu-item>
    <span>\u6C34\u679C</span>
    <fc-menu slot="submenu">
      <fc-menu-item role="menuitemcheckbox">\u82F9\u679C</fc-menu-item>
      <fc-menu-item>
        <span>\u9999\u8549</span>
        <fc-menu slot="submenu">
          <fc-menu-item role="menuitemradio">\u56FD\u4EA7</fc-menu-item>
          <fc-menu-item role="menuitemradio">\u8FDB\u53E3</fc-menu-item>
        </fc-menu>
      </fc-menu-item>
    </fc-menu>
  </fc-menu-item>
  <fc-menu-item>
    <span>\u852C\u83DC</span>
    <fc-menu slot="submenu">
      <fc-menu-item>\u8304\u5B50</fc-menu-item>
      <fc-menu-item>\u8C46\u89D2</fc-menu-item>
    </fc-menu>
  </fc-menu-item>
  <fc-menu-item>
    <span>\u5E72\u679C</span>
    <fc-menu slot="submenu">
      <fc-menu-item>\u82B1\u751F</fc-menu-item>
      <fc-menu-item>\u74DC\u5B50</fc-menu-item>
    </fc-menu>
  </fc-menu-item>

  <fc-menu-item><span slot="after">\u65E0\u8D27</span>\u836F\u54C1</fc-menu-item>
</fc-menu>
<br />
<br />
`,nr=`:host {
  display: block;
  height: 0;
  margin: calc(var(--fc-unit-size) * 4) 0;
  border-top: var(--stroke-width) solid var(--stroke-color);
}
`,or=Object.defineProperty,ir=Object.getOwnPropertyDescriptor,Wt=(e,t,n,i)=>{for(var o=i>1?void 0:i?ir(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&or(t,n,o),o};let Ue=class extends Ot{constructor(){super(...arguments);this.role="separator"}};Ue.styles=m(nr);Wt([l({reflect:!0})],Ue.prototype,"role",2);Ue=Wt([g("fc-divider")],Ue);var rr=`:host {
  position: relative;
  display: inline-grid;
  --padding-t: var(--padding-l);
  padding: var(--padding);
  background: var(--box-background);
  min-width: var(--control-min-width);
  box-shadow: var(--box-shadow);
}

:host([slot='submenu']) {
  position: absolute;
  /*menu \u7684 pading-top: var(--padding-l)*/
  margin-top: var(--menu-margin-top, calc(-1 * var(--padding-t)));
  margin-left: var(--menu-margin-left, var(--padding-l));
}
`,ar=Object.defineProperty,lr=Object.getOwnPropertyDescriptor,Se=(e,t,n,i)=>{for(var o=i>1?void 0:i?lr(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&ar(t,n,o),o},cr=(e,t,n)=>{if(!t.has(e))throw TypeError("Cannot "+n)},sr=(e,t,n)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,n)},st=(e,t,n)=>(cr(e,t,"access private method"),n),ze,Ge;let he=class extends w{constructor(){super(...arguments);sr(this,ze),this.role="menu",this.tabindex="0",this.items=[],this.mouseenterDelay=240,this.handleMouseenter=$t(e=>{st(this,ze,Ge).call(this,e)},this.mouseenterDelay,{trailing:!0})}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-orientation","vertical"),this.setAttribute("aria-expanded","true"),p(this,"change",this.handleChange),p(this,"click",this.handleClick),p(this,"keydown",this.handleKeydown),p(this,"mouseenter",this.handleMouseenter,!0),p(this,"mouseleave",this.handleMouseleave,!0),p(this,"focusout",this.handleFocusout)}setTopIndex(){return Bn(this.items.filter(Ve))}itemsChanged(e,t){!t||e&&this.slot!=="submenu"&&this.setTopIndex()}resetTabIndex(){const e=this.items;e.length&&e.forEach(t=>{t.hasAttribute("tabindex")&&t.setAttribute("tabindex","-1")})}handleChange(e){const{target:t}=e;t instanceof _&&t.role==="menuitemradio"&&t.checked&&t!==this.checkedRadio&&(this.checkedRadio&&(this.checkedRadio.checked=!1),this.checkedRadio=t)}handleKeydown(e){const{target:t}=e;if(!!(O(t)&&t.closest("fc-menu")===this))switch(e.key){case"ArrowUp":this.focusCurrentOrNext(e,-1);break;case"ArrowDown":this.focusCurrentOrNext(e,1);break;case"ArrowLeft":this.unexpand(e);break;case" ":this.toggleExpand(e);break;case"ArrowRight":this.expand(e);break;case"Enter":{se(e.target)&&e.target.dispatchEvent(new MouseEvent("click",{bubbles:!1,composed:!0}));break}case"Escape":{se(e.target)&&e.target.blur();break}}}focusCurrentOrNext(e,t){const{activeElement:n}=this.ownerDocument,i=this.items.filter(Ve);if(O(n)&&!i.includes(n))return;const o=Dn(i,t);return o&&(e.preventDefault(),o.focus()),o}toggleExpand(e){e.target instanceof _&&(e.target.expanded?e.target.expanded=!1:this.expand(e))}expand(e){var n,i;e.preventDefault();const{target:t}=e;if(t instanceof _){if(!((n=t.submenu)==null?void 0:n.length))return;t.expanded=!0;const o=(i=t.submenu)==null?void 0:i[0];return o&&this.updateComplete.then(()=>{var r;(r=o.setTopIndex())==null||r.focus()}),t}}unexpand(e){var n;e.preventDefault();const{target:t}=e;if(t instanceof _){const i=(n=t.parentElement)==null?void 0:n.closest("fc-menu-item");if(i instanceof _)return i.expanded=!1,i.focus(),i}}handleClick(e){const{target:t}=e;if(se(t)&&t.closest("fc-menu")===this){t.expanded=!0;const{activeElement:n}=document;n instanceof HTMLElement&&n!==t&&this.contains(n)&&Array.from(this.querySelectorAll("fc-menu-item[expanded]")).forEach(o=>{o.focus(),o.expanded=!1}),t.focus()}}mouseenterDelayChanged(e,t){if(this.removeEventListener("mouseenter",this.handleMouseenter,!0),t>0)this.handleMouseenter=$t(st(this,ze,Ge),t,{trailing:!0});else{const n=st(this,ze,Ge);n.cancel=Et,n.flush=Et,this.handleMouseenter=n}p(this,"mouseenter",this.handleMouseenter,!0)}handleMouseleave(e){var i;const{target:t,relatedTarget:n}=e;t===this&&!(se(n)&&this.contains(n))&&this.handleMouseenter.cancel(),se(n)&&se(t)&&!t.disabled&&((i=t.submenu)==null?void 0:i.length)&&(t.focus(),t.expanded=!1)}handleFocusout(e){const{relatedTarget:t,currentTarget:n}=e;if(!(O(n)&&n.closest("fc-menu")))return;const i=n.closest("fc-menu-item");i&&!(O(t)&&n.contains(t))&&(i.focus(),i.expanded=!1)}render(){return d`
      ${$()}
      <slot></slot>
      ${E()}
    `}};ze=new WeakSet;Ge=function(e){var i;const{target:t}=e;if(!(O(t)&&t.closest("fc-menu")===this))return;this.items.find(o=>{se(o)&&o.expanded&&(o.expanded=!1)});const n=t.closest("fc-menu-item");se(n)&&!n.disabled&&((i=n.submenu)==null?void 0:i.length)&&(n.expanded=!0,n.focus())};he.styles=m(rr);Se([l({reflect:!0})],he.prototype,"role",2);Se([l({reflect:!0})],he.prototype,"tabindex",2);Se([l({attribute:!1}),Fe()],he.prototype,"items",2);Se([l({attribute:!1,hasChanged:N,converter(e){return Number(e)>=0?e:240}})],he.prototype,"mouseenterDelay",2);he=Se([g("fc-menu")],he);var dr={parameters:{storySource:{source:`import book from './book.html?raw'

import './index'

// menu
export default { title: 'Menu' }

export const Menu = () => book
`,locationsMap:{menu:{startLoc:{col:20,line:8},endLoc:{col:30,line:8},startBody:{col:20,line:8},endBody:{col:30,line:8}}}}},title:"Menu"};const fr=()=>tr,pr=["Menu"];var hr=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:dr,Menu:fr,__namedExportsOrder:pr}),ur=`<h4>\u9ED8\u8BA4\u503C</h4>
<fc-number-field value="1"></fc-number-field>
<fc-number-field value="a" placeholder="\u7C7B\u578B\u9519\u8BEF\u7684\u9ED8\u8BA4\u503C"></fc-number-field>

<h4>\u8F93\u5165\u8FC7\u6EE4</h4>
<p>\u4E0D\u63A5\u53D7\u8F93\u5165\u975E\u6570\u5B57\u5185\u5BB9</p>
<fc-number-field></fc-number-field>

<h4>\u56DB\u5219\u8FD0\u7B97</h4>
<p>\u8F93\u5165 <code>1+2*3/4-5</code> \u8BD5\u8BD5</p>
<fc-number-field></fc-number-field>

<p>\u8F93\u5165\u5E26\u62EC\u53F7\u7684 <code>1+2*3/(4-5)</code> \u8BD5\u8BD5</p>
<fc-number-field></fc-number-field>

<h4>\u952E\u76D8\u8C03\u503C</h4>
<p>\u6309 <kbd>\u2191</kbd> \u6216\u8005 <kbd>\u2193</kbd> \u8BD5\u8BD5</p>
<p>\u8FD8\u53EF\u4EE5\u914D\u5408\u4F7F\u7528 <kbd>shift</kbd> \u6216 <kbd>alt</kbd></p>
<fc-number-field></fc-number-field>

<h4>\u6B65\u503C</h4>
<p>\u8FD9\u91CC\u7684\u6B65\u503C\u4E3A <code>2</code></p>
<fc-number-field step="2"></fc-number-field>

<h4>\u6700\u5927\u3001\u6700\u5C0F\u503C</h4>
<fc-number-field placeholder="x>=-2" min="-2"></fc-number-field>
<fc-number-field placeholder="x<= 2" max="2"></fc-number-field>
<fc-number-field placeholder="-2<=x<=2" min="-2" max="2"></fc-number-field>

<fc-number-field max="10" value="12"></fc-number-field>

<p>\u9707\u52A8\u63D0\u793A\u6548\u679C</p>
<fc-number-field vibrate placeholder="-2<=x<=2" min="-2" max="2"></fc-number-field>

<h4>\u663E\u793A\u5355\u4F4D</h4>
<p>\u5E26\u5355\u4F4D\u4E5F\u80FD\u8FDB\u884C\u56DB\u5219\u8FD0\u7B97\u3002\u8F93\u5165 <kbd>+1</kbd> \u6216\u8005 <kbd>+1px</kbd> \u8BD5\u8BD5</p>
<fc-number-field value="12" unit="px" min="12" step="2" vibrate></fc-number-field>

<h4>\u7981\u7528</h4>
<fc-number-field value="12" unit="px" min="12" step="2" vibrate disabled></fc-number-field>

<h4>\u53EA\u8BFB</h4>
<fc-number-field value="12" unit="px" min="12" step="2" vibrate readonly></fc-number-field>

<h4>\u4F7F\u7528 label</h4>
<fc-number-field label="foo"></fc-number-field>
<fc-number-field>
  <span slot="label">bar</span>
</fc-number-field>

<p>\u5782\u76F4\u7684 label</p>
<fc-number-field label="foo" orientation="vertical"></fc-number-field>
<fc-number-field orientation="vertical">
  <span slot="label">bar</span>
</fc-number-field>

<h4>\u4E0E form \u4E00\u8D77\u4F7F\u7528</h4>
<form action="#">
  <fc-number-field required name="foo"></fc-number-field>
  <input type="submit" />
</form>
`,br=`.controls {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  visibility: hidden;
  --size: calc(var(--font-size) / 2);
  padding: var(--padding-t) 0;
}

.step-up,
.step-down {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 var(--size) var(--size) var(--size);
  border-color: transparent transparent var(--foreground) transparent;
  cursor: pointer;
  opacity: 0.4;
}

.step-down {
  border-width: var(--size) var(--size) 0 var(--size);
  border-color: var(--foreground) transparent transparent transparent;
}

.step-up:hover,
.step-down:hover {
  opacity: 1;
}

:host(:hover) .controls {
  visibility: visible;
}

:host(.read-only) .controls,
:host(:disabled) .controls {
  display: none;
}

@keyframes vibrate {
  0% {
    transform: translate(calc(var(--font-size) * -0.5));
  }
  50% {
    transform: translate(0);
  }
  100% {
    transform: translate(calc(var(--font-size) * 0.5));
  }
}

:host([vibrate].is-max),
:host([vibrate].is-min) {
  animation: vibrate 0.06s ease-in-out 3;
}
`,gr=Object.defineProperty,mr=Object.getOwnPropertyDescriptor,ue=(e,t,n,i)=>{for(var o=i>1?void 0:i?mr(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&gr(t,n,o),o};const Pe=e=>Je(e)?Qe(e):NaN;let J=class extends u{constructor(){super(...arguments);var e,t;this.max=(e=this.getAttribute("max"))!=null?e:"",this.min=(t=this.getAttribute("min"))!=null?t:"",this.step="1",this.unit="",this.vibrate=!1,this.value="",this.handleChange=n=>{if(!(n.target instanceof HTMLInputElement))return;const{unit:i}=this,o=n.target.value.trim(),r=i?o.replace(new RegExp("\\s*"+i,"g"),""):o;this.classList.remove("expression-error");try{const a=gn(r);if(!isNaN(a)){const s=a.toString();this.value=s,this.emit("change")}}catch(a){console.warn("\u8BA1\u7B97\u51FA\u9519",a),this.classList.add("expression-error"),this.emit("expression-error",a)}this.updateInputValue(this.valueWithUnit)}}updateInputValue(e){this.shadowInput&&(this.shadowInput.value=e),this.checkValidity()}connectedCallback(){var e;super.connectedCallback(),p(this,"keydown",this.handleKeydown),(e=this.shadowInput)==null||e.addEventListener("change",this.handleChange)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.shadowInput)==null||e.removeEventListener("change",this.handleChange)}normalize(){this.value=mn(this.value)}valueChanged(e,t){super.valueChanged(e,t),this.shadowInput instanceof HTMLInputElement&&(this.shadowInput.value=t),this.updateInputValue(this.valueWithUnit)}get valueWithUnit(){return[this.value,this.unit].filter(e=>e).join(" ")}get number(){return Je(this.value)?Number(this.value):NaN}handleKeydown(e){const t=e.ctrlKey?10:e.shiftKey?.1:1,{step:n="1"}=this,i=Pe(n);switch(e.key){case"ArrowUp":e.preventDefault(),this.nextStep(i*t);break;case"ArrowDown":e.preventDefault(),this.nextStep(i*-1*t);break}}handleClickStep(e){this.disabled||this.nextStep(e*Qe(this.step))}nextStep(e){const n=[this.value?this.number:0,"+",e].reduce((a,s)=>a.op(s),new vn(100)),i=Pe(this.max),o=Pe(this.min),r=n.value;i&&r>=i?(this.classList.remove("is-max"),this.updateComplete.then(()=>this.classList.add("is-max")),this.emit("is-max")):this.classList.remove("is-max"),o&&r<=o?(this.classList.remove("is-min"),this.updateComplete.then(()=>this.classList.add("is-min")),this.emit("is-min")):this.classList.remove("is-min"),this.number!==n.value&&this.emit("change"),this.value=n.toString()}render(){return d`
      <slot name="label">${this.label?d`<span class="label">${this.label}</span`:null}</slot>
      <div class="control fc-focusin-outline" part="controls">
        ${$()}
        <slot name="form-associated-proxy"></slot>
        <div class="controls" part="controls">
          <div class="step-up" @click="${()=>this.handleClickStep(1)}"></div>
          <div class="step-down" @click="${()=>this.handleClickStep(-1)}"></div>
        </div>
        ${E()}
      </div>
    `}};J.styles=m(qt,br);ue([l()],J.prototype,"max",2);ue([l()],J.prototype,"min",2);ue([l({converter(e){return(Number(e)||1).toString()}})],J.prototype,"step",2);ue([l()],J.prototype,"unit",2);ue([l({reflect:!0})],J.prototype,"vibrate",2);ue([l({init:!1,converter(e,t){if(!e)return e;if(!Je(e))return"";let n=Qe(e);const i=Pe(t.max),o=Pe(t.min);return At(i)&&(n=Math.min(i,n)),At(o)&&(n=Math.max(o,n)),n.toString()}})],J.prototype,"value",2);J=ue([g("fc-number-field")],J);var vr={parameters:{storySource:{source:`import book from './book.html?raw'

import './index'

export default { title: 'Number Filed', order: 1 }

export const NumberFiled = () => book
`,locationsMap:{"number-filed":{startLoc:{col:27,line:7},endLoc:{col:37,line:7},startBody:{col:27,line:7},endBody:{col:37,line:7}}}}},title:"Number Filed",order:1};const yr=()=>ur,xr=["NumberFiled"];var wr=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:vr,NumberFiled:yr,__namedExportsOrder:xr}),kr=`<h4>\u7B80\u5355\u4F7F\u7528</h4>
<p>\u70B9\u51FB\u5173\u95ED\u6309\u94AE\u4F1A\u89E6\u53D1 <code>close</code> \u4E8B\u4EF6</p>
<fc-panel>
  <fc-panel-header slot="panel-header">\u6D77\u9614\u5929\u7A7A</fc-panel-header>
  <div>
    <p>\u4ECA\u5929\u6211</p>
    <p>\u5BD2\u591C\u91CC\u770B\u96EA\u98D8\u8FC7</p>
    <p>\u6000\u7740\u51B7\u5374\u4E86\u7684\u5FC3\u7A9D\u6F02\u8FDC\u65B9</p>
    <p>\u98CE\u96E8\u91CC\u8FFD\u8D76</p>
    <p>\u96FE\u91CC\u5206\u4E0D\u6E05\u5F71\u8E2A</p>
    <p>\u5929\u7A7A\u6D77\u9614\u4F60\u4E0E\u6211</p>
    <p>\u53EF\u4F1A\u53D8(\u8C01\u6CA1\u5728\u53D8)</p>
  </div>
</fc-panel>

<h4>\u6CA1\u6709 header</h4>
<fc-panel>
  <div>
    <p>\u4ECA\u5929\u6211</p>
    <p>\u5BD2\u591C\u91CC\u770B\u96EA\u98D8\u8FC7</p>
    <p>\u6000\u7740\u51B7\u5374\u4E86\u7684\u5FC3\u7A9D\u6F02\u8FDC\u65B9</p>
    <p>\u98CE\u96E8\u91CC\u8FFD\u8D76</p>
    <p>\u96FE\u91CC\u5206\u4E0D\u6E05\u5F71\u8E2A</p>
    <p>\u5929\u7A7A\u6D77\u9614\u4F60\u4E0E\u6211</p>
    <p>\u53EF\u4F1A\u53D8(\u8C01\u6CA1\u5728\u53D8)</p>
  </div>
</fc-panel>

<h4>\u4F7F\u7528 <code>header</code> \u5C5E\u6027</h4>
<fc-panel header="\u6D77\u9614\u5929\u7A7A">
  <div>
    <p>\u4ECA\u5929\u6211</p>
    <p>\u5BD2\u591C\u91CC\u770B\u96EA\u98D8\u8FC7</p>
    <p>\u6000\u7740\u51B7\u5374\u4E86\u7684\u5FC3\u7A9D\u6F02\u8FDC\u65B9</p>
    <p>\u98CE\u96E8\u91CC\u8FFD\u8D76</p>
    <p>\u96FE\u91CC\u5206\u4E0D\u6E05\u5F71\u8E2A</p>
    <p>\u5929\u7A7A\u6D77\u9614\u4F60\u4E0E\u6211</p>
    <p>\u53EF\u4F1A\u53D8(\u8C01\u6CA1\u5728\u53D8)</p>
  </div>
</fc-panel>

<fc-panel header="\u6D77\u9614\u5929\u7A7A(\u9690\u85CF\u5173\u95ED\u6309\u94AE)" closable="false">
  <div>
    <p>\u4ECA\u5929\u6211</p>
    <p>\u5BD2\u591C\u91CC\u770B\u96EA\u98D8\u8FC7</p>
    <p>\u6000\u7740\u51B7\u5374\u4E86\u7684\u5FC3\u7A9D\u6F02\u8FDC\u65B9</p>
    <p>\u98CE\u96E8\u91CC\u8FFD\u8D76</p>
    <p>\u96FE\u91CC\u5206\u4E0D\u6E05\u5F71\u8E2A</p>
    <p>\u5929\u7A7A\u6D77\u9614\u4F60\u4E0E\u6211</p>
    <p>\u53EF\u4F1A\u53D8(\u8C01\u6CA1\u5728\u53D8)</p>
  </div>
</fc-panel>

<h4>\u7B80\u5355\u4F7F\u7528</h4>
<p>\u4E0D\u663E\u793A\uFF0C\u5207\u6362\u663E\u793A\u72B6\u6001\u4F1A\u89E6\u53D1 <code>visibleChange</code> \u4E8B\u4EF6</p>
<p>\u6253\u5F00\u5F00\u53D1\u8005\u5DE5\u5177\u67E5\u770B\u9690\u85CF\u8D77\u6765\u7684 <code>fc-panel</code> \u5143\u7D20</p>
<fc-panel hidden>
  <fc-panel-header slot="panel-header">\u6D77\u9614\u5929\u7A7A</fc-panel-header>
  <div>
    <p>\u4ECA\u5929\u6211</p>
    <p>\u5BD2\u591C\u91CC\u770B\u96EA\u98D8\u8FC7</p>
    <p>\u6000\u7740\u51B7\u5374\u4E86\u7684\u5FC3\u7A9D\u6F02\u8FDC\u65B9</p>
    <p>\u98CE\u96E8\u91CC\u8FFD\u8D76</p>
    <p>\u96FE\u91CC\u5206\u4E0D\u6E05\u5F71\u8E2A</p>
    <p>\u5929\u7A7A\u6D77\u9614\u4F60\u4E0E\u6211</p>
    <p>\u53EF\u4F1A\u53D8(\u8C01\u6CA1\u5728\u53D8)</p>
  </div>
</fc-panel>

<fc-button id="dialog-btn">open dialog</fc-button>
<fc-dialog anchor="#dialog-btn" id="dialog-1">
  <fc-panel header="\u5E84\u5B50" closeTarget="#dialog-1">
    <p>\u5929\u5730\u4E0E\u6211\u5E76\u751F\uFF0C\u800C\u4E07\u7269\u4E0E\u6211\u4E3A\u4E00</p>
  </fc-panel>
</fc-dialog>
`,Cr=`:host {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: var(--foreground);
  background: var(--box-background);
  padding: var(--padding);
  box-sizing: border-box;
  font-weight: bold;
}

.close-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  outline: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  margin-left: auto;
}

.close-button:hover {
  color: var(--foreground-hover);
}
`,_r=Object.defineProperty,Or=Object.getOwnPropertyDescriptor,dt=(e,t,n,i)=>{for(var o=i>1?void 0:i?Or(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&_r(t,n,o),o};let Le=class extends w{constructor(){super(...arguments);this.closable=!0,this.closeTarget=""}handleClick(e){e.preventDefault(),this.emit("close",this.closeTarget)}render(){return d`
      <slot class="control" part="control"></slot>
      ${this.closable?d` <button
            class="close-button fc-outline"
            part="close-button"
            aria-labelledby="close"
            @click="${this.handleClick}"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              xmlns:v="https://vecta.io/nano"
            >
              <path
                d="M6.774 6l4.072-4.073c.206-.206.206-.545 0-.75l-.022-.022c-.206-.206-.544-.206-.75 0L6.002 5.233 1.93 1.154c-.206-.206-.544-.206-.75 0l-.022.022c-.211.206-.211.545 0 .75L5.23 6l-4.072 4.073c-.206.206-.206.545 0 .75l.022.022c.206.206.544.206.75 0l4.072-4.073 4.072 4.073c.206.206.544.206.75 0l.022-.022c.206-.206.206-.545 0-.75L6.774 6z"
                fill="#999"
              />
            </svg>
          </button>`:""}
    `}};Le.styles=m(Cr);dt([l({reflect:!0})],Le.prototype,"closable",2);dt([l()],Le.prototype,"closeTarget",2);Le=dt([g("fc-panel-header")],Le);var $r=`:host {
  display: inline-flex;
  flex-direction: column;
  min-width: calc(var(--fc-unit-size) * 100);
  min-height: calc(var(--fc-unit-size) * 40);
  border: var(--border-width) solid var(--border-color);
  background: var(--body-background);
  color: var(--foreground);
}

.panel-body {
  flex: 1;
  position: relative;
  overflow-y: auto;
  background: var(--box-background);
}

slot[name='panel-header'] {
  color: var(--foreground);
  background: var(--box-background);
}

fc-panel-header:defined {
  color: inherit;
  background: inherit;
  padding: inherit;
}
`,Er=Object.defineProperty,Ar=Object.getOwnPropertyDescriptor,Ce=(e,t,n,i)=>{for(var o=i>1?void 0:i?Ar(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&Er(t,n,o),o},Yt=(e,t,n)=>{if(!t.has(e))throw TypeError("Cannot "+n)},Xt=(e,t,n)=>(Yt(e,t,"read from private field"),n?n.call(e):t.get(e)),Ir=(e,t,n)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,n)},Sr=(e,t,n,i)=>(Yt(e,t,"write to private field"),i?i.call(e,n):t.set(e,n),n),Te;let de=class extends w{constructor(){super(...arguments);this.closable=!0,this.closeTarget="",this.role="widget",this.hidden=!1,Ir(this,Te,void 0)}hiddenChanged(e,t){this.setAttribute("aria-hidden",String(t)),this.emit("visibleChange")}headerChanged(e,t){if(t){const n=document.createElement("fc-panel-header");n.slot="panel-header",n.closable=this.closable,n.closeTarget=this.closeTarget,n.innerText=t,Sr(this,Te,n),this.appendChild(n)}else Xt(this,Te)&&Xt(this,Te).remove()}render(){return this.hidden?d``:d`
      <slot name="panel-header" part="panel-header"></slot>
      <div class="panel-body" part="panel-body">
        <slot></slot>
      </div>
    `}};Te=new WeakMap;de.styles=m($r);Ce([l({reflect:!0})],de.prototype,"closable",2);Ce([l()],de.prototype,"closeTarget",2);Ce([l({reflect:!0})],de.prototype,"role",2);Ce([l({reflect:!0})],de.prototype,"hidden",2);Ce([l({initCallback:!0})],de.prototype,"header",2);de=Ce([g("fc-panel")],de);var zr={parameters:{storySource:{source:`import book from './book.html?raw'

import './index'

export default { title: 'Panel', order: 1 }

export const Panel = () => book
`,locationsMap:{panel:{startLoc:{col:21,line:7},endLoc:{col:31,line:7},startBody:{col:21,line:7},endBody:{col:31,line:7}}}}},title:"Panel",order:1};const Pr=()=>kr,Lr=["Panel"];var Tr=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:zr,Panel:Pr,__namedExportsOrder:Lr}),Dr=`<h4>\u7B80\u5355\u4F7F\u7528</h4>
<fc-radio-group name="fruit">
  <label slot="label">\u6C34\u679C</label>
  <fc-radio value="apple">\u82F9\u679C</fc-radio>
  <fc-radio value="orange">\u6A58\u5B50</fc-radio>
  <fc-radio value="pear">\u68A8</fc-radio>
</fc-radio-group>

<h4>\u9ED8\u8BA4\u503C</h4>
<fc-radio-group name="fruit" value="orange">
  <fc-radio value="apple">\u82F9\u679C</fc-radio>
  <fc-radio value="orange">\u6A58\u5B50</fc-radio>
  <fc-radio value="pear">\u68A8</fc-radio>
</fc-radio-group>

<h4>\u7981\u7528</h4>
<fc-radio-group name="fruit" value="orange" disabled>
  <fc-radio value="apple">\u82F9\u679C</fc-radio>
  <fc-radio value="orange">\u6A58\u5B50</fc-radio>
  <fc-radio value="pear">\u68A8</fc-radio>
</fc-radio-group>
`,Mr=Object.defineProperty,jr=Object.getOwnPropertyDescriptor,Q=(e,t,n,i)=>{for(var o=i>1?void 0:i?jr(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&Mr(t,n,o),o};const Br=()=>{const e=document.createElement("input");return e.type="radio",e};let P=class extends K{constructor(){super(Br());this.value="on",this.role="radio",this.tabIndex=0,this.name="",this.checked=!1,this.defaultChecked=!1,this.indeterminate=!1,this.readOnly=!1,this.type="radio"}connectedCallback(){super.connectedCallback(),this.checked=this.hasAttribute("checked"),this.disabled=this.hasAttribute("disabled"),this.defaultChecked=this.checked,p(this,"click",this.handleClick)}checkedChanged(e,t){this.proxy instanceof HTMLInputElement&&(this.proxy.checked=t),this.checked&&(this.uniqueChecked(),this.updateForm(),this.emit("change"))}readOnlyChanged(){this.classList.toggle("readonly",this.readOnly)}uniqueChecked(){const e=this.form||this.closest("fc-radio-group")||this.ownerDocument.body,{name:t}=this;if(!e||!t)return;Array.from(e.querySelectorAll(`fc-radio[name='${t}']`)).forEach(i=>{i!==this&&(i.checked=!1)})}updateForm(){const e=this.checked?this.value:null;this.setFormValue(e)}handleClick(e){!this.disabled&&!this.readOnly&&!this.checked&&(this.checked=!0,this.updateForm())}render(){return d`
      <slot name="checked-indicator">
        <div class="radio control fc-inner-outline" part="control">
          <div class="checked-indicator"></div>
        </div>
      </slot>
      <label class="label" part="label"><slot></slot></label>
    `}};P.styles=m(Gt);Q([l()],P.prototype,"value",2);Q([l({reflect:!0})],P.prototype,"role",2);Q([l({reflect:!0})],P.prototype,"tabIndex",2);Q([l({reflect:!0})],P.prototype,"name",2);Q([l({reflect:!0})],P.prototype,"checked",2);Q([l({type:"boolean"})],P.prototype,"defaultChecked",2);Q([l({type:"boolean",reflect:!0})],P.prototype,"indeterminate",2);Q([l({type:"boolean",reflect:!0})],P.prototype,"readOnly",2);P=Q([g("fc-radio")],P);var Rr=`:host {
  display: block;
}

slot[name='label'] {
  display: contents;
}
`,Fr=Object.defineProperty,Vr=Object.getOwnPropertyDescriptor,De=(e,t,n,i)=>{for(var o=i>1?void 0:i?Vr(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&Fr(t,n,o),o};let be=class extends w{constructor(){super(...arguments);this.disabled=!1,this.name="",this.role="radiogroup",this.value=""}connectedCallback(){super.connectedCallback(),p(this,"keydown",this.handleKeydown),p(this,"change",this.handleChange),this.updateComplete.then(()=>{this.disabled=this.hasAttribute("disabled"),this.value=this.getAttribute("value")||this.value,this.name=this.getAttribute("name")||this.name,this.items.forEach(e=>{e.checked=e.value===this.value,e.toggleAttribute("disabled",this.disabled)}),this.reorderTabindex()})}get items(){return this.slottedElements.filter(e=>e instanceof P)}get length(){return this.items.length}disabledChanged(e,t){this.updateComplete.then(()=>{this.items.forEach(n=>{n.disabled=t})})}nameChanged(){const{name:e}=this;this.items.forEach(t=>{t.name=e})}valueChanged(e,t){this.reorderTabindex()}handleKeydown(e){let t;const{key:n}=e;["ArrowLeft","ArrowUp"].includes(n)?t=Ae(this.items,-1):["ArrowRight","ArrowDown"].includes(n)&&(t=Ae(this.items,1)),t&&e.preventDefault()}reorderTabindex(){let e=!1;this.items.forEach(t=>{const{checked:n}=t;t.tabIndex=n?0:-1,n&&(e=!0)}),!e&&this.items[0]&&(this.items[0].tabIndex=0)}handleChange(e){if(e instanceof CustomEvent){const{target:t}=e;t instanceof P&&t.checked&&this.value!==t.value&&(this.value=t.value)}}render(){return d`
      <slot name="label" part="label"></slot>
      <div class="control" part="control">
        <slot></slot>
      </div>
    `}};be.styles=m(Rr);De([l({type:"boolean",reflect:!0})],be.prototype,"disabled",2);De([l()],be.prototype,"name",2);De([l()],be.prototype,"role",2);De([l()],be.prototype,"value",2);be=De([g("fc-radio-group")],be);var Nr={parameters:{storySource:{source:`import book from './book.html?raw'

import './index'

export default { title: 'Radio Group', order: 1 }

export const RadioGroup = () => book
`,locationsMap:{"radio-group":{startLoc:{col:26,line:7},endLoc:{col:36,line:7},startBody:{col:26,line:7},endBody:{col:36,line:7}}}}},title:"Radio Group",order:1};const Kr=()=>Dr,qr=["RadioGroup"];var Hr=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Nr,RadioGroup:Kr,__namedExportsOrder:qr}),Ur=`<h4>\u7B80\u5355\u4F7F\u7528</h4>
<fc-radio value="apple">\u82F9\u679C</fc-radio>
<fc-radio value="orange">\u6A58\u5B50</fc-radio>
<fc-radio value="banana">\u9999\u8549</fc-radio>
<fc-radio value="pear">\u68A8</fc-radio>

<h4>\u6309 name \u5206\u7EC4\uFF0C\u72B6\u6001\u4E92\u65A5</h4>
<fc-radio name="fruit" value="apple">\u82F9\u679C</fc-radio>
<fc-radio name="fruit" value="orange">\u6A58\u5B50</fc-radio>
<fc-radio name="fruit" value="banana">\u9999\u8549</fc-radio>
<fc-radio name="fruit" value="pear">\u68A8</fc-radio>

<h4>\u9ED8\u8BA4\u9009\u4E2D</h4>
<fc-radio checked>\u540C\u610F</fc-radio>

<h4>\u7981\u7528</h4>
<fc-radio disabled checked>\u540C\u610F</fc-radio>
<fc-radio disabled>\u540C\u610F</fc-radio>

<h4>\u53EA\u8BFB</h4>
<fc-radio readonly>\u540C\u610F</fc-radio>
<fc-radio readonly checked>\u540C\u610F</fc-radio>

<h4>\u548C Form \u4E00\u8D77\u4F7F\u7528</h4>
<form action="#">
  <fc-radio name="ok" checked>ok</fc-radio>
  <button type="submit">submit</button>
</form>
`,Gr={parameters:{storySource:{source:`import book from './book.html?raw'

import './index'

export default { title: 'Radio', order: 1 }

export const Radio = () => book
`,locationsMap:{radio:{startLoc:{col:21,line:7},endLoc:{col:31,line:7},startBody:{col:21,line:7},endBody:{col:31,line:7}}}}},title:"Radio",order:1};const Wr=()=>Ur,Yr=["Radio"];var Xr=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Gr,Radio:Wr,__namedExportsOrder:Yr}),Jr=`<h4>\u7B80\u5355\u4F7F\u7528</h4>
<fc-select>
  <fc-list-option value="0">\u8BF7\u9009\u62E9</fc-list-option>
  <fc-list-option value="1">\u82F9\u679C</fc-list-option>
  <fc-list-option value="2">\u9999\u8549</fc-list-option>
  <fc-list-option value="3">\u6854\u5B50</fc-list-option>
</fc-select>

<h4>\u8BBE\u7F6E\u9ED8\u8BA4\u503C</h4>
<fc-select value="1">
  <fc-list-option value="">\u8BF7\u9009\u62E9</fc-list-option>
  <fc-list-option value="1">\u82F9\u679C</fc-list-option>
  <fc-list-option value="2">\u9999\u8549</fc-list-option>
  <fc-list-option value="3">\u6854\u5B50</fc-list-option>
</fc-select>

<h4>\u4E0D\u53EF\u7528</h4>
<fc-select disabled value="1">
  <fc-list-option value="">\u8BF7\u9009\u62E9</fc-list-option>
  <fc-list-option value="1">\u82F9\u679C</fc-list-option>
  <fc-list-option value="2">\u9999\u8549</fc-list-option>
  <fc-list-option value="3" disabled>\u6854\u5B50</fc-list-option>
</fc-select>

<h4>\u4E0D\u53EF\u7528\u9009\u9879</h4>
<fc-select value="1">
  <fc-list-option value="">\u8BF7\u9009\u62E9</fc-list-option>
  <fc-list-option value="1">\u82F9\u679C</fc-list-option>
  <fc-list-option value="2">\u9999\u8549</fc-list-option>
  <fc-list-option value="3" disabled>\u6854\u5B50</fc-list-option>
</fc-select>

<h4>\u957F\u5217\u8868</h4>
<p>\u8BD5\u8BD5\u6709 <kbd>Tab</kbd> \u548C <kbd>\u2193</kbd> <kbd>\u2191</kbd> <kbd>Enter</kbd></p>
<fc-select value="1">
  <fc-list-option value="">\u8BF7\u9009\u62E9</fc-list-option>
  <fc-list-option value="1">\u58EB\u591A\u5564\u68A8</fc-list-option>
  <fc-list-option value="1">\u5927\u6A39\u83E0\u863F</fc-list-option>
  <fc-list-option value="1">\u5C71\u7AF9</fc-list-option>
  <fc-list-option value="1">\u706B\u9F8D\u679C</fc-list-option>
  <fc-list-option value="1">\u6728\u74DC</fc-list-option>
  <fc-list-option value="1">\u725B\u6CB9\u679C</fc-list-option>
  <fc-list-option value="1">\u897F\u74DC</fc-list-option>
  <fc-list-option value="1">\u897F\u67DA</fc-list-option>
  <fc-list-option value="1">\u897F\u6885</fc-list-option>
  <fc-list-option value="1">\u8292\u679C</fc-list-option>
  <fc-list-option value="1">\u5947\u7570\u679C</fc-list-option>
  <fc-list-option value="1">\u6787\u6777</fc-list-option>
  <fc-list-option value="1">\u9752\u6AB8</fc-list-option>
  <fc-list-option value="1">\u9752\u860B\u679C</fc-list-option>
  <fc-list-option value="1">\u54C8\u5BC6\u74DC</fc-list-option>
</fc-select>

<h4>\u5B9A\u4F4D</h4>
<fc-select value="1" position="top">
  <fc-list-option value="">\u8BF7\u9009\u62E9</fc-list-option>
  <fc-list-option value="1">\u82F9\u679C</fc-list-option>
  <fc-list-option value="2">\u9999\u8549</fc-list-option>
  <fc-list-option value="3" disabled>\u6854\u5B50</fc-list-option>
</fc-select>
<fc-select value="1" position="bottom">
  <fc-list-option value="">\u8BF7\u9009\u62E9</fc-list-option>
  <fc-list-option value="1">\u82F9\u679C</fc-list-option>
  <fc-list-option value="2">\u9999\u8549</fc-list-option>
  <fc-list-option value="3" disabled>\u6854\u5B50</fc-list-option>
</fc-select>

<h4>\u7A7A\u5217\u8868</h4>
<fc-select>
  <span slot="empty">\u6682\u65E0\u6570\u636E</span>
</fc-select>

<h4>\u9ED8\u8BA4\u5C55\u5F00</h4>
<fc-select open>
  <fc-list-option value="">\u8BF7\u9009\u62E9</fc-list-option>
  <fc-list-option value="1">\u82F9\u679C</fc-list-option>
  <fc-list-option value="2">\u9999\u8549</fc-list-option>
  <fc-list-option value="3">\u6854\u5B50</fc-list-option>
  <fc-list-option value="4">\u68A8</fc-list-option>
</fc-select>
`,Qr={parameters:{storySource:{source:`import book from './book.html?raw'

import '../list-option/index'
import './index'

export default { title: 'Select', order: 3 }

export const Select = () => book
`,locationsMap:{select:{startLoc:{col:22,line:8},endLoc:{col:32,line:8},startBody:{col:22,line:8},endBody:{col:32,line:8}}}}},title:"Select",order:3};const Zr=()=>Jr,ea=["Select"];var ta=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Qr,Select:Zr,__namedExportsOrder:ea}),na=`<h4>\u7B80\u5355\u4F7F\u7528</h4>
<p style="font-size: smaller">\u8BD5\u8BD5 <kbd>Tab</kbd> <kbd>\u2192</kbd> <kbd>Enter</kbd></p>

<fc-tabs>
  <fc-tab id="tab-fruit" slot="tab">\u6C34\u679C</fc-tab>
  <fc-tab id="tab-vegetable" slot="tab">\u852C\u83DC</fc-tab>
  <fc-tab-panel id="panel-fruit" slot="tabpanel">\u82F9\u679C \u6A58\u5B50 \u9999\u8549</fc-tab-panel>
  <fc-tab-panel id="panel-vegetable" slot="tabpanel">\u767D\u83DC \u841D\u535C \u8304\u5B50</fc-tab-panel>
</fc-tabs>

<h4>\u9ED8\u8BA4\u503C</h4>
<fc-tabs activeid="tab-vegetable">
  <fc-tab id="tab-fruit" slot="tab">\u6C34\u679C</fc-tab>
  <fc-tab id="tab-vegetable" slot="tab">\u852C\u83DC</fc-tab>
  <fc-tab-panel id="panel-fruit" slot="tabpanel">\u82F9\u679C \u6A58\u5B50 \u9999\u8549</fc-tab-panel>
  <fc-tab-panel id="panel-vegetable" slot="tabpanel">\u767D\u83DC \u841D\u535C \u8304\u5B50</fc-tab-panel>
</fc-tabs>

<h4>\u7981\u7528</h4>
<fc-tabs disabled value="tab-fruit">
  <fc-tab id="tab-fruit" slot="tab">\u6C34\u679C</fc-tab>
  <fc-tab id="tab-vegetable" slot="tab">\u852C\u83DC</fc-tab>
  <fc-tab-panel id="panel-fruit" slot="tabpanel">\u82F9\u679C \u6A58\u5B50 \u9999\u8549</fc-tab-panel>
  <fc-tab-panel id="panel-vegetable" slot="tabpanel">\u767D\u83DC \u841D\u535C \u8304\u5B50</fc-tab-panel>
</fc-tabs>

<h4>\u7AD6\u76F4\u6392\u5E8F</h4>
<fc-tabs direction="column">
  <fc-tab id="tab-fruit" slot="tab">\u6C34\u679C</fc-tab>
  <fc-tab id="tab-vegetable" slot="tab">\u852C\u83DC</fc-tab>
  <fc-tab-panel id="panel-fruit" slot="tabpanel">\u82F9\u679C \u6A58\u5B50 \u9999\u8549</fc-tab-panel>
  <fc-tab-panel id="panel-vegetable" slot="tabpanel">\u767D\u83DC \u841D\u535C \u8304\u5B50</fc-tab-panel>
</fc-tabs>

<h4>before</h4>
<fc-tabs direction="row">
  <div slot="before">\u{1F697}</div>
  <fc-tab id="tab-fruit" slot="tab">\u6C34\u679C</fc-tab>
  <fc-tab id="tab-vegetable" slot="tab">\u852C\u83DC</fc-tab>
  <fc-tab-panel id="panel-fruit" slot="tabpanel">\u82F9\u679C \u6A58\u5B50 \u9999\u8549</fc-tab-panel>
  <fc-tab-panel id="panel-vegetable" slot="tabpanel">\u767D\u83DC \u841D\u535C \u8304\u5B50</fc-tab-panel>
</fc-tabs>
<br />
<fc-tabs>
  <div slot="before">\u{1F697}</div>
  <fc-tab id="tab-fruit" slot="tab">\u6C34\u679C</fc-tab>
  <fc-tab id="tab-vegetable" slot="tab">\u852C\u83DC</fc-tab>
  <fc-tab-panel id="panel-fruit" slot="tabpanel">\u82F9\u679C \u6A58\u5B50 \u9999\u8549</fc-tab-panel>
  <fc-tab-panel id="panel-vegetable" slot="tabpanel">\u767D\u83DC \u841D\u535C \u8304\u5B50</fc-tab-panel>
</fc-tabs>
`,oa=`:host {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
}

:host(:focus-visible) {
  outline: none;
}

:host([disabled]) {
  color: var(--foreground-disabled);
}
`,ia=Object.defineProperty,ra=Object.getOwnPropertyDescriptor,ft=(e,t,n,i)=>{for(var o=i>1?void 0:i?ra(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&ia(t,n,o),o};const aa=e=>e instanceof _e||e.tagName.toLowerCase()==="fc-tab-panel";let _e=class extends w{constructor(){super(...arguments);this.role="tabpanel",this.disabled=!1}render(){return d`<slot></slot>`}};_e.styles=m(oa);ft([l({reflect:!0})],_e.prototype,"role",2);ft([l()],_e.prototype,"disabled",2);_e=ft([g("fc-tab-panel")],_e);var la=`:host {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: var(--padding-t) var(--padding-r) var(--padding-b) var(--padding-l);
  cursor: pointer;
  box-sizing: border-box;
}

:host(:not([disabled]):hover) {
  background: var(--background-hover);
}

:host([aria-selected='true']) {
  color: var(--foreground-selected);
  background: var(--background-active);
}
:host([aria-selected='true']:hover) {
  /*color: var(--foreground-hover);*/
  background: var(--background-hover);
}

:host([aria-selected='true'][disabled]) {
  color: var(--foreground-disabled);
  background: var(--background-disabled);
}

:host([disabled]) {
  color: var(--foreground-disabled);
  cursor: not-allowed;
}

:host([direction='column']) {
  border-radius: var(--border-radius) var(--border-radius) 0 0;
}

:host([direction='row']) {
  border-radius: var(--border-radius) 0 0 var(--border-radius);
}
`,ca=Object.defineProperty,sa=Object.getOwnPropertyDescriptor,Oe=(e,t,n,i)=>{for(var o=i>1?void 0:i?sa(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&ca(t,n,o),o};const da=e=>e instanceof M||e.tagName.toLowerCase()==="fc-tab";let M=class extends w{constructor(){super(...arguments);this.disabled=!1,this.readonly=this.hasAttribute("readonly"),this.role="tab",this.selected=!1,this.tabindex="-1"}connectedCallback(){super.connectedCallback(),p(this,"click",this.handleClick)}selectedChanged(e,t){this.selected&&this.emit("select")}handleClick(e){e.preventDefault(),this.selected=!this.disabled}render(){return d`<slot></slot>`}};M.styles=m(la);Oe([l()],M.prototype,"disabled",2);Oe([l({reflect:!0})],M.prototype,"readonly",2);Oe([l({reflect:!0})],M.prototype,"role",2);Oe([l({reflect:!0})],M.prototype,"selected",2);Oe([l({reflect:!0})],M.prototype,"tabindex",2);M=Oe([g("fc-tab")],M);var fa=`:host {
  display: flex;
  flex-direction: column;
}

.tablist {
  display: flex;
}

::part(tab) {
  border-radius: var(--border-radius) var(--border-radius) 0 0;
}

.panels {
  display: flex;
  flex-direction: column;
}

:host([direction='column']) {
  flex-direction: row;
}

:host([direction='column']) .tablist {
  flex-direction: column;
}

.tablist .tab {
  margin: 0 2px;
}
`,pa=Object.defineProperty,ha=Object.getOwnPropertyDescriptor,ge=(e,t,n,i)=>{for(var o=i>1?void 0:i?ha(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&pa(t,n,o),o};let j=class extends w{constructor(){super();this.tabs=[],this.panels=[],this.activeid="",this.disabled=this.hasAttribute("disabled"),this.direction="row",j.index+=1}connectedCallback(){if(super.connectedCallback(),this.tabs=Array.from(this.children).filter(da),this.panels=Array.from(this.children).filter(aa),this.activeid=this.getAttribute("activeid"),!this.activeid&&this.tabs){const e=Ae(this.tabs,1,!1,!0);e&&(this.activeid=e.id)}p(this,"select",this.handleSelect)}tabsChanged(){var e;(e=this.tabs)==null||e.forEach((t,n)=>{t.getAttribute("id")||t.setAttribute("id",`tab-${n}`)})}panelsChanged(){var n;const{index:e}=j,{activeTab:t}=this;(n=this.panels)==null||n.forEach((i,o)=>{i.getAttribute("id")||i.setAttribute("id",`panel-${e}-${o}`);const r=i.getAttribute("id"),a=this.tabs[o];a&&(a.hasAttribute("aria-controls")||a.setAttribute("aria-controls",r),i.hasAttribute("aria-labelledby")||i.setAttribute("aria-labelledby",a.getAttribute("id")),a===t&&i.toggleAttribute("hidden",!0))})}activeTabChanged(){var i;this.activeid=((i=this.activeTab)==null?void 0:i.id)||null,this.tabs.forEach(o=>{fe(o)&&o.setAttribute("tabindex","-1"),o.toggleAttribute("selected",!1)}),this.panels.forEach(o=>{o.setAttribute("hidden","true"),o.removeAttribute("tabindex")});const{activeTab:e}=this;if(!e)return;e.toggleAttribute("selected",!0),fe(e)&&e.setAttribute("tabindex","0");const t=e.getAttribute("aria-controls"),n=this.panels.find(o=>o.getAttribute("id")===t);n&&(n.removeAttribute("hidden"),fe(e)&&n.setAttribute("tabindex","0"))}activeidChanged(){const{activeid:e}=this;this.activeTab=this.tabs.find(t=>t.getAttribute("id")===e)}disabledChanged(){this.disabled&&this.tabs.forEach(e=>e.toggleAttribute("disabled",!0))}directionChanged(){const{direction:e}=this;this.tabs.forEach(t=>t.setAttribute("direction",e))}handleSelect(e){const{target:t}=e;t instanceof M&&!this.disabled&&(e.preventDefault(),this.activeTab=t)}handleKeydown(e){var n,i;if(!(e.target instanceof M)||this.disabled)return;const t={previous:"ArrowLeft",next:"ArrowRight"};switch(this.direction==="column"&&(t.previous="ArrowUp",t.next="ArrowDown"),e.key){case t.previous:e.preventDefault(),(n=Ee(this.tabs,-1,!0))==null||n.focus();break;case t.next:e.preventDefault(),(i=Ee(this.tabs,1,!0))==null||i.focus();break;case"Enter":{e.preventDefault(),e.target instanceof M&&(this.activeTab=e.target);break}}}render(){return d`
      <div class="tablist" part="tablist" role="tablist" @keydown="${this.handleKeydown}">
        ${$()}
        <slot name="tab" class="tab" part="tab"></slot>
        ${E()}
      </div>
      <div class="tabpanel" part="tabpanel">
        <slot name="tabpanel" class="tabpanel" part="tabpanel"></slot>
      </div>
    `}};j.styles=m(fa);j.index=0;ge([l({attribute:!1,init:!1})],j.prototype,"tabs",2);ge([l({attribute:!1,init:!1})],j.prototype,"panels",2);ge([l({attribute:!1,init:!1})],j.prototype,"activeTab",2);ge([l({init:!1})],j.prototype,"activeid",2);ge([l({init:!1})],j.prototype,"disabled",2);ge([l({reflect:!0})],j.prototype,"direction",2);j=ge([g("fc-tabs")],j);var ua={parameters:{storySource:{source:`import book from './book.html?raw'

import './index'

export default { title: 'Tabs', order: 1 }

export const Tabs = () => book
`,locationsMap:{tabs:{startLoc:{col:20,line:7},endLoc:{col:30,line:7},startBody:{col:20,line:7},endBody:{col:30,line:7}}}}},title:"Tabs",order:1};const ba=()=>na,ga=["Tabs"];var ma=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:ua,Tabs:ba,__namedExportsOrder:ga}),va=`<h4>\u7B80\u5355\u4F7F\u7528</h4>
<fc-button id="jys-1">\u9759\u591C\u601D</fc-button>
<fc-tooltip anchor="#jys-1">\u674E\u767D</fc-tooltip>

<h4>\u9ED8\u8BA4\u663E\u793A</h4>
<fc-button id="jys-1">\u9759\u591C\u601D</fc-button>
<fc-tooltip anchor="#jys-1" visible position="top">\u674E\u767D</fc-tooltip>

<h4>\u5B9A\u4F4D</h4>
<fc-button id="jys-2">\u9759\u591C\u601D</fc-button> <span>right</span>
<fc-tooltip anchor="#jys-2" position="right">\u674E\u767D</fc-tooltip>

<fc-button id="jys-2-left">\u9759\u591C\u601D</fc-button> <span>left</span>
<fc-tooltip anchor="#jys-2-left" position="left">\u674E\u767D</fc-tooltip>

<fc-button id="jys-2-top">\u9759\u591C\u601D</fc-button> <span>top</span>
<fc-tooltip anchor="#jys-2-top" position="top">\u674E\u767D</fc-tooltip>

<fc-button id="jys-2-bottom">\u9759\u591C\u601D</fc-button> <span>bottom</span>
<fc-tooltip anchor="#jys-2-bottom" position="bottom">\u674E\u767D</fc-tooltip>

<h4>\u95F4\u8DDD</h4>
<fc-button id="jys-3-x">\u9759\u591C\u601D</fc-button> <span>20px</span>
<fc-tooltip anchor="#jys-3-x" position="right" offsetX="20">\u674E\u767D</fc-tooltip>
<fc-button id="jys-3-y">\u9759\u591C\u601D</fc-button> <span>20px</span>
<fc-tooltip anchor="#jys-3-y" position="bottom" offsetY="20">\u674E\u767D</fc-tooltip>

<h4>\u5EF6\u8FDF</h4>
<fc-button id="jys-4">\u9759\u591C\u601D</fc-button> <span>1000s</span>
<fc-tooltip anchor="#jys-4" delay="1000">\u674E\u767D</fc-tooltip>

<h4>\u4E00\u4E2A\u5143\u7D20\u591A\u4E2A\u63D0\u793A</h4>
<div style="padding: 50px 100px; background: #444">
  <fc-button id="anchor-1">\u{1F331}\u{1F319}<br />\u9759\u591C\u601D</fc-button>
  <fc-tooltip anchor="#anchor-1" position="left"> \u5E8A\u524D\u660E\u6708\u5149</fc-tooltip>
  <fc-tooltip anchor="#anchor-1" position="right"> \u7591\u4F3C\u5730\u4E0A\u971C</fc-tooltip>
  <fc-tooltip anchor="#anchor-1" position="top"> \u4E3E\u5934\u671B\u660E\u6708</fc-tooltip>
  <fc-tooltip anchor="#anchor-1" position="bottom"> \u4F4E\u5934\u601D\u6545\u4E61</fc-tooltip>
</div>

<h4>\u591A\u4E2A\u5143\u7D20\u5171\u7528\u4E00\u4E2A\u63D0\u793A</h4>
<div style="padding: 50px 100px; background: #444">
  <fc-button class="anchor-2" position="left"> \u5E8A\u524D\u660E\u6708\u5149</fc-button>
  <fc-button class="anchor-2" position="right"> \u7591\u4F3C\u5730\u4E0A\u971C</fc-button>
  <fc-button class="anchor-2" position="top"> \u4E3E\u5934\u671B\u660E\u6708</fc-button>
  <fc-button class="anchor-2" position="bottom"> \u4F4E\u5934\u601D\u6545\u4E61</fc-button>
  <fc-tooltip anchor=".anchor-2">\u{1F331}\u{1F319}<br />\u9759\u591C\u601D</fc-tooltip>
</div>
`,ya=`:host {
  display: inline-block;
  z-index: 999;
}

.tooltip {
  all: inherit;
  display: inline-block;
  position: fixed;
  border: var(--border-width) solid var(--border-color);
  padding: var(--padding-t) var(--padding-r) var(--padding-b) var(--padding-l);
  background: var(--background);
  visibility: hidden;
}
`,xa=Object.defineProperty,wa=Object.getOwnPropertyDescriptor,Z=(e,t,n,i)=>{for(var o=i>1?void 0:i?wa(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&xa(t,n,o),o},Jt=(e,t,n)=>{if(!t.has(e))throw TypeError("Cannot "+n)},Qt=(e,t,n)=>(Jt(e,t,"read from private field"),n?n.call(e):t.get(e)),ka=(e,t,n)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,n)},Ca=(e,t,n,i)=>(Jt(e,t,"write to private field"),i?i.call(e,n):t.set(e,n),n),Me;let V=class extends w{constructor(){super(...arguments);this.delay=300,this.offsetX=6,this.offsetY=6,this.role="tooltip",ka(this,Me,void 0),this.visible=!1,this.position="bottom",this.handleMouseenter=e=>{this.currentAnchorElement=e.target,this.visible=!0},this.handleMouseleave=e=>{this.currentAnchorElement=null,this.visible=!1}}connectedCallback(){var e;super.connectedCallback(),this.anchor=this.getAttribute("anchor"),this.anchorElements=this.anchor?Array.from(this.renderRoot.ownerDocument.querySelectorAll(this.anchor)):null,(e=this.anchorElements)==null||e.forEach(t=>{t.addEventListener("mouseenter",this.handleMouseenter),t.addEventListener("mouseleave",this.handleMouseleave)})}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.anchorElements)==null||e.forEach(t=>{t.removeEventListener("mouseenter",this.handleMouseenter),t.removeEventListener("mouseleave",this.handleMouseleave)})}visibleChanged(e,t){var n;if(t){!this.currentAnchorElement&&((n=this.anchorElements)==null?void 0:n.length)&&(this.currentAnchorElement=this.anchorElements[0]);const i=()=>{const{anchorPosition:o,tooltip:r}=this;r&&(r.style.cssText=Object.entries(o).map(([a,s])=>`${a}:${s}px`).join(";"),r.style.visibility="visible"),this.emit("visibleChange",{old:e,next:t})};this.delay>0?Ca(this,Me,setTimeout(i,this.delay)):i()}else Qt(this,Me)&&clearTimeout(Qt(this,Me))}get anchorPosition(){const{currentAnchorElement:e}=this,t=this.renderRoot.querySelector(".tooltip");if(!e||!t)return{};const{top:n,left:i,right:o,bottom:r,width:a,height:s}=e.getBoundingClientRect(),{width:c,height:f}=t.getBoundingClientRect(),h=i-(c-a)/2,y=n-(f-s)/2,{offsetX:v,offsetY:x}=this;switch(this.position){case"bottom":return{left:h,top:r+x};case"top":return{left:h,top:n-f-x};case"left":return{left:i-c-v,top:y};case"right":return{left:o+v,top:y};default:return{}}}render(){return this.visible?d`
        <div class="tooltip" part="tooltip" role="tooltip">
          <slot></slot>
        </div>
      `:d``}};Me=new WeakMap;V.styles=m(ya);Z([l({init:!1})],V.prototype,"anchor",2);Z([l({converter(e){return Math.max(0,e)}})],V.prototype,"delay",2);Z([l()],V.prototype,"offsetX",2);Z([l()],V.prototype,"offsetY",2);Z([l({reflect:!0})],V.prototype,"role",2);Z([l()],V.prototype,"visible",2);Z([l()],V.prototype,"position",2);Z([yn(".tooltip")],V.prototype,"tooltip",2);V=Z([g("fc-tooltip")],V);var _a={parameters:{storySource:{source:`import book from './book.html?raw'

import './index'

export default { title: 'Tooltip', order: 1 }

export const Tooltip = () => book
`,locationsMap:{tooltip:{startLoc:{col:23,line:7},endLoc:{col:33,line:7},startBody:{col:23,line:7},endBody:{col:33,line:7}}}}},title:"Tooltip",order:1};const Oa=()=>va,$a=["Tooltip"];var Ea=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:_a,Tooltip:Oa,__namedExportsOrder:$a}),Aa=`<h4>\u7B80\u5355\u4F7F\u7528</h4>
<fc-tree-item tabindex="1">\u82F9\u679C</fc-tree-item>

<h4>\u9009\u4E2D</h4>
<fc-tree-item selected>\u6A58\u5B50</fc-tree-item>

<h4>\u7981\u7528</h4>
<fc-tree-item disabled>\u9999\u8549</fc-tree-item>
<fc-tree-item selected disabled>\u9999\u8549</fc-tree-item>

<h4>\u5D4C\u5957</h4>
<fc-tree-item>
  \u6C34\u679C
  <fc-tree-item slot="item">\u897F\u7EA2\u67FF</fc-tree-item>
</fc-tree-item>

<h4>\u65E0\u7F29\u8FDB</h4>
<fc-tree-item>
  <span>\u6C34\u679C</span>
  <fc-tree-item indent="false">\u82F9\u679C</fc-tree-item>
</fc-tree-item>
<fc-tree-item>\u897F\u7EA2\u67FF</fc-tree-item>

<h4>\u4E0D\u53EF\u9009</h4>
<fc-tree-item selectable="false">
  \u6C34\u679C(\u6211\u4E0D\u53EF\u9009)
  <fc-tree-item>\u897F\u7EA2\u67FF</fc-tree-item>
</fc-tree-item>

<h4>\u6807\u9898\u53EF\u5C55\u5F00</h4>
<fc-tree-item expandable>
  \u6C34\u679C(\u70B9\u6211)
  <fc-tree-item slot="item">\u897F\u7EA2\u67FF</fc-tree-item>
</fc-tree-item>

<h4>before</h4>
<fc-tree-item><span slot="before">\u{1F345}</span>\u897F\u7EA2\u67FF</fc-tree-item>

<h4>after</h4>
<fc-tree-item hasChild="false"><span slot="after">\u{1F345}</span>\u897F\u7EA2\u67FF</fc-tree-item>

<h4>\u9ED8\u8BA4\u5C55\u5F00</h4>
<fc-tree-item expanded>
  \u6C34\u679C(\u70B9\u6211)
  <fc-tree-item slot="item">\u897F\u7EA2\u67FF</fc-tree-item>
</fc-tree-item>
`,Ia=`:host {
  display: flex;
  /*padding: var(--padding);*/
}
:host(:focus) {
  outline: none;
}

:host(:not(:disabled)) :is(.control, .expand-collapse-button) {
  cursor: pointer;
}

:host(:focus-visible) {
  outline: none;
}
:host(:focus-visible)::after {
  content: none;
}

.expand-collapse-button {
  display: flex;
  justify-content: center;
  align-self: flex-start;
  align-items: center;
  box-sizing: border-box;
  min-width: calc(var(--font-size) * var(--line-height));
  min-height: calc(var(--font-size) * var(--line-height));
}

.arrow-right {
  font-size: var(--font-size);
}

.content {
  flex: 1;
}

.control {
  position: relative;
  color: inherit;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  --padding-t: 0;
  --padding-b: 0;
  font-size: inherit;
  padding: var(--padding-t) var(--padding-r) var(--padding-b) var(--padding-l);
  --outline-offset: 0px;
}

:host([selectable]) .control {
  user-select: none;
}

.control:hover {
  background: var(--background-hover);
}

.group {
  display: block;
}

:host([selected]) .control {
  color: var(--foreground-selected);
  background: var(--background-selected);
}

:host([disabled]) {
  cursor: not-allowed;
}
:host([disabled]) .control,
:host([disabled]) .control:hover {
  color: var(--foreground-disabled);
  background-color: var(--background-disabled);
  background-color: transparent;
}

:host([selected][disabled]) .control {
  background-color: var(--accent-color-disabled);
}
:host([selected][disabled]) .control:hover {
  background-color: var(--accent-color-disabled);
}

:host([indent]) {
  padding-left: calc(var(--font-size) * var(--line-height));
}
`,Sa=Object.defineProperty,za=Object.getOwnPropertyDescriptor,B=(e,t,n,i)=>{for(var o=i>1?void 0:i?za(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&Sa(t,n,o),o};const We=e=>e instanceof HTMLElement&&e.nodeName.toLowerCase()==="fc-tree-item";let S=class extends w{constructor(){super(...arguments);this.role="treeitem",this.value="",this.disabled=!1,this.selectable=!0,this.selected=!1,this.hasChild=!1,this.indent=!1,this.expanded=!1,this.expandable=!1,this.forceIcon=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-expanded",String(this.hasAttribute("expanded"))),p(this,"keydown",this.handleKeydown)}focusItem(e=!0){this.toggleAttribute("focused",e),e?this.focus():this.blur()}itemsChanged(e,t){t.forEach(n=>{n.slot="item"}),this.hasChild=t.length>0}selectedChanged(e,t){this.emit("selectionChange",{old:e,next:t})}expandedChanged(e,t){this.emit("expand"),this.setAttribute("aria-expanded",String(t))}handleTitleClick(e){e.preventDefault(),this.disabled||(this.expandable&&(this.expanded=!this.expanded),this.selectable&&(this.selected=!this.selected))}handleButtonClick(e){e.stopPropagation(),this.disabled||(this.expanded=!this.expanded)}handleKeydown(e){this.disabled||e.target!==this||(e.key==="Enter"&&(e.preventDefault(),this.selected=!this.selected),e.key===" "&&(e.preventDefault(),this.expanded=!this.expanded))}render(){const e=d`
      <svg class="arrow-right" viewBox="0 0 12 12" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
        <path d="m9 6-6 5.5V.5z" fill-rule="evenodd" />
      </svg>
    `,t=d`<svg
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      xmlns:v="https://vecta.io/nano"
    >
      <path d="M6 9L.5 3h11z" fill-rule="evenodd" />
    </svg>`;return d`
      ${$()}
      ${this.hasChild?d`
            <div role="button" class="expand-collapse-button" @click="${this.handleButtonClick}">
              <slot name="expand-collapse-button">
                ${this.expanded?d`<slot name="expand-button">${t}</slot>`:d`<slot name="collapse-button">${e}</slot>`}
              </slot>
            </div>
          `:null}
      <div class="content" part="content">
        <div class="control fc-inner-outline" part="control" @click="${this.handleTitleClick}">
          <slot></slot>
        </div>
        ${this.expanded?d`<div role="group" class="group" part="group">
              <slot name="item"></slot>
            </div>`:null}
      </div>
      ${E()}
    `}};S.styles=m(Ia);B([l({initCallback:!0}),ye("fc-tree-item")],S.prototype,"items",2);B([l({reflect:!0})],S.prototype,"role",2);B([l()],S.prototype,"value",2);B([l({reflect:!0})],S.prototype,"disabled",2);B([l({reflect:!0})],S.prototype,"selectable",2);B([l({reflect:!0,converter(e,t){return!t.disabled&&e}})],S.prototype,"selected",2);B([l({attribute:!1,reflect:!0,initCallback:!0})],S.prototype,"hasChild",2);B([l({reflect:!0})],S.prototype,"indent",2);B([l({reflect:!0,initCallback:!0})],S.prototype,"expanded",2);B([l({reflect:!0})],S.prototype,"expandable",2);B([l({reflect:!0})],S.prototype,"forceIcon",2);S=B([g("fc-tree-item")],S);var Pa={parameters:{storySource:{source:`import book from './book.html?raw'

import './index'

export default { title: 'Tree Item', order: 1 }

export const TreeItem = () => book
`,locationsMap:{"tree-item":{startLoc:{col:24,line:7},endLoc:{col:34,line:7},startBody:{col:24,line:7},endBody:{col:34,line:7}}}}},title:"Tree Item",order:1};const La=()=>Aa,Ta=["TreeItem"];var Da=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Pa,TreeItem:La,__namedExportsOrder:Ta}),Ma=`<h4>\u9ED8\u8BA4</h4>
<fc-tree-view>
  <fc-tree-item>
    <span>\u6C34\u679C</span>
    <fc-tree-item><span slot="before">\u{1F34E}</span>\u82F9\u679C</fc-tree-item>
    <fc-tree-item><span slot="before">\u{1F34A}</span>\u6A58\u5B50</fc-tree-item>
    <fc-tree-item><span slot="before">\u{1F34C}</span>\u9999\u8549</fc-tree-item>
  </fc-tree-item>
  <fc-tree-item>
    <span>\u852C\u83DC</span>
    <fc-tree-item>
      <span>\u8304\u679C\u7C7B</span>
      <fc-tree-item><span slot="before">\u{1F346}</span>\u8304\u5B50</fc-tree-item>
      <fc-tree-item><span slot="before">\u{1F345}</span>\u897F\u7EA2\u67FF</fc-tree-item>
      <fc-tree-item disabled><span slot="before">\u{1F952}</span>\u9EC4\u74DC</fc-tree-item>
      <fc-tree-item><span slot="before">\u{1F383}</span>\u5357\u74DC</fc-tree-item>
    </fc-tree-item>
    <fc-tree-item>
      <span>\u6839\u830E\u7C7B</span>
      <fc-tree-item><span slot="before">\u{1F955}</span>\u80E1\u841D\u535C</fc-tree-item>
      <fc-tree-item><span slot="before">\u{1F33D}</span>\u7389\u7C73</fc-tree-item>
      <fc-tree-item><span slot="before">\u{1F360}</span>\u5730\u74DC</fc-tree-item>
      <fc-tree-item><span slot="before">\u{1F954}</span>\u571F\u8C46</fc-tree-item>
    </fc-tree-item>
  </fc-tree-item>
  <fc-tree-item>\u7CAE\u6CB9</fc-tree-item>
</fc-tree-view>

<h4>\u9ED8\u8BA4\u5C55\u5F00</h4>
<fc-tree-view>
  <fc-tree-item expanded>
    <span>\u6C34\u679C</span>
    <fc-tree-item><span slot="before">\u{1F34E}</span>\u82F9\u679C</fc-tree-item>
    <fc-tree-item><span slot="before">\u{1F34A}</span>\u6A58\u5B50</fc-tree-item>
    <fc-tree-item><span slot="before">\u{1F34C}</span>\u9999\u8549</fc-tree-item>
  </fc-tree-item>
  <fc-tree-item>
    <span>\u852C\u83DC</span>
    <fc-tree-item>
      <span>\u8304\u679C\u7C7B</span>
      <fc-tree-item><span slot="before">\u{1F346}</span>\u8304\u5B50</fc-tree-item>
      <fc-tree-item><span slot="before">\u{1F345}</span>\u897F\u7EA2\u67FF</fc-tree-item>
      <fc-tree-item disabled><span slot="before">\u{1F952}</span>\u9EC4\u74DC</fc-tree-item>
      <fc-tree-item><span slot="before">\u{1F383}</span>\u5357\u74DC</fc-tree-item>
    </fc-tree-item>
    <fc-tree-item>
      <span>\u6839\u830E\u7C7B</span>
      <fc-tree-item><span slot="before">\u{1F955}</span>\u80E1\u841D\u535C</fc-tree-item>
      <fc-tree-item><span slot="before">\u{1F33D}</span>\u7389\u7C73</fc-tree-item>
      <fc-tree-item><span slot="before">\u{1F360}</span>\u5730\u74DC</fc-tree-item>
      <fc-tree-item><span slot="before">\u{1F954}</span>\u571F\u8C46</fc-tree-item>
    </fc-tree-item>
  </fc-tree-item>
  <fc-tree-item>\u7CAE\u6CB9</fc-tree-item>
</fc-tree-view>

<h4>\u9ED8\u8BA4\u503C</h4>
<fc-tree-view value="banana">
  <fc-tree-item expanded>
    <span>\u6C34\u679C</span>
    <fc-tree-item><span slot="before">\u{1F34E}</span>\u82F9\u679C</fc-tree-item>
    <fc-tree-item><span slot="before">\u{1F34A}</span>\u6A58\u5B50</fc-tree-item>
    <fc-tree-item value="banana"><span slot="before">\u{1F34C}</span>\u9999\u8549</fc-tree-item>
  </fc-tree-item>
</fc-tree-view>

<h4>\u9ED8\u8BA4\u9009\u4E2D</h4>
<fc-tree-view>
  <fc-tree-item expanded>
    <span>\u6C34\u679C</span>
    <fc-tree-item selected><span slot="before">\u{1F34E}</span>\u82F9\u679C</fc-tree-item>
    <fc-tree-item><span slot="before">\u{1F34A}</span>\u6A58\u5B50</fc-tree-item>
    <fc-tree-item value="banana"><span slot="before">\u{1F34C}</span>\u9999\u8549</fc-tree-item>
  </fc-tree-item>
</fc-tree-view>

<h4>\u6807\u9898\u53EF\u5C55\u5F00</h4>
<fc-tree-view>
  <fc-tree-item expandable>
    <span>\u6C34\u679C</span>
    <fc-tree-item selected><span slot="before">\u{1F34E}</span>\u82F9\u679C</fc-tree-item>
    <fc-tree-item><span slot="before">\u{1F34A}</span>\u6A58\u5B50</fc-tree-item>
    <fc-tree-item value="banana"><span slot="before">\u{1F34C}</span>\u9999\u8549</fc-tree-item>
  </fc-tree-item>
  <fc-tree-item readonly expandable>
    <span>\u852C\u83DC</span>
    <fc-tree-item><span slot="before">\u{1F346}</span>\u8304\u5B50</fc-tree-item>
    <fc-tree-item><span slot="before">\u{1F345}</span>\u897F\u7EA2\u67FF</fc-tree-item>
    <fc-tree-item disabled><span slot="before">\u{1F952}</span>\u9EC4\u74DC</fc-tree-item>
    <fc-tree-item><span slot="before">\u{1F383}</span>\u5357\u74DC</fc-tree-item>
  </fc-tree-item>
</fc-tree-view>

<h4>\u4E0D\u53EF\u9009</h4>
<fc-tree-view>
  <fc-tree-item expanded readonly>
    <span>\u6C34\u679C(\u4E0D\u53EF\u9009)</span>
    <fc-tree-item selected><span slot="before">\u{1F34E}</span>\u82F9\u679C</fc-tree-item>
    <fc-tree-item><span slot="before">\u{1F34A}</span>\u6A58\u5B50</fc-tree-item>
    <fc-tree-item value="banana" readonly><span slot="before">\u{1F34C}</span>\u9999\u8549(\u4E0D\u53EF\u9009)</fc-tree-item>
  </fc-tree-item>
</fc-tree-view>
`,ja=`:host {
  display: block;
}
:host::after {
  content: none;
}
`,Ba=Object.defineProperty,Ra=Object.getOwnPropertyDescriptor,je=(e,t,n,i)=>{for(var o=i>1?void 0:i?Ra(t,n):t,r=e.length-1,a;r>=0;r--)(a=e[r])&&(o=(i?a(t,n,o):a(o))||o);return i&&o&&Ba(t,n,o),o},Fa=(e,t,n)=>{if(!t.has(e))throw TypeError("Cannot "+n)},Zt=(e,t,n)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,n)},en=(e,t,n)=>(Fa(e,t,"access private method"),n),pt,tn,ht,nn;let me=class extends w{constructor(){super(...arguments);Zt(this,pt),Zt(this,ht),this.role="tree",this.value=""}connectedCallback(){super.connectedCallback(),p(this,"selectionChange",this.handleSelectionChange),p(this,"keydown",this.handleKeydown),this.updateComplete.then(()=>{var e;((e=this.items)==null?void 0:e.length)&&Ee(this.items,1,!1)})}valueChanged(e,t){var n,i;if(!!t&&((n=this.selectedItem)==null?void 0:n.value)!==t){const o=(i=this.items)==null?void 0:i.find(r=>r.value===t);if(!o)return;typeof e=="string"?o.toggleAttribute("selected",!0):this.updateComplete.then(()=>{o.toggleAttribute("selected",!0)})}}selectedItemChanged(e,t){e&&(e.selected=!1,e.tabIndex=-1),t&&(t.selected=!0,t.tabIndex=0)}get focusableItems(){return Array.from(this.querySelectorAll(':not([aria-expanded="false"]) > fc-tree-item')).filter(t=>{var n;return!((n=t.parentElement)==null?void 0:n.closest('[aria-expanded="false"]'))})}handleSelectionChange(e){const{target:t}=e;We(t)&&t.selected&&(this.selectedItem=t)}handleKeydown(e){switch(e.key){case"ArrowDown":{e.preventDefault(),this.focusNext(1);break}case"ArrowUp":{e.preventDefault(),this.focusNext(-1);break}case"ArrowRight":{en(this,pt,tn).call(this,e);break}case"ArrowLeft":{en(this,ht,nn).call(this,e);break}}}focusNext(e){this.focusableItems&&(this.focus(),Ae(this.focusableItems,e))}render(){return d`<slot></slot>`}};pt=new WeakSet;tn=function(e){var n;const{target:t}=e;!(We(t)&&((n=t.items)==null?void 0:n.length))||(e.preventDefault(),this.focus(),t.expanded=!0,t.updateComplete.then(()=>{var i;(i=t.items)==null||i[0].focus()}))};ht=new WeakSet;nn=function(e){const{target:t}=e;if(!!We(t))if(e.preventDefault(),this.focus(),t.expanded)t.expanded=!1,t.focusItem(!0);else{const{parentElement:n}=t;n&&We(n)&&n.focusItem(!0)}};me.styles=m(ja);je([ye("fc-tree-item")],me.prototype,"items",2);je([l({reflect:!0})],me.prototype,"role",2);je([l()],me.prototype,"value",2);je([l()],me.prototype,"selectedItem",2);me=je([g("fc-tree-view")],me);var Va={parameters:{storySource:{source:`import book from './book.html?raw'

import './index'

export default { title: 'Tree View', order: 1 }

export const treeView = () => book
`,locationsMap:{"tree-view":{startLoc:{col:24,line:7},endLoc:{col:34,line:7},startBody:{col:24,line:7},endBody:{col:34,line:7}}}}},title:"Tree View",order:1};const Na=()=>Ma,Ka=["treeView"];var qa=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Va,treeView:Na,__namedExportsOrder:Ka});const Ha=[$n];Ha.forEach(e=>{Object.keys(e).forEach(t=>{const n=e[t];switch(t){case"args":case"argTypes":return _n.warn("Invalid args/argTypes in config, ignoring.",JSON.stringify(n));case"decorators":return n.forEach(i=>Cn(i,!1));case"loaders":return n.forEach(i=>kn(i,!1));case"parameters":return It(ve({},n),!1);case"argTypesEnhancers":return n.forEach(i=>wn(i));case"argsEnhancers":return n.forEach(i=>xn(i));case"globals":case"globalTypes":{const i={};return i[t]=n,It(i,!1)}default:return console.log(t+" was not supported :( !")}})});On(()=>[ao,bo,Lo,Go,ti,si,vi,Ei,Di,Fi,Hi,er,hr,wr,Tr,Hr,Xr,ta,ma,Ea,Da,qa].filter(e=>e.default),{hot:!1},!1);
//# sourceMappingURL=iframe.23e1c2fd.js.map
