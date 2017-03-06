<?php
namespace app\index\controller;
 use \think\View;
 use \think\Db;
 use \think\Session;
 use \think\Controller;
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用公共文件
 function SidType($parent_code){
    
   $list=Db::table('cbd_module')->where('parent_code',$parent_code)->
   select();
   //$list='asd';
    return $parent_code;
}
}
 