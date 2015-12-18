angular.module('myApp');
myApp.factory('userFactory', function($http, $sessionStorage) {

	var factory = {};
	var user = {};
	$sessionStorage.currUser;

	factory.checkUser = function(info, callback) {
		$http.post('/checkUser', info).success(function(data) {
			$sessionStorage.currUser = data;
			callback(data);
		})
	}

	factory.addUser = function(info, callback) {
		$http.post('/addUser', info).success(function(data) {
			$sessionStorage.currUser = data;
			callback(data);
		})
	}

	factory.user = function() {
		return $sessionStorage.currUser;
	}

	factory.getUser = function(info, callback) {
		info = {id: info};
		$http.post('/getUser', info).success(function(data) {
			callback(data);
		})
	}

	factory.logout = function() {
		$sessionStorage.currUser = null;
	}

	return factory;

});