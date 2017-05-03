import { parse } from 'qs'

export default {

  namespace: 'admin',

  state: {
    isLogin:true,
    siderFold:true,
    user: {
      name: 'wuyunjiang',
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      
    },
  },

  reducers: {
  },

};
