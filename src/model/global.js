import { observable, action } from 'mobx'

class GlobalModel {
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
      key:   '/app/prizes',
      icon:  'shopping',
      title: '奖品管理',
      child: [
        {
          key:   '/app/prizes/list',
          title: '奖品列表',
        },
      ],
    },
    {
      key:   '/app/missions', 
      icon:  'file-done',
      title: '任务管理',
      child: [
        {
          key:   '/app/missions/basic-list',
          title: '任务列表',
        },
        {
          key:   '/app/missions/exchange-list',
          title: '积分兑换列表',
        },
      ],
    },
    {
      key:   '/app/wechats',
      icon:  'wechat',
      title: '微信管理',
      child: [
        {
          key:   '/app/wechats/repeat',
          title: '回复配置',
        },
        {
          key:   '/app/wechats/menu',
          title: '菜单配置',
        },
      ],
    },
    {
      key:   '/app/follows',
      icon:  'share-alt',
      title: '关注页管理',
      child: [
        {
          key:   '/app/follows/config',
          title: '关注页配置',
        },
      ],
    },
    {
      key:   '/app/articles',
      icon:  'file-text',
      title: '热文库管理',
      child: [
        {
          key:   '/app/articles/banner-list',
          title: 'Banner列表',
        },
        {
          key:   '/app/articles/articles-list',
          title: '热文列表',
        },
      ],
    },
    {
      key:   '/app/promotions',
      icon:  'red-envelope',
      title: '推广中心',
      child: [
        {
          key:   '/app/promotions/channel-list',
          title: '推广渠道列表',
        },
      ],
    },
  ]

  @action
  handleToggleMenu = () => this.collapsed = !this.collapsed
}

export default new GlobalModel()