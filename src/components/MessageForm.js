import React, { Component } from 'react';
import * as globalCss from './global.css'
import styles from './MessageForm.css'
import { Card, Form, Input, Row, Col, Button, Spin, Icon } from 'antd';
const FormItem = Form.Item;


const MyForm = Form.create()(
  (props) => {
    const { form, handleSubmit, reset,refs} = props;
    refs(form)
    const { getFieldDecorator, setFieldsValue } = form
    return (
      <Form style={{textAlign:'left'}}>
        <FormItem>
          {getFieldDecorator('content',{
            rules: [{ required: true, message: '说点什么吧' },],
          })(
            <Input 
              type="textarea" 
              placeholder="真知灼见，惜字如金" 
              style={{height:'150px',resize:'none'}}/>
          )}
        </FormItem>
        <Row gutter={16}>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator('commneterName', {
                rules: [
                  { required: true, message: '请输入昵称' },
                  { max: 10, message: '最多输入10个字'}
                ],
              })(
                <Input placeholder="Your NickName" addonAfter={<Icon type="user" />}/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem >
              {getFieldDecorator('commneterEmail', {
                rules: [
                  { required: true, message: '请输入邮箱地址' },
                  { type: 'email', message: '请输入正确邮箱地址'}
                ],
              })(
                <Input type="email" placeholder="Your E-mail"  addonAfter={<Icon type="mail" />}/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <Col span={11}>
              <Button onClick={reset} size='large' style={{width:'100%'}}>重置</Button>
            </Col>
            <Col span={11} offset={2}>
              <Button type="primary" size='large' style={{width:'100%'}} onClick={handleSubmit}>提交</Button>
            </Col>
          </Col>
        </Row>
        
      </Form>
    );
  }
);



export default function BlogrollForm( Props ) {

  const thisState={
    form:null,
  }

  const reset = () => {
    thisState.form.resetFields();
  }

  const handleSubmit = () => {
    const form = thisState.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      Props.submitMessage(values)
      form.resetFields();
    });
  }
  return (
    <Card 
      title="留 言 板"
      style={{fontSize:"16px"}}
      bodyStyle={{paddingBottom:0}}> 
      <MyForm
        refs={(form)=>{thisState.form=form}}
        handleSubmit={handleSubmit}
        reset={reset}/>
    </Card>
  );
}