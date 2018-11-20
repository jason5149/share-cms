import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd'
import PageHeader from '@component/PageHeader'
import PageContent from '@component/PageContent'
import PageTable from '@component/PageTable'
import { BASE_PATH } from '@util/const'

@inject(
  'BrandModel',
)
@observer
class BrandListPage extends Component {
  state = {
    breadcrumbItems: [
      { name: '品牌商管理' },
      { name: '品牌商列表' },
    ],
    actionsListColumn: [
      { title: '操作', dataIndex: 'actions', key: 'actions' },
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

  handleActions = type => {
    const { history } = this.props

    if (type === 'create') {
      history.push(`${ BASE_PATH }/app/brand/create`)
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
        <PageHeader title='品牌商列表' extraBreadcrumbItems={ breadcrumbItems } />
        <PageContent>
          <div style={{ marginBottom: 24 }}>
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
          />
        </PageContent>
      </div>
    )
  }
}

export default BrandListPage