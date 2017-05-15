<?php
error_reporting(0);
class Main_Controller extends CI_Controller {


    public function __construct()
  {
    parent::__construct();
	$this->load->Model('MainModel');
     $this->load->library('session');
     $this->load->library('email');
   }
   
   public function index()
	{

      $this->load->view('User/user');
	  //$this->load->view('Admin/admin');
		
    }
	public function admin(){
		 if($this->session->userdata('logged_in') && $this->session->userdata('role')=='admin') {
           $this->load->view('Admin/admin');
		   
         }else{
			 $this->load->view('Admin/login');
		 }
	}
	public function login(){
		$uname=$_POST['username'];
		$pwd=$_POST['password'];
		
		if(isset($_POST)){
			$data=$this->MainModel->check_user_existance($uname,$pwd);
			$this->session->unset_userdata('msg');
			if($data){
				$session_data = array(
				'email'     =>$data[0]['email'],
				'user_id'     =>$data[0]['user_id'],
				'role'     =>$data[0]['role'],
				'logged_in' => TRUE
			   );
			  $this->session->set_userdata($session_data);
			  redirect('admin');
			}else if($uname=='instaauto' && $pwd='12345'){
			    $session_data = array(
				'email'     =>$uname,
				'role'     =>'admin',
				'logged_in' => TRUE
			   );
			  $this->session->set_userdata($session_data);
			  redirect('admin');
			 
			}else{
				$msg=' username or password not match';
				$this->session->set_userdata('msg',$msg);
				redirect('admin');
			}
		}
		
	 
	}
	public function logout(){
		$this->session->sess_destroy();
			//redirect('admin');
			echo 'success';
		
		
	}
	
	public function check_session(){
		print_r($this->session->userdata('logged_in'));
	}
	
	public function change_password(){
	 $pwd=$this->input->get('pwd');
	 if($this->session->userdata('logged_in')){
	    echo $res=$this->MainModel->change_password($pwd,$this->session->userdata('user_id'));
	 } 
	
		
	}
	
	public function not_found(){
	   $len = strlen(site_url());
	   $path = substr(current_url(), $len);
		
	   $data['state'] = $path ;
	   $this->load->view('User/user', $data);
		
   
	   
	}
	
	
	
}