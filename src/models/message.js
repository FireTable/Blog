import { getOnePageMessage,submitMessage } from '../services/message'
import { parse } from 'qs'

export default {

  namespace: 'mymessage',

  state: {
    list:[],
    pageInfo:{
      currentPage:1,
      totle:0
    }
    
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      
    },
  },

  effects: {
    * submitMessage({ payload,hide }, { call, put }) { // eslint-disable-line
      const data = yield call(submitMessage, parse(payload))
      if (data) {
        yield put({
          type: 'addMessage',
          payload: {
            Message:data
          },
        })
        hide();
      }
    },
    * getOnePageMessage({ payload }, { call, put }) { // eslint-disable-line
      const data = yield call(getOnePageMessage, parse(payload))
      if (data) {
        yield put({
          type: 'loadMessages',
          payload: {
            list:data.data,
            pageInfo:{
              currentPage:data.currentPage,
              totle:data.totle
            }
          },
        })
      }
    },
  },

  reducers: {
    loadMessages(state, action) {
      const list=state.list.concat(action.payload.list)
      return { ...state,
        list:list,
        pageInfo:action.payload.pageInfo
      }
    },
    addMessage(state, action) {
      state.list.unshift(action.payload.Message)
      return { ...state
      }
    },
  },

};
