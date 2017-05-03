import React from 'react';
import { connect } from 'dva';
import styles from './adminIndex.css';
import { Spin } from 'antd'

import Login from '../../components/admin/Login'
import { Layout } from '../../components/admin'
const { Header, Footer, Sider, Bread } = Layout

function adminIndex ({ children, location, dispatch, adminState }) {

  const { isLogin } = adminState

  const logout = () => {
    console.log("ddd")
    // dispatch({ type: 'app/logout' })
  }

  const loginProps = {

  }
  const siderProps = {
    location:location,
    siderFold:adminState.siderFold1
  }
  const headerProps = {
    user:adminState.user,
    location:location,
    logout:logout
  }
	return (
    <div>
    	{isLogin
      ?<div className={styles.pageLayout}>
        <aside className={styles.sider}>
          <Sider {...siderProps} />
        </aside>
        <div className={styles.mainBody}>
          <Header {...headerProps} />
          <Bread location={location} />
          <div>
            {children}
          </div>
          <Footer />
        </div>
      </div> 
      :<div>
        <Spin tip="加载用户信息..." spinning={false} size="large">
          <Login {...loginProps} />
        </Spin>
      </div>}
    </div>  
  );
}

function mapStateToProps({ admin }) {
  return {
  	adminState:admin
  };
}

export default connect(mapStateToProps)(adminIndex);