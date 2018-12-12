import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { message } from 'antd'
import PageHeader from '@component/PageHeader'
import PageContent from '@component/PageContent'
import PageForm from '@component/PageForm'
import { BASE_PATH } from '../../util/const'
// import { BASE_PATH } from '@util/const'

@inject(
  'BrandModel',
)
@observer
class EditBrandPage extends Component {
  state = {
    breadcrumbItems: [
      { name: '品牌商管理' },
      { name: '品牌商列表', link: `${  BASE_PATH }/app/brand/list` },
      { name: '编辑品牌商' },
    ],
    mode:   'edit',
    status: false,
  }

  componentDidMount() {
    this.init()
  }

  init() {
    const { location } = this.props
    const { search } = location

    /* eslint-disable-next-line */
    const params = new URLSearchParams(search)
    const mode = params.get('mode')

    this.setState({
      mode,
    }, () => {
      this.handleSearchBrandDetail()
    })
  }

  handleSearchBrandDetail = async() => {
    const { BrandModel, match } = this.props
    const { params } = match
    const { queryBrandDetail } = BrandModel

    const result = await queryBrandDetail(params)

    if (result) {
      this.setState({
        status: true,
      })
    }
  }

  handleSubmit = async (error, values) => {
    if (error) return
    const { BrandModel, match } = this.props
    const { updateBrand } = BrandModel
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
    const logoImages = typeof logoImage === 'string' ? logoImage : logoImage.map(value => value.response.body)[0]
    const brandAdImages = typeof brandAdImage === 'string' ? brandAdImage : brandAdImage.map(value => value.response.body)[0]
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

    console.log(params)

    const result = await updateBrand({ id: match.params.id, ...params })

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
    const { BrandModel } = this.props
    const { breadcrumbItems, status } = this.state
    const { brandFormItems, setPreviewImg } = BrandModel

    return (
      <div className='view-container'>
        <PageHeader title='编辑品牌商' extraBreadcrumbItems={ breadcrumbItems } />
        <PageContent>
          {status && (
            <PageForm 
              data={ brandFormItems } 
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

export default EditBrandPage