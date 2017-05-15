angular.module('UserApp').controller('ReviewController', ['$rootScope','$scope','$sce','settings','$http','$localStorage','$window','$location','$templateCache','$stateParams','$state', function($rootScope, $scope, $sce,settings,$http,$localStorage,$window,$location,$templateCache,$stateParams,$state) {
    $scope.$on('$viewContentLoaded', function() {	
        // initialize core components
        App.initAjax();
	   $window.scrollTo(0, 0);
		console.log($localStorage.en_id);
		console.log($localStorage.credit_data);
	     var edata={
				  requested_amount:$localStorage.credit_data['amount_reqested'],
				  dealer_id:$localStorage.credit_data['dealer_id'],
				  vehicle_id:$localStorage.credit_data['vehicle_id'],
				  estimated_trade:$localStorage.credit_data['estimated_trade_in'],
				  down_payment:$localStorage.credit_data['down_payment'],
				  terms:$localStorage.credit_data['terms'],
			 }
		 
		$scope.calculator = edata;
		
		$scope.redirect=function(page){
		  $state.go(page);
		} 
		
		$scope.enquiry_data=$localStorage.select_trim;
console.log($scope.enquiry_data);
		$scope.selected_dealer=$localStorage.dealer[0];
		$scope.country=$scope.selected_dealer.selectedcountry;
 
		console.log($localStorage.select_trim);
		if($localStorage.select_trim.front_img!=''){
		  $scope.vehicle_img=$localStorage.select_trim.front_img;
		}else if($localStorage.select_trim.front_fuel_img!=''){
		   $scope.vehicle_fuel_img=$localStorage.select_trim.front_fuel_img;
		}else if($localStorage.select_trim.imgs){
			var res =$localStorage.select_trim.imgs.split(",");
			$scope.vehicle_img=res[0];
		}else if($localStorage.select_trim.fuel_images!=''){
		   var res =$localStorage.select_trim.fuel_images.split(",");
			$scope.vehicle_fuel_img=res[0];
		
		}
		
		
		check_session();
		function check_session(){
		   $http.post('User/Login_Controller/checksession').success(function(data){
			   
			   $scope.userid=data['user_id'];
				 $http.post('User/Finance_Controller/get_userdata?userid='+data['user_id']).success(function(data){
					  $scope.user=data[0];
					  //$scope.license_number=$scope.user.license_number;
				  });
				  $http.post('User/Finance_Controller/get_residence_data?userid='+data['user_id']).success(function(data){
					 $scope.resi_info=data[0];
				  });
				  $http.post('User/Finance_Controller/get_emplyoment_data?userid='+data['user_id']).success(function(data){
					 $scope.emp=data[0];
				  });
				$http.post('User/Finance_Controller/get_enquiry_details?userid='+data['user_id']).success(function(data){
					console.log(data);
					
					console.log(data[0]['enquiry_id']);
				   $scope.eid=data[0]['enquiry_id'];
				  });
			});
		}
	
		$scope.edit_data=function(dataname){
			
		   if(dataname=='personal_info'){
			   $state.go('application',{review:true,userid:$stateParams.userid});

		   }else if(dataname=='resi_info'){
			   $state.go('residence',{review:true,userid:$stateParams.userid});

		   }else if(dataname=='emp_info'){
			  
			   $state.go('employment',{review:true,userid:$stateParams.userid,userid:$stateParams.userid});

		   }else if(dataname=='iden_info'){
			   
              $state.go('identification',{review:true,userid:$stateParams.userid});
			   
		   }else if(dataname=='cal_values'){
			   $localStorage.credit=true;
			  $state.go('credit',{review:true});
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
		
	    $scope.submit_data=function(){
			var make = $scope.enquiry_data.make_name;
			var model = $scope.enquiry_data.model;
			var dealernm = $scope.selected_dealer.name;
			var tradein = $scope.calculator.estimated_trade;

			console.log(make);
			console.log(model);
			console.log(dealernm);
			console.log(tradein);

			$scope.calculator.user_id=$scope.userid;
			$localStorage.userid='';
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
				
			 $http.post('User/Finance_Controller/submit_final_form?userid='+$scope.userid+'&edata='+JSON.stringify(edata)+'&eid='+$localStorage.en_id+'&make='+make+'&model='+model+'&dealernm='+dealernm+'&tradein='+tradein+'&country='+$scope.country).success(function(data){
				 console.log(data);
				 $http.post('http://indybuildcorp.com/autogravity/emails/enquirymail.php?data='+JSON.stringify(data)).success(function(s){
					 console.log(s);
				    $state.go('success');
				 });
               
			  });

			}else{
			  $('html, body').animate({
					scrollTop: $(".spanerror:visible").first().offset().top
				}, 500);
			}	
		
	}
		
		
		 get_disclosures();
		 
		 function get_disclosures(){
		    $http.post('User/Finance_Controller/get_disclosures').success(function(data){
				
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
