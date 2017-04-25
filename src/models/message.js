import { getOnePageMessage } from '../services/message'
import { parse } from 'qs'

export default {

  namespace: 'message',

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
    // * getOnePageMessage(action,{call,put}) { // eslint-disable-line
    //   const data = yield call(getOnePageMessage)
    //   if (data) {
    //     yield put({
    //       type: 'changeState',
    //       payload: {
    //         list:data
    //       },
    //     })
    //   }
    // },
    * getOnePageMessage({ payload }, { call, put }) { // eslint-disable-line
      const data = yield call(getOnePageMessage, parse(payload))
      if (data) {
        yield put({
          type: 'changeState',
          payload: {
            list:data.data,
            pageInfo:{
              currentPage:data.currentPage,
              totlle:data.totle
            }
          },
        })
      }
    },
  },

  reducers: {
    changeState(state, action) {
      return { ...state,
        ...action.payload
      }
    },
  },

};
