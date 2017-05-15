<?php
class VehicleModel extends CI_Model {


       public function __construct()
        {
                // Call the CI_Model constructor
                parent::__construct();
				$this->load->database('');
			
        }
		
		public function viewVehicle()
		{
			$this->db->select('*');
			$this->db->from('vehicle');
			//$this->db->join('make','vehicle.make=make.make_id');	
			return $this->db->get()->result_array();
			 //$this->db->last_query();
		}
		
		public function get_makes()
		{
			$this->db->select('*');
			$this->db->from('make');
			$query = $this->db->get()->result_array();
			return $query;
		}
		public function get_make_name($makeid){
		         $this->db->select('*');
				 $this->db->from('make');
			     $this->db->where('make_id',$makeid);
				return $this->db->get()->result_array();
				 
		}
		
		public function Add_vehicle($vehicle)
		{
			//unset($vehicle->$$hashKey);
			return $this->db->insert('vehicle', $vehicle);
			
		}
		
		public function Update_vehicle($data)
		{
			$id=$data->vehicle_id;
			$this->db->where('vehicle_id',$id);
			$this->db->update('vehicle',$data);
		   
		}
		
		public function updateimg($image,$id)
		{
			$this->db->where('vehicle_id',$id);
			
			$this->db->set('imgs',$image);
		
			$this->db->update('vehicle');
			
			
		}
		
		public function delete_vehicle($id)
		{
			$this->db->where('vehicle_id',$id);
			$this->db->delete('vehicle');
		}
		
		public function searchvehicle($search)
		{
		$this->db->select("*");
		$this->db->from('vehicle');
		$this->db->join('make','vehicle.make=make.make_id');
		$this->db->like('model',$search);
		$this->db->or_like('make_name',$search);
		$this->db->or_like('trim',$search);
		$this->db->or_like('vehicle_type',$search);
		$this->db->or_like('year',$search);
		
		$query = $this->db->get()->result_array();
		return $query;
		}
		
		public function toggle_status($status,$id)
		{
			$data=array('status'=>$status);
			$this->db->where('vehicle_id',$id);
			$this->db->update('vehicle',$data);
		}
		
		public function insert_csv_data($data1){
			if($this->db->insert('vehicle',$data1)){
				return true;
		     }
		}
		public function get_make_id($m){
			$this->db->select('*');
			$this->db->from('make');
			$this->db->like('make_name', $m);
			return $query = $this->db->get()->result_array();
		}
		public function add_make($m){
			if($this->db->insert('make',$m)){
				return $this->db->insert_id();
		     }
		}
		public function check_vehicle_existance($vehicle){
			$this->db->select('*');
			$this->db->from('vehicle');
			foreach ($vehicle as $key => $value) {
			  $this->db->where($key,$value);
			}
			return $query = $this->db->get()->result_array();
		}
	
//********************************************************************FUEL API*********************************************************//
public function check_make_existance($id){
    $this->db->select('*');
	$this->db->from('Fuel_makes');
	$this->db->where('id',$id);
	return $this->db->get()->result_array();

}
public function add_fuel_make($data){
   $this->db->insert('Fuel_makes',$data);
	
}	
public function check_model_existance($id){
    $this->db->select('*');
	$this->db->from('Fuel_models');
	$this->db->where('id',$id);
	return $this->db->get()->result_array();
}	
public function add_fuel_model($data){
  $this->db->insert('Fuel_models',$data);
	
}	
public function get_fuel_make_data(){
    $this->db->select('*');
	$this->db->from('Fuel_makes');
	return $this->db->get()->result_array();
}	
public function get_fuel_model_data($makeid,$year){
    $this->db->select('*');
	$this->db->from('Fuel_models');
	$this->db->where('fuel_makeid',$makeid);
	$this->db->where('year',$year);
	return $this->db->get()->result_array();
}	
}	
?>
