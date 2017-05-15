var UserApp = angular.module("UserApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize",
	"ngAnimate", 
    "mgcrea.ngStrap",
	"ngCookies",
	"infinite-scroll",
	"ngStorage",
	'ngIdle'

	
])

UserApp.config(["KeepaliveProvider", "IdleProvider",
   function (KeepaliveProvider, IdleProvider) {
        IdleProvider.idle(30);
        IdleProvider.timeout(60);
        //KeepaliveProvider.interval(60);
}]);
	
UserApp.run(['Idle','$rootScope','$http','$localStorage', function (Idle,$rootScope,$http,$localStorage) {
	 Idle.watch();
	 $rootScope.$on('IdleStart', function() { 
		 console.log($localStorage);
		//alert('your session will expire in 1 minutes...plz do something to keep session alive'); 
		
	 });
     $rootScope.$on('IdleTimeout', function() {
          console.log($localStorage);

	 });

}]);

UserApp.factory('settings', ['$rootScope', function($rootScope) {
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: 'assets',
        globalPath: 'assets/global',
        layoutPath: 'assets/layouts/layout',
    };

    $rootScope.settings = settings;

    return settings;
}]);



UserApp.controller('HeaderController', ['$scope','$rootScope','$http','$window','$location','$state','$localStorage', function($scope,$rootScope,$http,$window,$location,$state,$localStorage) {
    $scope.$on('$includeContentLoaded', function() {
		 App.initAjax();
		   $scope.priavcy_policy=function(){
			   $state.go('privacy_policy');
			}
		
	
		$rootScope.car_price='';
		$rootScope.down_payment_percent='';
		$rootScope.down_payment='';
		$rootScope.tax_rate='';
		$rootScope.terms='';
		$rootScope.interest_rate='';
		$rootScope.estimated_trade_in='';
		$rootScope.estimated_monthly_payment='';
		
		$rootScope.car_price_selector='';
		$rootScope.down_payment_selector='';
		$rootScope.estimated_tradein_selector='';
		$rootScope.tax_rate_selector='';
		$rootScope.terms_selector='';
		$rootScope.interest_rate_selector='';
		
		$rootScope.car_price1='';
	
		
		$scope.update_calculator=function(){
			
			var car_price = document.getElementById('car_price').value;
			var down_payment = document.getElementById('down_payment').value;
			var estimated_trade_in = document.getElementById('estimated_trade_in').value;
			var tax_rate = document.getElementById('tax_rate').value;
			var interest_rate = document.getElementById('interest_rate').value;
			var terms = document.getElementById('terms').value;
		  
			$scope.down_payment=down_payment;
			$scope.down_payment_selector=((down_payment * 100)/$scope.car_price);
			 var newval=[];
			    newval['car_price']=car_price;
			  	newval['down_payment_percent']=$scope.down_payment_selector;
			    newval['estimated_trade_in']=estimated_trade_in;
			    newval['tax_rate']=tax_rate;
			    newval['interest_rate']=interest_rate;
			    newval['terms']=terms;
			
			    newval['dpayment']=down_payment;
			    
			    $rootScope.newval=newval;
			    //$scope.show_calculator();
			
			    $scope.car_price=$rootScope.newval['car_price'];
				$scope.down_payment_percent=$rootScope.newval['down_payment_percent'];
				$scope.estimated_trade_in=$rootScope.newval['estimated_trade_in'];
				$scope.tax_rate=$rootScope.newval['tax_rate'];
				$scope.terms=$rootScope.newval['terms'];
				$scope.interest_rate=$rootScope.newval['interest_rate'];

				$scope.down_payment=$rootScope.newval['car_price'] * $rootScope.newval['down_payment_percent'] / 100;

				$rootScope.car_price_selector=$rootScope.newval['car_price'];
				$rootScope.down_payment_selector=$rootScope.newval['down_payment_percent'];
				$rootScope.estimated_tradein_selector=$rootScope.newval['estimated_trade_in'];
				$rootScope.tax_rate_selector=$rootScope.newval['tax_rate'];
				$rootScope.terms_selector=$rootScope.newval['terms'];
				$rootScope.interest_rate_selector=$rootScope.newval['interest_rate'];

				document.getElementById("bublesele").value = $rootScope.newval['car_price'];
				document.getElementById("down_payment_selector").value = $rootScope.newval['down_payment_percent'];
				document.getElementById("estimated_tradein_selector").value = $rootScope.newval['estimated_trade_in'];
				document.getElementById("tax_rate_selector").value = $rootScope.newval['tax_rate'];
				document.getElementById("terms_selector").value = $rootScope.newval['terms'];
				document.getElementById("interest_rate_selector").value = $rootScope.newval['interest_rate'];
			
			var max =$('#bublesele').attr('max');
					var w= ($rootScope.car_price_selector/max)*100;			
					console.log(max,w);
					//$('#bublesele').css(':after','width', w);
					$(".js-rangestyle-0").replaceWith($('<style class="js-rangestyle-0">.js-range-slider-0:after { width: '+w+'%; }</style> '));
					/*estimated_calculation();
					update_donut();*/
					
					var max1 =$('#down_payment_selector').attr('max');
					var w1= ($rootScope.down_payment_selector/max1)*100;					
					//$('#bublesele').css(':after','width', w);
					$(".js-rangestyle-1").replaceWith($('<style class="js-rangestyle-1">.js-range-slider-1:after { width: '+w1+'%; }</style> '));  
					
					
					var max2 =$('#estimated_tradein_selector').attr('max');
					var w2= ($rootScope.estimated_tradein_selector/max2)*100;					
					//$('#bublesele').css(':after','width', w);
					$(".js-rangestyle-2").replaceWith($('<style class="js-rangestyle-2">.js-range-slider-2:after { width: '+w2+'%; }</style> '));  
					
					var max3 =$('#tax_rate_selector').attr('max');
					var w3= ($rootScope.tax_rate_selector/max3)*100;					
					//$('#bublesele').css(':after','width', w);
					$(".js-rangestyle-3").replaceWith($('<style class="js-rangestyle-3">.js-range-slider-3:after { width: '+w3+'%; }</style> '));  
					
					
					var max4 =$('#terms_selector').attr('max');
					var w4= ($rootScope.terms_selector/max4)*100;					
					//$('#bublesele').css(':after','width', w);
					$(".js-rangestyle-4").replaceWith($('<style class="js-rangestyle-4">.js-range-slider-4:after { width: '+w4+'%; }</style> '));
					
										
					var max5 =$('#interest_rate_selector').attr('max');
					var w5= ($rootScope.interest_rate_selector/max5)*100;					
					//$('#bublesele').css(':after','width', w);
					$(".js-rangestyle-5").replaceWith($('<style class="js-rangestyle-5">.js-range-slider-5:after { width: '+w5+'%; }</style> '));
					
					estimated_calculation();
			
		}
		
		
		$scope.show_calculator=function(){
			   
			 $('#calculator').modal('show');
			if($rootScope.calcy!=undefined){
				
				console.log($rootScope.calcy);
				
				$scope.car_price=$rootScope.calcy['car_price'];
				$scope.down_payment_percent=$rootScope.calcy['down_payment_percent'];
				$scope.estimated_trade_in=$rootScope.calcy['estimated_trade_in'];
				$scope.tax_rate=$rootScope.calcy['tax_rate'];
				$scope.terms=$rootScope.calcy['terms'];
				$scope.interest_rate=$rootScope.calcy['interest_rate'];
				
				$scope.down_payment=$rootScope.calcy['car_price'] * $rootScope.calcy['down_payment_percent'] / 100;
				
				$rootScope.car_price_selector=$rootScope.calcy['car_price'];
				$rootScope.down_payment_selector=$rootScope.calcy['down_payment_percent'];
				$rootScope.estimated_tradein_selector=$rootScope.calcy['estimated_trade_in'];
				$rootScope.tax_rate_selector=$rootScope.calcy['tax_rate'];
				$rootScope.terms_selector=$rootScope.calcy['terms'];
				$rootScope.interest_rate_selector=$rootScope.calcy['interest_rate'];
				
				
				document.getElementById("bublesele").value = $rootScope.calcy['car_price'];
				document.getElementById("car_price").value = $rootScope.calcy['car_price'];
				document.getElementById("down_payment_selector").value = $rootScope.calcy['down_payment_percent'];
				document.getElementById("estimated_tradein_selector").value = $rootScope.calcy['estimated_trade_in'];
				document.getElementById("tax_rate_selector").value = $rootScope.calcy['tax_rate'];
				document.getElementById("terms_selector").value = $rootScope.calcy['terms'];
				document.getElementById("interest_rate_selector").value = $rootScope.calcy['interest_rate'];
				
				
				
				
				
                    
				    var max =$('#bublesele').attr('max');
					var w= ($rootScope.car_price_selector/max)*100;		
				    console.log(w);
					//$('#bublesele').css(':after','width', w);
					$(".js-rangestyle-0").replaceWith($('<style class="js-rangestyle-0">.js-range-slider-0:after { width: '+w+'%; }</style> '));
					
					var max1 =$('#down_payment_selector').attr('max');
					var w1= ($scope.down_payment_percent/max1)*100;
			
					//$('#bublesele').css(':after','width', w);
					$(".js-rangestyle-1").replaceWith($('<style class="js-rangestyle-1">.js-range-slider-1:after { width: '+w1+'%; }</style> '));  
					
					
					var max2 =$('#estimated_tradein_selector').attr('max');
					var w2= ($scope.estimated_trade_in/max2)*100;	
			
					//$('#bublesele').css(':after','width', w);
					$(".js-rangestyle-2").replaceWith($('<style class="js-rangestyle-2">.js-range-slider-2:after { width: '+w2+'%; }</style> '));  
					
					var max3 =$('#tax_rate_selector').attr('max');
					var w3= ($scope.tax_rate/max3)*100;		
		
					//$('#bublesele').css(':after','width', w);
					$(".js-rangestyle-3").replaceWith($('<style class="js-rangestyle-3">.js-range-slider-3:after { width: '+w3+'%; }</style> '));  
					
					
					var max4 =$('#terms_selector').attr('max');
					var w4= ($scope.terms/max4)*100;		
			
					//$('#bublesele').css(':after','width', w);
					$(".js-rangestyle-4").replaceWith($('<style class="js-rangestyle-4">.js-range-slider-4:after { width: '+w4+'%; }</style> '));
					
										
					var max5 =$('#interest_rate_selector').attr('max');
					var w5= ($scope.interest_rate/max5)*100;	
					//$('#bublesele').css(':after','width', w);
					$(".js-rangestyle-5").replaceWith($('<style class="js-rangestyle-5">.js-range-slider-5:after { width: '+w5+'%; }</style> '));
				
				estimated_calculation();
			
				//console.log($scope.car_price);
			    
			}else{
			    
				$http.post('User/Finance_Controller/get_calculator_values').success(function(data){
					$scope.default_values=data[0];
					var cal=data[0];

					  
					$scope.car_price=cal.car_price;
				
					$scope.down_payment_percent=cal.down_payment;
					$scope.down_payment=$scope.car_price * $scope.down_payment_percent / 100;
					$scope.tax_rate=cal.tax_rate;
					$scope.terms=cal.terms;
					$scope.interest_rate=cal.interest_rt;
					$scope.estimated_trade_in=0;

					$rootScope.car_price_selector=cal.car_price;
					$rootScope.down_payment_selector=cal.down_payment;
					$rootScope.estimated_tradein_selector=$rootScope.estimated_trade_in;
					$rootScope.tax_rate_selector=cal.tax_rate;
					$rootScope.terms_selector=cal.terms;
					$rootScope.interest_rate_selector=cal.interest_rt;
					
					
					
					document.getElementById("bublesele").value = $scope.car_price;
					document.getElementById("car_price").value = cal.car_price;
					document.getElementById("down_payment_selector").value = $rootScope.down_payment_selector;
					document.getElementById("estimated_tradein_selector").value = 0;
					document.getElementById("tax_rate_selector").value =$rootScope.tax_rate_selector;
					document.getElementById("terms_selector").value = $rootScope.terms_selector;
					document.getElementById("interest_rate_selector").value = $rootScope.interest_rate_selector;

				
                    
					var max =$('#bublesele').attr('max');
					var w= ($rootScope.car_price_selector/max)*100;			
					console.log(max,w);
					//$('#bublesele').css(':after','width', w);
					$(".js-rangestyle-0").replaceWith($('<style class="js-rangestyle-0">.js-range-slider-0:after { width: '+w+'%; }</style> '));
					/*estimated_calculation();
					update_donut();*/
					
					var max1 =$('#down_payment_selector').attr('max');
					var w1= ($rootScope.down_payment_selector/max1)*100;					
					//$('#bublesele').css(':after','width', w);
					$(".js-rangestyle-1").replaceWith($('<style class="js-rangestyle-1">.js-range-slider-1:after { width: '+w1+'%; }</style> '));  
					
					
					var max2 =$('#estimated_tradein_selector').attr('max');
					var w2= ($rootScope.estimated_tradein_selector/max2)*100;					
					//$('#bublesele').css(':after','width', w);
					$(".js-rangestyle-2").replaceWith($('<style class="js-rangestyle-2">.js-range-slider-2:after { width: '+w2+'%; }</style> '));  
					
					var max3 =$('#tax_rate_selector').attr('max');
					var w3= ($rootScope.tax_rate_selector/max3)*100;					
					//$('#bublesele').css(':after','width', w);
					$(".js-rangestyle-3").replaceWith($('<style class="js-rangestyle-3">.js-range-slider-3:after { width: '+w3+'%; }</style> '));  
					
					
					var max4 =$('#terms_selector').attr('max');
					var w4= ($rootScope.terms_selector/max4)*100;					
					//$('#bublesele').css(':after','width', w);
					$(".js-rangestyle-4").replaceWith($('<style class="js-rangestyle-4">.js-range-slider-4:after { width: '+w4+'%; }</style> '));
					
										
					var max5 =$('#interest_rate_selector').attr('max');
					var w5= ($rootScope.interest_rate_selector/max5)*100;					
					//$('#bublesele').css(':after','width', w);
					$(".js-rangestyle-5").replaceWith($('<style class="js-rangestyle-5">.js-range-slider-5:after { width: '+w5+'%; }</style> '));
					
					estimated_calculation();
					

				});
				
			}
		
			//$('.range-slider').trigger('input');
			
			
		}
		
		
		//estimated_calculation();
		function estimated_calculation(){ 
			
			var car_price=$scope.car_price;
			var tax_rate=$scope.tax_rate;
			var terms=$scope.terms;
			var interest_rate=$scope.interest_rate
			var down_pay=$scope.down_payment_percent;
			var estm_trade=$scope.estimated_trade_in;
			
			if(terms==0){
			  terms=$scope.default_values.terms;
				$scope.terms=$scope.default_values.terms;
			  $rootScope.terms_selector=$scope.default_values.terms;
			}
			
			if(interest_rate==0){
			  interest_rate=$scope.default_values.interest_rt;
				$scope.interest_rate=$scope.default_values.interest_rt;
			  $rootScope.interest_rate_selector=$scope.default_values.interest_rt;
			}
			
			if(tax_rate==0){
			  var total_tax=0;
			}else{
			  var total_tax=(car_price * tax_rate)/100;
			}
			
			
			
			if(down_pay==0){
			  var down_payment=0;
			}else{
			  var down_payment=car_price * down_pay / 100;
			}
			
			
			if(estm_trade > (parseInt(car_price)-parseInt(down_payment))){
			    down_payment=parseInt(car_price) - parseInt(estm_trade);
			}else{
			  
			}
			
			var actual_price=parseInt(car_price) - parseInt(down_payment)-parseInt(estm_trade)+parseInt(total_tax);
			
			var p=actual_price;
			var r=( interest_rate/ 12 )/ 100;
			var n=terms;
			var s= 1 + r;
			var pow=Math.pow(s, -n);
			
			var emi=(p * r)/(1 - pow);
			if(interest_rate==0){
			   var total_interest=0;
			}else{
			  var total_interest=emi*terms - p;
			
			}
			
			var totol_payment=parseInt(car_price) + parseInt(total_tax) + parseInt(total_interest);
			
			if(car_price==0 || emi==0){
			  	$scope.estimated_monthly_payment=0.01;
			}else{
			  	$scope.estimated_monthly_payment=Math.round(emi);
				
			}
			
			    $scope.down_payment=Math.round(down_payment);
			    $scope.total_tax=Math.round(total_tax);
			    $scope.total_interest=Math.round(total_interest);
			    $scope.estimated_total_payment=Math.round(totol_payment);
			
	             document.getElementById("down_payment").value =Math.round(down_payment);
			     document.getElementById('estimated_trade_in').value=estm_trade;
				 document.getElementById('tax_rate').value=tax_rate ;
				 document.getElementById('interest_rate').value= interest_rate;
				 document.getElementById('terms').value=terms;
			
			
			$rootScope.terms=terms;
			$rootScope.estimated_monthly_payment=Math.round(emi);
			
			update_donut()
		
		}
		
		
		
		
		function update_donut(){
			
			//console.log($scope.estimated_total_payment);
		    var d=$scope.down_payment;
			var i=$scope.total_interest;
			var t=$scope.total_tax;
			var amt=$scope.estimated_total_payment;
		    var doughnutData = [
			  { value: i, color: "#f19f34", highlight: "#5AD3D1",number:"10", label: "Total Interest" },
			  { value: t, color: "#85d2e2", highlight: "#5AD3D1",number:"10", label: "Total Tax" },
			  { value: d,color:"#5196f3", highlight: "#FF5A5E",number:"10", label: "Down Payment" },
			  { value: amt, color: "#5AD3D1", highlight: "#5AD3D1",number:"10", label: "Amount Financed" },
			];
			//console.log(doughnutData);
			var options = { 
			  showTooltips : true,
			  animation: false,
			  percentageInnerCutout : 80,
			  onAnimationComplete: innerTextFunction
			};

			var chartCtx = $("#canvas2").get(0).getContext("2d");
			var chart = new Chart(chartCtx).Doughnut(doughnutData, options);
			//calculate_special_repayment();
			
			chart.chart.height=180;
			chart.chart.width=180;
			
			
			//console.log(chart);
			//console.log(chart.chart.height);
            
			function innerTextFunction() {
				var canvasWidthvar = $('#canvas2').width();
				var canvasHeight = $('#canvas2').height();
				//console.log("width"+canvasWidthvar+" "+"width"+canvasHeight);
				var constant = 114;
				var fontsize = (canvasHeight/constant).toFixed(2);
				var total = 0;
				$.each(doughnutData,function() { //calculate_special_repayment();
				  total += parseInt(this.value,10);
					//console.log(total);
				});
				var tpercentage = ((doughnutData[0].value/total)*100).toFixed(2)+"%";
			} 	
		}
		
		
		
		
		$rootScope.estimated_calculation1=function(data){
			
		    estimated_calculation();
		}
		
		
		$scope.save_calculator_values=function(){
			 
		        var calculator_values=[];
			    
			    calculator_values['car_price']=$scope.car_price;
			  	calculator_values['down_payment_percent']=$scope.down_payment_percent;
			    calculator_values['estimated_trade_in']=$scope.estimated_trade_in;
			    calculator_values['tax_rate']=$scope.tax_rate;
			    calculator_values['interest_rate']=$scope.interest_rate;
			    calculator_values['terms']=$scope.terms;
			
			    calculator_values['dpayment']=$scope.down_payment;
			    
				/*calculator_values['down_payment']=$scope.down_payment;
				calculator_values['total_tax']=$scope.total_tax;
				calculator_values['total_interest']=$scope.total_interest;
				calculator_values['estimated_total_payment']=$scope.estimated_total_payment;
				calculator_values['estimated_monthly_payment']=$scope.estimated_monthly_payment;*/
			       
			    $localStorage.calculator_values=calculator_values;
			    $localStorage.cd=calculator_values;
			    $rootScope.calcy=calculator_values;
			    if($state.current.name=='trim'){
			       $rootScope.update_trim_emi($rootScope.calcy);
			    }
			   $('#calculator').modal('hide');
			
		}
		
		
		
		
		/*get_calculator_values();
		function get_calculator_values(){
		    $http.post('User/Finance_Controller/get_calculator_values').success(function(data){
				var cal=data[0];
				console.log(cal);
			    $rootScope.car_price=cal.car_price;
				$rootScope.down_payment_percent=cal.down_payment;
				$rootScope.down_payment=$scope.car_price * $scope.down_payment_percent / 100;
				$rootScope.tax_rate=cal.tax_rate;
				$rootScope.terms=cal.terms;
				$rootScope.interest_rate=cal.interest_rt;
				$rootScope.estimated_trade_in=0;
				
				$rootScope.car_price_selector=cal.car_price;
				$rootScope.down_payment_selector=cal.down_payment;
				$rootScope.estimated_tradein_selector=$rootScope.estimated_trade_in;
				$rootScope.tax_rate_selector=cal.tax_rate;
				$rootScope.terms_selector=cal.terms;
				$rootScope.interest_rate_selector=cal.interest_rt;
				
				estimated_calculation();
				
			});
		}*/
		
		
		$scope.change_carprice=function(carprice){
			$scope.car_price=carprice;
			
			estimated_calculation();
		}
		$scope.change_down_payment=function(down_payment_percent){
		  $scope.down_payment_percent=down_payment_percent;
			estimated_calculation();
		}
		
		$scope.change_estimated_tradein=function(estimated_trade_in){
			
		 $scope.estimated_trade_in=estimated_trade_in;
			estimated_calculation();
		}
		$scope.change_tax_rate=function(tax_rate){
		 $scope.tax_rate=tax_rate;
			estimated_calculation();
		}
		$scope.change_terms=function(terms){
		 $scope.terms=terms;
			estimated_calculation();
		}
		
		 $scope.change_interest_rate=function(interest_rate){
		     $scope.interest_rate=interest_rate;
			 estimated_calculation();
		}
		 
		 
		 get_disclosures();
		 
		 function get_disclosures(){
		    $http.post('User/Finance_Controller/get_disclosures').success(function(data){
				$scope.car_disclosure=data[0]['disc_content'];
				$scope.downpay_disclosure=data[1]['disc_content'];
				$scope.tradein_disclosure=data[2]['disc_content'];
				$scope.taxrate_disclosure=data[3]['disc_content'];
				$scope.term_disclosure=data[4]['disc_content'];
				$scope.apr_disclosure=data[5]['disc_content'];
				$scope.totalinterest_disclosure=data[6]['disc_content'];
				$scope.totaltax_disclosure=data[7]['disc_content'];
				$scope.finance_disclosure=data[14]['disc_content'];
		  
		    });
		 }
		
		$scope.go_to_home=function(){
		
		$state.go('home');
		}
		 
/********************************************LOGIN************************************************/	

	$rootScope.user_login=function(){
	
		chech_login();
	
	}	
		
$scope.login=function(){
    
    var email=$scope.login.uemail;
    var password=$scope.login.upassword;
       $('#lodaerlogin').css('display','block');
       $('#errormsg').html('');
     $.ajax({

				url:'User/Login_Controller/validate',
				data:{'email':email,'password':password},
				method:'POST',
				success:function(data){

				var info=JSON.parse(data);
                   
					if(info['msg']==1){
                        $scope.logged_in=true;
						$scope.not_logged=true;
						$scope.email=info['data'].email;
						$state.reload();
						//$('#userlogin').css('display','none');
						//$('#loginas').css('display','block');
						//$('#loginname').html(info['data']['email']);
						//$('#userlogout').css('display','block');
						$('#login').modal('hide');

					}else{

						$('#errormsg').html("Username/Password Not Match");

					}
				  $('#lodaerlogin').css('display','none');  
				}
		  });
			
    
    }	
   
    chech_login();
        
        function chech_login(){
        
          $.ajax({

					url:'User/Login_Controller/checksession',
					data:{},
					method:'POST',
					success:function(data){
					var info=JSON.parse(data);
					console.log(info);
						if(info['user_id']){
							
							$scope.logged_in=true;
							$scope.not_logged=true;
							$scope.email=info['email'];
							

						   //$('#userlogin').css('display','none');
							//$('#loginas').css('display','block');
							//$('#loginname').html(info['data']['email']);
							//$('#userlogout').css('display','block');

						}else{
                               
							$scope.logged_in=false;
							$scope.not_logged=false;
							
							//$('#loginas').css('display','none');
							//$('#userlogin').css('display','block');
							//$('#userlogout').css('display','none');

						}
					}
             });
        
        }
        
        
        $scope.logout=function(){
        
        $.ajax({

				url:'User/Login_Controller/logout',
				data:{},
				method:'POST',
				success:function(data){
					
					$scope.logged_in=false;
					$scope.not_logged=false;
					//$state.reload();
					$window.location.href='/';
					 //$('#loginas').css('display','none');
					 //$('#userlogin').css('display','block');
					 //$('#userlogout').css('display','none');
				}
		  });
        
        
        
        }
	/********************************************** rang slider *********************************************/
		
		
		
		 
		function updateSlider(element) {
  if (element) {
    var parent = element.parentElement;
    var thumb = parent.querySelector('.range-slider__thumb'),
        bar = parent.querySelector('.range-slider__bar'),
        pct = element.value * ((parent.clientHeight - thumb.clientHeight) / parent.clientHeight);
    thumb.style.bottom = pct + '%';
    bar.style.height = 'calc(' + pct + '% + ' + thumb.clientHeight / 2 + 'px)';
    thumb.textContent = element.value + '%';
  }
  updateDonut(element.value, element.parentNode);
}	
	(function initAndSetupTheSliders() {
	
    [].forEach.call(document.getElementsByClassName("container"), function(el) {
      var inputs = [].slice.call(el.querySelectorAll('.range-slider input'));
		
      inputs.forEach(function (input) {
          //input.setAttribute('value', '50');
          //updateSlider(input);
          input.addEventListener('input', function (element) {
              updateSlider(input);
          });
          input.addEventListener('change', function (element) {
              updateSlider(input);
          });
      });
    });
}());


/*range slider*/
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// private function: resize bubble shadow
	//
	// $wrapper  [jquery object]  The wrapper element
	// index     [integer]        The index of that element
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	function BubbleShadow( $wrapper, index ) {
// 		GUI.debugging( 'range-sliders: Setting shadow ', 'report' );		
		var $this = $wrapper.find('.range-slider');
			
		
		var value = $this.val();
		
		var min = $this.attr('min');
		var max = $this.attr('max');
		
		//var percentage = ( 100 / (max - min) ) * ( value - min );
		var percentage= (value / (max - min))*100;
		//console.log($rootScope.car_price_selector);
		
		$wrapper.addClass( 'js-range-slider-' + index );
                     
                       //console.log(percentage); 
				
		var $style = $('<style/>')
			.addClass('js-rangestyle-' + index)
			.html('.js-range-slider-' + index + ':after { width: ' + ( percentage > 0 ? percentage : 0 ) + '%; }')
			//.html('.js-range-slider-' + index + ':after { width: ' + ( 30 ) + '%; }')

		return $style;

		

	};

		if( $('.js-range-slider').length ) {
// 			GUI.debugging( 'range-sliders: Found instance', 'report' );


			i = 0;
			$('.js-range-slider').each(function iterateSliders() {
			
				var $styles = BubbleShadow( $(this), i );
                  var w=$('.range-slider-currency').attr('max');
			    	//console.log(w);
				$(this)
					.before( $styles )
					.attr('data-index', i);


				i++;
			});


			$('.js-range-slider .range-slider').on('mousedown input active focus touchstart', function showBubble() {
// 				GUI.debugging( 'range-sliders: input changed', 'interaction' );

				var $this = $(this);
			
				var $wrapper = $this.parent('.js-range-slider');
				var index = $wrapper.attr('data-index');
				var _isCurrency = $this.hasClass('range-slider-currency');
				var _isPercentage = $this.hasClass('range-slider-percentage');
				var value = this.value;

				if( _isCurrency ) {
					var c = isNaN(c = Math.abs(c)) ? 2 : c;
					var t = ',';
					var s = value < 0 ? '-' : '';
					var i = parseInt(value = Math.abs(+ value || 0).toFixed(c)) + '';
					var j = (j = i.length) > 3 ? j % 3 : 0;

					value = '$' + s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t);
				}

				if( _isPercentage ) {
					value += '%';
				}

				$( '.js-rangestyle-' + index ).remove();

				var $styles = BubbleShadow( $wrapper, index );
				$styles.insertBefore( $this );

				var $styles = $('<style/>')
					.addClass('js-rangestyle-' + index)
					.html(
						' .js-range-slider-' + index + ' .range-slider::-webkit-slider-thumb:after { content: "' + value + '"; }' +
						' .js-range-slider-' + index + ' .range-slider::-ms-thumb:after { content: "' + value + '"; }' +
						' .js-range-slider-' + index + ' .range-slider::-moz-range-thumb:after { content: "' + value + '"; background-color: "#000"; }'
					)
					.insertBefore( $this );

			});
		}		 
		
    });
}]);



UserApp.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider,$locationProvider) {
   
	// $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise("/"); 

   
    $stateProvider

        // Dashboard
        .state('home', {
		    url: "/",
            templateUrl: "views/User/home.html",  
            data: {pageTitle: 'Home'},
             controller: "HomeController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'UserApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',                            
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',                            
                            'assets/global/plugins/jquery.sparkline.min.js',

							'js/User/controllers/HomeController.js',
                        ] 
                    });
                }]
            }
       
        
        })
		
		.state('made', {
		    url: "/make/:make_name",
		    params:{
				makeid: {
                    value: null,
                    squash: true,
                 },
			},
            templateUrl: "views/User/made.html",  
            data: {pageTitle: 'Models'},
             controller: "MadeController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'UserApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',                            
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',                            
                            'assets/global/plugins/jquery.sparkline.min.js',

							'js/User/controllers/MadeController.js',
                        ] 
                    });
                }]
            }
       
        
        })
		.state('trim', {
			url: "/trims/:makename/:model",
			params:{
				make: {
                    value: null,
                    squash: true,
                 },
				model: {
                    value: null,
                    squash: true,
                 },
			},
            templateUrl: "views/User/trim.html",  
            data: {pageTitle: 'Trim'},
             controller: "TrimController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'UserApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',                            
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',                            
                            'assets/global/plugins/jquery.sparkline.min.js',

							'js/User/controllers/TrimController.js',
                        ] 
                    });
                }]
            }
       
        
        })
		.state('finance', {
			url: "/finance",
			
            templateUrl: "views/User/finance.html",  
            data: {pageTitle: 'Finance'},
             controller: "FinanceController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'UserApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',                            
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',                            
                            'assets/global/plugins/jquery.sparkline.min.js',

							'js/User/controllers/FinanceController.js',
                        ] 
                    });
                }]
            }
       
        
        })
		.state('dealership', {
			url: "/dealership",
			params:{
				make: {
                    value: null,
                    squash: true,
                 },
				model: {
                    value: null,
                    squash: true,
                 },
			},
            templateUrl: "views/User/dealership.html",  
            data: {pageTitle: 'Dealership'},
             controller: "DealershipController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'UserApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',                            
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',                            
                            'assets/global/plugins/jquery.sparkline.min.js',

							'js/User/controllers/DealershipController.js',
                        ] 
                    });
                }]
            }
        })
	
	    
	
	   .state('success', {
		    url: "/success",
            templateUrl: "views/User/success.html",  
            data: {pageTitle: 'Success page'},
	    	controller: "SuccessController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'UserApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',                            
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',                            
                            'assets/global/plugins/jquery.sparkline.min.js',

							'js/User/controllers/SuccessController.js',
                        ] 
                    });
                }]
            }
        
        })
	
	
	.state('credit', {
			url: "/credit",
			params:{
				enquiry_id: {
                    value: null,
                    squash: true,
                 },
				review: {
                    value: null,
                    squash: true,
                 },
			},
            templateUrl: "views/User/credit.html",  
            data: {pageTitle: 'Credit'},
             controller: "CreditController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'UserApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',                            
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',                            
                            'assets/global/plugins/jquery.sparkline.min.js',

							'js/User/controllers/CreditController.js',
                        ] 
                    });
                }]
            }
        })
	
	.state('application', {
			url: "/user_application",
			params:{
				userid: {
                    value: null,
                    squash: true,
                 },
				enquiry_id: {
                    value: null,
                    squash: true,
                 },
				review: {
                    value: null,
                    squash: true,
                 },
			},
            templateUrl: "views/User/application.html",  
            data: {pageTitle: 'Application'},
             controller: "ApplicationController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'UserApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',                            
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',                            
                            'assets/global/plugins/jquery.sparkline.min.js',

							'js/User/controllers/ApplicationController.js',
                        ] 
                    });
                }]
            }
        })
	.state('resetPassword', {
			url: "/resetPassword",
            templateUrl: "views/User/resetPassword.html",  
            data: {pageTitle: 'resetPassword'},
             controller: "ApplicationController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'UserApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',                            
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',                            
                            'assets/global/plugins/jquery.sparkline.min.js',

							'js/User/controllers/ApplicationController.js',
                        ] 
                    });
                }]
            }
        })
	
	   
		.state('residence', {
			url: "/residence",
			params:{
				userid: {
                    value: null,
                    squash: true,
                 },
				review: {
                    value: null,
                    squash: true,
                 },
			},
            templateUrl: "views/User/residence.html",  
            data: {pageTitle: 'residence'},
             controller: "ResidenceController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'UserApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',                            
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',                            
                            'assets/global/plugins/jquery.sparkline.min.js',

							'js/User/controllers/ResidenceController.js',
                        ] 
                    });
                }]
            }
        })
	.state('employment', {
			url: "/employment",
			params:{
				userid: {
                    value: null,
                    squash: true,
                 },
				review: {
                    value: null,
                    squash: true,
                 },
			},
            templateUrl: "views/User/employment.html",  
            data: {pageTitle: 'employment'},
             controller: "EmploymentController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'UserApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',                            
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',                            
                            'assets/global/plugins/jquery.sparkline.min.js',

							'js/User/controllers/EmploymentController.js',
                        ] 
                    });
                }]
            }
        })
	.state('review', {
			url: "/review",
			params:{
				userid: {
                    value: null,
                    squash: true,
                 },
				review: {
                    value: null,
                    squash: true,
                 },
			},
            templateUrl: "views/User/review.html",  
            data: {pageTitle: 'review'},
             controller: "ReviewController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'UserApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',                            
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',                            
                            'assets/global/plugins/jquery.sparkline.min.js',

							'js/User/controllers/ReviewController.js',
                        ] 
                    });
                }]
            }
        })
	
	
	
	.state('identification', {
			url: "/identification",
			params:{
				userid: {
                    value: null,
                    squash: true,
                 },
				review: {
                    value: null,
                    squash: true,
                 },
			},
            templateUrl: "views/User/identification.html",  
            data: {pageTitle: 'identification'},
             controller: "IdentificationController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'UserApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',                            
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',                            
                            'assets/global/plugins/jquery.sparkline.min.js',

							'js/User/controllers/IdentificationController.js',
                        ] 
                    });
                }]
            }
        })
	.state('calculator', {
			url: "/calculator",
            templateUrl: "views/User/calculator.html",  
            data: {pageTitle: 'calculator'},
             controller: "CalcyController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'UserApp',
                        insertBefore: '#ng_load_plugins_before', 
                        files: [
							'js/User/controllers/CalcyController.js',
                        ] 
                    });
                }]
            }
       
        
        })
	.state('privacy_policy', {
			url: "/privacy_policy",
            templateUrl: "views/User/privacy_policy.html",  
            data: {pageTitle: 'privacy policy'},
             controller: "PolicyController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'UserApp',
                        insertBefore: '#ng_load_plugins_before', 
                        files: [
							'js/User/controllers/PolicyController.js',
                        ] 
                    });
                }]
            }
        })
	.state('privacy_notice', {
			url: "/privacy_notice",
            templateUrl: "views/User/privacy_notice.html",  
            data: {pageTitle: 'privacy notice'},
             controller: "NoticeController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'UserApp',
                        insertBefore: '#ng_load_plugins_before', 
                        files: [
							'js/User/controllers/NoticeController.js',
                        ] 
                    });
                }]
            }
        })
	.state('term_of_use', {
			url: "/term_of_use",
            templateUrl: "views/User/term_of_use.html",  
            data: {pageTitle: 'privacy policy'},
             controller: "TermsController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'UserApp',
                        insertBefore: '#ng_load_plugins_before', 
                        files: [
							'js/User/controllers/TermsController.js',
                        ] 
                    });
                }]
            }
        })
	
	.state('etc_records', {
			url: "/etc_records",
            templateUrl: "views/User/etc_records.html",  
            data: {pageTitle: 'privacy policy'},
             controller: "EtcRecordsController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'UserApp',
                        insertBefore: '#ng_load_plugins_before', 
                        files: [
							'js/User/controllers/EtcRecordsController.js',
                        ] 
                    });
                }]
            }
        })
	
	.state('state_disc', {
			url: "/state_disc",
            templateUrl: "views/User/state_disclosure.html",  
            data: {pageTitle: 'privacy policy'},
             controller: "StatediscController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'UserApp',
                        insertBefore: '#ng_load_plugins_before', 
                        files: [
							'js/User/controllers/StatediscController.js',
                        ] 
                    });
                }]
            }
        });
		

	$locationProvider.html5Mode(true);	
	

}]);


UserApp.filter('unsafe', function($sce) {

    return function(val) {

        return $sce.trustAsHtml(val);

    };

});



