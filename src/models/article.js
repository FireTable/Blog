import { 
  queryOnePage, 
  byIdGetDetailed, 
  byIdGetComments, 
  byIdGetReplys,
  submitComment } from '../services/app'

import { parse } from 'qs'
import { addReplys } from '../utils/addReplys'

export default {

  namespace: 'article',

  state: {
    isDetailed:false,//是否展示的详情页
    list: [], //储存博客文章简略数据
    currentArticleID:0,//当前查看的文章ID
    comments:[],//当前查看的文章评论
    content:"",//当前查看的文章内容
    pagination: {//存储翻页信息
      current: 1,
      total: 0,
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      
    },
  },

  effects: { 
    * queryTenArticle({ payload }, { call, put }) { // eslint-disable-line
      const data = yield call(queryOnePage, parse(payload))
      if (data) {
        yield put({
          type: 'changeState',
          payload: {
            list:data.data,
            pagination:{
              current:data.current,
              total:data.totle
            }
          },
        })
      }
    },
    * byIdGetDetailed({ payload }, { call, put }) { // eslint-disable-line
      const data = yield call(byIdGetDetailed, parse(payload))
      if (data) {
        yield put({
          type: 'changeState',
          payload: {
            content:data[0].Content,
            isDetailed:true
          },
        })
      }
    },
    * byIdGetComments({ payload }, { call, put }) { // eslint-disable-line
      const data = yield call(byIdGetComments, parse(payload))
      if (data) {
        yield put({
          type: 'changeState',
          payload: {
            comments:data
          },
        })
      }
    },
    * byIdGetReplys({ payload }, { call, put }) { // eslint-disable-line
      const data = yield call(byIdGetReplys, parse(payload))
      if (data) {
        yield put({
          type: 'addReply',
          payload: {
            replys:data,
            commentID:payload.commentID
          },
        })
        payload.hideReply(payload.commentID)
      }
    },
    * submitComment({ payload,hide }, { call, put }) { // eslint-disable-line
      const data = yield call(submitComment, parse(payload))
      if (data) {
        yield put({
          type: 'addReply',
          payload: {
            replys:data,
            commentID:0
          },
        })
        hide()
      }
    },
  },

  reducers: {
    changeState(state, action) {
      console.log(action.payload)
      return { ...state,
        ...action.payload
      }
    },
    closeDetailed(state, action) {
      return { ...state,
        isDetailed:false
      }
    },
    addReply(state, action){
      const newComments = addReplys(state.comments,action.payload)
      return { ...state,
        comments:newComments
      }
    },
  },

};
