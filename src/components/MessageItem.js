import React from 'react';
import styles from './MessageItem.css';
import { Icon } from 'antd'
import { isQQ } from '../utils/isQQ'

function MessageItem( Porps ) {
  const message=Porps

  const isRight=Math.random()>0.5
  const headImgNum=Math.round(Math.random()*11)
  const maybeQQ=message.Email.substring(0,message.Email.indexOf("@"))
  return (
    <div className={styles.normal}>
      <img 
        className={styles.headImg} 
        src={isQQ(maybeQQ)//判断是否是qq号的邮箱，如果是，就通过qq获取头像，如果不是
            ?"https://q1.qlogo.cn/g?b=qq&nk="+maybeQQ+"&s=100"    //就从图片服务器随机取出一张
            :"http://image.wuyunjiang.cn/blog/message/commenter_"+headImgNum+".png"}/>
      <div className={styles.panel} style={isRight?{float:'right'}:null}>
        <i className={isRight?styles.leftArrow:styles.rightArrow}/>
        <h4 className={styles.title}>{message.Nikename}</h4>
        <p className={styles.time}><Icon type="clock-circle-o"/> {message.Time}</p>
        <p className={styles.content}>{message.Content}</p>
        <div style={{height:'1px',backgroundColor:'#EEE'}}></div>
        <h4 className={styles.title}>博主回复 :</h4>
        <p className={styles.content}>
          {message.Reply===""
            ?<span>尚未回复...</span>
            :<span>{message.Reply}</span>
          }
        </p>
      </div>
    </div>
  );
}

export default MessageItem;
