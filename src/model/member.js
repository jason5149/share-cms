import React from 'react'
import moment from 'moment'
import { observable, action } from 'mobx'
import { Badge, message } from 'antd'
import { 
  queryMemberList, 
  queryMemberDetail, 
  queryMemberStatistic, 
} from '@service/member'

class MemberModel {
  @observable
  memberList = []

  @observable
  memberListTotal = 0

  @observable
  memberListColumn = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '昵称', dataIndex: 'nickName', key: 'nickName' },
    { title: '性别', dataIndex: 'sex', key: 'sex', render: text => text === 1 ? '男' : '女' },
    { title: '手机号', dataIndex: 'mobile', key: 'mobile' },
    { title: '位置', dataIndex: 'address', key: 'address' },
    // { title: '任务数', dataIndex: 'mission', key: 'mission' },
    { title: '进行中', dataIndex: 'doingJobCount', key: 'doingJobCount' },
    { title: '已完成', dataIndex: 'finishedJobCount', key: 'finishedJobCount' },
    { title: '总阅读', dataIndex: 'shareReadCount', key: 'shareReadCount' },
    { title: '总转载', dataIndex: 'shareCount', key: 'shareCount' },
    // { title: '赠送阅读数', dataIndex: 'mission', key: 'mission' },
    { title: '积分', dataIndex: 'integral', key: 'integral' },
    { title: '第一次关注时间', dataIndex: 'firstFollowTime', key: 'firstFollowTime', render: text => text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '' },
    { title: '最后关注时间', dataIndex: 'cancelFollowTime', key: 'cancelFollowTime', render: text => text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', render: text => moment(text).format('YYYY-MM-DD HH:mm:ss') },
  ]

  @observable
  memberListPageNum = 1

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
    // { title: '赠送阅读数', dataIndex: 'jhNews.shareCount', key: 'jhNews.shareCount' },
    { title: '赠送阅读数', dataIndex: 'operReadCount  ', key: 'operReadCount  ' },
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
  memberDetail = null

  @observable
  memberStatistic = null

  @action
  queryMemberList = async params => {
    const result = await queryMemberList(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    this.memberListPageNum = params.currentPage

    if (result.body) {
      this.memberList = result.body.list.map(value => {
        value.address = `${ value.country }${ value.province }${ value.city }`

        return value
      })
      this.memberListTotal = result.body.page.totalNum
    }
  }

  @action
  queryMemberDetail = async params => {
    const result = await queryMemberDetail(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    this.memberDetail = result.body
  }

  @action
  queryMemberStatistic = async params => {
    const result = await queryMemberStatistic(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    this.memberStatistic = result.body
  }
}

export default new MemberModel()