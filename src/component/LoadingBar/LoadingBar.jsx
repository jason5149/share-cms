import React, { Component } from 'react'
import { Icon } from 'antd'

class LoadingBar extends Component {
  render() {
    return (
      <div className='loading-bar-container'>
        <Icon type='loading' />
      </div>
    )
  }
}

export default LoadingBar