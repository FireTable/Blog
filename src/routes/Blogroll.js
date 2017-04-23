import React, { Component } from 'react';
import { Spin, message, notification } from 'antd'
import { connect } from 'dva';
import styles from './Blogroll.css';
import BlogrollForm from '../components/blogroll/BlogrollForm'

class Blogroll extends Component {

	componentWillMount(){
		this.props.dispatch({
      type:'blogroll/getAllBlogroll',
    })
	}

	constructor(props) {
	  super(props);
	  this.state = {};
	}
	showMessage(isSuccess){
		let type=""
		let tipTitle=""
		let description=""
		if(isSuccess){
			type='success'
			tipTitle="成功"
			description="申请友情链接成功，等待站长审核"
		}else{
			type='error'
			tipTitle="失败"
			description="申请友情链接出错，你可以在留言区留下信息"
		}
		notification[type]({
	    message: tipTitle,
	    description:description,
	    duration: 3
	  })
	}
	submitBlogrollApply(FormData){
		const hide = message.loading('申请提交中..', 0);
		this.props.dispatch({
      type:'blogroll/submitBlogrollApply',
      payload: {
      	...FormData
      },
      hide:hide.bind(this),
      showMessage:this.showMessage.bind(this)
    })
	}

	render(){
		let Blogrolls=this.props.blogrollState.list
		const BlogrollFormProps={
			submitBlogrollApply:this.submitBlogrollApply.bind(this)
		}
		return (
	    <div className={styles.normal}>
      {Blogrolls.length===0
        ?<div style={{textAlign:'center',marginTop:'30%'}}><Spin size="large"/></div>
        :<div className={styles.normal}>
          {Blogrolls.hasOwnProperty('message')
            ?<h1 style={{textAlign:'center'}}>暂无友情链接</h1>
            :Blogrolls.map(blogroll=>{
            return (
              <a target="_blank" href={blogroll.WebURL}
              	className={styles.itembox}
              	key={blogroll.Id}>
              	<p className={styles.title}>
              		{blogroll.WebiconURL===""?"":<img src={blogroll.WebiconURL} height="20" width="20" alt=""/>}
              		<span> {blogroll.Webname}</span>
              	</p>
              	<p className={styles.blogrollDes}>{blogroll.Webdescription}</p>
              </a>
          )})}
        </div>}
        <div style={{height:'100px'}}></div>
        <BlogrollForm {...BlogrollFormProps}></BlogrollForm>
	    </div>
	  );
	}
}

function mapStateToProps({ blogroll }) {
  return {
  	blogrollState:blogroll
  };
}

export default connect(mapStateToProps)(Blogroll);
