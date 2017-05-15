angular.module('UserApp').controller('CalcyController', ['$rootScope','$scope','$sce','settings','$http','$localStorage','$window','$location','$templateCache','$stateParams','$state', function($rootScope, $scope, $sce,settings,$http,$localStorage,$window,$location,$templateCache,$stateParams,$state) {
    $scope.$on('$viewContentLoaded', function() {	
        App.initAjax();
		$window.scrollTo(0, 0);
	   
		show_calculator();
		
		
		
		
		
		$scope.update_calculator=function(car_price,down_payment,estimated_trade_in,tax_rate,terms,interest_rate){
			
			//var down_payment = document.getElementById('down_payment').value;
			//var estimated_trade_in = document.getElementById('estimated_trade_in').value;
			//var tax_rate = document.getElementById('tax_rate').value;
			//var interest_rate = document.getElementById('interest_rate').value;
			//var terms = document.getElementById('terms').value;
		  
			
			
			console.log(down_payment);
			var max =$('#bublesele').attr('max');
			var max1 =$('#down_payment_selector').attr('max');
			var max2 =$('#estimated_tradein_selector').attr('max');
			var max3 =$('#tax_rate_selector').attr('max');
			var max4 =$('#terms_selector').attr('max');				
			var max5 =$('#interest_rate_selector').attr('max');
	
			 var newval=[];
			    newval['car_price']=$scope.car_price;
				if(car_price>max){
					newval['car_price']=max;
				}
				
				$scope.down_payment_selector=((down_payment * 100)/newval['car_price']);
				newval['down_payment_percent']=$scope.down_payment_selector;

                if(down_payment>car_price){
					
				}	
				
			    newval['estimated_trade_in']=estimated_trade_in;
			    newval['tax_rate']=tax_rate;
			    newval['interest_rate']=interest_rate;
			    newval['terms']=terms;
			
			    newval['dpayment']=down_payment;
				
				
			    
				
			    $rootScope.newval=newval;
			
			    $scope.car_price=$rootScope.newval['car_price'];
				$scope.down_payment_percent=$rootScope.newval['down_payment_percent'];
				$scope.estimated_trade_in=$rootScope.newval['estimated_trade_in'];
				$scope.tax_rate=$rootScope.newval['tax_rate'];
				$scope.terms=$rootScope.newval['terms'];
				$scope.interest_rate=$rootScope.newval['interest_rate'];

				$scope.down_payment=$rootScope.newval['car_price'] * $rootScope.newval['down_payment_percent'] / 100;

				$scope.car_price_selector=$rootScope.newval['car_price'];
				$scope.down_payment_selector=$rootScope.newval['down_payment_percent'];
				$scope.estimated_tradein_selector=$rootScope.newval['estimated_trade_in'];
				$scope.tax_rate_selector=$rootScope.newval['tax_rate'];
				$scope.terms_selector=$rootScope.newval['terms'];
				$scope.interest_rate_selector=$rootScope.newval['interest_rate'];

				document.getElementById("bublesele").value = $rootScope.newval['car_price'];
				document.getElementById("down_payment_selector").value = $rootScope.newval['down_payment_percent'];
				document.getElementById("estimated_tradein_selector").value = $rootScope.newval['estimated_trade_in'];
				document.getElementById("tax_rate_selector").value = $rootScope.newval['tax_rate'];
				document.getElementById("terms_selector").value = $rootScope.newval['terms'];
				document.getElementById("interest_rate_selector").value = $rootScope.newval['interest_rate'];
			
			        
					console.log(max);
					var w= ($scope.car_price_selector/max)*100;			
					console.log(w);
					//$('#bublesele').css(':after','width', w);
					$(".js-rangestyle-6").replaceWith($('<style class="js-rangestyle-6">.js-range-slider-6:after { width: '+w+'%; }</style> '));
					/*estimated_calculation();
					update_donut();*/
					
					
					var w1= ($scope.down_payment_selector/max1)*100;					
					//$('#bublesele').css(':after','width', w);
					$(".js-rangestyle-7").replaceWith($('<style class="js-rangestyle-7">.js-range-slider-7:after { width: '+w1+'%; }</style> '));  
					
					
					
					var w2= ($scope.estimated_tradein_selector/max2)*100;					
					//$('#bublesele').css(':after','width', w);
					$(".js-rangestyle-8").replaceWith($('<style class="js-rangestyle-8">.js-range-slider-8:after { width: '+w2+'%; }</style> '));  
					
					var w3= ($scope.tax_rate_selector/max3)*100;					
					//$('#bublesele').css(':after','width', w);
					$(".js-rangestyle-9").replaceWith($('<style class="js-rangestyle-9">.js-range-slider-9:after { width: '+w3+'%; }</style> '));  
					
					
					var w4= ($scope.terms_selector/max4)*100;					
					//$('#bublesele').css(':after','width', w);
					$(".js-rangestyle-10").replaceWith($('<style class="js-rangestyle-10">.js-range-slider-10:after { width: '+w4+'%; }</style> '));
					
					var w5= ($scope.interest_rate_selector/max5)*100;					
					//$('#bublesele').css(':after','width', w);
					$(".js-rangestyle-11").replaceWith($('<style class="js-rangestyle-11">.js-range-slider-11:after { width: '+w5+'%; }</style> '));
					
					estimated_calculation();
			
		}
		
		
		function show_calculator(){
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
					document.getElementById("down_payment_selector").value = $rootScope.down_payment_selector;
					document.getElementById("estimated_tradein_selector").value = 0;
					document.getElementById("tax_rate_selector").value =$rootScope.tax_rate_selector;
					document.getElementById("terms_selector").value = $rootScope.terms_selector;
					document.getElementById("interest_rate_selector").value = $rootScope.interest_rate_selector;

					estimated_calculation();
					

				});
				
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
			
			var max2 =$('.est').attr('max');
			console.log(max2);
			var w2= ($scope.estimated_tradein_selector/max2)*100;
console.log(w2);			
			//$('#bublesele').css(':after','width', w);
			$(".js-rangestyle-8").replaceWith($('<style class="js-rangestyle-8">.js-range-slider-8:after { width: '+w2+'%; }</style> '));  
		
			
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

			var chartCtx = $("#canvas").get(0).getContext("2d");
			var chart = new Chart(chartCtx).Doughnut(doughnutData, options);
			//calculate_special_repayment();
			
			chart.chart.height=180;
			chart.chart.width=180;
			
			
			//console.log(chart);
			//console.log(chart.chart.height);
            
			function innerTextFunction() {
				var canvasWidthvar = $('#canvas').width();
				var canvasHeight = $('#canvas').height();
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
			 
		       /* var calculator_values=[];
			    
			    calculator_values['car_price']=$scope.car_price;
			  	calculator_values['down_payment_percent']=$scope.down_payment_percent;
			    calculator_values['estimated_trade_in']=$scope.estimated_trade_in;
			    calculator_values['tax_rate']=$scope.tax_rate;
			    calculator_values['interest_rate']=$scope.interest_rate;
			    calculator_values['terms']=$scope.terms;
			
			    calculator_values['dpayment']=$scope.down_payment;
			    
				
			    $localStorage.calculator_values=calculator_values;
			    $localStorage.cd=calculator_values;
			    $rootScope.calcy=calculator_values;
			    if($state.current.name=='trim'){
			       $rootScope.update_trim_emi($rootScope.calcy);
			    }
			   $('#calculator').modal('hide');*/
			
		}
		
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
		
		
		
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
}]);


