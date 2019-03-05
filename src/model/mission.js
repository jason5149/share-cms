import React from 'react'
import moment from 'moment'
import { observable, action } from 'mobx'
import { Badge, message } from 'antd'
import { 
  queryMissionList, 
  queryExchangeList, 
  queryExchangeDetail,
  deliveryShip,
  queryExpressList, 
  queryExpressDetail, 
  createExpress,
  updateExpress,
  deleteExpress,
} from '@service/mission'
import { SHIPMENT_TYPE_DESC } from '../util/const'

class MissionModel {
  @observable
  missionList = []

  @observable
  missionListTotal = 0

  @observable
  missionListColumn = [
    { title: '任务流水号', dataIndex: 'jobNo', key: 'jobNo' },
    { title: '任务标题', dataIndex: 'newsTitle', key: 'newsTitle' },
    { title: '任务人', dataIndex: 'userName', key: 'userName' },
    { title: '达标阅读数', dataIndex: 'jhNews.readCount', key: 'jhNews.readCount' },
    // { title: '达标阅读数', dataIndex: 'newsReadCount', key: 'newsReadCount' },
    // { title: '赠送阅读数', dataIndex: 'newsShareCount', key: 'newsShareCount' },
    { title: '赠送阅读数', dataIndex: 'jhNews.shareCount', key: 'jhNews.shareCount' },
    { title: '阅读数', dataIndex: 'readCount', key: 'readCount' },
    { title: '转载数', dataIndex: 'reprintCount', key: 'reprintCount' },
    { title: '分享次数', dataIndex: 'shareCount', key: 'shareCount' },
    {  
      title:     '状态', 
      dataIndex: 'status', 
      key:       'status', 
      render:    text => text === 1 ? <Badge status='success' text='正常' /> : <Badge status='error' text='关闭' />, 
    },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', render: text => moment(text).format('YYYY-MM-DD HH:mm:ss') },
    { title: '完成时间', dataIndex: 'completeTime', key: 'completeTime', render: text => text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '' },
  ]

  @observable
  missionListPageNum = 1

  @observable
  exchangeList = []

  @observable
  exchangeListTotal = 0

  @observable
  exchangeListColumn = [
    { title: '兑奖流水号', dataIndex: 'id', key: 'id' },
    { title: '奖品名称', dataIndex: 'prizeName', key: 'prizeName' },
    { title: '兑奖人', dataIndex: 'userName', key: 'userName' },
    { title: '数量', dataIndex: 'prizeCount', key: 'prizeCount' },
    { title: '兑奖积分', dataIndex: 'reprintCount', key: 'reprintCount' },
    { title: '使用积分', dataIndex: 'shareCount', key: 'shareCount' },
    { 
      title:     '发货类型', 
      dataIndex: 'shipmentType', 
      key:       'shipmentType', 
      render:    text => SHIPMENT_TYPE_DESC[text],
    },
    // { title: '收件人', dataIndex: 'shareCount', key: 'shareCount' },
    { title: '快递公司', dataIndex: 'expressCompany', key: 'expressCompany' },
    { title: '快递单号', dataIndex: 'expressNo', key: 'expressNo' },
    {  
      title:     '状态', 
      dataIndex: 'status', 
      key:       'status', 
      render:    text => text === 1 ? <Badge status='success' text='正常' /> : <Badge status='error' text='关闭' />, 
    },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', render: text => moment(text).format('YYYY-MM-DD HH:mm:ss') },
    { title: '发货时间', dataIndex: 'shiipmentTime', key: 'shiipmentTime', render: text => moment(text).format('YYYY-MM-DD HH:mm:ss') },
  ]

  @observable
  exchangeListPageNum = 1

  @observable
  exchangeDetail = null

  @observable
  expressList = []

  @observable
  expressListTotal = 0

  @observable
  expressListColumn = [
    { title: '快递公司', dataIndex: 'name', key: 'name' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', render: text => moment(text).format('YYYY-MM-DD HH:mm:ss') },
  ]

  @observable
  expressListPageNum = 1

  @action
  queryMissionList = async params => {
    const result = await queryMissionList(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    this.missionListPageNum = params.currentPage

    if (result.body) {
      this.missionList = result.body.list
      this.missionListTotal = result.body.page.totalNum
    }
  }

  @action
  queryExchangeList = async params => {
    const result = await queryExchangeList(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    this.exchangeListPageNum = params.currentPage

    if (result.body) {
      this.exchangeList = result.body.list
      this.exchangeListTotal = result.body.page.totalNum
    }
  }

  @action
  queryExchangeDetail = async params => {
    const result = await queryExchangeDetail(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    this.exchangeDetail = result.body
  }

  @action
  deliveryShip = async params => {
    const result = await deliveryShip(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    return true
  }

  @action
  queryExpressList = async params => {
    const result = await queryExpressList(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    this.expressListPageNum = params.currentPage

    if (result.body) {
      this.expressList = result.body.list
      this.expressListTotal = result.body.page.totalNum
    }
  }

  @action
  queryExpressDetail = async params => {
    const result = await queryExpressDetail(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    return result.body
  }

  @action
  createExpress = async params => {
    const result = await createExpress(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    return true
  }

  @action
  updateExpress = async params => {
    const result = await updateExpress(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    return true
  }

  @action
  deleteExpress = async params => {
    const result = await deleteExpress(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    return true
  }

  @action
  resetPageNum = type => {
    if (type === 'mission') {
      this.missionListPageNum = 1
    } else {
      this.exchangeListPageNum = 1
    }
  }
}

export default new MissionModel()