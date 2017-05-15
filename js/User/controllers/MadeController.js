angular.module('UserApp').controller('MadeController', ['$rootScope','$scope','$sce','settings','$cookies','$cookieStore','$http','$window','$location','$templateCache','$stateParams','$state', function($rootScope, $scope, $sce,settings,$cookies,$cookieStore,$http,$window,$location,$templateCache,$stateParams,$state) {
    $scope.$on('$viewContentLoaded', function() {	
        // initialize core components
        App.initAjax();
		$window.scrollTo(0, 0);
		
		/*$cookies.makeid=$stateParams.makeid;
		if($cookies.makeid != null){
			$cookies.put('makeid', $stateParams.makeid);
			var makeid=$cookies.get('makeid');
			
		}else{
		
			var makeid=$cookies.get('makeid');
		} */
		
		var makename=$stateParams.make_name;
		makename=makename.replace(/_/g," ");
		get_make_id();
		function get_make_id(){
			$http.post('User/Home_Controller/get_make_id?makename='+makename).success(function(res){
				if(res.length>0){
				  getmodels(res[0]['make_id']);
				}else{
				  $scope.makeerror_message='please confirm make name is corrects';
				}
				
			});
		}
	
		
		//getmodels(makeid)
		function getmodels(makeid)
		{
			$http.post('User/Home_Controller/getmodels?info='+makeid).success(function(res){
				console.log(res);
				 $scope.modelselct=res;
			});

		}

	$scope.select_trim=function(make,make_name,model)
	{
		make_name=make_name.replace(/ /g,'_');
		console.log(make_name);
		model=model.replace(/ /g,'_');
		$state.go('trim', {make : make,makename:make_name,model : model});
	}
	
	$scope.back_make=function()
	{
			window.history.back();
	}
		
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
}]);


