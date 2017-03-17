<?php
namespace app\index\controller;
 use \think\View;
 use \think\Db;
 use \think\Session;
 use \think\Controller;
 use test\Test1;
 
class Test {
	
   public function index(){
     return view();
   }
     public function upload(){
    // 获取表单上传文件 例如上传了001.jpg
     
     $file = request()->file('file'); 
    // 移动到框架应用根目录/public/uploads/ 目录下
    $info = $file->validate(['ext'=>'xls'])->move(ROOT_PATH . 'public' . DS . 'uploads','');
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
                $data['account']= $data['truename'] = $objPHPExcel->getActiveSheet()->getCell("B".$i)->getValue();
                $sex = $objPHPExcel->getActiveSheet()->getCell("C".$i)->getValue();
                // $data['res_id']    = $objPHPExcel->getActiveSheet()->getCell("D".$i)->getValue();
                $data['class'] = $objPHPExcel->getActiveSheet()->getCell("E".$i)->getValue();
                $data['year'] = $objPHPExcel->getActiveSheet()->getCell("F".$i)->getValue();
                $data['city']= $objPHPExcel->getActiveSheet()->getCell("G".$i)->getValue();
                $data['company']= $objPHPExcel->getActiveSheet()->getCell("H".$i)->getValue();
                $data['zhiwu']= $data['zhicheng']= $objPHPExcel->getActiveSheet()->getCell("J".$i)->getValue();
                //$data['zhiwu']= $objPHPExcel->getActiveSheet()->getCell("J".$i)->getValue();
                //$data['jibie']= $objPHPExcel->getActiveSheet()->getCell("K".$i)->getValue();
                //$data['honor']= $objPHPExcel->getActiveSheet()->getCell("L".$i)->getValue();
                $data['tel']= $objPHPExcel->getActiveSheet()->getCell("K".$i)->getValue();
                $data['qq']= $objPHPExcel->getActiveSheet()->getCell("L".$i)->getValue();
               // $data['email']= $objPHPExcel->getActiveSheet()->getCell("O".$i)->getValue();
                //$data['remark']= $objPHPExcel->getActiveSheet()->getCell("P".$i)->getValue();
                $data['sex']=$sex=='男'?1:0;
                $data['res_id'] =1;

                $data['create_time']=$data['last_login_time']=date('Y-m-d');
                $data['last_login_ip']=$_SERVER['REMOTE_ADDR'];
                $data['login_count']=0;
                $data['join']=0;
               //$data['avatar']='';
                
               //Db::table('cbd_test')->insert($data);
                   
               
                  
            }
             echo 'ok';

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

   public function tt (){
       
         //$t = new Test1();
        // echo $t->say();
         \think\Loader::import('PHPExcel.IOFactory');
        $objReader = \PHPExcel_IOFactory::createReader('Excel5'); 
   
   }
  public function demo(){
    //根据ajax 提交 公寓型号--》 需求是按月的话 这个是模拟提交一个公寓的
     $get_db_data['一号公寓']=Db::table('cbd_datasource')->where('apartment','一号公寓')->where('date','like','2016%')->select();
     $get_db_data['二号公寓']=Db::table('cbd_datasource')->where('apartment','二号公寓')->where('date','like','2016%')->select();
    dump($get_db_data);
    
    foreach ($get_db_data['一号公寓'] as $key => $value) {
        $data['一号公寓']['power'][$key]=$get_db_data['一号公寓'][$key]['power_value'];
        $data['一号公寓']['date'][$key]=$get_db_data['一号公寓'][$key]['date'];
    }
    //dump($data);
     echo  json_encode($data);  

  }
  public function demo1(){
    $role_id = '2';
    $f = array();
   $Count_the_Menu=Db::table('cbd_privilege')->where('role_code',$role_id)->distinct(true)->field('module_code')->select();
   //dump($Count_the_Menu);

   foreach ($Count_the_Menu as $key => $value) {
        $b[$key]= $Count_the_Menu[$key]['module_code'];
   }
   dump($b); 
   $parent_code ="CHAJIANMANAGE";
   $list=Db::table('cbd_module')->where('parent_code',$parent_code)->select();
    //dump($list);
    if($list ==null)
    {
       echo  'asd';
    }else{
   foreach ($list as $key => $value) {
      $a[$key] = $list[$key]['module_code'];
      
   }
    dump($a); 
 
    foreach ($b as $key => $value) {
       foreach ($a as $k => $value) {
         //echo $a[$k]."&nbsp;".$b[$key].'<br/>';
            if($a[$k] == $b[$key]){
                 echo 'ok';
                  $f[$k]=Db::table('cbd_module')->where('module_code',$a[$k])->select();    
            }else{
                 //$f =array();
            }
       }
   }  
   }

    dump($f); 
  }
  public function demo2(){
     $con['date']  = ['like','2014%'];
     $con1['date']  = ['like','2015%'];
     $con2['date']  = ['like','2016%'];
     $a=Db::table('cbd_datasource')->where($con)->select();
     $aa = Db::table('cbd_datasource')->where($con1)->select();
     $aaa = Db::table('cbd_datasource')->where($con2)->select();
     //$a1=Db::table('cbd_datasource')->where('apartment','2号公寓')->where($con)->field('power_value')->select();
     //dump($aaa);
   //
   //  dump($a);
    
     foreach ($a as $key => $value) {
      if($a[$key]['apartment']=='1号公寓')
       {
        $b['1-2014'][$key]=$a[$key]['power_value'];
        $b['1-2015'][$key]=$aa[$key]['power_value'];
        $b['1-2016'][$key]=$aaa[$key]['power_value'];
      }else 
      if($a[$key]['apartment']=='2号公寓'){
      $b['2-2014'][$key]=$a[$key]['power_value'];
      $b['2-2015'][$key]=$aa[$key]['power_value'];
      $b['2-2016'][$key]=$aaa[$key]['power_value'];
     }else 
      if($a[$key]['apartment']=='3号公寓'){
      $b['3-2014'][$key]=$a[$key]['power_value'];
      $b['3-2015'][$key]=$aa[$key]['power_value'];
      //$b['3-2016'][$key]=$aaa[$key]['power_value'];
     }
   }

     /*
     foreach ($a1 as $key => $value) {
       $b['2-2014'][$key]=$a1[$key]['power_value'];
     }
      dump($b);*/
 /*    dump (json_encode($a));*/
  echo  json_encode($b);
  }
  public function demo3 (){
    $con['date']  =  ['like','2014%'];       
    $con1['date']  = ['like','2015%'];       
    $con2['date']  = ['like','2016%'];
    $data_14 = Db::table('cbd_datasource')->where($con)->select();/*2014年*/
    $data_15 = Db::table('cbd_datasource')->where($con)->select();/*2015年*/
    $data_16 = Db::table('cbd_datasource')->where($con)->select();/*2016年*/
    foreach ($data_14 as $key => $value) {
     if($data_14[$key]['apartment']=='1号公寓'){
        $num_14['2014-Num1'][$key]=$data_14[$key]['power_value'];
     }elseif ($data_14[$key]['apartment']=='2号公寓') {
        $num_14['2014-Num2'][$key]=$data_14[$key]['power_value'];
     }else {
        $num_14['2014-Num3'][$key]=$data_14[$key]['power_value'];
     }
    }
    foreach ($data_15 as $key => $value) {
     if($data_15[$key]['apartment']=='1号公寓'){
        $num_15['2015-Num1'][$key]=$data_15[$key]['power_value'];
     }elseif ($data_15[$key]['apartment']=='2号公寓') {
        $num_15['2015-Num2'][$key]=$data_15[$key]['power_value'];
     }else {
        $num_15['2015-Num3'][$key]=$data_15[$key]['power_value'];
     }
    }
    foreach ($data_16 as $key => $value) {
     if($data_16[$key]['apartment']=='1号公寓'){
        $num_16['2016-Num1'][$key]=$data_16[$key]['power_value'];
     }elseif ($data_14[$key]['apartment']=='2号公寓') {
        $num_16['2016-Num2'][$key]=$data_16[$key]['power_value'];
     }else {
        $num_16['2016-Num3'][$key]=$data_16[$key]['power_value'];
     }
    }
     echo json_encode($num_14);
     echo '<hr/>';
     echo json_encode($num_15);
     echo '<hr/>';
     echo json_encode($num_16);
    /* dump($data_14);
     echo '<hr/>';  
     dump($data_15);
     echo '<hr/>';
     dump($data_16);
     echo '<hr/>';*/
  }
  public function test()
  {
    echo 'ok';
  }

    

}