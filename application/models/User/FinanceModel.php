<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class FinanceModel extends CI_Model {

public function __construct()
{
   parent::__construct();
   $this->load->database('');
}

public function index(){

}

public function get_calculator_values(){
    $this->db->select('*');
	$this->db->from('calculator_default');
	$this->db->where('cal_contry','AUS');
	return $this->db->get()->result_array();
}
	
public function get_userdata($userid){
     $this->db->select('*');
	 $this->db->from('user');
	 $this->db->where('user_id',$userid);
	return $this->db->get()->result_array();

}	
public function add_edata($edata){
  $this->db->insert('enquiry_details',$edata);
}
public function get_personal_data($enquiry_id){
     $this->db->select('*');
	 $this->db->from('user');
	 $this->db->where('enq_id',$enquiry_id);
	return $this->db->get()->result_array();
}
	
public function edit_edata($edata,$uid){
  $this->db->where('user_id',$uid);
	$this->db->update('enquiry_details',$edata);
}
	
	
public function get_residence_data($userid){
     $this->db->select('*');
	 $this->db->from('residence_details');
	 $this->db->where('user_id',$userid);
	return $this->db->get()->result_array();
}
public function get_emplyoment_data($userid){
     $this->db->select('*');
	 $this->db->from('employment_details');
	 $this->db->where('user_id',$userid);
	return $this->db->get()->result_array();
}
public function get_enquiry_details($userid){
	
	 $this->db->select('*');
	 $this->db->from('enquiry_details');
	// $this->db->join('enquiry_details','enquiry_details.enquiry_id=user.enq_id');
	 $this->db->where('user_id',$userid);
	 return $this->db->get()->result_array();
}

public function get_lead_data($uid){
	 $this->db->select('*');
	 $this->db->from('user');
	 $this->db->join('residence_details','user.user_id=residence_details.user_id');
	 $this->db->join('employment_details','user.user_id=employment_details.user_id');
	 $this->db->join('enquiry_details','user.user_id=enquiry_details.user_id');
	 $this->db->where('user.user_id',$uid);
	return $this->db->get()->result_array();
}
public function get_enquiry($uid){
     $this->db->select('*,enquiry_details.down_payment as ed,enquiry_details.terms as et');
	 $this->db->from('enquiry_details');
	 $this->db->join('vehicle','enquiry_details.vehicle_id=vehicle.vehicle_id');
	 $this->db->join('dealer','enquiry_details.dealer_id=dealer.dealer_id');
	$this->db->join('make','make.make_id=vehicle.make');
	 $this->db->where('enquiry_details.user_id',$uid);
	return $this->db->get()->result_array();
}
public function add_vtigerid($userid,$recordid){
	 $this->db->set('vtiger_id',$recordid);
     $this->db->where('user_id',$userid);
     $this->db->update('user');
}
public function update_enquiry($enq_id){
	 $this->db->set('enq_submitted',1);
     $this->db->where('enquiry_id',$enq_id);
     $this->db->update('enquiry_details');
}

public function add_identification_info($security,$country,$user_id){
	
	if($country=='aus'){
	  $this->db->set('license_number',$security->security);
	}else if($country=='us'){
	  $this->db->set('social_security_no',$security->security);
	}
	
	if($security->liscence_state){
	  $this->db->set('liscence_state',$security->liscence_state);
	}
	
	if($security->credit_history){
	   $this->db->set('credit_history',$security->credit_history);
	}
    $this->db->where('user_id',$user_id);
    $this->db->update('user');
	return $this->db->last_query();
	
}
public function submit_final_form($user_id){
  $this->db->set('form_submitted',1);
  $this->db->where('user_id',$user_id);
  $this->db->update('user');
  return $this->db->last_query();
	
}
public function get_disclosures(){
     $this->db->select('*');
	 $this->db->from('disclosures');
	return $this->db->get()->result_array();
}
public function get_selected_vehicle($vehicle_id){
     $this->db->select('*');
	 $this->db->from('vehicle');
	 $this->db->where('vehicle_id',$vehicle_id);
	 return $this->db->get()->result_array();

}	

public function do_login($email,$pwd){
     $this->db->select('*');
	 $this->db->from('user');
	 $this->db->where('email',$email);
	 $this->db->where('password',$pwd);
	 $this->db->where('role','user');
	 return $this->db->get()->result_array();
}
public function check_email($email){
     $this->db->select('*');
	 $this->db->from('user');
	 $this->db->where('email',$email);
	 return $this->db->get()->result_array();
  
}
	
public function reset_password($user_id,$pwd){
  $this->db->set('password',$pwd);
  $this->db->where('user_id',$user_id);
  $this->db->update('user');
	return $this->db->last_query();
	
}
 
}