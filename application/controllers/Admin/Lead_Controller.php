 <?php
error_reporting(0);
class Lead_Controller extends CI_Controller {


    public function __construct()
  {
    parent::__construct();
	$this->load->model('Admin/LeadModel');
     
   }
   
   public function index()
	{

		
    }
    
    public function get_lead(){ 
   
   $data=$this->LeadModel->get_lead();
    //for($i=0;$i<sizeof($data);$i++){
	     //$data1=$this->LeadModel->get_enq($data[$i]['user_id']);
		// echo $data[$i]->edate='ss';
   // }
		echo json_encode($data);
    
    }
    
    public function get_detaillead(){
    
    $info=json_decode($this->input->get('data'));
        
     $data=$this->LeadModel->get_detaillead($info);
    echo json_encode($data);
    }
	
    public function search(){
    
     $info=json_decode($this->input->get('data'));
         $data=$this->LeadModel->search($info);
     echo json_encode($data);
    
    }
    public function get_single_lead_data(){
	  $userid=$this->input->get('user_id');
	  $data=$this->LeadModel->get_single_lead_data($userid);
		echo json_encode($data);
	}
   
    
}