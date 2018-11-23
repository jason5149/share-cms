import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Icon, Modal, message } from 'antd'
import PageHeader from '@component/PageHeader'
import PageContent from '@component/PageContent'
import PageTable from '@component/PageTable'
import { BASE_PATH } from '@util/const'

const { confirm: Confirm } = Modal

@inject(
  'BrandModel',
)
@observer
class ArticleListPage extends Component {
  state = {
    breadcrumbItems: [
      { name: '热文库管理' },
      { name: '热文库列表' },
    ],
    actionsListColumn: [
      { 
        title:     '操作', 
        dataIndex: 'actions', 
        key:       'actions', 
        render:    (text, record) => {
          return (
            <div className='actions-btn-container'>
              {/* <Button size='small' type='primary' onClick={ () => this.handleActions('edit', record) }>
                <Icon type='edit' />
                编辑
              </Button> */}
              <Button size='small' type='danger' onClick={ () => this.handleActions('remove', record) }>
                删除
              </Button>
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
    this.handleSearchBrandList()
  }

  handleSearchBrandList = (currentPage = 1) => {
    const { BrandModel } = this.props
    const { queryBrandList } = BrandModel

    const params = {
      currentPage,
      pageSize: 10,
    }

    queryBrandList(params)
  }

  handlePageChange = currentPage => {
    console.log(currentPage)
  }

  handleActions = (type, info) => {
    const { history, BrandModel } = this.props
    const { deleteBrand } = BrandModel

    if (type === 'create') {
      history.push(`${ BASE_PATH }/app/brand/create`)
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
    const { BrandModel } = this.props
    const { breadcrumbItems, actionsListColumn } = this.state
    const { 
      brandList, 
      brandListTotal, 
      brandListColumn,
      brandListPageNum, 
    } = BrandModel

    return (
      <div className='view-container'>
        <PageHeader title='热文库列表' extraBreadcrumbItems={ breadcrumbItems } />
        <PageContent>
          {/* <div style={{ marginBottom: 24 }}>
            <Button type='primary' onClick={ () => this.handleActions('create') }>新增品牌商</Button>
          </div>
          <PageTable 
            rowKey='id'
            total={ brandListTotal }
            columns={ brandListColumn.concat(actionsListColumn) }
            pageNum={ brandListPageNum }
            pageSize={ 10 }
            dataSource={ brandList }
            onPageChange={ this.handlePageChange }
          /> */}
        </PageContent>
      </div>
    )
  }
}

export default ArticleListPage