import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
// import moment from 'moment'
import { Row, Col, Form, Input, InputNumber, Upload, Radio, Switch, DatePicker, Button, Modal, message } from 'antd'
import { UPLOAD_FIELD, UPLOAD_URL, MAX_UPLOAD_SIZE } from '@util/const'
import { formItemLayout, submitFormItemLayout } from '@util/config'
import { REGEX_IMAGE } from '@util/regex'

const { Item: FormItem } = Form
const { 
  Group: RadioGroup,
} = Radio
const { RangePicker } = DatePicker

@Form.create()
@inject(
  'GlobalModel',
)
@observer
class PageForm extends Component {
  state = {
    loading:        false,
    previewImage:   '',
    previewVisible: false,
  }

  handleNormFile = e => {
    console.log('Upload event:', e)

    if (Array.isArray(e)) {
      return e
    }

    return e && e.fileList
  }

  handleBeforeUpload = file => {
    const { loading } = this.state
    const { name, size } = file

    if (loading) {
      message.warning('上一个正在上传，请稍后')
      return false
    }
    if (!REGEX_IMAGE.test(name)) {
      message.warning('上传的图片格式不正确')
      return false
    }
    if (MAX_UPLOAD_SIZE <= size) {
      message.warning('上传的图片小于2M')
      return false
    }

    return true
  }

  handleUploadChange = (label, info) => {
    const { GlobalModel, onPreviewUpload } = this.props
    const { handleToggleLoadingBar } = GlobalModel

    if (info.file.status === 'uploading') {
      this.setState({
        loading: true,
      }, () => {
        handleToggleLoadingBar(true)
      })

      return
    }

    if (info.file.status === 'done') {
      this.setState({
        loading: false,
      }, () => {
        handleToggleLoadingBar(false)
        onPreviewUpload(label, info.file.response.body)
        message.success('上传成功')
      })
    } else if (info.file.status === 'error') {
      this.setState({
        loading: false,
      }, () => {
        handleToggleLoadingBar(false)
        onPreviewUpload(label, '')
        message.error('上传失败')
      })
    }
  }

  handlePreview = file => {
    this.setState({
      previewImage:   file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleMultipleRemove = (label, file) => {
    const { onMultiplePreviewRemove } = this.props

    onMultiplePreviewRemove(label, file.response.body)
  }

  handleMultipleUploadChange = (label, { file, fileList }) => {
    const { GlobalModel, onMultiplePreviewUpload } = this.props
    const { handleToggleLoadingBar } = GlobalModel

    if (file.status === 'uploading') {
      this.setState({
        loading: true,
      }, () => {
        handleToggleLoadingBar(true)
      })

      return
    }

    if (file.status === 'done') {
      this.setState({
        loading: false,
      }, () => {
        handleToggleLoadingBar(false)
        onMultiplePreviewUpload(label, fileList)
        message.success('上传成功')
      })
    } else if (file.status === 'error') {
      this.setState({
        loading: false,
      }, () => {
        handleToggleLoadingBar(false)
        onMultiplePreviewUpload(label, fileList)
        message.error('上传失败')
      })
    }
  }

  handlePreviewCancel = () => this.setState({ previewVisible: false })

  handleSubmit = () => {
    const { form, onSubmit } = this.props
    const { validateFields } = form

    validateFields(onSubmit)
  }

  handleCancel = () => {
    const { form, onCancel } = this.props
    const { resetFields } = form

    resetFields()
    onCancel()
  }

  renderFormItem = item => {
    const { form } = this.props
    const { getFieldDecorator } = form
    const { 
      label, 
      field,
      type, 
      subType,
      preview, 
      desc,
      src,
      limit,
      value, 
      required,
      placeholder,
      validateMessage,
    } = item

    const options = {
      rules: [
        { required, message: validateMessage },
      ],
    }

    if (type === 'upload') {
      options.getValueFromEvent = this.handleNormFile
    } else if (type === 'radio') {
      options.initialValue = value
      options.valuePropName = 'value'
    } else if (type === 'switch') {
      options.initialValue = value
      options.valuePropName = 'checked'
    } else if (type === 'date') {
      options.valuePropName = 'value'
    }

    if (type === 'input') {
      if (subType === 'string') {
        return (
          <Col span={ 16 } offset={ 4 } key={ label }>
            <FormItem label={ label } { ...formItemLayout }>
              {getFieldDecorator(field, options)(
                <Input placeholder={ placeholder } />   
            )}
            </FormItem>
          </Col>
        )
      } else if (subType === 'number') {
        return (
          <Col span={ 16 } offset={ 4 } key={ label }>
            <FormItem label={ label } { ...formItemLayout }>
              {getFieldDecorator(field, options)(
                <InputNumber style={{ width: 200 }} placeholder={ placeholder } />   
            )}
            </FormItem>
          </Col>
        )
      }
    } else if (type === 'upload') {
      if (subType === 'single') {
        return (
          <Col span={ 16 } offset={ 4 } key={ label }>
            <FormItem label={ label } { ...formItemLayout }>
              {getFieldDecorator(field, options)(
                <Upload 
                  name={ UPLOAD_FIELD }
                  action={ UPLOAD_URL }
                  listType='picture-card'
                  showUploadList={ false }
                  onChange={ info => this.handleUploadChange(label, info) }
                  beforeUpload={ this.handleBeforeUpload }
                >
                  {preview ? <img style={{ width: 88, height: 88 }} src={ preview } alt='' /> : '上传图片'}
                </Upload> 
            )}
            </FormItem>
          </Col>
        )
      } else if (subType === 'multiple') {
        return (
          <Col span={ 16 } offset={ 4 } key={ label }>
            <FormItem label={ label } { ...formItemLayout }>
              {getFieldDecorator(field, options)(
                <Upload 
                  name={ UPLOAD_FIELD }
                  action={ UPLOAD_URL }
                  listType='picture-card'
                  fileList={ preview }
                  onChange={ info => this.handleMultipleUploadChange(label, info) }
                  onRemove={ file => this.handleMultipleRemove(label, file) }
                  onPreview={ this.handlePreview }
                  beforeUpload={ this.handleBeforeUpload }
                >
                  {preview.length >= limit ? null : '上传图片'}
                </Upload> 
            )}
            </FormItem>
          </Col>
        )
      }
      
    } else if (type === 'radio') {
      return (
        <Col span={ 16 } offset={ 4 } key={ label }>
          <FormItem label={ label } { ...formItemLayout }>
            {getFieldDecorator(field, options)(
              <RadioGroup>
                {src.map(opt => <Radio key={ opt.value } value={ opt.value }>{opt.name}</Radio>)}
              </RadioGroup>
            )}
          </FormItem>
        </Col>
      )
    } else if (type === 'switch') {
      return (
        <Col span={ 16 } offset={ 4 } key={ label }>
          <FormItem label={ label } { ...formItemLayout }>
            {getFieldDecorator(field, options)(
              <Switch checkedChildren={ desc[0] } unCheckedChildren={ desc[1] } />
            )}
          </FormItem>
        </Col>
      )
    } else if (type === 'date') {
      if (subType === 'range') {
        return (
          <Col span={ 16 } offset={ 4 } key={ label }>
            <FormItem label={ label } { ...formItemLayout }>
              {getFieldDecorator(field, options)(
                <RangePicker
                  style={{ width: '100%' }}
                  format='YYYY-MM-DD'
                  // showTime={{
                  //   hideDisabledOptions: true,
                  //   defaultValue:        [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                  // }}
                  placeholder={ ['开始日期', '结束日期'] }
                />
              )}
            </FormItem>
          </Col>
        )
      }
    }
  }

  render() {
    const { data } = this.props
    const { previewImage, previewVisible } = this.state

    return (
      <div className='page-form-container'>
        <Form layout='inline'>
          <Row gutter={ 24 }>
            {data.map(this.renderFormItem)}
          </Row>
          <Row gutter={ 24 }>
            <Col span={ 16 } offset={ 4 }>
              <FormItem { ...submitFormItemLayout }>
                <div>
                  <Button style={{ marginRight: 48 }} type='primary' onClick={ this.handleSubmit }>提交</Button>
                  <Button onClick={ this.handleCancel }>返回</Button>
                </div>
              </FormItem>
            </Col>
          </Row>
          <Modal visible={ previewVisible } footer={ null } onCancel={ this.handlePreviewCancel }>
            <img alt='example' style={{ width: '100%' }} src={ previewImage } />
          </Modal>
        </Form>
      </div>
    )
  }
}

export default PageForm