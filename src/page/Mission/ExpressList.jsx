import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Modal, Form, Input, message } from 'antd'
import PageHeader from '@component/PageHeader'
import PageContent from '@component/PageContent'
import PageTable from '@component/PageTable'
// import { BASE_PATH } from '@util/const'

const { confirm: Confirm } = Modal

@Form.create()
@inject(
  'MissionModel',
)
@observer
class ExpressListPage extends Component {
  state = {
    breadcrumbItems: [
      { name: '任务管理' },
      { name: '快递配置' },
    ],
    visible:           false,
    editId:            null,
    actionsListColumn: [
      { 
        title:     '操作', 
        dataIndex: 'actions', 
        key:       'actions', 
        render:    (text, record) => {
          return (
            <div className='actions-btn-container'>
              <Button size='small' type='primary' onClick={ () => this.handleActions('edit', record) }>
                编辑
              </Button>
              <Button size='small' type='danger' onClick={ () => this.handleActions('remove', record) }>
                删除
              </Button>
            </div>
          )
        },
      },
    ],
  }

  componentDidMount() {
    this.init()
  }

  init() {
    this.handleSearchExpressList()
  }

  handleSearchExpressList = (currentPage = 1) => {
    const { MissionModel } = this.props
    const { queryExpressList } = MissionModel

    const params = {
      currentPage,
      pageSize: 10,
    }

    queryExpressList(params)
  }

  handlePageChange = currentPage => {
    this.handleSearchExpressList(currentPage)
  }

  handleActions = (type, item) => {
    const { form, MissionModel } = this.props
    const { deleteExpress } = MissionModel
    const { setFieldsValue } = form

    if (type === 'create') {
      this.setState({
        visible: true,
      })
    } else if (type === 'edit') {
      this.setState({
        editId:  item.id,
        visible: true,
      }, () => {
        setFieldsValue({
          name: item.name, 
        })
      })
    } else if (type === 'remove') {
      Confirm({
        title:      '删除快递公司',
        content:    '您确认要删除该快递公司吗？',
        okText:     '确认',
        cancelText: '取消',
        onOk:       async() => {
          const { id } = item
          const result = await deleteExpress({ id })

          if (result) {
            message.success('删除成功')

            this.handleSearchExpressList()
          }
        },
        onCancel() {
          console.log('Cancel Remove')
        },
      })
    }
  }

  handleCreateConfirm = () => {
    const { form, MissionModel } = this.props
    const { editId } = this.state
    const { validateFields } = form
    const { createExpress, updateExpress } = MissionModel

    validateFields(async(error, values) => {
      if (error) return 

      if (!editId) {
        const result = await createExpress(values)

        if (result) {
          message.success('创建成功')

          this.handleSearchExpressList()

          this.handleCreateCancel()
        }
      } else {
        const result = await updateExpress({ id: editId, ...values })

        if (result) {
          message.success('编辑成功')

          this.handleSearchExpressList()

          this.handleCreateCancel()
        }
      }
    })
  }

  handleCreateCancel = () => {
    const { form } = this.props
    const { resetFields } = form

    this.setState({
      editId:  null,
      visible: false,
    }, () => resetFields())
  }

  render() {
    const { form, MissionModel } = this.props
    // const { breadcrumbItems, actionsListColumn } = this.state
    const { breadcrumbItems, visible, editId, actionsListColumn } = this.state
    const { getFieldDecorator } = form
    const { 
      expressList, 
      expressListTotal, 
      expressListColumn,
      expressListPageNum, 
    } = MissionModel

    return (
      <div className='view-container'>
        <PageHeader title='积分兑换列表' extraBreadcrumbItems={ breadcrumbItems } />
        <PageContent>
          <div style={{ marginBottom: 24 }}>
            <Button type='primary' onClick={ () => this.handleActions('create') }>新增快递公司</Button>
          </div>
          <PageTable 
            rowKey='id'
            total={ expressListTotal }
            columns={ expressListColumn.concat(actionsListColumn) }
            pageNum={ expressListPageNum }
            pageSize={ 10 }
            dataSource={ expressList }
            onPageChange={ this.handlePageChange }
          />
        </PageContent>
        <Modal 
          title={ `${ editId ? '编辑' : '创建' }快递公司` }
          visible={ visible }
          okText='确认'
          cancelText='取消'
          onOk={ this.handleCreateConfirm }
          onCancel={ this.handleCreateCancel }
        >
          <Form>
            <Form.Item { ...{
                labelCol:   { span: 4 },
                wrapperCol: { span: 12 },
              } }
              label='快递公司'
            >
              {getFieldDecorator('name', {
                rules: [
                  { required: true, message: '请输入快递公司名称' },
                ],
              })(
                <Input placeholder='请输入快递公司名称' />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default ExpressListPage