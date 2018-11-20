import React, { Component } from 'react'
import { Input, Upload, Radio, Switch, DatePicker, message } from 'antd'
import { inject, observer } from 'mobx-react'
import { UPLOAD_FIELD, UPLOAD_URL, MAX_UPLOAD_SIZE } from '@util/const'
import { REGEX_IMAGE } from '@util/regex'

const { 
  Group: RadioGroup,
} = Radio
const { RangePicker } = DatePicker

@inject(
  'GlobalModel',
)
@observer
class Item extends Component {
  state = {
    loading:    false,
    previewImg: '',
  }

  render() {
    const { 
      fieldDecorator,
      type, 
      subType, 
      desc, 
      src, 
      placeholder,
    } = this.props
    const { previewImg } = this.state

    if (type === 'input') {
      return fieldDecorator(
        <Input placeholder={ placeholder } />      
      )
    } else if (type === 'upload') {
      return fieldDecorator(
        <Upload 
          name={ UPLOAD_FIELD }
          action={ UPLOAD_URL }
          listType='picture-card'
          showUploadList={ false }
          onChange={ this.handleUploadChange }
          beforeUpload={ this.handleBeforeUpload }
        >
          {previewImg ? <img style={{ width: 100, height: 100 }} src={ previewImg } alt='' /> : '上传图片'}
        </Upload>
      )
    } else if (type === 'radio') {
      return fieldDecorator(
        <RadioGroup>
          {src.map(opt => <Radio key={ opt.value } value={ opt.value }>{opt.name}</Radio>)}
        </RadioGroup>
      )
    } else if (type === 'switch') {
      return fieldDecorator(
        <Switch checkedChildren={ desc[0] } unCheckedChildren={ desc[1] } />
      )
    } else if (type === 'date') {
      if (subType === 'range') {
        return fieldDecorator(
          <RangePicker
            style={{ width: '100%' }}
            format='YYYY-MM-DD HH:mm:ss'
            showTime={{
              hideDisabledOptions: true,
              defaultValue:        [],
            }}
            placeholder={ ['开始日期', '结束日期'] }
          />
        )
      }
    }
  }
}

export default Item