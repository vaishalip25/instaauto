angular.module('UserApp').controller('DealershipController', ['$rootScope','$scope','$sce','settings','$cookies','$cookieStore','$http','$localStorage','$window','$location','$templateCache','$stateParams','$state','Map', function($rootScope, $scope, $sce,settings,$cookies,$cookieStore,$http,$localStorage,$window,$location,$templateCache,$stateParams,$state,Map) {
    $scope.$on('$viewContentLoaded', function() {	
        // initialize core components
        App.initAjax();
		$window.scrollTo(0, 0);
		
	
		$cookies.cmake=$stateParams.make;
		$cookies.cmodel=$stateParams.model;
		if($cookies.cmake != null){
			$cookies.put('cmake', $cookies.cmake);
			var cmake=$cookies.get('cmake');
			
		}else{
	
			var cmake=$cookies.get('cmake');
		} 
		
		if($cookies.cmodel != null){
			$cookies.put('cmodel', $cookies.cmodel);
			var cmodel=$cookies.get('cmodel');
			
		}else{
	
			var cmodel=$cookies.get('cmodel');
		} 
		
		
		
		$scope.open_link=function(link){
			console.log(link);
			$window.open(link, '_blank');
		}
		
	find_dealership()
	//alert();		
	function find_dealership (make,model)
	{
		$scope.all_dealer=true;
		$scope.par_dealer=false;
		// console.log(cmake);
		 $localStorage.make=cmake;
		 $localStorage.model=cmodel;
		 //console.log(cmodel);
		  $http.get('http://ip-api.com/json').success(function(data){
           
           Map.init(data.lat,data.lon);
		
           });
		//Map.init();
		
		 // console.log($localStorage.select_trim);
		// $http.post('User/Home_Controller/find_dealership?makeinfo='+cmake+'&modelinfo='+cmodel).success(function(res){
			// console.log(res);
			// $scope.trims=res;
			
// });
		
	}
	 $scope.$on('showDealer', function(event, data) {
		$scope.get_par_dealer(data.data,data.dealerDist);
    });
	 $scope.$on('getDelerData', function(event, data) {
		 var newdat={
			min:data.min,
max:data.max			
		 };
		$scope.getDealerData(newdat,data.lat,data.lng);
    });
	
	
	$scope.get_par_dealer=function(single_dealer,dealership_dist)
	{
		
		if ($(window).width() < 767) {  
		$(".hidesh").click(function(){ 
		      $(".dealermap").hide();});
         }
		$scope.dist=dealership_dist;
		
		
		$('.deal-add').addClass('slide-items');
		//$('.lease-loan').removeclass('slide-items');
		
		//$scope.all_dealer=false;
		//$scope.par_dealer=true;
	//	console.log(single_dealer);
		
		//$localStorage.calculator_values['dealer_id']=single_dealer;
		
		$http.post('User/Home_Controller/get_par_dealer?dealerinfo='+single_dealer).success(function(res){
			
			$scope.getStatusStreetView(res[0]['latitude'],res[0]['longitude']);
			
			 $scope.single_dealer=res;
			 $localStorage.dealer=res;
			// console.log($localStorage.dealer);
			// $scope.getStatus();
			});
			 var d = new Date().toString();
			 var day = d.split(/ /);
			 var daynm = day[0]+"_open";
			 var dayclose = day[0]+"_close";
			// console.log(daynm);
			 $http.post('User/Home_Controller/get_time?dealertime='+single_dealer+'&daynm='+daynm+'&dayclose='+dayclose).success(function(res){
			//console.log(res[0][daynm]);
			$scope.shop_time_open=res[0][daynm];
			$scope.shop_time_close=res[0][dayclose];
			
			 });
	}
	
	
	$scope.getStatusStreetView=function(lat,lng)
	{
	//	console.log('maps.googleapis.com/maps/api/streetview/metadata?size=600x300&location='+lat+','+lng+'&fov=90&heading=235&pitch=10&key=AIzaSyD2KmVm-m6-gOf1Tk75b5xrG893FOTlQN4');
		$http({
  method: 'GET',
  url: 'https://maps.googleapis.com/maps/api/streetview/metadata?size=600x300&location='+lat+','+lng+'&fov=90&heading=235&pitch=10&key=AIzaSyCq81yiJ96xIHmVa4SenHaqpgv9Fo2fCZw'
}).then(function successCallback(response) {
    if(response.data.status=="OK")
	{
		$scope.streetView=true;
	}
	else{
		$scope.streetView=false;
	}
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
	}
	$scope.bck_first=function()
	{
		/*var absUrl = $location.absUrl();
		var fields = absUrl.split(/#/);
		var name = fields[0];
		var street = fields[1];
		console.log(name);
		console.log(street);
		 //alert(absUrl);
		window.location.href = ''; */
		$state.go('home');
	}
	$scope.back_dealer=function()
	{
		$(".dealermap").show();
		
		//$scope.all_dealer=true;
		//$scope.par_dealer=false;
		 $('.deal-add').removeClass('slide-items');
		
	}
	
	
	$scope.select_dealer=function(){
		
		var absUrl = $location.absUrl();
		$localStorage.back_second=location.hash;
		//console.log(location.hash);
		//console.log($localStorage.back_second);
		// console.log(cmake);
		 // console.log(cmodel); 
		 // $scope.jgjadjankasjd=$localStorage.select_trim[0]['msrp_price'];
		 $state.go('credit');
	}
	
	$scope.search = function() {
			
		$scope.all_dealer=true;
		$scope.par_dealer=false;
		//alert();
	//console.log($("#searchBox").val());
        $scope.apiError = false;
		var vm=this;
		if(document.getElementById("map"))
		{
        Map.search($("#searchBox").val())
        .then(
            function(res) { // success
			console.log(res);
			var current_lat=res.geometry.location.lat();
			var current_lng=res.geometry.location.lng();
			
			localStorage.setItem("lat", current_lat);
			localStorage.setItem("lng", current_lng);
                var a = Map.addMarker(res);				
				$scope.getDealerData(a,current_lat,current_lng);
				//console.log(a);
            }
            /*function(status) { // error
                $scope.apiError = true;
                $scope.apiStatus = status;
            }*/
        );
		}
    }
	
	$scope.getDealerData=function(a,current_lat,current_lng)
	{
				var data = $.param({
				min:a.min,
				max:a.max,
				makeinfo:cmake,
				modelinfo:cmodel,
				current_lng:current_lng,
				current_lat:current_lat
				});
			//	console.log(data);
			//	console.log(a);
					var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}}
                    $http.post('User/Home_Controller/find_dealership',data,config).success(function (data, status, headers, config) {
						console.log(data);
					if(data!="No data")
					{
					$scope.dealership=data;
					Map.addDealerMarker(data);
					}
					else{
						$scope.dealership=[];
					}
					
					});
	}
		
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
}]);


angular.module('UserApp').service('Map', function($q,$rootScope,$http) {
	var vm=this;
	var markersArray = [];
	var dealerMarkerArray = [];
	var infowindowarr=[];
	var result;
    this.init = function(lat,lng) { 
	 
	if(document.getElementById("map"))
		{
			
       //  function setMap(lat,lng)
		// {
			var options = {
            center: new google.maps.LatLng(lat,lng),
            zoom: 8,
            disableDefaultUI: true,
            zoomControl: true,
            streetViewControl: true
        }
		
        this.map = new google.maps.Map(
            document.getElementById("map"), options
        );
          
        this.places = new google.maps.places.PlacesService(this.map);
		
		var input = document.getElementById('searchBox');
		var autocomplete = new google.maps.places.Autocomplete(input);
            
        google.maps.event.addListenerOnce(this.map, 'idle', function() { 
				var min={
				min_lat:this.getBounds().getSouthWest().lat(),
				min_lng:this.getBounds().getSouthWest().lng() 
				};
				var max={
				max_lat:this.getBounds().getNorthEast().lat(),
				max_lng:this.getBounds().getNorthEast().lng()
				};	
				localStorage.setItem("lat", lat);
				localStorage.setItem("lng", lng);
				$rootScope.$broadcast('getDelerData', {
                min:min,
				max:max,
				lat:lat,
				lng:lng
				});				
				});
            
		google.maps.event.addListener(this.map, 'dragend', function() { 
				var min={
				min_lat:this.getBounds().getSouthWest().lat(),
				min_lng:this.getBounds().getSouthWest().lng() 
				};
				var max={
				max_lat:this.getBounds().getNorthEast().lat(),
				max_lng:this.getBounds().getNorthEast().lng()
				};	
				$rootScope.$broadcast('getDelerData', {
                min:min,
				max:max,
				lat:localStorage.lat,
				lng:localStorage.lng
				});				
				});
				google.maps.event.addListener(this.map, 'zoom_changed', function() { 
				var min={
				min_lat:this.getBounds().getSouthWest().lat(),
				min_lng:this.getBounds().getSouthWest().lng() 
				};
				var max={
				max_lat:this.getBounds().getNorthEast().lat(),
				max_lng:this.getBounds().getNorthEast().lng()
				};	
				
				$rootScope.$broadcast('getDelerData', {
                min:min,
				max:max,
				lat:localStorage.lat,
				lng:localStorage.lng
            });				
				});
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
			//console.log(data);
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
				
		// }
	
		}
        
    }
    
    this.search = function(str) {
	if(document.getElementById("map"))
		{
        var d = $q.defer();
        this.places.textSearch({query: str}, function(results, status) {
			console.log(status);
            if (status == 'OK') {
                d.resolve(results[0]);
            }
            else d.reject(status);
        });
        return d.promise;
    }
	}
    
	
	this.addDealerMarker=function(res)
	{
		
		clearOverlaysDealer();
		if(res)
		{
		for(var i=0;i<res.length;i++)
		{
		//console.log(res[i]['latitude']);	
		//console.log(res[i]['longitude']);
		//console.log('http://192.168.1.20/autogravity/upload/'+res[i]['badge']);
		var img=res[i]['badge'];
		 var image =new google.maps.MarkerImage(
    'http://188.166.191.35/upload/'+img,
    // This marker is 20 pixels wide by 32 pixels high.
    null, /* size is determined at runtime */
    null, /* origin is 0,0 */
    null, /* anchor is bottom center of the scaled image */
    new google.maps.Size(25, 25)
  );
  
		//console.log(res[i]['0']);
		var pos=new google.maps.LatLng(res[i]['latitude'],res[i]['longitude']);
		this.marker = new google.maps.Marker({
		map: this.map,
		draggable: false,
		position: pos,
		animation: google.maps.Animation.DROP,
		//icon:'http://projects.theaxontech.com/ci/auto_gravity/upload/audi.png',
		icon:image,
		dearlerId:res[i].dealer_id,
		dealerName:res[i].name,
		dealerLogo:res[i].badge,
		dealerDist:res[i]['0'],
         dealerImg:res[i]['profile']
		});
		dealerMarkerArray.push(this.marker);
		//var dname=res[i].name;
		//alert(dname);
		
		google.maps.event.addListener(this.marker, 'click', function(event){
			if ($(window).width() < 767) {  
		$(".hidesh").click(function(){ 
		      $(".dealermap").hide();});
         }
			
		var did=this.dearlerId;	
		var ddist=this.dealerDist;	
		$rootScope.$broadcast('showDealer', {
		data: did,
		dealerDist:ddist
		});
		});	

		google.maps.event.addListener(this.marker, 'mouseover', function(event){
		var dname=this.dealerName;	
		var did=this.dearlerId;	
		var dbadge=this.dealerLogo;	
        var dimg=this.dealerImg;
            
            if(dimg=='')
            dimg='info-icon-10.png';
            
		$('#customhover'+did).addClass('hovered');
		var contentString='<img width="25px" src="http://188.166.191.35/upload/'+dimg+'">&nbsp;'+dname;
		var infowindow = new google.maps.InfoWindow({
		content: contentString
		});
		infowindowarr.push(infowindow);
		infowindow.close(this.map, this);
		infowindow.open(this.map, this);
		});	
		
		
		google.maps.event.addListener(this.marker, 'mouseout', function(event){
		var did=this.dearlerId;	
		$('#customhover'+did).removeClass('hovered');
		for(var i=0;i<infowindowarr.length;i++)
		{
		infowindowarr[i].close(this.map, this);		
		}
		});			
		}		
		}
	
	}
	
	function clearOverlays() {
  for (var i = 0; i < markersArray.length; i++ ) {
    markersArray[i].setMap(null);
  }
  markersArray.length = 0;
}
function clearOverlaysDealer() {
  for (var i = 0; i < dealerMarkerArray.length; i++ ) {
    dealerMarkerArray[i].setMap(null);
  }
  dealerMarkerArray.length = 0;
}
    this.addMarker = function(res) {
		//alert(res);
		
		var maxMin={};
	clearOverlays();	
	if(res.type!="external")
	{
		var vm=this;
		$("#placeLat").val(res.geometry.location.lat());
		$("#placeLng").val(res.geometry.location.lng());
		 if(this.marker) this.marker.setMap(null);
        // this.marker = new google.maps.Marker({
            // map: this.map,
			// draggable: false,
            // position: res.geometry.location,
            // animation: google.maps.Animation.DROP
        // });
		// markersArray.push(this.marker);
		
				var vm=this;
				this.map.setCenter(res.geometry.location);
				var bounds=this.map.getBounds();
				ne = bounds.getNorthEast(); 
				sw = bounds.getSouthWest();	
				//console.log(ne);
				//console.log(sw);
				var min={};
				var max={};
				min={
				min_lat:sw.lat(),
				min_lng:sw.lng() 
				};
				max={
				max_lat:ne.lat(),
				max_lng:ne.lng()
				};
				maxMin={
					min:min,
					max:max
				};
			//	console.log(min);
			//	console.log(max);
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
	//console.log(address['address_components']);
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
	//console.log(address['address_components'][i]['types'][0]);
	//console.log(address['address_components'][i]['long_name']);
	}
	
          }
		  
        };
        request.send();
        this.map.setCenter(res.geometry.location);
		return maxMin;
	}
	else
	{
		
		//console.log(res.pos.lat());
		//console.log(res.pos.lng());
		var vm=this;
	//	console.log($scope.place);
		 if(this.marker) this.marker.setMap(null);
        this.marker = new google.maps.Marker({
            map: this.map,
			draggable: false,
            position: res.pos,
            animation: google.maps.Animation.DROP
        });
		
		markersArray.push(this.marker);
		
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
	//console.log(address['address_components'][i]['types'][0]);
	//console.log(address['address_components'][i]['long_name']);
	}
            // console.log(address.formatted_address);
            // console.log(address);
			
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
						 //console.log(results[1]);
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

	
	
//	console.log(address['address_components'][i]['types'][0]);
	//console.log(address['address_components'][i]['long_name']);
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

