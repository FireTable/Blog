import React from 'react';
import { connect } from 'dva';
import { Row, Col} from 'antd';
import { push, replace } from 'react-router-redux'

import MainLeft from '../components/mainLeft/mainleft';
import MainRight from '../components/mainRight/mainright';

import styles from './IndexPage.css';

import globalStyle from '../components/global.css'

function IndexPage({ children, app, dispatch}) {
  const { isIndex }=app;
  const MainLeftProps={
    hideIndexPage:(e)=>{
      isIndex?dispatch({ type: 'app/hideIndexPage'}):'';//如果点击的不是首页，则隐藏主页
      e.key=='index'?dispatch({ type: 'app/showIndexPage'}):'';//如果点击的是首页，则显示主页
      e.key=='blog'?dispatch({ type: 'article/closeDetailed'}):'';//点击的是博客页面则重新加载博客列表
      dispatch(push({
        pathname: "/"+e.key,
      }))
    }
  }
  return (
    <div className={styles.normal}>
      <Row className={styles.Row}>
        <Col className={styles.Col} span={isIndex?24:7}>
          <MainLeft {...MainLeftProps}></MainLeft>
        </Col>
        {isIndex?'':<Col className={styles.Col} span={isIndex?0:17}>
          <MainRight children={children}>  
          </MainRight>
        </Col>}
      </Row>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect(({ app }) => ({ app }))(IndexPage);
