{"source":"webpackHotUpdate(\"bundle\",{\"./src/model/global.js\":function(e,i,t){\"use strict\";t.r(i);var l,n,a,r,o=t(\"./node_modules/mobx/lib/mobx.module.js\");function c(e,i,t,l){t&&Object.defineProperty(e,i,{enumerable:t.enumerable,configurable:t.configurable,writable:t.writable,value:t.initializer?t.initializer.call(l):void 0})}function s(t,l,e,i,n){var a={};return Object.keys(i).forEach(function(e){a[e]=i[e]}),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,(\"value\"in a||a.initializer)&&(a.writable=!0),a=e.slice().reverse().reduce(function(e,i){return i(t,l,e)||e},a),n&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(n):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(t,l,a),a=null),a}var p=(n=s((l=function e(){!function(e,i){if(!(e instanceof i))throw new TypeError(\"Cannot call a class as a function\")}(this,e),c(this,\"collapsed\",n,this),c(this,\"menuList\",a,this),c(this,\"handleToggleMenu\",r,this)}).prototype,\"collapsed\",[o.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),a=s(l.prototype,\"menuList\",[o.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[{key:\"/app/members\",icon:\"team\",title:\"会员管理\",child:[{key:\"/app/members/list\",title:\"会员列表\"}]},{key:\"/app/brand\",icon:\"shop\",title:\"品牌商管理\",child:[{key:\"/app/brand/list\",title:\"品牌商列表\"}]},{key:\"/app/prizes\",icon:\"shopping\",title:\"奖品管理\",child:[{key:\"/app/prizes/list\",title:\"奖品列表\"}]},{key:\"/app/missions\",icon:\"file-done\",title:\"任务管理\",child:[{key:\"/app/missions/basic-list\",title:\"任务列表\"},{key:\"/app/missions/exchange-list\",title:\"积分兑换列表\"}]},{key:\"/app/wechats\",icon:\"wechat\",title:\"微信管理\",child:[{key:\"/app/wechats/repeat\",title:\"回复配置\"},{key:\"/app/wechats/menu\",title:\"菜单配置\"}]},{key:\"/app/follows\",icon:\"share-alt\",title:\"关注页管理\",child:[{key:\"/app/follows/config\",title:\"关注页配置\"}]},{key:\"/app/articles\",icon:\"file-text\",title:\"热文库管理\",child:[{key:\"/app/articles/banner-list\",title:\"Banner列表\"},{key:\"/app/articles/articles-list\",title:\"热文列表\"}]},{key:\"/app/promotions\",icon:\"red-envelope\",title:\"推广中心\",child:[{key:\"/app/promotions/channel-list\",title:\"推广渠道列表\"}]}]}}),r=s(l.prototype,\"handleToggleMenu\",[o.action],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var e=this;return function(){return e.collapsed=!e.collapsed}}}),l);i.default=new p}});"}