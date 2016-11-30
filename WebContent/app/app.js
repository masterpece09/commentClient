'use strict';

var commentApp = angular.module('commentApp',['ui.router', 'ngCookies', 'ngSanitize', 'angular-md5', 'ngProgress','ngFileUpload']);

commentApp.config(function ($stateProvider, $urlRouterProvider){
        
    $stateProvider
        .state('app', {
            url: '/',
            views: {
                header: {
                    templateUrl: 'app/public/template/header.html'
                },
                content: {
                    templateUrl: 'app/public/template/content.html',
                }, 
                footer: {
                    templateUrl: 'app/public/template/footer.html'
                }
            }

        });       
        
       // $urlRouterProvider.otherwise('/');
});

commentApp.controller('HelloController', ['$scope',function($scope){
}]);

