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
class CreateChannelPage extends Component {
  state = {
    breadcrumbItems: [
      { name: '推广中心' },
      { name: '渠道列表', link: `${  BASE_PATH }/app/promotion/channel-list` },
      { name: '添加渠道' },
    ],
  }

  handleSubmit = async (error, values) => {
    if (error) return
    const { PromotionModel } = this.props
    const { createChannel } = PromotionModel
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

    const result = await createChannel(params)

    if (result) {
      message.success('添加成功')

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
    const { breadcrumbItems } = this.state
    const { channelFormItems, setPreviewImg } = PromotionModel

    return (
      <div className='view-container'>
        <PageHeader title='添加渠道' extraBreadcrumbItems={ breadcrumbItems } />
        <PageContent>
          <PageForm 
            data={ channelFormItems } 
            onPreviewUpload={ setPreviewImg }
            onSubmit={ this.handleSubmit }
            onCancel={ this.handleCancel }
          />
        </PageContent>
      </div>
    )
  }
}

export default CreateChannelPage