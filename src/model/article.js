import { observable, action } from 'mobx'
import React from 'react'
import moment from 'moment'
import { Badge, message } from 'antd'
import { queryBannerList, createBanner } from '@service/article'
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
    { label: '标题', field: 'title', type: 'input', subType: 'string', placeholder: '请输入Banner标题', required: true, validateMessage: '请输入Banner标题' },
    { label: '类型', field: 'type', type: 'radio', src: BANNER_TYPE_OPTIONS, value: 1, required: true, validateMessage: '请选择Banner类型' },
    { label: '排序', field: 'sort', type: 'input', subType: 'number', placeholder: '请设置奖品排序', required: true, validateMessage: '请设置奖品排序' },
    { label: '有效时间', field: 'validDate', type: 'date', subType: 'range', required: true, validateMessage: '请选择有效时间' },
    { label: '图片', field: 'image', type: 'upload', subType: 'single', preview: '', required: true, validateMessage: '请上传Banner图' },
    { label: '链接地址', field: 'url', type: 'input', subType: 'string', placeholder: '请输入图片跳转链接' },
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
  createBanner = async params => {
    const result = await createBanner(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    return true
  }

  // @action
  // deleteBanner = async params => {
  //   const result = await deleteBanner(params)

  //   if (result.code !== '10000') {
  //     message.error(result.message)
  //     return
  //   }

  //   return true
  // }

  @action
  setPreviewImg = (label, url) => {
    this.bannerFormItems.map(value => {
      if (value.label === label) {
        value.preview = url
      }

      return value
    })
  }
}

export default new ArticleModel()