/**
 * TagihanController
 *
 * @description :: Server-side logic for managing tagihans
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	total : function(req, res){
		var sql = "SELECT count(*) total from tagihan";
		Tagihan.query(sql,function(err,respon){
			if(err) console.log('err',err);
			if (respon){
				var resp = JSON.parse(JSON.stringify(respon));
				console.log('resp',resp);
				res.ok({total:resp[0].total})
			}
		});
	},
    
    totalTagihan : function(req, res){
		var sql = "SELECT SUM(total_harga) total FROM transaksi INNER JOIN tagihan ON transaksi.id = tagihan.transaksi";
		Tagihan.query(sql,function(err,respon){
			if(err) console.log('err',err);
			if (respon){
				var resp = JSON.parse(JSON.stringify(respon));
				console.log('resp',resp);
				// res.ok({label:'KMN',value:resp[0].Komunikasi},
				// 	   {label:'DVL',value:resp[1].Development},
				// 	   {label:'SPT',value:resp[2].Support})
				res.ok({total:resp[0].total})
			}
		});
	},
    
    jumlahTagihan : function(req, res){
		var sql = "SELECT count(*) total from tagihan";
		Tagihan.query(sql,function(err,respon){
			if(err) console.log('err',err);
			if (respon){
				var resp = JSON.parse(JSON.stringify(respon));
				console.log('resp',resp);
				res.ok({total:resp[0].total})
			}
		});
	},
		
};

