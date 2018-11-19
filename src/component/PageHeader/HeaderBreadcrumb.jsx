import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import { BASE_PATH } from '@util/const'

class HeaderBreadcrumb extends Component {
  render() {
    const { extraBreadcrumbItems } = this.props
    const breadcrumbItems = [
      { name: '首页', link: `${ BASE_PATH }/app/home` },
      ...extraBreadcrumbItems,
    ]

    return (
      <div className='page-breadcrumb-container'>
        <Breadcrumb>
          {breadcrumbItems.map(({ name, link }) => (
            <Breadcrumb.Item key={ name }>
              {link ? <Link to={ link }>{name}</Link> : name}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
    )
  }
}

export default HeaderBreadcrumb