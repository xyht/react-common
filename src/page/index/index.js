import 'common/style/common'
import 'common/logic/rem'
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'react-router-redux';

import Container from './Main/Container';
import { store } from './store.js';


ReactDom.render(
	// <HashRouter>
	<Provider store={store}>
		{/* <ConnectedRouter history={history}> */}
		<Container />
		{/* </ConnectedRouter> */}
	</Provider>
	// </HashRouter>
	,
	document.getElementById('root')
);