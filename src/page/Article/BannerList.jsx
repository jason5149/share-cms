import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Modal, message } from 'antd'
import PageHeader from '@component/PageHeader'
import PageContent from '@component/PageContent'
import PageTable from '@component/PageTable'
import { BASE_PATH } from '@util/const'
import { base64encode } from '@util/tool'

const { confirm: Confirm } = Modal

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
        render:    (text, record) => {
          return (
            <div className='actions-btn-container'>
              <Button size='small' type='primary' onClick={ () => this.handleActions('edit', record) }>
                编辑
              </Button>
              {/* <Button size='small' type='danger' onClick={ () => this.handleActions('remove', record) }>
                删除
              </Button> */}
            </div>
          )
        },
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

  handleActions = (type, item) => {
    const { history, ArticleModel } = this.props
    const { deleteBanner } = ArticleModel

    if (type === 'create') {
      history.push(`${ BASE_PATH }/app/article/create-banner`)
    } else if (type === 'edit') {
      history.push(`${ BASE_PATH }/app/article/${ item.id }?mode=edit&params=${ base64encode(item) }`)
    } else if (type === 'remove') {
      Confirm({
        title:      '删除Banner',
        content:    '您确认要该删除Banner吗？',
        okText:     '确认',
        cancelText: '取消',
        onOk:       async() => {
          const { id } = item
          const result = await deleteBanner({ id })

          if (result) {
            message.success('删除成功')

            this.handleSearchBannerList()
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