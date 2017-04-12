<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

return [
    '__pattern__' => [
        'name' => '\w+',
    ],
    '[hello]'     => [
        ':id'   => ['index/hello', ['method' => 'get'], ['id' => '\d+']],
        ':name' => ['index/hello', ['method' => 'post']],
    ],
       'aboutme' => 'index/index/aboutme', //关于页面
       'login' => 'index/index/loginreg',//登陆页面
       'register' => 'index/index/register',//注册页面
       'demo' => 'index/index/demo',//demo页面
       'manage' => 'index/index/loginreg_for_manage', //后台登陆
       'manageindex' => 'index/adminforcon/index', //后台首页
       'userout' => 'index/adminforcon/userout', //后台userout
       'userIn' => 'index/adminforcon/userIn', //后台userIn
       'rolemanage' => 'index/adminforcon/rolemanage', //后台rolemanage
       'adminmanage' => 'index/adminforcon/adminmanage',//后台adminmanage
       'userAdmin' => 'index/admin/index',//用户首页
       'worksheet' => 'index/admin/worksheet',//工作表   
       'module' => 'index/admin/module', //模板库
       'datasource' => 'index/admin/datasource', //数据源
       'confirmdata' => 'index/admin/confirmdata',//确认els数据
       'confirm' => 'index/UpDownFile/confirm_els',//提交els数据
       'editchart' => 'index/admin/chartdetail2',//编辑图标
       'changepassword' => 'index/index/forget_pwd_send_yanma', //修改密码验证
       'change' => 'index/index/reset_pawd' //修改密码
       

];
