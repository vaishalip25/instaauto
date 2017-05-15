
angular.module('UserApp').controller('NoticeController', ['$rootScope','$scope','$sce','settings','$http','$localStorage','$window','$location','$templateCache','$stateParams','$state', function($rootScope, $scope, $sce,settings,$http,$localStorage,$window,$location,$templateCache,$stateParams,$state) {
    $scope.$on('$viewContentLoaded', function() {	
        App.initAjax();
		$window.scrollTo(0, 0);

		 var page_name='Privacy Notice';
	     $http.post('User/Home_Controller/get_page_data?page_name='+page_name).success(function(data){
			console.log(data);
		    $scope.page_data=data;
		});
	   
    });

    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
}]);


