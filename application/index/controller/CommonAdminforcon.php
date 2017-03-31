<?php
namespace app\index\controller;
 use \think\View;
 use \think\Db;
 use \think\Session;
 use \think\Controller;
Class CommonAdminforcon extends Common 
{
 
     protected $beforeActionList = [
        'initialize',
         
    ];
    public function initialize ()
    {
           
              if(Session::get('s_managename') == null)
        { 
          $this->redirect('/manage');      
            }
          
    }
   

}