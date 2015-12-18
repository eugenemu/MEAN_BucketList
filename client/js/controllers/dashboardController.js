angular.module('myApp');
myApp.controller('dashboardController', function ($scope, $location, userFactory, appointmentFactory) {

	var user = userFactory.user();

	userFactory.getUser(user._id, function(data) {
		userInfo = data;
	});

	appointmentFactory.showAppts(function(data) {
		$scope.appts = data;
	});

	$scope.logout = function() {
		userFactory.logout();
		$location.url('/');
	}

	$scope.addAppt = function() {
		$location.url('/new_appointment');
	}

	$scope.deleteError = false;

	$scope.deleteAppt = function(id) {
		for (var i = 0; i < userInfo.appointments.length; i++) {
			if (userInfo.appointments[i] == id) {
				$scope.deleteError = false;
				appointmentFactory.deleteAppt(id, function(data) {
					$scope.appts = data;
				})
			} else {
				$scope.deleteError = true;
			} 
		}
	}

});