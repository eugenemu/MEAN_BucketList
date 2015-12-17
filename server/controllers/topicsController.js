var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');

module.exports = {

	show: function(req, res) {
		Topic.find({}).populate('_user').exec(function(err, topics) {
			if (err) {
				console.log(err);
			} else {
				res.json(topics);
			}
		})
	},

	add: function(req, res) {
		var topic = new Topic({category: req.body.category, topic: req.body.topic, description: req.body.description, _user: req.body.user._id});
		topic.save(function(err) {
			if (err) {
				console.log(err);
			} else {
				User.findByIdAndUpdate({_id: topic._user}, {$push: {topics: topic._id}}, function(err, doc) {
				})
				res.redirect('/showTopics');
			}
		});
	},

	getTopic: function(req, res) {
		Topic.findOne({_id: req.body.id}).populate('_user').exec(function(err, topic) {
			if (err) {
				console.log(err);
			} else {
				res.json(topic);
			}
		})
	}
}