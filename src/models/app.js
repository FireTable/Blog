import { parse } from 'qs'

export default {

  namespace: 'app',

  state: {
    isIndex:false,
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
    showIndexPage(state, action) {
      return { 
        ...state, 
        isIndex:true,
      };
    },
    hideIndexPage(state, action) {
      return { 
        ...state, 
        isIndex:false,
      };
    },
    save(state, action) {
      console.log("save render")
      console.log(action.payload);
      return { 
        ...state, 
      };
    },
  },

};
