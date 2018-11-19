import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Icon } from 'antd'

@inject(
  'GlobalModel',
)
@observer
class Header extends Component {
  render() {
    const { GlobalModel } = this.props
    const { collapsed, handleToggleMenu } = GlobalModel

    return (
      <div className='global-header-container'>
        <Icon
          className='trigger'
          type={ collapsed ? 'menu-unfold' : 'menu-fold' }
          onClick={ handleToggleMenu }
        />

      </div>
    )
  }
}

export default Header