/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t.trustedTypes,s=i?i.createPolicy("lit-html",{createHTML:t=>t}):void 0,e="$lit$",n=`lit$${Math.random().toFixed(9).slice(2)}$`,o="?"+n,r=`<${o}>`,l=document,c=()=>l.createComment(""),h=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,d="[ \t\n\f\r]",u=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,p=/-->/g,v=/>/g,$=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),f=/'/g,g=/"/g,b=/^(?:script|style|textarea|title)$/i,m=(t=>(i,...s)=>({_$litType$:t,strings:i,values:s}))(1),y=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),w=new WeakMap,A=l.createTreeWalker(l,129);function x(t,i){if(!a(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s?s.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,o=[];let l,c=2===i?"<svg>":3===i?"<math>":"",h=u;for(let i=0;i<s;i++){const s=t[i];let a,d,m=-1,y=0;for(;y<s.length&&(h.lastIndex=y,d=h.exec(s),null!==d);)y=h.lastIndex,h===u?"!--"===d[1]?h=p:void 0!==d[1]?h=v:void 0!==d[2]?(b.test(d[2])&&(l=RegExp("</"+d[2],"g")),h=$):void 0!==d[3]&&(h=$):h===$?">"===d[0]?(h=l??u,m=-1):void 0===d[1]?m=-2:(m=h.lastIndex-d[2].length,a=d[1],h=void 0===d[3]?$:'"'===d[3]?g:f):h===g||h===f?h=$:h===p||h===v?h=u:(h=$,l=void 0);const _=h===$&&t[i+1].startsWith("/>")?" ":"";c+=h===u?s+r:m>=0?(o.push(a),s.slice(0,m)+e+s.slice(m)+n+_):s+n+(-2===m?i:_)}return[x(t,c+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class k{constructor({strings:t,_$litType$:s},r){let l;this.parts=[];let h=0,a=0;const d=t.length-1,u=this.parts,[p,v]=N(t,s);if(this.el=k.createElement(p,r),A.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(l=A.nextNode())&&u.length<d;){if(1===l.nodeType){if(l.hasAttributes())for(const t of l.getAttributeNames())if(t.endsWith(e)){const i=v[a++],s=l.getAttribute(t).split(n),e=/([.?@])?(.*)/.exec(i);u.push({type:1,index:h,name:e[2],strings:s,ctor:"."===e[1]?S:"?"===e[1]?D:"@"===e[1]?z:I}),l.removeAttribute(t)}else t.startsWith(n)&&(u.push({type:6,index:h}),l.removeAttribute(t));if(b.test(l.tagName)){const t=l.textContent.split(n),s=t.length-1;if(s>0){l.textContent=i?i.emptyScript:"";for(let i=0;i<s;i++)l.append(t[i],c()),A.nextNode(),u.push({type:2,index:++h});l.append(t[s],c())}}}else if(8===l.nodeType)if(l.data===o)u.push({type:2,index:h});else{let t=-1;for(;-1!==(t=l.data.indexOf(n,t+1));)u.push({type:7,index:h}),t+=n.length-1}h++}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===y)return i;let n=void 0!==e?s._$Co?.[e]:s._$Cl;const o=h(i)?void 0:i._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=n:s._$Cl=n),void 0!==n&&(i=M(t,n._$AS(t,i.values),n,e)),i}class T{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,!0);A.currentNode=e;let n=A.nextNode(),o=0,r=0,c=s[0];for(;void 0!==c;){if(o===c.index){let i;2===c.type?i=new E(n,n.nextSibling,this,t):1===c.type?i=new c.ctor(n,c.name,c.strings,this,t):6===c.type&&(i=new U(n,this,t)),this._$AV.push(i),c=s[++r]}o!==c?.index&&(n=A.nextNode(),o++)}return A.currentNode=l,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class E{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),h(t)?t===_||null==t||""===t?(this._$AH!==_&&this._$AR(),this._$AH=_):t!==this._$AH&&t!==y&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>a(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==_&&h(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=k.createElement(x(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else{const t=new T(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t}}_$AC(t){let i=w.get(t.strings);return void 0===i&&w.set(t.strings,i=new k(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const n of t)e===i.length?i.push(s=new E(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(n),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class I{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,n){this.type=1,this._$AH=_,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=_}_$AI(t,i=this,s,e){const n=this.strings;let o=!1;if(void 0===n)t=M(this,t,i,0),o=!h(t)||t!==this._$AH&&t!==y,o&&(this._$AH=t);else{const e=t;let r,l;for(t=n[0],r=0;r<n.length-1;r++)l=M(this,e[s+r],i,r),l===y&&(l=this._$AH[r]),o||=!h(l)||l!==this._$AH[r],l===_?t=_:t!==_&&(t+=(l??"")+n[r+1]),this._$AH[r]=l}o&&!e&&this.j(t)}j(t){t===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class S extends I{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===_?void 0:t}}class D extends I{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==_)}}class z extends I{constructor(t,i,s,e,n){super(t,i,s,e,n),this.type=5}_$AI(t,i=this){if((t=M(this,t,i,0)??_)===y)return;const s=this._$AH,e=t===_&&s!==_||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==_&&(s===_||e);e&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class U{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}}const j=t.litHtmlPolyfillSupport;j?.(k,E),(t.litHtmlVersions??=[]).push("3.3.0");const C=1,R=3,Z=4;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class F{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,s){this._$Ct=t,this._$AM=i,this._$Ci=s}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const H={},L=(t=>(...i)=>({_$litDirective$:t,values:i}))(class extends F{constructor(t){if(super(t),t.type!==R&&t.type!==C&&t.type!==Z)throw Error("The `live` directive is not allowed on child or event bindings");if(!(t=>void 0===t.strings)(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[i]){if(i===y||i===_)return i;const s=t.element,e=t.name;if(t.type===R){if(i===s[e])return y}else if(t.type===Z){if(!!i===s.hasAttribute(e))return y}else if(t.type===C&&s.getAttribute(e)===i+"")return y;return((t,i=H)=>{t._$AH=i;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */})(t),i}});let O="shortest",P="3rem",V="6",W=O,q="1234",B="5rem",G="400";const J=["200","400","600","800","1000"],K=["0","1","2","3","4","5","6"],Q=["forward","backward","shortest"],X=["1rem","2rem","3rem","4rem","5rem","6rem"],Y=t=>{V=t.target.value,ht()},tt=t=>{W=t.target.value,ht()},it=t=>{B=t.target.value,ht()},st=t=>{G=t.target.value,ht()},et=()=>{q=(parseInt(q)-1).toString(),ht()},nt=()=>{q=(parseInt(q)+1).toString(),ht()},ot=()=>{q=((t=0)=>{const i=0===t?6:t,s=Math.floor(Math.random()*(i-3+1))+3,e=10**(s-1),n=10**s-1;return Math.floor(Math.random()*(n-e+1))+e})(Number(V)).toString(),ht()},rt=()=>m`
  <div id="playground-container">
    <div id="playground-preview">
      <digit-spinner
        id="dynamic-spinner"
        class="dynamic"
        .direction=${W}
        .duration=${Number(G)}
        .minDigits=${Number(V)}
        .value=${Number(q)}
        style="--spinner-font-size: ${B}"
      ></digit-spinner>
    </div>

    <div id="playground-code-output">
      <h2>Code Preview</h2>
      <pre><code>${ct()}</code></pre>
    </div>

    <div id="playground-controls">
      <div
        role="group"
        aria-labelledby="spinner-value-label"
        class="control-group"
      >
        <span id="spinner-value-label" class="control-group__label">
          Spinner Value
        </span>
        <div class="control">
          <button
            class="btn btn-dark btn-decrement"
            type="button"
            @click=${et}
          >
            <span class="icon">-</span>
            <span class="label">Decrement</span>
          </button>
        </div>

        <div class="control">
          <button
            class="btn btn-dark btn-random"
            type="button"
            @click=${ot}
          >
            <span class="icon">🎲</span>
            <span class="label">Random</span>
          </button>
        </div>

        <div class="control">
          <button
            class="btn btn-dark btn-increment"
            type="button"
            @click=${nt}
          >
            <span class="icon">+</span>
            <span class="label">Increment</span>
          </button>
        </div>
      </div>

      <div class="control">
        <label for="font-select">Font Size</label>
        <select
          id="font-select"
          class="form-select"
          @change=${it}
          .value=${L(B)}
        >
          ${X.map((t=>m`<option value="${t}" ?selected=${t===B}>
                ${t}${t===P?" (default)":null}
              </option>`))}
        </select>
      </div>

      <div class="control">
        <label for="min-digits-select">Min. Digits</label>
        <select
          id="min-digits-select"
          class="form-select"
          @change=${Y}
          .value=${L(V)}
        >
          ${K.map((t=>m`<option
                value="${t}"
                ?selected=${t===V}
                ?disabled=${"0"!==t&&q.length>t}
              >
                ${t}${"0"===t?" (default)":null}
              </option>`))}
        </select>
      </div>

      <div class="control">
        <label for="direction-select">Animation Direction</label>
        <select
          id="direction-select"
          class="form-select"
          @change=${tt}
          .value=${L(W)}
        >
          ${Q.map((t=>m`<option
                value="${t}"
                ?selected=${t===W}
              >
                ${lt(t)}${t===O?" (default)":null}
              </option>`))}
        </select>
      </div>

      <div class="control">
        <label for="animation-duration">Animation Duration</label>
        <select
          id="animation-duration"
          class="form-select"
          @change=${st}
          .value=${L(G)}
        >
          ${J.map((t=>m`<option
                value="${t}"
                ?selected=${t===G}
              >
                ${t}ms${"200"===t?" (default)":null}
              </option>`))}
        </select>
      </div>
    </div>
    <!-- #playground-controls -->
  </div>
  <!-- #playground-container -->
`,lt=t=>t[0].toUpperCase()+t.substring(1),ct=()=>{const t=(()=>{const t=[];return W!==O&&t.push(`direction="${W}"`),Number(G)!==Number("200")&&t.push(`duration="${G}"`),Number(V)!==Number("0")&&t.push(`min-digits="${V}"`),B!==P&&t.push(`style="--spinner-font-size: ${B}"`),t.push(`value="${q}"`),t})();return m`
    &lt;digit-spinner${t.map((t=>m`${"\n"}${"\t"}${t}`))}&gt;
    &lt;/digit-spinner&gt;
  `},ht=()=>{((t,i)=>{const s=i;let e=s._$litPart$;if(void 0===e){const t=null;s._$litPart$=e=new E(i.insertBefore(c(),t),t,void 0,{})}e._$AI(t)})(rt(),document.getElementById("app"))};ht();
