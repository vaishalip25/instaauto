<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MakeModel extends CI_Model {

public function __construct()
{
   parent::__construct();
   $this->load->database('');
}

public function index(){

}
public function Add_make($make){
	
	return $this->db->insert('make', $make);
	
}
public function get_make_list(){
	$this->db->select('*');
    $this->db->from('make');	
   return $this->db->get()->result_array();
}
public function change_status($mid,$status){
	$this->db->set('make_status',$status);
	 $this->db->where('make_id',$mid);
	$this->db->update('make');
	
}
public function delete_make($make_id){
	$this->db->where('make_id',$make_id);
	$this->db->delete('make');
}
public function update_make($make){
	//return $make['make_id'];
	$this->db->where('make_id',$make['make_id']);
	$this->db->update('make',$make);
}
public function removeimg($make_id,$make_img)
{
	$arr=array('badge'=>'');
 	$this->db->where('make_id', $make_id);
	$this->db->update('make',$arr);
    unlink("upload/".$make_img);

}

public function searchmake($key){

	return $this->db->select('*')->from('make')->like('make_name',$key)->or_like('disclosure',$key)->get()->result_array();


}	

}