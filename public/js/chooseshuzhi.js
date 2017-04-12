$(function() {
    // 初始化图表===========================================================
    var myChart = echarts.init(document.getElementById('chart'));

    var height1 = $('.charttype').height();
    // alert(height1);
    // 设置图表标题


    // 默认禁用所有图表
    $('.chart-type i').css('color', 'grey');
    function ifdisabled(option) {
        var weidudata = $('#weidus').html();
        var shuzhidata = $('#shuzhis').html();
        if (weidudata != '' && shuzhidata != '') {
            // 有一位数值的时候就能显示的表
            $('.chart-type i').removeAttr('disabled');
            $('.chart-type .line i').css('color', '#35A7FF');
            $('.chart-type .scatter i').css('color', '#35A7FF');
            $('.chart-type .bar i').css('color', '#35A7FF');
            $('.chart-type .duidie-bar i').css('color', '#35A7FF');
            $('.chart-type .duidie-percent-bar i').css('color', '#35A7FF');
            $('.chart-type .tiao i').css('color', '#35A7FF');
            $('.chart-type .duidie-tiao i').css('color', '#35A7FF');
            $('.chart-type .duidie-percent-tiao i').css('color', '#35A7FF');
            $('.chart-type .area i').css('color', '#35A7FF');
            $('.chart-type .duidie-area i').css('color', '#35A7FF');
            $('.chart-type .duidie-percent-area i').css('color', '#35A7FF');

            if (shuzhival.length == 1) {
                $('.chart-type .pie i').css('color', '#35A7FF');
            }

        } else {
            myChart.clear();
            $('.chart-type i').attr('disabled', 'disabled');
            $('.chart-type i').css('color', 'grey');
            $('.chart-type i').removeClass('clicking');
        }
    }

    // 根据数值的个数，来判断是否禁用表
    function ifjinyongbiao() {
        if (shuzhival.length == 1) {
            // 饼图
            $('.chart-type .pie i').removeAttr('disabled');
            $('.chart-type .pie i').css('color', '#35A7FF');
            // 地图
            $('.chart-type .map i').removeAttr('disabled');
            $('.chart-type .map i').css('color', '#35A7FF');
            // 关系图
            $('.chart-type .graph i').removeAttr('disabled');
            $('.chart-type .graph i').css('color', '#35A7FF');
            // 漏斗图
            $('.chart-type .funnel i').removeAttr('disabled');
            $('.chart-type .funnel i').css('color', '#35A7FF');
            // 仪表盘
            $('.chart-type .gauge i').removeAttr('disabled');
            $('.chart-type .gauge i').css('color', '#35A7FF');
        } else {
            myChart.clear();
            // 饼图
            $('.chart-type .pie i').attr('disabled', 'disabled');
            $('.chart-type .pie i').css('color', 'grey');
            // 地图
            $('.chart-type .map i').attr('disabled', 'disabled');
            $('.chart-type .map i').css('color', 'grey');
            // 关系图
            $('.chart-type .graph i').attr('disabled', 'disabled');
            $('.chart-type .graph i').css('color', 'grey');
            // 漏斗图
            $('.chart-type .funnel i').attr('disabled', 'disabled');
            $('.chart-type .funnel i').css('color', 'grey');
            // 仪表盘
            $('.chart-type .guage i').attr('disabled', 'disabled');
            $('.chart-type .gauge i').css('color', 'grey');
            myChart.clear();
        }
    }


    // 修改图表类型
    // 这样只能使用一次
    // 点击切换成折线
    $('.icon-iconfontcolor56').click(function() {
            // 设置点击的时候
            $(this).parent().siblings().children('.iconfont').removeClass('clicking');
            $(this).addClass('clicking');

            option = option1;
            option.xAxis.type = 'category';
            option.yAxis.type = 'value';
            for (var i = 0; i < option.series.length; i++) {
                option.series[i].type = "line";
            }
            myChart.clear();
            myChart.setOption(option);
            // 判断维度和数值是否为空，如果为空，则不能切换图表

            ifdisabled(option);
            $('.chartsm').hide();

        })
        // 点击切换成柱状图
    $('.icon-62').click(function() {
            $(this).parent().siblings().children('.iconfont').removeClass('clicking');
            $(this).addClass('clicking');
            option = option1;
            option.xAxis.type = 'category';
            option.yAxis.type = 'value';
            for (var i = 0; i < option.series.length; i++) {
                option.series[i].type = "bar";
                option.series[i].stack = '';
                option.series[i].itemStyle.normal.label.position = 'top';
            }
            myChart.clear();
            myChart.setOption(option);
            // 判断维度和数值是否为空，如果为空，则不能切换图表
            ifdisabled(option); 
            $('.chartsm').hide();
        })
    

    //点击切换成  堆叠柱状图
    $('.icon-duidiezhuzhuangtu').click(function(){
        $(this).parent().siblings().children('.iconfont').removeClass('clicking');
        $(this).addClass('clicking');
        option = option1;
        option.xAxis.type = 'category';
        option.yAxis.type = 'value';
        for (var i = 0; i < option.series.length; i++) {
            option.series[i].type = "bar";
            option.series[i].stack = '总量';
            option.series[i].itemStyle.normal.label.position = 'insideTop';
        }
        myChart.clear();
        myChart.setOption(option);
        // 判断维度和数值是否为空，如果为空，则不能切换图表
        ifdisabled(option); 
        $('.chartsm').hide();
    })

        //切换成条形图
    $('.icon-tiaoxingtu').click(function(){
        $(this).parent().siblings().children('.iconfont').removeClass('clicking');
        $(this).addClass('clicking');
        var str1 = $('#weidus').text();
        $.ajax({
                type: 'GET',
                async: false,
                url: './../../data/hello.json',
                dataType: 'json',
                success: function(data) {
                    option = option1;
                    option.xAxis.type = 'value';
                    option.yAxis.type = 'category';
                    for (var i = 0; i < option.series.length; i++) {
                        option.series[i].type = "bar";
                        option.series[i].stack = '';
                        option.series[i].itemStyle.normal.label.position = 'insideRight';
                    }
                    drawline2(str1, shuzhival, option, data);
                    myChart.clear();
                    myChart.setOption(option);
                }
            })
        // 判断维度和数值是否为空，如果为空，则不能切换图表
        ifdisabled(option);
        $('.chartsm').hide();
    })

        // 点击切换成堆叠条形图
    $('.icon-iocnduijitiaoxingtu').click(function(){
        $(this).parent().siblings().children('.iconfont').removeClass('clicking');
        $(this).addClass('clicking');

        var str1 = $('#weidus').text();
        $.ajax({
                type: 'GET',
                async: false,
                url: './../../data/hello.json',
                dataType: 'json',
                success: function(data) {
                    option = option1;
                    option.xAxis.type = 'value';
                    option.yAxis.type = 'category';
                    for (var i = 0; i < option.series.length; i++) {
                        option.series[i].type = "bar";
                        
                        option.series[i].itemStyle.normal.label.position = 'insideRight';
                    }
                    drawline2(str1, shuzhival, option, data);
                    for(var i=0;i<option.series.length;i++){
                        option.series[i].stack = '总数';
                    }
                    myChart.clear();
                    myChart.setOption(option);
                }
            })
        // 判断维度和数值是否为空，如果为空，则不能切换图表
        ifdisabled(option);
        $('.chartsm').hide();
    })

    //点击切换成 面积图
    $('.icon-icon-area-graph').click(function(){
        $(this).parent().siblings().children('.iconfont').removeClass('clicking');
        $(this).addClass('clicking');
        option = option1;
        option.xAxis.type = 'category';
        option.yAxis.type = 'value';
        for (var i = 0; i < option.series.length; i++) {
            option.series[i].type = "line";
            option.series[i].stack = '';
            var areas = [{
                 type: 'default'
            }];
            option.series[i].smooth = true;
            option.series[i].itemStyle.normal['areaStyle'] = areas;
            option.series[i].itemStyle.normal.label.position = 'top';
        }
        myChart.clear();
        myChart.setOption(option);
        // 判断维度和数值是否为空，如果为空，则不能切换图表
        ifdisabled(option); 
        $('.chartsm').hide();
    })

    // 点击切换成 堆叠面积图
    $('.icon-duidiemianjitu').click(function(){
        $(this).parent().siblings().children('.iconfont').removeClass('clicking');
        $(this).addClass('clicking');
        option = option1;
        option.xAxis.type = 'category';
        option.yAxis.type = 'value';
        for (var i = 0; i < option.series.length; i++) {
            option.series[i].type = "line";
            option.series[i].stack = '总量';
            var areas = [{
                 type: 'default'
            }];
            option.series[i].smooth = true;
            option.series[i].itemStyle.normal['areaStyle'] = areas;
            option.series[i].itemStyle.normal.label.position = 'top';
        }
        myChart.clear();
        myChart.setOption(option);
        // 判断维度和数值是否为空，如果为空，则不能切换图表
        ifdisabled(option); 
        $('.chartsm').hide();
    })

        // 点击切换成散点图
    $('.icon-sandian').click(function() {
            $(this).parent().siblings().children('.iconfont').removeClass('clicking');
            $(this).addClass('clicking');
            option = option1;
            option.xAxis.type = 'category';
            option.yAxis.type = 'value';
            for (var i = 0; i < option.series.length; i++) {
                option.series[i].type = "scatter";
            }
            myChart.clear();
            myChart.setOption(option);
            // 判断维度和数值是否为空，如果为空，则不能切换图表
            ifdisabled(option);
            $('.chartsm').hide();

        })
        // 点击切换成饼图
    $('.icon-7').click(function() {
        $(this).parent().siblings().children('.iconfont').removeClass('clicking');
        $(this).addClass('clicking');
        var str1 = $('#weidus').text();
        // 判断:如果选中了维度，数值只选中一个的话，就画出饼图
        if (str1 != '' && shuzhival.length == 1) {

            $('.chart-type .pie i').css('color', '#35A7FF');

            myChart.clear();
            option = option2;
            $.ajax({
                type: 'GET',
                async: false,
                url: './../../data/hello.json',
                dataType: 'json',
                success: function(data) {
                    drawpie(str1, shuzhival, option, data);
                    myChart.setOption(option);
                }
            })
            $('.chartsm').hide();
        } else {
            myChart.clear();
            $('.chart-type .pie i').attr('disabled', 'disabled');
            $('.chart-type .pie i').css('color', 'grey');
            $('.chartsm').html('当前图表类型不支持选中的数据').show();
        }
    })

    // 点击切换成地图
    $('.icon-ditu').click(function() {
            $(this).parent().siblings().children('.iconfont').removeClass('clicking');
            $(this).addClass('clicking');

            var str1 = $('#weidus').text();
            if (str1 != '' && shuzhival.length == 1) {
                $('.chart-type .map i').css('color', '#35A7FF');
                option = option3;
                drawmap(option);
                ifdisabled(option);
                myChart.clear();
                myChart.setOption(option);
            } else {
                myChart.clear();
            }
        })
        // 点击切换成关系图
    $('.icon-guanxi').click(function() {
            $(this).parent().siblings().children('.iconfont').removeClass('clicking');
            $(this).addClass('clicking');

            var str1 = $('#weidus').text();
            if (str1 != '' && shuzhival.length == 1) {
                $('.chart-type .graph i').css('color', '#35A7FF');
                myChart.clear();
                option = option4;
                ifdisabled(option);
                drawgraph();
                myChart.setOption(option);
            } else {
                myChart.clear();
            }
        })
        // 点击切换成漏斗图
    $('.icon-loudoutu').click(function() {
            $(this).parent().siblings().children('.iconfont').removeClass('clicking');
            // alert($(this).attr('class'));
            $(this).addClass('clicking');

            // 判断维度和数值是否为空，如果为空，则不能切换图表

            var str1 = $('#weidus').text();
            if (str1 != '' && shuzhival.length == 1) {
                $('.chart-type .funnel i').css('color', '#35A7FF');
                $.ajax({
                    type: 'GET',
                    async: false,
                    url: './../../data/hello.json',
                    dataType: 'json',
                    success: function(data) {
                        myChart.clear();
                        option = option5;
                        ifdisabled(option);
                        drawfunnel(str1, shuzhival, option, data);
                        myChart.setOption(option);
                    }
                })
            } else {
                myChart.clear();
                $('.chartsm').html('当前图表类型不支持选中的数据').show();
            }
        })
        // 点击切换成仪表盘
    $('.icon-yibiaopan').click(function() {
            $(this).parent().siblings().children('.iconfont').removeClass('clicking');
            $(this).addClass('clicking');
            var str1 = $('#weidus').text();
            if (str1 != '' && shuzhival.length == 1) {
                $('.chart-type .gauge i').css('color', '#35A7FF');

                $.ajax({
                    type: 'GET',
                    async: false,
                    url: './../../data/hello.json',
                    dataType: 'json',
                    success: function(data) {
                        var str1 = $('#weidus').text();
                        myChart.clear();
                        option = option6;
                        ifdisabled(option);
                        drawgauge(str1, shuzhival, option, data);
                        myChart.setOption(option);
                    }
                })
            } else {
                myChart.clear();
            }
        })
        //从ajax中获取数据



    /**
     * 从ajax中获取数据
     * @return {[type]} [description]
     */
    var legendata = []; //图例
    // var series =[];       //每一条线的series
    var seriesname = []; //每一条线的series中的name
    var item = []; //存放所有的series
    var ziduanss = []; //存放所有的字段名字，放在左侧和上侧
    function getlegendata() {
        $.ajax({
            type: 'GET',
            async: false,
            url: './../../data/hello.json',
            dataType: 'json',
            success: function(data) {
                // 循环创建新的item，为每一条数据创建一条线
                for (var i in data[0]) {
                    ziduanss.push(i);
                }
                for (var i = 0; i < ziduanss.length; i++) {

                    //设置option1的图例
                    // legendata[i] = data[i]['legend'];
                }
                for (var i = 0; i < data.length; i++) {
                    // item[i].data = data[i]['data'];
                    // item[i].name = data[i]['legend'];
                }


            },
            complete: function(result) {

            },
            error: function(errorMsg) {
                alert("请求数据失败");
            }
        })
        return item;
    }
    getlegendata();
    // alert(legendata[1]);   //此处能获取到legendata 和 item的内容
    // alert(item[1].data);
    // alert(ziduanss[1]);   //获取到了键名
    // 画线
    function drawline(weidustr, shuzhistr, option, data) {
        option.series = [];
        var xdata = [];
        for (var i = 0; i < data.length; i++) {
            xdata.push(data[i][weidustr]);
        }
        for (var i = 0; i < shuzhistr.length; i++) {
            var flag = shuzhistr[i];
            var ydata = [];
            for (var j = 0; j < data.length; j++) {
                // 将数值的值赋给item
                ydata.push(data[j][flag]);
                // item[i].data = data[i][shuzhistr];
            }
            var series0 = {
                name: '',
                type: "line",
                stack: '',
                symbolSize: 10,
                symbol: 'circle',
                itemStyle: {
                    normal: {
                        color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);},
                        // color: "#35A7FF",
                        barBorderRadius: 0,
                        label: {
                            show: true,
                            position : "top",
                            formatter: function(p) {
                                return p.value > 0 ? (p.value) : '';
                            }
                        },
                        
                    }
                },
                data: ''
            }
            series0.name = shuzhistr[i];
            option.legend.data.push(shuzhistr[i]);
            series0.data = ydata;
            option.series.push(series0);
        }
        // 将维度的值赋给x轴
        option.xAxis.data = xdata;
        // return ydata;
        // alert(option.series[0].data);
        //给折线的图表添加clicking类名

    }
    // 条形图
    function drawline2(weidustr, shuzhistr, option, data) {
        option.series = [];
        var xdata = [];
        for (var i = 0; i < data.length; i++) {
            xdata.push(data[i][weidustr]);
        }
        for (var i = 0; i < shuzhistr.length; i++) {
            var flag = shuzhistr[i];
            var ydata = [];
            for (var j = 0; j < data.length; j++) {
                // 将数值的值赋给item
                ydata.push(data[j][flag]);
                // item[i].data = data[i][shuzhistr];
            }
            var series0 = {
                name: '',
                type: "bar",
                stack: '',
                symbolSize: 10,
                symbol: 'circle',
                itemStyle: {
                    normal: {
                        color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);},
                        // color: "#35A7FF",
                        barBorderRadius: 0,
                        label: {
                            show: true,
                            position : "top",
                            formatter: function(p) {
                                return p.value > 0 ? (p.value) : '';
                            }
                        }
                    }
                },
                data: ''
            }
            series0.name = shuzhistr[i];
            option.legend.data.push(shuzhistr[i]);
            series0.data = ydata;
            option.series.push(series0);
        }
        // 将维度的值赋给x轴
        option.yAxis.data = xdata;

    }
    /**
     *  获取现有图表的类型，通过判断右侧图表谁的class含有active 
     */
    function getlinestyle() {
        var total = $('.chart-type').children('div').length;
        // alert("个数为："+total);
        for (var i = 0; i < total; i++) {
            var ss = $('.chart-type').children().eq(i).children().attr('class');
            if (ss.indexOf('clicking') > 0) {
                // alert(ss);
                return $('.chart-type').children().eq(i).attr('class');
            }
        }
    }
    /**画饼图
     * @return {[type]}      [description]
     *    // { value: 335, name: '准时' },
                // { value: 310, name: '迟到' },
                // { value: 234, name: '请假' },
                // { value: 135, name: '未到' }
     */
    function drawpie(weidustr, shuzhistr, option, data) {
        var shuzhi = shuzhistr.length - 1;
        var shuzhival = shuzhistr[shuzhi];
        var pieinfo = [];
        var lgdata = [];
        for (var i = 0; i < data.length; i++) {
            var pieval = data[i][shuzhival];
            var piename = data[i][weidustr];
            var pie = { "value": pieval, "name": piename };
            option.legend.data.push(piename);
            // lgdata.push(piename);
            pieinfo.push(pie);
        }
        // alert(option.legend.data[0]);
        // alert(pieinfo[0].value);
        // return pieinfo;
        option.series[0].data = pieinfo; //设置series的数据
        // option.legend['data'] = lgdata;

        // option.legend.data = pieinfo.name; //设置图例
    }
    // 画漏斗图
    function drawfunnel(weidustr, shuzhistr, option, data) {
        var shuzhi = shuzhistr.length - 1;
        var shuzhival = shuzhistr[shuzhi];
        var funnelinfo = [];
        for (var i = 0; i < data.length; i++) {
            var funnelval = data[i][shuzhival];
            var funnelname = data[i][weidustr];
            var funnel = { "value": funnelval, "name": funnelname };
            funnelinfo.push(funnel);
            option.legend.data.push(funnelname);
        }
        // alert(pieinfo[0].value);
        // return pieinfo;
        option.series[0].data = funnelinfo; //设置series的数据
    }
    /**
     * 画仪表盘，
     * 由于仪表盘只有一个数据，所以只画出最后一个值的比例
     */
    function drawgauge(weidustr, shuzhistr, option, data) {
        var shuzhi = shuzhistr.length - 1;
        var shuzhival = shuzhistr[shuzhi];
        var length = data.length - 1;
        var gaugeinfo = [];
        // for(var i=0;i<data.length;i++){
        var gaugeval = data[length][shuzhival];
        var gaugename = data[length][weidustr];
        var gauge = { "value": gaugeval, "name": gaugename };
        gaugeinfo.push(gauge);
        // }
        // alert(pieinfo[0].value);
        // return pieinfo;
        option.series[0].data = gaugeinfo; //设置series的数据
    }
    // 画关系图
    function drawgraph() {
        var data = [{
            name: '节点1',
            x: 550,
            y: 100,
            itemStyle: {
                normal: {
                    color: '#f90'
                }
            }
        }, {
            name: '节点2',
            x: 800,
            y: 300,
            itemStyle: {
                normal: {
                    color: '#99CCFF'
                }
            }
        }, {
            name: '节点3',
            x: 550,
            y: 500,
            itemStyle: {
                normal: {
                    color: '#99CCFF'
                }
            }
        }, {
            name: '节点4',
            x: 300,
            y: 300,
            itemStyle: {
                normal: {
                    color: '#99CCFF'
                }
            }
        }, {
            name: '节点5',
            x: 550,
            y: 300,
            itemStyle: {
                normal: {
                    color: '#f90'
                }
            }
        }];
        var links = [{
            source: '节点1',
            target: '节点2',
            lineStyle: {
                normal: {
                    color: '#38f',
                    curveness: 0.2 // 线的弯曲度 0-1之间 越大则歪曲度更大
                }
            },
            label: {
                normal: {
                    textStyle: {
                        color: '#07ac72'
                    }
                }
            }
        }, {
            source: '节点2',
            target: '节点1',
            symbolSize: [4, 20] // 箭头大小
        }, {
            source: '节点2',
            target: '节点3'
        }, {
            source: '节点3',
            target: '节点2'
        }, {
            source: '节点3',
            target: '节点4'
        }, {
            source: '节点4',
            target: '节点3'
        }, {
            source: '节点4',
            target: '节点1'
        }, {
            source: '节点1',
            target: '节点4'
        }, {
            source: '节点1',
            target: '节点5'
        }, {
            source: '节点5',
            target: '节点1'
        }];
        option4.series[0].data = data;
        option4.series[0].links = links;
    }

    // 画地图
    function drawmap(option) {
        // alert(option3.series.length);
        option.series[0].data = allData.citys;
        option.series[1].data = allData.moveLines;
    }


    // 设置option的函数
    function setstyleoption(option,linetype){
        for (var i = 0; i < option.series.length; i++) {
            option.series[i].type = linetype;
        }
        myChart.clear();
        myChart.setOption(option);
    }



    // 将键名赋值给左侧和上面的数值、维度
    for (var i = 0; i < ziduanss.length; i++) {
        $('.field-content ul').append('<li>' + ziduanss[i] + '</li>');
        $('.weidu_xuanxiang').append("<label><input type='checkbox' name='weidu' value='" + ziduanss[i] + "'>" + ziduanss[i] + "</label>");
        $('.shuzhi_xuanxiang').append("<label><input type='checkbox' name='shuzhi' value='" + ziduanss[i] + "'>" + ziduanss[i] + "</label>");
    }

    // 获取维度-===========================================================
    $('#sure-weidu').click(function() {
        $.ajax({
            type: 'GET',
            // url:"{:url('admin/test')}",
            url: "./../../data/hello.json",
            dataType: "json",
            success: function(data) {
                // 调用方法，给那些series赋值
                // setdata(item,data);//改用了getlegendata()方法
                //  获取复选框中的勾选的值
                var arr_weidu = [];
                text = $("input:checkbox[name='weidu']:checked").map(function(index, elem) {
                    arr_weidu.push($(elem).val());
                    return arr_weidu; //勾选的值  == text[0/1/2..]
                });


                // 恢复复选框，让其未选中
                $(".alert input:checkbox").attr("checked", false);
                var str1 = $('#weidus').text();
                var str2 = $('#shuzhis').text();
                // 如果没有选择过该年份，可以选择，否则不可以
                /*                for (var i = 0; i < Math.sqrt(text.length); i++) {
                                    var ss = text[i];
                                    // 如果又选择了该年份，默认什么都不做
                                    if (str1.indexOf(ss) >= 0) {

                                    } else {*/
                $('#weidus').html("<span class='newweidu'>" + text[0] + "</span>");
                // 如果str2不为空，说明已经选择过纬度和数值了，已经有了类型
                if (str2 != '') {
                    option = option1;
                    var linetype = getlinestyle();
                    drawline(text[0], shuzhival, option, data);
                    for (var i = 0; i < option.series.length; i++) {
                        option.series.type = linetype;
                    }
                    myChart.clear();
                    myChart.setOption(option);
                }

            },
            complete: function(result) {
                // 判断是否要禁用图表
                // ifdisabled(option1);
                // 选择数值之后，将复选框的内容情况
                $(".alert input:checkbox").attr("checked", false);

                // $('.icon-start').click(function() {
                //         // alert(option.series.length);
                //     var ss = getlinestyle();
                //     alert(ss);
                // })

                myChart.setOption(option);
            },
            error: function(errorMsg) {
                alert("请求数据失败");
            }
        })
        $('.add-weidu').hide();
        // 
    });
    var shuzhival = [];
    // 获取数值===========================================================
    $('#sure-shuzhi').click(function() {
        $.ajax({
            type: "GET",
            // url:"{:url('admin/test')}",
            url: "./../../data/hello.json",
            dataType: "json",
            success: function(data) {

                // 设置图例选项默认为选中状态
                $('.legend input').attr('checked', 'checked');
                //  获取复选框中的勾选的值
                var arr_shuzhi = []; //该选项代表的第几项
                text = $("input:checkbox[name='shuzhi']:checked").map(function(index, elem) {
                    arr_shuzhi.push($(elem).val());
                    shuzhival.push($(elem).val());
                    return arr_shuzhi;
                });

                $('.yanse1-chose .refresh').show();
                // 初始情况下，设置所有的颜色



                var str1 = $('#weidus').text();
                var str2 = $('#shuzhis').text(); //是选中的值拼接起来的一个
                for (var i = 0; i < Math.sqrt(text.length); i++) {
                    // 获取所有的选项的值，将他们对应的线显示出来
                    var ss = text[i];
                    // 如果又选择了该数值，默认什么都不做
                    // 如果没有选择该数值，判断该条线是否画过
                    if (str2.indexOf(ss) >= 0) {} else {
                        $('#shuzhis').append("<span class='newshuzhi'>" + text[i] + "</span>");


                    }
                };
                var linetype = getlinestyle();
                $('.icon-start').click(function() {
                    var linetype = getlinestyle();
                    // alert(linetype);
                    // alert(data[0][str1]);
                    alert(data[0][str1]);
                })

                // 一旦选择了数值，就判断是否要禁用表
                ifjinyongbiao();

                // 画图表 
                option = option1;
                if (str2 == '') {
                    drawline(str1, shuzhival, option, data);
                    myChart.setOption(option);
                    $('.chart-type .line i').addClass('clicking');
                    //将 当前图表无数据隐藏
                    $('.chartsm').hide();

                } else if (str2 != '') {
                    var linetype = getlinestyle();
                    // 判断画的是什么线
                    if (linetype == 'line' || linetype == 'bar' || linetype == 'scatter') {
                        drawline(str1, shuzhival, option, data);
                        setstyleoption(option,linetype);
                        $('.chartsm').hide();
                    } else if (linetype == 'pie') {
                        if (str1 != '' && shuzhival.length == 1) {
                            option = option2;
                            drawpie(str1, shuzhival, option, data);
                            setstyleoption(option,linetype);
                            $('.chartsm').hide();
                        } else {
                            myChart.clear();
                            $('.chartsm').html('当前图表类型不支持选中的数据').show();
                        }
                    }else if (linetype == 'funnel') {
                        if (str1 != '' && shuzhival.length == 1) {
                            option = option5;
                            drawfunnel(str1, shuzhival, option, data);
                            myChart.setOption(option);
                            $('.chartsm').hide();
                        } else {
                            myChart.clear();
                            $('.chartsm').html('当前图表类型不支持选中的数据').show();
                        }
                    } else if (linetype == 'gauge') {
                        if (str1 != '' && shuzhival.length == 1) {
                            option = option6;
                            drawgauge(str1, shuzhival, option, data);
                             setstyleoption(option,linetype);
                             $('.chartsm').hide();
                        } else {
                            myChart.clear();
                            $('.chartsm').html('当前图表类型不支持选中的数据').show();
                        }
                    } else if (linetype == 'graph') {
                        if (str1 != '' && shuzhival.length == 1) {
                            option = option4;
                            drawgraph();
                             setstyleoption(option,linetype);
                             $('.chartsm').hide();
                        } else {
                            myChart.clear();
                            $('.chartsm').html('当前图表类型不支持选中的数据').show();
                        }
                    } else if (linetype == 'map') {
                        if (str1 != '' && shuzhival.length == 1) {
                            option = option3;
                            drawmap(option3);
                             setstyleoption(option,linetype);
                             $('.chartsm').hide();
                        } else {
                            myChart.clear();
                            $('.chartsm').html('当前图表类型不支持选中的数据').show();
                        }
                    }  else if(linetype == 'tiao'){
                        drawline2(str1, shuzhival, option, data);
                        setstyleoption(option,'bar');
                    } else if(linetype == 'duidie-tiao'){
                        drawline2(str1, shuzhival, option, data);
                        for(var i=0;i<option.series.length;i++){
                            option.series[i].stack = '总数';
                        }
                        setstyleoption(option,'bar');
                    } else if(linetype == 'area'){
                        drawline(str1, shuzhival, option, data);       
                        var areas = [{
                             type: 'default'
                        }];
                        for(var i=0;i<option.series.length;i++){
                            option.series[i].smooth = true;
                            option.series[i].itemStyle.normal['areaStyle'] = areas;
                            option.series[i].itemStyle.normal.label.position = 'top';
                        }
                        setstyleoption(option,'line');
                    } else if(linetype == 'duidie-area'){
                        drawline(str1, shuzhival, option, data);   
                        for(var i=0;i<option.series.length;i++){    
                            var areas = [{
                                 type: 'default'
                            }];
                            option.series[i].smooth = true;
                            option.series[i].itemStyle.normal['areaStyle'] = areas;
                            option.series[i].itemStyle.normal.label.position = 'top';
                            option.series[i].stack = '总量';
                        }
                        setstyleoption(option,'line');
                    }
                }
                // ifdisabled(option);

            },
            complete: function(result) {

                // 获取当前图表的设置 
                // var sts = myChart.getOption();
                // $('.icon-start').click(function(){ 
                //              alert(sts.series[1].type);   
                //          }) 
                // 判断是否要禁用图表
                ifdisabled(option1);
                // 选择数值之后，将复选框的内容情况
                $(".alert input:checkbox").attr("checked", false);
                // // 获取当前图表的设置
                // var str = myChart.getOption();
                // for(var i=0;i<option.series.length;i++){
                //  option.series[i].type = str.series[0].type;
                // }
                // $('.icon-start').click(function(){ 
                //              alert(option.series[0].type);    
                //          })

                // // 获取当前图表的设置
                var str = myChart.getOption();

                // for (var i = 0; i < option.series.length; i++) {
                //     option.series[i].type = str.series[0].type;
                // }
                // 调用方法，给那些series赋值
                // setdata(item,data,option.series[0].type);
                // myChart.setOption(option);


                // 设置图表的标题
                $('.charttitle .add-title').click(function() {
                    var title = $('.charttitle .name').val();
                    option.title.text = title;
                    var chosetitle = $('.charttitle .add-title').prop('checked');
                    if (chosetitle) {
                        option.title.show = true;
                    } else {
                        option.title.show = false;
                    }

                    var titlecolor = $('.charttitle .titlecolor').val();
                    option.title.textStyle.color = titlecolor;
                    var titlesize = $('.charttitle .titlesize').val();
                    option.title.textStyle.fontSize = titlesize;
                    var titleposition = $('.charttitle .titleposition').val();
                    option.title.left = titleposition;

                    myChart.setOption(option);
                })



                // 点击切换图例是否显示
                $('.legend input').click(function() {
                    // var str = option;
                    // alert(str.legend.show);
                    // 点击的时候重新获取当前的option
                    var choselegend = $('.legend input').prop('checked');
                    if (choselegend) {
                        option.legend.show = true;
                    } else {
                        option.legend.show = false;
                    }
                    myChart.setOption(option);
                });

                // 设置工具栏
                $('.showlinenum-edit .showdownload').click(function() {
                    // 点击的时候重新获取当前的option
                    var choseimg = $('.showlinenum-edit .showdownload').prop('checked');
                    if (choseimg) {
                        option.toolbox.feature.saveAsImage.show = true;
                    } else {
                        option.toolbox.feature.saveAsImage.show = false;
                    }
                    myChart.setOption(option);
                })
                $('.showlinenum-edit .showzoom').click(function() {
                    var chosezoom = $('.showlinenum-edit .showzoom').prop('checked');
                    if (chosezoom) {
                        option.toolbox.feature.dataZoom.show = true;
                    } else {
                        option.toolbox.feature.dataZoom.show = false;
                    }
                    myChart.setOption(option);
                })
                $('.showlinenum-edit .showdataresource').click(function() {
                    var chosedata = $('.showlinenum-edit .showdataresource').prop('checked');
                    if (chosedata) {
                        option.toolbox.feature.dataView.show = true;
                    } else {
                        option.toolbox.feature.dataView.show = false;
                    }
                    myChart.setOption(option);
                })
            },
            error: function(errorMsg) {
                alert("请求数据失败");
            }
        })
        $('.add-num').hide();
    });

    // myChart.showLoading();  //图表加载动画


    // 选项===============================================================
    var option = {}

    // 设置不同表单的不同基本设置
    // 折线图、柱状图、散点图
    var option1 = {
            title: {
                show: false,
                textStyle: {
                    color: '#333',
                    fontSize: 18
                },
                left: 'auto'
            },
            backgroundColor: "#eee",
            tooltip: {
                "trigger": "axis",
                "axisPointer": {
                    "type": "shadow",
                    textStyle: {
                        color: "#fff"
                    }
                },
            },
            grid:{
                show:true,
                // x: '20%', y: '7%', width: '50%', height: '50%'
            },
            toolbox: {
                "feature": {
                    saveAsImage: {
                        show: false
                    },
                    dataZoom: {
                        show: false
                    },
                    dataView: {
                        show: false
                    }
                },

            },
            legend: {
                show: true,
                 // orient: 'orient',
                x: 'left',
                textStyle: {
                    // color: '#90979c',
                    color: '#333'
                },
                data: []
            },
            xAxis: {
                "show": true,
                "type": "category",
                "axisLine": {
                    lineStyle: {
                        // color: '#90979c'
                        color: '#333'
                    }
                },
                "splitLine": {
                    "show": false
                },
                "axisTick": {
                    "show": false
                },
                "axisLabel": {
                    "interval": 0,
                    "rotate": 60,
                    "show":true
                },
                "data": [],
            },
            yAxis:{
                "show": true,
                "type": "value",         
                "axisLine": {
                    lineStyle: {
                        // color: '#90979c'
                        color: '#333'
                    }
                },
                "splitLine": {
                    "show": false
                },
                "axisTick": {
                    "show": false
                },
                "axisLabel": {
                    "interval": 0,
                    "show":true
                },
                "data":[]
            },
            grid: {
                // x: 40,
                // x2: 20,
                // y2: 100,
            },
            series: []
        }
        // 饼图
    var option2 = {
        title: {
            // text: "签到比例分析"
        },
        toolbox: {
            feature: {
                saveAsImage: {
                        show: false
                    },
                    dataZoom: {
                        show: false
                    },
                    dataView: {
                        show: false
                    }
            }
        },
        legend: {
            show: true,
            data: []
        },
        series: [{
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            data: '',
            label: {
                normal: {
                    textStyle: {
                        fontSize: 14
                    },
                    formatter: function(param) {
                        return param.name + ':' + param.value;
                    }
                }
            }
        }]
    }

    var allData = {
        "citys": [{ "name": "延寿", "value": [128.331644, 45.451897, 2], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "临江", "value": [126.918087, 41.811979, 2], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "嘉兴", "value": [120.755486, 30.746129, 4], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "四平", "value": [124.350398, 43.16642, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "营口", "value": [122.235418, 40.667012, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "密云", "value": [116.801346, 40.35874, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "威海", "value": [122.12042, 37.513068, 32], "symbolSize": 3, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "杭州", "value": [120.15507, 30.274085, 10], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "集安", "value": [126.194031, 41.125307, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "贵阳", "value": [106.630154, 26.647661, 2], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "抚顺", "value": [123.957208, 41.880872, 3], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "海门", "value": [121.181615, 31.871173, 2], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "珠海", "value": [113.576726, 22.270715, 9], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "河北", "value": [114.475704, 38.584854, -19], "symbolSize": 2, "itemStyle": { "normal": { "color": "#58B3CC" } } }, { "name": "深圳", "value": [114.057868, 22.543099, 14], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "黄浦", "value": [121.484443, 31.231763, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "蓬莱", "value": [120.758848, 37.810661, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "吉林", "value": [126.549572, 43.837883, -364], "symbolSize": 14, "itemStyle": { "normal": { "color": "#58B3CC" } } }, { "name": "甘肃", "value": [103.826308, 36.059421, -2], "symbolSize": 2, "itemStyle": { "normal": { "color": "#58B3CC" } } }, { "name": "龙井", "value": [129.427066, 42.766311, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "茂名", "value": [110.925456, 21.662999, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "丹东", "value": [124.354707, 40.0005, 2], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "晋中", "value": [112.752695, 37.687024, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "浙江", "value": [120.152792, 30.267447, -2], "symbolSize": 2, "itemStyle": { "normal": { "color": "#58B3CC" } } }, { "name": "海城", "value": [122.685217, 40.882377, 2], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "溆浦", "value": [110.594921, 27.908281, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "北京", "value": [116.407526, 39.90403, -14], "symbolSize": 2, "itemStyle": { "normal": { "color": "#58B3CC" } } }, { "name": "铁岭", "value": [123.726166, 42.223769, 2], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "大同", "value": [113.61244, 40.040295, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "金坛", "value": [119.597897, 31.723247, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "齐齐哈尔", "value": [126.661669, 45.742347, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "咸阳", "value": [108.708991, 34.329605, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "四川", "value": [104.075931, 30.651652, -5], "symbolSize": 2, "itemStyle": { "normal": { "color": "#58B3CC" } } }, { "name": "福田", "value": [114.055036, 22.52153, 2], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "盘锦", "value": [122.070714, 41.119997, 3], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "中山", "value": [113.392782, 22.517646, 4], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "福建", "value": [119.295144, 26.10078, -1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#58B3CC" } } }, { "name": "泰顺", "value": [119.717649, 27.556884, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "宝山", "value": [131.401589, 46.577167, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "庆安", "value": [127.507825, 46.880102, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "海淀", "value": [116.298056, 39.959912, 32], "symbolSize": 3, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "大兴", "value": [116.341395, 39.726929, 3], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "桦川", "value": [130.719081, 47.023001, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "惠州", "value": [114.416196, 23.111847, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "青岛", "value": [120.38264, 36.067082, 52], "symbolSize": 3, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "朝阳", "value": [116.443108, 39.92147, 17], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "沈阳", "value": [123.431475, 41.805698, 41], "symbolSize": 3, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "菏泽", "value": [115.480656, 35.23375, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "南通", "value": [120.894291, 31.980172, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "南充", "value": [106.110698, 30.837793, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "双城", "value": [126.312745, 45.383263, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "南京", "value": [118.796877, 32.060255, 17], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "新疆", "value": [87.627704, 43.793026, -2], "symbolSize": 2, "itemStyle": { "normal": { "color": "#58B3CC" } } }, { "name": "成都", "value": [104.066541, 30.572269, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "陕西", "value": [108.954239, 34.265472, -2], "symbolSize": 2, "itemStyle": { "normal": { "color": "#58B3CC" } } }, { "name": "黄岛", "value": [120.04619, 35.872664, 2], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "温州", "value": [120.699367, 27.994267, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "石家庄", "value": [114.51486, 38.042307, 4], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "邢台", "value": [114.504844, 37.070589, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "赣州", "value": [114.93503, 25.831829, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "义乌", "value": [120.075058, 29.306841, 3], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "南昌", "value": [115.858198, 28.682892, 2], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "闵行", "value": [121.381709, 31.112813, 18], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } },
            { "name": "长宁", "value": [121.424624, 31.220367, 7], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "道里", "value": [126.616957, 45.755777, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "乳山", "value": [121.539765, 36.919816, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "双流", "value": [103.923648, 30.574473, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "广州", "value": [113.264435, 23.129163, 13], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "西城", "value": [116.365868, 39.912289, 4], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "佳木斯", "value": [130.318917, 46.799923, 2], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "皇姑", "value": [123.44197, 41.824796, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "榆树", "value": [126.533146, 44.840288, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "临汾", "value": [111.518976, 36.088005, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "上海", "value": [121.473701, 31.230416, 44], "symbolSize": 3, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "内蒙古", "value": [111.765618, 40.817498, -23], "symbolSize": 2, "itemStyle": { "normal": { "color": "#58B3CC" } } }, { "name": "尚志", "value": [128.009895, 45.209586, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "湖里", "value": [118.146769, 24.512905, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "台州", "value": [121.420757, 28.656386, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "潍坊", "value": [119.161756, 36.706774, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "苏州", "value": [120.585316, 31.298886, 14], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "房山", "value": [116.143267, 39.749144, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "即墨", "value": [120.447128, 36.389639, 15], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "舒兰", "value": [126.965607, 44.406106, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "延吉", "value": [129.508946, 42.891255, 3], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "三河", "value": [117.078295, 39.982718, 4], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "大连", "value": [121.614682, 38.914003, 40], "symbolSize": 3, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "辉南", "value": [126.046912, 42.684993, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "无锡", "value": [120.31191, 31.49117, 14], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "常州", "value": [119.973987, 31.810689, 4], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "广西", "value": [108.327546, 22.815478, -1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#58B3CC" } } }, { "name": "泉州", "value": [118.675676, 24.874132, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "昌平", "value": [116.231204, 40.22066, 4], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "海阳", "value": [121.158434, 36.776378, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "郑州", "value": [113.625368, 34.7466, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "东城", "value": [116.416357, 39.928353, 10], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "黄骅", "value": [117.330048, 38.371383, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "武侯", "value": [104.04339, 30.641982, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "鸡东", "value": [131.12408, 45.260412, 2], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "龙口", "value": [120.477813, 37.646108, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "汤原", "value": [129.905072, 46.730706, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "湖北", "value": [114.341862, 30.546498, -4], "symbolSize": 2, "itemStyle": { "normal": { "color": "#58B3CC" } } }, { "name": "克拉玛依", "value": [84.889207, 45.579889, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "厦门", "value": [118.089425, 24.479834, 3], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "哈尔滨", "value": [126.534967, 45.803775, 8], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "秦皇岛", "value": [119.600493, 39.935385, 7], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "江苏", "value": [118.763232, 32.061707, -1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#58B3CC" } } }, { "name": "常熟", "value": [120.752481, 31.654376, 4], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "烟台", "value": [121.447935, 37.463822, 24], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "和平", "value": [117.21451, 39.116949, 4], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "环翠", "value": [122.123444, 37.501991, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "宣武门外东大街", "value": [116.378888, 39.899332, 3], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "张家港", "value": [120.553284, 31.870367, 4], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "临安", "value": [119.724733, 30.233873, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "延安", "value": [109.489727, 36.585455, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "天津", "value": [117.200983, 39.084158, 28], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "城阳", "value": [120.39631, 36.307064, 15], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "石景山", "value": [116.222982, 39.906611, 3], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "长沙", "value": [112.938814, 28.228209, 5], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "安徽", "value": [117.284923, 31.861184, -1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#58B3CC" } } }, { "name": "昆山", "value": [120.980737, 31.385598, 4], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "徐汇", "value": [121.436525, 31.188523, 2], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "东港", "value": [124.152705, 39.863008, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "廊坊", "value": [116.683752, 39.538047, 4], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "鞍山", "value": [122.994329, 41.108647, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "海陵", "value": [119.919425, 32.491016, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "黑龙江", "value": [126.661669, 45.742347, -198], "symbolSize": 8, "itemStyle": { "normal": { "color": "#58B3CC" } } }, { "name": "西藏", "value": [91.117212, 29.646923, -1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#58B3CC" } } }, { "name": "河南", "value": [113.274379, 34.445122, 0], "symbolSize": 2, "itemStyle": { "normal": { "color": "#58B3CC" } } }, { "name": "湖南", "value": [112.98381, 28.112444, -1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#58B3CC" } } }, { "name": "佛山", "value": [113.121416, 23.021548, 2], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "珲春", "value": [130.366036, 42.862821, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "扬州", "value": [119.412966, 32.39421, 5], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "日照", "value": [119.526888, 35.416377, 2], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "唐山", "value": [118.180194, 39.630867, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "同江", "value": [132.510919, 47.642707, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "荣成", "value": [122.486658, 37.16516, 4], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "虎林", "value": [132.93721, 45.762686, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "武汉", "value": [114.305393, 30.593099, 2], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "合肥", "value": [117.227239, 31.820587, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "荆州", "value": [112.239741, 30.335165, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "丰台", "value": [116.287149, 39.858427, 3], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "山东", "value": [117.020359, 36.66853, -6], "symbolSize": 2, "itemStyle": { "normal": { "color": "#58B3CC" } } }, { "name": "舟山", "value": [122.207216, 29.985295, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "连云港", "value": [119.221611, 34.596653, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "西安", "value": [108.940175, 34.341568, 3], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "济南", "value": [117.12, 36.651216, 4], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "绵阳", "value": [104.679114, 31.46745, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } },
            { "name": "辽宁", "value": [123.42944, 41.835441, -58], "symbolSize": 3, "itemStyle": { "normal": { "color": "#58B3CC" } } }, { "name": "山西", "value": [112.562398, 37.873532, -3], "symbolSize": 2, "itemStyle": { "normal": { "color": "#58B3CC" } } }, { "name": "呼和浩特", "value": [111.749181, 40.842585, 2], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "河西", "value": [117.223372, 39.109563, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "兴和", "value": [113.834173, 40.872301, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "重庆", "value": [106.551557, 29.56301, 2], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "胶州", "value": [120.033382, 36.26468, 5], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "宁波", "value": [121.550357, 29.874557, 10], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "滨海", "value": [119.820831, 33.990334, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "太原", "value": [112.548879, 37.87059, 2], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "鸡西", "value": [130.969333, 45.295075, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "兰山", "value": [118.347707, 35.051729, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "阳泉", "value": [113.580519, 37.856972, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "勃利", "value": [130.592171, 45.755063, 1], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }, { "name": "长春", "value": [125.323544, 43.817072, 8], "symbolSize": 2, "itemStyle": { "normal": { "color": "#F58158" } } }
        ],
        "moveLines": [{
            "fromName": "黑龙江",
            "toName": "珠海",
            "coords": [
                [126.661669, 45.742347],
                [113.576726, 22.270715]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "舒兰",
            "coords": [
                [126.661669, 45.742347],
                [126.965607, 44.406106]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "大连",
            "coords": [
                [126.661669, 45.742347],
                [121.614682, 38.914003]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "集安",
            "coords": [
                [123.42944, 41.835441],
                [126.194031, 41.125307]
            ]
        }, {
            "fromName": "吉林",
            "toName": "抚顺",
            "coords": [
                [126.549572, 43.837883],
                [123.957208, 41.880872]
            ]
        }, {
            "fromName": "山东",
            "toName": "南京",
            "coords": [
                [117.020359, 36.66853],
                [118.796877, 32.060255]
            ]
        }, {
            "fromName": "北京",
            "toName": "沈阳",
            "coords": [
                [116.407526, 39.90403],
                [123.431475, 41.805698]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "环翠",
            "coords": [
                [126.661669, 45.742347],
                [122.123444, 37.501991]
            ]
        }, {
            "fromName": "天津",
            "toName": "大连",
            "coords": [
                [117.200983, 39.084158],
                [121.614682, 38.914003]
            ]
        }, {
            "fromName": "吉林",
            "toName": "兴和",
            "coords": [
                [126.549572, 43.837883],
                [113.834173, 40.872301]
            ]
        }, {
            "fromName": "河北",
            "toName": "勃利",
            "coords": [
                [114.475704, 38.584854],
                [130.592171, 45.755063]
            ]
        }, {
            "fromName": "吉林",
            "toName": "大连",
            "coords": [
                [126.549572, 43.837883],
                [121.614682, 38.914003]
            ]
        }, {
            "fromName": "吉林",
            "toName": "沈阳",
            "coords": [
                [126.549572, 43.837883],
                [123.431475, 41.805698]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "闵行",
            "coords": [
                [126.661669, 45.742347],
                [121.381709, 31.112813]
            ]
        }, {
            "fromName": "天津",
            "toName": "朝阳",
            "coords": [
                [117.200983, 39.084158],
                [116.443108, 39.92147]
            ]
        }, {
            "fromName": "吉林",
            "toName": "黄岛",
            "coords": [
                [126.549572, 43.837883],
                [120.04619, 35.872664]
            ]
        }, {
            "fromName": "内蒙古",
            "toName": "上海",
            "coords": [
                [111.765618, 40.817498],
                [121.473701, 31.230416]
            ]
        }, {
            "fromName": "内蒙古",
            "toName": "南京",
            "coords": [
                [111.765618, 40.817498],
                [118.796877, 32.060255]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "杭州",
            "coords": [
                [123.42944, 41.835441],
                [120.15507, 30.274085]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "海城",
            "coords": [
                [126.661669, 45.742347],
                [122.685217, 40.882377]
            ]
        }, {
            "fromName": "吉林",
            "toName": "西城",
            "coords": [
                [126.549572, 43.837883],
                [116.365868, 39.912289]
            ]
        }, {
            "fromName": "四川",
            "toName": "上海",
            "coords": [
                [104.075931, 30.651652],
                [121.473701, 31.230416]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "西城",
            "coords": [
                [126.661669, 45.742347],
                [116.365868, 39.912289]
            ]
        }, {
            "fromName": "吉林",
            "toName": "丹东",
            "coords": [
                [126.549572, 43.837883],
                [124.354707, 40.0005]
            ]
        }, {
            "fromName": "吉林",
            "toName": "宁波",
            "coords": [
                [126.549572, 43.837883],
                [121.550357, 29.874557]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "海淀",
            "coords": [
                [123.42944, 41.835441],
                [116.298056, 39.959912]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "青岛",
            "coords": [
                [123.42944, 41.835441],
                [120.38264, 36.067082]
            ]
        }, {
            "fromName": "吉林",
            "toName": "苏州",
            "coords": [
                [126.549572, 43.837883],
                [120.585316, 31.298886]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "抚顺",
            "coords": [
                [126.661669, 45.742347],
                [123.957208, 41.880872]
            ]
        }, {
            "fromName": "吉林",
            "toName": "临安",
            "coords": [
                [126.549572, 43.837883],
                [119.724733, 30.233873]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "烟台",
            "coords": [
                [123.42944, 41.835441],
                [121.447935, 37.463822]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "海淀",
            "coords": [
                [126.661669, 45.742347],
                [116.298056, 39.959912]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "南昌",
            "coords": [
                [126.661669, 45.742347],
                [115.858198, 28.682892]
            ]
        }, {
            "fromName": "内蒙古",
            "toName": "沈阳",
            "coords": [
                [111.765618, 40.817498],
                [123.431475, 41.805698]
            ]
        }, {
            "fromName": "山西",
            "toName": "城阳",
            "coords": [
                [112.562398, 37.873532],
                [120.39631, 36.307064]
            ]
        }, {
            "fromName": "吉林",
            "toName": "广州",
            "coords": [
                [126.549572, 43.837883],
                [113.264435, 23.129163]
            ]
        }, {
            "fromName": "上海",
            "toName": "沈阳",
            "coords": [
                [121.473701, 31.230416],
                [123.431475, 41.805698]
            ]
        }, {
            "fromName": "四川",
            "toName": "阳泉",
            "coords": [
                [104.075931, 30.651652],
                [113.580519, 37.856972]
            ]
        }, {
            "fromName": "河北",
            "toName": "桦川",
            "coords": [
                [114.475704, 38.584854],
                [130.719081, 47.023001]
            ]
        }, {
            "fromName": "内蒙古",
            "toName": "海淀",
            "coords": [
                [111.765618, 40.817498],
                [116.298056, 39.959912]
            ]
        }, {
            "fromName": "安徽",
            "toName": "河北",
            "coords": [
                [117.284923, 31.861184],
                [114.475704, 38.584854]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "呼和浩特",
            "coords": [
                [123.42944, 41.835441],
                [111.749181, 40.842585]
            ]
        }, {
            "fromName": "广西",
            "toName": "茂名",
            "coords": [
                [108.327546, 22.815478],
                [110.925456, 21.662999]
            ]
        }, {
            "fromName": "吉林",
            "toName": "东城",
            "coords": [
                [126.549572, 43.837883],
                [116.416357, 39.928353]
            ]
        }, {
            "fromName": "内蒙古",
            "toName": "盘锦",
            "coords": [
                [111.765618, 40.817498],
                [122.070714, 41.119997]
            ]
        }, {
            "fromName": "山东",
            "toName": "哈尔滨",
            "coords": [
                [117.020359, 36.66853],
                [126.534967, 45.803775]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "沈阳",
            "coords": [
                [126.661669, 45.742347],
                [123.431475, 41.805698]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "丰台",
            "coords": [
                [126.661669, 45.742347],
                [116.287149, 39.858427]
            ]
        }, {
            "fromName": "四川",
            "toName": "盘锦",
            "coords": [
                [104.075931, 30.651652],
                [122.070714, 41.119997]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "皇姑",
            "coords": [
                [126.661669, 45.742347],
                [123.44197, 41.824796]
            ]
        }, {
            "fromName": "河北",
            "toName": "虎林",
            "coords": [
                [114.475704, 38.584854],
                [132.93721, 45.762686]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "宝山",
            "coords": [
                [123.42944, 41.835441],
                [131.401589, 46.577167]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "吉林",
            "coords": [
                [126.661669, 45.742347],
                [126.549572, 43.837883]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "青岛",
            "coords": [
                [126.661669, 45.742347],
                [120.38264, 36.067082]
            ]
        }, {
            "fromName": "吉林",
            "toName": "烟台",
            "coords": [
                [126.549572, 43.837883],
                [121.447935, 37.463822]
            ]
        }, {
            "fromName": "山东",
            "toName": "临江",
            "coords": [
                [117.020359, 36.66853],
                [126.918087, 41.811979]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "黄岛",
            "coords": [
                [126.661669, 45.742347],
                [120.04619, 35.872664]
            ]
        }, {
            "fromName": "吉林",
            "toName": "石家庄",
            "coords": [
                [126.549572, 43.837883],
                [114.51486, 38.042307]
            ]
        }, {
            "fromName": "吉林",
            "toName": "汤原",
            "coords": [
                [126.549572, 43.837883],
                [129.905072, 46.730706]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "临江",
            "coords": [
                [126.661669, 45.742347],
                [126.918087, 41.811979]
            ]
        }, {
            "fromName": "吉林",
            "toName": "济南",
            "coords": [
                [126.549572, 43.837883],
                [117.12, 36.651216]
            ]
        }, {
            "fromName": "吉林",
            "toName": "太原",
            "coords": [
                [126.549572, 43.837883],
                [112.548879, 37.87059]
            ]
        }, {
            "fromName": "吉林",
            "toName": "威海",
            "coords": [
                [126.549572, 43.837883],
                [122.12042, 37.513068]
            ]
        }, {
            "fromName": "湖北",
            "toName": "深圳",
            "coords": [
                [114.341862, 30.546498],
                [114.057868, 22.543099]
            ]
        }, {
            "fromName": "内蒙古",
            "toName": "荣成",
            "coords": [
                [111.765618, 40.817498],
                [122.486658, 37.16516]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "郑州",
            "coords": [
                [123.42944, 41.835441],
                [113.625368, 34.7466]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "朝阳",
            "coords": [
                [126.661669, 45.742347],
                [116.443108, 39.92147]
            ]
        }, {
            "fromName": "吉林",
            "toName": "昆山",
            "coords": [
                [126.549572, 43.837883],
                [120.980737, 31.385598]
            ]
        }, {
            "fromName": "吉林",
            "toName": "双城",
            "coords": [
                [126.549572, 43.837883],
                [126.312745, 45.383263]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "克拉玛依",
            "coords": [
                [126.661669, 45.742347],
                [84.889207, 45.579889]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "上海",
            "coords": [
                [123.42944, 41.835441],
                [121.473701, 31.230416]
            ]
        }, {
            "fromName": "吉林",
            "toName": "海阳",
            "coords": [
                [126.549572, 43.837883],
                [121.158434, 36.776378]
            ]
        }, {
            "fromName": "吉林",
            "toName": "宣武门外东大街",
            "coords": [
                [126.549572, 43.837883],
                [116.378888, 39.899332]
            ]
        }, {
            "fromName": "山东",
            "toName": "海淀",
            "coords": [
                [117.020359, 36.66853],
                [116.298056, 39.959912]
            ]
        }, {
            "fromName": "内蒙古",
            "toName": "威海",
            "coords": [
                [111.765618, 40.817498],
                [122.12042, 37.513068]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "晋中",
            "coords": [
                [126.661669, 45.742347],
                [112.752695, 37.687024]
            ]
        }, {
            "fromName": "西藏",
            "toName": "广州",
            "coords": [
                [91.117212, 29.646923],
                [113.264435, 23.129163]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "无锡",
            "coords": [
                [123.42944, 41.835441],
                [120.31191, 31.49117]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "城阳",
            "coords": [
                [126.661669, 45.742347],
                [120.39631, 36.307064]
            ]
        }, {
            "fromName": "河北",
            "toName": "丰台",
            "coords": [
                [114.475704, 38.584854],
                [116.287149, 39.858427]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "扬州",
            "coords": [
                [126.661669, 45.742347],
                [119.412966, 32.39421]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "天津",
            "coords": [
                [123.42944, 41.835441],
                [117.200983, 39.084158]
            ]
        }, {
            "fromName": "吉林",
            "toName": "扬州",
            "coords": [
                [126.549572, 43.837883],
                [119.412966, 32.39421]
            ]
        }, {
            "fromName": "吉林",
            "toName": "嘉兴",
            "coords": [
                [126.549572, 43.837883],
                [120.755486, 30.746129]
            ]
        }, {
            "fromName": "河北",
            "toName": "延寿",
            "coords": [
                [114.475704, 38.584854],
                [128.331644, 45.451897]
            ]
        }, {
            "fromName": "吉林",
            "toName": "义乌",
            "coords": [
                [126.549572, 43.837883],
                [120.075058, 29.306841]
            ]
        }, {
            "fromName": "吉林",
            "toName": "张家港",
            "coords": [
                [126.549572, 43.837883],
                [120.553284, 31.870367]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "贵阳",
            "coords": [
                [123.42944, 41.835441],
                [106.630154, 26.647661]
            ]
        }, {
            "fromName": "吉林",
            "toName": "辽宁",
            "coords": [
                [126.549572, 43.837883],
                [123.42944, 41.835441]
            ]
        }, {
            "fromName": "河南",
            "toName": "营口",
            "coords": [
                [113.274379, 34.445122],
                [122.235418, 40.667012]
            ]
        }, {
            "fromName": "吉林",
            "toName": "合肥",
            "coords": [
                [126.549572, 43.837883],
                [117.227239, 31.820587]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "苏州",
            "coords": [
                [126.661669, 45.742347],
                [120.585316, 31.298886]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "榆树",
            "coords": [
                [126.661669, 45.742347],
                [126.533146, 44.840288]
            ]
        }, {
            "fromName": "吉林",
            "toName": "常熟",
            "coords": [
                [126.549572, 43.837883],
                [120.752481, 31.654376]
            ]
        }, {
            "fromName": "吉林",
            "toName": "乳山",
            "coords": [
                [126.549572, 43.837883],
                [121.539765, 36.919816]
            ]
        }, {
            "fromName": "四川",
            "toName": "青岛",
            "coords": [
                [104.075931, 30.651652],
                [120.38264, 36.067082]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "深圳",
            "coords": [
                [126.661669, 45.742347],
                [114.057868, 22.543099]
            ]
        }, {
            "fromName": "天津",
            "toName": "东城",
            "coords": [
                [117.200983, 39.084158],
                [116.416357, 39.928353]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "上海",
            "coords": [
                [126.661669, 45.742347],
                [121.473701, 31.230416]
            ]
        }, {
            "fromName": "天津",
            "toName": "宁波",
            "coords": [
                [117.200983, 39.084158],
                [121.550357, 29.874557]
            ]
        }, {
            "fromName": "吉林",
            "toName": "海门",
            "coords": [
                [126.549572, 43.837883],
                [121.181615, 31.871173]
            ]
        }, {
            "fromName": "山西",
            "toName": "沈阳",
            "coords": [
                [112.562398, 37.873532],
                [123.431475, 41.805698]
            ]
        }, {
            "fromName": "吉林",
            "toName": "成都",
            "coords": [
                [126.549572, 43.837883],
                [104.066541, 30.572269]
            ]
        }, {
            "fromName": "吉林",
            "toName": "南昌",
            "coords": [
                [126.549572, 43.837883],
                [115.858198, 28.682892]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "常州",
            "coords": [
                [126.661669, 45.742347],
                [119.973987, 31.810689]
            ]
        }, {
            "fromName": "内蒙古",
            "toName": "兰山",
            "coords": [
                [111.765618, 40.817498],
                [118.347707, 35.051729]
            ]
        }, {
            "fromName": "吉林",
            "toName": "河南",
            "coords": [
                [126.549572, 43.837883],
                [113.274379, 34.445122]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "福田",
            "coords": [
                [126.661669, 45.742347],
                [114.055036, 22.52153]
            ]
        }, {
            "fromName": "吉林",
            "toName": "常州",
            "coords": [
                [126.549572, 43.837883],
                [119.973987, 31.810689]
            ]
        }, {
            "fromName": "吉林",
            "toName": "双流",
            "coords": [
                [126.549572, 43.837883],
                [103.923648, 30.574473]
            ]
        }, {
            "fromName": "吉林",
            "toName": "潍坊",
            "coords": [
                [126.549572, 43.837883],
                [119.161756, 36.706774]
            ]
        }, {
            "fromName": "吉林",
            "toName": "延安",
            "coords": [
                [126.549572, 43.837883],
                [109.489727, 36.585455]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "长春",
            "coords": [
                [123.42944, 41.835441],
                [125.323544, 43.817072]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "南京",
            "coords": [
                [126.661669, 45.742347],
                [118.796877, 32.060255]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "和平",
            "coords": [
                [123.42944, 41.835441],
                [117.21451, 39.116949]
            ]
        }, {
            "fromName": "北京",
            "toName": "哈尔滨",
            "coords": [
                [116.407526, 39.90403],
                [126.534967, 45.803775]
            ]
        }, {
            "fromName": "吉林",
            "toName": "武汉",
            "coords": [
                [126.549572, 43.837883],
                [114.305393, 30.593099]
            ]
        }, {
            "fromName": "吉林",
            "toName": "海陵",
            "coords": [
                [126.549572, 43.837883],
                [119.919425, 32.491016]
            ]
        }, {
            "fromName": "吉林",
            "toName": "日照",
            "coords": [
                [126.549572, 43.837883],
                [119.526888, 35.416377]
            ]
        }, {
            "fromName": "吉林",
            "toName": "台州",
            "coords": [
                [126.549572, 43.837883],
                [121.420757, 28.656386]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "厦门",
            "coords": [
                [123.42944, 41.835441],
                [118.089425, 24.479834]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "贵阳",
            "coords": [
                [126.661669, 45.742347],
                [106.630154, 26.647661]
            ]
        }, {
            "fromName": "吉林",
            "toName": "鞍山",
            "coords": [
                [126.549572, 43.837883],
                [122.994329, 41.108647]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "荣成",
            "coords": [
                [123.42944, 41.835441],
                [122.486658, 37.16516]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "天津",
            "coords": [
                [126.661669, 45.742347],
                [117.200983, 39.084158]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "河西",
            "coords": [
                [126.661669, 45.742347],
                [117.223372, 39.109563]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "秦皇岛",
            "coords": [
                [126.661669, 45.742347],
                [119.600493, 39.935385]
            ]
        }, {
            "fromName": "吉林",
            "toName": "荆州",
            "coords": [
                [126.549572, 43.837883],
                [112.239741, 30.335165]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "东城",
            "coords": [
                [126.661669, 45.742347],
                [116.416357, 39.928353]
            ]
        }, {
            "fromName": "吉林",
            "toName": "即墨",
            "coords": [
                [126.549572, 43.837883],
                [120.447128, 36.389639]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "西城",
            "coords": [
                [123.42944, 41.835441],
                [116.365868, 39.912289]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "大兴",
            "coords": [
                [126.661669, 45.742347],
                [116.341395, 39.726929]
            ]
        }, {
            "fromName": "河北",
            "toName": "哈尔滨",
            "coords": [
                [114.475704, 38.584854],
                [126.534967, 45.803775]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "江苏",
            "coords": [
                [126.661669, 45.742347],
                [118.763232, 32.061707]
            ]
        }, {
            "fromName": "吉林",
            "toName": "和平",
            "coords": [
                [126.549572, 43.837883],
                [117.21451, 39.116949]
            ]
        }, {
            "fromName": "江苏",
            "toName": "鸡东",
            "coords": [
                [118.763232, 32.061707],
                [131.12408, 45.260412]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "辉南",
            "coords": [
                [123.42944, 41.835441],
                [126.046912, 42.684993]
            ]
        }, {
            "fromName": "吉林",
            "toName": "深圳",
            "coords": [
                [126.549572, 43.837883],
                [114.057868, 22.543099]
            ]
        }, {
            "fromName": "福建",
            "toName": "泰顺",
            "coords": [
                [119.295144, 26.10078],
                [119.717649, 27.556884]
            ]
        }, {
            "fromName": "上海",
            "toName": "深圳",
            "coords": [
                [121.473701, 31.230416],
                [114.057868, 22.543099]
            ]
        }, {
            "fromName": "吉林",
            "toName": "秦皇岛",
            "coords": [
                [126.549572, 43.837883],
                [119.600493, 39.935385]
            ]
        }, {
            "fromName": "吉林",
            "toName": "徐汇",
            "coords": [
                [126.549572, 43.837883],
                [121.436525, 31.188523]
            ]
        }, {
            "fromName": "吉林",
            "toName": "石景山",
            "coords": [
                [126.549572, 43.837883],
                [116.222982, 39.906611]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "城阳",
            "coords": [
                [123.42944, 41.835441],
                [120.39631, 36.307064]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "威海",
            "coords": [
                [126.661669, 45.742347],
                [122.12042, 37.513068]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "惠州",
            "coords": [
                [126.661669, 45.742347],
                [114.416196, 23.111847]
            ]
        }, {
            "fromName": "吉林",
            "toName": "龙口",
            "coords": [
                [126.549572, 43.837883],
                [120.477813, 37.646108]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "四平",
            "coords": [
                [126.661669, 45.742347],
                [124.350398, 43.16642]
            ]
        }, {
            "fromName": "吉林",
            "toName": "南充",
            "coords": [
                [126.549572, 43.837883],
                [106.110698, 30.837793]
            ]
        }, {
            "fromName": "河北",
            "toName": "东港",
            "coords": [
                [114.475704, 38.584854],
                [124.152705, 39.863008]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "西安",
            "coords": [
                [123.42944, 41.835441],
                [108.940175, 34.341568]
            ]
        }, {
            "fromName": "内蒙古",
            "toName": "滨海",
            "coords": [
                [111.765618, 40.817498],
                [119.820831, 33.990334]
            ]
        }, {
            "fromName": "河南",
            "toName": "青岛",
            "coords": [
                [113.274379, 34.445122],
                [120.38264, 36.067082]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "昆山",
            "coords": [
                [126.661669, 45.742347],
                [120.980737, 31.385598]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "长沙",
            "coords": [
                [123.42944, 41.835441],
                [112.938814, 28.228209]
            ]
        }, {
            "fromName": "吉林",
            "toName": "哈尔滨",
            "coords": [
                [126.549572, 43.837883],
                [126.534967, 45.803775]
            ]
        }, {
            "fromName": "河北",
            "toName": "尚志",
            "coords": [
                [114.475704, 38.584854],
                [128.009895, 45.209586]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "东城",
            "coords": [
                [123.42944, 41.835441],
                [116.416357, 39.928353]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "珠海",
            "coords": [
                [123.42944, 41.835441],
                [113.576726, 22.270715]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "铁岭",
            "coords": [
                [126.661669, 45.742347],
                [123.726166, 42.223769]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "蓬莱",
            "coords": [
                [126.661669, 45.742347],
                [120.758848, 37.810661]
            ]
        }, {
            "fromName": "北京",
            "toName": "天津",
            "coords": [
                [116.407526, 39.90403],
                [117.200983, 39.084158]
            ]
        }, {
            "fromName": "内蒙古",
            "toName": "天津",
            "coords": [
                [111.765618, 40.817498],
                [117.200983, 39.084158]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "宁波",
            "coords": [
                [126.661669, 45.742347],
                [121.550357, 29.874557]
            ]
        }, {
            "fromName": "吉林",
            "toName": "上海",
            "coords": [
                [126.549572, 43.837883],
                [121.473701, 31.230416]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "佛山",
            "coords": [
                [123.42944, 41.835441],
                [113.121416, 23.021548]
            ]
        }, {
            "fromName": "吉林",
            "toName": "长宁",
            "coords": [
                [126.549572, 43.837883],
                [121.424624, 31.220367]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "珲春",
            "coords": [
                [126.661669, 45.742347],
                [130.366036, 42.862821]
            ]
        }, {
            "fromName": "山东",
            "toName": "黄浦",
            "coords": [
                [117.020359, 36.66853],
                [121.484443, 31.231763]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "威海",
            "coords": [
                [123.42944, 41.835441],
                [122.12042, 37.513068]
            ]
        }, {
            "fromName": "天津",
            "toName": "长春",
            "coords": [
                [117.200983, 39.084158],
                [125.323544, 43.817072]
            ]
        }, {
            "fromName": "新疆",
            "toName": "上海",
            "coords": [
                [87.627704, 43.793026],
                [121.473701, 31.230416]
            ]
        }, {
            "fromName": "河北",
            "toName": "鸡西",
            "coords": [
                [114.475704, 38.584854],
                [130.969333, 45.295075]
            ]
        }, {
            "fromName": "陕西",
            "toName": "呼和浩特",
            "coords": [
                [108.954239, 34.265472],
                [111.749181, 40.842585]
            ]
        }, {
            "fromName": "吉林",
            "toName": "连云港",
            "coords": [
                [126.549572, 43.837883],
                [119.221611, 34.596653]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "杭州",
            "coords": [
                [126.661669, 45.742347],
                [120.15507, 30.274085]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "嘉兴",
            "coords": [
                [126.661669, 45.742347],
                [120.755486, 30.746129]
            ]
        }, {
            "fromName": "陕西",
            "toName": "盘锦",
            "coords": [
                [108.954239, 34.265472],
                [122.070714, 41.119997]
            ]
        }, {
            "fromName": "河北",
            "toName": "同江",
            "coords": [
                [114.475704, 38.584854],
                [132.510919, 47.642707]
            ]
        }, {
            "fromName": "吉林",
            "toName": "杭州",
            "coords": [
                [126.549572, 43.837883],
                [120.15507, 30.274085]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "舟山",
            "coords": [
                [126.661669, 45.742347],
                [122.207216, 29.985295]
            ]
        }, {
            "fromName": "河南",
            "toName": "大连",
            "coords": [
                [113.274379, 34.445122],
                [121.614682, 38.914003]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "绵阳",
            "coords": [
                [123.42944, 41.835441],
                [104.679114, 31.46745]
            ]
        }, {
            "fromName": "吉林",
            "toName": "溆浦",
            "coords": [
                [126.549572, 43.837883],
                [110.594921, 27.908281]
            ]
        }, {
            "fromName": "吉林",
            "toName": "朝阳",
            "coords": [
                [126.549572, 43.837883],
                [116.443108, 39.92147]
            ]
        }, {
            "fromName": "吉林",
            "toName": "无锡",
            "coords": [
                [126.549572, 43.837883],
                [120.31191, 31.49117]
            ]
        }, {
            "fromName": "浙江",
            "toName": "沈阳",
            "coords": [
                [120.152792, 30.267447],
                [123.431475, 41.805698]
            ]
        }, {
            "fromName": "吉林",
            "toName": "湖里",
            "coords": [
                [126.549572, 43.837883],
                [118.146769, 24.512905]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "无锡",
            "coords": [
                [126.661669, 45.742347],
                [120.31191, 31.49117]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "长宁",
            "coords": [
                [126.661669, 45.742347],
                [121.424624, 31.220367]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "胶州",
            "coords": [
                [123.42944, 41.835441],
                [120.033382, 36.26468]
            ]
        }, {
            "fromName": "吉林",
            "toName": "青岛",
            "coords": [
                [126.549572, 43.837883],
                [120.38264, 36.067082]
            ]
        }, {
            "fromName": "河北",
            "toName": "海淀",
            "coords": [
                [114.475704, 38.584854],
                [116.298056, 39.959912]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "厦门",
            "coords": [
                [126.661669, 45.742347],
                [118.089425, 24.479834]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "中山",
            "coords": [
                [126.661669, 45.742347],
                [113.392782, 22.517646]
            ]
        }, {
            "fromName": "河北",
            "toName": "太原",
            "coords": [
                [114.475704, 38.584854],
                [112.548879, 37.87059]
            ]
        }, {
            "fromName": "新疆",
            "toName": "吉林",
            "coords": [
                [87.627704, 43.793026],
                [126.549572, 43.837883]
            ]
        }, {
            "fromName": "吉林",
            "toName": "武侯",
            "coords": [
                [126.549572, 43.837883],
                [104.04339, 30.641982]
            ]
        }, {
            "fromName": "北京",
            "toName": "廊坊",
            "coords": [
                [116.407526, 39.90403],
                [116.683752, 39.538047]
            ]
        }, {
            "fromName": "浙江",
            "toName": "临汾",
            "coords": [
                [120.152792, 30.267447],
                [111.518976, 36.088005]
            ]
        }, {
            "fromName": "湖北",
            "toName": "天津",
            "coords": [
                [114.341862, 30.546498],
                [117.200983, 39.084158]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "泉州",
            "coords": [
                [126.661669, 45.742347],
                [118.675676, 24.874132]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "温州",
            "coords": [
                [126.661669, 45.742347],
                [120.699367, 27.994267]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "唐山",
            "coords": [
                [126.661669, 45.742347],
                [118.180194, 39.630867]
            ]
        }, {
            "fromName": "北京",
            "toName": "铁岭",
            "coords": [
                [116.407526, 39.90403],
                [123.726166, 42.223769]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "即墨",
            "coords": [
                [123.42944, 41.835441],
                [120.447128, 36.389639]
            ]
        }, {
            "fromName": "北京",
            "toName": "上海",
            "coords": [
                [116.407526, 39.90403],
                [121.473701, 31.230416]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "广州",
            "coords": [
                [126.661669, 45.742347],
                [113.264435, 23.129163]
            ]
        }, {
            "fromName": "吉林",
            "toName": "廊坊",
            "coords": [
                [126.549572, 43.837883],
                [116.683752, 39.538047]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "荣成",
            "coords": [
                [126.661669, 45.742347],
                [122.486658, 37.16516]
            ]
        }, {
            "fromName": "吉林",
            "toName": "海城",
            "coords": [
                [126.549572, 43.837883],
                [122.685217, 40.882377]
            ]
        }, {
            "fromName": "湖南",
            "toName": "沈阳",
            "coords": [
                [112.98381, 28.112444],
                [123.431475, 41.805698]
            ]
        }, {
            "fromName": "北京",
            "toName": "青岛",
            "coords": [
                [116.407526, 39.90403],
                [120.38264, 36.067082]
            ]
        }, {
            "fromName": "河北",
            "toName": "大连",
            "coords": [
                [114.475704, 38.584854],
                [121.614682, 38.914003]
            ]
        }, {
            "fromName": "内蒙古",
            "toName": "珠海",
            "coords": [
                [111.765618, 40.817498],
                [113.576726, 22.270715]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "房山",
            "coords": [
                [126.661669, 45.742347],
                [116.143267, 39.749144]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "金坛",
            "coords": [
                [126.661669, 45.742347],
                [119.597897, 31.723247]
            ]
        }, {
            "fromName": "河北",
            "toName": "齐齐哈尔",
            "coords": [
                [114.475704, 38.584854],
                [126.661669, 45.742347]
            ]
        }, {
            "fromName": "吉林",
            "toName": "大兴",
            "coords": [
                [126.549572, 43.837883],
                [116.341395, 39.726929]
            ]
        }, {
            "fromName": "吉林",
            "toName": "密云",
            "coords": [
                [126.549572, 43.837883],
                [116.801346, 40.35874]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "和平",
            "coords": [
                [126.661669, 45.742347],
                [117.21451, 39.116949]
            ]
        }, {
            "fromName": "内蒙古",
            "toName": "龙井",
            "coords": [
                [111.765618, 40.817498],
                [129.427066, 42.766311]
            ]
        }, {
            "fromName": "吉林",
            "toName": "道里",
            "coords": [
                [126.549572, 43.837883],
                [126.616957, 45.755777]
            ]
        }, {
            "fromName": "山东",
            "toName": "武汉",
            "coords": [
                [117.020359, 36.66853],
                [114.305393, 30.593099]
            ]
        }, {
            "fromName": "甘肃",
            "toName": "常熟",
            "coords": [
                [103.826308, 36.059421],
                [120.752481, 31.654376]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "烟台",
            "coords": [
                [126.661669, 45.742347],
                [121.447935, 37.463822]
            ]
        }, {
            "fromName": "吉林",
            "toName": "海淀",
            "coords": [
                [126.549572, 43.837883],
                [116.298056, 39.959912]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "长沙",
            "coords": [
                [126.661669, 45.742347],
                [112.938814, 28.228209]
            ]
        }, {
            "fromName": "天津",
            "toName": "石家庄",
            "coords": [
                [117.200983, 39.084158],
                [114.51486, 38.042307]
            ]
        }, {
            "fromName": "吉林",
            "toName": "佛山",
            "coords": [
                [126.549572, 43.837883],
                [113.121416, 23.021548]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "黄骅",
            "coords": [
                [123.42944, 41.835441],
                [117.330048, 38.371383]
            ]
        }, {
            "fromName": "内蒙古",
            "toName": "中山",
            "coords": [
                [111.765618, 40.817498],
                [113.392782, 22.517646]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "北京",
            "coords": [
                [126.661669, 45.742347],
                [116.407526, 39.90403]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "三河",
            "coords": [
                [126.661669, 45.742347],
                [117.078295, 39.982718]
            ]
        }, {
            "fromName": "河北",
            "toName": "庆安",
            "coords": [
                [114.475704, 38.584854],
                [127.507825, 46.880102]
            ]
        }, {
            "fromName": "吉林",
            "toName": "长沙",
            "coords": [
                [126.549572, 43.837883],
                [112.938814, 28.228209]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "西安",
            "coords": [
                [126.661669, 45.742347],
                [108.940175, 34.341568]
            ]
        }, {
            "fromName": "内蒙古",
            "toName": "朝阳",
            "coords": [
                [111.765618, 40.817498],
                [116.443108, 39.92147]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "丰台",
            "coords": [
                [123.42944, 41.835441],
                [116.287149, 39.858427]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "延吉",
            "coords": [
                [126.661669, 45.742347],
                [129.508946, 42.891255]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "长春",
            "coords": [
                [126.661669, 45.742347],
                [125.323544, 43.817072]
            ]
        }, {
            "fromName": "吉林",
            "toName": "天津",
            "coords": [
                [126.549572, 43.837883],
                [117.200983, 39.084158]
            ]
        }, {
            "fromName": "吉林",
            "toName": "昌平",
            "coords": [
                [126.549572, 43.837883],
                [116.231204, 40.22066]
            ]
        }, {
            "fromName": "吉林",
            "toName": "赣州",
            "coords": [
                [126.549572, 43.837883],
                [114.93503, 25.831829]
            ]
        }, {
            "fromName": "吉林",
            "toName": "厦门",
            "coords": [
                [126.549572, 43.837883],
                [118.089425, 24.479834]
            ]
        }, {
            "fromName": "内蒙古",
            "toName": "秦皇岛",
            "coords": [
                [111.765618, 40.817498],
                [119.600493, 39.935385]
            ]
        }, {
            "fromName": "内蒙古",
            "toName": "菏泽",
            "coords": [
                [111.765618, 40.817498],
                [115.480656, 35.23375]
            ]
        }, {
            "fromName": "吉林",
            "toName": "闵行",
            "coords": [
                [126.549572, 43.837883],
                [121.381709, 31.112813]
            ]
        }, {
            "fromName": "辽宁",
            "toName": "石景山",
            "coords": [
                [123.42944, 41.835441],
                [116.222982, 39.906611]
            ]
        }, {
            "fromName": "吉林",
            "toName": "珠海",
            "coords": [
                [126.549572, 43.837883],
                [113.576726, 22.270715]
            ]
        }, {
            "fromName": "内蒙古",
            "toName": "青岛",
            "coords": [
                [111.765618, 40.817498],
                [120.38264, 36.067082]
            ]
        }, {
            "fromName": "北京",
            "toName": "海门",
            "coords": [
                [116.407526, 39.90403],
                [121.181615, 31.871173]
            ]
        }, {
            "fromName": "内蒙古",
            "toName": "长春",
            "coords": [
                [111.765618, 40.817498],
                [125.323544, 43.817072]
            ]
        }, {
            "fromName": "吉林",
            "toName": "城阳",
            "coords": [
                [126.549572, 43.837883],
                [120.39631, 36.307064]
            ]
        }, {
            "fromName": "吉林",
            "toName": "大同",
            "coords": [
                [126.549572, 43.837883],
                [113.61244, 40.040295]
            ]
        }, {
            "fromName": "湖北",
            "toName": "邢台",
            "coords": [
                [114.341862, 30.546498],
                [114.504844, 37.070589]
            ]
        }, {
            "fromName": "吉林",
            "toName": "胶州",
            "coords": [
                [126.549572, 43.837883],
                [120.033382, 36.26468]
            ]
        }, {
            "fromName": "吉林",
            "toName": "重庆",
            "coords": [
                [126.549572, 43.837883],
                [106.551557, 29.56301]
            ]
        }, {
            "fromName": "河北",
            "toName": "佳木斯",
            "coords": [
                [114.475704, 38.584854],
                [130.318917, 46.799923]
            ]
        }, {
            "fromName": "甘肃",
            "toName": "大连",
            "coords": [
                [103.826308, 36.059421],
                [121.614682, 38.914003]
            ]
        }, {
            "fromName": "吉林",
            "toName": "南京",
            "coords": [
                [126.549572, 43.837883],
                [118.796877, 32.060255]
            ]
        }, {
            "fromName": "内蒙古",
            "toName": "日照",
            "coords": [
                [111.765618, 40.817498],
                [119.526888, 35.416377]
            ]
        }, {
            "fromName": "吉林",
            "toName": "鸡东",
            "coords": [
                [126.549572, 43.837883],
                [131.12408, 45.260412]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "即墨",
            "coords": [
                [126.661669, 45.742347],
                [120.447128, 36.389639]
            ]
        }, {
            "fromName": "江苏",
            "toName": "朝阳",
            "coords": [
                [118.763232, 32.061707],
                [116.443108, 39.92147]
            ]
        }, {
            "fromName": "吉林",
            "toName": "南通",
            "coords": [
                [126.549572, 43.837883],
                [120.894291, 31.980172]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "张家港",
            "coords": [
                [126.661669, 45.742347],
                [120.553284, 31.870367]
            ]
        }, {
            "fromName": "吉林",
            "toName": "三河",
            "coords": [
                [126.549572, 43.837883],
                [117.078295, 39.982718]
            ]
        }, {
            "fromName": "吉林",
            "toName": "咸阳",
            "coords": [
                [126.549572, 43.837883],
                [108.708991, 34.329605]
            ]
        }, {
            "fromName": "吉林",
            "toName": "中山",
            "coords": [
                [126.549572, 43.837883],
                [113.392782, 22.517646]
            ]
        }, {
            "fromName": "黑龙江",
            "toName": "胶州",
            "coords": [
                [126.661669, 45.742347],
                [120.033382, 36.26468]
            ]
        }]
    };
    // 地图
    var option3 = {
        backgroundColor: '#404a59',
        title: {
            text: '朴姓人口迁徙图',
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        legend: {
            show: false,
            orient: 'vertical',
            top: 'bottom',
            left: 'right',
            data: ['地点', '线路'],
            textStyle: {
                color: '#fff'
            }
        },
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#323c48',
                    borderColor: '#404a59'
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            }
        },
        series: [{
            name: '地点',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
                brushType: 'stroke'
            },
            label: {
                emphasis: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                }
            },
            symbolSize: 2,
            showEffectOn: 'render',
            itemStyle: {
                normal: {
                    color: '#46bee9'
                }
            },
            // data: allData.citys
            data: ''
        }, {
            name: '线路',
            type: 'lines',
            coordinateSystem: 'geo',
            zlevel: 2,
            large: true,
            effect: {
                show: true,
                constantSpeed: 30,
                symbol: 'pin',
                symbolSize: 3,
                trailLength: 0,
            },
            lineStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#58B3CC'
                    }, {
                        offset: 1,
                        color: '#F58158'
                    }], false),
                    width: 1,
                    opacity: 0.2,
                    curveness: 0.1
                }
            },
            // data: allData.moveLines
            data: ''
        }]
    };
    // 关系图
    var option4 = {
        title: {},
        toolbox: {
            feature: {
               saveAsImage: {
                        show: false
                    }
            }
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [{

            type: 'graph',
            layout: 'none',
            symbolSize: 50,
            roam: false, //禁止用鼠标滚轮缩小放大效果
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            // color:['#f90','#99CCFF','#99CCFF','#99CCFF','#99CCFF'],
            // 连接线上的文字
            edgeLabel: {
                normal: {
                    show: true,
                    textStyle: {
                        fontSize: 20
                    }
                }
            },
            lineStyle: {
                normal: {
                    opacity: 1,
                    width: 2,
                    curveness: 0.1
                }
            },
            // 圆圈内的文字
            label: {
                normal: {
                    show: true
                }
            },
            data: '',
            // links: [],
            links: ''
        }]
    };
    // 漏斗图
    var option5 = {
        // title: {
        //     text: '漏斗图',
        //     subtext: '纯属虚构'
        // },
        // color: ['#91C7AE', '#D48265', '#C23531', '#2F4554', '#61A0A8'],
        tooltip: {
            trigger: 'item',
            formatter: "{b}:{c}",
        },
        toolbox: {
            feature: {
                // dataView: { readOnly: false },
                // restore: {},
                saveAsImage: {
                        show: false
                    },
                    dataZoom: {
                        show: false
                    },
                    dataView: {
                        show: false
                    }
            }
        },
        legend: {
            show: true,
            x:'left',
            data: []
        },
        calculable: true,
        series: [{
            // name: '漏斗图',
            type: 'funnel',
            left: '10%',
            top: 60,
            //x2: 80,
            bottom: 60,
            width: '80%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                },
                emphasis: {
                    textStyle: {
                        fontSize: 20
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    },

                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#fff',
                    borderWidth: 1,

                }
            },
            data: [
                { value: 100, name: '展现' },
                { value: 80, name: '点击' },
                { value: 60, name: '访问' },
                { value: 40, name: '咨询' },
                { value: 20, name: '订单' },
            ]
        }]
    };

    // 仪表盘
    var option6 = {
        title: {},
        tooltip: {
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
            feature: {
                saveAsImage: {
                        show: false
                    },
                    dataZoom: {
                        show: false
                    },
                    dataView: {
                        show: false
                    }
            }
        },
        series: [{
            name: '业务指标',
            type: 'gauge',
            detail: { formatter: '{value}%' },
            data: ''
        }]
    };


//     // var charts = echarts.init(document.getElementById('chart1'));
// //点击保存之后， 获取当前表的设置
// $('.getsetting').click(function(){
//     var myoption = myChart.getOption();
//     alert(myoption.series.length);
//     // charts.setOption(myoption);
// })
// // charts.setOption(myoption);

//  $('.return i').click(function() {
//     var myoption = myChart.getOption();
//     alert(myoption.series.length);
//     window.location.href = "http://cqj.iperson.cn/userAdmin.html?option="+myoption;

// })

$('.getsetting').click(function(){
    alert($('#chart').html());

})



})
