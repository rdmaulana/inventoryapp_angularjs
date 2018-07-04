/**
 * PenggunaController
 *
 * @description :: Server-side logic for managing penggunas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	total : function(req, res){
		var sql = "SELECT count(*) total from pengguna";
		if(req.param('divisi')){ 
			sql += " WHERE divisi = '"+ req.param('divisi')+"'";
		}
		Pengguna.query(sql,function(err,respon){
			if(err) console.log('err',err);
			if (respon){
				var resp = JSON.parse(JSON.stringify(respon));
				console.log('resp',resp);
				res.ok({total:resp[0].total})
			}
		});
	},
	login: function(req,res){
        var md5 = require('md5');
		Pengguna.findOne({username:req.param('username'),password: md5(req.param('password'))})
		.exec(function(err,found){
            
			if(err){
                console.log('err',err);
				res.badRequest({status:'error',message:"Data not found"});
			}
			if(found){
				res.ok({status:'berhasil',data:found})
			} else {
                res.badRequest({status:'error',message:"Data tidak ditemukan"}); 
            }
		});
	},

	count_user: function(req, res){
		var sql = "SELECT divisi, COUNT(*) AS jumlah FROM pengguna GROUP BY divisi";
		Pengguna.query(sql,function(err,respon){
			if(err) console.log('err',err);
			if (respon){
				var resp = JSON.parse(JSON.stringify(respon));
				console.log('resp',resp);
				res.ok(resp)
			}
		});
	}
};

