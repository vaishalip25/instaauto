angular.module('UserApp').controller('ApplicationController', ['$rootScope','$scope','$sce','settings','$http','$localStorage','$window','$location','$templateCache','$stateParams','$state', function($rootScope, $scope, $sce,settings,$http,$localStorage,$window,$location,$templateCache,$stateParams,$state) {
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
			   
				 $http.post('User/Finance_Controller/get_userdata?userid='+data['user_id']).success(function(data){
					 
			       if(data.length!=0){
					   $scope.user=data[0];
					   $scope.edit=true;
					   $scope.signupview=true;
					   $scope.userid=$scope.user.user_id;
					}else{
						 $scope.edit=false;
					  
					}
			    });
			});
		}
	
		 $scope.goto_residential_info=function(){
			 
			  var error=0;
			 console.log($scope.msg);
			 if($scope.msg=='email already exist'){
			    error=1;
				 
			 }else if($scope.doberrmsg!=''){
				 $scope.doberrmsg='birthdate required';
			   error=1;
			 }else{
			   error=0;
			 }
			 console.log(error);
		
			 var edata={
						  requested_amount:$localStorage.credit_data['amount_reqested'],
						  dealer_id:$localStorage.credit_data['dealer_id'],
						  vehicle_id:$localStorage.credit_data['vehicle_id'],
						  estimated_trade:$localStorage.credit_data['estimated_trade_in'],
						  down_payment:$localStorage.credit_data['down_payment'],
						  terms:$localStorage.credit_data['terms'],
					 }
			 
			if(error==0){
				$http.post('User/Home_Controller/add_user?user='+JSON.stringify($scope.user)+'&edata='+JSON.stringify(edata)).success(function(enqid){
					console.log(enqid);
					   $localStorage.en_id=enqid;
					   $rootScope.user_login();
					   $state.go('residence',{userid:$scope.userid});
				});
			}else{
			     $('html, body').animate({
					scrollTop: $(".spanerror:visible").first().offset().top
				}, 500);
			
			}
	    }
		
		$scope.do_login=function(){
		
		   $http.post('User/Finance_Controller/do_login?loginemail='+$scope.loginemail+'&loginpwd='+$scope.loginpwd).success(function(result){
			 if(result==0){
			   $state.reload();
			   $rootScope.user_login();
				 $state.go('residence');
			 }else{
			    $scope.login_errmsg='email or password is invalid';
			 
			 }
			
		   });
		}
		
		$scope.request_reset_password=function(){
		   $http.post('User/Finance_Controller/request_reset_password?email='+$scope.forgetemail).success(function(result){
			  if(result=='exist'){
			    $scope.errmsg='email does not exist';
			  }else{
			      $http.post('http://indybuildcorp.com/autogravity/emails/resetpassword.php?email='+$scope.forgetemail+'&userid='+result).success(function(result1){
				   console.log(result1);
				  
				  });
			  }
			   
			   console.log(result);
		   });
		}
		
		$scope.reset_password=function(pwd){
			var s=$location.absUrl().split('?')
			var s1=s[1].split('=');
		     $http.post('User/Finance_Controller/reset_password?id='+s1[1]+'&pwd='+pwd).success(function(result){
				 console.log(result);
			      $scope.resetform=true;
				  $scope.success=true;
		     });
		}
		
		$scope.edit_personal_info=function(){
			$scope.user.dob=$('#dob').val();
			$http.post('User/Home_Controller/edit_user?user='+JSON.stringify($scope.user)+'&userid='+$scope.userid).success(function(data){
			   if($stateParams.review){
				 $state.go('review');
			   }else{
				  $state.go('residence',{userid:$scope.userid});
			   }

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
		
		$scope.hide_error=function(errid){
			 if(errid=='dob'){
				$scope.doberrmsg='';
				//document.getElementById("dobpl").classList.add("opacity1"); 
				if($scope.user.dob!=undefined){
					//document.getElementById("dobpl").classList.remove("opacity1");
					
				}else{
			      // document.getElementById("dobpl").classList.add("opacity1"); 
				}
				
			 }

		}
		
		$scope.add_slash_to_date=function(bdate){
			if(bdate!=undefined){
			   if(bdate.length==2){
			      $scope.user.dob=bdate+'/';
			   }else if(bdate.length==5){
			      $scope.user.dob=bdate+'/';
			   }
			}
		 // document.getElementById("dobpl").classList.remove("opacity1");
		}
		
		$scope.validate_date=function(bdate){
		//  document.getElementById("dobpl").classList.remove("opacity1");
		  if(bdate==undefined){
		    $scope.doberrmsg='birhdate is required';
		  }else if(bdate.length!=10){
		     $scope.doberrmsg='invalid birthdate';
		  }else{
			  
			  var dates = bdate.split("/");
			  var userday = dates[0];
		   	  var usermonth = dates[1];
			  var useryear = dates[2];
			  
			  if(usermonth>12){
			     $scope.doberrmsg='invalid birthdate';
			  }else if(userday>31){
			     $scope.doberrmsg='invalid birthdate';
			  }else{
				 var age=getAge(bdate);
				 if(age<18){
					$scope.doberrmsg='must be 18 years or older';
				 }else{
				 //  document.getElementById("dobpl").classList.remove("opacity1");
				   $scope.doberrmsg='';
				 }
			  
			  }
		    
		  }
		}
		
		$scope.change_phone_format=function(userphone)
		{
			if(userphone!=undefined){
			   if(userphone.length==3){
			      $scope.user.phone_no='('+userphone+')';
			   }else if(userphone.length==8){
			      $scope.user.phone_no=userphone+'-';
			   }else if(userphone.length>13){
			     $scope.phoneerr='invalid phone';
			   }
			}
		
		}	
		$scope.hide=function(name){
		 if(name==undefined){
		   $scope.userForm.firstname.$invalid=false;
			$scope.userForm.firstname.$dirty=false; 
		 }
		
		}
		
		function getAge(dateString) {

			var dates = dateString.split("/");
			var d = new Date();

			var usermonth = dates[0];
			var userday = dates[1];
			var useryear = dates[2];

			var curday = d.getDate();
			var curmonth = d.getMonth()+1;
			var curyear = d.getFullYear();

			var age = curyear - useryear;

			if((curmonth < usermonth) || ( (curmonth == usermonth) && curday < userday   )){

				age--;

			}

			return age;
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
		
	  
	    
	   
	   $scope.validate_password=function(pwd){
		
		var l=0
        var c=0
        var n=0;
			
			
			if(pwd==undefined){
			  document.getElementById("size").classList.remove("valid-pass");
		      document.getElementById("cletter").classList.remove("valid-pass");
			  document.getElementById("num").classList.remove("valid-pass");
			  document.getElementById("lletter").classList.remove("valid-pass");
			}else if(pwd.length!=0){
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
			
			if(c>0){
				
			    document.getElementById("lletter").classList.add("valid-pass");
			 }else{
				document.getElementById("lletter").classList.remove("valid-pass");
			   
			}
			
			if(l>0){
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
		
		  
			}else{
		       document.getElementById("size").classList.remove("valid-pass");
		      document.getElementById("cletter").classList.remove("valid-pass");
			  document.getElementById("num").classList.remove("valid-pass");
			  document.getElementById("lletter").classList.remove("valid-pass");
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
