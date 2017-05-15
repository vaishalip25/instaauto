
angular.module('AdminApp').controller('PagesController', ['$rootScope','$scope','$http','$state', '$window',
														  function($rootScope, $scope, $http,$state,$window) {
    $scope.$on('$viewContentLoaded', function() {	
        App.initAjax();
		$window.scrollTo(0, 0);
		
		$('#pages').addClass("active");
		$('#dealer').removeClass("active");
	    $('#make').removeClass("active");
	    $('#vehicle').removeClass("active");
	    $('#leads').removeClass("active");
        $('#calculator').removeClass("active");
		$('#disclosure').removeClass("active");
		
		$http.post('Admin/Page_Controller/get_pages').success(function(data){
		  console.log(data);
			$scope.tabs=data;
			
		});
		
		$scope.get_content=function(tab){
		   
			
		
		}
		
		$scope.save=function(tab){
			 delete tab.$$hashKey;
			
			 $.ajax({
					url:'Admin/Page_Controller/save',
					data:{'data':JSON.stringify(tab)},
					method:'POST',
					success:function(data){
						 console.log(data);
					    $('#myModal').modal('show');
				  }
			  });
		}
       
		
	});
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
}]);


