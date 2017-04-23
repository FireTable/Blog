import { getAllBlogroll, submitBlogrollApply } from '../services/blogroll'
import { parse } from 'qs'

export default {

  namespace: 'blogroll',

  state: {
    list:[],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      
    },
  },

  effects: {
    * getAllBlogroll(action,{call,put}) { // eslint-disable-line
      const data = yield call(getAllBlogroll)
      if (data) {
        yield put({
          type: 'changeState',
          payload: {
            list:data
          },
        })
      }
    },
    * submitBlogrollApply({ payload,hide,showMessage }, { call, put }) { // eslint-disable-line
      const data = yield call(submitBlogrollApply, parse(payload))
      if (data) {
        showMessage(data.success)
        hide()
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
