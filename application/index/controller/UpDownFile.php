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
    $info = $file->rule('date')->validate(['ext'=>'xls'])->move(ROOT_PATH . 'public' . DS . 'uploads','');
    if($info){
        // 成功上传后 获取上传信息
        // 输出 jpg
         
       // echo $info->getExtension().'<br/>';
        // 输出 20160820/42a79759f284b767dfcb2a0197904287.jpg
       $file_name= './uploads/'.$info->getSaveName();

        //echo $info->getOwner().'<br/>';
        // 输出 42a79759f284b767dfcb2a0197904287.jpg
        //echo $info->getFilename().'<br/>'; 
        //echo  $info->getSaveName();
        
             \think\Loader::import('PHPExcel.IOFactory');
             
            
          $objReader = \PHPExcel_IOFactory::createReader('Excel5'); 
            //$objReader = PHPExcel_IOFactory::createReader('Excel5');
            $objPHPExcel = $objReader->load($file_name,$encode='utf-8');
            $sheet = $objPHPExcel->getSheet(0);
            $highestRow = $sheet->getHighestRow(); // 取得总行数
            $highestColumn = $sheet->getHighestColumn(); // 取得总列数
             
             
            for($i=3;$i<=$highestRow;$i++)
            {   
               //$data['did'] = $objPHPExcel->getActiveSheet()->getCell("A".$i)->getValue();
               $data['apartment'] = $objPHPExcel->getActiveSheet()->getCell("B".$i)->getValue();
               $data['power_value'] = $objPHPExcel->getActiveSheet()->getCell("C".$i)->getValue();
               $data['date'] = $objPHPExcel->getActiveSheet()->getCell("D".$i)->getValue();
              
               if($data['apartment']!=null&&$data['power_value']!=null&&$data['date']!=null)

                 {
                  Db::table('cbd_datasource')->insert($data);  
                  $username = Session::get('username');
                  $this->assign('username',$username);
                  $this->redirect('/editchart');
                 }
               else{

               }
                  
            }

            
            //$this->redirect('admin/index');

           // $head =array();
          
             
                 // $colName = PHPExcel_Cell::stringFromColumnIndex($i);//根据列的下标索引值，获取列名
                 // $val = $sheet->getCellByColumnAndRow($i.1)->getValue();//假设表头在第一行，所以仅获取第一行的所有列的信息
                 // dump($colName);
              
         
            //  echo $val = $objPHPExcel->getActiveSheet->getCell("B",2);
           // return view('Admin/datasource');
            //$this->success('导入成功！');  
                    

    }else{
        // 上传失败获取错误信息
        echo $file->getError();
    }
   //dump($info);
   //echo  './public/uploads/'.$info->getSaveName();


   }






}