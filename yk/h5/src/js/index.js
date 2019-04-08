require(['main'], function() {
	require(['mui'], function(mui) {
		var con=0;
		var page=1;
		var limit=10;
		var list = document.querySelector('.list');
		mui.init({
			pullRefresh: {
				container: refreshContainer, //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
				up: {
					contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
					contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
					callback: pullfresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
				}
			}
		});
		xuan();
		push();
		search();
        function  pullfresh(){
			setTimeout(function(){
				if(con==0){
					mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
				}else{
					mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
				}
				page++;
				xuan();
			},1000)
			
		}
		function xuan() {
			mui.ajax('/api/xuan', {
				data:{
					page:page,
					limit:limit
				},
				dataType: 'json', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				timeout: 10000, //超时时间设置为10秒；
				success: function(data) {
					con=data.data.length;
					console.log(con);
					//list.innerHTML.innerHTML='';
					list.innerHTML += data.data.map(function(item) {
						return `<li>
								<img src="${item.img}" alt="">
								 <h4>${item.uname}</h4>
								 <p><span>${item.nei}</span><span class="te">${item.biao}</span></p>
							</li>`
					}).join('')
				}
			});
		}
		function push(){
			var bu=document.querySelector('.bu');
			mui('.tex').on('tap','.bu',function(){
				location.href='../push.html'
			})
		}
		function search(){
			var ji=document.querySelector('.ji');
			ji.oninput=function(){
				console.log(this.value);
				var val=this.value.trim();
				mui.ajax('/api/found',{
					data:{
						uname:val
					},
					dataType:'json',//服务器返回json格式数据
					type:'post',//HTTP请求类型
					timeout:10000,//超时时间设置为10秒；
					success:function(data){
						console.log(data);
						var cha=document.querySelector('.cha');
						console.log(cha);
						cha.style.display="block";
						cha.innerHTML=data.data.map(function(item){
							return `<li>
							<p>工艺商品:${item.uname}</p>
							<p>价格:${item.price}</p>
							<p>${item.pin}</p>
							<p>${item.fen}</p>
							<p>${item.fu}</p>
							<p>${item.add}</p>
							<p>${item.shu}</p>
							<p>${item.yan}</p>
							<p>${item.bei}</p>
							</li>
							`
						}).join('');
						
					}
				});
			}
		}
	})
})
