angular.module('UserApp').controller('IdentificationController', ['$rootScope','$scope','$sce','settings','$http','$localStorage','$window','$location','$templateCache','$stateParams','$state', function($rootScope, $scope, $sce,settings,$http,$localStorage,$window,$location,$templateCache,$stateParams,$state) {
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
		
		
		$scope.selected_dealer=$localStorage.dealer[0];
		$scope.country=$scope.selected_dealer.selectedcountry;
		check_session();
		function check_session(){
		   $http.post('User/Login_Controller/checksession').success(function(data){
			    $scope.userid=data['user_id'];
				 $http.post('User/Finance_Controller/get_userdata?userid='+data['user_id']).success(function(data){
						console.log(data);
					 var s={};
					 
			         if(data.length!=0){
					   if($scope.country=='aus'){
						   s={security:data[0].license_number,liscence_state:data[0].liscence_state,credit_history:data[0].credit_history}
					      //$scope.security=data[0].license_number;
						   $scope.s=s;
					   }else if($scope.country=='us'){
						   s={security:data[0].license_number,credit_history:data[0].credit_history};
						    $scope.s=s;
					      //$scope.security=data[0].social_security_no;
					   }
					   $scope.user=data[0];
					   $scope.edit=true;
					   
					}else{
						 $scope.edit=false;
					}
			   });
			});
		}
		
		
		/*if($stateParams.userid!=undefined && $stateParams.review!=undefined){
		   $http.post('User/Finance_Controller/get_userdata?userid='+$stateParams.userid).success(function(data){
						console.log(data[0].social_security_no);
			       if(data.length!=0){
					   if($scope.country=='aus'){
					    $scope.security=data[0].liscence_number;
					   }else if($scope.country=='us'){
					     $scope.security=data[0].social_security_no;
					   }
					   $scope.user=data[0];
					   $scope.edit=true;
					   
					}else{
						 $scope.edit=false;
					  console.log('data not present');
					}
			});
		}
		*/
		
		
		
		
	$scope.goto_review=function(){
		
		var state=$('.state > div.sel__box > span.selected').text();
		$scope.s.liscence_state=state;
		
		var credit_history=$('.credit > div.sel__box > span.selected').text();
		$scope.s.credit_history=credit_history;
		
	$http.post('User/Finance_Controller/add_identification_info?s='+JSON.stringify($scope.s)+'&country='+$scope.country+'&userid='+$scope.userid).success(function(data){
			console.log(data);
			$state.go('review',{userid:$stateParams.userid});
		});
		
	}
	
	$scope.edit_identification_info=function(){
		
		   $scope.goto_review();
			/*$http.post('User/Home_Controller/add_identification_info?license_number='+$scope.license_number+'&userid='+$localStorage.userid).success(function(data){
				$state.go('review');
			});*/

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
