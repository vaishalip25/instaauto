<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PageModel extends CI_Model {

public function __construct()
{
   parent::__construct();
   $this->load->database('');
}

public function index(){

}
public function get_pages(){
    $this->db->select('*');
	$this->db->from('pages');
	return $this->db->get()->result_array();
}
public function save($data){
    $this->db->where('page_id',$data->page_id);
	$this->db->update('pages',$data);
	return $this->db->last_query();
}

}
