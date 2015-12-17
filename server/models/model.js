var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

//schemas go here
var UserSchema = new mongoose.Schema({
	name: String,
	topics: [{type: Schema.Types.ObjectId, ref: 'Topic'}],
	posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
})
//create model
mongoose.model('User', UserSchema);
