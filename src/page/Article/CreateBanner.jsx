import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { message } from 'antd'
import PageHeader from '@component/PageHeader'
import PageContent from '@component/PageContent'
import PageForm from '@component/PageForm'
import { BASE_PATH } from '@util/const'

@inject(
  'ArticleModel',
)
@observer
class CreateBannerPage extends Component {
  state = {
    breadcrumbItems: [
      { name: '热文库管理' },
      { name: 'Banner列表', link: `${ BASE_PATH }/app/article/banner-list` },
      { name: '添加Banner' },
    ],
  }

  handleSubmit = async (error, values) => {
    if (error) return
    const { ArticleModel } = this.props
    const { createBanner } = ArticleModel
    const {
      title,
      type,
      image,
      url,
      sort,
      validDate,
      status,
    } = values
    const images = image.map(value => value.response.body)[0]
    const startTime = validDate[0].unix() * 1000
    const endTime = validDate[1].unix() * 1000
    const params = {
      title,
      type,
      image:  images,
      url,
      sort,
      startTime,
      endTime,
      status: status ? 1 : 0,
    }

    const result = await createBanner(params)

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
    const { ArticleModel } = this.props
    const { breadcrumbItems } = this.state
    const { bannerFormItems, setPreviewImg } = ArticleModel

    return (
      <div className='view-container'>
        <PageHeader title='添加Banner' extraBreadcrumbItems={ breadcrumbItems } />
        <PageContent>
          <PageForm 
            data={ bannerFormItems } 
            onPreviewUpload={ setPreviewImg }
            onSubmit={ this.handleSubmit }
            onCancel={ this.handleCancel }
          />
        </PageContent>
      </div>
    )
  }
}

export default CreateBannerPage