<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class DealerModel extends CI_Model {

public function __construct()
{
   parent::__construct();
   $this->load->database('');
}

public function index(){

}


public function get_dealers(){
	$this->db->select('*');
    $this->db->from('dealer');	
    $this->db->join('make','dealer.make=make.make_id');
   return $this->db->get()->result_array();
}
public function get_makes($selected_con){
	$this->db->select('*');
    $this->db->from('make');
	$where = "FIND_IN_SET('".$selected_con."', makeCountry)";  
    $this->db->where( $where );
   return $this->db->get()->result_array();
}

public function get_time($did){
	$this->db->select('*');
    $this->db->from('shop_timing');	
	$this->db->where('dealer_id',$did);	
   return $this->db->get()->result_array();
}

public function add_dealer($dealer){
	$this->db->insert('dealer',$dealer);
	return $insert_id = $this->db->insert_id();
}
public function add_shop_time($time){
	$this->db->insert('shop_timing',$time);
}
public function update_dealer($dealer,$did){
	
	//return $dealer;
	$this->db->where('dealer_id',$did);
	$this->db->update('dealer',$dealer);
	
}
	
	public function remimg($deid,$de_img)
{
	$arr=array('profile'=>'');
 	$this->db->where('dealer_id',$deid);
	$this->db->update('dealer',$arr);
    unlink("upload/".$de_img);

}
public function update_shop_time($time,$did){
	
	
	$this->db->where('dealer_id',$did);
	$this->db->update('shop_timing',$time);
	
}

public function searchdealer($search)
		{

		$this->db->select("*");
		$this->db->from('dealer');
		$this->db->join('make','dealer.make=make.make_id');
		$this->db->like('name',$search);
		$this->db->or_like('email',$search);
		$this->db->or_like('make_name',$search);
		$this->db->or_like('state',$search);
		$this->db->or_like('country',$search);
		$this->db->or_like('city',$search);
		$this->db->or_like('phone',$search);
		$this->db->or_like('postcode',$search);
		
		$query = $this->db->get()->result_array();
		return $query;
		}

public function delete_dealer($did){
	
	$this->db->where('dealer_id',$did);
	$this->db->delete('dealer');
	
}
public function change_status($did,$status){
	
	$this->db->set('status',$status);
	$this->db->where('dealer_id',$did);
	$this->db->update('dealer',$dealer);
	
}
public function get_models($makeid){
	$this->db->select('*');
    $this->db->from('vehicle');	
	$this->db->where('make',$makeid);
	 $this->db->group_by('model'); 
   return $this->db->get()->result_array();
}
public function get_model_names($m){
	
	$this->db->select('*');
    $this->db->from('vehicle');	
	for($i=0;$i<sizeof($m);$i++){
		$this->db->or_where('vehicle_id',$m[$i]);
	}
   return $this->db->get()->result_array();
}
	
public function get_make_name($makeid){
	
	$this->db->select('*');
    $this->db->from('make');	
	$this->db->where('make_id',$makeid);
   return $this->db->get()->result_array();
}
	

}
