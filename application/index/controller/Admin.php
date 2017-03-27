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
      $getTheFileName = Db::table('cbd_data_store_filename')->where([
         'user' => Session::get('username'),
         'status' => 0, 
         'status_del' => 1
         ])->select(); 
      $this->assign('getTheFileName', $getTheFileName);
      return view();
   }
   public function index_show_filename()
   {
      $showFileName = Db::table('cbd_data_store_filename')->where([
         'status' => 1,
         'status_del' => 1,
         'user' => Session::get('username')
         ])->select();
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
      $fileName = Db::table('cbd_data_store_filename')->where([
         'user' => Session::get('username'),
         'status_del' => 1
         ])->select();
      $this->assign('fileName', $fileName);
      return view();
   }

   public function worksheet_show_els()
   {
      $getFileId = input('post.fileId');
      $getFileName = Db::table('cbd_data_store_filename')->where('id', $getFileId)->value('file_name');
      $fileColumn = Db::table('cbd_datasource_name')->where('file_name', $getFileName)->field('column_name,column_value')->select();
    
      $column = array();
      $column_value =array();
      foreach ($fileColumn as $key => $value) {
         $column[$key] = $value['column_name'];
         $column_value[$key] = $value['column_value'];
      } 
        $column['id'] = 'id';
        /*pp($fileColumn) ;*/
      $data['tbody'] = Db::table('cbd_datasource')->where([
         'file_name' => $getFileName,
         'status_del' => 1
         ])->field($column)->select();
      $data['thead'] = $column_value;
      /*pp($data);*/
      echo json_encode($data);  
   }

   public function worksheet_update_els()
   {
      $getUpdateValue = input('post.updateValue');
      $getUpdateId = input('post.updateId');
      $splitTheUpadteValueToArray = $this->split_the_update_string($getUpdateValue);
      /*pp($splitTheUpadteValueToArray);*/
      Db::table('cbd_datasource')->where('id', $getUpdateId)->update($splitTheUpadteValueToArray);
      echo 'ok';

   }
   public function worksheet_del_els()
   {
      $getDelDataId = input('post.dataId');
      $returnHandleResult = Db::table('cbd_datasource')->where('id', $getDelDataId)->setField('status_del', '0');
      if($returnHandleResult == '1') {
         echo "success";
      }else {
         echo "error";
      }
   }
   public function worksheet_add_data_els()
   {
      $getInsertData = input('post.insertValue');
      $getInsertFileName = input('post.insertFileName');
      $splitTheUpadteValueToArray = $this->split_the_update_string($getInsertData);
      $splitTheUpadteValueToArray['file_name'] = $getInsertFileName;
      $splitTheUpadteValueToArray['status_del'] = 1;
      $splitTheUpadteValueToArray['user'] = Session::get('username');
      $returnHandleResult = Db::table('cbd_datasource')->insert($splitTheUpadteValueToArray);
      if($returnHandleResult == '1'){
         echo "success";
      }else{
         echo "error";
      }
   }
   public function split_the_update_string($splitString)
   {
      $splitS = json_decode($splitString);
      $splitSToArray = array();
      foreach ($splitS as $key => $value) {
         $split = explode("@", $value);
         $key = $split[0];
         $splitSToArray[$key] = $split[1];
      }
      return $splitSToArray;
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