angular.module('UserApp').controller('ResidenceController', ['$rootScope','$scope','$sce','settings','$http','$localStorage','$window','$location','$templateCache','$stateParams','$state', function($rootScope, $scope, $sce,settings,$http,$localStorage,$window,$location,$templateCache,$stateParams,$state) {
    $scope.$on('$viewContentLoaded', function() {	
        // initialize core components
        App.initAjax();
	   $window.scrollTo(0, 0);
		$scope.redirect=function(page){
		  $state.go(page);
		}
		
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
			{ name:'Delaware' },
			{ name:'Florida' },
			{ name:'Georgia' },
			{ name:'Hawaii' },
			{ name:'Idaho' },
			{ name:'Illinois' },
			{ name:'Indiana' },
			{ name:'Iowa' },
			{ name:'Kansas' },
			{ name:'Kentucky' },
			{ name:'Louisiana' },
			{ name:'Maine' },
			{ name:'Maryland' },
			{ name:'Massachusetts' },
			{ name:'Michigan' },
			{ name:'Minnesota' },
			{ name:'Mississippi' },
			{ name:'Missouri' },
			{ name:'Montana' },
			{ name:'Nebraska' },
			{ name:'Nevada' },
			{ name:'New Hampshire' },
			{ name:'New Jersey' },
			{ name:'New Mexico' },
			{ name:'New York' },
			{ name:'North Carolina' },
			{ name:'North Dakota' },
			{ name:'Ohio' },
			{ name:'Oklahoma' },
			{ name:'Oregon' },
			{ name:'Pennsylvania' },
			{ name:'Rhode Island' },
			{ name:'South Carolina' },
			{ name:'South Dakota' },
			{ name:'North Carolina' },
			{ name:'North Dakota' },
			{ name:'Tennessee' },
			{ name:'Texas' },
			{ name:'Utah' },
			{ name:'Vermont' },
			{ name:'Virginia' },
			{ name:'Washington' },
			{ name:'West Virginia' },
			{ name:'Wisconsin' },
			{ name:'Wyoming' },
		];
		
		
		
		$scope.selected_dealer=$localStorage.dealer[0];
		$scope.country=$scope.selected_dealer.selectedcountry;
		
		if($scope.country=='aus'){
		  $scope.state_list=$scope.AUS_STATES;
		}else if($scope.country=='us'){
		  $scope.state_list=$scope.US_STATES;
		}
	
		
		check_session();
		function check_session(){
		   $http.post('User/Login_Controller/checksession').success(function(data){

			   $scope.userid=data['user_id'];
				 $http.post('User/Finance_Controller/get_residence_data?userid='+data['user_id']).success(function(data){
                    
					 if(data.length!=0){
						 console.log(data[0]);
					   $scope.resi_info=data[0];
					   $scope.edit=true;
					   $scope.userid=$scope.resi_info.user_id;
					   $scope.validate_move_date($scope.resi_info.move_date);
						 
						 
						 
					}else{
						$scope.edit=false;
					}
			     });
			});
		}
	       
		
	    $scope.goto_employment_info=function(){
			console.log($scope.previous_residence);
		   var error=0;
			if($scope.previous_residence){
			    if($scope.movedate_errmsg!='' || $scope.prevmovein_errmsg!='' || $scope.prevmoveout_errmsg!=''){
			        error=1;
			    }
			}else{
			   if($scope.movedate_errmsg!=''){
			      error=1;
			    }
			}
			console.log(error);
			if(error==0){
			      
				var state=$('.state > div.sel__box > span.selected').text();
				var rentown=$('.rentown > div.sel__box > span.selected').text();
				var prevstate=$('.prevstate > div.sel__box > span.selected').text();
				var prevrentown=$('.prevrentown > div.sel__box > span.selected').text();

				$scope.resi_info.state=state;
				$scope.resi_info.prev_state=prevstate;
				$scope.resi_info.rent_own=rentown;
				$scope.resi_info.prev_rent_own=prevrentown;
				$scope.resi_info.country=$scope.country;
			$http.post('User/Home_Controller/add_resi_info?resi_info='+JSON.stringify($scope.resi_info)+'&userid='+$scope.userid).success(function(data) {
					$state.go('employment',{userid:$stateParams.userid});
				});
			
			
			}else{
			 $('html, body').animate({
					scrollTop: $(".spanerror:visible").first().offset().top
				}, 500);
			
			}
			
	    }
		$scope.edit_residential_info=function(){
			var state=$('.state > div.sel__box > span.selected').text();
			var rentown=$('.rentown > div.sel__box > span.selected').text();
			var prevstate=$('.prevstate > div.sel__box > span.selected').text();
			var prevrentown=$('.prevrentown > div.sel__box > span.selected').text();
			
			$scope.resi_info.state=state;
			$scope.resi_info.prev_state=prevstate;
			$scope.resi_info.rent_own=rentown;
			$scope.resi_info.prev_rent_own=prevrentown;
			
			console.log($scope.resi_info);
			
			//$scope.resi_info.move_date=$('#move_date').val();
			//$scope.resi_info.prev_move_in=$('#prev_move_in').val();
			//$scope.resi_info.prev_move_out=$('#prev_move_out').val();
			
			delete $scope.resi_info.residence_id;
			$http.post('User/Home_Controller/edit_residential_info?resi_info='+JSON.stringify($scope.resi_info)+'&userid='+$scope.userid).success(function(data){
				if($stateParams.review){
					 $state.go('review');
			 }else{
				 $state.go('employment',{userid:$stateParams.userid});
			 }
		});

		}

		
		console.log($scope.country);
		
		$scope.add_doller_sign=function(value,s){
			if(s=='current'){
			   if(value!=''){
			     $scope.doller=true;
			   }
			}else if(s=='prev'){
			  if(value!=''){
			     $scope.doller2=true;
			   }
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
			}else if(errid=='move_date'){
				
			  $scope.movedate_errmsg='';
			 // document.getElementById("movedate").classList.add("opacity1"); 
				
				
			}else if(errid=='prev_move_in'){
				
			  $scope.prevmovein_errmsg='';
			//  document.getElementById("prevdobpl").classList.add("opacity1");
				/*if($scope.resi_info.prev_move_in==undefined){
					document.getElementById("prevdobpl").classList.add("opacity1"); 
				}else{
			       document.getElementById("prevdobpl").classList.remove("opacity1");
				}*/
				
			}else if(errid=='prev_move_out'){
				
			  $scope.prevmoveout_errmsg='';
			  //document.getElementById("moveout").classList.add("opacity1");
				/*if($scope.resi_info.prev_move_out==undefined){
					document.getElementById("moveout").classList.add("opacity1"); 
				}else{
			       document.getElementById("moveout").classList.remove("opacity1");
				}*/
				
			}

		}
		
		
		$scope.add_slash_to_date=function(movedate,field){
			if(movedate!=undefined){
			   if(movedate.length==2){
				   if(field=='movein'){
				     $scope.resi_info.move_date=movedate+'/';
				   }else if(field=='pmovein'){
				      $scope.resi_info.prev_move_in=movedate+'/';
				   }else if(field=='pmoveout'){
				      $scope.resi_info.prev_move_out=movedate+'/';
				   }
			   } 
			}
		 // document.getElementById("movedate").classList.remove("opacity1");
		  //document.getElementById("prevdobpl").classList.remove("opacity1");
		 //document.getElementById("moveout").classList.remove("opacity1");
		}
		
		$scope.validate_move_date=function(movedate){
			
			//document.getElementById("movedate").classList.remove("opacity1");
			
			 if(movedate==undefined){
		       
		     }else if(movedate.length!=7){
		        $scope.movedate_errmsg='invalid date';
		     }else{
			    
				  var dates = movedate.split("/");
			      var usermonth = dates[0];
			      var useryear = dates[1];
			      if(usermonth>12){
					 $scope.movedate_errmsg='invalid date';
				  }else{
                        
					  var months=get_diff(movedate);
					 
					  if( months < 0){
					    $scope.movedate_errmsg='invalid date';
					  }else if(months<3){
						  $scope.previous_residence=true;
					  }else{
					    $scope.previous_residence=false;
					  }
				  }
				
			 }
			  
		}
		$scope.validate_prev_move_date=function(prevmovedate){
			
		 // document.getElementById("prevdobpl").classList.remove("opacity1");
		     if(prevmovedate==undefined){
		       $scope.prevmovein_errmsg='invalid date';
		     }else if(prevmovedate.length!=7){
		        $scope.prevmovein_errmsg='invalid date';
		     }else{
			      var dates = prevmovedate.split("/");
			      var usermonth = dates[0];
			      var useryear = dates[1];
				 
				   if(usermonth>12){
					  $scope.prevmovein_errmsg='invalid date';
				   }else{
					   var move_date=$scope.resi_info.move_date;
                       var m = move_date.split("/");
					   var mmonth=m[0];
					   var myear=m[1];
					   
					   var mts;
					   mts = (parseInt(myear) - parseInt(useryear)) * 12;
					   mts -= parseInt(usermonth) + 1;
					   mts +=parseInt(mmonth);
                       if(mts<0){
					     $scope.prevmovein_errmsg='date must before current move date';
					   }
				
				  }
				 
			 }
		}
		
		function get_diff(movedate){
		      var dates = movedate.split("/");
			  var d = new Date();
			
			  var usermonth = dates[0];
			  var useryear = dates[1];
			
			  var curmonth = d.getMonth()+1;
			  var curyear = d.getFullYear();
			
			var months;
               months = (curyear - parseInt(useryear)) * 12;
              months -= parseInt(usermonth) + 1;
              months +=curmonth;
             return months ;
			
		}
		
		$scope.validate_prev_move_out_date=function(moveout){
			
			
			
		    //document.getElementById("moveout").classList.remove("opacity1");
			 if(moveout==''){
		       $scope.prevmoveout_errmsg='invalid date';
		     }else if(moveout.length!=7){
		        $scope.prevmoveout_errmsg='invalid date';
		     }else{
				  var dates = moveout.split("/");
				  var outmonth = dates[0];
				  var outyear = dates[1];

				   if(outmonth>12){
					  $scope.prevmoveout_errmsg='invalid date';
				   }else{
					   var move_date=$scope.resi_info.move_date;

					   var m = move_date.split("/");
					   var cur = new Date();
                      
					   var curmonth = cur.getMonth()+1;
					   var curyear = cur.getFullYear();
					   
					   var mmonth=m[0];
					   var myear=m[1];
					   
					   if(myear < outyear){
					       $scope.prevmoveout_errmsg='date must before current move date';
					   }else if(myear==outyear){
						   
					      if(outmonth >= mmonth){
                              $scope.prevmoveout_errmsg='date must before current move date';
						  }
					   }
					   
					   var movin=$scope.resi_info.prev_move_in;
					   var d = movin.split("/");
					   var inmonth = d[0];
					   var inyear = d[1];


					   var months;
					   months = (parseInt(outyear) - parseInt(inyear)) * 12;
					   months -= parseInt(inmonth) + 1;
					   months +=parseInt(outmonth);
                           

					   if( months < 0){
						 $scope.prevmoveout_errmsg='date must after prev. move in date';
					   }
					   
					   
					   
			  }
				 
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
