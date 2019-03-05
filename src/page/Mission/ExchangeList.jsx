import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd'
import PageHeader from '@component/PageHeader'
import PageContent from '@component/PageContent'
import PageTable from '@component/PageTable'
import { BASE_PATH } from '@util/const'

// const { confirm: Confirm } = Modal

@inject(
  'MissionModel',
)
@observer
class ExchangeListPage extends Component {
  state = {
    breadcrumbItems: [
      { name: '任务管理' },
      { name: '积分兑换列表' },
    ],
    actionsListColumn: [
      { 
        title:     '操作', 
        dataIndex: 'actions', 
        key:       'actions', 
        render:    (text, record) => {
          return (
            <div className='actions-btn-container'>
              <Button size='small' type='primary' onClick={ () => this.handleActions('check', record) }>
                查看/发货
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
    this.handleSearchExchangeList()
  }

  handleSearchExchangeList = (currentPage = 1) => {
    const { MissionModel } = this.props
    const { queryExchangeList } = MissionModel

    const params = {
      currentPage,
      pageSize: 10,
    }

    queryExchangeList(params)
  }

  handlePageChange = currentPage => {
    this.handleSearchExchangeList(currentPage)
  }

  handleActions = (type, item) => {
    const { history } = this.props

    if (type === 'check') {
      const { id } = item

      history.push(`${ BASE_PATH }/app/mission/exchange/${ id }`)
    }
  }

  render() {
    const { MissionModel } = this.props
    const { breadcrumbItems, actionsListColumn } = this.state
    // const { breadcrumbItems } = this.state
    const { 
      exchangeList, 
      exchangeListTotal, 
      exchangeListColumn,
      exchangeListPageNum, 
    } = MissionModel

    return (
      <div className='view-container'>
        <PageHeader title='积分兑换列表' extraBreadcrumbItems={ breadcrumbItems } />
        <PageContent>
          {/* <div style={{ marginBottom: 24 }}>
            <Button type='primary' onClick={ () => this.handleActions('create') }>新增品牌商</Button>
          </div> */}
          <PageTable 
            rowKey='id'
            total={ exchangeListTotal }
            columns={ exchangeListColumn.concat(actionsListColumn) }
            pageNum={ exchangeListPageNum }
            pageSize={ 10 }
            dataSource={ exchangeList }
            onPageChange={ this.handlePageChange }
          />
        </PageContent>
      </div>
    )
  }
}

export default ExchangeListPage