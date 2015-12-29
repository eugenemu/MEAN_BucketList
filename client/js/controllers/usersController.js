angular.module('myApp');
myApp.controller('usersController', function ($scope, $location, $routeParams, userFactory, activityFactory) {

	$scope.currUser = userFactory.user();

	userFactory.getUser($routeParams, function(data) {
		$scope.user = data;
		console.log(data);
	});

	$scope.toggleCheck = function(id) {
		info = {_id: id, userid: $scope.currUser._id};
		activityFactory.toggleCheck(info, function(data) {
			$scope.user = data;
		})
	}

});