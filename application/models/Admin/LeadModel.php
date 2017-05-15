<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class LeadModel extends CI_Model {

public function __construct()
{
   parent::__construct();
   $this->load->database('');
}

public function index(){

}

public function get_lead(){

	$this->db->select('*, 
   user.email as uemail,
   residence_details.address as uaddress,
   residence_details.address2 as uaddress2,
   residence_details.city as ucity,
   residence_details.state as ustate,
   residence_details.postcode as upostcode,
   ');
	$this->db->from('user');
	$this->db->join('residence_details','user.user_id=residence_details.user_id','left');
	$this->db->join('employment_details','user.user_id=employment_details.user_id','left');
	$this->db->where('user.role','user');
	return $this->db->get()->result_array();
}
	
public function get_enq($userid){
	$this->db->select('*');
	$this->db->from('enquiry_details');
	$this->db->where('user_id',$userid);
	$this->db->order_by('enquiry_id','DESC');
	return $this->db->get()->result_array();
}	
public function get_detaillead($info){

   $this->db->select('*,
   dealer.email as demail,
   user.email as uemail,
   dealer.address as daddress,
   residence_details.address as uaddress,
   residence_details.address2 as uaddress2,
   dealer.address2 as daddress2,
   residence_details.city as ucity,
   dealer.city as dcity,
   residence_details.state as ustate,
   dealer.state as dstate,
   dealer.country as dcountry,
   residence_details.postcode as upostcode,
   dealer.postcode as dpostcode,
   vehicle.model as vmodel');
	$this->db->from('user');
	$this->db->join('residence_details','user.user_id=residence_details.user_id','left');
	$this->db->join('employment_details','user.user_id=employment_details.user_id','left');
	$this->db->join('enquiry_details','user.user_id=enquiry_details.user_id','left');
	$this->db->join('vehicle','vehicle.vehicle_id=enquiry_details.vehicle_id','left');
	$this->db->join('dealer','dealer.dealer_id=enquiry_details.dealer_id','left');
	$this->db->join('make','vehicle.make=make.make_id','left');
	$this->db->where('user.user_id',$info->user_id);
	$this->db->where('user.role','user');
	return $this->db->get()->result_array();


}
	
public function search($info){

   $this->db->select('*, 
   user.email as uemail,
   residence_details.address as uaddress,
   residence_details.address2 as uaddress2,
   residence_details.city as ucity,
   residence_details.state as ustate,
   residence_details.postcode as upostcode,
   ');
	$this->db->from('user');
	$this->db->join('residence_details','user.user_id=residence_details.user_id','left');
	$this->db->join('employment_details','user.user_id=employment_details.user_id','left');
	
	$where = "user.role='user' 
          AND 
          (user.email LIKE '%$info%' 
          OR user.firstname LIKE '%$info%' 
          OR user.lastname LIKE '%$info%'
		  OR residence_details.city LIKE '%$info%'
		  OR residence_details.state LIKE '%$info%'
		  OR employment_details.emp_title LIKE '%$info%')";
    $this->db->where($where);
	return $this->db->get()->result_array();


}
	
public function get_single_lead_data($userid){
  $this->db->select('*,
   dealer.email as demail,
   user.email as uemail,
   dealer.address as daddress,
   dealer.address2 as daddress2, dealer.city as dcity,
   dealer.state as dstate,
   dealer.country as dcountry,
   dealer.postcode as dpostcode,
   enquiry_details.down_payment as edown_payment,
   enquiry_details.terms as eterms');
  $this->db->from('enquiry_details');
  $this->db->join('user','user.user_id=enquiry_details.user_id');
  $this->db->join('vehicle','vehicle.vehicle_id=enquiry_details.vehicle_id','left');
  $this->db->join('dealer','dealer.dealer_id=enquiry_details.dealer_id','left');
  $this->db->join('make','vehicle.make=make.make_id','left');
  $this->db->where('user.user_id',$userid);
  $this->db->order_by('enquiry_details.enq_date','DESC');
	return $this->db->get()->result_array();
}

}
