import { observable, action } from 'mobx'
import React from 'react'
import moment from 'moment'
import { Badge, message } from 'antd'
import { queryBannerList, queryBannerDetail, createBanner, updateBanner, deleteBanner } from '@service/article'
import { BANNER_TYPE_OPTIONS, BANNER_TYPE_DESC } from '@util/const'

class ArticleModel {
  @observable
  bannerList = [] 

  @observable
  bannerListTotal = 0

  @observable
  bannerListColumn = [
    { title: '标题', dataIndex: 'title', key: 'title' },
    { title: '类型', dataIndex: 'type', key: 'type', render: text => <span>{BANNER_TYPE_DESC[text]}</span> },
    { title: '排序', dataIndex: 'sort', key: 'sort' },
    { 
      title:     '状态', 
      dataIndex: 'status', 
      key:       'status',
      render:    text => text === 1 ? <Badge status='success' text='正常' /> : <Badge status='error' text='关闭' />,
    },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', render: text => moment(text).format('YYYY-MM-DD HH:mm:ss') },
  ]

  @observable
  bannerListPageNum = 1

  bannerFormItems = [
    { label: '标题', field: 'title', type: 'input', subType: 'string', placeholder: '请输入Banner标题', value: '', required: true, validateMessage: '请输入Banner标题' },
    { label: '类型', field: 'type', type: 'radio', src: BANNER_TYPE_OPTIONS, value: 1, required: true, validateMessage: '请选择Banner类型' },
    { label: '排序', field: 'sort', type: 'input', subType: 'number', placeholder: '请设置奖品排序', value: null, required: true, validateMessage: '请设置奖品排序' },
    { label: '有效时间', field: 'validDate', type: 'date', subType: 'range', value: [], required: true, validateMessage: '请选择有效时间' },
    { label: '图片', field: 'image', type: 'upload', subType: 'single', preview: '', required: true, validateMessage: '请上传Banner图' },
    { label: '链接地址', field: 'url', type: 'input', subType: 'string', placeholder: '请输入图片跳转链接', value: '' },
    { label: '状态', field: 'status', type: 'switch', desc: ['开', '关'], value: true, required: true, validateMessage: '请选择状态' },
  ]

  @action
  queryBannerList = async params => {
    const result = await queryBannerList(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    this.bannerListPageNum = params.currentPage

    if (result.body) {
      this.bannerList = result.body.list
      this.bannerListTotal = result.body.page.totalNum
    }
  }

  @action
  queryBannerDetail = async params => {
    const result = await queryBannerDetail(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    console.log(result.body)
  }

  @action
  createBanner = async params => {
    const result = await createBanner(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    return true
  }

  @action
  updateBanner = async params => {
    const result = await updateBanner(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    return true
  }

  @action
  deleteBanner = async params => {
    const result = await deleteBanner(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    return true
  }

  @action
  setPreviewImg = (label, url) => {
    this.bannerFormItems.map(value => {
      if (value.label === label) {
        value.preview = url
      }

      return value
    })
  }

  @action
  fillBannerForm = item => {
    this.bannerFormItems.map(banner => {
      if (banner.field in item) {
        if (['radio', 'input'].indexOf(banner.type) !== -1) {
          banner.value = item[banner.field]
        } else if (banner.type === 'switch') {
          banner.value = !!item[banner.field]
        } else if (banner.type === 'upload') {
          banner.preview = item[banner.field]
        }
      } else if (item.startTime && item.endTime) {
        if (banner.type === 'date' && banner.subType === 'range') {
          banner.value = [moment(item.startTime), moment(item.endTime)]
        }
      }

      return banner
    })

    return true
  }
}

export default new ArticleModel()