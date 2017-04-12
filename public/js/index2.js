$(function(){
	   
	// 页面的高度
	var bodyHeight = $(window).height();
	var containHeight = $('#content').height();
	// if(containHeight < bodyHeight){
		$('#content').height(bodyHeight-65);
	// }
	// $('#content .left').height(bodyHeight-70);

	// $('#header .icon-fanhui').click(function(){
	// 	window.location.href = 'http://chogge.565tech.com/userAdmin.html';
	// })

	// 头部的导航的悬浮样式
	$('.nav-item .disactive').hover(function(){
		$(this).css({'color':'#fff',"background-color":"#B5DFFF"});
	},function(){
		$(this).css({'color':'#333','background-color':'#35a7ff'});
	})
	// // 切换头部的导航
	// $('#yibiaopan').click(function(){
	// 	window.location.href = 'http://chogge.565tech.com/index/admin/index.html';
	// })
	// $('#gongzuobiao').click(function(){
	// 	window.location.href = 'http://chogge.565tech.com/index/admin/worksheet.html';
	// })
	// $('#shujuyuan').click(function(){
	// 	window.location.href = 'http://chogge.565tech.com/index/admin/datasource.html';
	// })
	// $('#mubanku').click(function(){
	// 	window.location.href = 'http://chogge.565tech.com/index/admin/module.html';
	// })

	// 退出时，光标悬浮效果
	$('.loginout').hover(function(){
		$(this).css('color','red');
	},function(){
		$(this).css('color','#eee');
	})

	// 仪表盘首页的添加图表
	$('.yibiaopan .icon-jiahao').click(function(){
		$('.tan_addbiao').show();
	})
	$('.tanchuang .icon-cha').click(function(){
		$('.tan_addbiao').hide();
		$('.tan_editbiaoname').hide();
	})
	$('.tanchuang .caozuo input[type=button]').click(function(){
		$('.tan_addbiao').hide();
		$('.tan_editbiaoname').hide();
	})


	// 设置弹窗的高度
	$('.tanchuang').css('height',bodyHeight);
	

	// 仪表盘首页 修改表名
	// $('.biao_edit').click(function(){
	// 	$('.tan_editbiaoname').show();
	// })
})