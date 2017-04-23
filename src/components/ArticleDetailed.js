import React, { Component } from 'react';
import * as globalCss from './global.css'
import markDownStyle from './markDownStyle.css'
import styles from './ArtilcleDetailed.css'
import { Icon, Spin } from 'antd';
import TimeAndTag from './TimeAndTag'
import Comment from './comment/Comment'

export default class ArtilcleDetailed extends Component {
  
  componentWillMount(){
    this.props.getArticleDetailed()//得到文章内容
    this.props.getArticleComments()//得到文章评论
  }
  componentWillUnmount(){
    this.props.removeDetailed()//关闭本页面时，移除本页面详情内容，包括详情和评论
  }
	
  render(){
    const thisState={
      content:this.props.content,
    }
    
    const closeDetailed=()=>{
      this.props.closeDetailed()
    }

    const CommentProps = {
      currentArticleID:this.props.currentArticleID,
      submitComment:this.props.submitComment,
      comments:this.props.comments,
      byReplyIdGetReply:this.props.byReplyIdGetReply
    }
    return (
      <div className={styles.normal}>
        <Icon type="close" className={styles.close} onClick={closeDetailed}/>
        {thisState.content===""?<Spin size="large" style={{marginBottom:'50px'}}/>:<div className={markDownStyle.articleDetailed} dangerouslySetInnerHTML={{__html:thisState.content}}></div>}
        <Comment { ...CommentProps }></Comment>
      </div>
    );
  }
}