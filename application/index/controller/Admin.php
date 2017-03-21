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
      $getTheFileName = Db::table('cbd_data_store_filename')->where(['status' => 0,'status_del' => 1])->select(); 
      $this->assign('getTheFileName', $getTheFileName);
      return view();
   }
   public function index_show_filename()
   {
      $showFileName = Db::table('cbd_data_store_filename')->where(['status' => 1,'status_del' => 1])->select();
      echo json_encode($showFileName);
   }
   public function add_charts()
   {
      $getAjaxFileName = input('post.getAjaxFileName');
      Db::table('cbd_data_store_filename')->where('file_name', $getAjaxFileName)->update(['status' => 1]);
      echo 'ok';
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
      $fileName = Db::table('cbd_data_store_filename')->where(['user' => Session::get('username'),'status_del' => 1])->select();
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
   public function worksheet_reset_filename_and_remark()
   {
      $dataFileNewName = input('post.workname');
      $remark = input('post.remark');
      $fileOldName = input('post.fileOldName');
     
      if(!empty($dataFileNewName)){
         $dataS['user'] = Session::get('username');
         $dataS['file_name']  = $fileOldName;
         Db::table('cbd_data_store_filename')->where($dataS)->update([
            'file_name' => $dataFileNewName, 
            'remark' => $remark
            ]);
         Db::table('cbd_datasource_name')->where($dataS)->update([
            'file_name' => $dataFileNewName
            ]);
         Db::table('cbd_datasource')->where($dataS)->update([
            'file_name' => $dataFileNewName
            ]);
         echo $dataFileNewName."/".$fileOldName."/".$dataS['user']."/";

      }else{
         echo '名字不得为空';
      }
   }
   public function delectFile()
   {
      $data['file_name'] = input('post.fileName');
      $data['user'] = Session::get('username');
      DB::table('cbd_data_store_filename')->where($data)->update(['status_del' => 0]);
      echo 'ok';

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