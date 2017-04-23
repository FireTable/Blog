/**
 * 处理文章评论
 * 将某条评论的回复评论，添加到对应的评论列表中
 * @param  {object} obj  处理前的评论内容
 * @param  {json} rule 	 请求回来的，某条评论的回复评论，以及那条评论的id
 * @return {object}      处理后的评论内容
 */
export function addReplys(comments,replyObj){
	if(replyObj.commentID===0){//如果评论是一级评论，则直接放入
		return replyObj.replys.concat(comments)
	}
	comments.map(function(comment, index) {
		if(comment.Id===replyObj.commentID){//参数2（评论数组）是不是这个comment的回复
			if(comment.childReplys){//如果是，在判断这个comment有没有childReplys这个对象
				comment.childReplys=replyObj.replys.concat(comment.childReplys)//如果有，则把参数2（评论数组）加入到里面
				comment.Replynum=comment.Replynum+1//如果comment有childReplys字段，表示参数2是一条回复
												   //数据，使该comment的回复数加一
			}
			else{
				comment.childReplys=replyObj.replys
			}//否则就让comment的childReplys直接等于参数2（评论数组）
			return;
		}
		if(comment.hasOwnProperty('childReplys')){//如果参数2（评论数组）不是这个comment的回复
												  //再判断这个comment是否有childReplys，如果有，
												  //进入childReplys再做递归
			addReplys(comment.childReplys,replyObj)
		}
	})
	return comments
}