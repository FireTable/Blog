import React, { Component } from 'react';
import { connect } from 'dva';
import { Timeline,Icon,Spin,Button,BackTop } from 'antd'
import styles from './Message.css';
import MessageForm from '../components/MessageForm'
import MessageItem from '../components/MessageItem'

class myMessage extends Component {

	loadArticles(nextPage){
    this.props.dispatch({
      type:'message/getOnePageMessage',
      payload:{
      	nextPage:nextPage
      }
    })
  }

  componentWillMount(){
    this.loadArticles(1)
  }

  submitMessage(FormData,btnLoaded){
  	console.log(FormData)
  	this.props.dispatch({
      type:'message/submitMessage',
      payload: {
      	...FormData
      },
      btnLoaded:btnLoaded,
    })
  }

	constructor(props) {
	  super(props);
	  this.state = {};
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
	    	<BackTop visibilityHeight="400">UP</BackTop>
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
	            	<Button>加载更多...</Button>
	            </li>
	        </ul>}
			  </div>
	    </div>
	  )
	}
}

function mapStateToProps({ message }) {
  return {
  	messageState:message
  };
}

export default connect(mapStateToProps)(myMessage);
