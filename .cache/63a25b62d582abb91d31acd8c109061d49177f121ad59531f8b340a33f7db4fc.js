{"source":"webpackHotUpdate(0,{\"./src/page/Brand/List.jsx\":function(e,t,n){\"use strict\";n.r(t);var r,o=n(\"./node_modules/react/index.js\"),i=n.n(o),a=n(\"./node_modules/mobx-react/index.module.js\"),c=n(\"./src/component/PageHeader/index.js\");function u(e){return(u=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&\"function\"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?\"symbol\":typeof e})(e)}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,\"value\"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e,t){return!t||\"object\"!==u(t)&&\"function\"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\")}(e):t}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var b=Object(a.inject)(\"BrandModel\")(r=Object(a.observer)(r=function(e){function a(){var e,t;!function(e,t){if(!(e instanceof t))throw new TypeError(\"Cannot call a class as a function\")}(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(t=s(this,(e=l(a)).call.apply(e,[this].concat(r)))).state={breadcrumbItems:[{name:\"品牌商管理\"},{name:\"品牌商列表\"}]},t.handleSearchBrandList=function(){(0,t.props.BrandModel.queryBrandList)()},t}var t,n,r;return function(e,t){if(\"function\"!=typeof t&&null!==t)throw new TypeError(\"Super expression must either be null or a function\");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(a,o[\"Component\"]),t=a,(n=[{key:\"componentDidMount\",value:function(){this.init()}},{key:\"init\",value:function(){this.handleSearchBrandList()}},{key:\"render\",value:function(){var e=this.state.breadcrumbItems;return i.a.createElement(\"div\",{className:\"view-container\"},i.a.createElement(c.default,{title:\"品牌商列表\",extraBreadcrumbItems:e}),\"BrandListPage\")}}])&&f(t.prototype,n),r&&f(t,r),a}())||r)||r;t.default=b}});"}