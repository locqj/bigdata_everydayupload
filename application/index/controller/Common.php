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
		  $this->redirect('/login');
        }
		  
    }
    function p($array){
        dump($array,1,'<pre>',0);
     }

}