<?php
error_reporting(0);
class Disclosure_Controller extends CI_Controller {


    public function __construct()
  {
    parent::__construct();
	 $this->load->model('Admin/DisclosureModel');
     $this->load->library('session');
     $this->load->library('email');
   }
   
   public function index()
	{
    
		
    }
	
	public function get_disclosure_data(){
	    $data=$this->DisclosureModel->get_disclosure_data();
		echo $json_data=json_encode($data);
	}
	public function save_disclosure(){
		$d=json_decode($_GET['d']);
	  echo  $data=$this->DisclosureModel->save_disclosure($d);
		
	}
	
}
