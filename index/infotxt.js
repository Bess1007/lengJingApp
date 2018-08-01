var vm = new Vue({
	el:'#app',
	data:{
		item:[],
		companyName:'',
	},
	mounted:function(){
		mui.init();
		mui.plusReady(function(){
			var self = plus.webview.currentWebview();//获取当前页面所属的Webview窗口对象----当前窗口
			var data = self.jsondata//获取当前页面所属的Webview窗口对象的jsondata数据=data 赋值给data----当前窗口的数据
			vm.item = self.jsondata;//将获取的数据存入vm.item
			var state = data.state;
			vm.companyName = data.companyname;//公司名称	
			console.log(data.companyname);
			console.log(JSON.stringify(data.state));
		})
	}
})