angular.module('myApp');
myApp.controller('usersController', function ($scope, $location, $routeParams, userFactory) {

	$scope.currUser = userFactory.user();

	userFactory.getUser($routeParams, function(data) {
		$scope.user = data;
	});

});