<?php 
    echo 'sdfsd';
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>仪表盘首页</title>
    <script src="https://cdn.static.runoob.com/libs/jquery/1.10.2/jquery.min.js"></script>
    <script type="text/javascript" src="./../../js/index2.js"></script>
    <link rel="stylesheet" type="text/css" href="./../../css/iconfont/iconfont.css">
    <link rel="stylesheet" type="text/css" href="./../../css/index2.css">
    <link rel="stylesheet" type="text/css" href="./../../css/chartdetail.css">
    <link rel="stylesheet" type="text/css" href="./../../css/tanchuang.css">

    <script type="text/javascript" src='./../../js/echarts.min.js'></script>
    <script type="text/javascript" src='http://api.map.baidu.com/api?v=2.0&ak=ZUONbpqGBsYGXNIYHicvbAbM'></script>
    <script type="text/javascript" src='http://gallery.echartsjs.com/dep/echarts/map/js/china.js'></script>
</head>

<body>
    <!-- 头部的导航栏 -->
  {include file="public/admin/nav" /}

    <!-- 具体内容 -->
    <div id="content">
        <!-- 左侧添加仪表盘和样式 -->
        <div id="left">
            <div class="yibiaopan">
                <div class="left">
                    <i class="iconfont icon-work-list"></i>
                    <b>图表</b>
                </div>
                <div class="right">
                    <i class="iconfont icon-sousuo"></i>
                    <i class="iconfont icon-jiahao"></i>
                </div>
                <div class="clear"></div>
            </div>
            <div class="yangshi">
                <ul>
                    <li id="ulli" style="display:none;">
                        <i class="iconfont icon-iconfontyuan"></i>
                        <span style="width: 85%">biaoming</span>
                        <i class='iconfont icon-zhankai' id="test" value="0"></i>
                        <div class='biao_caozuo' style="z-index: 9999; display: none;">
                            <span class='biao_edit'><i class="iconfont icon-bianji"></i>编辑</span>
                            <span class='biao_delete'><i class="iconfont icon-shanchu"></i>删除</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 右边具体显示图表的名字和表 -->
        <div id="showcharts" class="left">
            <div id="chart1">
            </div>
        </div>
    </div>
    <!-- 点击加号，弹出的仪表盘添加的弹框 -->
    <div class="tanchuang tan_addbiao" style="display: none">
        <div class="tanchuang-info">
            <div class="tan-title">
                <span>添加图表</span>
                <i class="iconfont icon-cha"></i>
            </div>
            <div class="sheetinit">
                <div class="chosetype">
                    <span>选择图表类型</span>
                    <input type="checkbox" name="" checked="checked">普通图表
                </div>
                <div class="choseshet">
                    <span>选择工作表</span>
                    <!-- 遍历出所有的工作表,默认选中一个 -->
                    {foreach name="get_the_file_name" id="vo"}
                    <div class="sheet">
                        <input type="radio" name="sheet" value="{$vo.file_name}" checked="checked">
                        <span>{$vo.file_name}</span>
                    </div>
                    {/foreach}
                </div>
                <div class="caozuo">
                    <!-- 点击“确定”，进入到图表的编辑界面 -->
                    <input type="button" value="确定" class="sure">
                    <input type="button" name="" value="取消">
                </div>
            </div>
        </div>
    </div>
    <!-- 点击编辑，弹出修改图表名字 -->
    <div class="tanchuang tan_editbiaoname" style="display:none">
        <div class="tanchuang-info">
            <div class="tan-title">
                <span>修改表名</span>
                <i class="iconfont icon-cha"></i>
            </div>
            <form>
                <div>
                    <span>表&nbsp;&nbsp;&nbsp;&nbsp;名</span>
                    <input type="text" name="workname" id="workname">
                </div>
                <div>
                    <span>备&nbsp;&nbsp;&nbsp;&nbsp;注</span>
                    <input type="text" name="remark" id="remark">
                </div>
                <div class="caozuo">
                    <input type="submit" name="sendworkname" value="确&nbsp;&nbsp;定">
                    <input type="button" value="取&nbsp;&nbsp;消">
                </div>
            </form>
        </div>
    </div>
    <script type="text/javascript">
    $(function() {
        // 获取地址栏
        var str=location.href;
        var s=str.indexOf("="); 
        var t=str.substring(s+1);// t就是=后面的东西了 
        // alert(t);



        //默认设置i第一个值为选中的值
        $('input:radio:first').attr('checked', true);
        //添加图表之后，左侧会多出一行
        $('.caozuo .sure').click(function() {
            //获取被选中的radio的值,新建完图表之后，点击编辑，链接到编辑图表界面
            var biaoming = $('input[name=sheet]:checked').val();

            // var firstli = "<li><span>" + biaoming + "</span><a href='http://chogge.565tech.com/editchart.html'><i class='iconfont icon-weibiaoti1'></i></a></li>";  自行创建元素，失败；使用eq(0)
            var $firstli = $('.yangshi ul li').eq(0);
            var cloneli = $firstli.clone(true);
            $(cloneli).css('display', 'block');
            $(cloneli).children('span').text(biaoming); //cloneli为一个对象，可以直接放在$()里面
            $('.yangshi ul').append(cloneli);

            // $firstli.appendChild(first);

            // var $firstli = $('.yangshi ul li').eq(0);
            $.post("{:url('Admin/indexAddCharts')}", {
                'get_ajax_filename': biaoming
            }, function(data) {
                if (data == 'ok') {

                    // $('.yangshi ul').append($firstli.clone(true));
                }
            });

        });
        $('.yangshi ul li .icon-zhankai').click(function() {

            var i_id = $(this).next('div').css('display');

            if (i_id == 'none') {
                $(this).next('div').css('display', 'block');
            } else {
                $(this).next('div').css('display', 'none');

            }
            $(this).parents('li').siblings().find('.biao_caozuo').hide();

        });
        
        $("#ulli").children('*:not(#test)').click(function() {

            $(".yangshi ul li div").css('display', 'none');
        });


        var option = "{$get}";
        alert(option);
        // var myChart = echarts.init(document.getElementById('chart'));
         // myChart.setOption(option);
    })
    window.onload = function() {
        $.post("{:url('Admin/indexShowFilename')}", {}, function(data) {
            var data = eval("(" + data + ")");
            $.each(data, function(q, val) {
                var $firstli = $('.yangshi ul li').eq(0);
                var cloneli = $firstli.clone(true);
                $(cloneli).css('display', 'block');
                $(cloneli).children('span').text(val.file_name);
                $(cloneli).children('i').attr('id', val.id); //locqj添加
                $(cloneli).children('div').attr('id', val.id); //locqj添加
                //cloneli为一个对象，可以直接放在$()里面 
                $('.yangshi ul').append(cloneli);
            })
        })
    };

    </script>
</body>

</html>
