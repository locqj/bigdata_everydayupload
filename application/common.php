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
function fuck(){
	 echo 'ok';
}
function recursion($data, $id=0) {
 $list = array();
 foreach($data as $v) {
 if($v['pid'] == $id) {
 $v['son'] = recursion($data, $v['id']);
 if(empty($v['son'])) {
 unset($v['son']);
 }
 array_push($list, $v);
 }
 }
 return $list;
}
/*
 function getTree($data,$pid){
    if (!is_array($data) || empty($data) ) return false;
    $tree = array();
    foreach ($data as $k => $v) {
        if ($v['pid'] == $pid) {　//当相等时，说明此数组为上个数组的子目录
            $v['pid'] = getTree($data,$v['id']);//将子数组的内容遍历后赋给上级数组的pid键，html页面上循环时用到此内容
            $tree[] = $v;
            unset($data[$k]); //删除遍历过的数组数据
        }
    }
    return $tree;
}*/