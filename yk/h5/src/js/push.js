require(['main'],function(){
	require(['mui'],function(mui){ 
		click();
		function click(){
			var button=document.querySelector('button');
			mui('section').on('tap','button',function(){
				//获取数据
				var fen=document.querySelector('.fen');
				var lis=[...fen.querySelectorAll('input')];
				var fi=document.querySelector('.fi');
				var pr=document.querySelector('.pr');
		       //console.log(fi.value.trim(),lis[0].value.trim())
			mui.ajax('/api/creat',{
				data:{
					uname:fi.value.trim(),
					price:pr.value.trim(),
					pin:lis[0].value.trim(),
					fen:lis[1].value.trim(),
					fu:lis[2].value.trim(),
					add:lis[3].value.trim(),
					shu:lis[4].value.trim(),
					ke:lis[5].value.trim(),
					yan:lis[6].value.trim(),
					bei:lis[7].value.trim()
				},
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型
				timeout:10000,//超时时间设置为10秒；
				success:function(data){
					if(data.code==1){
				      alert("成功")
					  location.href='../index.html'
					}else{
						alert("失败")
					}
				
				}
			});
			})
		}
	})
})