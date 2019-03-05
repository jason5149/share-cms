import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Layout } from 'antd'
import { BASE_PATH } from '@util/const'
import AsyncComponent from '@component/AsyncComponent'
import GlobalHeader from '@component/GlobalHeader'
import MenuList from '@component/MenuList'

// const { Header, Content, Footer, Sider } = Layout
const { Header, Content, Sider } = Layout

@inject(
  'GlobalModel',
)
@observer
class BasicLayout extends Component {
  handleMenuClick = ({ key }) => {
    if (!key) return

    const { history } = this.props

    history.push(`${ BASE_PATH }${ key }`)
  }

  render() {
    const { match, GlobalModel } = this.props
    const { url } = match
    const { collapsed, menuList } = GlobalModel

    return (
      <Layout style={{ height: '100vh' }}>
        <Sider
          className={ `sider-container ${ collapsed ? 'close' : 'open' }` }
          width={ collapsed ? 80 : 256 }
          trigger={ null }
          collapsible
          collapsed={ collapsed }
        >
          <MenuList data={ menuList } onMenuClick={ this.handleMenuClick } />
        </Sider>
        {/* <Layout className={ `layout-container ${ collapsed ? 'close' : 'open' }` }> */}
        <Layout className='layout-container'>
          <Header className='header-container'>
            <GlobalHeader />
          </Header>
          <Content className='content-container'>
            <Switch>
              <Route path={ `${ url }/home` } component={ AsyncComponent(() => import('@page/Home')) } />
              {/* 会员管理 */}
              <Route path={ `${ url }/member/list` } component={ AsyncComponent(() => import('@page/Member/List')) } />
              <Route path={ `${ url }/member/:id` } component={ AsyncComponent(() => import('@page/Member/Detail')) } />
              {/* 会员管理 */}
              {/* 品牌商管理 */}
              <Route path={ `${ url }/brand/list` } component={ AsyncComponent(() => import('@page/Brand/List')) } />
              <Route path={ `${ url }/brand/create` } component={ AsyncComponent(() => import('@page/Brand/Create')) } />
              <Route path={ `${ url }/brand/:id` } component={ AsyncComponent(() => import('@page/Brand/Edit')) } />
              {/* 品牌商管理 */}
              {/* 奖品管理 */}
              <Route path={ `${ url }/prize/list` } component={ AsyncComponent(() => import('@page/Prize/List')) } />
              <Route path={ `${ url }/prize/create` } component={ AsyncComponent(() => import('@page/Prize/Create')) } />
              <Route path={ `${ url }/prize/:id` } component={ AsyncComponent(() => import('@page/Prize/Edit')) } />
              {/* 奖品管理 */}
              {/* 任务管理 */}
              <Route path={ `${ url }/mission/basic-list` } component={ AsyncComponent(() => import('@page/Mission/List')) } />
              <Route path={ `${ url }/mission/exchange-list` } component={ AsyncComponent(() => import('@page/Mission/ExchangeList')) } />
              <Route path={ `${ url }/mission/exchange/:id` } component={ AsyncComponent(() => import('@page/Mission/ExchangeDetail')) } />
              <Route path={ `${ url }/mission/express-list` } component={ AsyncComponent(() => import('@page/Mission/ExpressList')) } />
              {/* 任务管理 */}
              {/* 关注页管理 */}
              <Route path={ `${ url }/follow/config` } component={ AsyncComponent(() => import('@page/Follow/Config')) } />
              {/* 关注页管理 */}
              {/* 热文库管理 */}
              {/* <Route path={ `${ url }/article/list` } component={ AsyncComponent(() => import('@page/Article/List')) } /> */}
              <Route path={ `${ url }/article/news-list` } component={ AsyncComponent(() => import('@page/Article/NewsList')) } />
              <Route path={ `${ url }/article/news-template` } component={ AsyncComponent(() => import('@page/Article/NewsTemplate')) } />
              <Route path={ `${ url }/article/banner-list` } component={ AsyncComponent(() => import('@page/Article/BannerList')) } />
              <Route path={ `${ url }/article/create-banner` } component={ AsyncComponent(() => import('@page/Article/CreateBanner')) } />
              <Route path={ `${ url }/article/:id` } component={ AsyncComponent(() => import('@page/Article/EditBanner')) } />
              {/* 热文库管理 */}
              {/* 推广中心 */}
              <Route path={ `${ url }/promotion/config` } component={ AsyncComponent(() => import('@page/Promotion/Config')) } />
              <Route path={ `${ url }/promotion/channel-list` } component={ AsyncComponent(() => import('@page/Promotion/ChannelList')) } />
              <Route path={ `${ url }/promotion/create-channel` } component={ AsyncComponent(() => import('@page/Promotion/CreateChannel')) } />
              <Route path={ `${ url }/promotion/:id` } component={ AsyncComponent(() => import('@page/Promotion/EditChannel')) } />
              {/* 推广中心 */}
            </Switch>
          </Content>
          {/* <Footer className='footer-container'>
            Ant Design ©2018 Created by Ant UED
          </Footer> */}
        </Layout>
      </Layout>
    )
  }
}

export default BasicLayout
