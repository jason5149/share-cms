import moment from 'moment'
import { observable, action } from 'mobx'
import { message } from 'antd'
import { queryMemberList, queryMemberDetail } from '@service/member'

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
    // { title: '进行中', dataIndex: 'mission', key: 'mission' },
    // { title: '已完成', dataIndex: 'mission', key: 'mission' },
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

    console.log(result.body)
  }
}

export default new MemberModel()