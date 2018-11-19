import React, { Component } from 'react'
import { Table } from 'antd'

class TableContent extends Component {
  render() {
    const {
      rowKey = 'id',
      columns = [],
      dataSource = [],
      style,
    } = this.props

    return (
      <Table
        className='table-container'
        style={ style }
        size='small'
        rowKey={ rowKey }
        columns={ columns }
        bordered
        dataSource={ dataSource }
        pagination={ false }
      />
    )
  }
}

export default TableContent
