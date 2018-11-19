import React, { Component } from 'react'
import { Pagination } from 'antd'

class PaginationContent extends Component {
  render() {
    const { pageSize, pageNum, total, onPageChange } = this.props

    return (
      <Pagination
        className='pagination-container'
        total={ total }
        pageSize={ pageSize }
        current={ pageNum }
        onChange={ onPageChange }
      />
    )
  }
}

export default PaginationContent
