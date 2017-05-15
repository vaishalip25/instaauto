<?php
error_reporting(0);
class Make_Controller extends CI_Controller {


    public function __construct()
  {
    parent::__construct();
	$this->load->model('Admin/MakeModel');
     $this->load->library('session');
     $this->load->library('email');
   }
   
   public function index()
	{
		
		
    }
	public function Add_make(){
		$make=$this->input->post('data');
		print_r($this->MakeModel->Add_make($make));
	}
	public function change_status(){
	    $make_id=$this->input->get('make_id');
	    $status=$this->input->get('status');
		echo $data=$this->MakeModel->change_status($make_id,$status);
	
	}
	public function get_make_list(){
		$data=$this->MakeModel->get_make_list();
		echo json_encode($data);
	}
	public function delete_make(){
		$make_id = $this->input->GET('make_id');
		$this->MakeModel->delete_make($make_id);
	}
	public function removeimg()
	{
		$make_id = $this->input->GET('makeid');
		$make_img = $this->input->GET('make_img');
		$this->MakeModel->removeimg($make_id,$make_img);
	
	}
	
	public function update_make(){
		$make=$this->input->post('data');	
		 //print_r($make);
		print_r($this->MakeModel->update_make($make));
	}
	
	public function searchmake(){
	
	
		echo json_encode($this->MakeModel->searchmake($_POST['data']));
	
	}
}