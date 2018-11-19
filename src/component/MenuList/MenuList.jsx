import React, { Component, Fragment } from 'react'
import { Menu, Icon } from 'antd'

const { SubMenu } = Menu

class MenuList extends Component {
  render() {
    const { data, onMenuClick } = this.props

    return (
      <Fragment>
        <div className='logo' />
        <div className='menu-list-container'>
          <Menu
            theme='dark'
            mode='inline'
            onClick={ onMenuClick }
          >
            {data.map(value => {
              return (
                <SubMenu 
                  key={ value.key }
                  title={ (
                    <span>
                      <Icon type={ value.icon } />
                      <span>{ value.title }</span>
                    </span>
                  ) }
                >
                  {value.child.map(subValue => (<Menu.Item key={ subValue.key }>{ subValue.title }</Menu.Item>))}
                </SubMenu>
              )
            })}
          </Menu>
        </div>
      </Fragment>
    )
  }
}

export default MenuList