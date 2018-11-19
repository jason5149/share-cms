import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Layout } from 'antd'
import { BASE_PATH } from '@util/const'
import AsyncComponent from '@component/AsyncComponent'
import GlobalHeader from '@component/GlobalHeader'
import MenuList from '@component/MenuList'

const { Header, Content, Footer, Sider } = Layout
const HomePage = AsyncComponent(() => import('@page/Home'))
const BrandListPage = AsyncComponent(() => import('@page/Brand/List'))

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
        <Layout className={ `layout-container ${ collapsed ? 'close' : 'open' }` }>
          <Header className='header-container'>
            <GlobalHeader />
          </Header>
          <Content className='content-container'>
            <Switch>
              <Route path={ `${ url }/home` } component={ HomePage } />
              <Route path={ `${ url }/brand/list` } component={ BrandListPage } />
            </Switch>
          </Content>
          <Footer className='footer-container'>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default BasicLayout