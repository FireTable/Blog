import React from 'react';
import { Menu } from 'antd'
import styles from './mainleft.css';
const SubMenu = Menu.SubMenu;
import { Link } from 'dva/router'
import menu from '../../utils/menu.js'
import Profile from '../Profile'
import FontAwesome from 'react-fontawesome';
// import FontAwesomestyle from 'react-fontawesome/css';

const topMenus = menu.map(item => item.key)
const getMenus = function (menuArray, parentPath) {
  parentPath = parentPath || '/'
  return menuArray.map(item => {
    // if (item.child) {
    //   return (
    //     <Menu.SubMenu key={item.key} title={<span>{item.icon ? <Icon type={item.icon} /> : ''}{ topMenus.indexOf(item.key) >= 0 ? '' : item.name}</span>}>
    //       {getMenus(item.child, `${parentPath}${item.key}/`)}
    //     </Menu.SubMenu>
    //   )
    // }
    return (
      <Menu.Item 
        key={item.key}>
        <Link to={parentPath + item.key}>
          {item.icon ? <Icon type={item.icon} /> : ''}
          {item.name}
        </Link>
      </Menu.Item>
    )
  })
}

function MainLeft({ hideIndexPage }) {

	const profile_props={
		avatarPath:"../assets/yay.jpg",
		userName:"唐四藏",
		motto:"上善若水，人淡如菊",
		newEventSrc:"http://www.baidu.com",
    selfDes:"嗨，我是伍云江 (@唐四藏)，一名来自中国的 前端 开发者。现居成都。正在修行，探求创意之源。",
		newEventTxt:"ObjC 中国与 objc.io 合作最新作品《函数式 Swift》,《Core Data》及《Swift 进阶》已经发布，泊学网正在开展订阅赠书活动，也欢迎前往了解"
	};
  return (
    <div className={styles.normal}>
    	<Profile {...profile_props}></Profile>{/*简介组件，包括（头像，名字，座右铭，最新动向）*/}
    	<Menu 
        mode="horizontal"
        onClick={hideIndexPage}
        className={styles.menuStyle}>
    		{getMenus(menu)}
			</Menu>
      <br/>
      <div className={styles.navigationSocial}>
        <a target="_blank" href="https://github.com/wuyunjiang/"><FontAwesome size='2x' name='github' /></a>
        <a target="_blank" href="http://weibo.com/u/3860917005/"><FontAwesome size='2x' name='weibo' /></a>
        <a href="mailto:wu_yun_jiang@hotmail.com"><FontAwesome size='2x' name='envelope' /></a>
      </div> 
    </div>
  );
}

export default MainLeft;
