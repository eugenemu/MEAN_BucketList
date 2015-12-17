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

	factory.getUser = function() {
		return $sessionStorage.currUser;
	}

	factory.getUserbyId = function(info, callback) {
		$http.post('/getUser', info).success(function(data) {
			callback(data);
		})
	}

	factory.logout = function() {
		$sessionStorage.currUser = null;
	}

	return factory;

});