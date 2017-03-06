<?php
namespace app\index\controller;
 use \think\View;
 use \think\Db;
 use \think\Session;
  use \think\Controller;
class Index  extends Controller
{   
    public function index()
    {       
          return  view();
    }
    public function aboutme(){ 
          return view();
    }
    public function loginreg(){ 
         return view();   
         
    }
    public function loginreg_for_manage(){ 
        return view();
    }  
    public function register(){
          return view();
    }
    public function demo(){
          return view();
    }
    //登陆用户判断
    public function exist_User_to_dis(){
          $dis_username =input('post.username');
          $resDb= Db::table('cbd_users')->where('name',$dis_username)->find();
            
           if($dis_username==null)
           {
              echo '用户名不能为空';
              }
           elseif($resDb==null)
           {
              echo '用户不存在';
              }
           else 
           {
              echo "";
              }  
    }
    //用户登录提交判断
    public function login_suss_dis(){
             $username = input('post.username'); 
           $password = md5(input('post.passwd')); 
           // echo $username.$password;
          
           $_SERVER['REMOTE_ADDR'];
           $resDb= Db::table('cbd_users')->where('name',$username)->where('password',$password)->where('role','EQ','0')->find();
           $last_login_time =date("Y-m-d H:i:s");
           $last_login_ip = $_SERVER['REMOTE_ADDR'];
           if($resDb!=null){
              Session::set('username',$username); 
              Db::table('cbd_users')->where('name',$username)->where('password',$password)->update(['last_login_time' => $last_login_time,'last_login_ip'=>$last_login_ip]);  
               echo 'success';
            
            
           }else{
                   echo '用户名或密码错误';
             
           }  
          
    }
    //后台登陆提交判断
    public function login_suss_dis_manage(){
           $username = input('post.username'); 
           $password = md5(input('post.passwd'));
       
            
           $_SERVER['REMOTE_ADDR'];
           $resDb= Db::table('cbd_users')->where('name',$username)->where('password',$password)->where('role','NEQ','0')->find();
           $last_login_time =date("Y-m-d H:i:s");
           $last_login_ip = $_SERVER['REMOTE_ADDR'];
           if($resDb!=null){
              Session::set('Managename',$username); 
              Db::table('cbd_users')->where('name',$username)->where('password',$password)->update(['last_login_time' => $last_login_time,'last_login_ip'=>$last_login_ip]);  
              Session::set('Managerole',$resDb['role']); 
               echo 'success';
                 //return view('adminforcon/index');
           // $this->success('登陆成功','adminforcon/index');
            
           }else{
            echo '用户名或密码错误';
             //return view('index/loginreg_for_manage');
              
           }   
    }
    //注册页面的ajax判断
    public function reg_ajax_submit_to_sucess(){
            
         $username =input('post.username');
         $pwd =md5(input('post.pwd'));
         $phone =input('post.phone');
         $email =input('post.email');
         $yanma =input('post.yanma');
         $create_time = date("Y-m-d H:i:s");
         $last_login_ip = $_SERVER['REMOTE_ADDR'];
         $resDb= Db::table('cbd_yanzheng')->where('yanma',$yanma)->where('phone',$phone)->find();
        if($resDb!=null){
             $data = ['name' => $username,'password' => $pwd,'phone' => $phone, 'mail' => $email,'status'=>'1','role'=>'0','create_time'=>$create_time,'last_login_ip'=>$last_login_ip];
             $dis_sus=Db::name('users')->insert($data); 
              if($dis_sus=='1'){
            echo 'ok';
            }else{
            echo 'error';
            }
        }else{
           echo '验证码错误!';
        }
             
          

    }
    //密码判断
    public function exist_res_User_to_dis(){
          $dis_pwd = input('post.pwd');
          $dis_pwd_s = input('post.pwds');
          if($dis_pwd == $dis_pwd_s){
              echo "";
          }else{
              echo "密码不一致";
          }
    }
    //注册用户判断
    public function exist_res_Username_to_dis(){
         $dis_username = input('post.username');
          $resDb= Db::table('cbd_users')->where('name',$dis_username)->find();
            if($dis_username==null)
           {
              echo '用户名不能为空';
              }
           elseif($resDb==null)
           {
              echo '用户名可用';
              }else{
              echo '用户名已存在';
              }
    }
    //验证码发送
    public function dis_yanzhengma(){
           $phone = input('post.phone');
           $resDb= Db::table('cbd_users')->where('phone',$phone)->find();
           if($resDb==null){ 
                   $statusStr = array(
              "0" => "短信发送成功",
              "-1" => "参数不全",
              "-2" => "服务器空间不支持,请确认支持curl或者fsocket，联系您的空间商解决或者更换空间！",
              "30" => "密码错误",
              "40" => "账号不存在",
              "41" => "余额不足",
              "42" => "帐户已过期",
              "43" => "IP地址限制",
              "50" => "内容含有敏感词"
            );  
          $smsapi = "http://api.smsbao.com/";
          $user = "fusky"; //短信平台帐号
          $pass = md5("www.565tech.com"); //短信平台密码
          $yanma=rand(1000,9999);          
          $content="【爱诺信物联】您的验证码为".$yanma.",有效时间3分钟。";//要发送的短信内容 
         
          $resDb1= Db::table('cbd_yanzheng')->where('phone',$phone)->find();
          if($resDb1==null){     
          $sendurl = $smsapi."sms?u=".$user."&p=".$pass."&m=".$phone."&c=".urlencode($content);
          $result =file_get_contents($sendurl) ;
          if($statusStr[$result]=="短信发送成功"){
              $data = ['phone' => $phone, 'yanma' => $yanma];
              Db::name('yanzheng')->insert($data);             
              
          }
          }else{
          
           
          $sendurl = $smsapi."sms?u=".$user."&p=".$pass."&m=".$phone."&c=".urlencode($content);
          $result =file_get_contents($sendurl) ;
          if($statusStr[$result]=="短信发送成功"){
             
             Db::table('cbd_yanzheng')->where('phone',$phone)->update(['yanma' => $yanma]);  
          }
       }
           
        }else{
          echo '该号码已存在用户，请登录';
    }
    }
   /* //退出登录
    public function out_login(){
       Session::delete('username');
       $this->redirect('/');
    }*/
    public function test(){
        $Nowtime=date("Y-m-d H:i:s");
        $Ttime=date("Y-m-d");
        $count = dump(db('yanzheng') ->where('create_time','between time',[$Ttime, $Nowtime])->count('phone'));//当天前的时间
        $username='admin';
        $password='admin';
        $a = md5($password);
        $resDb= Db::table('cbd_users')->where('name',$username)->where('password',$a)->find();
        //ssdump($resDb);
        dump($resDb['role']);
    }
   //实现菜单demo
    public function test1(){
            $get_module_code=Db::table('cbd_privilege')->distinct(true)->field('module_code')->where('role_code','2')->where('status','1')->select();
            //dump($get_module_code);
            for($i=0;$i<count($get_module_code);$i++)
            {
               $menu= Db::table('cbd_module')->where('module_code',$get_module_code[$i]['module_code'])->where('parent_code','PARENT')->select();

            } 
            $this->assign('menu',$menu);
          
            return view();
          
        
    }
    
    public function tt (){
          $m = Db::table('cbd_module')->select();
           $m = M('cn_menu')->field(true)->select();
    $d = getTree($m,0);
    $this->assign('menu',$d);
      dump($d);

    }
    public function upload(){
    // 获取表单上传文件 例如上传了001.jpg
    $file = request()->file('image');
    // 移动到框架应用根目录/public/uploads/ 目录下
    $info = $file->rule('date')->validate(['ext'=>'jpg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'uploads',true,false);
    if($info){
        // 成功上传后 获取上传信息
        // 输出 jpg
         
        echo $info->getExtension().'<br/>';
        // 输出 20160820/42a79759f284b767dfcb2a0197904287.jpg
        echo $info->getSaveName().'<br/>';
        echo $info->getOwner().'<br/>';
        // 输出 42a79759f284b767dfcb2a0197904287.jpg
        echo $info->getFilename().'<br/>'; 
    }else{
        // 上传失败获取错误信息
        echo $file->getError();
    }
}
   
}
