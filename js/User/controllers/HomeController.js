angular.module('UserApp').controller('HomeController', ['$rootScope', '$scope','$sce','settings','$http','$localStorage','$window','$location','$templateCache','$stateParams','$state', function($rootScope, $scope, $sce,settings,$http,$localStorage,$window,$location,$templateCache,$stateParams,$state) {
    $scope.$on('$viewContentLoaded', function() {	
        // initialize core components
        App.initAjax();
		
		
		checkRouting();
		function checkRouting(){
			var state = document.getElementById("state").value;
			if(state == null || state === undefined){
			  $state.go(state);	
			}
		}
		
		  $.get("https://ipinfo.io", function(response) {
			    $scope.user_country=response.country;
			    if($scope.user_country!=undefined){
					if($scope.user_country=='AUS' || $scope.user_country=='US'){
				      
					}else{
					   $scope.user_country='AUS';
					}
					 get_make($scope.user_country);
				     console.log($scope.user_country);
				}
			   
			}, "jsonp");
		
	 
	   function get_make(usercountry){
		   if(usercountry=='AU'){
		     usercountry='AUS';
		   }
			$scope.makeview=true;
			$http.post("User/Home_Controller/get_make?country="+usercountry).success(function(res){
				console.log(res)
			    $scope.make=res;
	         });
			 
			 $http.post("User/Home_Controller/get_featuredmake?country="+usercountry).success(function(res){
				console.log(res);
			  $scope.femake=res;
	         });
		}	
	
		$scope.getmodels=function(model,makename)
		{
			makename=makename.replace(/ /g,"_");
			$state.go('made', {makeid : model,make_name:makename});
		}
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
}]);


