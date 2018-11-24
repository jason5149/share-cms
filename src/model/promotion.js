import { observable, action } from 'mobx'
import React from 'react'
import moment from 'moment'
import { Badge, message } from 'antd'
import { queryChannelList, createChannel, deleteChannel } from '@service/promotion'

class PromotionModel {
  @observable
  channelList = []

  @observable 
  channelListTotal = 0

  @observable
  channelListColumn = [
    { title: '名称', dataIndex: 'name', key: 'name' },
    { title: '参数', dataIndex: 'param', key: 'param' },
    { title: '链接', dataIndex: 'url', key: 'url' },
    // { title: '创建人', dataIndex: 'name', key: 'name' },
    { 
      title:     '状态', 
      dataIndex: 'status', 
      key:       'status',
      render:    text => text === 1 ? <Badge status='success' text='正常' /> : <Badge status='error' text='关闭' />,
    },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', render: text => moment(text).format('YYYY-MM-DD HH:mm:ss') },
  ]

  @observable
  channelListPageNum = 1

  @action
  queryChannelList = async params => {
    const result = await queryChannelList(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    this.channelListPageNum = params.currentPage

    if (result.body) {
      this.channelList = result.body.list
      this.channelListTotal = result.body.page.totalNum
    }
  }

  @action
  createChannel = async params => {
    const result = await createChannel(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    return true
  }

  @action
  deleteChannel = async params => {
    const result = await deleteChannel(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    return true
  }
}

export default new PromotionModel()