angular.module('UserApp').controller('SuccessController', ['$rootScope','$scope','$sce','settings','$http','$localStorage','$window','$location','$templateCache','$stateParams','$state', function($rootScope, $scope, $sce,settings,$http,$localStorage,$window,$location,$templateCache,$stateParams,$state) {
    $scope.$on('$viewContentLoaded', function() {	
        // initialize core components
        App.initAjax();
		$window.scrollTo(0, 0);
		
		$scope.redirect=function(page){
		  $state.go(page);
		}
		
		$scope.show_review=function(){
		  $rootScope.user_enquiry=true;	
		  $state.go('finance');
		
		}
	
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
}]);

