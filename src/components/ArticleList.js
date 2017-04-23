import React, { Component } from 'react';
import styles from './ArticleList.css';
import * as globalCss from './global.css'
import { Pagination, Spin } from 'antd';
import ArticleItem from './ArticleItem'


export default class ArtilcleList extends Component {

  constructor(props) {
    super(props);
  }

  loadArticles(nextPage){
    this.props.loadArticles(nextPage)
  }

  componentWillMount(){
    this.loadArticles(1)
  }

  render(){
    const articleDate = {
      list: this.props.list,
      pagination: this.props.pagination,
    }

    const { changeArticleID } = this.props//点击文章标题跳转函数

    const onChange = (pageNumber, pageSize) => {
      this.props.removeArticles()
      this.loadArticles(pageNumber)
    };

    return (
      <div className={styles.normal} >
        {articleDate.list.length===0
        ?<div style={{textAlign:'center',marginTop:'30%'}}><Spin size="large"/></div>
        :<div>
          <div className={styles.articles}>
            {articleDate.list.hasOwnProperty('message')
              ?<h1 style={{textAlign:'center'}}>暂无文章</h1>
              :articleDate.list.map(article=>{
              return (
                <ArticleItem key={article.Id} {...article } changeArticleID={ changeArticleID }/>
            )})}
          </div>
          <Pagination 
            simple 
            defaultCurrent={articleDate.pagination.current} 
            pageSize={10}
            total={articleDate.pagination.total} 
            onChange={onChange}/>
        </div>}
      </div>
    );
  }
}

