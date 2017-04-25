import React, { Component } from 'react';
import * as globalCss from '../global.css'
import styles from './Comment.css'
import { LotsOfSpaces } from '../../utils/LotsOfSpaces'
import { Card, Form, Input, Row, Col, Button, Spin, } from 'antd';
const FormItem = Form.Item;


const CommentForm = Form.create()(
  (props) => {
    const { form, handleSubmit, isReply, cancelReply} = props;
    const { getFieldDecorator, setFieldsValue } = form
    return (
      <Form style={{textAlign:'left'}}>
        <Row gutter={16}>
          <Col span={8}>
            <FormItem label="昵称">
              {getFieldDecorator('commneterName', {
                rules: [
                  { required: true, message: '请输入昵称' },
                  { max: 10, message: '最多输入10个字'}
                ],
              })(
                <Input placeholder="唐四藏"/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="邮箱">
              {getFieldDecorator('commneterEmail', {
                rules: [
                  { required: true, message: '请输入邮箱地址' },
                  { type: 'email', message: '请输入正确邮箱地址'}
                ],
              })(
                <Input type="email" placeholder="wuyunjiang@hotmail.com"/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="网站">
              {getFieldDecorator('commneterURL', {
                rules: [{ type: 'url', message: '请输入正确网址'}],
              })(
                <Input type="url" placeholder="http://wuyunjiang.cn"/>
              )}
            </FormItem>
          </Col>
        </Row>
        <FormItem label="你的评论">
          {getFieldDecorator('content',{
            rules: [{ required: true, message: '说点什么吧' },],
          })(
            <Input type="textarea" placeholder="支持部分MarkDown语法，如** 加粗 **、## h2 等" style={{height:'150px',resize:'none'}}/>
          )}
        </FormItem>
        <FormItem>
          <Row style={{textAlign:'right'}}>
            <Col span={4} push={17}>
              {isReply?<Button onClick={cancelReply}>取消回复</Button>:""}
            </Col>
            <Col span={2} push={18}>
              <Button type="primary" onClick={handleSubmit}>提交</Button>
            </Col>
          </Row>
        </FormItem>
      </Form>
    );
  }
);




export default class Comment extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      isReply:false,
      articleID:props.currentArticleID,
      replyParentID:0,
      replyParentGrade:0
    };
  }
  //
  getReply(commentID){
    this.showReply(commentID)
    this.props.byReplyIdGetReply(commentID,this.hideReply.bind(this))
  }

  handleReplySubmit(){
    const form = this.refs.CommentForm
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      const parameters=this.setParameters(values)//设置评论的参数
      this.props.submitComment(parameters)
      form.resetFields();
    });
  }
  setParameters(formData){
    let parameters={}
    if(this.state.isReply){//判断提交的是回复，还是评论
      parameters.type="reply"
      parameters.data=formData
      parameters.data.articleID=this.state.articleID
      parameters.data.parentID=this.state.replyParentID
      parameters.data.parentGrade=this.state.replyParentGrade//表示回复的那条评论是几级评论
    }else{
      parameters.type="comment"
      parameters.data=formData
      parameters.data.articleID=this.state.articleID
    }
    return parameters
  }

  showReply(commentID){//[加载某条评论的回复]的等待状态
    if(!this.state.spinning){
      this.refs[commentID].setState({
        spinning:true
      })
    }
  }
  hideReply(commentID){//隐藏[加载某条评论的回复]的等待状态
    if(this.state.spinning){
      this.refs[commentID].setState({
        spinning:false
      })
    }
  }


  cancelReply(){//点击[取消回复]按钮
    this.refs.CommentForm.resetFields();
    this.setState({
      isReply:false,
      replyParentID:0,
      replyParentGrade:0
    })
    document.getElementById("content").setAttribute("placeholder",
      "支持部分MarkDown语法，如** 加粗 **、## h2 等")
  }
  reply(comment){//点击某条评论下的【评论】链接，设置表单的状态（textarea的placeholder）
    this.setState({
      isReply:true,
      replyParentID:comment.Id,
      replyParentGrade:comment.Grade
    })
    document.getElementById("content").setAttribute("placeholder",
      "你将回复【"+comment.Commentername+"】的评论："+LotsOfSpaces+
      comment.Content+LotsOfSpaces)
  }


  showCard (comments) {
    return comments.map((comment, index) => {
      return (
          <Card 
            key={comment.Id}
            title={<a target="_blank" href={comment.CommenterURL}>{comment.Commentername}：</a>} 
            extra={<span style={{fontSize:'10px'}}>{comment.Time}</span>}
            style={{marginBottom:'20px'}}
            bodyStyle={{paddingLeft:'32px'}}>
            <p>{comment.Content}</p>
            <div className={styles.cardBottom}>
              <a onClick={comment.Replynum===0?null:()=>{this.getReply(comment.Id)}}>回复({comment.Replynum})</a>
              <a href="#CommentForm" onClick={()=>{this.reply(comment)}}>评论</a>
            </div>
            <div className={styles.childReplys} >
              <Spin ref={comment.Id} spinning={false}/>
              {comment.hasOwnProperty('childReplys')?this.showCard(comment.childReplys):""}
            </div>
          </Card>
        ) 
    })
  }

  render(){
    const thisState={
      comments:this.props.comments,
    }
    return (
      <div id="CommentForm" className={styles.normal}>
        <Card title="文 章 评 论" style={{textAlign:'left'}} > 
          <CommentForm
            ref="CommentForm"
            handleSubmit={this.handleReplySubmit.bind(this)}
            cancelReply={this.cancelReply.bind(this)}
            isReply={this.state.isReply}/>
          <Card
            // loading={thisState.comments.hasOwnProperty('message')?true:false}
            className={styles.cardstyle}
            bodyStyle={{padding:'5px',backgroundColor:'#EEE'}}>
            {
              thisState.comments.hasOwnProperty('message')
              ?<Card bodyStyle={{textAlign:'center'}}><h1>暂无评论</h1></Card>
              :this.showCard(thisState.comments)
            }
          </Card>
        </Card>
      </div>
    );
  }
}