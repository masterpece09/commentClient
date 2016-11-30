'use strict';

commentApp.config(function ($stateProvider, $urlRouterProvider){
    
    $stateProvider                
    .state('app.login', {
    	url: 'login',
    	resolve:{
    		user: ['authService', function(authService){
    			return authService;
    		}]
    	},
    	views: {
    		'header@': {
                 templateUrl: ''
             },
    		'content@': {
                templateUrl: 'app/public/template/login.html'                                
            }
    	},
    	controller: 'AuthController'
    }); 
});

commentApp.directive("fileread", [function () {
    return {
        $scope: {
            fileread: "="
        },
        link: function ($scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                $scope.$apply(function () {
                    $scope.fileread = changeEvent.target.files[0];
                    console.log($scope.fileread);
                    
                    // or all selected files:
                    // scope.fileread = changeEvent.target.files;
                });
            });
        }
    }
}]);


commentApp.controller('AuthController', ['Upload','$scope', '$rootScope', '$state', 'authService', '$cookies', 'md5', '$http',
                      function(Upload,$scope, $rootScope, $state, authService, $cookies, md5,$http){
	//verify if valid user session exists.
	//if yes, redirect to user profile settings

//	$scope.files;
	
	$scope.upload = function(){
		console.log($scope.picFile);
		Upload.upload({
		    url: "http://localhost:8080/Commentaire/upload",
		    file: $scope.picFile 
		})
        .then( 
        function (response) {
        	var resp = response.data;
        	console.log("YES");
        },
        function(errResponse){
        	alert('bad things happened');
        });	
	}
	
	$scope.username;	
	$scope.password;
	$scope.login = function(){
		
		authService.setCredentials($scope.username, md5.createHash($scope.password));
	};
	
	$scope.logout = function(){
		authService.clearCredentials();
	}
}]);
