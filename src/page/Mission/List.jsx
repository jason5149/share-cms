import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
// import { Button, Modal, message } from 'antd'
import PageHeader from '@component/PageHeader'
import PageContent from '@component/PageContent'
import PageTable from '@component/PageTable'
// import { BASE_PATH } from '@util/const'

// const { confirm: Confirm } = Modal

@inject(
  'MissionModel',
)
@observer
class MissionListPage extends Component {
  state = {
    breadcrumbItems: [
      { name: '任务管理' },
      { name: '任务列表' },
    ],
    // actionsListColumn: [
    //   { 
    //     title:     '操作', 
    //     dataIndex: 'actions', 
    //     key:       'actions', 
    //     render:    (text, record) => {
    //       return (
    //         <div className='actions-btn-container'>
    //           <Button size='small' type='primary' onClick={ () => this.handleActions('edit', record) }>
    //             编辑
    //           </Button>
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
    this.handleSearchMissionList()
  }

  handleSearchMissionList = (currentPage = 1) => {
    const { MissionModel } = this.props
    const { queryMissionList } = MissionModel

    const params = {
      currentPage,
      pageSize: 10,
    }

    queryMissionList(params)
  }

  handlePageChange = currentPage => {
    this.handleSearchMissionList(currentPage)
  }

  // handleActions = (type, item) => {
  //   const { history, MissionModel } = this.props
  //   const { deleteBrand } = MissionModel

  //   if (type === 'create') {
  //     history.push(`${ BASE_PATH }/app/brand/create`)
  //   } else if (type === 'edit') {
  //     history.push(`${ BASE_PATH }/app/brand/${ item.id }?mode=${ type }`)
  //   } else if (type === 'remove') {
  //     Confirm({
  //       title:      '删除品牌商',
  //       content:    '您确认要该删除品牌商吗？',
  //       okText:     '确认',
  //       cancelText: '取消',
  //       onOk:       async() => {
  //         const { id } = item
  //         const result = await deleteBrand({ id })

  //         if (result) {
  //           message.success('删除成功')

  //           this.handleSearchBrandList()
  //         }
  //       },
  //       onCancel() {
  //         console.log('Cancel Remove')
  //       },
  //     })
  //   }
  // }

  render() {
    const { MissionModel } = this.props
    // const { breadcrumbItems, actionsListColumn } = this.state
    const { breadcrumbItems } = this.state
    const { 
      missionList, 
      missionListTotal, 
      missionListColumn,
      missionListPageNum, 
    } = MissionModel

    return (
      <div className='view-container'>
        <PageHeader title='任务列表' extraBreadcrumbItems={ breadcrumbItems } />
        <PageContent>
          {/* <div style={{ marginBottom: 24 }}>
            <Button type='primary' onClick={ () => this.handleActions('create') }>新增品牌商</Button>
          </div> */}
          <PageTable 
            rowKey='id'
            total={ missionListTotal }
            columns={ missionListColumn }
            pageNum={ missionListPageNum }
            pageSize={ 10 }
            dataSource={ missionList }
            onPageChange={ this.handlePageChange }
          />
        </PageContent>
      </div>
    )
  }
}

export default MissionListPage