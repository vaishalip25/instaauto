<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MainModel extends CI_Model {

public function __construct()
{
   parent::__construct();
   $this->load->database('');
}

public function index(){

}

public function check_user_existance($uname,$pwd){
	$this->db->select('*');
    $this->db->from('user');
	$this->db->where('email',$uname);		
	$this->db->where('password',$pwd);		
    $this->db->where('role',admin);		
   return $this->db->get()->result_array();
}
public function change_password($pwd,$userid){
	 $this->db->set('password',$pwd);
	 $this->db->where('user_id',$userid);
	 $this->db->update('user');
	 return $this->db->affected_rows();
}

}