<?php
error_reporting(0);
class Vehicle_Controller extends CI_Controller {


    public function __construct()
  {
    parent::__construct();
	$this->load->model('Admin/VehicleModel');
     $this->load->library('session');
     $this->load->library('email');
	  
   }
   	
   public function viewVehicle()
	{
	$v=$this->VehicleModel->viewVehicle();
	for($i=0;$i<sizeof($v);$i++){
	   $m=$this->VehicleModel->get_make_name($v[$i]['make']);
	   $v[$i]['make_name']=$m[0]['make_name'];
	}	
		echo json_encode($v);
	$this->ckeditor->basePath = base_url().'assets/ckeditor/';
	$this->ckeditor->config['toolbar'] = array(
    array( 'Source', '-', 'Bold', 'Italic', 'Underline', '-','Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo','-','NumberedList','BulletedList' )
                                                    );
	$this->ckeditor->config['language'] = 'it';
	$this->ckeditor->config['width'] = '730px';
	$this->ckeditor->config['height'] = '300px';      
     	     
     	
    }
	
	public function Add_vehicle()
	{
		$veh=$_POST['info'];
		$vehicle = $veh;
		$dt=date("Y-m-d");
		$vehicle->added_date=$dt;
		echo $s=$this->VehicleModel->Add_vehicle($vehicle);
			
	}
	
	public function Update_vehicle()
	{
           $data=json_decode($_GET['vdata']);
		   unset($data->featured);
		   unset($data->make_status);
		  unset($data->make_status);
		
		//echo $s=$this->VehicleModel->Update_vehicle($_POST['vehinfo']);
		echo $s=$this->VehicleModel->Update_vehicle($data);
	}
	
	
	
	public function updateimg()
	{
		
		$par_img=$_GET['imgs'];	
		$path = './upload/'.par_img;
		unlink($path);
		$im=$this->VehicleModel->updateimg($_GET['id'],$_GET['vehid']);
		print_r($im);
	}
	
	public function getMakes()
	{
		echo json_encode($this->VehicleModel->get_makes());
	}
	
	
	public function deleteVehicle()
	{
		$this->VehicleModel->delete_vehicle($_GET['id']);
	}
	
	public function toggle_status()
	{
		//echo $_GET['status'];
		$this->VehicleModel->toggle_status($_GET['status'],$_GET['id']);
	}
	
	public function searchvehicle()
	{
		$data=json_decode($_GET['search']);
		$v=$this->VehicleModel->searchvehicle($data);
		for($i=0;$i<sizeof($v);$i++){
		   $m=$this->VehicleModel->get_make_name($v[$i]['make']);
		   $v[$i]['make_name']=$m[0]['make_name'];
		}
		echo json_encode($v);
	}
	public function insert_csv_data(){
		$data=json_decode($_GET['newdata']);
	    $array = array();
        $array = $data;
		$count = sizeof($data);
		$date=date('Y-m-d');
		$r_count = 0;
        foreach($array as $key =>$value){ 
		  $make=$this->VehicleModel->get_make_id($array[$key]->make);
		  
		  if(!empty($make)){
			  $mid=$make[0]['make_id'];
		  }else{
			  $makecountry=$array[$key]->country.',IN';
			  $m=array('make_name'=>$array[$key]->make,'make_status'=>1,'makeCountry'=>$makecountry);
			  $mid=$this->VehicleModel->add_make($m);
			  
		  }
		  $vehicle=array(
		                'select_coun'=>$array[$key]->country,
						'make' => $mid,
						'model' => $array[$key]->model,
						'trim' => $array[$key]->trim,
						'year' => $array[$key]->year,
						'vehicle_type'=>$array[$key]->type,
						'description' => $array[$key]->description,
						'dap_price' => $array[$key]->dap_price,
						'msrp_price' => $array[$key]->msrp_price,
						'special_price' => $array[$key]->special_price,
						'offer_price'=>$array[$key]->offer_price,
						'offer_end' => $array[$key]->offer_end,
			            'down_payment' => $array[$key]->down_payment,
						'interest' => $array[$key]->interest,
					    'taxrate' => $array[$key]->tax_rate,
					    'terms' => $array[$key]->terms,
						'specialrepayment' => $array[$key]->special_repayment,
						'monthly_pay' => $array[$key]->monthly_pay,
						
		  );
		  
		   $c=$this->VehicleModel->check_vehicle_existance($vehicle);
		   if(!empty($c)){
			 $r_count++;
		   }else{
			   $vehicle['added_date']=$date;
			    $vehicle['status']=1;
			   $data= $this->VehicleModel->insert_csv_data($vehicle);
		   }
		}
		
	echo $r_count;
		
	}
	
//********************************************************************FUEL API*********************************************************//
	
public function get_fuel_data(){
	$fuel_makedata=file_get_contents('https://api.fuelapi.com/v1/json/makes?api_key=cd6a3933-5d06-4d54-8ad5-a35ab4bd6b29');
	$fuel_makes=json_decode($fuel_makedata);
	for($i=0;$i<sizeof($fuel_makes);$i++){
		$makeid=$fuel_makes[$i]->id;
	    $d=$this->VehicleModel->check_make_existance($makeid);
		if(sizeof($d)==0){
		    $this->VehicleModel->add_fuel_make($fuel_makes[$i]);
			$api_url='https://api.fuelapi.com/v1/json/models?makeID='.$makeid.'&api_key=cd6a3933-5d06-4d54-8ad5-a35ab4bd6b29';
			$fuel_modeldata=file_get_contents($api_url);
			$fuel_models=json_decode($fuel_modeldata);
		    for($j=0;$j<sizeof($fuel_models);$j++){
				$model_id=$fuel_models[$j]->id;
				$fuel_models[$j]->fuel_makeid=$makeid;
			    $d1=$this->VehicleModel->check_model_existance($model_id);
			    if(sizeof($d1)==0){
				     $this->VehicleModel->add_fuel_model($fuel_models[$j]);
				}
			}
			
		}
	}
	
}
	
public function get_fuel_make_data(){
  $makes=$this->VehicleModel->get_fuel_make_data();
  echo $data=json_encode($makes);
}	
	
public function get_fuel_model_data(){
  $makeid=$this->input->get('makeid');
  $year=$this->input->get('year');
  $models=$this->VehicleModel->get_fuel_model_data($makeid,$year);
  echo $data=json_encode($models);
}	
public function get_fuel_trims(){
	
    $makeid=$this->input->get('makeid');
	$modelid=$this->input->get('modelid');
	$year=$this->input->get('year');
	
	  //$api_url='https://api.fuelapi.com/v1/json/vehicles/?year='.$year.'&modelID='.$modelid.'&makeID='.$makeid.'&api_key=cd6a3933-5d06-4d54-8ad5-a35ab4bd6b29';
	   $api_url='https://api.fuelapi.com/v1/json/vehicles/?year='.$year.'&modelID='.$modelid.'&makeID='.$makeid.'&api_key=cd6a3933-5d06-4d54-8ad5-a35ab4bd6b29';
	  
	echo $v=file_get_contents($api_url);
	
	//echo $vehicles=json_decode($v);
	//echo json_encode($vehicles);
    /*if(sizeof($vehicles)!=0){
	  for($i=0;$i<sizeof($vehicles);$i++){
	      $vehicleid=$vehicles[$i]->id;
		  $vehicle_api='https://api.fuelapi.com/v1/json/vehicle/'.$vehicleid.'/?api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1';
		  $v_data=file_get_contents($vehicle_api);
	      $vehicle_data=json_decode($v_data);
		  print_r($vehicle_data);
	  }
	}*/
}	
public function get_fuel_images(){
  $vahicleid=$this->input->get('vahicleid');
  //$vehicle_api='https://api.fuelapi.com/v1/json/vehicle/'.$vahicleid.'/?api_key=cd6a3933-5d06-4d54-8ad5-a35ab4bd6b29';
  $vehicle_api='https://api.fuelapi.com/v1/json/vehicle/'.$vahicleid.'/?api_key=cd6a3933-5d06-4d54-8ad5-a35ab4bd6b29';
  
  
  echo $v_data=file_get_contents($vehicle_api);
  //$vehicle_data=json_decode($v_data);
  //print_r($vehicle_data);
	
}
	
}
