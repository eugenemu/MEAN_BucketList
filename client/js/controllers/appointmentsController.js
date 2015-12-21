angular.module('myApp');
myApp.controller('appointmentsController', function ($scope, $location, $routeParams, userFactory, appointmentFactory) {

	var user = userFactory.user();
	var date = new Date();
	var count = 0;
	var minTime = new Date(1970, 0, 1, 8, 0, 0);
	var maxTime = new Date(1970, 0, 1, 17, 0, 0);

	$scope.dateError = false;
	$scope.timeError = false;
	$scope.amountError = false;
	$scope.sameError = false;

	appointmentFactory.showAppts(function(data) {
		appts = data;
	});


	var user = userFactory.user();

	userFactory.getUserAppt(user._id, function(data) {
		userInfo = data;
	});

	$scope.addAppt = function() {

		var inputDate = Date.parse($scope.newAppt.date);
		

		// Checks whether the user already has an appointment on that
		// input date.
		for (var i = 0; i < userInfo.appointments.length; i++) {
			if (Date.parse(userInfo.appointments[i].date) != inputDate) {
				$scope.sameError = false;
			} else {
				$scope.sameError = true;
			}
		}

		for (var i = 0; i < appts.length; i++) {
			if (Date.parse(appts[i].date) == inputDate) {
				count++;
			}
		}

		if ($scope.sameError == false) {
			if (count >= 3) {
				$scope.amountError = true;
			} else {
				$scope.amountError = false;
				if ($scope.newAppt.date > date) {
					$scope.dateError = false;
					if ($scope.newAppt.time < maxTime && $scope.newAppt.time > minTime) {
						$scope.timeError = false;
						$scope.newAppt._user = user._id;
						appointmentFactory.addAppt($scope.newAppt, function(data) {
							$scope.appts = data;
							$scope.newAppt = {};
						})
					} else {
						$scope.timeError = true;
					}
				} else {
					$scope.dateError = true;
				}
			}
		}
		
	}


});