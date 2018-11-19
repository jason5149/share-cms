import { observable, action } from 'mobx'
import { message } from 'antd'
import { queryBrandList } from '@service/brand'

class BrandModel {
  @observable
  brandList = []

  @observable
  brandListTotal = 0

  @observable
  brandListColumn = [
    { title: '品牌商名称', dataIndex: 'name', key: 'name' },
    { title: '是否植入广告', dataIndex: 'isImplantation', key: 'isImplantation' },
    { title: '目标阅读数', dataIndex: 'readNumber', key: 'readNumber' },
    { title: '状态', dataIndex: 'status', key: 'status' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
  ]

  @observable
  brandListPageNum = 1
  
  @action
  queryBrandList = async params => {
    const result = await queryBrandList(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    this.brandListPageNum = params.currentPage

    if (result.body) {
      this.brandList = result.body.list
      this.brandListTotal = result.body.page.totalNum
    }
  }
}

export default new BrandModel()