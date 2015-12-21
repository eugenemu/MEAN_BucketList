angular.module('myApp');
myApp.controller('dashboardController', function ($scope, $location, userFactory, appointmentFactory) {

	var user = userFactory.user();

	userFactory.getUser(user._id, function(data) {
		userInfo = data;
	});

	appointmentFactory.showAppts(function(data) {
		$scope.appts = data;
	});

	userFactory.getUserAppt(user._id, function(data) {
		userAppt = data;
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
		// to find if appt is one day ahead, use the id given and have a function
		// that retrieves that appointment's info and parse the date
		// and subtract from now and if the time is over 86,400,000 then 
		// there's still a day left so you can cancel the appt.

		// checks for every appointment id the user has, that is logged in has
		// and compares with the id of the appointment that is trying to be deleted.
		for (var i = 0; i < userInfo.appointments.length; i++) {
			if (userInfo.appointments[i] == id) {
				$scope.deleteError = false;
				appointmentFactory.deleteAppt(id, function(data) {
					$scope.appts = data;
				})
				break;
			} else {
				$scope.deleteError = true;
			} 
		}
	}

});