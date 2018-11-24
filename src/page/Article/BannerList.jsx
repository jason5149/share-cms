import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd'
import PageHeader from '@component/PageHeader'
import PageContent from '@component/PageContent'
import PageTable from '@component/PageTable'
import { BASE_PATH } from '@util/const'

@inject(
  'ArticleModel',
)
@observer
class BannerListPage extends Component {
  state = {
    breadcrumbItems: [
      { name: '热文库管理' },
      { name: 'Banner列表' },
    ],
    actionsListColumn: [
      { 
        title:     '操作', 
        dataIndex: 'actions', 
        key:       'actions', 
      },
    ],
  }

  componentDidMount() {
    this.init()
  }

  init() {
    this.handleSearchBannerList()
  }

  handleSearchBannerList = (currentPage = 1) => {
    const { ArticleModel } = this.props
    const { queryBannerList } = ArticleModel

    const params = {
      currentPage,
      pageSize: 10,
    }

    queryBannerList(params)
  }

  handlePageChange = currentPage => {
    console.log(currentPage)
  }

  handleActions = type => {
    const { history } = this.props

    if (type === 'create') {
      history.push(`${ BASE_PATH }/app/article/create-banner`)
    }
  }

  render() {
    const { ArticleModel } = this.props
    const { breadcrumbItems, actionsListColumn } = this.state
    const { 
      bannerList, 
      bannerListTotal, 
      bannerListColumn,
      bannerListPageNum, 
    } = ArticleModel

    return (
      <div className='view-container'>
        <PageHeader title='Banner列表' extraBreadcrumbItems={ breadcrumbItems } />
        <PageContent>
          <div style={{ marginBottom: 24 }}>
            <Button type='primary' onClick={ () => this.handleActions('create') }>新增Banner</Button>
          </div>
          <PageTable 
            rowKey='id'
            total={ bannerListTotal }
            columns={ bannerListColumn.concat(actionsListColumn) }
            pageNum={ bannerListPageNum }
            pageSize={ 10 }
            dataSource={ bannerList }
            onPageChange={ this.handlePageChange }
          />
        </PageContent>
      </div>
    )
  }
}

export default BannerListPage