angular.module('myApp');
myApp.factory('appointmentFactory', function($http, $sessionStorage) {

	var factory = {};

	factory.showAppts = function(callback) {
		$http.get('/showAppts').success(function(data) {
			callback(data);
		})
	}
	
	factory.addAppt = function(info, callback) {
		$http.post('/addAppt', info).success(function(data) {
			callback(data);
		})
	}

	factory.deleteAppt = function(info, callback) {
		info = {id: info};
		$http.post('/deleteAppt', info).success(function(data) {
			callback(data);
		})
	}

	return factory;

});