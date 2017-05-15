<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class DisclosureModel extends CI_Model {

public function __construct()
{
   parent::__construct();
   $this->load->database('');
}

public function index(){

}

	public function get_disclosure_data(){
	    $this->db->select('*');
     $this->db->from('disclosures');	
    return  $this->db->get()->result_array();
	}
   public function save_disclosure($d){
	    $this->db->where('disc_id',$d->disc_id);
	    $this->db->update('disclosures',$d);
	   
	   if($this->db->affected_rows()){
	     return true;
	   }
	}

}
