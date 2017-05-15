angular.module('AdminApp').controller('DealerController', ['$rootScope', '$scope','$sce','settings','$http','$window','$location','$templateCache','$stateParams','$state','fileUpload','Map', function($rootScope, $scope, $sce,settings,$http,$window,$location,$templateCache,$stateParams,$state,fileUpload,Map) {
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
		
		  $('#pages').removeClass("active");
				$('#vehicle').removeClass("active");
		   	   $('#make').removeClass("active");
				$('#calculator').removeClass("active");
				$('#leads').removeClass("active");
		  	 $('#dealer').addClass("active");
		
        App.initAjax();
		
	 $scope.gridOptions = {};	
	 $scope.place = {};
    var vehicles=[];
    $scope.search = function() {
		$scope.addr_errmsg='';
	console.log($("#searchBox").val());
        $scope.apiError = false;
		if(document.getElementById("map"))
		{
        Map.search($("#searchBox").val())
        .then(
            function(res) { // success
                Map.addMarker(res);
                $scope.place.name = res.name;
                $scope.place.lat = res.geometry.location.lat();
                $scope.place.lng = res.geometry.location.lng();
            },
            function(status) { // error
                $scope.apiError = true;
                $scope.apiStatus = status;
            }
        );
		}
    }
    
	
		get_dealers();
		
//		mapini();
		$scope.selected_models=[];
		
		$scope.upload=function(p){
			
             var file = $scope.compose.myFile;
             var file = $scope.compose.myFile;
	          console.log(file);
		     /* var file = p;
             var uploadUrl = "Admin/Dealer_Controller/Upload_image";
			 if(file!=null){
				 var filename = file.name;
				 fileUpload.uploadFileToUrl(file,uploadUrl,filename);
			 } */
		}
		function get_dealers(){
			
			$http.post("Admin/Dealer_Controller/get_dealers").success(function(data){
	            $scope.dealers=data;
				console.log($scope.dealers);
				$scope.gridOptions={
					  data:data,
					  enableFiltering: true,
					  onRegisterApi: function(gridApi){
					    $scope.gridApi = gridApi;
					  },
					  columnDefs:[
					    {field:'name',displayName:'Name'},
						{field:'email',displayName:'Email'},
						{field:'make_name',displayName:'Make'},
						{field:'phone',displayName:'Phone'},
						{field:'postcode',displayName:'Zipcode'},
						{field:'city',displayName:'City'},
						{field:'state',displayName:'State'},
						{field:'country',displayName:'Country'},
						{field:'website',displayName:'website'},
						{field: 'Action', minWidth:300,cellTemplate:'<button class="btn btn-primary uigridbtn" ng-click="grid.appScope.show_dealer(row.entity)">Edit</button><button type="button" ng-if="row.entity.status==0" ng-click="grid.appScope.change_status(1,row.entity.dealer_id)" class="btn btn-success">Activate</button><button type="button" ng-if="row.entity.status==1" ng-click="grid.appScope.change_status(0,row.entity.dealer_id)" class="btn btn-warning">Deactivate</button><button type="button" ng-click="grid.appScope.delete_dealer(row.entity)" class="btn btn-danger uigridbtn">Delete</button>',displayName:'Action' }
					  ]
					  
				  };
				
	         });
			
		}
		
		
		$scope.get_makes=function(country){
			$scope.scon_errmsg='';
			$scope.models='';
			$scope.selected_models=[];
			console.log(country);
			if(country=='aus')
			{
				$scope.usphone=false;
				$scope.ausphone=false;
				
			}
			else if(country=='us') 
			{
			$scope.ausphone=true;
			$scope.usphone=true;
				
			}
			$http.post("Admin/Dealer_Controller/get_makes?selected_con="+country).success(function(data){
	            $scope.makes=data;
				console.log($scope.makes);
	         });
		}
		
		$scope.get_models=function(m){
			console.log(m);
			//$scope.selected_models='';
			$http.post("Admin/Dealer_Controller/get_models?make_id="+m).success(function(data){
	            $scope.models=data;
				console.log($scope.models);
	         });
		}
		$scope.remimg=function(di,did)
        {
            console.log(di);
            $http.post("Admin/Dealer_Controller/remimg?de_img="+di+"&deid="+did).success(function(data){
	            console.log(data);
	         });
        
        }
		$scope.show_models=function(model){
			var flag=0;
			var m= JSON.parse(model);
			console.log($scope.selected_models.length);
			for(var i=0;i<$scope.selected_models.length;i++){
				if($scope.selected_models[i].vehicle_id==m.vehicle_id){
					flag=1;
				}
			}
			if(flag==0){
				$scope.selected_models.push(JSON.parse(model));
			}
			console.log($scope.selected_models);
			
			//console.log($scope.selected_models);
		}
		$scope.show_dealer=function(s){
			console.log(s);
			
			Map.initEdit(s.latitude,s.longitude);
			$scope.dealer_list=true;
			$scope.dealer_form=true;
			$scope.addbtn=false;
			
			$scope.updatebtn=true;
			delete s.$$hashKey;
			$scope.dealer=s;
			$scope.get_makes(s.selectedcountry);
			
			$http.post("Admin/Dealer_Controller/get_model_names?models="+s.model).success(function(data){
				console.log(data);
				$scope.get_models(s.make);
	            $scope.selected_models=data;
	        });
			
			$http.post("Admin/Dealer_Controller/get_time?dealer_id="+s.dealer_id).success(function(data){
	            $scope.time=data[0];
				console.log($scope.time);
	        });
		}
		
		
		
		$scope.remove_model=function(m){
			alert();
			console.log(m);
		}
		$scope.change_status=function(dstatus,did){
			console.log(dstatus,did);
			$http.post("Admin/Dealer_Controller/change_status?dealer_id="+did+'&status='+dstatus).success(function(data){
				get_dealers();
	         });
		}

		$scope.searchdealer=function(deal)
		{
			console.log(deal);	
			var dealer = JSON.stringify(deal);
				$http.post('Admin/Dealer_Controller/searchdealer?search='+dealer).success(function(res){
				
						console.log(res);
						$scope.dealers=res;
						$scope.gridOptions={
					  data:res,
					  enableFiltering: true,
					  onRegisterApi: function(gridApi){
					    $scope.gridApi = gridApi;
					  },
					  columnDefs:[
					    {field:'name',displayName:'Name'},
						{field:'email',displayName:'Email'},
						{field:'make_name',displayName:'Make'},
						{field:'phone',displayName:'Phone'},
						{field:'postcode',displayName:'Zipcode'},
						{field:'city',displayName:'City'},
						{field:'state',displayName:'State'},
						{field:'country',displayName:'Country'},
						{field:'website',displayName:'website'},

						{field: 'Action', minWidth:300,cellTemplate:'<button class="btn btn-primary uigridbtn" ng-click="grid.appScope.show_dealer(row.entity)">Edit</button><button type="button" ng-if="row.entity.status==0" ng-click="grid.appScope.change_status(1,row.entity.dealer_id)" class="btn btn-success">Activate</button><button type="button" ng-if="row.entity.status==1" ng-click="grid.appScope.change_status(0,row.entity.dealer_id)" class="btn btn-warning">Deactivate</button><button type="button" ng-click="grid.appScope.delete_dealer(row.entity)" class="btn btn-danger uigridbtn">Delete</button>',displayName:'Action' }
					  ]
					  
				  };
	         });
		

		}

		
		
		
		$scope.Add_dealer=function(dealer,time,selected_models,file){
			
			
			dealer.suburb=$("#ct_townarea").val();
			dealer.latitude=$("#placeLat").val();
			dealer.longitude=$("#placeLng").val();
			dealer.address=$("#ct_al1").val();
			dealer.address2=$("#ct_al2").val();
			dealer.country=$("#ct_country").val();
			dealer.city=$("#ct_city").val();
			dealer.state=$("#ct_state").val();
			dealer.postcode=$("#ct_zip").val();
			
			var error=0;
			
			if(selectedcountry.selectedIndex==0){
				 $scope.scon_errmsg='please select dealer country.';
				 error=1;
			}
			
			if(dealer.latitude==''){
			     $scope.addr_errmsg='please add dealer address.';
				 error=1;
			}
			
			if(file==null || file==undefined || file==''){
			    error=1;
				$scope.dimgerror='please add image';
			}else{
			   $scope.dimgerror='';
			}
			
		  if(error==0){
			 var uploadUrl = "Admin/Dealer_Controller/Upload_image";
			 if(file!=null){
				 //var filename = file.name;
				 var name = dealer.name.substring(0, 4);
				 var filename = name + '_'+ file.name;
				 filename = filename.replace(/ /g, '_');
				 fileUpload.uploadFileToUrl(file,uploadUrl,filename);
			 }
			 
			dealer.profile=filename;
			
			$http.post("Admin/Dealer_Controller/Add_dealer?dealer="+JSON.stringify(dealer)+'&time='+JSON.stringify(time)).success(function(data){
				console.log(data);
			//$state.reload();
				$scope.msg='dealer added successfully';
				$('#myModal').modal('show');
				//$scope.dealer_list=false;
			   // $scope.dealer_form=false;
				//get_dealers();
				
	         });
		  }
		}
		
		
		$scope.update_dealer=function(dealer,time,selected_models,file){
			
			delete dealer.make_id;
			delete dealer.make_name;
			delete dealer.featured;
			delete dealer.disclosure;
			delete dealer.badge;
			delete dealer.makeCountry;
			delete dealer.make_status;
			
			dealer.latitude=$("#placeLat").val();
			dealer.suburb=$("#ct_townarea").val();
			dealer.longitude=$("#placeLng").val();
			dealer.address=$("#ct_al1").val();
			dealer.address2=$("#ct_al2").val();
			dealer.country=$("#ct_country").val();
			dealer.city=$("#ct_city").val();
			dealer.state=$("#ct_state").val();
			dealer.postcode=$("#ct_zip").val();
			console.log(dealer);
			 dealer.profile='';
			 var uploadUrl = "Admin/Dealer_Controller/Upload_image";
			 if(file!=null){
				// var filename = file.name;
				 var name = dealer.name.substring(0, 4);
				 var filename = name + '_'+ file.name;
				filename = filename.replace(/ /g, '_');
				 fileUpload.uploadFileToUrl(file,uploadUrl,filename);
				 dealer.profile=filename;
			 }
			 
			
			delete time.id;
			$http.post("Admin/Dealer_Controller/update_dealer?dealer="+JSON.stringify(dealer)+'&time='+JSON.stringify(time)).success(function(data){
	          console.log(data);
				$scope.msg='data updated successfully';
				$('#myModal').modal('show');
				
	         });
			
			//$window.location.reload();
		}
		$scope.delete_dealer=function(s){
			$http.post("Admin/Dealer_Controller/delete_dealer?dealer_id="+s.dealer_id).success(function(data){
	            console.log(data);
				get_dealers();
	         });
		}
		$scope.add_new_dealer=function(){
			document.getElementById('dealerForm').reset();
			$scope.dealer="";
			$scope.profile="";
			$scope.time="";
			$scope.dealer_list=true;
			$scope.dealer_form=true;
			$scope.addbtn=true;
			$scope.updatebtn=false;
			Map.init();
		}
		$scope.show_list=function(){
			$('#myModal').modal('hide');
			$scope.dealer_list=false;
			$scope.dealer_form=false;
			get_dealers();
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
         .success(function(){
            console.log("Success");
         })
         .error(function(){
            console.log("Error");
         });
     }
 }]);
 
 
 
angular.module('AdminApp').service('Map', function($q) {
	var vm=this;
	
	this.initEdit=function(lat,lng)
	{
		
		
		
		if(document.getElementById("map"))
		{
		var options = {
            center: new google.maps.LatLng(lat,lng),
            zoom: 13,
            disableDefaultUI: true    
        }
		
        this.map = new google.maps.Map(
            document.getElementById("map"), options
        );
        this.places = new google.maps.places.PlacesService(this.map);
		
		var input = document.getElementById('searchBox');
		var autocomplete = new google.maps.places.Autocomplete(input);
		
		  google.maps.event.addListener(this.map,'click', function(event){

		  
		  var pos=new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
		   var request = new XMLHttpRequest();
		  var method = 'GET';
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+event.latLng.lat()+','+event.latLng.lng()+'&sensor=true';
        var async = true;
        request.open(method, url, async);
        request.onreadystatechange = function(){
          if(request.readyState == 4 && request.status == 200){
            var data = JSON.parse(request.responseText);
            var address = data.results[0];
           $("#placeName").val(address.formatted_address);
		   
          }
        };
        request.send();
		  var data=
		  {
		  "type":"external",
		  "pos":pos
		  };
		  vm.addMarker(data);
            });
			
			var data=
		  {
		  "type":"external",
		  "pos":new google.maps.LatLng(lat,lng)
		  };
		  
		  // console.log(lat);
		  // console.log(lng);
		  // console.log(data);
		  vm.addMarker(data);
		}
	}
	
    this.init = function() { 
	
	if(document.getElementById("map"))
		{
		var options = {
            center: new google.maps.LatLng(20.593684,78.96288000000004),
            zoom: 13,
            disableDefaultUI: true    
        }
		
        this.map = new google.maps.Map(
            document.getElementById("map"), options
        );
        this.places = new google.maps.places.PlacesService(this.map);
		
		var input = document.getElementById('searchBox');
		var autocomplete = new google.maps.places.Autocomplete(input);
		  google.maps.event.addListener(this.map,'click', function(event){

		  
		  var pos=new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
		   var request = new XMLHttpRequest();
		  var method = 'GET';
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+event.latLng.lat()+','+event.latLng.lng()+'&sensor=true';
        var async = true;
        request.open(method, url, async);
        request.onreadystatechange = function(){
          if(request.readyState == 4 && request.status == 200){
            var data = JSON.parse(request.responseText);
			console.log(data);
            var address = data.results[0];
           $("#placeName").val(address.formatted_address);
		   
          }
        };
        request.send();
		  var data=
		  {
		  "type":"external",
		  "pos":pos
		  };
		  vm.addMarker(data);
            });
		}
        
    }
    
    this.search = function(str) {
		
	if(document.getElementById("map"))
		{
        var d = $q.defer();
        this.places.textSearch({query: str}, function(results, status) {
            if (status == 'OK') {
                d.resolve(results[0]);
            }
            else d.reject(status);
        });
        return d.promise;
    }
	}
    
    this.addMarker = function(res) {
		//alert(res);
	if(res.type!="external")
	{
		var vm=this;
		$("#placeLat").val(res.geometry.location.lat());
		$("#placeLng").val(res.geometry.location.lng());
		 if(this.marker) this.marker.setMap(null);
        this.marker = new google.maps.Marker({
            map: this.map,
			draggable: true,
            position: res.geometry.location,
            animation: google.maps.Animation.DROP
        });
		   var request = new XMLHttpRequest();
		  var method = 'GET';
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+res.geometry.location.lat()+','+res.geometry.location.lng()+'&sensor=true';
        var async = true;
        request.open(method, url, async);
        request.onreadystatechange = function(){
          if(request.readyState == 4 && request.status == 200){
            var data = JSON.parse(request.responseText);
            var address = data.results[0];
    $("#placeName").val(address.formatted_address);
	console.log(address['address_components']);
	var adl=address['address_components'].length;
	$("#ct_al1").val("");
	$("#ct_al2").val("");
	$("#ct_al3").val("");
	for(var i=0;i<adl;i++)
	{
	if(address['address_components'][i]['types'][0]=="street_number" || address['address_components'][i]['types'][0]=="route")
	{
	if($("#ct_al1").val()=="")
	{
	if(address['address_components'][i]['long_name']!="Unnamed Road")
	{
	$("#ct_al1").val(address['address_components'][i]['long_name']);
	}
	}
	else
	{
	if(address['address_components'][i]['long_name']!="Unnamed Road")
	{
	$("#ct_al1").val(address['address_components'][i]['long_name']);
	}
	}
	}
	
else if(address['address_components'][i]['types'][0]=="neighborhood" || address['address_components'][i]['types'][0]=="premise")
	{
	if($("#ct_al2").val()=="")
	{
	$("#ct_al2").val(address['address_components'][i]['long_name']);
	}
	else
	{
	$("#ct_al2").val($("#ct_al2").val()+","+address['address_components'][i]['long_name']);
	}
	}
	
	else if(address['address_components'][i]['types'][0]=="locality")
	{
	$("#ct_townarea").val(address['address_components'][i]['long_name']);
	}
	
	else if(address['address_components'][i]['types'][0]=="country")
	{
		$("#ct_country").val(address['address_components'][i]['long_name']);
	}
	
	else if(address['address_components'][i]['types'][0]=="administrative_area_level_2")
	{
		$("#ct_city").val(address['address_components'][i]['long_name']);
	}
	
	else if(address['address_components'][i]['types'][0]=="administrative_area_level_1")
	{
		$("#ct_state").val(address['address_components'][i]['long_name']);
	}
	

	else if(address['address_components'][i]['types'][0]=="postal_code")
	{
	$("#ct_zip").val(address['address_components'][i]['long_name']);
	}
	
	if($("#ct_al1").val=="" && $("#ct_al2").val()!="")
	{
	$("#ct_al1").val($("#ct_al2").val());
	$("#ct_al2").val("");
	}
	console.log(address['address_components'][i]['types'][0]);
	console.log(address['address_components'][i]['long_name']);
	}
          }
        };
        request.send();
		
		
        this.map.setCenter(res.geometry.location);
		 google.maps.event.addListener(this.marker, 'dragend', function(event){
				  $("#placeLat").val(event.latLng.lat());
				 $("#placeLng").val(event.latLng.lng());
				var latlng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
					 var geocoder  = new google.maps.Geocoder();
					 geocoder.geocode({ 'latLng': latlng }, function (results, status) {
					 if (status == google.maps.GeocoderStatus.OK) {
					 if (results[1]) {
					//alert(results[1]);
					 }
					}
					});
					
					
					var request = new XMLHttpRequest();
		  var method = 'GET';
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+event.latLng.lat()+','+event.latLng.lng()+'&sensor=true';
        var async = true;
        request.open(method, url, async);
        request.onreadystatechange = function(){
          if(request.readyState == 4 && request.status == 200){
            var data = JSON.parse(request.responseText);
            var address = data.results[0];
    $("#placeName").val(address.formatted_address);
	
	var adl=address['address_components'].length;
			$("#ct_al1").val("");
	$("#ct_al2").val("");
	$("#ct_al3").val("");
	for(var i=0;i<adl;i++)
	{
		if(address['address_components'][i]['types'][0]=="street_number" || address['address_components'][i]['types'][0]=="route")
	{
	if($("#ct_al1").val()=="")
	{
	if(address['address_components'][i]['long_name']!="Unnamed Road")
	{
	$("#ct_al1").val(address['address_components'][i]['long_name']);
	}
	}
	else
	{
	if(address['address_components'][i]['long_name']!="Unnamed Road")
	{
	$("#ct_al1").val(address['address_components'][i]['long_name']);
	}
	}
	}
	
	else if(address['address_components'][i]['types'][0]=="neighborhood" || address['address_components'][i]['types'][0]=="premise")
	{
	if($("#ct_al2").val()=="")
	{
	$("#ct_al2").val(address['address_components'][i]['long_name']);
	}
	else
	{
	$("#ct_al2").val($("#ct_al2").val()+","+address['address_components'][i]['long_name']);
	}
	}
	
	else if(address['address_components'][i]['types'][0]=="locality")
	{
	$("#ct_townarea").val(address['address_components'][i]['long_name']);
	}
	
	else if(address['address_components'][i]['types'][0]=="country")
	{
		$("#ct_country").val(address['address_components'][i]['long_name']);
	}
	
	else if(address['address_components'][i]['types'][0]=="administrative_area_level_2")
	{
		$("#ct_city").val(address['address_components'][i]['long_name']);
	}
	
	else if(address['address_components'][i]['types'][0]=="administrative_area_level_1")
	{
		$("#ct_state").val(address['address_components'][i]['long_name']);
	}
	

	else if(address['address_components'][i]['types'][0]=="postal_code")
	{
	$("#ct_zip").val(address['address_components'][i]['long_name']);
	}
	if($("#ct_al1").val=="" && $("#ct_al2").val()!="")
	{
	$("#ct_al1").val($("#ct_al2").val());
	$("#ct_al2").val("");
	}
	
	console.log(address['address_components'][i]['types'][0]);
	console.log(address['address_components'][i]['long_name']);
	}
          }
        };
        request.send();
					
					
				   });
	}
	else
	{
		console.log(res.pos.lat());
		console.log(res.pos.lng());
		var vm=this;
	//	console.log($scope.place);
		 if(this.marker) this.marker.setMap(null);
        this.marker = new google.maps.Marker({
            map: this.map,
			draggable: true,
            position: res.pos,
            animation: google.maps.Animation.DROP
        });
		
		
		
		 var request = new XMLHttpRequest();
		  var method = 'GET';
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+res.pos.lat()+','+res.pos.lng()+'&sensor=true';
        var async = true;
        request.open(method, url, async);
        request.onreadystatechange = function(){
          if(request.readyState == 4 && request.status == 200){
            var data = JSON.parse(request.responseText);
            var address = data.results[0];
			 $("#placeName").val(address.formatted_address);
			
				var adl=address['address_components'].length;
				$("#ct_al1").val("");
	$("#ct_al2").val("");
	$("#ct_al3").val("");
	for(var i=0;i<adl;i++)
	{
	if(address['address_components'][i]['types'][0]=="street_number" || address['address_components'][i]['types'][0]=="route")
	{
	if($("#ct_al1").val()=="")
	{
	if(address['address_components'][i]['long_name']!="Unnamed Road")
	{
	$("#ct_al1").val(address['address_components'][i]['long_name']);
	}
	}
	else
	{
	if(address['address_components'][i]['long_name']!="Unnamed Road")
	{
	$("#ct_al1").val(address['address_components'][i]['long_name']);
	}
	}
	}
	
	else if(address['address_components'][i]['types'][0]=="neighborhood" || address['address_components'][i]['types'][0]=="premise")
	{
	if($("#ct_al2").val()=="")
	{
	$("#ct_al2").val(address['address_components'][i]['long_name']);
	}
	else
	{
	$("#ct_al2").val($("#ct_al2").val()+","+address['address_components'][i]['long_name']);
	}
	}
	
	else if(address['address_components'][i]['types'][0]=="locality")
	{
	$("#ct_townarea").val(address['address_components'][i]['long_name']);
	}
	
	else if(address['address_components'][i]['types'][0]=="country")
	{
		$("#ct_country").val(address['address_components'][i]['long_name']);
	}
	
	else if(address['address_components'][i]['types'][0]=="administrative_area_level_2")
	{
		$("#ct_city").val(address['address_components'][i]['long_name']);
	}
	
	else if(address['address_components'][i]['types'][0]=="administrative_area_level_1")
	{
		$("#ct_state").val(address['address_components'][i]['long_name']);
	}
	
	
	else if(address['address_components'][i]['types'][0]=="postal_code")
	{
	$("#ct_zip").val(address['address_components'][i]['long_name']);
	}
	
	if($("#ct_al1").val=="" && $("#ct_al2").val()!="")
	{
	$("#ct_al1").val($("#ct_al2").val());
	$("#ct_al2").val("");
	}
	
	}
        
			
          }
        };
        request.send();
		
		
        //this.map.setCenter(res.pos);
		   $("#placeLat").val(res.pos.lat());
				$("#placeLng").val(res.pos.lng());
		 google.maps.event.addListener(this.marker, 'dragend', function(event){
				   
				   
				   // console.log(event.latLng.lat());
				   // console.log(event.latLng.lng());
				
				    $("#placeLat").val(event.latLng.lat());
				 $("#placeLng").val(event.latLng.lng());
				var latlng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
					 var geocoder  = new google.maps.Geocoder();
					 geocoder.geocode({ 'latLng': latlng }, function (results, status) {
					 if (status == google.maps.GeocoderStatus.OK) {
					 if (results[1]) {
						// console.log(results[1]);
					 }
					}
					});	

					
					var request = new XMLHttpRequest();
		  var method = 'GET';
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+event.latLng.lat()+','+event.latLng.lng()+'&sensor=true';
        var async = true;
        request.open(method, url, async);
        request.onreadystatechange = function(){
          if(request.readyState == 4 && request.status == 200){
            var data = JSON.parse(request.responseText);
            var address = data.results[0];
    $("#placeName").val(address.formatted_address);
	var adl=address['address_components'].length;
	$("#ct_al1").val("");
	$("#ct_al2").val("");
	$("#ct_al3").val("");
	for(var i=0;i<adl;i++)
	{
	if(address['address_components'][i]['types'][0]=="street_number" || address['address_components'][i]['types'][0]=="route")
	{
	if($("#ct_al1").val()=="")
	{
	if(address['address_components'][i]['long_name']!="Unnamed Road")
	{
	$("#ct_al1").val(address['address_components'][i]['long_name']);
	}
	}
	else
	{
	if(address['address_components'][i]['long_name']!="Unnamed Road")
	{
	$("#ct_al1").val(address['address_components'][i]['long_name']);
	}
	}
	}
	
	else if(address['address_components'][i]['types'][0]=="neighborhood" || address['address_components'][i]['types'][0]=="premise" || address['address_components'][i]['types'][0]=="political")
	{
	if($("#ct_al2").val()=="")
	{
	$("#ct_al2").val(address['address_components'][i]['long_name']);
	}
	else
	{
	$("#ct_al2").val($("#ct_al2").val()+","+address['address_components'][i]['long_name']);
	}
	
	}
	
	else if(address['address_components'][i]['types'][0]=="locality")
	{
	$("#ct_townarea").val(address['address_components'][i]['long_name']);
	}
	
	else if(address['address_components'][i]['types'][0]=="country")
	{
		$("#ct_country").val(address['address_components'][i]['long_name']);
	}
	
	else if(address['address_components'][i]['types'][0]=="administrative_area_level_2")
	{
		$("#ct_city").val(address['address_components'][i]['long_name']);
	}
	
	else if(address['address_components'][i]['types'][0]=="administrative_area_level_1")
	{
		$("#ct_state").val(address['address_components'][i]['long_name']);
	}
	
	else if(address['address_components'][i]['types'][0]=="postal_code")
	{
	$("#ct_zip").val(address['address_components'][i]['long_name']);
	}

	
	
	console.log(address['address_components'][i]['types'][0]);
	console.log(address['address_components'][i]['long_name']);
	}
	
	if($("#ct_al1").val=="" && $("#ct_al2").val()!="")
	{
	$("#ct_al1").val($("#ct_al2").val());
	$("#ct_al2").val("");
	}
			//console.log(address['address_components'][adl]['types'][0]);
          }
        };
        request.send();


					
				   });
	}    
$(".cir").hide();	
    }
});

 
