<?php
namespace app\index\controller;
 use \think\View;
 use \think\Db;
 use \think\Session;
 use \think\Controller;
 use test\Test1;
 
class Test extends Controller{
	
  public function index(){
    $return_all_file = Db::table('cbd_data_store_filename')->where('status_del', '1')->select();
    $this->assign('return_all_file', $return_all_file);
    return view();
   }

   
  public function fuckdepp()
  {
      $getFileName = "撒大苏打";
      $fileColumn = Db::table('cbd_datasource_name')->where('file_name', $getFileName)->field('column_name')->select();
        
      $column = array();
      foreach ($fileColumn as $key => $value) {
         $column[$key] = $value['column_name'];
      }
         
      $data = Db::table('cbd_datasource')->where('file_name', $getFileName)->field($column)->select();

      foreach ($data as $key => $value) {
         foreach ($value as $k => $val) {
               // $findKey = $k;
                $findKey[$k][$key] = $val;
         }
      }
       
      return json_encode($findKey);  
  }
  public function getJsonData(){
    $get_file_name = input('post.file_name');
    $file_column_count = Db::table('cbd_datasource_name')->where('file_name', $get_file_name)->count();
    $i = 0;
    $file_column_count = $file_column_count+65;
     for($q = 65; $q < $file_column_count; $q++){ 
       $upper[$i] = strtoupper(chr($q));
       $i++; 
     } 
     $get_file_data = Db::table('cbd_datasource')->where([
      'file_name' =>  $get_file_name,
      'status_del' => 1
      ])->field($upper)->select();
     foreach ($get_file_data as $key => $value) {
        foreach ($value as $k => $val) {
           
           $file_column_value = Db::table('cbd_datasource_name')->where([
            'file_name' => $get_file_name, 
            'column_name' => $k
            ])->field('column_value')->select();
           $new_key = $file_column_value[0]['column_value']; 
           $new_value[$key][$new_key] =  $value[$k];
          
        }
   
     }
     return json_encode($new_value);

     
  } 

  public function test(){
    $get_file_name = input('post.file_name');
    $myfile = fopen("./data/${get_file_name}.json", "w") or die("Unable to open file!");

    if(file_exists($get_file_name)){
       echo 'exists';
    }else{
       
          $txt = $this->getJsonData($get_file_name);
    fwrite($myfile, $txt);
    fclose($myfile);
    echo 'ok';  
    }

    
  }

    public function test2()
    {
      
      echo $getFileName;
    }

}