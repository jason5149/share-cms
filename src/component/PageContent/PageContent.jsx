import React, { Component } from 'react'
import { Card } from 'antd'

class PageContent extends Component {
  render() {
    const { children } = this.props
    
    return (
      <div className='page-content-container'>
        <Card>
          {children}
        </Card>
      </div>
    )
  }
}

export default PageContent