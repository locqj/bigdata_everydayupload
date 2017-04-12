$(document).ready(function() {
    load();
    /*获取编辑表名*/
    $('.yangshi ul li .biao_caozuo .biao_edit').click(function() {
        var bianjiId = $(this).attr('value');
        $("#filenamespan").html(bianjiId);
    });
    /*验证表名是否重复*/
    $('#workname').blur(function() {
        $.post("{:url('UpDownFile/dist_file_name')}", {
                'workname': $('#workname').val()
            },
            function(data) {
                if (data == 'ok') {
                    $('#errorinfo').hide();
                } else {
                    $('#errorinfo').html($('#workname').val() + '名字已重复');
                    $('#workname').val("");
                    $('#workname').focus();
                }
            });
    });
    /*删除事件*/
    $('.biao_delete').click(function(event) {
        $.post("{:url('Admin/delectFile')}", {
                'fileName': $(this).attr('value')
            },
            function(data) {
                if (data == 'ok') {
                    window.location.href = "{:url('/worksheet')}";
                }
            });
    });
    /*提交编辑修改*/
    $('#sendworkname').click(function() {
        $.post("{:url('Admin/worksheet_reset_filename_and_remark')}", {
            'workname': $('#workname').val(),
            'remark': $('#remark').val(),
            'fileOldName': $('#filenamespan').text(),

        }, function(data) {

            if (data == 'success') {
                window.location.href = "{:url('/worksheet')}";
                $("#workname").val('');
                $("#remark").val('');
            } else {
                alert(data);
            }

        });

    });
  

    /*点击箭号，显示隐藏框*/
    $('.yangshi ul li .icon-zhankai').click(function() {

        var i_id = $(this).next('div').css('display');

        if (i_id == 'none') {
            $(this).next('div').css('display', 'block');
        } else {
            $(this).next('div').css('display', 'none');

        }

        $(this).parents('li').siblings().finds('li .biao_caozuo').css('display', 'none');

    });
    /*将所有隐藏框隐藏*/
    $('.yangshi ul li').children('*:not(.test)').click(function() {

        $(".yangshi ul li div").css('display', 'none');
    });
});

function update(v, i) {
    var updateVal = new Array();
    if ($("input." + i + "").attr('disabled') == 'disabled') {
        $("input." + i + "").removeAttr('disabled');
        $("button#" + i + "").text('确认');
        $("button#" + i + "").attr('class', 'btn btn-success');
        $("input." + i + "").parent().parent().attr('class', 'danger');

    } else {
        $("input." + i + "").attr('disabled', 'true');
        $("button#" + i + "").text('修改');
        $("button#" + i + "").attr('class', 'btn btn-primary');
        $("input." + i + "").parent().parent().attr('class', '');
        var inputLength = $("input." + i + "").size() - 1; 
        for (var fuck = 0; fuck <= inputLength; fuck++) {
            var q = $("input." + i + "").eq(fuck).parent().attr('value');
            
            updateVal[fuck]= q+"@"+$("input." + i + "").eq(fuck).val();
        }
           
         
        $.ajax({
            type: 'post', //请求方式，默认get
            url: "{:url('Admin/worksheet_update_els')}",
            /*traditional:true, */
            
            data: {
                updateValue: JSON.stringify(updateVal),
                updateId: v
                 
            },
              success: function(data, status) { 
                 
              },
              error: function(data, statsu) {}
          });


    }


}
function leftliclick(fileId,fileName)
{  
    window["fileId"]=fileId;
    window["fileName"]=fileName;
    $("div.filetitle").html("<h2 contenteditable='false'>"+fileName+"</h2>");
     $.ajax({
            type: 'post', //请求方式，默认get
            url: "{:url('Admin/worksheet_show_els')}",
            data: {
                 
                fileId: fileId
            },
            success: function(data, status) {
                 var data = eval("(" + data + ")");
                var str = '';
                var theadval = '';
               // alert(data);
                $.each(data.tbody, function(i, val) {

                    str = str + '<tr>';
                    $.each(val, function(k, v) {
                        if (k == 'id') {

                            str = str + '<td style="width: 90px"><center><button class="btn btn-primary" id=' + i + ' onclick="update(' + v + ',' + i + ');">修改</button></center></td><td style="width: 90px"><center><button class="btn btn-primary"  onclick="del('+ v +');">删除</button></center></td>';

                        } else {
                            str = str + '<td style="width: 90px" value=' + k + ' class="default"><input disabled="true" class=' + i + ' style="width: 90px" type="text" value=' + v + ' ></input></td>';
                        }

                    });

                    str = str + '</tr>';
                });
                theadval = theadval + '<tr class="info">';
                $.each(data.thead, function(i, val) {
                    theadval = theadval + '<td style="width: 107px" value=' + i + ' >' + val + '</td>';
                });
                theadval = theadval + '</tr>';
                $('#infolist').html(str);
                $('#infohead').html(theadval);

            },
            error: function(data, statsu) {
                alert("发送请求失败！");
            }
        });
}

function del(v)
{
    
    $.post("{:Url('Admin/worksheet_del_els')}", {'dataId':v}, function(data){
        if(data == "success") {
            leftliclick(window['fileId'],window['fileName']);
        }else {
            alert('error');
        }
    })
}
function load()
{
    var loadfirst  = $('.yangshi ul li:eq(0) span').attr('onclick');
    var loadsecond = loadfirst.split(',"');
    var loadsecond_1 = loadsecond[0].split('(');
    var loadsecond_2 = loadsecond[1].split('")'); 
    leftliclick(loadsecond_1[1],loadsecond_2[0]); 
}
function add_data()
{   
    var lastId = $('.charts table tbody tr:last td button').attr('id');
    var buttonElement = '.charts table tbody tr:last td button';
    var tdElement = '.charts table tbody tr:last td';
    var inputElement = '.charts table tr:last td input';
    var addId = parseInt(lastId) + 1;
    $('.charts table tbody tr:eq(0)').clone().appendTo('.charts table tbody:last');
    $(tdElement).attr('class','danger');
    $(buttonElement).attr('id',addId);
    $(inputElement).attr('class',addId);
    $(buttonElement).removeAttr('onclick');
    insert_btn_handle(addId);
    del_btn_handle();
    $('.charts table tbody tr:last td input').removeAttr('disabled').val("");
    $('.charts table tbody tr:last td input:first').focus();
    add_ajax_to_func();

}
function insert_btn_handle(addId)
{   
    var thisElement = '.charts table tbody tr:last td button:first';
    $(thisElement).attr('onclick','insert_val('+ addId +');');
    $(thisElement).text('确认').attr('class', 'btn btn-success');

}
function del_btn_handle()
{   
    var thisElement = '.charts table tbody tr:last td button:last';
    $(thisElement).attr('onclick','remove_val();'); 
    $(thisElement).text('撤销').attr('class','btn btn-success');
}

function insert_val(addId)
{
     var inputLength = $('.danger input.'+ addId +'').size() - 1; 
     var addDataVal = new Array();
      for (var fuck = 0; fuck <= inputLength; fuck++) {
            var q = $('.danger input.'+ addId +'').eq(fuck).parent().attr('value'); 
            addDataVal[fuck]= q+"@"+$('.danger input.'+ addId +'').eq(fuck).val();
        }

           
           
        $.ajax({
            type: 'post', //请求方式，默认get
            url: "{:url('Admin/worksheet_add_data_els')}",
            traditional:true,  
            data: {
                insertValue: JSON.stringify(addDataVal),
                insertFileName: window["fileName"],     
            },
              success: function(data, status) { 
                 leftliclick(window['fileId'],window['fileName']);
              },
              error: function(data, statsu) {
                alert(data);
              }
          });
}
function remove_val()
{   
    leftliclick(window['fileId'],window['fileName']);
}