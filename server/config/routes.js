var users = require('../controllers/usersController.js');

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

}