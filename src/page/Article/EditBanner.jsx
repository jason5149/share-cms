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
class EditBannerPage extends Component {
  state = {
    breadcrumbItems: [
      { name: '热文库管理' },
      { name: 'Banner列表', link: `${ BASE_PATH }/app/article/banner-list` },
      { name: '编辑Banner' },
    ],
    // mode:         'edit',
    status: false,
  }

  componentDidMount() {
    this.init()
  }

  init() {
    this.handleSearchBannerDetail()
  }

  handleSearchBannerDetail = async() => {
    const { ArticleModel, match } = this.props
    const { queryBannerDetail } = ArticleModel
    const { params } = match

    const result = await queryBannerDetail(params)

    if (result) {
      this.setState({
        status: true,
      })
    }
  }

  handleSubmit = async (error, values) => {
    if (error) return
    const { ArticleModel, match } = this.props
    const { updateBanner } = ArticleModel
    const {
      title,
      type,
      image,
      url,
      sort,
      validDate,
      status,
    } = values
    const images = handleImageObj(image[image.length - 1])
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

    const result = await updateBanner({ id: match.params.id, ...params })

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
    const { bannerFormItems, setPreviewImg } = ArticleModel

    return (
      <div className='view-container'>
        <PageHeader title='编辑Banner' extraBreadcrumbItems={ breadcrumbItems } />
        <PageContent>
          {status && (
            <PageForm 
              data={ bannerFormItems } 
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

export default EditBannerPage