<?php
namespace app\index\controller;
 use \think\View;
 use \think\Db;
 use \think\Session;
 use \think\Controller;
 use test\Test1;
 
class UpDownFile extends Common {

    public function upload()
    {
    // 获取表单上传文件 例如上传了001.jpg
     $file = request()->file('image');
    // 移动到框架应用根目录/public/uploads/ 目录下
    $info = $file->rule('date')->validate(['ext'=>'xls,xlsx'])->move(ROOT_PATH . 'public' . DS . 'uploads','');
    if($info){ 
           $file_name= './uploads/'.$info->getSaveName(); 
        
           \think\Loader::import('PHPExcel.IOFactory');
             
            $dataSource = array();
            
            $count = 0;
            if($info->getExtension() == "xls"){
              $objReader = \PHPExcel_IOFactory::createReader('Excel5'); 
            }else{
              $objReader = \PHPExcel_IOFactory::createReader('Excel2007'); 
            }
            
            
            $objPHPExcel = $objReader->load($file_name,$encode='utf-8');
            $sheet = $objPHPExcel->getSheet(0);
            $highestRow = $sheet->getHighestRow(); // 取得总行数
            $highestColumn = $sheet->getHighestColumn(); // 取得总列数
            $highestColumn =  $this->getalphnum($highestColumn);
            for($i=2;$i<=$highestRow;$i++)
            {    
                  $r = 0;
                  for($q=65;$q<91;$q++){
                    
                   
                    if($r < $highestColumn) {
                      $upper = strtoupper(chr($q));
                      $data[$upper] = $objPHPExcel->getActiveSheet()->getCell($upper.$i)->getValue();
                      $dataSource[$count][$upper] = $data[$upper];

                    }
                    $r++;
                  }
                  $count++;
          
            }
            /* pp($dataSource);*/
                 
             Session::set('dataSource', $dataSource);
            

    }else{
            // 上传失败获取错误信息
            echo $file->getError();
    }
   


   }
    public function getalphnum($char)
    {
            $array=array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
           
            $sum = 0;
            $index=array_search($char, $array);
            $sum+=($index+1);
       
            return $sum;
      }
    
/*确认提交els表*/
    public function confirm_els()
    {
            $inputWorkName = input('post.workname');
            $inputReMark = input('post.remark');
            $dataSource = Session::get('dataSource');
            if(is_array($dataSource)){
            foreach ($dataSource as $key => $value) {
              
                  if ($key == 0) {
                    foreach ($value as $k => $val) { 
                      $dataName['column_name'] = $k;
                      $dataName['column_value'] = $val;
                      $dataName['file_name'] = $inputWorkName;
                      $dataName['user'] = Session::get('username');
                       Db::table('cbd_datasource_name')->insert($dataName);
                      } 
                     
                      
                  }
                  else
                  {
                    foreach ($value as $k => $val) { 
                       $dataValue[$k] = $val; 
                       }
                       $dataValue['file_name'] = $inputWorkName;
                       $dataValue['user'] = Session::get('username');
                       Db::table('cbd_datasource')->insert($dataValue);
                       
                  }
              } 

               
                 Db::table('cbd_data_store_filename')->insert(['datafilename' => $inputWorkName, 'remark' => $inputReMark, 'user' => Session::get('username')]);
                 $fileName = Db::table('cbd_data_store_filename')->where('user', Session::get('username'))->select();
                 $this->assign('username', Session::get('username'));
                 $this->assign('fileName', $fileName);
                 Session::delete('dataSource');
                 $this->redirect('/worksheet');
             }else{
                  
                  Session::delete('dataSource');
                  $this->redirect('/confirmdata');
             }
            
    }
    public function sure_els_relook()
    {
      echo json_encode(Session::get('dataSource'));
    }
    public function dist_file_name()
    {
      $getFilename = input('post.workname');
      $getFindReturnValue = Db::table('cbd_datasource_name')->where('file_name', $getFilename)->find();
      if($getFindReturnValue == null){
        echo "ok";
       
      }else{
        echo "error";
      }

    }
    



}