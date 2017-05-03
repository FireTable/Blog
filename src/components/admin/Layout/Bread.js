import React, { PropTypes } from 'react'
import { Breadcrumb, Icon } from 'antd'
import styles from './Bread.css'
import adminMenu from '../../../utils/adminMenu'

function Bread ({ location }) {
  let pathNames = []
  location.pathname.substr(1).split('/').forEach((item, key) => {
    if(item==="admin")return;
    pathNames.push(adminMenu.find((element)=>(element.key===item)));
  })

  const breads = pathNames.map((item, key) => {
    console.log(item)
    console.log(key)
    return (
      <Breadcrumb.Item key={key}>
        {item.icon
          ?<Icon type={item.icon} />
          :""
        }
        <span>{item.name}</span>
      </Breadcrumb.Item>
    )
  })

  return (
    <div className={styles.bread}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Icon type="home" /><span>主页</span>
        </Breadcrumb.Item>
        {breads}
      </Breadcrumb>
    </div>
  )
}

Bread.propTypes = {
  location: PropTypes.object,
}

export default Bread
