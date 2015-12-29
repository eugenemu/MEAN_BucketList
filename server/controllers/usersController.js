var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {

	index: function(req, res) {
		res.render('index.html');
	},

	checkUser: function(req, res) {
		User.findOne({name: req.body.name}, function(err, user) {
			if (err) {
				console.log(err);
			} else {
				res.json(user);
			}
		})
	},

	get: function(req, res) {
		User.findOne({_id: req.body.id}).deepPopulate(['activities']).exec(function(err, user) {
			if (err) {
				console.log(err);
			} else {
				res.json(user);
			}
		})
	},

	getAll: function(req, res) {
		User.find({}, function(err, users) {
			if (err) {
				console.log(err);
			} else {
				res.json(users);
			}
		})
	},

	add: function(req, res) {
		var user = new User({name: req.body.name}); 
		user.save(function(err) {
			if (err) {
				console.log(err); 
			} else {
				res.json(user);
			}
		});
	}


}