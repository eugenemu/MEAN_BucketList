var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var Topic = mongoose.model('Topic');

module.exports = {

	show: function(req, res) {
		Topic.findOne({_id: req.params.topicId})
		.deepPopulate(['posts.comments', 'posts.comments._user'])
		.exec(function(err, topic) {
			if (err) {
				console.log(err);
			} else {
				res.json(topic);
				}
			})
	},

	add: function(req, res) {
		var comment = new Comment({comment: req.body.comment, _post: req.body.post, _user: req.body.user});
		comment.save(function(err) {
			if (err) {
				console.log(err);
			} else {
				Post.findByIdAndUpdate({_id: comment._post}, {$push: {comments: comment._id}}, function(err, doc) {});
				User.findByIdAndUpdate({_id: req.body.user}, {$push: {comments: comment._id}}, function(err, doc) {});
				res.redirect('/showPosts/' + req.body.topic);
			}
		})
	}

}