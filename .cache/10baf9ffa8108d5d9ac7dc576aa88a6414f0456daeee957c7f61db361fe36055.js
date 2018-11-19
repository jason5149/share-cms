{"source":"webpackHotUpdate(0,{\"./src/page/Brand/List.jsx\":function(e,t,n){\"use strict\";n.r(t);var o,r=n(\"./node_modules/react/index.js\"),u=n.n(r),a=n(\"./node_modules/mobx-react/index.module.js\"),l=n(\"./src/component/PageHeader/index.js\"),s=n(\"./src/component/PageContent/index.js\"),f=n(\"./src/component/PageTable/index.js\");function i(e){return(i=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&\"function\"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?\"symbol\":typeof e})(e)}function c(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,\"value\"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function d(e,t){return!t||\"object\"!==i(t)&&\"function\"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\")}(e):t}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function b(e,t){return(b=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var m=Object(a.inject)(\"BrandModel\")(o=Object(a.observer)(o=function(e){function a(){var e,t;!function(e,t){if(!(e instanceof t))throw new TypeError(\"Cannot call a class as a function\")}(this,a);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(t=d(this,(e=p(a)).call.apply(e,[this].concat(o)))).state={breadcrumbItems:[{name:\"品牌商管理\"},{name:\"品牌商列表\"}],actionsListColumn:[{title:\"操作\",dataIndex:\"actions\",key:\"actions\"}]},t.handleSearchBrandList=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:1;(0,t.props.BrandModel.queryBrandList)({currentPage:e,pageSize:10})},t.handlePageChange=function(e){console.log(e)},t}var t,n,o;return function(e,t){if(\"function\"!=typeof t&&null!==t)throw new TypeError(\"Super expression must either be null or a function\");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&b(e,t)}(a,r[\"Component\"]),t=a,(n=[{key:\"componentDidMount\",value:function(){this.init()}},{key:\"init\",value:function(){this.handleSearchBrandList()}},{key:\"render\",value:function(){var e=this.props.BrandModel,t=this.state,n=t.breadcrumbItems,o=t.actionsListColumn,r=e.brandList,a=e.brandListTotal,i=e.brandListColumn,c=e.brandListPageNum;return u.a.createElement(\"div\",{className:\"view-container\"},u.a.createElement(l.default,{title:\"品牌商列表\",extraBreadcrumbItems:n}),u.a.createElement(s.default,null,u.a.createElement(f.default,{rowKey:\"id\",total:a,columns:i.concat(o),pageNum:c,pageSize:10,dataSource:r,onPageChange:this.handlePageChange})))}}])&&c(t.prototype,n),o&&c(t,o),a}())||o)||o;t.default=m}});"}