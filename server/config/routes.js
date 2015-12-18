var users = require('../controllers/usersController.js');
var appts = require('../controllers/appointmentsController.js');

module.exports = function(app) {

	app.get('/', function(req, res) {
		users.index(req, res);
	})
	//Users Routes
	app.post('/checkUser', function(req, res) {
		users.getUser(req, res);
	})

	app.post('/addUser', function(req, res) {
		users.add(req, res);
	})

	app.post('/getUser', function(req, res) {
		users.get(req, res);
	})

	app.post('/getUserAppts', function(req, res) {
		users.getAppts(req, res);
	})

	//Appointment Routes
	app.get('/showAppts', function(req, res) {
		appts.show(req, res);
	})

	app.post('/addAppt', function(req, res) {
		appts.add(req, res);
	})

	app.post('/deleteAppt', function(req, res) {
		appts.delete(req, res);
	})

}