<?php
error_reporting(0);
class Home_Controller extends CI_Controller {


    public function __construct()
  {
    parent::__construct();
    
	$this->load->model('User/HomeModel');
     $this->load->library('session');
     $this->load->library('email');
     include_once('vtwsclib/Vtiger/WSClient.php');
      
	
   }
   
   public function get_make()
   {
	    $country=$this->input->get('country'); 
		$data=$this->HomeModel->get_make($country);
		echo json_encode($data);
   } 
  public function get_make_id(){
      $makename=$this->input->get('makename'); 
		$data=$this->HomeModel->get_make_id($makename);
		echo json_encode($data);
  
  }
   public function get_featuredmake()
   {
	    $country=$this->input->get('country'); 
		$data=$this->HomeModel->get_featuredmake($country);
		echo json_encode($data);
   }
   public function getmodels()
   {
	   $models=array();
	   $model=$_GET['info'];	
	   $all_models=$this->HomeModel->get_all_models_ofmake($model);
	   for($i=0;$i<sizeof($all_models);$i++){
	       $data=$this->HomeModel->get_min_model($model,$all_models[$i]['model']);
		   array_push($models,$data[0]);
	   }
	   //$getmodel=$this->HomeModel->getmodels($model);
	   	echo json_encode($models);
	
   }
	
   function get_vehicle_data(){
	   $year=$this->input->get('year');
	   $make=$this->input->get('make');
	   $model=$this->input->get('model');
	   $data=$this->HomeModel->get_vehicle_data($year,$make,$model);
	   echo json_encode($data);
   }
    
    public function select_year()
    {
        $makeinfo=$_GET['makeinfo'];
	   $modelinfo=$_GET['modelinfo'];
	   $getmodel=$this->HomeModel->select_year($makeinfo,$modelinfo);
	    echo json_encode($getmodel);
	   
    
    }
   public function get_trim()
   {
	     $makeinfo=$_GET['makeinfo'];
	    $modelinfo=$_GET['modelinfo'];
	   $getmodel=$this->HomeModel->get_trim($makeinfo,$modelinfo);
	   echo json_encode($getmodel);
	   
   }
   
   public function get_trim_img()
   {
	  $triminfo=$_GET['triminfo']; 
	  $makeinfo=$_GET['makeinfo']; 
	  $modelinfo=$_GET['modelinfo']; 
	  $getmodel=$this->HomeModel->get_trim_img($triminfo,$makeinfo,$modelinfo);
	  echo json_encode($getmodel);
   }
	

	public function find_dealership()
	{
		
		$min_lat = $_POST['min']['min_lat'];
		$min_lng = $_POST['min']['min_lng'];
		$max_lat = $_POST['max']['max_lat'];
		$max_lng = $_POST['max']['max_lng'];
		$makeinfo = $_POST['makeinfo'];
		$modelinfo = $_POST['modelinfo'];
		$a=array();
		$getdealer=$this->HomeModel->find_dealership($min_lat,$min_lng,$max_lat,$max_lng,$makeinfo,$modelinfo);
	
		if($getdealer)
        {
				foreach($getdealer as $dealer)
				{
					$current_lat=$_POST['current_lat'];
					$current_lng=$_POST['current_lng'];
					//echo json_encode($getdealer);
					$distance=(json_decode(file_get_contents("https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=".$current_lat.",".$current_lng."&destinations=".$dealer['latitude'].",".$dealer['longitude']."&key=AIzaSyCq81yiJ96xIHmVa4SenHaqpgv9Fo2fCZw"))->rows[0]->elements[0]->distance->text);
					array_push($dealer,$distance);
					//$a=array($dealer);
					array_push($a,$dealer);
					//print_r($getdealer);
					//$dealer['distance']=$distance;
									
				}	//print_r(json_decode(file_get_contents("https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=$getdealer['latitude'],$getdealer['longitude']&destinations=19.0760,72.8777&key=AIzaSyD3N_fkib6Ryt0EMFfReFc3jMX7IWtCc9s"))->rows[0]->elements[0]->distance->text);
			 echo json_encode($a);
        }else
        {
            echo "No data";
        }
	}
	
	public function get_par_dealer()
	{
		$single_dealer=$_GET['dealerinfo'];
	// print_r($single_dealer);
	$getdealer=$this->HomeModel->get_par_dealer($single_dealer);
	  echo json_encode($getdealer);
		
	}
	
	 public function get_time()
	{
		 $single_dealer=$_GET['dealertime'];
		$time=$_GET['daynm'];
		$time_close=$_GET['dayclose'];
	 $getdealer_time=$this->HomeModel->get_time($single_dealer,$time,$time_close);
	   echo json_encode($getdealer_time);
		// echo $time;
		
	 }
	
	
	
/********************************************** Start Finnancing *************************************************************/	
	
public function add_user(){
	
    $user_info=json_decode($_GET['user']);
	 $edata=json_decode($_GET['edata']);
    
 $user_info->role='user';	
 $user_info->registered_date=date('d-m-Y h:i:s');	
  $user_id=$this->HomeModel->add_user($user_info);
	
	
	
	$edata->user_id=$user_id;
	$edata->enq_date=date('d-m-Y h:i:sa');
	echo $id=$this->HomeModel->add_edata($edata);
	
	$email=$user_info->email;
	$sessiondata = array(
		'islogged_in' => true,
		'user_id'  => $user_id,
		'email'    => $email
	);

   $this->session->set_userdata($sessiondata);
	
	
}	
public function edit_edata(){
 $edata=json_decode($_GET['edata']);
	$uid=$this->input->get('userid');
 $this->HomeModel->edit_edata($edata,$uid);	
	
}	
public function add_resi_info(){
	//$res_id=$this->session->userdata('recordid'); 

   $resi_info=json_decode($_GET['resi_info']);
   $user_id=$this->input->get('userid');
   $resi_info->user_id=$user_id;
   $this->HomeModel->add_residential_info($resi_info);
}	
public function add_emp_info(){
  $emp=json_decode($_GET['emp']);
  $user_id=$this->input->get('userid');
  $emp->user_id=$user_id;
  $this->HomeModel->add_employment_details($emp);
}	
public function add_identification_info(){
	echo $user_id=$this->input->get('userid');
	$license_number=$this->input->get('license_number');
	$SSN=$this->input->get('SSN');
    echo $this->HomeModel->add_identification_info($license_number,$SSN,$user_id);
}	
	
public function add_lead(){
 // $user_info=json_decode($_GET['user']);
  //$emp=json_decode($_GET['emp']);
  //$resi_info=json_decode($_GET['resi_info']);
	
// $enquiry_data=json_decode($_GET['enquiry_data']);
	
 //$user_info->role='user';	
 //$user_id=$this->HomeModel->add_user($user_info);
	
 //$emp->user_id=$user_id;
 //$resi_info->user_id=$user_id;
 //$enquiry_data->user_id=$user_id;
	
 //$this->HomeModel->add_employment_details($emp);
 //$this->HomeModel->add_residential_info($resi_info);
// $this->HomeModel->add_enquiry_data($enquiry_data);
 
}
	
public function check_email(){
   $email=$this->input->get('email');
   $d=$this->HomeModel->check_email($email);
	if(sizeof($d)>0){
	   echo '1';
	}else{
	   echo '0';
	}
}
public function get_make_name(){
     $makeid=$this->input->get('makeid');
	 $make=$this->HomeModel->get_make_name($makeid);
	 print_r($make);
}	
public function edit_user(){
  $userid=$this->input->get('userid');
  $user_info=json_decode($_GET['user']);
  $this->HomeModel->edit_user($user_info,$userid);
}
public function edit_residential_info(){
  $userid=$this->input->get('userid');
  $resi_info=json_decode($_GET['resi_info']);
  $this->HomeModel->edit_residential_info($resi_info,$userid);
}
public function edit_employment_info(){
  $userid=$this->input->get('userid');
  $emp=json_decode($_GET['emp']);
  $this->HomeModel->edit_employment_info($emp,$userid);
}	
public function add_enquiry_data(){
	 $enq_data=json_decode($_GET['cal']);
     //$userid=$this->input->get('userid');
	echo $enquiry_id=$this->HomeModel->add_enquiry_data($enq_data);
    
}
public function edit_cal_data(){
     $cal_data=json_decode($_GET['calc']);
	 $enquiry_id=$this->input->get('enq_id');
	echo $data=$this->HomeModel->edit_cal_data($cal_data,$enquiry_id);
}		
/********************************************** End Finnancing *************************************************************/	
	
	
public function slider(){

$make=$this->input->post('make');
$model=$this->input->post('model');
    
$data=$this->HomeModel->slider($make,$model);
    foreach($data as $row){
    
    print_r($row);  
    }
    
}	
	
/********************************************** Start Vtiger *************************************************************/		
public function	 integrate_vtiger(){
  
$url = 'https://instaa.od2.vtiger.com';
$client = new Vtiger_WSClient($url);

$login = $client->doLogin('jeremy@jeremyhughes.com', 'iIpLoQIj9X6rXLqp');
if(!$login) 
{
	echo 'Login Failed';
}else
{
	$module = 'Leads';
    $record = $client->doCreate($module,Array(
		'lastname'=>'sdfcs',
		'firstname'=>'dsdd',
		'phone'=>'dfdfv',
		'email'=>'dfcccsxs@sasdd.com',
		'lane'=>'',
		'city'=>'',
		'state'=>'',
		'code'=>'',
		'country'=>'',
		'designation'=>'',
	));
	print_r($record);
  if($record) {
	echo $recordid = $client->getRecordId($record['id']);
	}
	
 }	
}
	
public function add_leads_tovtiger(){
    $leads=$this->HomeModel->get_leads();
	$url = 'https://instaa.od2.vtiger.com';
	$client = new Vtiger_WSClient($url);

	 $login = $client->doLogin('jeremy@jeremyhughes.com', 'iIpLoQIj9X6rXLqp');
	print_r($login);
	if(!$login) 
	{
		echo 'Login Failed';
	}else
	{
		$module = 'Leads';
		for($i=0;$i<sizeof($leads);$i++){
			
			
			$datetime1 = strtotime($leads[$i]['registered_date']);
			$datetime2 = strtotime(date('d-m-Y h:i:s'));
			$interval  = abs($datetime2 - $datetime1);
			$minutes   = round($interval / 60);
			
			if($minutes<=15){
			
			}else{
		
			 $resi_info=$this->HomeModel->get_leads_resi_info($leads[$i]['user_id']);

			 if($resi_info){
			   $lane=$resi_info[0]['address'].','.$resi_info[0]['address2'];
			   $city=$resi_info[0]['city']; 
			   $state=$resi_info[0]['state']; 
			   $code=$resi_info[0]['postcode']; 
			   $country=$resi_info[0]['country']; 
			 }else{
			     $lane='';
			     $city=''; 
			     $state=''; 
			     $code='';
				  $country='';
			 }
			
			$emp_info=$this->HomeModel->get_leads_emp_info($leads[$i]['user_id']);


			if($emp_info){
			   $designation=$emp_info[0]['emp_title'];
			   
			 }else{
			     $designation='';
			 }
				
			$enq_info=$this->HomeModel->get_enquiry_info($leads[$i]['user_id']);
			if($enq_info){
				
			     $make=$enq_info[0]['make_name'];
                 $model=$enq_info[0]['model'];
                 $tradein=$enq_info[0]['estimated_trade'];
                 $dealernm=$enq_info[0]['name'];
				 $enquiry_date=$enq_info[0]['enq_date'];
				
			}else{
			
				 $make='';
                 $model='';
                 $tradein='';
                 $dealernm='';
			     $enquiry_date='';
			}	
				
			$record = $client->doCreate($module,Array(
				'lastname'=>$leads[$i]['lastname'],
				'firstname'=>$leads[$i]['firstname'],
				'phone'=>$leads[$i]['phone_no'],
				'email'=>$leads[$i]['email'],
				'lane'=>$lane,
				'city'=>$city,
				'state'=>$state,
				'code'=>$code,
				'designation'=>$designation,
				
				'company'=>$make,
				'primary_twitter'=>$model,
				'noofemployees'=>$tradein,
				'description'=>$dealernm,
				'website'=>$enquiry_date,
				'country'=>$country
			));
			if($record) {
				 $recordid = $client->getRecordId($record['id']);
				 $this->HomeModel->add_vtigerid($leads[$i]['user_id'],$recordid); 
			}
		 }
	  }	
   }	
}	
/********************************************** End Vtiger *************************************************************/			

public function get_page_data(){
	$page_name=$this->input->get('page_name');
    $data=$this->HomeModel->get_page_data($page_name);
	echo json_encode($data);
}
public function get_disclosure_data(){
	$country=$this->input->get('country');
	if($country=='AU'){
	  $id=12;
	}elseif($country==11){
	  $id=11;
	}
    $data=$this->HomeModel->get_disclosure_data($id);
	echo json_encode($data);
}	
	
	
}