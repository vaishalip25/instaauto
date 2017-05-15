angular.module('AdminApp').controller('MakeController', ['$rootScope', '$scope','$sce','settings','$http','$window','$location','$templateCache','$stateParams','$state','fileUpload', function($rootScope, $scope, $sce,settings,$http,$window,$location,$templateCache,$stateParams,$state,fileUpload) {
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
		
		
		  $('#pages').removeClass("active");
		$('#vehicle').removeClass("active");
		$('#dealer').removeClass("active");
		 $('#calculator').removeClass("active");
		 $('#leads').removeClass("active");
		$('#make').addClass("active");
		
	  $scope.gridOptions = {};
	  
		get_make_list();
		$scope.Add_make=function(file){
			
			
			//document.getElementById('MakeForm').reset();
			 var uploadUrl = "Admin/Dealer_Controller/Upload_image";
			 if(file!=null){
				 var filename = $scope.make.make_name + '_'+ file.name;
				 filename = filename.replace(/ /g, '_');
				 fileUpload.uploadFileToUrl(file,uploadUrl,filename);
			 }
			 
			
			$scope.make.badge=filename;
			
			$scope.make.makeCountry=$scope.make.makeCountry+',IN';
			
			$scope.msg='Make added successfully';
			
			 $.ajax({

                                url:'Admin/Make_Controller/Add_make',
                                data:{'data':$scope.make},
                                method:'POST',
                                success:function(data){
								  
							      if(data==1){
								      $('#myModal').modal('show');
								  }
									
                                    
                              }
                          });
			
			
		}
		
		$scope.show_list=function(){
			$scope.showform=false;
			$scope.showform_make=false;
			$scope.make_tbls=false;
			$scope.add_btn  =false;
			get_make_list();
			$('#myModal').modal('hide');
		}
		$scope.add_make_countries=function(makeCountry){
		   $scope.make.makeCountry=makeCountry.toString();
		   
		}
		
		function get_make_list(){
			
			$scope.badge="";
			$http.post("Admin/Make_Controller/get_make_list").success(function(data){
				//$scope.makes=data;
				//console.log($scope.makes);
				
				$scope.gridOptions={
					  data:data,
					  columnDefs:[
					  {field:'make_name', displayName:'Make Name' },
                      {field:'featured',minWidth:300, cellTemplate:'<div ng-if="row.entity.featured == 0"><input type="checkbox" ng-model="m.featured" ng-checked="0" name="featured" ng-change="grid.appScope.set_featured_make(row.entity,1)"></div> <div ng-if="row.entity.featured == 1"> <input type="checkbox" ng-model="m.featured" name="featured" ng-click="grid.appScope.set_featured_make(row.entity,0)" ng-checked="1"></div>',displayName:'Featured'},
					  {field:'disclosure', displayName:'Disclosure' },
					  {field:'Action',minWidth:300,cellTemplate:'<button class="btn btn-primary uigridbtn"  ng-click="grid.appScope.edit_make(row.entity)">Edit</button><button type="button" ng-if="row.entity.make_status==0" ng-click="grid.appScope.change_status(1,row.entity.make_id)" class="btn btn-success">Activate</button><button type="button" ng-if="row.entity.make_status==1" ng-click="grid.appScope.change_status(0,row.entity.make_id)" class="btn btn-warning">Deactivate</button>',displayName:'Action' },
					  ]
				  };
			      /*<button class="btn btn-danger uigridbtn"  ng-click="grid.appScope.delete_make(row.entity)">Delete</button>*/
	         });
		}
		
		$scope.change_status=function(status,id){
		
			$http.post("Admin/Make_Controller/change_status?make_id="+id+'&status='+status).success(function(data){
				get_make_list();
	         });
		}
		
		$scope.set_featured_make=function(m,s){
          
			
			m.featured=s;
			
			$scope.update_make(m);
		}
		
		$scope.add_new_make=function()
		{
			
			document.getElementById('MakeForm').reset();
		
			if($scope.make!=undefined || $scope.disclosure!=undefined)
			{
			$scope.make.badge="";
			$scope.make.disclosure="";
			}
				
			$scope.showform_make=true;
			$scope.make_tbls=true;
			$scope.searchinfo=true;
			$scope.add_btn=true;
			$scope.showform=true;
			$scope.addmake=true;
			$scope.savemake=false;
			
		
		}
		
		$scope.show_make_list=function()
		{
			$scope.showform_make=false;
			
			$scope.make_tbls=false;
			$scope.searchinfo=false;
			$scope.add_btn=false;
			$scope.showform=false;
		}
        
        $scope.removeimg=function(i,mkid)
        {
           
            $http.post("Admin/Make_Controller/removeimg?make_img="+i+"&makeid="+mkid).success(function(data){
	            
	         });
        
        }
		
		
		$scope.delete_make=function(m){
			
			$scope.sel_make=m;
			$('#confirmModal').modal('show');
			 
		}
		$scope.delete=function(m){
			
		    $http.post("Admin/Make_Controller/delete_make?make_id="+m.make_id).success(function(data){
				$('#confirmModal').modal('hide');
	            get_make_list();
				$scope.msg='successfully deleted';
				$('#myModal').modal('show');
				
	         });
		}
		$scope.edit_make=function(m){
			
			 
			
			console.log(m.makeCountry);
			if(m.makeCountry!=undefined){
			   var  c=m.makeCountry.split(',');
			    $('#mselect').val(c);
			}
			
			
			
			$scope.s1=false;
			$scope.s2=false;
			
			$scope.addmake=false;
			$scope.savemake=true;
			$scope.showform_make=true;
			$scope.make_tbls=true;
			$scope.searchinfo=true;
			$scope.add_btn=true;
			$scope.showform=true;
			$scope.make=m;
			$scope.edit=true;
		}
		$scope.abc = function(){
	
	
			 $scope.s2=true;
		     $scope.s1=true;
		  
		}		
		$scope.update_make=function(m,file){
          
           
                      var uploadUrl = "Admin/Dealer_Controller/Upload_image";
                      console.log(m);
                      console.log(file);
			 if(file==null || file=='' || file==undefined || file.length==0){
				 
			 }else{
			 
			   var filename = m.make_name + '_'+ file.name;
			   filename = filename.replace(/ /g, '_');
				 fileUpload.uploadFileToUrl(file,uploadUrl,filename);
				 m.badge=filename;
				console.log('y');
			 }
			 
			if(m.makeCountry.split(",").indexOf("IN")){
			
			}else{
			   m.makeCountry=m.makeCountry+',IN';
			}
            
			console.log(m);
			
			delete m.$$hashKey;
           
			 $.ajax({

                                url:'Admin/Make_Controller/update_make',
                                data:{'data':m},
                                method:'POST',
                                success:function(data){
									
									$scope.msg='make updated successfully';
								    $('#myModal').modal('show');
									
                                    
                              }
                          });
		
            
		}
		
		
        $scope.searchmake=function(data){
        
         $.ajax({

                                url:'Admin/Make_Controller/searchmake',
                                data:{'data':data},
                                method:'POST',
                                success:function(data1){
                             		
								
                                         $scope.gridOptions={
                                              data:JSON.parse(data1),
                                              columnDefs:[
                                              {field: 'make_name', displayName:'Make Name' },
                                              {field: 'disclosure', displayName:'Disclosure' },
                                              {field: 'Action',minWidth:300,cellTemplate:'<button class="btn btn-primary uigridbtn"  ng-click="grid.appScope.edit_make(row.entity)">Edit</button><button class="btn btn-danger uigridbtn"  ng-click="grid.appScope.delete_make(row.entity)">Delete</button>',displayName:'Action' },
                                              ]
                                          };
			
									
                                    
                              }
                          });
        
        }   
		
	
	
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
}]);

AdminApp.directive('fileModel', ['$parse', function ($parse) {
    return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
            scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
            });
        });
    }
   };
}]);
AdminApp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl, name){
         var fd = new FormData();
         fd.append('file', file);
         fd.append('name', name);
         $http.post(uploadUrl, fd, {
             transformRequest: angular.identity,
             headers: {'Content-Type': undefined,'Process-Data': false}
         })
         .success(function(data){
            console.log(data);
         })
         .error(function(){
            
         });
     }
 }]);
 
