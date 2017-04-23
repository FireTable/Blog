import React from 'react';
import { connect } from 'dva';
import { message } from 'antd'
import styles from './Blog.css';
import ArticleList from '../components/ArticleList'
import ArticleDetailed from '../components/ArticleDetailed'
import { push } from 'react-router-redux'
function Blog(Props) {
	const { dispatch, articleState } = Props

	const changeArticleID=(articleID)=>{
		dispatch(push({
			pathname: "/blog/article/"+articleID,
		}))
		dispatch({
			type:"article/changeArticleID",
			payload: {
		    currentArticleID:articleID
		  },
		})
	}

	const closeDetailed = () => {
		dispatch(push({
			pathname: "/blog",
		}))
	    dispatch({
	      type:"article/closeDetailed",
	    })
	}

  const loadArticles = (nextPage,hide) => {
    dispatch({
      type:'article/queryTenArticle',
      payload: {
        current:nextPage
      },
      hide:hide
    })
  }

  const getArticleDetailed = () => {
  	dispatch({
			type:"article/byIdGetDetailed",
			payload: {
		    articleID:articleState.currentArticleID
		  },
		})
  }
  const getArticleComments = () => {
  	dispatch({
			type:"article/byIdGetComments",
			payload: {
		    articleID:articleState.currentArticleID
		  },
		})
  }
  const byReplyIdGetReply = (commentID,hideReply) => {
  	dispatch({
			type:"article/byIdGetReplys",
			payload: {
				commentID:commentID,
				hideReply:hideReply
		  },
		})
  }

	const submitComment = (CommentDate) => {
		const hide = message.loading('评论提交中...', 0);
		dispatch({
			type:"article/submitComment",
			payload: {
				CommentDate:CommentDate,
		  	},
		  	hide:hide
		})
	}

	const removeDetailed = () => {
		dispatch({
			type:"article/changeState",
			payload: {
			    content:"",
			    comments:[]
			  },
		})
	}
	const removeArticles = () => {
		dispatch({
			type:"article/changeState",
				payload: {
			    list:[],
			  },
		})
	}
	const addCommentToState = (comment) => {
		dispatch({
			type:"article/addComment",
			payload: {
		    comment:comment
		  },
		})
	}

	const thisState = {
		isDetailed:articleState.isDetailed,
	}

	const ArticleDetailedProps = {
		currentArticleID:articleState.currentArticleID,
		content:articleState.content,
		comments:articleState.comments,
		closeDetailed:closeDetailed,
		submitComment:submitComment,
		getArticleDetailed:getArticleDetailed,
		getArticleComments:getArticleComments,
		byReplyIdGetReply:byReplyIdGetReply,
		removeDetailed:removeDetailed
	}
	const ArticleListProps = {
		list:articleState.list,
		pagination:articleState.pagination,
		changeArticleID:changeArticleID,
    	loadArticles:loadArticles,
    	removeArticles:removeArticles
	}	

  return (
    <div className={styles.normal}>
      {thisState.isDetailed
        ?<ArticleDetailed  {...ArticleDetailedProps} />
        :<ArticleList {...ArticleListProps}/>
      }
    </div>
  );
}

function mapStateToProps({ article }) {
  return {
  	articleState:article
  };
}

export default connect(mapStateToProps)(Blog);
