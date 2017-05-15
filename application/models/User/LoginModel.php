<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class LoginModel extends CI_Model {

public function __construct()
{
   parent::__construct();
   $this->load->database('');
}

public function index(){

}

public function validate($email,$password){
	$this->db->select('user_id,email');
	$this->db->from('user');
	$this->db->where('email',$email);
	$this->db->where('password',$password);
   return $this->db->get()->result_array();
}

}