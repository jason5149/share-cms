import React from 'react'
import moment from 'moment'
import { observable, action } from 'mobx'
import { Badge, message } from 'antd'
import { queryBrandList, queryBrandDetail, createBrand, updateBrand, deleteBrand } from '@service/brand'
import { ADVERTISING_OPTIONS } from '@util/const'

class BrandModel {
  @observable
  brandList = []

  @observable
  brandListTotal = 0

  @observable
  brandListColumn = [
    { title: '品牌商名称', dataIndex: 'name', key: 'name' },
    { 
      title:     '是否植入广告', 
      dataIndex: 'isImplantation', 
      key:       'isImplantation', 
      render:    text => text === 1 ? '是' : '否', 
    },
    { title: '目标阅读数', dataIndex: 'readNumber', key: 'readNumber' },
    {  
      title:     '状态', 
      dataIndex: 'status', 
      key:       'status', 
      render:    text => text === 1 ? <Badge status='success' text='正常' /> : <Badge status='error' text='关闭' />, 
    },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', render: text => moment(text).format('YYYY-MM-DD HH:mm:ss') },
  ]

  @observable
  brandListPageNum = 1

  @observable
  brandFormItems = [
    { label: '品牌商名称', field: 'name', type: 'input', subType: 'string', placeholder: '请输入品牌商名称', value: '', required: true, validateMessage: '请输入品牌商名称' },
    { label: '品牌商LOGO', field: 'logoImage', type: 'upload', subType: 'single', preview: [], required: true, validateMessage: '请输入上传品牌商LOGO' },
    { label: '是否植入广告', field: 'isImplantation', type: 'radio', src: ADVERTISING_OPTIONS, value: 1, required: true, validateMessage: '请选择是否植入广告' },
    { label: '品牌商广告图', field: 'brandAdImage', type: 'upload', subType: 'single', preview: [], required: true, validateMessage: '请输入上传品牌商广告图' },
    // { label: '广告图链接地址', field: 'brandAdUrl', type: 'input', subType: 'string', placeholder: '请输入广告图链接地址', value: '', required: true, validateMessage: '请输入广告图链接地址' },
    { label: '广告图链接地址', field: 'brandAdUrl', type: 'input', subType: 'string', placeholder: '请输入广告图链接地址', value: '', required: false },
    { label: '达标阅读数', field: 'readNumber', type: 'input', subType: 'number', placeholder: '请输入达标阅读数', value: null, required: true, validateMessage: '请输入达标阅读数' },
    { label: '达标积分', field: 'standardIntegral', type: 'input', subType: 'number', placeholder: '请输入达标积分', value: null, required: true, validateMessage: '请输入达标积分' },
    { label: '有效时间', field: 'validDate', type: 'date', subType: 'range', value: [], required: true, validateMessage: '请选择有效时间' },
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
  queryBrandDetail = async params => {
    const result = await queryBrandDetail(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    return this.fillBrandForm(result.body)
  }

  @action
  createBrand = async params => {
    const result = await createBrand(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    return true
  }

  @action
  updateBrand = async params => {
    const result = await updateBrand(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    return true
  }

  @action
  deleteBrand = async params => {
    const result = await deleteBrand(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    return true
  }

  @action
  emptyBrandForm = () => {
    this.brandFormItems = [
      { label: '品牌商名称', field: 'name', type: 'input', subType: 'string', placeholder: '请输入品牌商名称', value: '', required: true, validateMessage: '请输入品牌商名称' },
      { label: '品牌商LOGO', field: 'logoImage', type: 'upload', subType: 'single', preview: [], required: true, validateMessage: '请输入上传品牌商LOGO' },
      { label: '是否植入广告', field: 'isImplantation', type: 'radio', src: ADVERTISING_OPTIONS, value: 1, required: true, validateMessage: '请选择是否植入广告' },
      { label: '品牌商广告图', field: 'brandAdImage', type: 'upload', subType: 'single', preview: [], required: true, validateMessage: '请输入上传品牌商广告图' },
      // { label: '广告图链接地址', field: 'brandAdUrl', type: 'input', subType: 'string', placeholder: '请输入广告图链接地址', value: '', required: true, validateMessage: '请输入广告图链接地址' },
      { label: '广告图链接地址', field: 'brandAdUrl', type: 'input', subType: 'string', placeholder: '请输入广告图链接地址', value: '', required: false },
      { label: '达标阅读数', field: 'readNumber', type: 'input', subType: 'number', placeholder: '请输入达标阅读数', value: null, required: true, validateMessage: '请输入达标阅读数' },
      { label: '达标积分', field: 'standardIntegral', type: 'input', subType: 'number', placeholder: '请输入达标积分', value: null, required: true, validateMessage: '请输入达标积分' },
      { label: '有效时间', field: 'validDate', type: 'date', subType: 'range', value: [], required: true, validateMessage: '请选择有效时间' },
      { label: '状态', field: 'status', type: 'switch', desc: ['开', '关'], value: true, required: true, validateMessage: '请选择状态' },
    ]
  }

  @action
  setPreviewImg = (label, file) => {
    this.brandFormItems.map(value => {
      if (value.label === label) {
        value.preview.splice(0, 1, file)
      }

      return value
    })
  }

  @action
  fillBrandForm = item => {
    this.brandFormItems.map(brand => {
      if (brand.field in item) {
        if (['radio', 'input'].indexOf(brand.type) !== -1) {
          brand.value = item[brand.field]
        } else if (brand.type === 'switch') {
          brand.value = !!item[brand.field]
        } else if (brand.type === 'upload') {
          brand.preview = [{ 
            uid:    '-1', 
            name:   `${ brand.field }.png`, 
            status: 'done', 
            url:    item[brand.field], 
          }]
        }
      } else if (item.implantationStartTime && item.implantationEndTime) {
        if (brand.type === 'date' && brand.subType === 'range') {
          brand.value = [moment(item.implantationStartTime), moment(item.implantationEndTime)]
        }
      }

      return brand
    })

    return true
  }
}

export default new BrandModel()