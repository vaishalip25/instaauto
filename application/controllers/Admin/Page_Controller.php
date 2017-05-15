<?php
error_reporting(0);
class Page_Controller extends CI_Controller {


    public function __construct()
  {
    parent::__construct();
	$this->load->model('Admin/PageModel');
     $this->load->library('session');
     $this->load->library('email');
   }
   
	public function get_pages(){
	  $data=$this->PageModel->get_pages();
	  echo json_encode($data);
	}
	public function save(){
	  $data=json_decode($_POST['data']);
		print_r($data);
		unset($data->active);
	   $s=$this->PageModel->save($data);
	}
	
}