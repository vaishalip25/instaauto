var AdminApp = angular.module("AdminApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize",
	"ngAnimate", 
    "mgcrea.ngStrap",
	"ngCookies",
	"wysiwyg.module",
	"infinite-scroll",
	"ui.grid"

	
])


AdminApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
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


AdminApp.controller('SidebarController', ['$scope','$http','$location','$state','$rootScope', function($scope,$http,$location,$state,$rootScope) {
    $scope.$on('$includeContentLoaded', function() {
		
		$rootScope.logged_in='1';
		$rootScope.redirecturl="http://188.166.191.35/admin";
		$rootScope.check_session=function(){
			$http.post('Main_Controller/check_session').success(function(data){
				return $rootScope.data=data;
			});
			
		}
		$scope.logout=function(){
			$http.post('Main_Controller/logout').success(function(data){
				if(data=='success'){
					window.location.href="http://188.166.191.35/admin";
				}
			});
		}
		
		$scope.change_password=function(pwd){
			$http.post('Main_Controller/change_password?pwd='+pwd).success(function(data){
				  $('#pwdmodal').modal('hide');
				  $('#successmodal').modal('show');
			});
		}
    });
}]);



AdminApp.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider,$locationProvider) {
   
	

    $urlRouterProvider.otherwise("/makes"); 

   
    $stateProvider

        // Dashboard
        .state('dashboard', {
		    url: "/	$locationProvider.html5Mode(true);",
			params:{
				login_url: {
                    value: null,
                    squash: true,
                 },
			},
            templateUrl: "views/Admin/dashboard.html",  
            data: {pageTitle: 'Admin Dashboard'},
             controller: "AdminController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'AdminApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',                            
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',                            
                            'assets/global/plugins/jquery.sparkline.min.js',

                           'js/Admin/controllers/AdminController.js',
                        ] 
                    });
                }]
            }
        
        })
		.state('vehicles', {
		    url: "/vehicles",
            templateUrl: "views/Admin/vehicles.html",  
            data: {pageTitle: 'Vehicles'},
             controller: "VehicleController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'AdminApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',                            
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',                            
                            'assets/global/plugins/jquery.sparkline.min.js',

                           'js/Admin/controllers/VehicleController.js',
                        ] 
                    });
                }]
            }
        
        })
		.state('dealers', {
		    url: "/dealers",
            templateUrl: "views/Admin/dealer.html",  
            data: {pageTitle: 'Dealer'},
             controller: "DealerController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'AdminApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',                            
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',                            
                            'assets/global/plugins/jquery.sparkline.min.js',

                           'js/Admin/controllers/DealerController.js',
                        ] 
                    });
                }]
            }
        
        })
		.state('makes', {
		    url: "/makes",
            templateUrl: "views/Admin/make.html",  
            data: {pageTitle: 'Makes'},
             controller: "MakeController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'AdminApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',                            
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',                            
                            'assets/global/plugins/jquery.sparkline.min.js',

                           'js/Admin/controllers/MakeController.js',
                        ] 
                    });
                }]
            }
        
        })
		.state('calculator', {
		    url: "/calculator",
            templateUrl: "views/Admin/calculator.html",  
            data: {pageTitle: 'Makes'},
             controller: "CalculatorController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'AdminApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',                            
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',                            
                            'assets/global/plugins/jquery.sparkline.min.js',

                           'js/Admin/controllers/CalculatorController.js',
                        ] 
                    });
                }]
            }
        
        })
		
			.state('leads', {
		    url: "/leads",
            templateUrl: "views/Admin/leads.html",  
            data: {pageTitle: 'Makes'},
             controller: "LeadsController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'AdminApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',                            
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',                            
                            'assets/global/plugins/jquery.sparkline.min.js',

                           'js/Admin/controllers/LeadsController.js',
                        ] 
                    });
                }]
            }
        
        })
	.state('pages', {
		    url: "/pages",
            templateUrl: "views/Admin/pages.html",  
            data: {pageTitle: 'pages'},
             controller: "PagesController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'AdminApp',
                        insertBefore: '#ng_load_plugins_before', 
                        files: [
							'assets/global/plugins/morris/morris.css',                            
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',                            
                            'assets/global/plugins/jquery.sparkline.min.js',
                           'js/Admin/controllers/PagesController.js',
                        ] 
                    });
                }]
            }
        
        })
	
	.state('disclosure', {
		    url: "/disclosure",
            templateUrl: "views/Admin/disclosure.html",  
            data: {pageTitle: 'disclosure'},
             controller: "DisclosureController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'AdminApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',                            
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',                            
                            'assets/global/plugins/jquery.sparkline.min.js',

                           'js/Admin/controllers/DisclosureController.js',
                        ] 
                    });
                }]
            }
        
        });
	
	//$locationProvider.html5Mode(true);
	

}]);

AdminApp.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
}]);

