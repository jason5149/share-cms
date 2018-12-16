import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PageHeader from '@component/PageHeader'
import PageContent from '@component/PageContent'
import { BASE_PATH } from '@util/const'

@inject(
  'MemberModel',
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
  }

  handleSearchMemberDetail = () => {
    const { MemberModel, match } = this.props
    const { queryMemberDetail } = MemberModel
    const { params } = match

    queryMemberDetail(params)
  }

  render() {
    // const { MemberModel } = this.props
    const { breadcrumbItems } = this.state

    return (
      <div className='view-container'>
        <PageHeader title='会员详情' extraBreadcrumbItems={ breadcrumbItems } />
        <PageContent />
      </div>
    )
  }
}

export default MemberDetalPage