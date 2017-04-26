import React, { Component } from 'react';
import { connect } from 'dva';
import { Timeline,Icon,Spin,Button,message,BackTop,notification  } from 'antd'
import styles from './Message.css';
import MessageForm from '../components/MessageForm'
import MessageItem from '../components/MessageItem'

class myMessage extends Component {

	loadArticles(nextPage){
    this.props.dispatch({
      type:'mymessage/getOnePageMessage',
      payload:{
      	nextPage:nextPage
      }
    })
  }

  componentWillMount(){
    this.loadArticles(1)
  }

  submitMessage(FormData,btnLoaded){
  	const hide = message.loading('评论中...', 0);
  	this.props.dispatch({
      type:'mymessage/submitMessage',
      payload: {
      	...FormData
      },
      hide:hide
    })
  }

  More(){
  	if (this.props.messageState.list.length===this.props.messageState.pageInfo.totle) {
  		notification.open({
		    message: '暂无更多评论',
		    duration: 2
		  });
		  return;
  	}
  	this.loadArticles(this.props.messageState.pageInfo.currentPage+1)
  }

	constructor(props) {
	  super(props);
	  this.state = {
	  	
	  };
	}

	render(){
		const messages = this.props.messageState.list
		const MessageFormProps = {
			submitMessage:this.submitMessage.bind(this)
		}
		const MessageItemProps = {
		
		}
		return (
	    <div className={styles.normal}>
	    	<BackTop visibilityHeight="400" target={()=>this}/>
			  <div>
			  	<MessageForm
			  		{ ...MessageFormProps }/>
		  		{messages.length===0
	        ?<div style={{textAlign:'center',marginTop:'10%'}}><Spin size="large"/></div>
	        :<ul className={styles.timeline}>
	            {messages.hasOwnProperty('message')
	              ?<h1 style={{textAlign:'center'}}>暂无评论</h1>
	              :messages.map(messageItem=>{
	              return (
	              	<li key={messageItem.Id}>
	              		<MessageItem { ...messageItem } { ...MessageItemProps }/>
	              	</li>
	            )})}
	            <li style={{marginTop:'40px'}}>
	            	<Button onClick={()=>{this.More()}}>加载更多...</Button>
	            </li>
	        </ul>}
			  </div>
	    </div>
	  )
	}
}

function mapStateToProps({ mymessage }) {
  return {
  	messageState:mymessage
  };
}

export default connect(mapStateToProps)(myMessage);
