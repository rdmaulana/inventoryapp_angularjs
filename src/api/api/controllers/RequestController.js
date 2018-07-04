/**
 * RequestController
 *
 * @description :: Server-side logic for managing requests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	pendingReq: function(req, res){
		var sql = "SELECT * FROM request WHERE status = 0";
		Request.query(sql,function(err,respon){
			if(err) console.log('err',err);
			if(respon){
                var resp = JSON.parse(JSON.stringify(respon));
				console.log('resp',resp);
				res.ok({pendingRequest:resp})
			}
		});
	},

	sorting: function(req, res){
		Request.find().sort('updatedAt DESC')
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
    
    totalRequest: function(req, res){
		var sql = "SELECT count(*) total from request WHERE status =0";
		Request.query(sql,function(err,respon){
			if(err) console.log('err',err);
			if (respon){
				var resp = JSON.parse(JSON.stringify(respon));
				console.log('resp',resp);
				res.ok({total:resp[0].total})
			}
		});
	},
};

