import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { message } from 'antd'
import PageHeader from '@component/PageHeader'
import PageContent from '@component/PageContent'
import PageForm from '@component/PageForm'
import { handleImageObj } from '@util/tool'

@inject(
  'FollowModel',
)
@observer
class ConfigPage extends Component {
  state = {
    breadcrumbItems: [
      { name: '关注页管理' },
      { name: '关注页配置' },
    ],
    status: false,
  }

  componentDidMount() {
    this.init()
  }

  init() {
    this.handleSearchFollowConfig()
  }

  handleSearchFollowConfig = async () => {
    const { FollowModel } = this.props
    const { queryConfig } = FollowModel

    const result = await queryConfig()

    if (result) {
      this.setState({
        status: true,
      })
    }
  }

  handleSubmit = async (error, values) => {
    if (error) return
    const { FollowModel } = this.props
    const { updateConfig } = FollowModel
    const {
      context,
      backImage,
    } = values
    const backImages = handleImageObj(backImage[backImage.length - 1])
    const params = {
      context,
      backImage: backImages,
    }

    const result = await updateConfig(params)

    if (result) {
      this.handleSearchFollowConfig()

      message.success('提交成功')
    }
  }

  handleCancel = () => {
    const { history } = this.props

    history.goBack()
  }

  render() {
    const { FollowModel } = this.props
    const { breadcrumbItems, status } = this.state
    const { configFormItems, setPreviewImg } = FollowModel

    return (
      <div className='view-container'>
        <PageHeader title='关注页配置' extraBreadcrumbItems={ breadcrumbItems } />
        <PageContent>
          {status && (
            <PageForm
              data={ configFormItems }
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

export default ConfigPage
