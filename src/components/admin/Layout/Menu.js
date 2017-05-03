import React, { PropTypes } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'
import adminMenu from '../../../utils/adminMenu'

const getMenus = function (menuArray, parentPath = '/admin/') {
  return menuArray.map(item => {
    const linkTo = parentPath + item.key
    if (item.child) {
      return (
        <Menu.SubMenu key={linkTo} title={<span>{item.icon ? <Icon type={item.icon} /> : ''}{item.name}</span>}>
          {getMenus(item.child, linkTo+"/")}
        </Menu.SubMenu>
      )
    }
    return (
      <Menu.Item key={linkTo}>
        <Link to={linkTo}>
          {item.icon ? <Icon type={item.icon} /> : ''}
          {item.name}
        </Link>
      </Menu.Item>
    )
  })
}

function Menus ({ location }) {
  const menuItems = getMenus(adminMenu)
  return (
    <Menu
      mode={'inline'}
      theme='dark'
      defaultSelectedKeys={[location.pathname !== '/' ? location.pathname : '/dashboard']}>
      {menuItems}
    </Menu>
  )
}

Menus.propTypes = {
  location: PropTypes.object,
}

export default Menus
