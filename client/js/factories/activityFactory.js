angular.module('myApp');
myApp.factory('activityFactory', function($http, $sessionStorage) {

	var factory = {};

	factory.showActivities = function(info, callback) {
		info = {_id: info};
		$http.post('/showActivities', info).success(function(data) {
			callback(data);
		})
	}
	
	factory.addActivity = function(info, callback) {
		info.date = Date();
		info.check = false;
		console.log(info);
		$http.post('/addActivity', info).success(function(data) {
			callback(data);
		})
	}

	factory.toggleCheck = function(info, callback) {
		$http.post('/toggleCheck', info).success(function(data) {
			callback(data);
		})
	}

	return factory;

});