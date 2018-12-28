import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { message } from 'antd'
import PageHeader from '@component/PageHeader'
import PageContent from '@component/PageContent'
import PageForm from '@component/PageForm'

@inject(
  'PromotionModel',
)
@observer
class ConfigPage extends Component {
  state = {
    breadcrumbItems: [
      { name: '推广中心' },
      { name: '推广配置' },
    ],
    status: false,
  }

  componentDidMount() {
    this.init()
  }

  init() {
    this.handleSearchPromotionConfig()
  }

  handleSearchPromotionConfig = async () => {
    const { PromotionModel } = this.props
    const { queryConfig } = PromotionModel

    const result = await queryConfig()

    if (result) {
      this.setState({
        status: true,
      })
    }
  }

  handleSubmit = async (error, values) => {
    if (error) return
    const { PromotionModel } = this.props
    const { updateConfig } = PromotionModel

    const result = await updateConfig(values)
    if (result) {
      this.handleSearchPromotionConfig()

      message.success('提交成功')
    }
  }

  handleCancel = () => {
    const { history } = this.props

    history.goBack()
  }

  render() {
    const { PromotionModel } = this.props
    const { breadcrumbItems, status } = this.state
    const { configFormItems } = PromotionModel

    return (
      <div className='view-container'>
        <PageHeader title='推广配置' extraBreadcrumbItems={ breadcrumbItems } />
        <PageContent>
          {status && (
            <PageForm 
              data={ configFormItems } 
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