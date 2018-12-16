import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd'
import PageHeader from '@component/PageHeader'
import PageContent from '@component/PageContent'
import PageTable from '@component/PageTable'
import { BASE_PATH } from '@util/const'

@inject(
  'MemberModel',
)
@observer
class MemberListPage extends Component {
  state = {
    breadcrumbItems: [
      { name: '会员管理' },
      { name: '会员列表' },
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
                详情
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
    this.handleSearchMemberList()
  }

  handleSearchMemberList = (currentPage = 1) => {
    const { MemberModel } = this.props
    const { queryMemberList } = MemberModel

    const params = {
      currentPage,
      pageSize: 10,
    }

    queryMemberList(params)
  }

  handlePageChange = currentPage => {
    this.handleSearchMemberList(currentPage)
  }

  handleActions = (type, item) => {
    const { history } = this.props

    if (type === 'check') {
      history.push(`${ BASE_PATH }/app/member/${ item.id }`)
    }
  }

  render() {
    const { MemberModel } = this.props
    const { breadcrumbItems, actionsListColumn } = this.state
    const { 
      memberList, 
      memberListTotal, 
      memberListColumn,
      memberListPageNum, 
    } = MemberModel

    return (
      <div className='view-container'>
        <PageHeader title='会员列表' extraBreadcrumbItems={ breadcrumbItems } />
        <PageContent>
          {/* <div style={{ marginBottom: 24 }}>
            <Button type='primary' onClick={ () => this.handleActions('create') }>新增品牌商</Button>
          </div> */}
          <PageTable 
            rowKey='id'
            total={ memberListTotal }
            // columns={ missionListColumn }
            columns={ memberListColumn.concat(actionsListColumn) }
            pageNum={ memberListPageNum }
            pageSize={ 10 }
            dataSource={ memberList }
            onPageChange={ this.handlePageChange }
          />
        </PageContent>
      </div>
    )
  }
}

export default MemberListPage