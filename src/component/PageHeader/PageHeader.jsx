import React, { Component } from 'react'
import HeaderBreadcrumb from './HeaderBreadcrumb'

class PageHeader extends Component {
  render() {
    const { title } = this.props

    return (
      <div className='page-header-container'>
        <HeaderBreadcrumb { ...this.props } />
        <p>{title}</p>
      </div>
    )
  }
}

export default PageHeader