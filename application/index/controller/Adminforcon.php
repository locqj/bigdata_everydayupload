<?php
namespace app\index\controller;
 use \think\View;
 use \think\Db;
 use \think\Session;
 use \think\Controller;
class Adminforcon extends Controller
{   
      protected $beforeActionList = [
        'initialize',
         
    ];
    public function initialize ()
    {
		   
		 	  if(Session::get('Managename') == null)
        { 
          $this->redirect('/manage');      
		    }
		  
    }
     
	public function index()
  { 
	   $this->getUserName_and_getMenu();
	   return view('adminforcon/index');
	}
	public function adminManage()
  {
    $this->getUserName_and_getMenu();
    $show_all_admin = Db::table('cbd_users')->
               where('role', 'NEQ', '0')->
               where('status', 'NEQ', '0')->select();
    $roler = Db::table('cbd_role')->where('status', '1')->select();
    $this->assign('roler', $roler);
    $this->assign('see', $show_all_admin); 
    return view('adminforcon/adminManage');
  }
	//添加管理员
	public function adminManage_Add_User()
  {
      $user = input('post.user');
      $passwd = md5(input('post.passwd'));
      $email = input('post.email');
      $role = input('post.roler');
      $create_time = date("Y-m-d H:i:s");
      $last_login_ip = $_SERVER['REMOTE_ADDR']; 
      $add_admin_user = Db::table('cbd_users')->
                        insert([
                          'name' => $user,
                          'password' => $passwd,
                          'mail' => $email,
                          'status' => '1',
                          'role' => $role,
                          'last_login_ip' => $last_login_ip,
                          'create_time' => $create_time
                          ]);
      if($add_admin_user == '1')
      {
        $this->getUserName_and_getMenu();
        return view('index');
      }else{
        $this->success('添加失败', 'adminManage');
      }
	}
  //角色管理
	public function roleManage()
  {
	   $this->getUserName_and_getMenu();
     $role = Db::table('cbd_role')->where('status', '1')->select();
     $this->assign('role', $role); 
	   return view('roleManage');
	}
  public function dis_the_role_status()
  {
     $role_name = input('post.name');
     $role_id = input('post.roleid'); 
     if($role_id == Session::get('Managerole'))
     {
       echo '非法操作';
     }else{
       Db::table('cbd_role')->where('name', $role_name)->update(['status' => '0']);
     }
     
  }
	//添加角色
	public function userout_add_role()
  {
      $role_name = input('post.role_name');
      $contents = input('post.contents');
      $status = input('post.status');
      $create_time = date('Y-m-d');
      $add_role = Db::table('cbd_role')->
                   insert([
                      'name' => $role_name,
                      'status' => $status,
                      'remark' => $contents,
                      'create_time' => $create_time,
                      'role_id' => '1'
                      ]);
      if($add_role != null)
      {
       $this->redirect('roleManage');
      }
	}
  //设置角色权限
  public function set_the_role_privilege()
  {
      $role_id = input('post.role_id');
      $get_module_code = Db::table('cbd_privilege')->
                             distinct(true)->
                             field('module_code')->
                             where('role_code',$role_id)->
                             where('status','1')->select();    
      $get_vale = array();
      foreach ($get_module_code as $key => $value) 
          {   
              $set_the_role_privilege = Db::table('cbd_module')->
                                          where('module_code', $get_module_code[$key]['module_code'])->
                                          where('parent_code', 'PARENT')->select();
               if($set_the_role_privilege != null)
               {
                 $get_vale[$key] = $set_the_role_privilege;
               }

            }    
    $this->assign('menu', $get_vale); 
  }
	public function dis_form_role(){
       $dis_role = input('post.role_name');
       $resDb = Db::table('cbd_role')->where('name',$dis_role)->find();
            if($dis_role == null)
              {
              echo '用户名不能为空';
              }
           elseif($resDb == null)
              {
                 echo '用户名可用';
              }else{
                 echo '用户名已存在';
              }
	}
	public function userIn()
  {
	   $this->getUserName_and_getMenu();
     $see = Db::table('cbd_users')->where('role','EQ','0')->select();
	   $this->assign('see', $see); 
	   return view('userIn');
	}
	public function userOut()
  {
	   $this->getUserName_and_getMenu();
	   return view('userOut');
	}
	public function menuManage()
  {
	   $this->getUserName_and_getMenu();
		 return view('menuManage');
	}
	public function out_login()
  {
	   Session::delete('Managename');
	   Session::delete('Managerole');
	   $this->redirect('/manage');
	}
	public function change_Pwd()
  {
      $username =Session::get('Managename');
      $this->assign('username',$username);
	    return view('change_Pwd');
	}
	//验证修改密码
	public function exist_res_User_to_dis()
  {
        $pdw = input('post.pwd');
        $pdws = input('post.pwds');  
        if($pdw == $pdws)
          {
            $password = md5($pdw);
            $username = Session::get('Managename');
            $find_the_user_pwd= Db::table('cbd_users')->where('name', $username)->field('password')->find(); 
        if($find_the_user_pwd['password'] == $password)
          {  
            echo '你的密码和原密码一致';  
          }else{
            $Update_the_user_pwd = Db::table('cbd_users')->
                                       where('name', $username)->
                                       update(['password' => $password]); 
                 if($Update_the_user_pwd == '1')
                 {
                     echo 'ok';
                 }else{
                     echo '修改失败，请重新修改';
                      } 
               }  
          }else{
            echo '密码不一致';
               }
          
	}
  
    public function dis_the_status()
    {
      $username = input('post.name');
      Db::table('cbd_users')->where('name', $username)->update(['status' =>'2']); 
    }
    public function dis_the_restatus()
    {
      $username = input('post.name');
      Db::table('cbd_users')->where('name', $username)->update(['status' =>'1']);
    }
    public function dis_the_del()
    {
      $username = input('post.name');
      Db::table('cbd_users')->where('name', $username)->update(['status' =>'0']); 
    }
    public function getUserName_and_getMenu()
    {
     $username = Session::get('Managename'); 
     $this->assign('username', $username);
     $this->menu();
    }
    //菜单
    public function menu()
    {
      $get_module_code = Db::table('cbd_privilege')->
                             distinct(true)->
                             field('module_code')->
                             where('role_code', Session::get('Managerole'))->
                             where('status', '1')->select(); 
          foreach($get_module_code as $key => $value) 
          { 
                $menu= Db::table('cbd_module')->
                           where('module_code', $get_module_code[$key]['module_code'])->
                           where('parent_code', 'PARENT')->select(); 
                if($menu != null)
                  { 
                  $a[$key] = $menu;
                  }
          }   
            $this->assign('menu', $a);
            $this->assign('roleId', Session::get('Managerole'));
    }
   
}
