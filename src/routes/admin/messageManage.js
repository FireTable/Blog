import React,{ Component } from 'react';
import styles from './messageManage.css'
import { Form, Input, Button,Row,Col, Spin, Icon } from 'antd';
const FormItem = Form.Item;

const SearchForm = Form.create()(
  (props) => {
    const { form, handleSubmit, reset} = props;
    const { getFieldDecorator, setFieldsValue } = form
    return (
      <Form>
        <FormItem>
          {getFieldDecorator('commneterName', {
            rules: [
              { min: 9, message: '文章ID为十位的数字'},
              { max: 9, message: '文章ID为十位的数字'},
              { num: true, message: '文章ID为十位的数字'}
            ],
          })(
            <Input placeholder="文章ID"/>
          )}
        </FormItem>
        <FormItem >
          {getFieldDecorator('commneterEmail', {
            rules: [
              { required: true, message: '请输入评论者昵称' }
            ],
          })(
            <Input type="email" placeholder="评论者昵称"/>
          )}
        </FormItem>
          <Button onClick={reset} size='large' style={{width:'100%'}}>重置</Button>
          <Button type="primary" size='large' style={{width:'100%'}} onClick={handleSubmit}>提交</Button>
      </Form>
    );
  }
);


export default class messageManage extends Component {
 
	componentWillMount(){
		// this.props.dispatch({
  //     type:'blogroll/getAllBlogroll',
  //   })
	}
	reset() {
   	this.refs.searchForm.resetFields();
  }

  handleSubmit() {
    const form = this.refs.searchForm
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      // Props.submitMessage(values)
      form.resetFields();
    });
  }
	render(){
		return (
	    <div className={styles.page}>
	    	<div className={styles.searchDiv}>
	    		<SearchForm 
	    			ref="searchForm"
	        	handleSubmit={this.handleSubmit.bind(this)}
	        	reset={this.reset.bind(this)}/>
	    	</div>
	    	<div className={styles.dataDiv}></div>
	    </div>
	  );
	}
}
