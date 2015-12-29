var mongoose = require('mongoose');
var User = mongoose.model('User');
var Activity = mongoose.model('Activity');

module.exports = {

	show: function(req, res) {
		User.findOne({_id: req.body}).deepPopulate(['activities', 'activities._user']).exec(function(err, activities) {
			if (err) {
				console.log(err);
			} else {
				res.json(activities);
			}
		})
	},

	add: function(req, res) {
		var activity = new Activity(req.body);
		activity.save(function(err) {
			if (err) {
				console.log(err);
			} else {
				User.findByIdAndUpdate({_id: activity._user}, {$push: {activities: activity._id}}, function(err, doc) {});
				User.findOne({_id: activity._user}).deepPopulate(['activities', 'activities._user']).exec(function(err, activities) {
					if (err) {
						console.log(err);
					} else {
						res.json(activities);
					}
				})
			}
		})
	},

	toggle: function(req, res) {
		Activity.findByIdAndUpdate({_id: req.body._id}, {$set: {check: true}}, function(err, doc) {
			if (err) {
				console.log(err);
			} else {
				User.findOne({_id: req.body.userid}).deepPopulate(['activities', 'activities._user']).exec(function(err, activities) {
					if (err) {
						console.log(err);
					} else {
						res.json(activities);
					}
				});
			}
		});
	}

}