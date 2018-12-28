import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Modal, message } from 'antd'
import PageHeader from '@component/PageHeader'
import PageContent from '@component/PageContent'
import PageTable from '@component/PageTable'
import { BASE_PATH } from '@util/const'

const { confirm: Confirm } = Modal

@inject(
  'PrizeModel',
)
@observer
class PrizeListPage extends Component {
  state = {
    breadcrumbItems: [
      { name: '奖品管理' },
      { name: '奖品列表' },
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
    this.handleSearchPrizeList()
  }

  handleSearchPrizeList = (currentPage = 1) => {
    const { PrizeModel } = this.props
    const { queryPrizeList } = PrizeModel

    const params = {
      currentPage,
      pageSize: 10,
    }

    queryPrizeList(params)
  }

  handlePageChange = currentPage => {
    this.handleSearchPrizeList(currentPage)
  }

  handleActions = (type, item) => {
    const { history, PrizeModel } = this.props
    const { deletePrize } = PrizeModel

    if (type === 'create') {
      history.push(`${ BASE_PATH }/app/prize/create`)
    } else if (type === 'edit') {
      history.push(`${ BASE_PATH }/app/prize/${ item.id }?mode=edit`)
    } else if (type === 'remove') {
      Confirm({
        title:      '删除奖品',
        content:    '您确认要删除该奖品吗？',
        okText:     '确认',
        cancelText: '取消',
        onOk:       async() => {
          const { id } = item
          const result = await deletePrize({ id })

          if (result) {
            message.success('删除成功')

            this.handleSearchPrizeList()
          }
        },
        onCancel() {
          console.log('Cancel Remove')
        },
      })
      
    }
  }

  render() {
    const { PrizeModel } = this.props
    const { breadcrumbItems, actionsListColumn } = this.state
    const { 
      prizeList, 
      prizeListTotal, 
      prizeListColumn,
      prizeListPageNum, 
    } = PrizeModel

    return (
      <div className='view-container'>
        <PageHeader title='奖品列表' extraBreadcrumbItems={ breadcrumbItems } />
        <PageContent>
          <div style={{ marginBottom: 24 }}>
            <Button type='primary' onClick={ () => this.handleActions('create') }>新增奖品</Button>
          </div>
          <PageTable 
            rowKey='id'
            total={ prizeListTotal }
            columns={ prizeListColumn.concat(actionsListColumn) }
            pageNum={ prizeListPageNum }
            pageSize={ 10 }
            dataSource={ prizeList }
            onPageChange={ this.handlePageChange }
          />
        </PageContent>
      </div>
    )
  }
}

export default PrizeListPage