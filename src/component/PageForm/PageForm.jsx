import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Row, Col, Form, Input, InputNumber, Upload, Radio, Switch, DatePicker, Button, Modal, message } from 'antd'
import { UPLOAD_FIELD, UPLOAD_URL, MAX_UPLOAD_SIZE } from '@util/const'
import { formItemLayout, submitFormItemLayout } from '@util/config'
import { REGEX_IMAGE } from '@util/regex'

const { Item: FormItem } = Form
const { RangePicker } = DatePicker
const { 
  Group: RadioGroup,
} = Radio

@Form.create()
@inject(
  'GlobalModel',
)
@observer
class PageForm extends Component {
  state = {
    uploading:      false,
    previewImage:   '',
    previewVisible: false,
  }

  handleNormFile = e => {
    console.log(e)
    if (!e || !e.fileList) {
      return e
    }
  
    const { fileList } = e
    
    return fileList
  }

  handleBeforeUpload = file => {
    const { uploading } = this.state
    const { name, size } = file

    if (uploading) {
      message.warning('正在上传中，请稍后再试')
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

  handleUploadChange = ({ file }, label) => {
    const { onPreviewUpload } = this.props

    if (file.status === 'uploading') {
      this.setState({
        uploading: true,
      })
      return
    } 

    if (file.status === 'done') {
      this.setState({
        uploading: false,
      }, () => {
        onPreviewUpload(label, file.response.body)
        message.success('上传成功')
      })
    } else if (file.status === 'error') {
      this.setState({
        uploading: false,
      }, () => {
        onPreviewUpload(label, '')
        message.error('上传失败')
      })
    }
  }

  handleMultiplePreview = file => {
    this.setState({
      previewImage:   file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleMultipleRemove = (file, label) => {
    const { onMultiplePreviewRemove } = this.props

    onMultiplePreviewRemove(label, file.response.body)
  }

  handleMultipleUploadChange = ({ file, fileList }, label) => {
    const { onMultiplePreviewUpload } = this.props
    
    if (file.status === 'uploading') {
      this.setState({
        uploading: true,
      })
      return
    }

    if (file.status === 'done') {
      this.setState({
        uploading: false,
      }, () => {
        onMultiplePreviewUpload(label, fileList)
        message.success('上传成功')
      })
    } else if (file.status === 'error') {
      this.setState({
        uploading: false,
      }, () => {
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

    if (preview) {
      console.log('form value: ', preview)
    } else {
      console.log('form value: ', value)
    }

    if (['input', 'radio', 'switch', 'date'].indexOf(type) !== -1) {
      options.initialValue = value
      if (type === 'switch') {
        options.valuePropName = 'checked'
      } else {
        options.valuePropName = 'value'
      }
    } else if (type === 'upload') {
      options.initialValue = preview
      options.valuePropName = 'fileList'
      options.getValueFromEvent = this.handleNormFile
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
                  beforeUpload={ this.handleBeforeUpload }
                  onChange={ info => this.handleUploadChange(info, label) }
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
                  beforeUpload={ this.handleBeforeUpload }
                  onChange={ info => this.handleMultipleUploadChange(info, label) }
                  onPreview={ this.handleMultiplePreview }
                  onRemove={ file => this.handleMultipleRemove(label, file) }
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