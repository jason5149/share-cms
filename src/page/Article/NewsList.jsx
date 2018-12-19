import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Modal, message } from 'antd'
import PageHeader from '@component/PageHeader'
import PageContent from '@component/PageContent'
import PageTable from '@component/PageTable'
import { BASE_PATH } from '@util/const'

const { confirm: Confirm } = Modal

@inject(
  'ArticleModel',
)
@observer
class NewsListPage extends Component {
  state = {
    breadcrumbItems: [
      { name: '热文库管理' },
      { name: '热文库列表' },
    ],
    // actionsListColumn: [
    //   { 
    //     title:     '操作', 
    //     dataIndex: 'actions', 
    //     key:       'actions', 
    //     render:    (text, record) => {
    //       return (
    //         <div className='actions-btn-container'>
    //           {/* <Button size='small' type='primary' onClick={ () => this.handleActions('edit', record) }>
    //             <Icon type='edit' />
    //             编辑
    //           </Button> */}
    //           <Button size='small' type='danger' onClick={ () => this.handleActions('remove', record) }>
    //             删除
    //           </Button>
    //         </div>
    //       )
    //     },
    //   },
    // ],
  }

  componentDidMount() {
    this.init()
  }

  init() {
    this.handleSearchNewsList()
  }

  handleSearchNewsList = (currentPage = 1) => {
    const { ArticleModel } = this.props
    const { queryNewsList } = ArticleModel

    const params = {
      currentPage,
      pageSize: 10,
    }

    queryNewsList(params)
  }

  handlePageChange = currentPage => {
    this.handleSearchNewsList(currentPage)
  }

  handleActions = (type, info) => {
    const { history, ArticleModel } = this.props
    const { deleteBrand } = ArticleModel

    if (type === 'template') {
      history.push(`${ BASE_PATH }/app/article/news-template`)
    } else if (type === 'remove') {
      Confirm({
        title:      '删除品牌商',
        content:    '您确认要该删除品牌商吗？',
        okText:     '确认',
        cancelText: '取消',
        onOk:       async() => {
          const { id } = info
          const result = await deleteBrand({ id })

          if (result) {
            message.success('删除成功')

            this.handleSearchBrandList()
          }
        },
        onCancel() {
          console.log('Cancel Remove')
        },
      })
    }
  }

  render() {
    const { ArticleModel } = this.props
    // const { breadcrumbItems, actionsListColumn } = this.state
    const { breadcrumbItems } = this.state
    const { 
      newsList, 
      newsListTotal, 
      newsListColumn,
      newsListPageNum, 
    } = ArticleModel

    return (
      <div className='view-container'>
        <PageHeader title='热文库列表' extraBreadcrumbItems={ breadcrumbItems } />
        <PageContent>
          <div style={{ marginBottom: 24 }}>
            <Button type='primary' onClick={ () => this.handleActions('template') }>编辑热文模板</Button>
          </div>
          <PageTable 
            rowKey='id'
            total={ newsListTotal }
            // columns={ newsListColumn.concat(actionsListColumn) }
            columns={ newsListColumn }
            pageNum={ newsListPageNum }
            pageSize={ 10 }
            dataSource={ newsList }
            onPageChange={ this.handlePageChange }
          />
        </PageContent>
      </div>
    )
  }
}

export default NewsListPage