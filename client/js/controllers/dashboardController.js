angular.module('myApp');
myApp.controller('dashboardController', function ($scope, $location, userFactory, activityFactory) {

	$scope.user = userFactory.user();

	userFactory.getUsers(function(data) {
		$scope.users = data;
	});

	activityFactory.showActivities($scope.user._id, function(data) {
		$scope.activities = data;
		console.log(data);
	});
	
	$scope.logout = function() {
		userFactory.logout();
		$location.url('/');
	}

	$scope.addActivity = function() {

		if ($scope.newActivity.title && $scope.newActivity.description) {
			if ($scope.newActivity._user == $scope.user._id) {
				activityFactory.addActivity($scope.newActivity, function(data) {
					$scope.activities = data;
					$scope.newActivity = {};
				});
			} else { 

				activityFactory.addActivity($scope.newActivity, function(data) {
					$scope.newActivity._user = $scope.user._id;
					activityFactory.addActivity($scope.newActivity, function(data) {
						$scope.activities = data;
						$scope.newActivity = {};
					});
				});

				

			}
		}
	}

	$scope.toggleCheck = function(id) {
		info = {_id: id, userid: $scope.user._id};
		activityFactory.toggleCheck(info, function(data) {
			$scope.activities = data;
		})
	}

});