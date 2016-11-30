'use strict'

commentApp
.service('authService', ['$http', '$rootScope', '$cookies', '$state', 
				function($http, $rootScope, $cookies, $state){

	this.setCredentials = function(username, password){
		var requestParams = "username="+username+"&password="+password;
		var serverUrl = "http://localhost:8080/Commentaire/login?" + requestParams;
		
		var loginStatus = false;
		
		$http({
		    url: serverUrl,
		    method: "POST",
		    params: {
		    	username:username,
		        password:password
		    	}
		})
        .then(
        function (response) {
        	var user = response.data.user;
        	console.log(user);
        	if(response.data.status === 'succeeded'){        		
            	$rootScope.commentGlobals = {
                    currentUser: response.data.user
                };
            	$rootScope.logginWarning = "";
    			$cookies.putObject('commentGlobals', $rootScope.commentGlobals );
    			$state.go('app', {id: $rootScope.commentGlobals.currentUser.id});
        	}else{
	            $rootScope.logginWarning = "Invalid username or password";
        	}
        	
        },
        function(errResponse){
        	alert('bad things happened');
        	alert(errResponse);
        	loginStatus = false;
        });	
	}
	
	
	this.clearCredentials = function(){
		var serverUrl = 'http://localhost:8080/Commentaire/logout';
		$http({
			 url: serverUrl,
		     method: "GET",
		})
		.then(
	        function (response) {
	        	$rootScope.globals = {};
	            $cookies.remove('commentGlobals');
	            $state.go('app.login');	        	
	        },
	        function(errResponse){
	        	$rootScope.logginError = "Connection error!!!";
	        });			
	};
	
	this.isActiveSession = function(){
		var commentGlobals = $cookies.getObject('commentGlobals');
		if(commentGlobals){
			return true;
		}else{
			return false;
		}
	};
	
	
	
	this.getActiveSession = function(){
		var commentGlobals = $cookies.getObject('commentGlobals');
		$rootScope.commentGlobals =commentGlobals;
		return commentGlobals;
	}
	
	
}]);
