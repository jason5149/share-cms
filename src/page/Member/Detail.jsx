import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import { Card, Row, Col, Tabs } from 'antd'
import PageHeader from '@component/PageHeader'
import PageContent from '@component/PageContent'
import PageTable from '@component/PageTable'
import { BASE_PATH, PARTNER_TYPE_DESC } from '@util/const'

const { TabPane } = Tabs

@inject(
  'MemberModel',
  'MissionModel',
)
@observer
class MemberDetalPage extends Component {
  state = {
    breadcrumbItems: [
      { name: '会员管理' },
      { name: '会员列表', link: `${  BASE_PATH }/app/member/list` },
      { name: '会员详情' },
    ],
  }

  componentDidMount() {
    this.init()
  }

  init() {
    this.handleSearchMemberDetail()
    this.handleSearchMissionList()
  }

  handleSearchMemberDetail = () => {
    const { MemberModel, match } = this.props
    const { queryMemberDetail, queryMemberStatistic } = MemberModel
    const { params } = match

    queryMemberDetail(params)
    queryMemberStatistic(params)
  }

  handleTabChange = tab => {
    // const { MissionModel } = this.props
    // const { resetPageNum } = MissionModel

    // resetPageNum(tab)

    if (tab === 'mission') {
      this.handleSearchMissionList(1)
    } else if (tab === 'exchange') {
      this.handleSearchExchangeList(1)
    } else {
      this.handleSearchMemberList(1)
    }
  }

  handleSearchMissionList = (currentPage = 1) => {
    const { MissionModel, match } = this.props
    const { queryMissionList } = MissionModel

    const params = {
      currentPage,
      pageSize: 10,
      userId:   match.params.id,
    }

    queryMissionList(params)
  }

  handleSearchExchangeList = (currentPage = 1) => {
    const { MissionModel, match } = this.props
    const { queryExchangeList } = MissionModel

    const params = {
      currentPage,
      pageSize: 10,
      userId:   match.params.id,
    }

    queryExchangeList(params)
  }

  handleSearchMemberList = (currentPage = 1) => {
    const { MemberModel, match } = this.props
    const { queryMemberList } = MemberModel

    const params = {
      currentPage,
      pageSize:  10,
      partnerId: match.params.id,
    }

    queryMemberList(params)
  }

  handlePageChange = (type, currentPage) => {
    if (type === 'mission') {
      this.handleSearchMissionList(currentPage)
    } else if (type === 'exchange') {
      this.handleSearchExchangeList(currentPage)
    } else {
      this.handleSearchMemberList(currentPage)
    }
  }

  render() {
    const { MemberModel, MissionModel } = this.props
    const { breadcrumbItems } = this.state
    const { 
      memberList, 
      memberListTotal, 
      memberListColumn,
      memberListPageNum, 
      missionList, 
      missionListTotal, 
      missionListColumn,
      missionListPageNum, 
      memberDetail,
      memberStatistic,
    } = MemberModel
    const { 
      // missionList, 
      // missionListTotal, 
      // missionListColumn,
      // missionListPageNum, 
      exchangeList, 
      exchangeListTotal, 
      exchangeListColumn,
      exchangeListPageNum, 
    } = MissionModel

    if (!memberDetail) return null

    const { 
      id,
      nickName,
      country,
      sex,
      province,
      mobile,
      city,
      // partnerId,
      partnerType,
      location,
      firstFollowTime,
      lastFollowTime,
      cancelFollowTime,
      // doingJobCount,
      // finishedJobCount,
      // integral,
    } = memberDetail

    if (!memberStatistic) return null

    const { 
      loginCount,
      lastLoginTime,
      allIntegral,
      integral,
      // shareCount,
      shareReprintCount,
      userDoingJobCount,
      userDoneJobCount,
      shareReadCount,
      // userJobCount,
    } = memberStatistic


    return (
      <div className='view-container'>
        <PageHeader title='会员详情' extraBreadcrumbItems={ breadcrumbItems } />
        <PageContent>
          <Card title='基本信息'>
            <Row gutter={ 24 }>
              <Col span={ 12 }>
                <span className='label'>ID：</span>
                <span className='desc'>{id}</span>
              </Col>
              {/* <Col span={ 12 }>
                openid：
                xxx
              </Col> */}
              <Col span={ 12 }>
                <span className='label'>昵称：</span>
                <span className='desc'>{nickName}</span>
              </Col>
              <Col span={ 12 }>
                <span className='label'>所在国家：</span>
                <span className='desc'>{country}</span>
              </Col>
              <Col span={ 12 }>
                <span className='label'>性别：</span>
                <span className='desc'>{sex ? '男' : '女'}</span>
              </Col>
              <Col span={ 12 }>
                <span className='label'>省份：</span>
                <span className='desc'>{province}</span>
              </Col>
              <Col span={ 12 }>
                <span className='label'>手机号：</span>
                <span className='desc'>{mobile}</span>
              </Col>
              <Col span={ 12 }>
                <span className='label'>城市：</span>
                <span className='desc'>{city}</span>
              </Col>
              <Col span={ 12 }>
                <span className='label'>用户来源：</span>
                {/* <span className='desc'>{partnerId}</span> */}
                <span className='desc'>{PARTNER_TYPE_DESC[partnerType]}</span>
              </Col>
              {/* <Col span={ 12 }>
                语言：
              </Col> */}
              <Col span={ 12 }>
                <span className='label'>第一次关注时间：</span>
                <span className='desc'>{firstFollowTime && moment(firstFollowTime).format('YYYY-MM-DD HH:mm:ss')}</span>
              </Col>
              <Col span={ 12 }>
                <span className='label'>最后一次关注时间：</span>
                <span className='desc'>{lastFollowTime && moment(lastFollowTime).format('YYYY-MM-DD HH:mm:ss')}</span>
              </Col>
              <Col span={ 12 }>
                <span className='label'>取消关注时间：</span>
                <span className='desc'>{}</span>
                <span className='desc'>{cancelFollowTime && moment(cancelFollowTime).format('YYYY-MM-DD HH:mm:ss')}</span>
              </Col>
              <Col span={ 12 }>
                <span className='label'>地址位置：</span>
                <span className='desc'>{location}</span>
              </Col>
            </Row>
          </Card>
          <div>&nbsp;</div>
          <Card title='账户信息'>
            <Row gutter={ 24 }>
              <Col span={ 12 }>
                <span className='label'>最近一次访问平台时间：</span>
                {/* <span className='desc' /> */}
                <span className='desc'>{lastLoginTime}</span>
              </Col>
              <Col span={ 12 }>
                <span className='label'>访问平台次数：</span>
                {/* <span className='desc' /> */}
                <span className='desc'>{loginCount}</span>
              </Col>
              <Col span={ 12 }>
                <span className='label'>总阅读：</span>
                <span className='desc'>{shareReadCount}</span>
              </Col>
              <Col span={ 12 }>
                <span className='label'>总转载：</span>
                <span className='desc'>{shareReprintCount}</span>
              </Col>
              <Col span={ 12 }>
                <span className='label'>任务数：</span>
                <span className='desc'>{userDoingJobCount + userDoneJobCount}</span>
              </Col>
              <Col span={ 12 }>
                <span className='label'>进行中：</span>
                <span className='desc'>{userDoingJobCount}</span>
              </Col>
              <Col span={ 12 }>
                <span className='label'>已完成：</span>
                <span className='desc'>{userDoneJobCount}</span>
              </Col>
              <Col span={ 12 }>
                <span className='label'>总积分：</span>
                <span className='desc'>{allIntegral}</span>
              </Col>
              <Col span={ 12 }>
                <span className='label'>总零钱：</span>
                <span className='desc' />
              </Col>
              <Col span={ 12 }>
                <span className='label'>积分：</span>
                <span className='desc'>{integral}</span>
              </Col>
              <Col span={ 12 }>
                <span className='label'>零钱：</span>
                <span className='desc' />
              </Col>
            </Row>
          </Card>
          <div>&nbsp;</div>
          <Card title='明细列表'>
            <Tabs onChange={ this.handleTabChange } type='card'>
              <TabPane tab='任务明细' key='mission'>
                <PageTable 
                  rowKey='id'
                  total={ missionListTotal }
                  columns={ missionListColumn }
                  pageNum={ missionListPageNum }
                  pageSize={ 10 }
                  dataSource={ missionList }
                  onPageChange={ currentPage => this.handlePageChange('mission', currentPage) }
                />
              </TabPane>
              <TabPane tab='积分兑奖明细' key='exchange'>
                <PageTable 
                  rowKey='id'
                  total={ exchangeListTotal }
                  columns={ exchangeListColumn }
                  pageNum={ exchangeListPageNum }
                  pageSize={ 10 }
                  dataSource={ exchangeList }
                  // onPageChange={ this.handlePageChange }
                  onPageChange={ currentPage => this.handlePageChange('exchange', currentPage) }
                />
              </TabPane>
              <TabPane tab='推荐用户明细' key='partner'>
                <PageTable 
                  rowKey='id'
                  total={ memberListTotal }
                  // columns={ missionListColumn }
                  columns={ memberListColumn }
                  pageNum={ memberListPageNum }
                  pageSize={ 10 }
                  dataSource={ memberList }
                  // onPageChange={ this.handlePageChange }
                  onPageChange={ currentPage => this.handlePageChange('partner', currentPage) }
                />
              </TabPane>
            </Tabs>
          </Card>
        </PageContent>
      </div>
    )
  }
}

export default MemberDetalPage