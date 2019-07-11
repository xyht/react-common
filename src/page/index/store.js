import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import mainReducer from './reducer/main.js';

const store = createStore(mainReducer, applyMiddleware(thunk));

if (module.hot) {
	module.hot.accept('./reducer/main', () => {
		const nextRootReducer = require('./reducer/main.js').default;
		store.replaceReducer(nextRootReducer)
	});
}
module.exports = {
	store,
	// history
}

// const history = require("history").createHashHistory()
// import createHistory from 'history/createHashHistory'
// const history = createHistory();
// import createHistory from 'history/createHashHistory'

// import { routerMiddleware } from 'react-router-redux'

// 创建基于hash的history
// const history = createHistory();

// 创建初始化tab
// history.replace('home');

// 创建history的Middleware
// const historyMiddl = routerMiddleware(history);
