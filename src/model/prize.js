import React from 'react'
import { observable, action } from 'mobx'
import { Badge, message } from 'antd'
import { queryPrizeList, createPrize } from '@service/prize'
import { PRIZE_TYPE_OPTIONS, PRIZE_TYPE_DESC } from '@util/const'

class PrizeModel {
  @observable
  prizeList = []

  @observable
  prizeListTotal = 0

  @observable
  prizeListColumn = [
    { title: '奖品名称', dataIndex: 'name', key: 'name' },
    { title: '奖品类型', dataIndex: 'type', key: 'type', render: text => <span>{PRIZE_TYPE_DESC[text]}</span> },
    { title: '品牌', dataIndex: 'brand', key: 'brand' },
    { title: '库存', dataIndex: 'stock', key: 'stock' },
    { title: '剩余库存', dataIndex: 'surplusStock', key: 'surplusStock' },
    { title: '兑换积分', dataIndex: 'convertibility', key: 'convertibility' },
    { 
      title:     '状态', 
      dataIndex: 'status', 
      key:       'status', 
      render:    text => text === 1 ? <Badge status='success' text='正常' /> : <Badge status='error' text='关闭' />, 
    },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
  ]

  @observable
  prizeListPageNum = 1

  @observable
  prizeFormItems = [
    { label: '奖品名称', field: 'name', type: 'input', subType: 'string', placeholder: '请输入奖品名称', required: true, validateMessage: '请输入奖品名称' },
    { label: '奖品类型', field: 'type', type: 'radio', src: PRIZE_TYPE_OPTIONS, value: 1, required: true, validateMessage: '请选择奖品类型' },
    { label: '奖品品名', field: 'productName', type: 'input', subType: 'string', placeholder: '请输入奖品品名', required: true, validateMessage: '请输入奖品品名' },
    { label: '奖品品牌', field: 'brand', type: 'input', subType: 'string', placeholder: '请输入奖品品牌', required: true, validateMessage: '请输入奖品品牌' },
    { label: '奖品型号', field: 'model', type: 'input', subType: 'string', placeholder: '请输入奖品型号', required: true, validateMessage: '请输入奖品型号' },
    { label: '奖品规格', field: 'specifications', type: 'input', subType: 'string', placeholder: '请输入奖品规格', required: true, validateMessage: '请输入奖品规格' },
    { label: '奖品兑换积分', field: 'convertibility', type: 'input', subType: 'number', placeholder: '请输入奖品兑换积分', required: true, validateMessage: '请输入奖品兑换积分' },
    { label: '奖品库存', field: 'stock', type: 'input', subType: 'number', placeholder: '请输入奖品库存', required: true, validateMessage: '请输入奖品库存' },
    { label: '市场参考价', field: 'marketPrice', type: 'input', subType: 'number', placeholder: '请输入奖品市场参考价', required: true, validateMessage: '请输入奖品市场参考价' },
    { label: '奖品封面图', field: 'coverImg', type: 'upload', subType: 'single', preview: '', required: true, validateMessage: '请上传奖品封面图' },
    { label: '奖品轮播图', field: 'bannerImg', type: 'upload', subType: 'multiple', preview: [], limit: 5, required: true, validateMessage: '请上传奖品封面图' },
    { label: '奖品详情图', field: 'detailImg', type: 'upload', subType: 'multiple', preview: [], limit: 5, required: true, validateMessage: '请上传奖品详情图' },
    { label: '排序', field: 'sort', type: 'input', subType: 'number', placeholder: '请设置奖品排序', required: true, validateMessage: '请设置奖品排序' },
    { label: '状态', field: 'status', type: 'switch', desc: ['开', '关'], value: true, required: true, validateMessage: '请选择状态' },
  ]

  @action
  queryPrizeList = async params => {
    const result = await queryPrizeList(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    this.prizeListPageNum = params.currentPage

    if (result.body) {
      this.prizeList = result.body.list
      this.prizeListTotal = result.body.page.totalNum
    }
  }

  @action
  createPrize = async params => {
    const result = await createPrize(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    return true
  }

  @action
  setPreviewImg = (label, url) => {
    this.prizeFormItems.map(value => {
      if (value.label === label) {
        value.preview = url
      }

      return value
    })
  }

  @action
  setMultiplePreviewImg = (label, fileList) => {
    this.prizeFormItems.map(value => {
      if (value.label === label) {
        value.preview = fileList
      }

      return value
    })
  }

  @action
  removeMultiplePreviewImg = (label, url) => {
    this.prizeFormItems.map(value => {
      if (value.label === label) {
        value.preview = value.preview.filter(file => file.response.body !== url)
      }

      return value
    })
  }
}

export default new PrizeModel()