import { observable, action } from 'mobx'
import React from 'react'
import moment from 'moment'
import { Badge, message } from 'antd'
import { 
  queryConfig,
  updateConfig,
  queryChannelList, 
  queryChannelDetail, 
  createChannel, 
  updateChannel, 
  deleteChannel,
} from '@service/promotion'

class PromotionModel {
  @observable
  configFormItems = [
    { label: '新用户赠送阅读数', field: 'readCount', type: 'input', subType: 'number', placeholder: '请输入赠送阅读数', value: null, required: true, validateMessage: '请输入赠送阅读数' },
  ]

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

  @observable
  channelFormItems = [
    { label: '渠道名称', field: 'name', type: 'input', subType: 'string', placeholder: '请输入渠道名称', value: '', required: true, validateMessage: '请输入渠道名称' },
    { label: '渠道参数', field: 'param', type: 'input', subType: 'string', placeholder: '请输入渠道参数', value: '', required: true, validateMessage: '请输入渠道参数' },
    { label: '状态', field: 'status', type: 'switch', desc: ['开', '关'], value: true, required: true, validateMessage: '请选择状态' },
  ]

  @action
  queryConfig = async () => {
    const result = await queryConfig()

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    return this.fillConfigForm(result.body)
  }

  @action
  updateConfig = async params => {
    const result = await updateConfig(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    return true
  }

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
  queryChannelDetail = async params => {
    const result = await queryChannelDetail(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    return this.fillChannelForm(result.body)
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
  updateChannel = async params => {
    const result = await updateChannel(params)

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

  @action
  fillConfigForm = item => {
    this.configFormItems.map(config => {
      if (config.field in item) {
        config.value = item[config.field]
      }

      return config
    })

    return true
  }

  @action
  fillChannelForm = item => {
    this.channelFormItems.map(channel => {
      if (channel.field in item) {
        if (channel.type === 'switch') {
          channel.value = !!item[channel.field]
        } else if (channel.type === 'input') {
          channel.value = item[channel.field]
        }
      }

      return channel
    })

    return true
  }
}

export default new PromotionModel()