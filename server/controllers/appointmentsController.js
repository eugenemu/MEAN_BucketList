var mongoose = require('mongoose');
var User = mongoose.model('User');
var Appt = mongoose.model('Appointment');

module.exports = {

	show: function(req, res) {
		Appt.find({}).deepPopulate(['._user', 'appointments']).exec(function(err, appts) {
			if (err) {
				console.log(err);
			} else {
				res.json(appts);
			}
		})
	},

	add: function(req, res) {
		console.log(req.body);
		var appt = new Appt(req.body);
		appt.save(function(err) {
			if (err) {
				console.log(err);
			} else {
				User.findByIdAndUpdate({_id: req.body._user}, {$push: {appointments: appt._id}}, function(err, doc) {});
				res.redirect('/showAppts');
			}
		})
	},

	delete: function(req, res) {
		Appt.findOneAndRemove({_id: req.body.id}, function(err, doc) {
			if (err) {
				console.log(err);
			} else {
				res.redirect('/showAppts');
			}
		})
	}
}