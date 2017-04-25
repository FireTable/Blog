import React from 'react';
import {gameList} from '../utils/gameList'
import btmao from '../assets/btmao.swf'

function error( ) {
  return (
    <div>
    	<h1 style={{textAlign:'center'}}>Error 404</h1><br/>
    	<p style={{textAlign:'center'}}>没有这个页面耶 玩会儿游戏吧</p><br/>
      <object
      	autofouce={true}	
      	height='500'
      	width='800'>
      	<param 
      		height='500'
      		width='800'
      		value={btmao}></param>
      	<embed
      		autofouce={true}
	      	height='500'
	      	width='800'
      		src={btmao}
      		type="application/x-shockwave-flash" ></embed>
      </object><br/>
      <p style={{textAlign:'left'}}><span style={{fontWeight:'800'}}>游戏说明</span>：点击【开始游戏】后，进入游戏需要再点击一下游戏界面任意地方，使游戏获得键盘焦点</p>
      <p style={{textAlign:'left'}}><span style={{fontWeight:'800'}}>游戏玩法</span>：点击点盘上下左右键操作游戏开始</p>
      <p style={{textAlign:'left',fontWeight:'800',color:'red'}}>声明：游戏来自4399，侵权立删</p>
    </div>
  );
}

export default error;
