import React, { Component } from 'react'
import TableContent from './TableContent'
import PaginationContent from './PaginationContent'

class Container extends Component {
  render() {
    const { total, pageNum, pageSize, onPageChange } = this.props

    return (
      <div className='page-table-container'>
        <TableContent { ...this.props } />
        {total !== null && pageNum !== null && pageSize !== null && onPageChange !== null && <PaginationContent { ...this.props } />}
      </div>
    )
  }
}

export default Container