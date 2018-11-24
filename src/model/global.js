import { observable, action } from 'mobx'

class GlobalModel {
  @observable
  loadingStatus = false

  @observable
  collapsed = false

  @observable
  menuList = [
    // {
    //   key:   '/app/accounts',
    //   icon:  'usergroup-add',
    //   title: '账号管理',
    //   child: [
    //     {
    //       key:   '/app/accounts/list',
    //       title: '账号列表',
    //     },
    //   ],
    // },
    // {
    //   key:   '/app/auth',
    //   icon:  'cluster',
    //   title: '权限管理',
    //   child: [
    //     {
    //       key:   '/app/auth/list',
    //       title: '权限列表',
    //     },
    //   ],
    // },
    {
      key:   '/app/members',
      icon:  'team',
      title: '会员管理',
      child: [
        {
          key:   '/app/members/list',
          title: '会员列表',
        },
      ],
    },
    {
      key:   '/app/brand',
      icon:  'shop',
      title: '品牌商管理',
      child: [
        {
          key:   '/app/brand/list',
          title: '品牌商列表',
        },
      ],
    },
    {
      key:   '/app/prize',
      icon:  'shopping',
      title: '奖品管理',
      child: [
        {
          key:   '/app/prize/list',
          title: '奖品列表',
        },
      ],
    },
    {
      key:   '/app/mission', 
      icon:  'file-done',
      title: '任务管理',
      child: [
        {
          key:   '/app/mission/basic-list',
          title: '任务列表',
        },
        {
          key:   '/app/mission/exchange-list',
          title: '积分兑换列表',
        },
      ],
    },
    {
      key:   '/app/wechat',
      icon:  'wechat',
      title: '微信管理',
      child: [
        {
          key:   '/app/wechat/repeat',
          title: '回复配置',
        },
        {
          key:   '/app/wechat/menu',
          title: '菜单配置',
        },
      ],
    },
    {
      key:   '/app/follow',
      icon:  'share-alt',
      title: '关注页管理',
      child: [
        {
          key:   '/app/follow/config',
          title: '关注页配置',
        },
      ],
    },
    {
      key:   '/app/article',
      icon:  'file-text',
      title: '热文库管理',
      child: [
        {
          key:   '/app/article/list',
          title: '热文库列表',
        },
        {
          key:   '/app/article/banner-list',
          title: 'Banner列表',
        },
      ],
    },
    {
      key:   '/app/promotion',
      icon:  'red-envelope',
      title: '推广中心',
      child: [
        {
          key:   '/app/promotion/channel-list',
          title: '渠道列表',
        },
      ],
    },
  ]

  @action
  handleToggleLoadingBar = flag => {
    if (flag === this.loadingStatus) return
    
    this.loadingStatus = flag
  }
 
  @action
  handleToggleMenu = () => this.collapsed = !this.collapsed
}

export default new GlobalModel()