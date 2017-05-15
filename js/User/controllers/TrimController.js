angular.module('UserApp').controller('TrimController', ['$rootScope','$scope','$sce','settings','$cookies','$cookieStore','$http','$localStorage','$window','$location','$templateCache','$stateParams','$state', function($rootScope, $scope, $sce,settings,$cookies,$cookieStore,$http,$localStorage,$window,$location,$templateCache,$stateParams,$state) {
    $scope.$on('$viewContentLoaded', function() {	
        // initialize core components
        App.initAjax();
		
		$window.scrollTo(0, 0);
		$scope.loading = true;
	
		  $scope.updateTsPrevious = function() {
		    $scope.tsPrevious = +new Date();
		  };
		  $scope.updateTsNext = function() {
		    $scope.tsNext = +new Date();
		  };
		  
  
		console.log($localStorage.cd);
		var s=$localStorage.cd;
		if(s!=undefined && s!='' && s!=null){
			$scope.dpayment=$localStorage.cd['dpayment'];
			$scope.estimated_trade_in=$localStorage.cd['estimated_trade_in'];
			$scope.interest_rate=$localStorage.cd['interest_rate'];
			$scope.terms=$localStorage.cd['terms'];
		}
		
        get_calculator_values();
		function get_calculator_values(){
			$http.post('User/Finance_Controller/get_calculator_values').success(function(data){
			     console.log(data);
                            $scope.cal_data=data[0];
				 
			});
		}
			 
		/*$cookies.make=$stateParams.make;
		$cookies.model=$stateParams.model;
		if($cookies.make != null){
			$cookies.put('make', $cookies.make);
			var make=$cookies.get('make');
			
		}else{
	
			var make=$cookies.get('make');
		} 
		
		if($cookies.model != null){
			$cookies.put('model', $cookies.model);
			var model=$cookies.get('model');
			
		}else{
	
			var model=$cookies.get('model');
		} */
		
		
		var model=$stateParams.model;
		model=model.replace(/_/g," ");
		$scope.model_name=model;
		
		var makename=$stateParams.makename;
		makename=makename.replace(/_/g," ");
		
		get_make_id();
		function get_make_id(){
			$http.post('User/Home_Controller/get_make_id?makename='+makename).success(function(res){
				if(res.length>0){
					get_years(res[0]['make_id'],model);
				  
				}
			});
		}
	
		//get_years();
	   // select_trim();
		
        slider();	
	    $scope.loan=false;
		$scope.lease=true;
		
		$scope.msrp_price=false;
		$scope.emi_price=true;
	
               function get_years(make,model){
               
                      $http.post('User/Finance_Controller/get_calculator_values').success(function(data){
			     console.log(data);
                            $scope.cal_data=data[0];
                            
                            $http.post('User/Home_Controller/select_year?makeinfo='+make+'&modelinfo='+model).success(function(res){
				console.log(res);
				 $scope.modelyear=res;
                 $scope.get_vehicle_data(res[0].year,make,model);
			});
			
				 
			});
		      
			
           
		}
		
	  $scope.get_vehicle_data=function(year,make,model){
	     $http.post('User/Home_Controller/get_vehicle_data?year='+year+'&make='+make+'&model='+model).success(function(data){
			  
			console.log(data);
			    var car_price;
			    var down_pay;
			    var estm_trade;
			    var tax_rate;
			    var terms;
			    var interest_rate;
			    var calculator_values=[];
			    
			     $scope.trims=data;
			     $scope.veh_info=data[0];
			
			    for(var i=0;i<$scope.trims.length;i++){
					 var special=0;
					 var d = new Date();
					 if($scope.trims[i].offer_end!='' ){
						var res=dateCompare( d , $scope.trims[i].offer_end);
						if(res){
						   if($scope.trims[i].special_price!='' && $scope.trims[i].special_price!=0){
								var car_price=$scope.trims[i].special_price;
								var special=1;
						   }else{
								var car_price=$scope.trims[i].msrp_price;
						   }
						}else{

							 var car_price=$scope.trims[i].msrp_price;
						 
						}
					 }else{
					    var car_price=$scope.trims[i].msrp_price;
					 
					 }
					
					estm_trade=0;
					if(data[i].down_payment!=''){
						 down_pay=data[i].down_payment;
					}else{
						 down_pay=$scope.cal_data.down_payment;
					}
                     
					 
					if(data[i].taxrate!='' && data[i].taxrate!=0){
						 tax_rate=data[i].taxrate;
					}else{
						 tax_rate=$scope.cal_data.tax_rate;
					}
                     
					
					
					if(data[i].terms!='' && data[i].terms!=0){
						 terms=data[i].terms;
					}else{
						 terms=$scope.cal_data.terms;
					}

					if(data[i].interest!='' && data[i].interest!=0){
						 interest_rate=data[i].interest;
						
						
					}else{
						 interest_rate=$scope.cal_data.interest_rt;
						
					}
					
				
					var total_tax=(car_price * tax_rate)/100;
					var down_payment=car_price * down_pay / 100;
                     
					
					

					if(estm_trade > (parseInt(car_price)-parseInt(down_payment))){
						down_payment=parseInt(car_price) - parseInt(estm_trade);
					}

					var actual_price=parseInt(car_price) - parseInt(down_payment)-parseInt(estm_trade)+parseInt(total_tax);

					var p=actual_price;
					var r=( interest_rate/ 12 )/ 100;
					var n=terms;
					var s= 1 + r;
					var pow=Math.pow(s, -n);

					var emi=(p * r)/(1 - pow);
					var total_interest=emi*terms - p;
					var totol_payment=parseInt(car_price) + parseInt(total_tax) + parseInt(total_interest);
				     if(i==0){
							
							calculator_values['car_price']=car_price;
							calculator_values['down_payment_percent']=down_pay;
							calculator_values['tax_rate']=tax_rate;
							calculator_values['interest_rate']=interest_rate;
							calculator_values['terms']=terms;
							calculator_values['estimated_trade_in']=estm_trade;
						    $localStorage.calculator_values=calculator_values;
					        $rootScope.calcy=calculator_values;
							
					   }
					
					 $scope.dpayment=Math.round(down_payment);
					$scope.estimated_trade_in=Math.round(estm_trade);
					$scope.interest_rate=Math.round(interest_rate);
					$scope.terms=Math.round(terms);
				
				    $scope.trims[i]['sel_down_payment']=down_payment;
				    $scope.trims[i]['sel_down_payment_percent']=down_pay;
				    $scope.trims[i]['monthly_pay']=Math.round(emi);
				    $scope.trims[i]['sel_interest_rate']=interest_rate;
				    $scope.trims[i]['sel_tax_rate']=tax_rate;
				    $scope.trims[i]['sel_terms']=terms;
				    $scope.trims[i]['total_pay']=totol_payment;
				    $scope.trims[i]['sel_est_trade']=estm_trade;
					
					
					
					console.log($scope.terms);
			   }
			
			   CarouselDemoCtrl($scope,data[0])
			
		    });
	   }
	  
	  
	  function CarouselDemoCtrl($scope,res){
       console.log(res);
		  var im=res;
		  var employees = [];
		  if(im!=undefined){	
			if(im['imgs']!=''){
				var single=im['imgs'].split(',');
				$scope.img1=im['imgs'].split(',');
				$scope.myInterval = 3000;
				
				for (i = 0; i < single.length; i++) {
					if(i==0){
					  employees.push({image:'./upload/'+single[i],active:true});
					}else{
				   employees.push({image:'./upload/'+single[i]});
				   }
				} 
			   document.getElementById('img1').value=im['imgs'];
			   $scope.slides =employees;
			   
			}
			  
			if(im['fuel_images']!=''){
				var single1=im['fuel_images'].split(',');
				$scope.myInterval = 3000;
				for (i = 0; i < single1.length; i++) {
					
				   employees.push({image:single1[i]});
				} 
				
			   $scope.slides =employees;
			}
			  $scope.slides[0].active=true;
		  }
		   $scope.loading = false;
		  
		  var images=[];
		  for(var k=0;k<4;k++){
		    images.push($scope.slides[k].image);
		  }
		  
		  $scope.images=images;
		 console.log($scope.slides);
		}
		
		
		
		$scope.get_trim_img=function(trimdata,trim,make,model)
	    { 
		  
			$scope.loading = true;
			$localStorage.select_trim=trimdata;
			   console.log(trimdata);
		        var carprice;
			    var down_payment;
			    var est_trade;
			    var taxrate;
			    var term;
			    var interest_rate;
			    var calculator_values=[];
		
		         var special=0;
			     var d = new Date();
			     if(trimdata.offer_end!='' && trimdata.offer_end!=0){
				    var res=dateCompare( d , trimdata.offer_end);
				    if(res){
					   if(trimdata.special_price!='' && trimdata.special_price!=0){
					        var carprice=trimdata.special_price;
						    var special=1;
					   }else{
					        var carprice=trimdata.msrp_price;
					   }
					}else{

							 var carprice=trimdata.msrp_price;
						 
						}
				 }else{
					 
				     var carprice=trimdata.msrp_price;
				 } 
		        
		       if(trimdata.sel_down_payment_percent!=undefined){
				   
		         down_payment=trimdata.sel_down_payment_percent;
		         taxrate=trimdata.sel_tax_rate;
		         term=trimdata.sel_terms;
		         interest_rate=trimdata.sel_interest_rate;
		         est_trade=trimdata.sel_est_trade;
				   
			   }else{
			   
			      down_payment=trimdata.down_payment;
		          taxrate=trimdata.taxrate;
		          term=trimdata.terms;
		          interest_rate=trimdata.interest;
		          est_trade=0;
				   
			   } 
		
		         calculator_values['car_price']=carprice;
		 	     calculator_values['down_payment_percent']=down_payment;
			     calculator_values['estimated_trade_in']=est_trade;
			     calculator_values['tax_rate']=taxrate;
			     calculator_values['interest_rate']=interest_rate;
			     calculator_values['terms']=term;
			
			         $scope.dpayment=Math.round(down_payment);
					$scope.estimated_trade_in=Math.round(est_trade);
					$scope.interest_rate=Math.round(interest_rate);
					$scope.terms=Math.round(term);
			    
			     $localStorage.calculator_values=calculator_values;
			     $rootScope.calcy=calculator_values;
		
				 $scope.estimation=trimdata;
				 $rootScope.vehicle=trimdata.vehicle_id;
				 $localStorage.vehicle=trimdata.vehicle_id;
			     

			     $localStorage.calculated_data=trimdata;
			
			     console.log($localStorage.select_trim);

				 $('.sel-trm').addClass('slide-items');
                 
			       CarouselDemoCtrl($scope,trimdata);
				 /*$http.post('User/Home_Controller/get_trim_img?triminfo='+trim+'&makeinfo='+make+'&modelinfo='+model).success(function(res){
				     CarouselDemoCtrl($scope,res);
					 
			     });*/
		   }
	 	
		/*function select_trim(make,model)
	   { 
		
		  $http.post('User/Home_Controller/get_trim?makeinfo='+make+'&modelinfo='+model).success(function(res){
			  
				$localStorage.select_trim=res;
			  if($localStorage.select_trim.length!=0){
			    if($localStorage.select_trim[0]['imgs']!=undefined){
				  	$scope.imgs=$localStorage.select_trim[0]['imgs'];
				}
			  }

				//CarouselDemoCtrl($scope,res)
         
		  });
           
	  }*/
		
		
		
		$scope.show_price=function(){
		    $scope.price=true;
		    $scope.emi=true;
			$scope.msrp_price=true;
		    $scope.emi_price=false;
		}
		
		$scope.show_emi=function(){
		   $scope.price=false;
		    $scope.emi=false;
			$scope.msrp_price=false;
		    $scope.emi_price=true;
		}
		
		$rootScope.update_trim_emi=function(calcy){
			
			var calculator_values=[];   
			
			for(var i=0;i<$scope.trims.length;i++){
				
					 var special=0;
					 var d = new Date();
					 if($scope.trims[i].offer_end!=''){
						 
						var res=dateCompare( d , $scope.trims[i].offer_end);
						if(res){
						   if($scope.trims[i].special_price!='' && $scope.trims[i].special_price!=0){
								var car_price=$scope.trims[i].special_price;
								var special=1;
						   }else{
								var car_price=$scope.trims[i].msrp_price;
						   }
						}else{

							 var car_price=$scope.trims[i].msrp_price;
						 
						}
					 }else{
					    var car_price=$scope.trims[i].msrp_price;
					 }
				
			    	var tax_rate=calcy['tax_rate'];
					var terms=calcy['terms'];
					var interest_rate=calcy['interest_rate'];
					var down_pay=calcy['down_payment_percent'];
					var estm_trade=calcy['estimated_trade_in'];
					
					var total_tax=(car_price * tax_rate)/100;
					var down_payment=car_price * down_pay / 100;


					if(estm_trade > (parseInt(car_price)-parseInt(down_payment))){
						down_payment=parseInt(car_price) - parseInt(estm_trade);
					}

					var actual_price=parseInt(car_price) - parseInt(down_payment)-parseInt(estm_trade)+parseInt(total_tax);

					var p=actual_price;
					var r=( interest_rate/ 12 )/ 100;
					var n=terms;
					var s= 1 + r;
					var pow=Math.pow(s, -n);

					var emi=(p * r)/(1 - pow);
					var total_interest=emi*terms - p;
					var totol_payment=parseInt(car_price) + parseInt(total_tax) + parseInt(total_interest);
				     
				   
						if($scope.trims[i]['vehicle_id']==$rootScope.vehicle){
							
							
							calculator_values['car_price']=car_price;
							calculator_values['down_payment_percent']=down_pay;
							calculator_values['tax_rate']=tax_rate;
							calculator_values['interest_rate']=interest_rate;
							calculator_values['terms']=terms;
							calculator_values['estimated_trade_in']=estm_trade;
							
							$localStorage.calculated_data=$scope.trims[i];
							
							
						}else if(i==0){
							
							calculator_values['car_price']=car_price;
							calculator_values['down_payment_percent']=down_pay;
							calculator_values['tax_rate']=tax_rate;
							calculator_values['interest_rate']=interest_rate;
							calculator_values['terms']=terms;
							calculator_values['estimated_trade_in']=estm_trade;
							
							$localStorage.calculated_data=$scope.trims[i];
							
					    }
				
				    $localStorage.calculator_values=calculator_values;
					$rootScope.calcy=calculator_values;
				
				    $scope.dpayment=Math.round(down_payment);
					$scope.estimated_trade_in=Math.round(estm_trade);
					$scope.interest_rate=Math.round(interest_rate);
					$scope.terms=Math.round(terms);
				    
				
				    $scope.trims[i]['sel_down_payment']=down_payment;
				    $scope.trims[i]['sel_down_payment_percent']=down_pay;
				    $scope.trims[i]['monthly_pay']=Math.round(emi);
				    $scope.trims[i]['sel_interest_rate']=interest_rate;
				    $scope.trims[i]['sel_tax_rate']=tax_rate;
				    $scope.trims[i]['sel_terms']=terms;
				    $scope.trims[i]['total_pay']=totol_payment;
				    $scope.trims[i]['sel_est_trade']=estm_trade;
			}
			
		}
        function slider(){
			  var full_url = document.URL; // Get current url
			  var url_array = full_url.split('/') // Split the string into an array with / as separator
			  var make = url_array[url_array.length-2];  // Get the last part of the array (-1)
			  var model = url_array[url_array.length-1]; 
			  $.ajax({
					url:'User/Home_Controller/slider',
					data:{'make':make,'model':model},
					method:'POST',
					success:function(data){
				  }
			  });        
        }
		
	   function dateCompare(date1, date2){
			return new Date(date2) > new Date(date1);
		}
		
		
       
	 
	

  
	
	   get_disclosures();
		 
		 function get_disclosures(){
		    $http.post('User/Finance_Controller/get_disclosures').success(function(data){
				$scope.finance_disclosure=data[14]['disc_content'];
		    });
		 }

   
	
	$scope.backresult=function()
	{
		 $('.sel-trm').removeClass('slide-items');
		
		
	}
	
	$scope.bckmodel=function()
	{
		window.history.back()
	}

	$scope.lease_show=function()
	{
		
		$scope.loan=true;
		$scope.lease=false;
	}	
	$scope.loan_show=function()
	{
		
		
		$scope.loan=false;
		$scope.lease=true;
	}	
		
		
	$scope.find_dealership=function(make,model)
	{
		
		
		$state.go('dealership', {make : make,model : model});
	}
	

    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
}]);

UserApp.directive('loading', function () {
      return {
        restrict: 'E',
        replace:true,
        template: '<div class="loading"><img src="..."/>LOADING...</div>',
        link: function (scope, element, attr) {
              scope.$watch('loading', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      }
  })
UserApp.directive('wallopSlider', function () {
    return {
      template: '<div class="wallop-slider {{animationClass}}"><ul class="wallop-slider__list"><li class="wallop-slider__item {{itemClasses[$index]}}" ng-repeat="i in images"><img src="{{i}}"></li></ul><button ng-show="images.length>1" class="st-button wallop-slider__btn wallop-slider__btn--previous btn btn--previous" ng-disabled="prevDisabled" ng-click="onPrevButtonClicked()">Previous</button><button ng-show="images.length>1" class="st-button wallop-slider__btn wallop-slider__btn--next btn btn--next" ng-disabled="nextDisabled" ng-click="onNextButtonClicked()">Next</button></div>',
      restrict: 'EA',
      transclude: true,
      replace: false,
      scope: {
        images: '=',
        animation: '@',
        currentItemIndex: '=',
        onNext: '&',
        onPrevious: '&'
      },
      controller: function($scope, $timeout) {

        $scope.itemClasses = [];

        $scope.$watch('images', function(images) {
          if (images.length) {
            _goTo(0);
          }
        });

        $scope.$watch('itemClasses', function(itemClasses) {
          console.log('itemClasses', itemClasses);
        });

        // set animation class corresponding to animation defined in CSS. e.g. rotate, slide
        if ($scope.animation) {
          $scope.animationClass = 'wallop-slider--' + $scope.animation;
        }

        var _displayOptions = {
          btnPreviousClass: 'wallop-slider__btn--previous',
          btnNextClass: 'wallop-slider__btn--next',
          itemClass: 'wallop-slider__item',
          currentItemClass: 'wallop-slider__item--current',
          showPreviousClass: 'wallop-slider__item--show-previous',
          showNextClass: 'wallop-slider__item--show-next',
          hidePreviousClass: 'wallop-slider__item--hide-previous',
          hideNextClass: 'wallop-slider__item--hide-next'
        };

        function updateClasses() {
          if ($scope.itemClasses.length !== $scope.images.length) {
            $scope.itemClasses = [];
            for (var i=0; i<$scope.images.length; i++) {
              $scope.itemClasses.push('');
            }
          }
        }
        function _nextDisabled() {
          console.log('$scope.currentItemIndex', $scope.currentItemIndex, $scope.images.length);

          return ($scope.currentItemIndex + 1) === $scope.images.length;
        }
        function _prevDisabled() {
          return !$scope.currentItemIndex;
        }
        function _updatePagination() {
          $scope.nextDisabled = _nextDisabled();
          $scope.prevDisabled = _prevDisabled();
        }
        function _clearClasses() {
          for (var i=0; i<$scope.images.length; i++) {
            $scope.itemClasses[i] = '';
          }

        }

        // go to slide
        function _goTo(index) {
          console.log('_goTo', index);
          if (index >= $scope.images.length || index < 0 || index === $scope.currentItemIndex) {

            if (!index) {
              $scope.itemClasses[0] = _displayOptions.currentItemClass;
            }
            return;
          }

          _clearClasses();

          $scope.itemClasses[$scope.currentItemIndex] = (index > $scope.currentItemIndex) ? _displayOptions.hidePreviousClass : _displayOptions.hideNextClass;

          var currentClass = (index > $scope.currentItemIndex) ? _displayOptions.showNextClass : _displayOptions.showPreviousClass;
          $scope.itemClasses[index] = _displayOptions.currentItemClass + ' ' + currentClass;

          $scope.currentItemIndex = index;

          _updatePagination();

        }

        // button event handlers
        // consider using the ng-tap directive to remove delay
        $scope.onPrevButtonClicked = function () {
          _goTo($scope.currentItemIndex - 1);
        };
        $scope.onNextButtonClicked = function () {
          _goTo($scope.currentItemIndex + 1);
        };
        
        $scope.$watch('currentItemIndex', function(newVal, oldVal) {
          if (oldVal > newVal) {
            if (typeof $scope.onPrevious === 'function') {
              $scope.onPrevious();
            }
          } else {
            if (typeof $scope.onNext === 'function') {
              $scope.onNext();
            }
          }
        });

      }
    };
});
