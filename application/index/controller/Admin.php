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
      $fileName = Db::table('cbd_data_store_filename')->where('user', Session::get('username'))->select();
      $this->assign('fileName', $fileName);
      return view();
   }
   public function worksheet_show_els()
   {
      $getFileName = input('post.filename');
      $fileColumn = Db::table('cbd_datasource_name')->where('file_name', $getFileName)->field('column_name')->select();
        
      $column = array();
      foreach ($fileColumn as $key => $value) {
         $column[$key] = $value['column_name'];
      } 
         
      $data = Db::table('cbd_datasource')->where('file_name', $getFileName)->field($column)->select();
      echo json_encode($data);
         
      
      
      
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
   public function confirmdata()
   {    
        //$dataSoure = Db::table('cbd_datasource')->select();

        $this->view->engine->layout(false);
        //$this->assign('dataSoure', $dataSoure);
        return view();
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