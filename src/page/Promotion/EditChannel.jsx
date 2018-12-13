import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { message } from 'antd'
import PageHeader from '@component/PageHeader'
import PageContent from '@component/PageContent'
import PageForm from '@component/PageForm'
import { BASE_PATH, CHANNEL_LINK } from '@util/const'

@inject(
  'PromotionModel',
)
@observer
class EditChannelPage extends Component {
  state = {
    breadcrumbItems: [
      { name: '推广中心' },
      { name: '渠道列表', link: `${  BASE_PATH }/app/promotion/channel-list` },
      { name: '编辑渠道' },
    ],
    status: false,
  }

  componentDidMount() {
    this.init()
  }

  init() {
    this.handleSearchChannelDetail()
  }

  handleSearchChannelDetail = async() => {
    const { PromotionModel, match } = this.props
    const { queryChannelDetail } = PromotionModel
    const { params } = match

    const result = await queryChannelDetail(params)

    if (result) {
      this.setState({
        status: true,
      })
    }
  }

  handleSubmit = async (error, values) => {
    if (error) return
    const { PromotionModel, match } = this.props
    const { updateChannel } = PromotionModel
    const { 
      name,
      param,
      status,
    } = values
    const params = {
      name,
      param,
      url:    `${ CHANNEL_LINK }?chanelParams=${ param }`,
      status: status ? 1 : 0,
    }

    const result = await updateChannel({ id: match.params.id, ...params })

    if (result) {
      message.success('编辑成功')

      setTimeout(() => {
        this.handleCancel()
      }, 500)
    }
  }

  handleCancel = () => {
    const { history } = this.props

    history.goBack()
  }

  render() {
    const { PromotionModel } = this.props
    const { breadcrumbItems, status } = this.state
    const { channelFormItems, setPreviewImg } = PromotionModel

    return (
      <div className='view-container'>
        <PageHeader title='编辑渠道' extraBreadcrumbItems={ breadcrumbItems } />
        <PageContent>
          {status && (
            <PageForm 
              data={ channelFormItems } 
              onPreviewUpload={ setPreviewImg }
              onSubmit={ this.handleSubmit }
              onCancel={ this.handleCancel }
            />
          )}
        </PageContent>
      </div>
    )
  }
}

export default EditChannelPage