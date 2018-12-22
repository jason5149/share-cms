import { observable, action } from 'mobx'
import React from 'react'
import moment from 'moment'
import { Badge, message } from 'antd'
import { 
  queryNewsList, 
  queryNewsTemplate,
  updateNewsTemplate,
  queryBannerList, 
  queryBannerDetail, 
  createBanner, 
  updateBanner, 
  deleteBanner,
} from '@service/article'
import { BANNER_TYPE_OPTIONS, BANNER_TYPE_DESC } from '@util/const'

class ArticleModel {
  @observable
  newsList = []

  @observable
  newsListTotal = 0

  @observable
  newsListColumn = [
    { title: '标题', dataIndex: 'title', key: 'title' },
    // { title: '类型', dataIndex: 'type', key: 'type', render: text => <span>{NEWS_TYPE_DESC[text]}</span> },
    { title: '类型', dataIndex: 'category', key: 'category' },
    { title: '来源', dataIndex: 'author_name', key: 'author_name' },
    { title: '总阅读数', dataIndex: 'readCount', key: 'readCount' },
    // { title: '任务数', dataIndex: 'readCount', key: 'readCount' },
    { title: '进行中', dataIndex: 'doingJobCount', key: 'doingJobCount' },
    { title: '已完成', dataIndex: 'finishedJobCount', key: 'finishedJobCount' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', render: text => moment(text).format('YYYY-MM-DD HH:mm:ss') },
  ]

  @observable
  newsListPageNum = 1

  @observable
  newsTemplateFormItems = [
    { label: '平台广告语', field: 'platAd', type: 'input', subType: 'string', placeholder: '请输入平台广告语', value: '', required: true, validateMessage: '请输入平台广告语' },
    { label: '引导广告语', field: 'guideAd', type: 'input', subType: 'string', placeholder: '请输入引导广告语', value: '', required: true, validateMessage: '请输入引导广告语' },
    { label: '分享广告语', field: 'shareAd', type: 'input', subType: 'string', placeholder: '请输入分享广告语', value: '', required: true, validateMessage: '请输入分享广告语' },
    { label: '业务流程图', field: 'businessFlow', type: 'upload', subType: 'single', preview: [], required: true, validateMessage: '请上传业务流程图' },
    { label: '按钮名称', field: 'buttonName', type: 'input', subType: 'string', placeholder: '请输入按钮名称', value: '', required: true, validateMessage: '请输入按钮名称' },
    { label: '免责申明', field: 'exemption', type: 'input', subType: 'string', placeholder: '请输入免责申明', value: '', required: true, validateMessage: '请输入免责申明' },
    { label: '二维码引导语', field: 'qrCodeGuide', type: 'input', subType: 'string', placeholder: '请输入二维码引导语', value: '', required: true, validateMessage: '请输入二维码引导语' },
  ]
  
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
    { label: '图片', field: 'image', type: 'upload', subType: 'single', preview: [], required: true, validateMessage: '请上传Banner图' },
    { label: '链接地址', field: 'url', type: 'input', subType: 'string', placeholder: '请输入图片跳转链接', value: '' },
    { label: '状态', field: 'status', type: 'switch', desc: ['开', '关'], value: true, required: true, validateMessage: '请选择状态' },
  ]

  @action
  queryNewsList = async params => {
    const result = await queryNewsList(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    this.newsListPageNum = params.currentPage

    if (result.body) {
      this.newsList = result.body.list
      this.newsListTotal = result.body.page.totalNum
    }
  }

  @action
  queryNewsTemplate = async params => {
    const result = await queryNewsTemplate(params)

    if (result.code !== '10000') {
      message.error(result.message, 1)
      return
    }

    return this.fillNewsTemplateForm(result.body)
  }

  @action
  updateNewsTemplate = async params => {
    const result = await updateNewsTemplate(params)

    if (result.code !== '10000') {
      message.error(result.message, 1)
      return
    }

    return true
  }

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

    return this.fillBannerForm(result.body)
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
  setPreviewImg = (label, file) => {
    this.bannerFormItems.map(value => {
      if (value.label === label) {
        value.preview.splice(0, 1, file)
      }

      return value
    })
  }

  @action
  setTemplatePreviewImg = (label, file) => {
    this.newsTemplateFormItems.map(value => {
      if (value.label === label) {
        value.preview.splice(0, 1, file)
      }

      return value
    })
  }

  @action
  fillNewsTemplateForm = item => {
    this.newsTemplateFormItems.map(template => {
      if (template.field in item) {
        if (['input'].indexOf(template.type) !== -1) {
          template.value = item[template.field]
        } else if (template.type === 'upload') {
          template.preview = [{ 
            uid:    '-1', 
            name:   `${ template.field }.png`, 
            status: 'done', 
            url:    item[template.field], 
          }]
        }
      }

      return template
    })

    return true
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
          banner.preview = [{ 
            uid:    '-1', 
            name:   `${ banner.field }.png`, 
            status: 'done', 
            url:    item[banner.field], 
          }]
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