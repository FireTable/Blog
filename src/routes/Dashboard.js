import React from 'react';
import { connect } from 'dva';
import styles from './Dashboard.less';

function Dashboard({ dispatch }) {
  // dispatch({ type: 'app/hideIndexPage'})
  return (
    <div className={styles.normal}>
      Route Component: 仪表盘
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Dashboard);
