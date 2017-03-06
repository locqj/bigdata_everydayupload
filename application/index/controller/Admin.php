<?php
namespace app\index\controller;
 use \think\View;
 use \think\Db;
  use \think\Session;
 use \think\Controller;
class admin extends Common
{  

   public function index()
   {
      $this->init_load();
      return view();
   }
   public function chartdetail()
   {
       $this->init_load();
       return view();
   }
   public function chartdetail2()
   {
      $this->init_load();
      return view();
   } 
   public function datasource()
   {
      $this->init_load();
      return view();
   }
   
   public  function module()
   {
      $this->init_load();
      return view();
   }
   public function worksheet()
   {
      $this->init_load();
      return view();
   }
   public function out_login()
   {
       Session::delete('username'); 
       $this->redirect('/login');
   }
   public function init_load()
   {
      $username = Session::get('username');
      $this->assign('username', $username);
      
   }
  	// lin添加
   public function getdata()
   { 
      return view();
   }
   public function test()
   {
      return view();
   }



  }