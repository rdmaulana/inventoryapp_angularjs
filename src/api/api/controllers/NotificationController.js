/**
 * NotificationController
 *
 * @description :: Server-side logic for managing notifications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	sort: function(req,res){
		var myQuery = Notification.find();

		myQuery.sort('updatedAt DESC');

		myQuery.exec(function callBack(err,respon){
		    if(err) console.log('err',err);
			if (respon){
				var resp = JSON.parse(JSON.stringify(respon));
				console.log('resp',resp);
				res.ok(resp[0])
			}
		});
	},

	// desc: function(req, res){
	// 	Notification.find().sort('updatedAt DESC')
	// 		.exec(function callBack(err,results){
	// 			if (err) {
	// 				console.log('err',err);
	// 			}
	// 			if (results) {
	// 				var resp = JSON.parse(JSON.stringify(results));
	// 				console.log('resp', resp);
	// 				// res.ok(resp[0].id)
	// 				res.ok({id:resp[0].id})
	// 			}
	// 		});
	// },

	sorting: function(req, res){
		Notification.find().sort('updatedAt DESC')
			.exec(function callBack(err,results){
				if (err) {
					console.log('err',err);
				}
				if (results) {
					var resp = JSON.parse(JSON.stringify(results));
					console.log('resp', resp);
					// res.ok(resp[0].id)
					res.ok(resp[0])
				}
			});
	},

	status: function(req, res){
		Notification.count({value: 1})
	    .exec(function (err, response) {
	        if (err) {
	        	console.log('err',err);
	        }
	        if (response) {
	        	var resp = JSON.parse(JSON.stringify(response));
	        	console.log('resp',resp);
	        	res.ok({value: resp});
	        }
	    });
	}
};

