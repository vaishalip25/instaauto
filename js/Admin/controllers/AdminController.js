angular.module('AdminApp').controller('AdminController', ['$rootScope', '$scope','$sce','settings','$http','$window','$location','$templateCache','$stateParams','$state', function($rootScope, $scope, $sce,settings,$http,$window,$location,$templateCache,$stateParams,$state) {
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
		
		
		
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
}]);


