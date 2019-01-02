import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { message } from 'antd'
import PageHeader from '@component/PageHeader'
import PageContent from '@component/PageContent'
import PageForm from '@component/PageForm'
import { BASE_PATH } from '@util/const'
import { handleImageObj } from '@util/tool'

@inject(
  'BrandModel',
)
@observer
class CreateBrandPage extends Component {
  state = {
    breadcrumbItems: [
      { name: '品牌商管理' },
      { name: '品牌商列表', link: `${  BASE_PATH }/app/brand/list` },
      { name: '添加品牌商' },
    ],
  }

  componentDidMount() {
    this.init()
  }

  init() {
    this.handleInitForm()
  }

  handleInitForm = () => {
    const { BrandModel } = this.props
    const { emptyBrandForm } = BrandModel

    emptyBrandForm()
  }

  handleSubmit = async (error, values) => {
    if (error) return
    const { BrandModel } = this.props
    const { createBrand } = BrandModel
    const {
      name,
      isImplantation,
      logoImage,
      brandAdImage,
      brandAdUrl,
      standardIntegral,
      readNumber,
      status,
      validDate,
    } = values
    const logoImages = handleImageObj(logoImage[logoImage.length - 1])
    const brandAdImages = handleImageObj(brandAdImage[brandAdImage.length - 1])
    const implantationStartTime = validDate[0].unix() * 1000
    const implantationEndTime = validDate[1].unix() * 1000
    const params = {
      name,
      isImplantation: isImplantation ? 1 : 0,
      logoImage:      logoImages,
      brandAdImage:   brandAdImages,
      brandAdUrl,
      standardIntegral,
      readNumber,
      implantationStartTime,
      implantationEndTime,
      status:         status ? 1 : 0,
    }

    const result = await createBrand(params)

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
    const { BrandModel } = this.props
    const { breadcrumbItems } = this.state
    const { brandFormItems, setPreviewImg } = BrandModel

    return (
      <div className='view-container'>
        <PageHeader title='添加品牌商' extraBreadcrumbItems={ breadcrumbItems } />
        <PageContent>
          <PageForm
            data={ brandFormItems }
            onPreviewUpload={ setPreviewImg }
            onSubmit={ this.handleSubmit }
            onCancel={ this.handleCancel }
          />
        </PageContent>
      </div>
    )
  }
}

export default CreateBrandPage
