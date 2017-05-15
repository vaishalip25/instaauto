angular.module('AdminApp').controller('DisclosureController', ['$rootScope', '$scope','$sce','settings','$http','$window','$location','$templateCache','$stateParams','$state', function($rootScope, $scope, $sce,settings,$http,$window,$location,$templateCache,$stateParams,$state) {
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
		
		$('#dealer').removeClass("active");
	    $('#make').removeClass("active");
	    $('#vehicle').removeClass("active");
	    $('#leads').removeClass("active");
        $('#calculator').removeClass("active");
		$('#disclosure').addClass("active");
	
		get_disclosure_data();
		
		function get_disclosure_data(){
		    $http.post("Admin/Disclosure_Controller/get_disclosure_data").success(function(data){
         
			  $scope.disclosures=data;

			 });
		}
		
		$scope.edit_disclosure=function(d){
		  $scope.editable_disc=d;
		}
		
		$scope.save_disclosure=function(d){
		
			delete d.$$hashKey;
		     $http.post("Admin/Disclosure_Controller/save_disclosure?d="+JSON.stringify(d)).success(function(data){
				
				  $('#myModal').modal('show');
			 });
		}
	 
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
}]);
