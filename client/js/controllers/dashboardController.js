angular.module('myApp');
myApp.controller('dashboardController', function ($scope, $location, userFactory) {

	$scope.login = function() {
		userFactory.checkUser($scope.user, function(user) {
			if (user) {
				$location.url('/dashboard');
			} else {
				userFactory.addUser($scope.user, function(user) {
					$location.url('/dashboard');
				})
			}
		});
	}

});