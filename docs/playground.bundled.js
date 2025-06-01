/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t.trustedTypes,s=i?i.createPolicy("lit-html",{createHTML:t=>t}):void 0,e="$lit$",n=`lit$${Math.random().toFixed(9).slice(2)}$`,o="?"+n,r=`<${o}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,h=Array.isArray,d="[ \t\n\f\r]",u=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,p=/>/g,$=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),f=/'/g,g=/"/g,b=/^(?:script|style|textarea|title)$/i,m=(t=>(i,...s)=>({_$litType$:t,strings:i,values:s}))(1),y=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),A=new WeakMap,w=l.createTreeWalker(l,129);function x(t,i){if(!h(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s?s.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,o=[];let l,c=2===i?"<svg>":3===i?"<math>":"",a=u;for(let i=0;i<s;i++){const s=t[i];let h,d,m=-1,y=0;for(;y<s.length&&(a.lastIndex=y,d=a.exec(s),null!==d);)y=a.lastIndex,a===u?"!--"===d[1]?a=v:void 0!==d[1]?a=p:void 0!==d[2]?(b.test(d[2])&&(l=RegExp("</"+d[2],"g")),a=$):void 0!==d[3]&&(a=$):a===$?">"===d[0]?(a=l??u,m=-1):void 0===d[1]?m=-2:(m=a.lastIndex-d[2].length,h=d[1],a=void 0===d[3]?$:'"'===d[3]?g:f):a===g||a===f?a=$:a===v||a===p?a=u:(a=$,l=void 0);const _=a===$&&t[i+1].startsWith("/>")?" ":"";c+=a===u?s+r:m>=0?(o.push(h),s.slice(0,m)+e+s.slice(m)+n+_):s+n+(-2===m?i:_)}return[x(t,c+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class k{constructor({strings:t,_$litType$:s},r){let l;this.parts=[];let a=0,h=0;const d=t.length-1,u=this.parts,[v,p]=N(t,s);if(this.el=k.createElement(v,r),w.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(l=w.nextNode())&&u.length<d;){if(1===l.nodeType){if(l.hasAttributes())for(const t of l.getAttributeNames())if(t.endsWith(e)){const i=p[h++],s=l.getAttribute(t).split(n),e=/([.?@])?(.*)/.exec(i);u.push({type:1,index:a,name:e[2],strings:s,ctor:"."===e[1]?S:"?"===e[1]?D:"@"===e[1]?z:I}),l.removeAttribute(t)}else t.startsWith(n)&&(u.push({type:6,index:a}),l.removeAttribute(t));if(b.test(l.tagName)){const t=l.textContent.split(n),s=t.length-1;if(s>0){l.textContent=i?i.emptyScript:"";for(let i=0;i<s;i++)l.append(t[i],c()),w.nextNode(),u.push({type:2,index:++a});l.append(t[s],c())}}}else if(8===l.nodeType)if(l.data===o)u.push({type:2,index:a});else{let t=-1;for(;-1!==(t=l.data.indexOf(n,t+1));)u.push({type:7,index:a}),t+=n.length-1}a++}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===y)return i;let n=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=n:s._$Cl=n),void 0!==n&&(i=M(t,n._$AS(t,i.values),n,e)),i}class T{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,!0);w.currentNode=e;let n=w.nextNode(),o=0,r=0,c=s[0];for(;void 0!==c;){if(o===c.index){let i;2===c.type?i=new E(n,n.nextSibling,this,t):1===c.type?i=new c.ctor(n,c.name,c.strings,this,t):6===c.type&&(i=new U(n,this,t)),this._$AV.push(i),c=s[++r]}o!==c?.index&&(n=w.nextNode(),o++)}return w.currentNode=l,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class E{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===_||null==t||""===t?(this._$AH!==_&&this._$AR(),this._$AH=_):t!==this._$AH&&t!==y&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>h(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==_&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=k.createElement(x(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else{const t=new T(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new k(t)),i}k(t){h(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const n of t)e===i.length?i.push(s=new E(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(n),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class I{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,n){this.type=1,this._$AH=_,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=_}_$AI(t,i=this,s,e){const n=this.strings;let o=!1;if(void 0===n)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==y,o&&(this._$AH=t);else{const e=t;let r,l;for(t=n[0],r=0;r<n.length-1;r++)l=M(this,e[s+r],i,r),l===y&&(l=this._$AH[r]),o||=!a(l)||l!==this._$AH[r],l===_?t=_:t!==_&&(t+=(l??"")+n[r+1]),this._$AH[r]=l}o&&!e&&this.j(t)}j(t){t===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class S extends I{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===_?void 0:t}}class D extends I{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==_)}}class z extends I{constructor(t,i,s,e,n){super(t,i,s,e,n),this.type=5}_$AI(t,i=this){if((t=M(this,t,i,0)??_)===y)return;const s=this._$AH,e=t===_&&s!==_||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==_&&(s===_||e);e&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class U{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}}const j=t.litHtmlPolyfillSupport;j?.(k,E),(t.litHtmlVersions??=[]).push("3.3.0");const R=1,C=3,Z=4;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class F{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,s){this._$Ct=t,this._$AM=i,this._$Ci=s}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const H={},L=(t=>(...i)=>({_$litDirective$:t,values:i}))(class extends F{constructor(t){if(super(t),t.type!==C&&t.type!==R&&t.type!==Z)throw Error("The `live` directive is not allowed on child or event bindings");if(!(t=>void 0===t.strings)(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[i]){if(i===y||i===_)return i;const s=t.element,e=t.name;if(t.type===C){if(i===s[e])return y}else if(t.type===Z){if(!!i===s.hasAttribute(e))return y}else if(t.type===R&&s.getAttribute(e)===i+"")return y;return((t,i=H)=>{t._$AH=i;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */})(t),i}});let O="shortest",V="3rem",W="6",q=O,B="1234",G="5rem",J="400";const K=["200","400","600","800","1000"],P=["0","1","2","3","4","5","6"],Q=["forward","backward","shortest"],X=["2rem","3rem","4rem","5rem","6rem"],Y=t=>{W=t.target.value,at()},tt=t=>{q=t.target.value,at()},it=t=>{G=t.target.value,at()},st=()=>{B=(parseInt(B)-1).toString(),at()},et=()=>{B=(parseInt(B)+1).toString(),at()},nt=()=>{B=((t=0)=>{const i=0===t?6:t,s=Math.floor(Math.random()*(i-3+1))+3,e=10**(s-1),n=10**s-1;return Math.floor(Math.random()*(n-e+1))+e})(Number(W)).toString(),at()},ot=t=>{J=t.target.value,at()},rt=()=>m`
  <div id="playground-container">
    <div id="playground-preview">
      <digit-spinner
        id="dynamic-spinner"
        class="dynamic"
        .direction=${q}
        .duration=${Number(J)}
        .minDigits=${Number(W)}
        .value=${Number(B)}
        style="--spinner-font-size: ${G}"
      ></digit-spinner>
    </div>

    <div id="playground-code-output">
      <code> ${ct()} </code>
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
            @click=${st}
          >
            <span class="icon">-</span>
            <span class="label">Decrement</span>
          </button>
        </div>

        <div class="control">
          <button
            class="btn btn-dark btn-random"
            type="button"
            @click=${nt}
          >
            <span class="icon">🎲</span>
            <span class="label">Random</span>
          </button>
        </div>

        <div class="control">
          <button
            class="btn btn-dark btn-increment"
            type="button"
            @click=${et}
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
          .value=${L(G)}
        >
          ${X.map((t=>m`<option value="${t}" ?selected=${t===G}>
                ${t}${t===V?" (default)":null}
              </option>`))}
        </select>
      </div>

      <div class="control">
        <label for="min-digits-select">Min. Digits</label>
        <select
          id="min-digits-select"
          class="form-select"
          @change=${Y}
          .value=${L(W)}
        >
          ${P.map((t=>m`<option
                value="${t}"
                ?selected=${t===W}
                ?disabled=${"0"!==t&&B.length>t}
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
          .value=${L(q)}
        >
          ${Q.map((t=>m`<option
                value="${t}"
                ?selected=${t===q}
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
          @change=${ot}
          .value=${L(J)}
        >
          ${K.map((t=>m`<option
                value="${t}"
                ?selected=${t===J}
              >
                ${t}ms${"200"===t?" (default)":null}
              </option>`))}
        </select>
      </div>
    </div>
    <!-- #playground-controls -->
  </div>
  <!-- #playground-container -->
`,lt=t=>t[0].toUpperCase()+t.substring(1),ct=()=>{const t=(()=>{const t="\n  ",i=[];return q!==O&&(i.push(`direction="${q}"`),i.push(t)),Number(J)!==Number("200")&&(i.push(`duration="${J}"`),i.push(t)),Number(W)!==Number("0")&&(i.push(`min-digits="${W}"`),i.push(t)),G!==V&&(i.push(`style="--spinner-font-size: ${G}"`),i.push(t)),i.push(`value="${B}"`),i})();return m`
    &lt;digit-spinner
    ${t.map((t=>m`${t}`))}&gt;&lt;/digit-spinner&gt;
  `},at=()=>{((t,i)=>{const s=i;let e=s._$litPart$;if(void 0===e){const t=null;s._$litPart$=e=new E(i.insertBefore(c(),t),t,void 0,{})}e._$AI(t)})(rt(),document.getElementById("app"))};at();
