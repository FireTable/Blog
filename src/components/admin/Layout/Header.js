import React, { PropTypes } from 'react'
import { Menu, Icon, Popover } from 'antd'
import styles from './Header.css'
import Menus from './Menu'

const SubMenu = Menu.SubMenu

function Header ({ user, logout, location }) {
  let handleClickMenu = e => e.key === 'logout' && logout()

  return (
    <div >
      <Menu mode="horizontal" onClick={handleClickMenu}>
        <SubMenu 
          className={styles.floatRight}
          title={<span > <Icon type="user" />{user.name} </span>}>
          <Menu.Item key="logout">
            <a>注销</a>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  )
}

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
  location: PropTypes.object,
}

export default Header
