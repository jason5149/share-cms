{"source":"webpackHotUpdate(0,{\"./src/component/PageHeader/HeaderBreadcrumb.jsx\":function(e,t,n){\"use strict\";n.r(t);n(\"./node_modules/antd/lib/breadcrumb/style/css.js\");var r=n(\"./node_modules/antd/lib/breadcrumb/index.js\"),a=n.n(r),c=n(\"./node_modules/react/index.js\"),u=n.n(c),i=n(\"./node_modules/react-router-dom/es/index.js\"),l=n(\"./src/util/const.js\");function o(e){return(o=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&\"function\"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?\"symbol\":typeof e})(e)}function f(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||\"[object Arguments]\"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError(\"Invalid attempt to spread non-iterable instance\")}()}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,\"value\"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(e,t){return!t||\"object\"!==o(t)&&\"function\"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\")}(e):t}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var y=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError(\"Cannot call a class as a function\")}(this,t),p(this,b(t).apply(this,arguments))}var n,r,o;return function(e,t){if(\"function\"!=typeof t&&null!==t)throw new TypeError(\"Super expression must either be null or a function\");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(t,c[\"Component\"]),n=t,(r=[{key:\"render\",value:function(){var e=this.props.extraBreadcrumbItems,t=[{name:\"首页\",link:\"\".concat(l.BASE_PATH,\"/app/home\")}].concat(f(e));return u.a.createElement(\"div\",{className:\"page-breadcrumb-container\"},u.a.createElement(a.a,null,t.map(function(e){var t=e.name,n=e.link;return u.a.createElement(a.a.Item,{key:t},n?u.a.createElement(i.Link,{to:n},t):t)})))}}])&&s(n.prototype,r),o&&s(n,o),t}();t.default=y}});"}