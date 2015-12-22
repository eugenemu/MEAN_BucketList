angular.module('myApp');
myApp.controller('dashboardController', function ($scope, $location, userFactory, appointmentFactory) {

	var user = userFactory.user();
	$scope.timeError = false;

	userFactory.getUser(user._id, function(data) {
		userInfo = data;
		console.log(data);
	});

	userFactory.getUserAppt(user._id, function(data) {
		userAppt = data;
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

		var apptDate;
		var date = new Date();

		// Checks for every appointment id the user has, that is logged in has and compares with the id of the appointment that is trying to be deleted.
		if (userInfo.appointments.length == 0) {
			$scope.deleteError = true;
		} else {
			for (var i = 0; i < userInfo.appointments.length; i++) {
				console.log("for loop working");
				if (userInfo.appointments[i] == id) {
					console.log("this");
					$scope.deleteError = false;
					break;
				} else {
					$scope.deleteError = true;
				} 
			}
		}

		
		

		// Finds the appt info for designated person and appt id
		for (var i = 0; i < userAppt.appointments.length; i++) {
			if (userAppt.appointments[i]._id == id) {
				apptDate = userAppt.appointments[i].date;
				break;
			}
		}

		// Checks whether appt is a day later or not.
		if ((Date.parse(apptDate) - Date.parse(date)) > 86400000) {
			$scope.timeError = false;
		} else {
			$scope.timeError = true;
		}

		// Checks the validations and if all are good, execute delete function.
		if ($scope.deleteError == false) {
			if ($scope.timeError == false) {
				appointmentFactory.deleteAppt(id, function(data) {
					$scope.appts = data;
				});
			}
		}

		console.log($scope.deleteError);

	}

});