angular.module('AdminApp').controller('LeadsController', ['$rootScope', '$scope','$sce','settings','$http','$window','$location','$templateCache','$stateParams','$state', function($rootScope, $scope, $sce,settings,$http,$window,$location,$templateCache,$stateParams,$state) {
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
		$scope.gridOptions = {};
		  $('#pages').removeClass("active");
			$('#dealer').removeClass("active");
		   	   $('#make').removeClass("active");
		   	   $('#vehicle').removeClass("active");
		   $('#calculator').removeClass("active");
		   $('#leads').addClass("active");
	
        get_lead();
        function get_lead(){
			$http.post("Admin/Lead_Controller/get_lead").success(function(data){
	            console.log(data);
				show_lead_data(data);
	         });
		}
		
		function show_lead_data(data){
			console.log(data);
		    $scope.gridOptions={
					  data:data,
					  enableFiltering: true,
					  onRegisterApi: function(gridApi){
					    $scope.gridApi = gridApi;
					  },
					  columnDefs:[
					    {field:"firstname",displayName:'Name'},
						{field:'uemail',displayName:'email'},
						{field:'phone_no',displayName:'phone_no'},
						{field:'dob',displayName:'date of birth'},
						{field:'city',displayName:'city'},
						{field:'state',displayName:'state'},
						{field:'emp_title',displayName:'designation'},
						{field: 'Action', minWidth:300,cellTemplate:'<button class="btn btn-primary uigridbtn" ng-click="grid.appScope.view_lead(row.entity)">View lead</button>',displayName:'Action' }
					  ]
					  /*<button class="btn btn-primary uigridbtn" ng-click="grid.appScope.show_lead(row.entity)">View</button>*/
				  };
		}
        
		$scope.view_lead=function(lead){
			$http.post('Admin/Lead_Controller/get_single_lead_data?user_id='+lead.user_id).success(function(data){
               $scope.enq_list=data;
				console.log(data);
           });
			$scope.lead_list=true;
			$scope.lead_info=true;
		    $scope.data=lead;
		}
        
		$scope.show_list=function(){
		    $scope.lead_list=false;
			$scope.lead_info=false;
		}
		$scope.show_enquiry_data=function(e){
			console.log(e);
			$scope.enq=e;
		   angular.element('#myModal').modal('show');
			
		}
      /* $scope.show_lead=function(data){
		   angular.element('#myModal').modal('show');
		  $scope.data=data;
           var data1=JSON.stringify(data);
           var req = {
                         method: 'POST',
                         url: 'Admin/Lead_Controller/get_detaillead',
                        
                    };
           $http.post('Admin/Lead_Controller/get_detaillead?data='+data1).success(function(data){
             $scope.data=data;
			   console.log(data);
               angular.element('#myModal').modal('show');
           });
       
       
       }
       */
     
       $scope.searchlead=function(lead)
	   {
        if(lead!=''){
           
           $http.post('Admin/Lead_Controller/search?data='+JSON.stringify(lead)).success(function(data){
               console.log(data);
                show_lead_data(data);
           });
        }
           
       }
	   
	  
		
		
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
}]);


