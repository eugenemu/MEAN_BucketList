var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');

module.exports = {

	show: function(req, res) {
		Topic.findOne({_id: req.params.topicId}).deepPopulate(['posts', 'posts._user', 'posts.comments', 'posts.comments._user']).exec(function(err, posts) {
			if (err) {
				console.log(err);
			} else {
				res.json(posts);
			}
		})
	},

	add: function(req, res) {
		var post = new Post({post: req.body.post, _topic: req.body.id, _user: req.body.user, likes: 0, dislikes: 0});
		post.save(function(err) {
			if (err) {
				console.log(err);
			} else {
				Topic.findByIdAndUpdate({_id: post._topic}, {$push: {posts: post._id}}, function(err, doc) {});
				User.findByIdAndUpdate({_id: req.body.user}, {$push: {posts: post._id}}, function(err, doc) {});
				res.redirect('/showPosts/' + post._topic);
			}
		})
	},

	like: function(req, res) {
		Post.findByIdAndUpdate({_id: req.body.postId}, {$inc: {likes: 1}}, function(err, doc) {
			res.redirect('/showPosts/' + req.body.topicId)
		})
	},

	dislike: function(req, res) {
		Post.findByIdAndUpdate({_id: req.body.postId}, {$inc: {dislikes: 1}}, function(err, doc) {
			res.redirect('/showPosts/' + req.body.topicId)
		})
	}


}