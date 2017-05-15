angular.module('UserApp').controller('FinanceController', ['$rootScope','$scope','$sce','settings','$http','$localStorage','$window','$location','$templateCache','$stateParams','$state', function($rootScope, $scope, $sce,settings,$http,$localStorage,$window,$location,$templateCache,$stateParams,$state) {
    $scope.$on('$viewContentLoaded', function() {	
        // initialize core components
        App.initAjax();
		$window.scrollTo(0, 0);
		
		getmodels();
		
		$scope.terms_array=[
				{ name:'12 Months',value:'12'},
				{ name:'24 Months',value:'24'},
				{ name:'36 Months',value:'36'},
				{ name:'48 Months',value:'48'},
				{ name:'60 Months',value:'60'},
				{ name:'72 Months',value:'72'},
				{ name:'84 Months',value:'84'}

		];
		
		$scope.AUS_STATES=[
			{ name:'New South Wales' },
			{ name:'Victoria' },
			{ name:'Queensland' },
			{ name:'Western Australia' },
			{ name:'South Australia' },
			{ name:'Australian Capital Territory' },
			{ name:'Tasmania' },
			{ name:'Northern Territory' },
			   
		];
		
		$scope.US_STATES=[
			{ name:'Alabama' },
			{ name:'Alaska' },
			{ name:'Arizona' },
			{ name:'Arkansas' },
			{ name:'South Australia' },
			{ name:'California' },
			{ name:'Colorado' },
			{ name:'Connecticut' },
		];
		
		
		
		console.log($localStorage.calculator_values);
		$scope.calculator=$localStorage.calculator_values;
		
		var total_tax=($localStorage.calculator_values.car_price) * ($localStorage.calculator_values.tax_rate) /100;
		$scope.calculator.amount_reqested = parseInt($localStorage.calculator_values.car_price) - parseInt($localStorage.calculator_values.estimated_trade_in) - parseInt($localStorage.calculator_values.down_payment) + parseInt(total_tax);
	
		
		console.log($localStorage.select_trim);
		$scope.enquiry_data=$localStorage.select_trim[0];
		get_make_name($scope.enquiry_data.make);
		
		console.log($localStorage.dealer);
		$scope.selected_dealer=$localStorage.dealer[0];
		$scope.country=$scope.selected_dealer.selectedcountry;
		
		if($scope.country=='aus'){
		  $scope.state_list=$scope.AUS_STATES;
		}else if($scope.country=='us'){
		  $scope.state_list=$scope.US_STATES;
		}
		
		
		
		
		if($rootScope.user_enquiry!=null){
			$scope.personal_info_div=true;
		    $scope.finance_div=true;
		    $scope.review=true;
		}
		
		$scope.update_amount_requested=function(){
			console.log($scope.calculator.estimated_trade_in);
			  if($scope.calculator.estimated_trade_in==''){
			    $scope.calculator.estimated_trade_in=0;
			  }else{
			    $scope.calculator.estimated_trade_in=$scope.calculator.estimated_trade_in;
			  }
			
			if($scope.calculator.down_payment==''){
			  $scope.calculator.down_payment=0;
			}else{
			  $scope.calculator.down_payment=$scope.calculator.down_payment;
			}
			
			  $scope.calculator.amount_reqested = parseInt($scope.calculator.car_price) - parseInt($scope.calculator.estimated_trade_in) - parseInt($scope.calculator.down_payment) + parseInt(total_tax);
		}
		
		 get_disclosures();
		 
		 function get_disclosures(){
		    $http.post('User/Finance_Controller/get_disclosures').success(function(data){
		       console.log(data);
				
				$scope.finance_disclosure=data[14]['disc_content'];
				if($scope.country=='aus'){
				  $scope.esign_disclosure=data[9]['disc_content'];
				  $scope.state_disclosure=data[11]['disc_content'];
				}
				if($scope.country=='us'){
				  $scope.esign_disclosure=data[8]['disc_content'];
				  $scope.state_disclosure=data[10]['disc_content'];
				}
		
				$scope.finance_disclosure=data[14]['disc_content'];
		  
		    });
		 }
		$scope.show_login_form=function(){
		    $scope.tgl1=true;
			$scope.tgl=true;
		}
		$scope.show_signup_form=function(){
		  $scope.tgl1=false;
			$scope.tgl=false;
		}
		function get_make_name(makeid){
			$http.post('User/Home_Controller/get_make_name?makeid='+makeid).success(function(data){
				//console.log(data);
                $scope.enquiry_data.make_name=data[0]['make_name'];
				console.log($scope.enquiry_data);
			});
		}
		
		
		//$scope.enquiry.down_payment=$localStorage.select_trim[0]['down_payment'];
		//$scope.pterms=$localStorage.select_trim[0]['terms'];
		
		
			
	function getmodels(model)
	{
		$scope.localmake=$localStorage.make;
		$scope.localmodel=$localStorage.model;
		console.log($localStorage.make);		
		console.log($localStorage.model);
		console.log($localStorage.select_trim);
		$scope.price=$localStorage.select_trim[0]['dap_price'];
		$scope.year=$localStorage.select_trim[0]['year'];
		$scope.brand=$localStorage.select_trim[0]['brand'];
		$scope.model=$localStorage.select_trim[0]['model'];
		$scope.trim=$localStorage.select_trim[0]['trim'];
		$scope.imgs=$localStorage.select_trim[0]['imgs'];
		console.log($scope.imgs);
		if($scope.imgs){
		  var res = $scope.imgs.split(",");
			$scope.vehicle_img=res[0];
		 }else{
		  $scope.imgerr='vehicle image not available';
		 }
		
		// console.log(price);
		// console.log(year);
		// console.log(brand);
		// console.log(model);
		// console.log(trim);
			 // $http.post('User/Home_Controller/getmodels?info='+$stateParams.param1).success(function(res){
			 // console.log(res);
			// $scope.modelselct=res;
		// });
		
		
	}
		
	$scope.get_personal_info=function(){ 
		document.getElementById("pinfo").classList.add("current");
		$scope.calculator.vehicle_id=$localStorage.select_trim[0]['vehicle_id'];
		$scope.calculator.dealer_id=$localStorage.dealer[0]['dealer_id'];
		
		
		var cal={
			vehicle_id:$scope.calculator.vehicle_id,
			dealer_id:$scope.calculator.dealer_id,
			vehicle_price:$scope.calculator.car_price,
			down_payment:$scope.calculator.down_payment,
			down_pay_percent:$scope.calculator.down_payment_percent,
			estimated_mon_pay:$scope.calculator.estimated_monthly_payment,
			estimated_total_pay:$scope.calculator.estimated_total_payment,
			interest_rate:$scope.calculator.interest_rate,
			tax_rate:$scope.calculator.tax_rate,
			terms:$scope.terms,
			total_interest:$scope.calculator.total_interest,
			total_tax:$scope.calculator.total_tax,
			estimated_trade:$scope.calculator.estimated_trade_in,
			requested_amount:$scope.calculator.amount_reqested,
			
		};
	
		$http.post('User/Home_Controller/add_enquiry_data?cal='+JSON.stringify(cal)).success(function(data){
					$scope.enquiry_id=data;
		});
		
		
		$scope.personal_info_div=true;
		$scope.finance_div=true;
		$scope.personal_info=true;
		$scope.review=false;
	}
	
	$scope.goto_residential_info=function(){
		var error=0;
		  if($('#dob').val()==''){
		    $scope.doberrmsg='birthdate is required';
			  error=1;
		  }
		
			if($scope.pwd_msg!=''){
				//$scope.pwd_msg='password must fulfill following requirements';
			   error=1;
			}
		
		
		if(error==0){
		        $scope.user.enq_id=$scope.enquiry_id;
			    document.getElementById("rinfo").classList.add("current");
				document.getElementById("pinfo").classList.remove("current");
				$scope.user.dob=$('#dob').val();
				$http.post('User/Home_Controller/add_user?user='+JSON.stringify($scope.user)+'&enquiry_data='+JSON.stringify($scope.enquiry)).success(function(data){
					$scope.userid=data;
					console.log(data);

				});
				$scope.personal_info=false;
				$scope.residential_info=true;
			  
		  }
		
		
	}
	$scope.hide_error=function(errid){
		
		if(errid=='state'){
		   $scope.state_errmsg='';
		}else if(errid=='rent_own'){
		  $scope.rent_own_errmsg='';
		}else if(errid=='prev_state'){
		  $scope.prevstate_errmsg='';
		}else if(errid=='prev_rent_own'){
		  $scope.prevrent_own_errmsg='';
		}else if(errid=='dob'){
		  $scope.doberrmsg='';
		}else if(errid=='move_date'){
			
		  $scope.movedate_errmsg='';
		 
		}else if(errid=='prev_move_in'){
		  $scope.prevmovein_errmsg='';
		}else if(errid=='prev_move_out'){
		  $scope.prevmoveout_errmsg='';
		}else if(errid=='emp_start_date'){
		  $scope.empstartdateerrmsg='';
		}else if(errid=='emp_status'){
		  $scope.empstatus_errmsg='';
		}else if(errid=='emp_income_option'){
		  $scope.empincomeoption_errmsg='';
		}
			   
	}
	
	$scope.show_prev=function(s){
		console.log(s);
	    console.log($('#move_date').val());
	
	}
	
	$scope.goto_employment_info=function(){
		var state = document.getElementById("state");
		var prev_state = document.getElementById("prev_state");
		var rent_own = document.getElementById("rent_own");
		var prev_rent_own = document.getElementById("prev_rent_own");
		
		var error=0;
		if($('#move_date').val()==''){
		   $scope.movedate_errmsg='Move In Date field is required';
		   	error=1;
		} 
		
		if($('#prev_move_in').val()==''){
		     $scope.prevmovein_errmsg='Move In Date field is required';
			error=1;
		}
		
		if($('#prev_move_out').val()==''){
		     $scope.prevmoveout_errmsg='Move out Date field is required';
			 error=1;
		}
		
		
		/*if(rent_own.selectedIndex==0){
		     $scope.rent_own_errmsg='please select rent/own field.';
			 error=1;
		}
		
		if(prev_rent_own.selectedIndex==0 ){
		    $scope.prevrent_own_errmsg='please select rent/own field.';
			 error=1;
		}
		
		if(state.selectedIndex==0 ){
		     $scope.state_errmsg='state field is required.';
			 error=1;
		}
		
		if(prev_state.selectedIndex==0 ){
		   $scope.prevstate_errmsg='state field is required.';
			 error=1;
		}*/
		console.log(error);
		if(error==0){
		    
			document.getElementById("einfo").classList.add("current");
			document.getElementById("rinfo").classList.remove("current");
			console.log($scope.resi_info);
			$scope.resi_info.move_date=$('#move_date').val();
			$scope.resi_info.prev_move_in=$('#prev_move_in').val();
			$scope.resi_info.prev_move_out=$('#prev_move_out').val();
			console.log($scope.resi_info);
			$http.post('User/Home_Controller/add_resi_info?resi_info='+JSON.stringify($scope.resi_info)+'&userid='+$scope.userid).success(function(data){

			});
			$scope.residential_info=false;
			$scope.employment_info=true;
			
		}
		
		
	
	}
	
	$scope.selected_term=function(term){
	 $scope.calculator.terms=term;
	}
	$scope.select_rent_own=function(value){
	  $scope.resi_info.rent_own=value;
	}
	$scope.select_prev_rent_own=function(value){
	 $scope.resi_info.prev_rent_own=value;
	}
	$scope.select_emp_status=function(value){
	   emp.emp_status=value;
	}
	$scope.select_other_income=function(value){
	  $scope.emp.emp_income_option=value;
	}
	
	$scope.validate_password=function(pwd){
		
		var l=0
        var c=0
        var n=0;
		if(pwd.length!=0){
		   for(i=0;i<pwd.length;i++)
			{
				if('A' <= pwd[i] && pwd[i] <= 'Z') // check if you have an uppercase
					c++;
				if('a' <= pwd[i] && pwd[i] <= 'z') // check if you have a lowercase
					l++;
				if('0' <= pwd[i] && pwd[i] <= '9') // check if you have a numeric
					n++;
			}
			
            if(pwd.length>=8){
			   document.getElementById("size").classList.add("valid-pass");
			}else{
			    document.getElementById("size").classList.remove("valid-pass");
			}
			
			if(l>0){
			   document.getElementById("lletter").classList.add("valid-pass");
			}else{
			    document.getElementById("lletter").classList.remove("valid-pass");
			}
			
			if(c>0){
			   document.getElementById("cletter").classList.add("valid-pass");
			}else{
			    document.getElementById("cletter").classList.remove("valid-pass");
			}
			
			if(n>0){
			   document.getElementById("num").classList.add("valid-pass");
			}else{
			    document.getElementById("num").classList.remove("valid-pass");
			}
			
			
			
			
			
			if(l>0 && c>0 && n>0 && pwd.length>=8){
			    $scope.pwd_msg='';
				 //$scope.userForm.password.$invalid=false;
			}else{
			   
			   $scope.pwd_msg='password must fulfill following requirements';
              // $scope.userForm.password.$invalid=true;
			}
		
		}
	    
		
	}
	
	$scope.goto_identification_info=function(){
		var error=0;
		var emp_status = document.getElementById("emp_status");
		var emp_income_option = document.getElementById("emp_income_option");
		
		if($('#emp_start_date').val()==''){
		   $scope.empstartdateerrmsg='Start Date is required';
		   	error=1;
		} 
		if(emp_status.selectedIndex==0){
		     $scope.empstatus_errmsg='please select employee status field.';
			 error=1;
		}
		
		if(emp_income_option.selectedIndex==0 ){
		    $scope.empincomeoption_errmsg='please select income option field.';
			 error=1;
		}
		
		if(error==0){
		
			document.getElementById("iinfo").classList.add("current");
			document.getElementById("einfo").classList.remove("current");
			$scope.emp.emp_start_date=$('#emp_start_date').val();
			$http.post('User/Home_Controller/add_emp_info?emp='+JSON.stringify($scope.emp)+'&userid='+$scope.userid).success(function(data){

			});
			$scope.employment_info=false;
			$scope.identification_info=true;
		}
	}
	$scope.goto_review=function(){
		console.log($scope.userid);
		document.getElementById("rwinfo").classList.add("current");
		document.getElementById("iinfo").classList.remove("current");
		console.log($localStorage.select_trim);
		console.log($scope.resi_info);
		console.log($scope.emp);
		console.log($scope.user);
		console.log($scope.enquiry);
		
		
		console.log($scope.security);
	
		console.log($scope.social_security_no);
		$http.post('User/Home_Controller/add_identification_info?security='+$scope.security+'&country='+$scope.country+'&userid='+$scope.userid).success(function(data){
			console.log(data);
			
		});
		
		$scope.identification_info=false;
		$scope.review=true;
		
	}
	$scope.edit_data=function(dataname){
	   if(dataname=='personal_info'){
		   document.getElementById("pinfo").classList.add("current");
		   document.getElementById("rwinfo").classList.remove("current");
	       $scope.personal_info=true;
		   $scope.review=false;
		   $scope.edit=true;
		   
	   }else if(dataname=='resi_info'){
		   document.getElementById("rinfo").classList.add("current");
		   document.getElementById("rwinfo").classList.remove("current");
	       $scope.residential_info=true;
		   $scope.review=false;
		   $scope.edit=true;
		   
	   }else if(dataname=='emp_info'){
		   document.getElementById("einfo").classList.add("current");
		   document.getElementById("rwinfo").classList.remove("current");
		   $scope.employment_info=true;
		   $scope.review=false;
		   $scope.edit=true;
	   
	   }else if(dataname=='iden_info'){
		   document.getElementById("iinfo").classList.add("current");
		   document.getElementById("rwinfo").classList.remove("current");
		   $scope.identification_info=true;
		   $scope.review=false;
		   $scope.edit=true;
	   
	   }else if(dataname=='cal_values'){
	       $scope.personal_info_div=false;
		   $scope.finance_div=false;
		   $scope.review=false;
		   $scope.edit=true;
	   }
	}
	$scope.edit_cal_data=function(){
		$scope.personal_info=true;
		$scope.finance_div=true;
	    $scope.review=true;
		$scope.edit=false;
		var calc={
			down_payment:$scope.calculator.down_payment,
			terms:$scope.calculator.terms,
		}
		$http.post('User/Home_Controller/edit_cal_data?calc='+JSON.stringify(calc)+'&enq_id='+$scope.enquiry_id).success(function(data){
			 console.log(data);
		});
	}
	
	
	$scope.edit_personal_info=function(){
		document.getElementById("rwinfo").classList.add("current");
		document.getElementById("pinfo").classList.remove("current");
		console.log($scope.userid);
	    $scope.user.dob=$('#dob').val();
		$http.post('User/Home_Controller/edit_user?user='+JSON.stringify($scope.user)+'&userid='+$scope.userid).success(function(data){
			
			
		});
		$scope.personal_info=false;
		$scope.review=true;
		$scope.edit=false;
	}
	
	$scope.edit_residential_info=function(){
		document.getElementById("rwinfo").classList.add("current");
		document.getElementById("rinfo").classList.remove("current");
	    $scope.resi_info.move_date=$('#move_date').val();
		$scope.resi_info.prev_move_in=$('#prev_move_in').val();
		$scope.resi_info.prev_move_out=$('#prev_move_out').val();
		console.log($scope.resi_info);
		$http.post('User/Home_Controller/edit_residential_info?resi_info='+JSON.stringify($scope.resi_info)+'&userid='+$scope.userid).success(function(data){
			
		});
		$scope.residential_info=false;
		$scope.review=true;
		$scope.edit=false;
	}
	$scope.edit_employment_info=function(){
		document.getElementById("rwinfo").classList.add("current");
		document.getElementById("einfo").classList.remove("current");
	   $scope.emp.emp_start_date=$('#emp_start_date').val();
		$http.post('User/Home_Controller/edit_employment_info?emp='+JSON.stringify($scope.emp)+'&userid='+$scope.userid).success(function(data){
			
		});
		$scope.employment_info=false;
		$scope.review=true;
		$scope.edit=false;
	}
	$scope.edit_identification_info=function(){
		document.getElementById("rwinfo").classList.add("current");
		document.getElementById("iinfo").classList.remove("current");
		$http.post('User/Home_Controller/add_identification_info?license_number='+$scope.license_number+'&userid='+$scope.userid).success(function(data){
			console.log(data);
		});
		$scope.identification_info=false;
		$scope.review=true;
		$scope.edit=false;
	}
	$scope.submit_data=function(){
		var error=0;
	    var chkagr=document.getElementById('chkagr').checked;
		var chkesign=document.getElementById('chkesign').checked;
		if(chkagr==false){
		  $scope.chkagr_errmsg='please check above checkbox to agree  E-Sign Consent';
			error=1;
		}
		if(chkesign==false){
		   $scope.chkesign_errmsg='please check above checkbox to agree  State Disclosures and Acknowledgements';
			error=1;
		}
		if(error==0){
		  $state.go('success');
		}
		
	}
	$scope.chkagr_checked=function(checked){
	  if(checked==true){
	    $scope.chkagr_errmsg='';
	  }
	}
	$scope.checkesign_checked=function(checked){
	  if(checked==true){
	    $scope.chkesign_errmsg='';
	  }
	}
	$scope.check_email=function(email){
	
		$http.post('User/Home_Controller/check_email?email='+email).success(function(data){
			if(data==1){
			  $scope.msg='email already exist';
			}else{
			  $scope.msg=' ';
			}
			
		});
	
	}
	 

	
	// $scope.bck_second=function()
	// {
		// $state.go('dealership',{param1:$localStorage.make},{param2:$localStorage.model});
	// }
	
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
}]);

'use strict';
/* Directives */
angular.module('UserApp.directives', [])
    .directive('pwCheck', [function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            elem.add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    ctrl.$setValidity('pwmatch', elem.val() == $(firstPassword).val());
                });
            });
        }
    }
}]);
UserApp.filter('unsafe', function($sce) {    return function(val) {        return $sce.trustAsHtml(val);    };});