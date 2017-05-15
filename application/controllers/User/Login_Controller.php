<?php
//error_reporting(0);
class Login_Controller extends CI_Controller {


    public function __construct()
  {
    parent::__construct();
	$this->load->model('User/LoginModel');
     $this->load->library('session');
	
   }
   
   public function validate(){
   $email=$this->input->post('email');
   $password=$this->input->post('password');
	
	   if(!empty($this->LoginModel->validate($email,$password))){
		 $data=$this->LoginModel->validate($email,$password)[0];
		 
		$newdata = array(
				'user_id'  => $data['user_id'],
				'email'     => $data['email']
				
		        );

         $this->session->set_userdata($newdata);
		
         echo json_encode(array('msg' => "1" ,'data' => $data));
		   
		   
	   }else{
   
    echo json_encode(array('msg' => "0" ));
   
   }
   
   }
	
	
	public function checksession(){
	
		
		
	 echo json_encode($this->session->all_userdata());
	
	
	}
	
	
	public function logout(){
	
	
	 if($this->session->unset_userdata(array('user_id', 'email'))){
	 
	 echo "1";
	 
	 }
	
	
	}
	
}