angular.module('AdminApp').controller('CalculatorController', ['$rootScope', '$scope','$sce','settings','$http','$window','$location','$templateCache','$stateParams','$state', function($rootScope, $scope, $sce,settings,$http,$window,$location,$templateCache,$stateParams,$state) {
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
		
				$('#dealer').removeClass("active");
		   	   $('#make').removeClass("active");
		   	   $('#vehicle').removeClass("active");
		   	   $('#leads').removeClass("active");
		   $('#calculator').addClass("active");
		
        App.initAjax();
		
		get_data();
		function get_data(){
			
			$http.post('Admin/Calculator_Controller/getdata').success(function(res){
				console.log(res);
			    $scope.calc=res[0];
			});
		}
		
		$scope.save_cal=function(calc)
		{
			var error=0;
			var dp=Math.ceil(calc.down_payment);
			var ip=Math.ceil(calc.interest_rt);
		    var tp=Math.ceil(calc.tax_rate);
			
			if(dp>100 || dp<0){
			  $scope.dperrmsg='please enter valid down payment percent';
				error=1;
			}
			if(ip>100 || ip<0){
			  $scope.iperrmsg='please enter valid interest rate';
			  error=1;
			}
			if(tp>100 || tp<0){
			  $scope.tperrmsg='please enter valid tax rate';
			   error=1;
			}
			if(error==0){
				var calc_data = JSON.stringify(calc);
				$http.post('Admin/Calculator_Controller/save_cal?info='+calc_data).success(function(res){
					console.log(res);
					$('#myModal').modal('show');
				});
	    	}
		}
		
		get_data_aus();
		function get_data_aus(){
			
			$http.post('Admin/Calculator_Controller/getdata_aus').success(function(res){
				console.log(res);
			    $scope.calc_aus=res[0];
			});
		}
		$scope.save_cal_aus=function(calc_aus)
		{
			var error=0; 
			var d=Math.ceil(calc_aus.down_payment);
			var i=Math.ceil(calc_aus.interest_rt);
		    var t=Math.ceil(calc_aus.tax_rate);
			console.log(d,i,t);
			if(d>100 || d<0){
			  $scope.derrmsg='please enter valid down payment percent';
				error=1;
			}
			if(i>100 || i<0){
			  $scope.ierrmsg='please enter valid interest rate';
			  error=1;
			}
			if(t>100 || t<0){
			  $scope.terrmsg='please enter valid tax rate';
			   error=1;
			}
			
			if(error==0){
			  var calc_data = JSON.stringify(calc_aus);
				$http.post('Admin/Calculator_Controller/save_cal_aus?info='+calc_data).success(function(res){
					console.log(res);
					$('#myModal').modal('show');
				});
			}
			
		}
		$scope.hide_error=function(divname){
			
		 if(divname=='d'){
		   $scope.derrmsg='';
		 }else if(divname=='i'){
		   $scope.ierrmsg='';
		 }else if(divname=='t'){
		   $scope.terrmsg='';
		 }else if(divname=='dp'){
		   $scope.dperrmsg='';
		 }else if(divname=='ip'){
		   $scope.iperrmsg='';
		 }else if(divname=='tp'){
		   $scope.tperrmsg='';
		 }
		}
		
		
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
}]);


