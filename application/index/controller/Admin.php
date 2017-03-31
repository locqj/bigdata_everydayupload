<?php
namespace app\index\controller;
 use \think\View;
 use \think\Db;
 use \think\Session;
 use \think\Controller;
class admin extends CommonAdmin
{  

   public function index(){
      $this->initLoad();
      $get_the_file_name = Db::table('cbd_data_store_filename')->where([
         'user' => Session::get('s_username'),
         'status' => 0, 
         'status_del' => 1
         ])->select(); 
      $this->assign('get_the_file_name', $get_the_file_name);
      return view();
   }
   public function indexShowFilename(){
      $show_file_name = Db::table('cbd_data_store_filename')->where([
         'status' => 1,
         'status_del' => 1,
         'user' => Session::get('s_username')
         ])->select();
      echo json_encode($show_file_name);
   }
   public function indexAddCharts(){
      $get_ajax_filename = input('post.get_ajax_filename');
      Db::table('cbd_data_store_filename')->where('file_name', $get_ajax_filename)->update(['status' => 1]);
      echo 'ok';
   }
   public function chartDetail(){
       $this->initLoad();
       return view();
   }
   public function chartDetail2(){
      $this->initLoad();
      return view();
   } 
   public function dataSource(){
      $this->initLoad();
      return view();
   }
   
   public  function module(){
      $this->initLoad();
      return view();
   }
   public function workSheet(){
      $this->initLoad();
      $get_filename_form_db = Db::table('cbd_data_store_filename')->where([
         'user' => Session::get('s_username'),
         'status_del' => 1
         ])->select();
      $this->assign('get_filename_form_db', $get_filename_form_db);
      return view();
   }

   public function worksheetShowEls(){
      $ajax_get_file_id = input('post.ajax_get_file_id');
      $get_file_name_for_db = Db::table('cbd_data_store_filename')->where('id', $ajax_get_file_id)->value('file_name');
      $file_column_form_db = Db::table('cbd_datasource_name')->where('file_name', $get_file_name_for_db)->field('column_name,column_value')->select();
    
      $column = array();
      $column_value =array();
      foreach ($file_column_form_db as $key => $value) {
         $column[$key] = $value['column_name'];
         $column_value[$key] = $value['column_value'];
      } 
      $column['id'] = 'id'; 
      $return_data['tbody'] = Db::table('cbd_datasource')->where([
         'file_name' => $get_file_name_for_db,
         'status_del' => 1
         ])->field($column)->select();
      $return_data['thead'] = $column_value;
      echo json_encode($return_data);  
   }

   public function worksheetUpdateEls(){
      $get_ajax_update_col_value = input('post.get_ajax_update_col_value');
      $get_ajax_update_col_id = input('post.get_ajax_update_col_id');
      $split_the_upadte_value_to_array = $this->splitTheUpdateString($get_ajax_update_col_value);
      Db::table('cbd_datasource')->where('id', $get_ajax_update_col_id)->update($split_the_upadte_value_to_array);
      echo 'ok';

   }
   public function worksheetDelEls(){
      $get_ajax_del_data_id = input('post.dataId');
      $return_handle_result = Db::table('cbd_datasource')->where('id', $get_ajax_del_data_id)->setField('status_del', '0');
      if($return_handle_result == '1') {
         echo "success";
      }else {
         echo "error";
      }
   }
   public function worksheetAddDataEls(){
      $get_ajax_insert_data = input('post.insertValue');
      $get_ajax_insert_filename = input('post.insertFileName');
      $split_the_update_value_to_array = $this->splitTheUpdateString($get_ajax_insert_data);
      $split_the_update_value_to_array['file_name'] = $get_ajax_insert_filename;
      $split_the_update_value_to_array['status_del'] = 1;
      $split_the_update_value_to_array['user'] = Session::get('s_username');
      $return_handle_result = Db::table('cbd_datasource')->insert($split_the_update_value_to_array);
      if($return_handle_result == '1'){
         echo "success";
      }else{
         echo "error";
      }
   }
   public function splitTheUpdateString($split_String){
      $split_data_string = json_decode($split_String);
      $split_data_string_to_array = array();
      foreach ($split_data_string as $key => $value) {
         $split = explode("@", $value);
         $key = $split[0];
         $split_data_string_to_array[$key] = $split[1];
      }
      return $split_data_string_to_array;
   }
   public function worksheetResetFilenameAndRemark(){
      $get_ajax_new_filename = input('post.workname');
      $get_ajax_remark = input('post.remark');
      $get_ajax_old_filename = input('post.fileOldName');
     
      if(!empty($get_ajax_new_filename)){
         $data_s['user'] = Session::get('s_username');
         $data_s['file_name']  = $get_ajax_old_filename;
         Db::table('cbd_data_store_filename')->where($data_s)->update([
            'file_name' => $get_ajax_new_filename, 
            'remark' => $gei_ajax_remark
            ]);
         Db::table('cbd_datasource_name')->where($data_s)->update([
            'file_name' => $get_ajax_new_filename
            ]);
         Db::table('cbd_datasource')->where($data_s)->update([
            'file_name' => $get_ajax_new_filename
            ]);
         
         echo "success";

      }else{
         echo '名字不得为空';
      }
   }
   public function delectFile(){
      $data['file_name'] = input('post.fileName');
      $data['user'] = Session::get('s_username');
      DB::table('cbd_data_store_filename')->where($data)->update(['status_del' => 0]);
      echo 'ok';

   }
   public function outLogin(){
       Session::delete('s_username'); 
       $this->redirect('/login');
   }
   public function initLoad(){
      $s_username = Session::get('s_username');
      $this->assign('s_username', $s_username);
      
   }
   public function confirmdata(){    
       
        return view();
   }
  	// lin添加
   public function getdata(){ 

      return view();
   }
   public function test(){
      return view();
   }
   



  }