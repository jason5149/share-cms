import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { message } from 'antd'
import PageHeader from '@component/PageHeader'
import PageContent from '@component/PageContent'
import PageForm from '@component/PageForm'
// import { BASE_PATH } from '@util/const'

@inject(
  'PrizeModel',
)
@observer
class CreatePrizePage extends Component {
  state = {
    breadcrumbItems: [
      { name: '奖品管理' },
      { name: '添加奖品' },
    ],
  }

  handleSubmit = async (error, values) => {
    const { PrizeModel } = this.props
    const { createPrize } = PrizeModel

    if (error) return

    const { 
      name, 
      type,
      productName,
      brand,
      model,
      specifications,
      convertibility,
      stock,
      marketPrice,
      bannerImg,
      coverImg,
      detailImg,
      sort,
      status,
    } = values

    const coverImgStr = coverImg.map(value => value.response.body)[0]
    const bannerImgStr = bannerImg.map(value => value.response.body).join(',')
    const detailImgStr = detailImg.map(value => value.response.body).join(',')

    const params = {
      name,
      type,
      productName,
      brand,
      model,
      specifications,
      convertibility,
      stock,
      marketPrice: marketPrice * 100,
      coverImg:    coverImgStr,
      bannerImg:   bannerImgStr,
      detailImg:   detailImgStr,
      sort,
      status:      status ? 1 : 0,
    }

    console.log(params)

    const result = await createPrize(params)

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
    const { PrizeModel } = this.props
    const { breadcrumbItems } = this.state
    const { prizeFormItems, setPreviewImg, setMultiplePreviewImg, removeMultiplePreviewImg } = PrizeModel

    return (
      <div className='view-container'>
        <PageHeader title='添加奖品' extraBreadcrumbItems={ breadcrumbItems } />
        <PageContent>
          <PageForm 
            data={ prizeFormItems } 
            onPreviewUpload={ setPreviewImg }
            onMultiplePreviewUpload={ setMultiplePreviewImg }
            onMultiplePreviewRemove={ removeMultiplePreviewImg }
            onSubmit={ this.handleSubmit }
            onCancel={ this.handleCancel }
          />
        </PageContent>
      </div>
    )
  }
}

export default CreatePrizePage