//  inject the ngRoute dependency in the module.
var myApp = angular.module('myApp', ['ngRoute', 'ngStorage', 'ngMessages']);
//  use the config method to set up routing:
myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'static/partials/login.html'
    })
    .when('/dashboard', {
      templateUrl: 'static/partials/dashboard.html'
    })
    .when('/user/:id', {
      templateUrl:'/static/partials/user.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});