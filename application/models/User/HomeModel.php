<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class HomeModel extends CI_Model {

public function __construct()
{
   parent::__construct();
   $this->load->database('');
}

public function index(){

}
public function add_edata($edata){
  $this->db->insert('enquiry_details',$edata);
	return $this->db->insert_id();
}
public function edit_edata($edata,$uid){
    $this->db->where('user_id',$uid);
	$this->db->update('enquiry_details',$edata);
}
public function get_make_id($makename){
    $this->db->select('*');
    $this->db->from('make');
	$this->db->where('make_name',$makename);
return $this->db->get()->result_array();
}
public function get_enquiry_info($userid){
    $this->db->select('*');
    $this->db->from('enquiry_details');
	$this->db->join('vehicle',"enquiry_details.vehicle_id=vehicle.vehicle_id");
	$this->db->join('make',"make.make_id=vehicle.make");
	$this->db->join('dealer',"enquiry_details.dealer_id=dealer.dealer_id");
	$this->db->where('user_id',$userid);
   return $this->db->get()->result_array();
$this->db->select('make.*');
	$this->db->distinct();
    $this->db->from('make');
	$this->db->join('vehicle',"make.make_id=vehicle.make");
	$this->db->where('featured',0);
}	
	
public function get_make($country){
	$this->db->select('make.*');
	$this->db->distinct();
    $this->db->from('make');
	$this->db->join('vehicle',"make.make_id=vehicle.make");
	$this->db->where('featured',0);
	$this->db->where('vehicle.status',1);
	$where = "FIND_IN_SET('".$country."', make.makeCountry)";  
    $this->db->where( $where );
	 $this->db->where('make.make_status',1);
	$this->db->order_by("make.make_name", "asc"); 
     return $this->db->get()->result_array();
}
public function get_featuredmake($country){
	$this->db->select('make.*');
	$this->db->distinct();
    $this->db->from('make');
	$this->db->join('vehicle',"make.make_id=vehicle.make");
	$this->db->where('featured',1);
	$this->db->where('vehicle.status',1);
	$where = "FIND_IN_SET('".$country."', make.makeCountry)";  
    $this->db->where( $where );
	 $this->db->where('make.make_status',1);
	$this->db->order_by("make.make_name", "asc");
   return $this->db->get()->result_array();
}
	
public function get_vehicle_data($year,$make,$model){

	$this->db->select('*');
        $this->db->from('vehicle');
	$this->db->join('make',"vehicle.make=make.make_id");
	$this->db->where('year',$year);
	$this->db->where('make',$make);
	$this->db->where('model',$model);
	$this->db->order_by('msrp_price',ASC);
	
   return $this->db->get()->result_array();
	
}
	


public function getmodels($model)
{
	/*$my_query="
SELECT * FROM vehicle WHERE status = 1 AND make = $model GROUP BY model ORDER BY msrp_price ASC";
	
	 $query = $this->db->query($my_query)->result_array();

	return $query;*/
	//return $this->db->last_query();
	/*$this->db->select('*','MIN(msrp_price)');
	 $this->db->group_by('model');
    $this->db->from('vehicle');	
	$this->db->where('make',$model);
	$this->db->where('status',1);
	$this->db->order_by('msrp_price',ASC);
	 
	return $this->db->get()->result_array();*/
	
	
	
	$my_query="SELECT *
FROM vehicle INNER JOIN make ON make.make_id=vehicle.make
WHERE msrp_price IN
  (SELECT min(msrp_price) 
   From vehicle
   GROUP BY model) AND status = 1 AND make='".$model."' ORDER BY model ASC";
	
	 $query = $this->db->query($my_query)->result_array();

	return $query;
	
	
	
	
	
}
	public function get_min_model($make,$model){
	
	$my_query="SELECT *
FROM vehicle JOIN make ON make.make_id=vehicle.make
WHERE status = 1 AND make='".$make."' AND model='".$model."' ORDER BY msrp_price ASC";
	
	 $query = $this->db->query($my_query)->result_array();

	return $query;
	
	}
	public function get_all_models_ofmake($make){
	   $my_query="SELECT DISTINCT model FROM vehicle WHERE status = 1 AND make='".$make."' ORDER BY model ASC";
	
	 $query = $this->db->query($my_query)->result_array();

	return $query;
	
	}
public function get_trim($make,$model)
{

	$this->db->select('*');
    $this->db->from('vehicle');	
	$this->db->where('make',$make);	
	$this->db->where('model',$model);	
	
	 return $this->db->get()->result_array();
	
 }


	
public function select_year($make,$model)
{

	$this->db->select('year');
	$this->db->distinct();
    $this->db->from('vehicle');	
	$this->db->where('make',$make);	
	$this->db->where('model',$model);	
	
	return $this->db->get()->result_array();
	
 }
 
 public function get_trim_img($trim,$make,$model)
 {
	 $this->db->select('*');
    $this->db->from('vehicle');	
	$this->db->where('trim',$trim);	
	$this->db->where('make',$make);	
	
	$this->db->where('model',$model);	
	 return $this->db->get()->result_array();
	 
 }
 
 public function find_dealership($min_lat,$min_lng,$max_lat,$max_lng,$makeinfo,$modelinfo)
  {
	
	 $my_query="select * from `dealer` `d`,`make` `m` where `d`.`latitude` BETWEEN ".$min_lat." AND ".$max_lat." AND `d`.`longitude` BETWEEN ".$min_lng." AND ".$max_lng." AND `d`.`make`=".$makeinfo." and `m`.`make_id`=`d`.`make` and `d`.`status`='1'";
	  //$my_query="select * from `dealer` `d` where `d`.`latitude` BETWEEN ".$min_lat." AND ".$max_lat." AND `d`.`longitude` BETWEEN ".$min_lng." AND ".$max_lng." AND `d`.`make`=".$makeinfo." AND `d`.`model`='".$veh_id."'";
	 $query = $this->db->query($my_query)->result_array();
	  if($query)
	  {
			return $query;  
	  }
	
	//return $my_query;
 }

 public function get_par_dealer($single_dealer)
 {
	 // return $single_dealer;
	 
	$this->db->select('*');
    $this->db->from('dealer');	
	$this->db->where('dealer_id',$single_dealer);	
	 return $this->db->get()->result_array();
	 
	 $this->db->select('*');
	 $this->db->from('shop_timing');
	 
 }
  public function get_time($single_dealer,$time,$time_close)
  {
	  //echo $time_close;
	  $array = array( $time,$time_close  
	  );
	  $this->db->select($array);
     $this->db->from('shop_timing');	
	 $this->db->where('dealer_id',$single_dealer);	
	return $this->db->get()->result_array();
	 // $this->db->last_query();
 } 
	
	
/********************************************** Start Finnancing *************************************************************/	
public function add_user($user_info){
  $this->db->insert('user',$user_info);
  return $this->db->insert_id();
}
public function add_employment_details($emp){
  $this->db->insert('employment_details',$emp);
}
public function add_residential_info($resi_info){
  $this->db->insert('residence_details',$resi_info);
}
	
public function add_enquiry_data($enquiry_data){
	$this->db->insert('enquiry_details',$enquiry_data);
	return $this->db->insert_id();
}
public function add_identification_info($license_number,$SSN,$user_id){
  $this->db->set('license_number',$license_number);
  $this->db->where('user_id',$user_id);
  $this->db->update('user');
	return $this->db->last_query();
	
}
	
public function check_email($email){
   $this->db->select('*');
    $this->db->from('user');	
	$this->db->where('email',$email);	
	 return $this->db->get()->result_array();
}
public function get_make_name($makeid){
    $this->db->select('*');
    $this->db->from('make');	
	$this->db->where('make_id',$makeid);	
	 return $this->db->get()->result_array();
}	
public function edit_user($userinfo,$userid){
  $this->db->where('user_id',$userid);
  $this->db->update('user',$userinfo);
}
public function edit_residential_info($resi_info,$userid){
  $this->db->where('user_id',$userid);
  $this->db->update('residence_details',$resi_info);
	
}
public function edit_employment_info($emp,$userid){
  $this->db->where('user_id',$userid);
  $this->db->update('employment_details',$emp);
}
public function edit_cal_data($calc_data,$enq_id){
  $this->db->where('enquiry_id',$enq_id);
  $this->db->update('enquiry_details',$calc_data);
	return $this->db->last_query();
}	
	
	
/********************************************** End Finnancing *************************************************************/	
 public function slider($make,$model){
 
 return $this->db->select('imgs')->from('vehicle')->where('make',$make)->where('model',$model)->get()->result_array();
	
 
 
 }
	
public function get_leads(){
     $this->db->select('*');
     $this->db->from('user');	
	 $this->db->where('role','user');
	 $this->db->where('vtiger_id',0);
	 return $this->db->get()->result_array();
}
public function add_vtigerid($userid,$recordid){
	 $this->db->set('vtiger_id',$recordid);
     $this->db->where('user_id',$userid);
     $this->db->update('user');
}	
public function get_leads_resi_info($userid){
     $this->db->select('*');
     $this->db->from('residence_details');	
	 $this->db->where('user_id',$userid);
	 return $this->db->get()->result_array();
}	
public function get_leads_emp_info($userid){
     $this->db->select('*');
     $this->db->from('employment_details');	
	 $this->db->where('user_id',$userid);
	 return $this->db->get()->result_array();
}

public function get_page_data($page_name){
     $this->db->select('*');
     $this->db->from('pages');	
	 $this->db->where('page_name',$page_name);
	 return $this->db->get()->result_array();
}
public function get_disclosure_data($id){
     $this->db->select('*');
     $this->db->from('disclosures');	
	 $this->db->where('disc_id',$id);
	 return $this->db->get()->result_array();
}
	
	
	
}