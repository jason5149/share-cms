import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'
import {
  Form, 
  Row, 
  Col, 
  Input, 
  Select,
  Button, 
  Icon,
} from 'antd'
import { formItemLayout } from '@utils/config'

const { Option } = Select

@Form.create()
@observer
class Container extends Component {
  state = {
    isExpend: false,
  }

  colProp = {
    style: {
      paddingLeft:  '24px',
      paddingRight: '24px',
    },
    span: 8,
  }

  handleToggleExpend = () => {
    const { isExpend } = this.state

    this.setState({
      isExpend: !isExpend,
    })
  }

  /**
   * @description 处理
   */
  handleSearch = () => {
    const { form, onSearch } = this.props
    const { validateFields } = form

    validateFields(onSearch)
  }

  handleReset = () => {
    const { form, onReset } = this.props
    const { resetFields } = form

    resetFields()
    /* eslint-disable-next-line */
    onReset && onReset()
  }

  handleFormEventChange = e => {
    if (!e || !e.target) {
      return e
    } 
    const { target } = e

    return target.value.trim()
  }

  /**
   * @description 渲染交互类型
   * @param {string}  type        类型
   * @param {array}   source      数据源
   * @param {string}  placeholder 提示
   */
  renderFilterType = (type, source, placeholder) => {
    switch(type) {
      case 'input':
        return <Input placeholder={ placeholder } />
      case 'select':
        return (
          <Select>
            {source.map(({ value, name }) => (
              <Option key={ value } value={ value }>{name}</Option>
            ))}
          </Select>
        )
      default:
        break
    }
  }

  renderFilterColumn = ({ label, fieldName, type, source, initialValue = null, placeholder }) => {
    const { form } = this.props
    const { getFieldDecorator } = form
    const fieldOptions = {
      initialValue,
    }

    if (type === 'input') {
      fieldOptions.getValueFromEvent = this.handleFormEventChange
    }

    return (
      <Col { ...this.colProp } key={ fieldName }>
        <Form.Item 
          label={ label }
          { ...formItemLayout(2) }
        >
          {getFieldDecorator(fieldName, fieldOptions)(
            this.renderFilterType(type, source, placeholder)
          )}
        </Form.Item>
      </Col>
    )
  }

  renderFilterFields = () => {
    const { filters } = this.props
    const { isExpend } = this.state

    if (filters.length <= 0) {
      return null
    }

    return (
      <Fragment>
        {filters.map(this.renderFilterColumn)}
        <Col { ...this.colProp }>
          <div className='filter-submit-buttons'>
            <Button type='primary' onClick={ this.handleSearch }>查询</Button>
            <Button onClick={ this.handleReset }>重置</Button>
            {
              filters.length <= 2 ? null : (
                /* eslint-disable-next-line */
                <a onClick={ this.handleToggleExpend }>
                  {!isExpend ? '展开' : '收起'}
                  <Icon type={ !isExpend ? 'down' : 'up' } />
                </a>
              )
            } 
          </div>
        </Col>
      </Fragment>
    )
  }

  render() {
    return (
      <div className='page-filter-container'>
        <Form>
          <Row>
            {this.renderFilterFields()}
          </Row>
        </Form>
      </div>
    )
  }
}

export default Container