var vm = new Vue({
	el: '#app',
	data: {
		load:true,
		items: [ //用于存放信息类型列表
			{//信息类型
			value:"招投标",
			index:7,
		},{
			value:"工商信息",
			index:9,
		},{
			value:"被执行人",
			index:1,
		},{
			value:"失信被执行人",
			index:2,
		},{
			value:"裁判文书",
			index:3,
		},{
			value:"法院公告",
			index:4,
		},{
			value:"新闻",
			index:5,
		},{
			value:"舆情信息",
			index:6,
		}],
		groups: [//用于存放群租列表
			/*{
				value:"客户",
			},
			{
				value:"竞争对手",
			},
			{
				value:"供应商",
			},*/
		
		], //群租列表
		groupId: null, //用于存放群租id
		infoId:null,//用于存放信息类型id
		pushlist: [], //用于存放推送列表
		downFreshList:[],//用于存放下拉刷新返回的数据
	},
	mounted: function() {
		mui.init();
		mui.plusReady(function() {
			console.log(3);
			vm.getType({},function(data){
				console.log(JSON.stringify(data));
				if(data.status == 200){
					vm.groups=data.data;
					console.log(data.data);
				}
				console.log(data);
			});//获取群组信息
			
			
			vm.pickPushInfoList(null,null,0);//获取群组信息
		});
	},
	filters:{//vue过滤器
		formatDateYR:function(time){
			/*如果时间不为空，则返回时间5至10的下标*/
			if(time!=null){
				return time.substring(5,10);
			}
		},
		switchNum:function(type){
			if(type == 1){
				return "被执行人";
			}else if(type == 2){
				return "失信被执行人";
			}else if(type == 3){
				return "裁判文书";	
			}else if (type == 4) {
				return "法院公告";
			} else if(type == 5){
				return "百度新闻";
			}else if(type == 6){
				return "舆情信息";
			}else if(type == 7){
				return "招投标";
			}else if(type == 9){
				return "工商信息"
			}
		}
	},
	methods:{//所有的方法都放在methods里写
		lookMore:function(url,id,pushdata){
			console.log(pushdata);
			console.log(JSON.stringify(pushdata));
			mui.openWindow({
				url:url,
				id:id,
				extras:pushdata,//自定义扩展参数，可以用来处理页面间传值,这里将首页的推送列表数据传到推送信息更多列表页
				show:{
					aniShow:'zoom-fade-out'//页面显示动画
				},
				waiting:{
					autoShow:false,//因数据从首页传过来，不需要再次请求，固 autoShow:false,//自动显示等待框，默认为true
				}
			})
		},
		
		
		/*--------------------获取信息类型--点击事件begin------------------*/
		getInfo:function(index){//方法带参数即v-on:click="getInfo(item.index)"，即vm.items对象里的index，
			console.log("点击信息");
			console.log(index);
			vm.infoId = index;//把获取到的id赋值到vm.infoId即infoId:[],//信息类型id
		},
		getAllInfo:function(){//方法不带参数
			vm.infoId = null;//vm.infoId为空即infoId:[],//信息类型id为空，为空即不分选择信息类型，即全部获取
		},
		/*--------------------获取信息类型--点击事件end------------------*/
		
		
		/*--------------------获取群组类型--点击事件begin------------------*/
		//方法带参数即v-on:click="getGroup(index)"，即所点击事件的的下标
		getGroup:function(index){
			console.log(index);
			vm.groupId = index;//将点击事件的下标赋值给vm.groupId即groupId: [], //群租id
		},
		getAllGroup:function(){//方法不带参数
			vm.groupId = null;//vm.groupId为空即groupId:[],//信息类型id为空，为空即不分群组选择，即全部获取
		},
		/*--------------------获取群组类型--点击事件end------------------*/
		
		
		/*getType:function(){//获取群组信息
			getJsonAjax('attentionact/selectAttentionGrop.jhtml',{},function(data){
//				console.log(JSON.stringify(data));
				if(data.status == 200){
					vm.familyTree=data.data;
				}
			},'获取群组信息',function(){
				
			},function(){
				
			})
		},*/
		
		getType:function(data,success){
			mui.ajax(rootPath+'attentionact/selectAttentionGrop.jhtml',{
				data:data,
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型
				timeout:0,//超时时间设置为10秒；
				//beforeSend:beforeSend,
				contentType: "application/json",
				//headers:header,
				success:success,
//				success:function(data){
//					console.log(JSON.stringify(data));
//				},

				error:function(xhr,type,errorThrown){
						console.log(xhr.status);
						console.log(type);
						console.log(JSON.stringify(errorThrown));
					}
			})
		},
		
		/*-------------------点击确认按钮-获取信息类型&&获取群组类型--点击事件begin------------------*/
		confirm:function(){//点击确认按钮调用一个pickPushInfoList函数
			console.log("调用pickPushInfoList函数");
			this.pickPushInfoList(vm.infoId, vm.groupId, 0);//三个参数，需要通过这三个参数和后台建立一个通道索取推送信息列表信息
			console.log(vm.infoId, vm.groupId, 0);
		},
		
		pickPushInfoList:function(state,currentgroup,pageNum){//获取推送信息列表函数，参数即需要带到后台查数据同下；
			console.log(state);
			console.log(currentgroup);
				mui.ajax('index.json',{
					//console.log(6);
					data:{//这里的data是传往后台的参数
						state:state,//信息类型
						currentgroup:currentgroup,//群组类型
						pageNum:0,//当前页
					},
					//dataType:'json',//服务器返回json格式数据
					type:'post',//HTTP请求类型
					timeout:0,//超时时间设置为10秒；
					success:function(data){
						var data = JSON.parse(data);//将数据转换成json对象
						console.log(typeof data);//打印data的类型，只有数据是对象的时候，才可以用.xx,.yy之类的如下
						if(data.data.length>0){//如果大于0折代表有数据，
							vm.pushlist = data.data;
							console.log(JSON.stringify(data.data));
							/*var newpushlist = data.data;//把数据赋值到变量newpushlist
							if(vm.downFreshList.length==0){//如果刷新的数据为0 则代表没有数据，如果没有数据
								vm.downFreshList = newpushlist//将刷新的数据存放到数组中
							}else{
								for(var i=newpushlist.length-1;i>=0;i--){
									var j=0;
									for(j=0;j<vm.downFreshList.length;j++){
										if(newpushlist[i].companyname==vm.downFreshList[j].companyname&&newpushlist[i].infodate==vm.downFreshList[j].infodate){
											vm.downFreshList.splice(j,1);//删除功能，第一个参数为第一项位置，第二个参数为要删除几个。
											vm.downFreshList.unshift(newpushlist[i]);//将新数据中相同数据放到缓存数据的头部;unshift()方法：在数组(vm.downFreshList)的前端添加项
											break;//结束当前整个循环，执行当前循环下边的语句
										}
									}
									if(j=vm.downFreshList.length){//代表新数据中的某条数据与缓存中的数据比较一圈都没有找到相同数据，则将该条数据插入到缓存数据头部
											vm.downFreshList.unshift(newpushlist[i]);//将新数据中相同数据放到缓存数据的头部;unshift()方法：在数组(vm.downFreshList)的前端添加项
									}
								}
							}
						
							vm.pushlist = vm.downFreshList;
							console.log("加载数据成功");
							localStorage.setItem("pushlist",JSON.stringify(vm.pushlist));//存储数据方法--将要渲染的数据存入缓存*/
						}else{
							vm.pushlist = [];
						}
					},
				/*	complete:function(){
						vm.load = false;
						mui('#pullrefresh').pullRefresh().enablePullupToRefresh();
					},*/
					error:function(xhr,type,errorThrown){
						console.log(xhr.status);
						console.log(type);
						console.log(JSON.stringify(errorThrown));
					}
				});	
			},
		
	}
})

