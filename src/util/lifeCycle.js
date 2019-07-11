class lifeCycle {
	constructor() {

	}
	//组件被挂载到页面上之后，被执行的方法(组件第一次挂载的时候执行)
	componentDidMount() {
		//一般情况下载该函数下进行 ajax 请求来获取数据   （axios、浏览器内置的 window.fetch()）
		axios.get("接口").then(
			() => { }
		).catch(
			() => { }
		);
		console.log('componentDidMount');
	}
	//组件更新之前会被执行的函数   可以通过该钩子函数来进行性能的优化  
	shouldComponentUpdate() {
		console.log('shouldComponentUpdate');
		return true;   //需要返回一个Boolean类型，true表示更新
	}

	//组件更新之后会被执行
	componentDidUpdate() {
		console.log('componentDidUpdate');
	}
	//当组件即将被从页面中剔除出去的时候回被执行
	componentWillUnmount() {
		console.log('componentWillUnmount');
	}
}
