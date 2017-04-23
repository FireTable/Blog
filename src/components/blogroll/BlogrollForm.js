import React, { Component } from 'react';
import * as globalCss from '../global.css'
import styles from './BlogrollForm.css'
import { LotsOfSpaces } from '../../utils/LotsOfSpaces'
import { Card, Form, Input, Row, Col, Button, Spin } from 'antd';
const FormItem = Form.Item;


const MyForm = Form.create()(
  (props) => {
    const { form, handleSubmit, reset, refs } = props;
    refs(form)
    const { getFieldDecorator, setFieldsValue } = form
    return (
      <Form style={{textAlign:'left'}}>
        <Row gutter={16}>
          <Col span={8}>
            <FormItem label="网站名称">
              {getFieldDecorator('webName', {
                rules: [
                  { required: true, message: '请输入姓名' },
                  { max: 10, message: '最多输入10个字'}
                ],
              })(
                <Input placeholder="唐四藏"/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="网站地址">
              {getFieldDecorator('webURL', {
                rules: [
                  { required: true, message: '请输入姓名' },
                  { type: 'url', message: '请输入正确网址'}
                ],
              })(
                <Input type="url" placeholder="http://wuyunjiang.cn"/>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="站点图标地址">
              {getFieldDecorator('webIconURL', {
                rules: [
                  { type: 'url', message: '请输入正确网址'}
                ],
              })(
                <Input type="url" placeholder="http://wuyunjiang.cn/webIcon.ico"/>
              )}
            </FormItem>
          </Col>
        </Row>
        <FormItem label="网站描述">
          {getFieldDecorator('webDescription',{
            rules: [
              { required: true, message: '请输入网站描述' },
              { max: 50, message: '最多输入50个字'}
            ],
          })(
            <Input type="textarea" placeholder="网站描述" style={{height:'100px',resize:'none'}}/>
          )}
        </FormItem>
        <FormItem>
          <Row style={{textAlign:'right'}}>
            <Col span={2} push={18}>
              <Button onClick={reset}>重置</Button>
            </Col>
            <Col span={4} push={18}>
              <Button type="primary" onClick={handleSubmit}>提交申请</Button>
            </Col>
          </Row>
        </FormItem>
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
      Props.submitBlogrollApply(values)
      form.resetFields();
    });
  }
  return (
    <Card title="申 请 友 链" style={{textAlign:'left'}} > 
      <MyForm
        refs={(form)=>{thisState.form=form}}
        handleSubmit={handleSubmit}
        reset={reset}/>
    </Card>
  );
}