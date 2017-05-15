
angular.module('UserApp').controller('StatediscController', ['$rootScope','$scope','$sce','settings','$http','$localStorage','$window','$location','$templateCache','$stateParams','$state', function($rootScope, $scope, $sce,settings,$http,$localStorage,$window,$location,$templateCache,$stateParams,$state) {
    $scope.$on('$viewContentLoaded', function() {	
        App.initAjax();
		$window.scrollTo(0, 0);

		 $.get("https://ipinfo.io", function(response) {
			    $scope.user_country=response.country;
			    if($scope.user_country!=undefined){
				   get_disclosure_data($scope.user_country);
				}
			   
			}, "jsonp"); 
		
		function get_disclosure_data(country){
		    $http.post('User/Home_Controller/get_disclosure_data?counry='+country).success(function(data){
			    console.log(data);
		        $scope.page_data=data;
		    });
		
		}
	   
    });

    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
}]);


