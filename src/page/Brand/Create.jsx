import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PageHeader from '@component/PageHeader'
import PageContent from '@component/PageContent'
import PageForm from '@component/PageForm'
// import { BASE_PATH } from '@util/const'

@inject(
  'BrandModel',
)
@observer
class CreateBrandPage extends Component {
  state = {
    breadcrumbItems: [
      { name: '品牌商管理' },
      { name: '添加品牌商' },
    ],
  }

  handleSubmit = (error, values) => {
    console.log(error, values)
    if (error) return

    console.log(values)
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