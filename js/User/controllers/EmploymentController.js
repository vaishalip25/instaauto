angular.module('UserApp').controller('EmploymentController', ['$rootScope','$scope','$sce','settings','$http','$localStorage','$window','$location','$templateCache','$stateParams','$state', function($rootScope, $scope, $sce,settings,$http,$localStorage,$window,$location,$templateCache,$stateParams,$state) {
    $scope.$on('$viewContentLoaded', function() {	
        // initialize core components
        App.initAjax();
	    $window.scrollTo(0, 0);
	
		$scope.redirect=function(page){
		  $state.go(page);
		}
		
		check_session();
		function check_session(){
		   $http.post('User/Login_Controller/checksession').success(function(data){
			   $scope.userid=data['user_id'];
				 $http.post('User/Finance_Controller/get_emplyoment_data?userid='+data['user_id']).success(function(data){
			       if(data.length!=0){
					  $scope.emp=data[0];
					   $scope.edit=true;
					   $scope.userid=$scope.emp.user_id;
					   
					  // var emp_status=$('.emp_status > div.sel__box > span.sel__box__options').text();
					   console.log($scope.emp);
					}else{
						 $scope.edit=false;
					}
			});
			});
		}
		
		
		
		/*if($stateParams.userid!=undefined && $stateParams.review!=undefined){
			
		   $http.post('User/Finance_Controller/get_emplyoment_data?userid='+$stateParams.userid).success(function(data){
						console.log(data);
			       if(data.length!=0){
					  $scope.emp=data[0];
					   $scope.edit=true;
					   $scope.userid=$scope.emp.user_id;
					}else{
						 $scope.edit=false;
					  console.log('data not present');
					}
			});
		}*/
		
		$scope.edit_employment_info=function(){
			
			
			var emp_status=$('.emp_status > div.sel__box > span.selected').text();
			var emp_income_option=$('.emp_income_option > div.sel__box > span.selected').text();
			
			console.log(emp_status,emp_income_option)
			$scope.emp.emp_status=emp_status;
			$scope.emp.emp_income_option=emp_income_option;
		
			$scope.emp.emp_start_date=$('#emp_start_date').val();
			$http.post('User/Home_Controller/edit_employment_info?emp='+JSON.stringify($scope.emp)+'&userid='+$scope.userid).success(function(data){
					 if($stateParams.review){
					 $state.go('review');
					  }else{
						 $state.go('identification',{userid:$stateParams.userid});
					   }
			});

		}
		
		$scope.hide_error=function(errid){
		

			if(errid=='emp_start_date'){
				
			  $scope.empstartdateerrmsg='';
				//document.getElementById("dobpl").classList.add("opacity1"); 
				if($scope.emp.emp_start_date!=undefined){
					// document.getElementById("dobpl").classList.remove("opacity1");
					
				}else{
			      // document.getElementById("dobpl").classList.add("opacity1"); 
				}
				
			}else if(errid=='emp_status'){
			  $scope.empstatus_errmsg='';
			}else if(errid=='emp_income_option'){
			  $scope.empincomeoption_errmsg='';
			}

		}
		
		$scope.add_slash_to_date=function(empdate){
			if(empdate!=undefined){
			   if(empdate.length==2){
			      $scope.emp.emp_start_date=empdate+'/';
			   } 
			}
		  //document.getElementById("dobpl").classList.remove("opacity1");
		}
		
		$scope.validate_start_date=function(empdate){
			// document.getElementById("dobpl").classList.remove("opacity1");
		   if(empdate==undefined){
		    $scope.empstartdateerrmsg='required';
		  }else if(empdate.length!=7){
		     $scope.empstartdateerrmsg='invalid date';
		  }else{
			  
			  var dates = empdate.split("/");
			  var usermonth = dates[0];
			  var useryear = dates[1];
			  
			  if(usermonth>12){
			     $scope.empstartdateerrmsg= 'invalid date';
			  }else{
			       var d = new Date();
			       var curmonth = d.getMonth()+1;
			       var curyear = d.getFullYear();
				  
				  if(useryear > curyear){
				    $scope.empstartdateerrmsg= 'invalid date';
				  }else if(useryear==curyear){
				        if(usermonth >= curmonth){
						      $scope.empstartdateerrmsg= 'invalid date';
						}
				  }
				  
				  
			  }
		    
		  }
		}
		
		$scope.change_phone_format=function(userphone)
		{
			console.log(userphone);
			if(userphone!=undefined){
			   if(userphone.length==3){
			      $scope.emp.emp_phone='('+userphone+')';
			   }else if(userphone.length==8){
			      $scope.emp.emp_phone=userphone+'-';
			   }else if(userphone.length>13){
			     $scope.phoneerr='invalid phone';
			   }
			}
		
		}
		
		$scope.add_doller_sign=function(value,b){
			if(b=='monthly_income'){
			       if(value!=''){
				     $scope.doller1=true;
				}
			}else if(b=='other_income'){
			       if(value!=''){
				     $scope.doller2=true;
				}
			}
			   
		}
	
	$scope.selectedItemChanged=function(){
	
	 $scope.other_income=true;
	
	}
		
	$scope.goto_identification_info=function(){
			      
		    var error=0;
		    var emp_status=$('.emp_status > div.sel__box > span.selected').text();
			var emp_income_option=$('.emp_income_option > div.sel__box > span.selected').text();
			
		     if($scope.empstartdateerrmsg!=''){
			     error=1;
			 } 
		   
		    
			if(error==0){
				
				$scope.emp.emp_status=emp_status;
			    $scope.emp.emp_income_option=emp_income_option;

				$http.post('User/Home_Controller/add_emp_info?emp='+JSON.stringify($scope.emp)+'&userid='+$scope.userid).success(function(data){
					  $state.go('identification',{userid:$stateParams.userid});
				});

			}else{
			    $('html, body').animate({
					scrollTop: $(".spanerror:visible").first().offset().top
				}, 500);
			
			}
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
