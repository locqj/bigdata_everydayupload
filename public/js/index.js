$(function(){

	var height = $(document.body).height(); //浏览器当前窗口文档的高度
	// 头部的高度是65px，但是不能直接减去'65px'，因为单位不同
	// $('#content').css('height',height-10);
	// 搜索字段
	$('.field-search').focus(function(){
		$('.field .icon-sousuo').animate({
			left:'-40%'
		},10)
	})
	$('.field-search').blur(function(){
		$('.field .icon-sousuo').animate({
			left:'0%'
		})
	})


	// 左侧 添加字段
	$('.icon-jiahao').click(function(){
		$('.add-ziduan').show();
	})
	$('.close').click(function(){
		$('.add-ziduan').hide();
	})
	$('.cancel').click(function(){
		$('.add-ziduan').hide();
	})

	// 搜索 批量添加字段
	$('.alert-search').focus(function(){
		$('.search .icon-sousuo').animate({
			left:'-43%'
		},10)
	})
	$('.alert-search').blur(function(){
		$('.search .icon-sousuo').animate({
			left:'0%'
		})
	})

	// 批量添加字段 弹窗设置
	// 先隐藏
	$('.add-weidu').hide();
	$('.choose-weidu .icon-weibiaoti1').click(function(){
		$('.add-weidu').show();
	})
	$('.close').click(function(){
		$('.add-weidu').hide();
	})

	// 批量添加数值 弹窗设置
	// 先隐藏
	$('.add-num').hide();
	$('.choose-shuzhi .icon-weibiaoti1').click(function(){
		$('.add-num').show();
	})
	$('.close').click(function(){
		$('.add-num').hide();
	})

	// 点击取消
	$('.btns .cancel').click(function(){
		$('.alert').hide();
	})

	// 右边所有的图表，光标放上去时，显示名字
	$('.intro').hide();
	$('.icon-iconfontcolor56').hover(function(){
		$('.intro-line').show();
		$(this).css('color','red');
	},function(){
		$('.intro-line').hide();
		$(this).css('color','#35A7FF');
	})
	$('.icon-62').hover(function(){
		$('.intro-bar').show();
		$(this).css('color','red');
	},function(){
		$('.intro-bar').hide();
		$(this).css('color','#35A7FF');
	})
	$('.icon-sandian').hover(function(){
		$('.intro-scatter').show();
		$(this).css('color','red');
	},function(){
		$('.intro-scatter').hide();
		$(this).css('color','#35A7FF');
	})
	$('.icon-7').hover(function(){
		$('.intro-pie').show();
		$(this).css('color','red');
	},function(){
		$('.intro-pie').hide();
		$(this).css('color','#35A7FF');
	})
	$('.icon-ditu').hover(function(){
		$('.intro-map').show();
		$(this).css('color','red');
	},function(){
		$('.intro-map').hide();
		$(this).css('color','#35A7FF');
	})
	$('.icon-guanxi').hover(function(){
		$('.intro-graph').show();
		$(this).css('color','red');
	},function(){
		$('.intro-graph').hide();
		$(this).css('color','#35A7FF');
	})
	$('.icon-loudoutu').hover(function(){
		$('.intro-funnel').show();
		$(this).css('color','red');
	},function(){
		$('.intro-funnel').hide();
		$(this).css('color','#35A7FF');
	})
	$('.icon-yibiaopan').hover(function(){
		$('.intro-gauge').show();
		$(this).css('color','red');
	},function(){
		$('.intro-gauge').hide();
		$(this).css('color','#35A7FF');
	})
		
})