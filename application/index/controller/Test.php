<?php
namespace app\index\controller;
 use \think\View;
 use \think\Db;
 use \think\Session;
 use \think\Controller;
 use test\Test1;
 
class Test extends Controller{
	
  public function index(){
     $a = 'asd';
     $this->assign('test', $a);
     return view();
   }
   
  public function fuckdepp()
  {
      $getFileName = "test1";
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
      /*pp($findKey);*/
      return json_encode($findKey);  
  }
  
   
  
  public function test()
  {
    $a = "hello";
    $myfile = fopen("${a}.json", "w") or die("Unable to open file!");
    $txt = $this->fuckdepp();
    fwrite($myfile, $txt);
    fclose($myfile);
  }

    public function test2()
    {
      
      echo $getFileName;
    }

}