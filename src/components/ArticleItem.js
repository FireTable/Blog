import React from 'react';
import styles from './Article.css';
import * as globalCss from './global.css'
import TimeAndTag from './TimeAndTag'
import { Link } from 'dva/router'

function Artilcle( Porps ) {
  const thisState={
    summary:Porps.Summary,
    title:Porps.Title,
    id:Porps.Id,
  }
  const { changeArticleID } = Porps

  const TimeAndTagProps={
    time:Porps.Publistime,
    tags:Porps.tags
  }

  const	showDetailedArticle = (Proxy,Event) => {
  	// console.log("showDetailedArticle");
   //  console.log(Proxy);
    changeArticleID(thisState.id);
  }
  return (
    <div className={styles.normal}>
    	<h2 
      className = { styles.article_title }
      onClick = { showDetailedArticle }>{thisState.title}</h2>
      <p className = { styles.article_summary } > { thisState.summary }</p>
      <TimeAndTag  { ...TimeAndTagProps }/>

	  <hr className={styles.post_divider}/>
    </div>
  );
}

export default Artilcle;
