<?php
class CalculatorModel extends CI_Model {


        public function __construct()
        {
                // Call the CI_Model constructor
                parent::__construct();
				$this->load->database('');
			
        }
		
	
		
		public function save_cal($calculator)
		{
			//return $this->db->insert('calculator_default', $calculator);
			//return $this->db->insert_id();
			$this->db->where('cal_id',$calculator->cal_id);
			$this->db->where('cal_contry',$calculator->cal_contry);
	        $this->db->update('calculator_default',$calculator);
			return $this->db->last_query();
		}
		public function getdata(){
			$this->db->select('*');
			$this->db->from('calculator_default');
			$this->db->where('cal_contry',"US");
            return $this->db->get()->result_array();
		}
		
		
		public function save_cal_aus($calculator)
		{
			
			$this->db->where('cal_id',$calculator->cal_id);
			$this->db->where('cal_contry',$calculator->cal_contry);
	        $this->db->update('calculator_default',$calculator);
			return $this->db->last_query();
		}
		public function getdata_aus(){
			$this->db->select('*');
			$this->db->from('calculator_default');
			$this->db->where('cal_contry',"AUS");
            return $this->db->get()->result_array();
		}
	
		
	}	
		?>