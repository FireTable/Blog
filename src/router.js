import React, { PropTypes } from 'react'
import { Router } from 'dva/router'


import IndexPage from './routes/IndexPage';
import Blog from "./routes/Blog";
import Message from "./routes/Message";
import Blogroll from "./routes/Blogroll";

//admin
import adminIndex from './routes/admin/adminIndex'



//      https://github.com/dvajs/dva/issues/533
//      由于 dva@1.2 中引入了 app.unmodel 以及为 app.model 增加了冲突校验，不允许
//      对相同的 namespace 注册多次 model，而动态加载路由需要多次执行 app.model，所
//      以很多人升级到 1.2 时就出错了。典型出错
const cached = {}
const registerModel = (app, model) => {
    if (!cached[model.namespace]) {
      app.model(model)
      cached[model.namespace] = 1
    }
  }
  ///**********************************************************************


/**
 * 预处理URL
 * @param  {object} history [description]
 * @param  {[type]} app     [description]
 * @return {[type]}         [description]
 */
const urlPretreatment = (history, app) => {
  history.listen(location => {
    if (location.pathname === "/") {
      app._store.dispatch({ type: 'app/showIndexPage' });
    }
    if (location.pathname.indexOf('/blog/article') !== -1) {
      const pathname = location.pathname
      app._store.dispatch({
        type: 'article/changeState',
        payload: {
          isDetailed: true,
          currentArticleID: pathname.substring(pathname.indexOf('/article') + 9)
        }
      });
    }
  });
}



const Routers = function({ history, app }) {
  urlPretreatment(history, app);
  const routes = [{
    path: 'admin',
    name: 'adminIndex',
    getComponent(nextState, cb) {
      require.ensure([], require => {
        registerModel(app, require('./models/admin/admin'))
        cb(null, require('./routes/admin/adminIndex'))
      }, 'article')
    },
    childRoutes: [{
      path: 'blogManage',
      name: 'blogManage',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          // registerModel(app, require('./models/admin/blogManage'))
          cb(null, require('./routes/admin/blogManage'))
        }, 'blogManage')
      },
    }, {
      path: 'messageManage',
      name: 'messageManage',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          // registerModel(app, require('./models/messageManage'))
          cb(null, require('./routes/admin/messageManage'))
        }, 'messageManage')
      },
    },{
      path: 'dashboard',
      name: 'dashboard',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          // registerModel(app, require('./models/admin/blogManage'))
          cb(null, require('./routes/admin/dashboard'))
        }, 'dashboard')
      },
    }]
  }, {
    path: '/',
    name: 'IndexPage',
    component: IndexPage,
    childRoutes: [{
      path: 'Blog',
      name: 'Blog',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./routes/Blog'))
        }, 'Blog')
      },
      childRoutes: [{
        path: 'article/:articleID',
        name: 'article',
        getComponent(nextState, cb) {
          require.ensure([], require => {
            cb(null, require('./routes/Blog'))
          }, 'article')
        },
      }]
    }, {
      path: 'Message',
      name: 'Message',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/message'))
          cb(null, require('./routes/Message'))
        }, 'Message')
      },
    }, {
      path: 'Blogroll',
      name: 'Blogroll',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/blogroll'))
          cb(null, require('./routes/Blogroll'))
        }, 'Blogroll')
      },
    }, {
      path: '*',
      name: 'error',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./routes/error'))
        }, 'error')
      },
    }]
  }]

  return <Router history = { history }
  routes = { routes }
  />;
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers












// function RouterConfig({ history }) {
//   return (
//     <Router history={history}>
//       <Route path="/" component={IndexPage} />
//     </Router>
//   );
// }
