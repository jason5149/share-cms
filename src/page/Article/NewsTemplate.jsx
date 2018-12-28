import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { message } from 'antd'
import PageHeader from '@component/PageHeader'
import PageContent from '@component/PageContent'
import PageForm from '@component/PageForm'
import { BASE_PATH } from '@util/const'
import { handleImageObj } from '@util/tool'

@inject(
  'ArticleModel',
)
@observer
class NewsTemplatePage extends Component {
  state = {
    breadcrumbItems: [
      { name: '热文库管理' },
      { name: '热文库列表', link: `${ BASE_PATH }/app/article/news-list` },
      { name: '热文库模板' },
    ],
    // mode:         'edit',
    status: true,
  }

  componentDidMount() {
    this.init()
  }

  init() {
    this.handleSearchNewsTemplate()
  }

  handleSearchNewsTemplate = async() => {
    const { ArticleModel, match } = this.props
    const { queryNewsTemplate } = ArticleModel
    const { params } = match

    const result = await queryNewsTemplate(params)

    if (result) {
      this.setState({
        status: true,
      })
    }
  }

  handleSubmit = async (error, values) => {
    if (error) return
    const { ArticleModel } = this.props
    const { updateNewsTemplate } = ArticleModel
    const {
      platAd,
      guideAd,
      shareAd,
      businessFlow,
      buttonName,
      adSort,
      exemption,
      qrCodeGuide,
    } = values
    const businessFlows = handleImageObj(businessFlow[businessFlow.length - 1])
    const params = {}

    if (platAd) {
      params.platAd = platAd
    }
    if (guideAd) {
      params.guideAd = guideAd
    }
    if (shareAd) {
      params.shareAd = shareAd
    }
    if (businessFlow) {
      params.businessFlow = businessFlows
    }
    if (buttonName) {
      params.buttonName = buttonName
    }
    if (adSort) {
      params.adSort = adSort
    }
    if (exemption) {
      params.exemption = exemption
    }
    if (qrCodeGuide) {
      params.qrCodeGuide = qrCodeGuide
    }

    const result = await updateNewsTemplate(params)

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
    const { ArticleModel } = this.props
    const { breadcrumbItems, status } = this.state
    const { newsTemplateFormItems, setTemplatePreviewImg } = ArticleModel

    return (
      <div className='view-container'>
        <PageHeader title='热文库模板' extraBreadcrumbItems={ breadcrumbItems } />
        <PageContent>
          {status && (
            <PageForm 
              data={ newsTemplateFormItems } 
              onPreviewUpload={ setTemplatePreviewImg }
              onSubmit={ this.handleSubmit }
              onCancel={ this.handleCancel }
            />
          )}
        </PageContent>
      </div>
    )
  }
}

export default NewsTemplatePage