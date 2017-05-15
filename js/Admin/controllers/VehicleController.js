angular.module('AdminApp').controller('VehicleController', ['$rootScope', '$scope','$sce','settings','$http','$window','$location','$templateCache','$stateParams','$state','fileUpload', function($rootScope, $scope, $sce,settings,$http,$window,$location,$templateCache,$stateParams,$state,fileUpload) {
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
		
		
		$('#pages').removeClass("active");
		$('#dealer').removeClass("active");
	    $('#make').removeClass("active");
	    $('#vehicle').addClass("active");
	    $('#leads').removeClass("active");
        $('#calculator').removeClass("active");
		$('#disclosure').removeClass("active");
		
		/*get_fuel_data();
		function get_fuel_data(){
		  $http.post('Admin/Vehicle_Controller/get_fuel_data').success(function(res){
		     console.log(res);
		  
		  });
		}*/
		
		var count;
		$scope.edittable_trim=false;
		$scope.selectable_trim=true;
		
		var curdate=new Date();
		var fuel_years=[];
		for(var i=2000;i<=curdate.getFullYear();i++){
		  fuel_years.push(i);
		}
		$scope.fuel_years=fuel_years;
		
		
		get_fuel_make_data();
		function get_fuel_make_data(){
		  $http.post('Admin/Vehicle_Controller/get_fuel_make_data').success(function(data){
		     $scope.fuel_makes=data;
		  });
		}
		
		$scope.get_fuel_models=function(makeid,year){
			$scope.yrerr1='';
		    $http.post('Admin/Vehicle_Controller/get_fuel_model_data?makeid='+makeid+'&year='+year).success(function(data){
		        $scope.fuel_models=data;
		    });
		}
		$scope.filter_models=function(year){
			var models=$scope.fuel_models;
		   for(var i=0;i<models.length;i++){
		     if(models[i].year==year){
			 }else{
				 delete models[i];
			   
			 }
		   }
			$scope.fuel_models=models;
		}
		$scope.get_vehicle_data=function(makeid,model){
		   
			/*$http.post('Admin/Vehicle_Controller/get_vehicle_data?makeid='+makeid+'&model='+model).success(function(data){
				console.log(data);
		       
		    });*/
		
		}
		$scope.assign_trim=function(trim){
		  $scope.ftrim_id=trim;
			
		}
		
		$scope.get_trim_data=function(makeid,model){
			
			$scope.model_err='';
			$http.post('Admin/Vehicle_Controller/get_fuel_trims?makeid='+makeid+'&modelid='+model.id+'&year='+model.year).success(function(data){
				console.log(data);
				$scope.fuel_trims=data;
				
		    });
			
		}
		
		$scope.get_fuel_images=function(vid){
		
			console.log($scope.ftrim_id);
			var error=0;
			if($scope.fuel_makes1==undefined){
			  $scope.fuelmake_err='please select fuel make';
				var error=1;
			}
			if($scope.fuelyear==undefined){
			  $scope.yrerr1='please select year';
				var error=1;
			}
			
			if($scope.fuel_models1==undefined){
			  $scope.model_err='please select model';
				var error=1;
			}
			
		  if(error==0){
		     $scope.loading = true;
			if($scope.fuel_trims[0].trim!=undefined && $scope.fuel_trims[0].trim!=''){
			   for(var m=0;m<$scope.fuel_trims.length;m++){
				  if($scope.fuel_trims[m].id==vid){
					$scope.single_vehicle.trim=$scope.fuel_trims[m].trim;
				  }
				}
			}else{
			//  vid=$scope.fuel_trims[0].id;
			}
			 
			$http.post('Admin/Vehicle_Controller/get_fuel_images?vahicleid='+$scope.ftrim_id).success(function(data){
			  console.log(data);
			 var img_arr=[];
			  if(data.length!=0){
				for(var i=0;i<data['products'].length;i++){
				   for(var j=0;j<data['products'][i]['productFormats'].length;j++){
					   if(data['products'][i]['productFormats'][j]['assets'].length!=0){
						  for(var k=0;k<data['products'][i]['productFormats'][j]['assets'].length;k++){
							  console.log(data['products'][i]['productFormats'][j]['assets'][k]['shotCode']);
							  if(data['products'][i]['productFormats'][j]['assets'][k]['shotCode']!=undefined){
								  var code=data['products'][i]['productFormats'][j]['assets'][k]['shotCode']['code'];
								 if(code==089 || code==120 || code==118 || code==119 || code==059 || code==113 || code==115 || code==160 || code==163 || code==173 ){
									// img_arr.push(data['products'][i]['productFormats'][j]['assets'][k]['url']);
									img_arr.push({code:code,path:data['products'][i]['productFormats'][j]['assets'][k]['url']});
									} 
							  }else{
							    
							  }
							 
							  if(img_arr.length>=10){
							    break;
							  }
						  } 
					   }
					   //if(img_arr.length>=4){
						//  break;
					  //}
				   }
					//if(img_arr.length>=4){
					//   break;
					//}
				}
				var fuelimgsarray=[];
				 var shotcodes=[089,120,118,119,059,113,115,160,163,173]; 
				  for(var m=0;m<shotcodes.length;m++){
				     for(var n=0;n<img_arr.length;n++){
						 console.log(img_arr[n]['code']);
					     if(shotcodes[m]==img_arr[n]['code']){
						    fuelimgsarray.push(img_arr[n]['path']);
						 }
					 }
				  }
				 $scope.fuel_images=fuelimgsarray; 
				 //$scope.fuel_images=img_arr; 
				   $scope.fuel_msg=''
			  }else{
			     $scope.fuel_msg='No images found';
			  }	
			$scope.loading = false;	
			 console.log($scope.fuel_images);		
			
		    });
			
		  }		
		
		}
		
		
		
		
		
		
		$('#make').removeClass("active");
		$('#dealer').removeClass("active");
		 $('#calculator').removeClass("active");
		 $('#leads').removeClass("active");
		$('#vehicle').addClass("active");
		var curdate=new Date();
		
		    var year = [];
	    	for(i=1990; i<=curdate.getFullYear(); i++)
			{
				year.push(i);
			}
			$scope.years=year;
		
		    var arr1 = ["Sedan", "Hatch", "Convertible","Coupe","Sports","Luxury","7+ Seater","People Mover","Wagon","SUV","Utes","vans"]; 
		    var arr2 = ["Convertible", "Coupe", "Crossovers","Electrics","Hatchbacks","Hybrids","Luxury","Minivans","Sedans","SUVs","Sedans","Trucks","Wagons"];
				
		
		
		 $scope.gridOptions = {};	
		$scope.imge=[];
		viewVehicle();
		function viewVehicle()
		{
			$http.post('Admin/Vehicle_Controller/viewVehicle').success(function(res){
				console.log(res);
			
			$scope.vehicle=res;
			$scope.gridOptions={
			 enableSorting: true,
			 enableFiltering: true,
					  data:res,
					  columnDefs:[
					  {field: 'make_name', displayName:'Make' },
					  {field: 'model', displayName:'Model' },
					  {field: 'trim', displayName:'Trim' },
					  {field: 'year', displayName:'Year' },
					  {field: 'vehicle_type', displayName:'Vehicle Type' },
					{field: 'select_coun', displayName:'Country' },
					  {field: 'Action',minWidth:300,cellTemplate:'<button class="btn btn-primary uigridbtn" ng-click="grid.appScope.show_vehicle(row.entity)">Edit</button><button type="button" ng-if="row.entity.status==0" ng-click="grid.appScope.toggle_status(1,row.entity.vehicle_id)" class="btn btn-success">Activate</button><button type="button" ng-if="row.entity.status==1" ng-click="grid.appScope.toggle_status(0,row.entity.vehicle_id)" class="btn btn-warning">Deactivate</button><button type="button" ng-click="grid.appScope.delete_vehicle(row.entity)" class="btn btn-danger uigridbtn">Delete</button>',displayName:'Action' },
					  ]
				  };
			
		});
			
		}
		$scope.change_dap=function(dap){
			$scope.single_vehicle.dap_price=dap;
			$scope.single_vehicle.msrp_price=dap;
			calculate_emi();
			calculate_special_repayment();
		}
		$scope.change_downpayment=function(downpay){
		  $scope.single_vehicle.down_payment=downpay;
		  calculate_emi();
			calculate_special_repayment();
		}
		$scope.change_interest=function(interest){
		  $scope.single_vehicle.interest=interest;
			calculate_emi();
			calculate_special_repayment();
		}
		$scope.change_taxrate=function(taxrate){
		  $scope.single_vehicle.taxrate=taxrate;
		  calculate_emi();
			calculate_special_repayment();
		}
		$scope.change_terms=function(terms){
		  $scope.single_vehicle.terms=terms;
			calculate_emi();
			calculate_special_repayment();
		}
		function calculate_emi(){
			
			
			
		  if($scope.single_vehicle.down_payment==undefined || $scope.single_vehicle.interest==undefined || $scope.single_vehicle.msrp_price==undefined || $scope.single_vehicle.taxrate==undefined || $scope.single_vehicle.terms==undefined){
		   
		  }else{
			  
			  var downpay=$scope.single_vehicle.down_payment;
			  var price=$scope.single_vehicle.msrp_price;
			  var tax_rate=$scope.single_vehicle.taxrate;
			  var interest=$scope.single_vehicle.interest;
			  var terms=$scope.single_vehicle.terms;
			  
				var total_tax=(price * tax_rate)/100;

				var down_payment=price *  downpay / 100;

				var price=parseInt(price) - parseInt(down_payment)+parseInt(total_tax);

				var p=price;
				var r=(interest / 12 )/ 100;
				var n=terms;
				var s= 1 + r;
				var pow=Math.pow(s, -n);

				var emi= (p * r)/(1 - pow);

				var total_interest=emi * 60 - p;

				var estimated_total_payment=parseInt(price) + parseInt(total_tax) + parseInt(total_interest);
				emi=emi.toFixed(2);

				total_interest=total_interest.toFixed(2);
				estimated_total_payment=estimated_total_payment.toFixed(2);

				$scope.single_vehicle.monthly_pay=Math.round(emi); 
			  
		  }
		}
		
		
		get_calculator_valus();
		function get_calculator_valus(){
		  $http.post('User/Finance_Controller/get_calculator_values').success(function(data){
		       $scope.cal=data[0];
		  });
		}
		
		$scope.change_special_price=function(sprice){
		    $scope.single_vehicle.offer_price=sprice;
		    $scope.single_vehicle.special_price = parseInt($scope.single_vehicle.msrp_price) -parseInt(sprice);
			calculate_special_repayment();
		}
		
		$scope.change_offer_prices=function(special_price){
		  
			 $scope.single_vehicle.offer_price = parseInt($scope.single_vehicle.msrp_price) -parseInt(special_price);
		}
		
		
		function calculate_special_repayment(){
		    if($scope.single_vehicle.down_payment==undefined || $scope.single_vehicle.interest==undefined  || $scope.single_vehicle.taxrate==undefined || $scope.single_vehicle.terms==undefined){
		   
		  }else{
			  
			    var downpay=$scope.single_vehicle.down_payment;
			    var price=$scope.single_vehicle.special_price;
			    var tax_rate=$scope.single_vehicle.taxrate;
			    var interest=$scope.single_vehicle.interest;
			    var terms=$scope.single_vehicle.terms;
			  
				var total_tax=(price * tax_rate)/100;

				var down_payment=price *  downpay / 100;

				var price=parseInt(price) - parseInt(down_payment)+parseInt(total_tax);

				var p=price;
				var r=(interest / 12 )/ 100;
				var n=terms;
				var s= 1 + r;
				var pow=Math.pow(s, -n);

				var emi= (p * r)/(1 - pow);

				var total_interest=emi * 60 - p;

				var estimated_total_payment=parseInt(price) + parseInt(total_tax) + parseInt(total_interest);
				emi=emi.toFixed(2);

				total_interest=total_interest.toFixed(2);
				estimated_total_payment=estimated_total_payment.toFixed(2);

				$scope.single_vehicle.specialrepayment=Math.round(emi); 
			  
		  }
		
		}

		
		$scope.hide_error=function(divname){
		  if(divname=='vehiclecountry'){
		    $scope.conerrmsg='';
		  }else if(divname=='make'){
		     $scope.makerrmsg='';
		  }else if(divname=='year'){
		    $scope.yrerr='';
		  }else if(divname=='fuelmake'){
		    $scope.fuelmake_err='';
		  }
		  	
		}
		
		$scope.get_makes=function(country){
		    $scope.conerrmsg='';
		    $http.post("Admin/Dealer_Controller/get_makes?selected_con="+country).success(function(data){
	            $scope.makes=data;
	         });
			
			if(country == 'AUS')
			{
				
				$scope.aus_veh=arr1;
			}else 	
			if(country == 'US')
			{
				$scope.aus_veh=arr2;
			}
		}
		$scope.remove_image=function(imge,imgname,vid){
		var index = imge.indexOf(imgname);
		    imge.splice(index,1);
			$http.post('Admin/Vehicle_Controller/remove_image?imgname='+imgname).success(function(data){
			console.log(data);
			
			});
			
			
		}
		
		var cimgs=[];
		$scope.uploadImage=function(){
		  	 var file = document.querySelector('#images').files;
			 for(i=0;i<file.length;i++){
			   cimgs.push(file[i]);
			 }
		}
		//insert vehicle detail in db
	$scope.Add_vehicle=function(single_vehicle,vehimg)
		{
				console.log(single_vehicle);
				console.log(vehimg);
		
		
		        var error=0;
				if(select_coun.selectedIndex==0){
					 $scope.conerrmsg='please select country';
					 error=1;
				}
		        if(!$scope.single_vehicle.make){
					
					 $scope.makerrmsg='please select make of car';
					 error=1;
				}
		       if(yr.selectedIndex==0){
					 $scope.yrerr='please select year';
					 error=1;
				}
		        
		
		       
		if(error==0){
			   // $scope.saving_vehicle=true;
			
				single_vehicle.offer_end=$("#offer_end_date").val();
			    var uploadUrl = "Admin/Dealer_Controller/Upload_image";
				var img=[];
			    var name;
		        if(document.querySelector('#images')!==null){
				   
					//var file = document.querySelector('#images').files;
				
					 var file=cimgs;
					console.log(cimgs);
					var updatedimgs=document.getElementById('mnimgs').value;
					var updatedimgs_array = updatedimgs.split(",");
						var imgnm="";

						for(i=0;i<file.length;i++)
						{

							//var filename = file[i]['name'];
					        if(updatedimgs_array.includes(file[i]['name'])){
								name = single_vehicle.trim.substring(0, 4);
								var filename = name + '_'+ file[i]['name'];
								filename = filename.replace(/ /g, '_');
								
								if(imgnm.length==0)
								{
									imgnm=filename;
								}	
								else
								{
									imgnm+=','+filename;
								}
								fileUpload.uploadFileToUrl(file[i],uploadUrl,filename);
							}
							 
						}
                       single_vehicle.imgs=imgnm;
		
					
				 }
			    
				if($scope.fuel_images!=undefined){	
					single_vehicle.fuel_images=$scope.fuel_images.toString();
				}
			
			    
			var error=0;
			 name = single_vehicle.trim.substring(0, 4);
			 var va=$(".hid").val();
			console.log(va);
				
			if(va!=undefined && va!=''){
				va = va.replace(/ /g, '_');
				single_vehicle.front_img=name+'_'+va;
				
			}else if($scope.single_vehicle.front_fuel_img!=undefined && single_vehicle.front_fuel_img!=""){

			  console.log($scope.single_vehicle.front_fuel_img);

			}else {
				
			  $scope.frontimgerr='please select default front model image';
				error=1;
			}
			$scope.msg='vehicle added successfully';
			if(error==0){
		      $scope.frontimgerr='';
			   $.ajax({
					url:'Admin/Vehicle_Controller/Add_vehicle',
					data:{'info':single_vehicle},
					method:'POST',
					success:function(res){
						//$scope.saving_vehicle=false;
						if(res==1){
							//$scope.successmsg='vehicle added successfully';
							cimgs=[];
							//setTimeout(function(){
								$('#myModal').modal('show');
							//}, 3000);
						}
						

				  }
			  });
			}
		   
			
		/*$http.post('Admin/Vehicle_Controller/Add_vehicle?info='+single_veh).success(function(res){
                    $state.reload();
					$scope.showform=false;
					$scope.vehicleinfo=false;
					$scope.searchinfo=false;
					viewVehicle();

		  });*/
		}
			
		}
		$scope.show_list=function(){
			$('#myModal').modal('hide');
		    //$state.reload();
			$scope.showform=false;
			$scope.vehicleinfo=false;
			$scope.searchinfo=false;
			
			viewVehicle();
		}
		
		$scope.uploadFile=function(nm){
   $scope.str = "";
	var images = [];
	for(i=0;i<nm.length;i++)
	{
		$scope.str.concat('<img src="'+nm[i].result+'">');
	}
			
$scope.images = nm;
			
}

		//show add new vehicle form
		$scope.add_new_vehicle=function()
		{
			cimgs=[];
			count=0;
			document.getElementById('mnimgs').value='';
			$scope.fuelimgs='';
			$scope.successmsg='';
			var output = document.getElementById("result");
            $(output).empty();
			//$scope.single_vehicle='';
			$scope.imge='';
			$scope.description='';
			// $('#carform')[0].reset();
			document.getElementById('carform').reset();
			
			$scope.vehicleinfo=true;
			$scope.searchinfo=true;
			$scope.showform=true;
			$scope.addVehicle=true;
			$scope.saveVehicle=false;
			
			
			
			$http.post('Admin/Vehicle_Controller/getMakes').success(function(res){
				$scope.makes=[];
			$scope.makes=res;
			  // $('#carform')[0].reset();
				document.getElementById('carform').reset();
			});
		}
		
		//on back to list shows vehicle list
		$scope.show_vahicle_list=function()
		{
			var output = document.getElementById("result");
            $(output).empty();
			// $('#carform')[0].reset();
			document.getElementById('carform').reset();
			$scope.single_vehicle='';
			$scope.imge='';
			$scope.fuelimgs='';
			$scope.description='';
			$scope.vehicleinfo=false;
			$scope.searchinfo=false;
			$scope.showform=false;
			$scope.addVehicle=false;
			$scope.importcsv=false;
			
		}
		var temp = new Array();
		//on click of edit populate data
		$scope.show_vehicle=function(s)
		{
			cimgs=[];
			count=0;
			$scope.successmsg='';
			$scope.fuel_images='';
			$scope.single_vehicle=s;
			if(s.fuel_images!=''){
			   console.log(s.fuel_images);
			   $scope.fuelimgs = s.fuel_images.split(",");
				
			}
			console.log(s.imgs);
			if(s.imgs!=''){
			  
				var str = s.imgs;
				temp = str.split(",");
				$scope.imge=temp;

			}
			
			console.log($scope.imge);
			var output = document.getElementById("result");
            $(output).empty();
			
			$scope.vehicleinfo=true;
			$scope.searchinfo=true;
			$scope.showform=true;
			$scope.saveVehicle=true;
			$scope.addVehicle=false;
			
			if(s.select_coun=='AUS'){
				  $scope.aus_veh=arr1;
				}else if(s.select_coun=='US'){
				   $scope.aus_veh=arr2;
				}
			
			$http.post('Admin/Vehicle_Controller/getMakes').success(function(res){
			$scope.makes=res;
			});
		}
		//delete images
		$scope.deleteimg=function(imgs,id)
		{
			temp = temp.filter(item => item !== imgs);
			$scope.imge=temp;
			for(i=0;i<temp.length;i++)
			{
				var str="";
				console.log(temp[i]);
			}
			var joinedstr = temp.join(',');
			//var single = JSON.stringify(joinedstr);
			$http.post('Admin/Vehicle_Controller/updateimg?id='+joinedstr+'&vehid='+id+'&unimg='+imgs).success(function(res){
		});
			
			
		}
		
		//delete vehicle
		$scope.delete_vehicle=function(data)
		{
			$scope.sel_vehicle=data;
			$('#confirmModal').modal('show');
			
		}
		$scope.delete=function(data){
			
		    var veh_id=data.vehicle_id;
			$http.post('Admin/Vehicle_Controller/deleteVehicle?id='+veh_id).success(function(res){
				$('#confirmModal').modal('hide');
				 viewVehicle();
				$scope.msg='successfully deleted';
				$('#myModal').modal('show');
				
		    });
		}
		 $(function() {
  $("#images").on("change", function(){
   var files = !!this.files ? this.files : [];
   if (!files.length || !window.FileReader) return; // Check if File is selected, or no FileReader support
   if (/^image/.test( files[0].type)){ //  Allow only image upload
    var ReaderObj = new FileReader(); // Create instance of the FileReader
    ReaderObj.readAsDataURL(files[0]); // read the file uploaded
    ReaderObj.onloadend = function(){ // set uploaded image data as background of div
    $("#PreviewPicture").css("background-image", "url("+this.result+")");
   }
  }else{
    alert("Upload an image");
  }
 });
});
		
		$scope.set_front_image=function(img){
		    $scope.single_vehicle.front_img=img;
			$scope.single_vehicle.front_fuel_img='';
		}
		$scope.set_frontfuel_image=function(img){
		    $scope.single_vehicle.front_fuel_img=img;
			$scope.single_vehicle.front_img='';
		}
		
		//update data in database
		$scope.Update_vehicle=function(single_vehicle,vehimg)
		{
			console.log(single_vehicle);
				  console.log($scope.fuel_images);
			 var uploadUrl = "Admin/Dealer_Controller/Upload_image";
			 $scope.dt=true;
			 delete single_vehicle.$$hashKey;
			
			 if(document.querySelector('#images')!==null){

				//var file = document.querySelector('#images').files;
				var file=cimgs;
				console.log(file);
					var imgnm="";
                    var updatedimgs=document.getElementById('mnimgs').value;
					var updatedimgs_array = updatedimgs.split(",");
							
					for(i=0;i<file.length;i++)
					{
                       if(updatedimgs_array.includes(file[i]['name']) && file[i]['size']>0){
						var filename = file[i]['name'];
						filename = filename.replace(/ /g, '_');
						var name = single_vehicle.trim.substring(0, 4);
				         filename = name+'_'+file[i]['name'];
				       
						if(imgnm.length==0)
						{
							console.log(file);
							imgnm=filename;
						}	
						else
						{
							imgnm+=','+filename;
						}
						
						fileUpload.uploadFileToUrl(file[i],uploadUrl,filename);
					  }
					}
				 console.log(imgnm);
				  if($scope.imge){
				     var oldimgs=$scope.imge;
                     var newimgs=imgnm.split(',');
					  console.log(oldimgs,newimgs)
					  for(var j=0;j<oldimgs.length;j++){
					    for(var k=0;k<newimgs.length;k++){
						  if(newimgs[k]==oldimgs[j]){
						     newimgs.splice(k,1);
						  }
						}
					  }
					  if(newimgs.length!=0 ){
						  var newimg=newimgs.toString();
						  if(oldimgs.length!=0){
						     single_vehicle.imgs=oldimgs+','+newimg;
						  }else{
						    single_vehicle.imgs=newimg;
						  }
					  }else{
					    single_vehicle.imgs=$scope.imge.toString();
					  }
					
				  }else{
				    single_vehicle.imgs=$scope.imge.toString();
				  }
				 
				 console.log(single_vehicle.imgs);
				 var lastChar = single_vehicle.imgs.slice(-1);
				 if (lastChar == ',') {
					single_vehicle.imgs = single_vehicle.imgs.slice(0, -1);
				 }

				   
			 }
			
		
		        console.log($scope.fuel_images);

			if($scope.fuelimgs!=undefined && $scope.fuelimgs!=''){
			    
			  	if($scope.fuel_images==undefined || $scope.fuel_images==''){
			  	    single_vehicle.fuel_images=$scope.fuelimgs.toString();
				   
				}else{
				   
				   single_vehicle.fuel_images=$scope.fuel_images.toString()+','+$scope.fuelimgs.toString();
				}
			  
			}else{
				if($scope.fuel_images!=undefined || $scope.fuel_images!=''){
			       single_vehicle.fuel_images=$scope.fuel_images.toString();
				}
			}
			
			name = single_vehicle.trim.substring(0, 4);
			 var va=$(".hid").val();
			
			if(va!=undefined && va!=''){
				console.log(va);
				va=va.replace(/ /g,'_');
				single_vehicle.front_img=name+'_'+va;
			}
			var error=0;
			console.log(single_vehicle.front_img);
			console.log(single_vehicle.front_fuel_img);
			if(single_vehicle.front_img=='' && single_vehicle.front_fuel_img==''){
				console.log('s');
				 $scope.frontimgerr='please select default front model image';
				 error=1;
			}

				
				
			delete single_vehicle.make_id;
			delete single_vehicle.make_name;
			delete single_vehicle.makeCountry;
			delete single_vehicle.badge;
			delete single_vehicle.disclosure;
			
			console.log(single_vehicle);
			  /*var data = $.param({
				vehinfo:single_vehicle
				});
			
				var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}}
						$http.post('Admin/Vehicle_Controller/Update_vehicle',data,config).success(function (data, status, headers, config) {
							console.log(data);
							
							
							$scope.showform=false;

				$scope.vehicleinfo=false;
				$scope.searchinfo=false;
				viewVehicle();
			}); */ 
			if(error==0){
			
				$http.post('Admin/Vehicle_Controller/Update_vehicle?vdata='+JSON.stringify(single_vehicle)).success(function(data){
				console.log(data);
					$scope.showform=false;

					$scope.vehicleinfo=false;
					$scope.searchinfo=false;
					viewVehicle();
				
				});
		  }
		}
		//search vehicle
		$scope.searchvehicle=function(veh)
		{
			var vehi = JSON.stringify(veh);
			
			$http.post('Admin/Vehicle_Controller/searchvehicle?search='+vehi).success(function(res){
				
						$scope.vehicle=res;
						$scope.gridOptions={
					  data:res,
					  columnDefs:[
					  {field: 'make_name', displayName:'Make' },
					  {field: 'model', displayName:'Model' },
					  {field: 'trim', displayName:'Trim' },
					  {field: 'year', displayName:'Year' },
					  {field: 'vehicle_type', displayName:'Vehicle Type' },
					{field: 'select_coun', displayName:'Country' },
					  {field: 'Action',minWidth:300,cellTemplate:'<button class="btn btn-primary uigridbtn" ng-click="grid.appScope.show_vehicle(row.entity)">Edit</button><button type="button" ng-if="row.entity.status==0" ng-click="grid.appScope.toggle_status(1,row.entity.vehicle_id)" class="btn btn-success">Activate</button><button type="button" ng-if="row.entity.status==1" ng-click="grid.appScope.toggle_status(0,row.entity.vehicle_id)" class="btn btn-warning">Deactivate</button><button type="button" ng-click="grid.appScope.delete_vehicle(row.entity)" class="btn btn-danger uigridbtn">Delete</button>',displayName:'Action' },
					  ]
				  };
					
	
	});
			
		}
		
		//toggle the status
		$scope.toggle_status=function(data,id)
		{
			$http.post('Admin/Vehicle_Controller/toggle_status?status='+data+'&id='+id).success(function(res){
			viewVehicle();
			//$scope.vehicle=res;
		});
		}
		
	$scope.import_vehicle_data=function(){
		
			$scope.importcsv=true;
			$scope.showform=false;
			$scope.vehicleinfo=true;
			$scope.searchinfo=true;
		
        }
		
		
		$scope.upload_cardata=function(){
		 
		$scope.country=$scope.csvcolumn2;
		 $scope.make=$scope.csvcolumn3;
		 $scope.model=$scope.csvcolumn4;
		 $scope.trim=$scope.csvcolumn5;
		 $scope.year=$scope.csvcolumn6;
		 $scope.type=$scope.csvcolumn7;
		 $scope.description=$scope.csvcolumn8;
		 
		 $scope.dap_price=$scope.csvcolumn10;
		 $scope.msrp_price=$scope.csvcolumn11;
		 $scope.special_price=$scope.csvcolumn12;
		 $scope.offer_price=$scope.csvcolumn13;
		 $scope.offer_end=$scope.csvcolumn14;
		 
		 $scope.down_payment=$scope.csvcolumn18;
		 $scope.interest=$scope.csvcolumn15;
		 $scope.tax_rate=$scope.csvcolumn19;
		 $scope.terms=$scope.csvcolumn20;
		 $scope.special_repayment=$scope.csvcolumn16;
		 $scope.monthly_pay=$scope.csvcolumn17;
		
		 
		 
		 var country = [];
		 var make = [];
		 var model = [];
		 var trim = [];
		 var year = [];
		 var type=[];
		 var description=[];
		 
		 var dap_price=[];
		 var msrp_price=[];
		 var special_price=[];
		 var offer_price=[];
		 var offer_end=[];
		 
		 var down_payment=[];
		 var interest=[];
		 var tax_rate=[];
		 var terms=[];
		 var special_repayment=[];
		 var monthly_pay=[];
		 
		 
		 for(var i=0;i<$scope.result.length-1;i++){
			 country.push($scope.result[i][$scope.country]);
		 }
	    
		 for(var i=0;i<$scope.result.length-1;i++){
			 make.push($scope.result[i][$scope.make]);
		 }
		 
		 for(var i=0;i<$scope.result.length-1;i++){
			 model.push($scope.result[i][$scope.model]);
		 }
		 
		 for(var i=0;i<$scope.result.length-1;i++){
			 trim.push($scope.result[i][$scope.trim]);
		 }
		 
		 for(var i=0;i<$scope.result.length-1;i++){
			 year.push($scope.result[i][$scope.year]);
		 }
		 
		 for(var i=0;i<$scope.result.length-1;i++){
			 type.push($scope.result[i][$scope.type]);
		 }
		 
		 for(var i=0;i<$scope.result.length-1;i++){
			 description.push($scope.result[i][$scope.description]);
		 }
		 
		 for(var i=0;i<$scope.result.length-1;i++){
			 dap_price.push($scope.result[i][$scope.dap_price]);
		 }
		 
		 for(var i=0;i<$scope.result.length-1;i++){
			 msrp_price.push($scope.result[i][$scope.msrp_price]);
		 }
		 
		 for(var i=0;i<$scope.result.length-1;i++){
			 special_price.push($scope.result[i][$scope.special_price]);
		 }
		 
		 for(var i=0;i<$scope.result.length-1;i++){
			 offer_price.push($scope.result[i][$scope.offer_price]);
		 }
		 
		 for(var i=0;i<$scope.result.length-1;i++){
			 offer_end.push($scope.result[i][$scope.offer_end]);
		 }
		 
		 for(var i=0;i<$scope.result.length-1;i++){
			 down_payment.push($scope.result[i][$scope.down_payment]);
		 }
		 
		 for(var i=0;i<$scope.result.length-1;i++){
			 interest.push($scope.result[i][$scope.interest]);
		 }
			
		 for(var i=0;i<$scope.result.length-1;i++){
			 tax_rate.push($scope.result[i][$scope.tax_rate]);
		 }
		 
		for(var i=0;i<$scope.result.length-1;i++){
			 terms.push($scope.result[i][$scope.terms]);
		 }
		 
		 
		for(var i=0;i<$scope.result.length-1;i++){
			 special_repayment.push($scope.result[i][$scope.special_repayment]);
		 }
		 
		 for(var i=0;i<$scope.result.length-1;i++){
			 monthly_pay.push($scope.result[i][$scope.monthly_pay]);
		 }
		 
		
		 
		 
		 var myColumnDefs = new Array();
   
         for (var i = 0; i <$scope.result.length-1; i++) {
             myColumnDefs.push({ 
			                    country:country[i],
			                    make:make[i],
								model:model[i],
								trim:trim[i],
								year:year[i],
								type:type[i],
			                    description:description[i],
								dap_price:dap_price[i],
								msrp_price:msrp_price[i],
								special_price:special_price[i],
								offer_price:offer_price[i],
			                    offer_end:offer_end[i],
				                down_payment:down_payment[i],
								interest:interest[i],
								tax_rate:tax_rate[i],
								terms:terms[i],
								special_repayment:special_repayment[i],
								monthly_pay:monthly_pay[i],
								
							});
         }
          uplaod_data(myColumnDefs); 
	  }
		
	  
	  function uplaod_data(myColumnDefs){
        $http.post("Admin/Vehicle_Controller/insert_csv_data?newdata="+JSON.stringify(myColumnDefs)).success(function(data){
            if(data==0){
				$scope.msg='data uploaded successfully';
			}else{
				$scope.msg='data uploaded successfully.'+data+' '+'records already exist.';
			}
			$('#csvModal').modal('show');
		   document.csvuploadform1.reset(); 
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
			if(data==1){
				count++;
				console.log(count);
			}
			
            console.log("Success");
         })
         .error(function(){
            console.log("Error");
         });
     }
 }]);

AdminApp.directive('fileReader', function($http,$rootScope) {

 return {

    scope: {
      fileReader:"="
	 
    },
	
    link: function(scope, element) {
      $(element).on('change', function(changeEvent) {
        var files = changeEvent.target.files;
        if (files.length) {
          var r = new FileReader();
          r.onload = function(e) {
              var contents = e.target.result;
              scope.$apply(function(){
				   scope.fileReader = contents;
				   //console.log(scope.fileReader);
				   csvJSON(scope.fileReader);
			  });
			 
          };
          
        r.readAsText(files[0]);
        }
      });
    }
  };
  
  
  function csvJSON(csv){

  var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].split(",");
  
  $rootScope.cvsHeaders=headers;
	  console.log(headers);
 
  for(var i=1;i<lines.length;i++){

	  var obj = {};
	  var currentline=lines[i].split(",");

	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
		  
	  }

	  result.push(obj);
   
  }
    $rootScope.result=result;
	
 //console.log($rootScope.result);
  /*  $http.post("Main_Controller/insert_csv_data?data="+JSON.stringify(result)).then(function(){
	// alert('success');
  });  */
  return JSON.stringify(result);
}  
  
});



