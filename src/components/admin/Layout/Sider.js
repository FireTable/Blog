import React, { PropTypes } from 'react'
import { Icon, Switch } from 'antd'
import Menus from './Menu'
import styles from './Sider.css'

function Sider ({ location,siderFold }) {
  const menusProps = {
    location,
    siderFold
  }
  return (
    <div>
      <div className={styles.logo}>
        <img alt={'logo'} src="https://t.alipayobjects.com/images/T1QUBfXo4fXXXXXXXX.png"/>
        <span>Blog Manage</span>
      </div>
      <Menus {...menusProps} />
    </div>
  )
}

Sider.propTypes = {
  location: PropTypes.object,
}

export default Sider
