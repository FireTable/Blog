import dva from 'dva';
import './index.css';
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';
import { browserHistory } from 'react-router';

// 1. Initialize
const app = dva({
  history: browserHistory,
  	  // :useRouterHistory(createHashHistory)({ queryKey: false }),
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/app'));
app.model(require('./models/article'));
// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
