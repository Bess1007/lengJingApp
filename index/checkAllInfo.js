var vm = new Vue({
	el: '#app',
	data: {
		list: {},
	},
	mounted: function() {
		mui.init();
		mui.plusReady(function() {
			vm.list = plus.webview.currentWebview().data;
			console.log(vm.list);
			console.log(JSON.stringify(vm.list));
		})
	},
	filters: {
		switchNum: function(type) {
				if(type == 1) {
					return "被执行人";
				} else if(type == 2) {
					return "失信被执行人";
				} else if(type == 3) {
					return "裁判文书";
				} else if(type == 4) {
					return "法院公告";
				} else if(type == 5) {
					return "百度新闻";
				} else if(type == 6) {
					return "舆情信息";
				} else if(type == 7) {
					return "招投标";
				} else if(type == 9) {
					return "工商信息"
				}
		}
	},
	methods:{
		getInfotxt:function(jsondata){
			if (jsondata.state == 9){
				mui.openWindow({
					id:'gudongguf',
					url:'gudongguf.html',
					extras:{
						jsondata:jsondata
					},
					show:{
						aniShow:'pop-in'
					},
					waiting:{
						autoShow:false
					},
				})
			}else{
				mui.openWindow({
					id:'infotxt',
					url:'infotxt.html',
					extras:{
						jsondata:jsondata
					},
					show:{
						aniShow:'pop-in'
					},
					waiting:{
						autoShow:false
					},
				})

			}
		}
	},
})