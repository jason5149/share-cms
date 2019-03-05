import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Card, Row, Col, Table, Modal, Select, Input, Button, message, Radio } from 'antd'
import moment from 'moment'
import ClipboardJS from 'clipboard'
import PageHeader from '@component/PageHeader'
import PageContent from '@component/PageContent'
import { BASE_PATH, SHIPMENT_TYPE_DESC, EXCHANGE_STATUS_DESC } from '@util/const'
// import { BASE_PATH } from '@util/const'

const { Option } = Select

@inject(
  'MissionModel',
)
@observer
class ExchangeDetailPage extends Component {
  state = {
    visible:         false,
    _shipmentType:   null, 
    _expressCompany: null, 
    _expressNo:      '', 
    breadcrumbItems: [
      { name: '任务管理' },
      { name: '积分兑换列表', link: `${ BASE_PATH }/app/mission/exchange-list` },
      { name: '积分兑换详情' },
    ],
    prizeTableColumn: [
      { title: '奖品名称', dataIndex: 'name', key: 'name' },
      { title: '规格', dataIndex: 'specifications', key: 'specifications' },
      { title: '市场参考价', dataIndex: 'marketPrice', key: 'marketPrice' },
      { title: '数量', dataIndex: 'prizeCount', key: 'prizeCount' },
      { title: '兑换积分', dataIndex: 'convertibility', key: 'convertibility' },
      { title: '使用积分', dataIndex: 'usage', key: 'usage', render: (text, record) => <span>{record.prizeCount * record.convertibility}</span> },
    ],
  }

  clipboard = null

  componentDidMount() {
    this.init()
  }

  init() {
    // this.clipboard = new ClipboardJS('#copy-btn')
    // this.clipboard('#copy-btn')
    // console.log(this.clipboard('#copy-btn'))
    // this.clipboard.on('success', e => {
    //   message.success('复制成功', 1)

    //   e.clearSelection()
    // })
    new ClipboardJS('#copy-btn').on('success', e => {
      message.success('复制成功', 1)

      e.clearSelection()
    })

    this.handleSearchExchangeDetail()
    this.handleSearchExpressList()
  }

  handleSearchExchangeDetail = async () => {
    const { MissionModel, match } = this.props
    const { params } = match
    const { queryExchangeDetail } = MissionModel

    const result = await queryExchangeDetail(params)

    if (result) {
      console.log(result)
    }
  }

  handleSearchExpressList = () => {
    const { MissionModel } = this.props
    const { queryExpressList } = MissionModel

    const params = {
      currentPage: 1,
      pageSize:    100,
    }

    queryExpressList(params)
  }

  handleShipmentConfirm = async () => {
    const { MissionModel, match } = this.props
    const {
      _shipmentType, 
      _expressCompany, 
      _expressNo, 
    } = this.state
    const { deliveryShip } = MissionModel

    if (!_shipmentType) {
      message.warn('请选择发货类型', 1)
      return
    }
    if (!_expressCompany) {
      message.warn('请输入快递公司', 1)
      return
    }
    if (!_expressNo) {
      message.warn('请输入快递单号')
      return
    }

    const { params } = match

    const result = await deliveryShip({
      id:               params.id,
      shipmentType:     _shipmentType,
      expressCompanyId: _expressCompany,
      expressNo:        _expressNo,
    })

    if (result) {
      this.handleSearchExchangeDetail()

      message.success('设置发货成功', 1)

      this.handleShipmentCancel()
    }
  }

  handleShipmentCancel = () => {
    this.setState({
      visible:         false,
      _shipmentType:   null, 
      _expressCompany: null, 
      _expressNo:      null, 
    })
  }

  render() {
    const { MissionModel } = this.props
    const { 
      visible, 
      _shipmentType, 
      _expressCompany, 
      _expressNo, 
      breadcrumbItems, 
      prizeTableColumn, 
    } = this.state
    const { exchangeDetail, expressList } = MissionModel

    if (!exchangeDetail) return null

    const { userPrizeLog, prize, userAddress } = exchangeDetail
    const { 
      id, 
      createTime, 
      expressCompany, 
      expressNo, 
      shipmentTime, 
      shipmentType, 
      status, 
      prizeCount,
    } = userPrizeLog
    const { 
      id: prizeId,
      name,
      specifications,
      marketPrice,
      convertibility,
     } = prize
    const { 
      userName,
      mobile,
      province,
      city,
      area,
      address,
    } = userAddress
    const dataSource = {
      prizeId,
      name,
      specifications,
      prizeCount,
      marketPrice,
      convertibility,
    }

    return (
      <div className='view-container'>
        <PageHeader title='积分兑换详情' extraBreadcrumbItems={ breadcrumbItems } />
        <PageContent>
          <div style={{ marginBottom: 16 }}>
            <Button type='primary' onClick={ () => this.setState({ visible: true }) }>设置发货</Button>
          </div>
          <Card title='兑奖信息'>
            <Row gutter={ 24 }>
              <Col span={ 8 }>
                <span className='label small'>流水号：</span>
                <span className='desc'>{id}</span>
              </Col>
              <Col span={ 8 }>
                <span className='label small'>创建时间：</span>
                <span className='desc'>{moment(createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
              </Col>
              <Col span={ 8 }>
                <span className='label small'>状态：</span>
                <span className='desc'>{EXCHANGE_STATUS_DESC[status]}</span>
              </Col>
            </Row>
            <Row gutter={ 24 }>
              <Col span={ 8 }>
                <span className='label small'>发货类型：</span>
                <span className='desc'>{SHIPMENT_TYPE_DESC[shipmentType]}</span>
              </Col>
              <Col span={ 8 }>
                <span className='label small'>快递公司：</span>
                <span className='desc'>{expressCompany}</span>
              </Col>
              <Col span={ 8 }>
                <span className='label small'>快递单号：</span>
                <span className='desc'>{expressNo}</span>
              </Col>
            </Row>
            <Row gutter={ 24 }>
              <Col span={ 8 }>
                <span className='label small'>发货时间：</span>
                <span className='desc'>{shipmentTime ? moment(shipmentTime).format('YYYY-MM-DD HH:mm:ss') : ''}</span>
              </Col>
            </Row>
          </Card>
          <Card title='奖品信息'>
            <Table 
              rowKey='prizeId'
              bordered
              size='small'
              columns={ prizeTableColumn }
              dataSource={ [dataSource] }
              pagination={ false }
            />
          </Card>
          <Card title='收货人信息'>
            <Row gutter={ 24 }>
              <Col span={ 12 }>
                <span className='label small'>收件人：</span>
                <span className='desc'>{userName}</span>
              </Col>
              <Col span={ 12 }>
                <span className='label small'>手机号：</span>
                <span className='desc'>{mobile}</span>
              </Col>
              <Col span={ 24 }>
                <span className='label small'>收货地址：</span>
                <span className='desc'>{ `${ province || '' }${ city || '' }${ area || '' }${ address || '' }` }</span>
              </Col>
              <Col span={ 12 }>
                {/* <input id='#copy' style={{ visibility: 'hidden' }} value={ `${ userName },${ mobile },${ province || '' }${ city || '' }${ area || '' }${ address || '' }` } /> */}
                <Button id='copy-btn' className='copy-btn' data-clipboard-text={ `${ userName },${ mobile },${ province || '' }${ city || '' }${ area || '' }${ address || '' }` }>复制</Button>
              </Col>
            </Row>
          </Card>
        </PageContent>
        <Modal 
          centered
          title='填写发货信息' 
          visible={ visible }
          okText='确认'
          cancelText='取消'
          onOk={ this.handleShipmentConfirm }
          onCancel={ this.handleShipmentCancel }
        >
          <Row gutter={ 24 } style={{ marginBottom: 24 }}>
            <Col span={ 6 }>发货类型</Col>
            <Col span={ 18 }>
              <Radio.Group value={ _shipmentType } onChange={ e => this.setState({ _shipmentType: e.target.value}) }>
                <Radio value={ 1 }>平台发货</Radio>
                <Radio value={ 2 }>品牌商发货</Radio>
              </Radio.Group>
            </Col>
          </Row>
          <Row gutter={ 24 } style={{ marginBottom: 24 }}>
            <Col span={ 6 }>快递公司</Col>
            <Col span={ 18 }>
              <Select 
                style={{ width: '100%' }} 
                value={ _expressCompany } 
                onChange={ value => this.setState({ _expressCompany: value }) }
                placeholder='请选择快递公司'
              >
                {expressList.length > 0 && expressList.map(express => (
                  <Option key={ express.id } value={ express.id }>{express.name}</Option>
                ))}
              </Select>
              {/* <Input value={ _expressCompany } placeholder='请输入快递公司' onChange={ e => this.setState({ _expressCompany: e.target.value }) } /> */}
            </Col>
          </Row>
          <Row gutter={ 24 } style={{ marginBottom: 24 }}>
            <Col span={ 6 }>快递单号</Col>
            <Col span={ 18 }>
              <Input value={ _expressNo } placeholder='请输入快递单号' onChange={ e => this.setState({ _expressNo: e.target.value }) } />
            </Col>
          </Row>
        </Modal>
      </div>
    )
  }
}

export default ExchangeDetailPage