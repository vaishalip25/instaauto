<?php
error_reporting(0);
class Finance_Controller extends CI_Controller {


    public function __construct()
  {
    parent::__construct();
	 $this->load->model('User/FinanceModel');
     $this->load->library('session');
     $this->load->library('email');
	 include_once('vtwsclib/Vtiger/WSClient.php');
   }
	
  public function get_calculator_values(){
      $data=$this->FinanceModel->get_calculator_values();
	  echo json_encode($data);
  }	
	
public function get_userdata(){
   $userid=$this->input->get('userid');
   $userdata=$this->FinanceModel->get_userdata($userid);
   echo json_encode($userdata);
}
 public function get_personal_data(){
      $enquiry_id=$this->input->get('enquiry_id');
	  $data=$this->FinanceModel->get_personal_data($enquiry_id);
	  echo json_encode($data);
 }
public function get_residence_data(){
      $userid=$this->input->get('userid');
	  $data=$this->FinanceModel->get_residence_data($userid);
	  echo json_encode($data);
 }
public function get_emplyoment_data(){
       $userid=$this->input->get('userid');
	   $data=$this->FinanceModel->get_emplyoment_data($userid);
	   echo json_encode($data);
 }
public function get_enquiry_details(){
       $userid=$this->input->get('userid');
	   $data=$this->FinanceModel->get_enquiry_details($userid);
	   echo json_encode($data);
 }

public function add_identification_info(){
	 $user_id=$this->input->get('userid');
	 $security=json_decode($_GET['s']);
	 $country=$this->input->get('country');
     $s=$this->FinanceModel->add_identification_info($security,$country,$user_id);
}
public function submit_final_form(){
	
	   $user_id=$this->input->get('userid');
       $this->FinanceModel->submit_final_form($user_id);

	    $make=$this->input->get('make');
        $model=$this->input->get('model');
        $dealernm=$this->input->get('dealernm');
        $tradein=$this->input->get('tradein');
	    $country=$this->input->get('country');

	    $edata=json_decode($_GET['edata']);
	    $edata->user_id=$user_id;
	    $edata->enq_date=date('d-m-Y h:i:s');
	   //$this->FinanceModel->add_edata($edata);	
	   $this->FinanceModel->update_enquiry($this->input->get('eid'));	 
	
	
	   $d=$this->FinanceModel->get_lead_data($user_id);

	
	   $enq=$this->FinanceModel->get_enquiry($user_id);

	   //if(empty($d[0]['vtiger_id']) || $d[0]['vtiger_id']==0){
	        
			$url = 'https://instaa.od2.vtiger.com';
			$client = new Vtiger_WSClient($url);

			$login = $client->doLogin('jeremy@jeremyhughes.com', 'iIpLoQIj9X6rXLqp');
			if(!$login) 
			{
				//echo 'Login Failed';
			}else
			{
				  $module = 'Leads';
				  $record = $client->doCreate($module,Array(
						'lastname'=>$d[0]['lastname'],
						'firstname'=>$d[0]['firstname'],
						'phone'=>$d[0]['phone_no'],
						'email'=>$d[0]['email'],
						'lane'=>$d[0]['address'],
                                                'birthday'=>"12/11/1993",
						'city'=>$d[0]['city'],
						'state'=>$d[0]['state'],
						'code'=>$d[0]['postcode'],
						'designation'=>$d[0]['emp_title'],
					  
						'company'=>$make,
						'primary_twitter'=>$model,
						'noofemployees'=>$tradein,
						'description'=>$dealernm,
					    'website'=>date('d-m-Y h:i:s'),
					    'country'=>$country

					));

				 if($record) {
					  $recordid = $client->getRecordId($record['id']);
					  $this->FinanceModel->add_vtigerid($user_id,$recordid); 
				  }
			}
	   //}else{
	  // echo 'already exist';
	 //  }
	
	   $user_name=$d[0]['firstname'].' '.$d[0]['lastname'];
	   $data=array(
	     'user_name'=>$user_name,
		 'user_email'=>$d[0]['email'],
		 'user_phone'=>$d[0]['phone_no'],
		  'dealer_email'=>$enq[0]['email'],
		   'make'=>$enq[0]['make_name'],
		   'model'=>$enq[0]['model'],
		   'year'=>$enq[0]['year'],
		   'trim'=>$enq[0]['trim'],
		   'down_payment'=>$enq[0]['ed'],
		   'estimated_trade'=>$enq[0]['estimated_trade'],
		   'amount_requested'=>$enq[0]['requested_amount'],
		   'terms'=>$enq[0]['et'],
	   
	   );
	
	echo json_encode($data);
	  
	  /*  $user_email=$d[0]['email'];
	    $dealer_email=$enq[0]['email'];
	
	
	   $config = Array(
			'protocol' => 'smtp',
			'smtp_host' => 'ssl://smtp.googlemail.com',
			'smtp_port' => 487,
			'smtp_user' => 'patilvaishali366@gmail.com',// your mail name
			'smtp_pass' => 'vaishali2510',
			'mailtype'  => 'html', 
			'charset'   => 'iso-8859-1',
			 'wordwrap' => TRUE
		); 
		$this->load->library('email', $config);
		$this->email->set_mailtype("html");
		
		$message.="<html>
		  <body>
			  <div style='border: 1px solid grey;padding: 20px;margin: 100px;'>
				<div>
				  <h3>User Details:</h3>
				  <label>Name : vaishali patil</label><br/>
				  <label>email : vaishalip@theaxontech.com</label><br/>
				  <label>phone : 23435676768</label><br/>
				</div> 
				<div>
				  <h3>Enquiry Details:</h3>
				  <label>make : bmw</label><br/>
				  <label>model : x5</label><br/>
				  <label>year : 2017</label><br/>
				  <label>trim : t3</label><br/>
				  <label>actual car price : 200000</label><br/>
				  <label>down payment : 20000</label><br/>
				  <label>estimated trade in :50000</label><br/>
				  <label>requested amount :130000</label><br/>
				  <label>terms :60</label><br/>
				</div> 	
			  </div>
		  </body>
		</html>";
	   
	
        $this->email->from('patilvaishali366@gmail.com', 'InstaAuto');
        $this->email->to($dealer_email); 

        $this->email->subject('your have new enquiry request!');
        $this->email->message($message);  

        $this->email->send();

        echo $this->email->print_debugger();
	
	    
	
	    $this->email->clear();
	    $output="your enquiry has been submitted successfully ";
        $this->email->from('patilvaishali366@gmail.com', 'InstaAuto');
        $this->email->to($user_email); 

        $this->email->subject('Your Enquiry has been submitted!');
        $this->email->message($output);  

        $this->email->send();

        echo $this->email->print_debugger();*/

}	
public function get_disclosures(){
    $data=$this->FinanceModel->get_disclosures();
	echo json_encode($data);
}
public function get_selected_vehicle(){
  $vehicle_id=$this->input->get('vehicle_id');
  $data=$this->FinanceModel->get_selected_vehicle($vehicle_id);
	echo $json_data=json_encode($data);
}

public function do_login(){
	$email=$this->input->get('loginemail');
	$pwd=$this->input->get('loginpwd');
	
	$data=$this->FinanceModel->do_login($email,$pwd);
	if(sizeof($data)==0){
	  echo '1';
	}else{
		
		$user_id=$data[0]['user_id'];
		$email=$data[0]['email'];
		
		$sessiondata = array(
			'islogged_in' => true,
			'user_id'  => $user_id,
			'email'    => $email
		);

	   $this->session->set_userdata($sessiondata);
	   echo '0';
	
	}
	
}
public function request_reset_password(){
	 $email=$this->input->get('email');
   $data=$this->FinanceModel->check_email($email);
	if(sizeof($data)==0){
	   echo 'exist';
	
	}else{
	  echo $user_id=$data[0]['user_id'];
	  //$encrypted_id=base64_encode($user_id);
	//	$base_url=base_url();
	  // echo $reset_url=$base_url.'#resetPassword?ec='.$encrypted_id;	
		
		/*$config = Array(
'protocol' => 'sendmail',
'smtp_host' => 'ssl://smtp.googlemail.com',
'smtp_port' => 487,
'smtp_user' => 'patilvaishali366@gmail.com',// your mail name
'smtp_pass' => 'patilvap',
'mailtype'  => 'html', 
'charset'   => 'iso-8859-1',
 'wordwrap' => TRUE
); 
		$this->load->library('email', $config);
		$this->email->set_newline("\r\n");
  $this->email->set_mailtype("html");
		
		$msg='';
		$msg.='It looks like you requested a new password. We’re happy to help!

				Please follow the link below to get started.';

		$msg.= $reset_url ;		

		$msg.='If you have any questions, please contact your AutoInsta Support Team at support@autoinsta.com or 1-(844)-443-4646.

				- Team AutoInsta';
		
        $this->email->from('vaishalip@theaxontech', 'AutoInsta');
		$this->email->to('vaishalip@theaxontech');

		$this->email->subject('Password reset link');
		$this->email->message($msg);
		if($this->email->send()){
		  echo '1';
		}else{
           echo $this->email->print_debugger();		
		}
		 echo $this->email->print_debugger();		*/
	}
}
public function reset_password(){
    $d=$_GET['id'];
	$pwd=$_GET['pwd'];
	$decrypted_id=base64_decode($d);
	
	$data=$this->FinanceModel->reset_password($decrypted_id,$pwd);
}
	
}