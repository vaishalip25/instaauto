<?php
error_reporting(0);
class Calculator_Controller extends CI_Controller {


    public function __construct()
  {
    parent::__construct();
	$this->load->model('Admin/calculatorModel');
     $this->load->library('session');
     $this->load->library('email');
   }
   
	public function getdata(){
	
		$data=$this->calculatorModel->getdata();
		echo json_encode($data);
	}
	public function save_cal()
	{
		$calc=$_GET['info'];
		
		$calculator = json_decode($calc);
		echo $c=$this->calculatorModel->save_cal($calculator);
		//echo $s;
	}
	
	
	
	public function save_cal_aus()
	{
		$calc=$_GET['info'];
		
		$calculator = json_decode($calc);
		echo $c=$this->calculatorModel->save_cal_aus($calculator);
		//echo $s;
	}
	public function getdata_aus(){
	
		$data=$this->calculatorModel->getdata_aus();
		echo json_encode($data);
	}
	
	
}