var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

//schemas go here
var UserSchema = new mongoose.Schema({
	name: String,
	appointments: [{type: Schema.Types.ObjectId, ref: 'Appointment'}],
})
//create model
mongoose.model('User', UserSchema);
UserSchema.plugin(deepPopulate);

var AppointmentSchema = new mongoose.Schema({
	title: String,
	date: Date,
	time: Date,
	_user: {type: Schema.Types.ObjectId, ref: 'User'}
})
mongoose.model('Appointment', AppointmentSchema);
AppointmentSchema.plugin(deepPopulate);
