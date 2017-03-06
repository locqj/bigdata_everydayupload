<?php
namespace app\index\controller;
 use \think\View;
 use \think\Db;
 use \think\Session;
 use \think\Controller;
Class Common extends Controller {

    protected $beforeActionList = [
        'initialize',    
    ];
    public function initialize ()
    {
        if(Session::get('username') == null)
        {
		  $this->success('非法登陆', '/login');  
        }
		  
    }

}