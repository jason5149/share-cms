import { observable, action } from 'mobx'
import { message } from 'antd'
import { queryBrandList } from '@service/brand'
import { ADVERTISING_OPTIONS } from '@util/const'

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

  @observable
  brandFormItems = [
    { label: '品牌商名称', field: 'name', type: 'input', placeholder: '请输入品牌商名称', required: true, validateMessage: '请输入品牌商名称' },
    { label: '品牌商LOGO', field: 'logoImage', type: 'upload', subType: 'single', preview: '', required: true, validateMessage: '请输入上传品牌商LOGO' },
    { label: '是否植入广告', field: 'isImplantation', type: 'radio', src: ADVERTISING_OPTIONS, value: 1, required: true, validateMessage: '请选择是否植入广告' },
    { label: '品牌商广告图', field: 'brandAdImage', type: 'upload', uploadType: 'single', preview: '', required: true, validateMessage: '请输入上传品牌商广告图' },
    { label: '广告图链接地址', field: 'brandAdUrl', type: 'input', placeholder: '请输入广告图链接地址', required: true, validateMessage: '请输入广告图链接地址' },
    { label: '达标阅读数', field: 'readNumber', type: 'input', placeholder: '请输入达标阅读数', required: true, validateMessage: '请输入达标阅读数' },
    { label: '达标积分', field: 'standardIntegral', type: 'input', placeholder: '请输入达标积分', required: true, validateMessage: '请输入达标积分' },
    { label: '有效时间', field: 'validDate', type: 'date', subType: 'range', required: true, validateMessage: '请选择有效时间' },
    { label: '状态', field: 'status', type: 'switch', desc: ['开', '关'], value: true, required: true, validateMessage: '请选择状态' },
  ]
  
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

  @action
  setPreviewImg = (label, url) => {
    this.brandFormItems.map(value => {
      if (value.label === label) {
        value.preview = url
      }

      return value
    })
  }
}

export default new BrandModel()