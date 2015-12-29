var users = require('../controllers/usersController.js');
var activities = require('../controllers/activitiesController.js');

module.exports = function(app) {

	app.get('/', function(req, res) {
		users.index(req, res);
	})
	//Users Routes
	app.post('/checkUser', function(req, res) {
		users.checkUser(req, res);
	})

	app.post('/addUser', function(req, res) {
		users.add(req, res);
	})

	app.post('/getUser', function(req, res) {
		users.get(req, res);
	})

	app.get('/getUsers', function(req, res) {
		users.getAll(req, res);
	})

	//Activities Routes
	app.post('/showActivities', function(req, res) {
		console.log(req.body);
		activities.show(req, res);
	})

	app.post('/addActivity', function(req, res) {
		activities.add(req, res);
	})

	app.post('/deleteAppt', function(req, res) {
		activities.delete(req, res);
	})

}