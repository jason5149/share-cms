{"source":"webpackHotUpdate(\"bundle\",{\"./src/Layout.jsx\":function(e,t,n){\"use strict\";n.r(t);n(\"./node_modules/antd/lib/layout/style/css.js\");var o,r=n(\"./node_modules/antd/lib/layout/index.js\"),c=n.n(r),l=n(\"./node_modules/react/index.js\"),u=n.n(l),i=n(\"./node_modules/react-router-dom/es/index.js\"),a=n(\"./node_modules/mobx-react/index.module.js\"),s=n(\"./src/util/const.js\"),f=n(\"./src/component/AsyncComponent/index.js\"),p=n(\"./src/component/GlobalHeader/index.js\"),d=n(\"./src/component/MenuList/index.js\");function m(e){return(m=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&\"function\"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?\"symbol\":typeof e})(e)}function b(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,\"value\"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function y(e,t){return!t||\"object\"!==m(t)&&\"function\"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\")}(e):t}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function j(e,t){return(j=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var E=c.a.Header,v=c.a.Content,O=c.a.Footer,_=c.a.Sider,g=Object(f.default)(function(){return n.e(1).then(n.bind(null,\"./src/page/Home.jsx\"))}),w=Object(f.default)(function(){return n.e(0).then(n.bind(null,\"./src/page/Brand/List.jsx\"))}),x=Object(a.inject)(\"GlobalModel\")(o=Object(a.observer)(o=function(e){function a(){var e,n;!function(e,t){if(!(e instanceof t))throw new TypeError(\"Cannot call a class as a function\")}(this,a);for(var t=arguments.length,o=new Array(t),r=0;r<t;r++)o[r]=arguments[r];return(n=y(this,(e=h(a)).call.apply(e,[this].concat(o)))).handleMenuClick=function(e){var t=e.key;t&&n.props.history.push(\"\".concat(s.BASE_PATH).concat(t))},n}var t,n,o;return function(e,t){if(\"function\"!=typeof t&&null!==t)throw new TypeError(\"Super expression must either be null or a function\");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&j(e,t)}(a,l[\"Component\"]),t=a,(n=[{key:\"render\",value:function(){var e=this.props,t=e.match,n=e.GlobalModel,o=t.url,r=n.collapsed,a=n.menuList;return u.a.createElement(c.a,{style:{height:\"100vh\"}},u.a.createElement(_,{className:\"sider-container \".concat(r?\"open\":\"close\"),width:r?80:256,trigger:null,collapsible:!0,collapsed:!r},u.a.createElement(d.default,{data:a,onMenuClick:this.handleMenuClick})),u.a.createElement(c.a,{className:\"layout-container \".concat(r?\"open\":\"close\")},u.a.createElement(E,{className:\"header-container\"},u.a.createElement(p.default,null)),u.a.createElement(v,{className:\"content-container\"},u.a.createElement(i.Switch,null,u.a.createElement(i.Route,{path:\"\".concat(o,\"/home\"),component:g}),u.a.createElement(i.Route,{path:\"\".concat(o,\"/brand/list\"),component:w}))),u.a.createElement(O,{className:\"footer-container\"},\"Ant Design ©2018 Created by Ant UED\")))}}])&&b(t.prototype,n),o&&b(t,o),a}())||o)||o;t.default=x}});"}