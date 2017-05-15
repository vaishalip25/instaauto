<?php
error_reporting(0);
class Dealer_Controller extends CI_Controller {


    public function __construct()
  {
    parent::__construct();
	$this->load->model('Admin/DealerModel');
     $this->load->library('session');
     $this->load->library('email');
   }
   
   public function index()
	{
    
		
    }
	
	public function get_dealers(){
		$data=$this->DealerModel->get_dealers();
		echo json_encode($data);
	}
	
	public function get_makes(){
		$selected_con = $this->input->GET('selected_con');
		$data=$this->DealerModel->get_makes($selected_con);
		echo json_encode($data);
	}
	
	public function get_time(){
		$dealer_id = $this->input->GET('dealer_id');
		$time=$this->DealerModel->get_time($dealer_id);
		echo json_encode($time);
	}
	public function change_status(){
		$dealer_id = $this->input->GET('dealer_id');
		$status = $this->input->GET('status');
		$this->DealerModel->change_status($dealer_id,$status);
		
	}
	
	public function Add_dealer(){
		$dealer=json_decode($_GET['dealer']);
		$time=json_decode($_GET['time']);
		//echo $dealer;
		$id=$this->DealerModel->add_dealer($dealer);
		$time->dealer_id=$id;
		$this->DealerModel->add_shop_time($time);
		
	}
		public function remimg()
	{
		$deid = $this->input->GET('deid');
		$de_img = $this->input->GET('de_img');
		$this->DealerModel->remimg($deid,$de_img);
	
	}
	public function update_dealer(){
		$dealer=json_decode($_GET['dealer']);
		$time=json_decode($_GET['time']);
		
		$this->DealerModel->update_dealer($dealer,$dealer->dealer_id);
	    $this->DealerModel->update_shop_time($time,$time->dealer_id);
		echo 1;
	}
	public function delete_dealer(){
		$dealer_id = $this->input->GET('dealer_id');
		$this->DealerModel->delete_dealer($dealer_id);
	}
	public function get_models(){
		$make_id = $this->input->GET('make_id');
		$data=$this->DealerModel->get_models($make_id);
		echo json_encode($data);
	}
	public function get_model_names(){
		 $models = $this->input->GET('models');
		 $m=explode(',',$models);
		 $model_names=$this->DealerModel->get_model_names($m);
		 echo json_encode($model_names);
	}
	public function searchdealer()
	{
		$data=json_decode($_GET['search']);
		//echo $data;
		$ve=$this->DealerModel->searchdealer($data);
		echo json_encode($ve);
	}
	
	public function Upload_image(){
	   $target_dir = "./upload/";
	   $name = $_POST['name'];
	   $target_file = $target_dir . $name;
	   if($_FILES["file"]["size"]>0){
		   if(move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)){
			   echo '0';
		   }else{
			   echo '1';
		   }
	   }else{
		   
		   echo '1';
	   }
	   
		
		 // $target_dir = "./upload/";
		 // $name = $_POST['name'];
		// $path_parts = pathinfo($_FILES["file"]["name"]); 
		// $extension = $path_parts['extension'];
		// $s = substr(str_shuffle(str_repeat("0123456789abcdefghijklmnopqrstuvwxyz", 5)), 0, 5);
		// $target_file = $target_dir .$s.".".$extension;
		 // move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);
		
	}
	
	public function get_make_name(){
		 $makeid = $this->input->GET('makeid');
		 $make=$this->DealerModel->get_make_name($makeid);
		echo json_encode($make);
	}
	
	
}
