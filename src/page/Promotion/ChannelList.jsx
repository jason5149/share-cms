import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Modal, message } from 'antd'
import PageHeader from '@component/PageHeader'
import PageContent from '@component/PageContent'
import PageTable from '@component/PageTable'
import { BASE_PATH } from '@util/const'

const { confirm: Confirm } = Modal

@inject(
  'PromotionModel',
)
@observer
class ChannelListPage extends Component {
  state = {
    breadcrumbItems: [
      { name: '推广中心' },
      { name: '渠道列表' },
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
    this.handleSearchChannelList()
  }

  handleSearchChannelList = (currentPage = 1) => {
    const { PromotionModel } = this.props
    const { queryChannelList } = PromotionModel

    const params = {
      currentPage,
      pageSize: 10,
    }

    queryChannelList(params)
  }

  handlePageChange = currentPage => {
    this.handleSearchChannelList(currentPage)
  }

  handleActions = (type, item) => {
    const { history, PromotionModel } = this.props
    const { deleteChannel } = PromotionModel

    if (type === 'create') {
      history.push(`${ BASE_PATH }/app/promotion/create-channel`)
    } else if (type === 'edit') {
      history.push(`${ BASE_PATH }/app/promotion/${ item.id }?mode=edit`)
    } else if (type === 'remove') {
      Confirm({
        title:      '删除渠道',
        content:    '您确认要该删除渠道吗？',
        okText:     '确认',
        cancelText: '取消',
        onOk:       async() => {
          const { id } = item
          const result = await deleteChannel({ id })

          if (result) {
            message.success('删除成功')

            this.handleSearchChannelList()
          }
        },
        onCancel() {
          console.log('Cancel Remove')
        },
      })
    }
  }

  render() {
    const { PromotionModel } = this.props
    const { breadcrumbItems, actionsListColumn } = this.state
    const { 
      channelList, 
      channelListTotal, 
      channelListColumn,
      channelListPageNum, 
    } = PromotionModel

    return (
      <div className='view-container'>
        <PageHeader title='渠道列表' extraBreadcrumbItems={ breadcrumbItems } />
        <PageContent>
          <div style={{ marginBottom: 24 }}>
            <Button type='primary' onClick={ () => this.handleActions('create') }>新增渠道</Button>
          </div>
          <PageTable 
            rowKey='id'
            total={ channelListTotal }
            columns={ channelListColumn.concat(actionsListColumn) }
            pageNum={ channelListPageNum }
            pageSize={ 10 }
            dataSource={ channelList }
            onPageChange={ this.handlePageChange }
          />
        </PageContent>
      </div>
    )
  }
}

export default ChannelListPage