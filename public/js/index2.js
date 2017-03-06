$(function(){
	// 页面的高度
	var bodyHeight = $(window).height();
	var containHeight = $('#content').height();
	// if(containHeight < bodyHeight){
		$('#content').height(bodyHeight-65);
	// }

	$('#header .icon-fanhui').click(function(){
		window.location.href = 'http://chogge.565tech.com/userAdmin.html';
	})

	// 头部的导航的悬浮样式
	$('.nav-item .disactive').hover(function(){
		$(this).css({'color':'#fff',"background-color":"#B5DFFF"});
	},function(){
		$(this).css({'color':'#333','background-color':'#35a7ff'});
	})
	// 切换头部的导航
	$('#yibiaopan').click(function(){
		window.location.href = 'http://chogge.565tech.com/index/admin/index.html';
	})
	$('#gongzuobiao').click(function(){
		window.location.href = 'http://chogge.565tech.com/index/admin/worksheet.html';
	})
	$('#shujuyuan').click(function(){
		window.location.href = 'http://chogge.565tech.com/index/admin/datasource.html';
	})
	$('#mubanku').click(function(){
		window.location.href = 'http://chogge.565tech.com/index/admin/module.html';
	})

	// 退出时，光标悬浮效果
	$('.loginout').hover(function(){
		$(this).css('color','red');
	},function(){
		$(this).css('color','#eee');
	})
	
})