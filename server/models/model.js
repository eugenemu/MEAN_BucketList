var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

//schemas go here
var UserSchema = new mongoose.Schema({
	name: String,
	activities: [{type: Schema.Types.ObjectId, ref: 'Activity'}],
})
//create model
mongoose.model('User', UserSchema);
UserSchema.plugin(deepPopulate);

var ActivitySchema = new mongoose.Schema({
	title: String,
	description: String,
	check: Boolean,
	date: Date,
	_user: {type: Schema.Types.ObjectId, ref: 'User'}
})
mongoose.model('Activity', ActivitySchema);
ActivitySchema.plugin(deepPopulate);
