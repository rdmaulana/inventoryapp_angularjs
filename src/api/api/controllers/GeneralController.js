/**
 * GeneralController
 *
 * @description :: Server-side logic for managing generals
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

//SELECT * FROM general INNER JOIN transaksi ON transaksi.id = general.transaksi WHERE jenis = 0

//"SELECT a.*,b.kode_transaksi,b.total_harga FROM general a INNER JOIN transaksi b ON a.id = b.transaksi WHERE jenis = 0"



module.exports = {
    inGeneral: function(req, res){
        
        General.find({jenis: false}).populate('transaksi') 
            .exec(function(err,response){
                if (err) {
					console.log('err',err);
				}
				if (response) {
					var resp = JSON.parse(JSON.stringify(response));
					console.log('resp', resp);
					// res.ok(resp[0].id)
					res.ok(resp)
				}
            });
	},
    
    exGeneral: function(req, res){
        
        General.find({jenis: true}).populate('vendor') 
            .exec(function(err,response){
                if (err) {
					console.log('err',err);
				}
				if (response) {
					var resp = JSON.parse(JSON.stringify(response));
					console.log('resp', resp);
					// res.ok(resp[0].id)
					res.ok(resp)
				}
            });
	},
    
    
//    exGeneral: function(req, res){
//		var sql = "SELECT * FROM general WHERE jenis = 1";
//		General.query(sql,function(err,respon){
//			if(err) console.log('err',err);
//			if(respon){
//                var resp = JSON.parse(JSON.stringify(respon));
//				console.log('resp',resp);
//				res.ok(resp)
//			}
//		});
//	},
    
    totalKredit : function(req, res){
		var sql = "SELECT SUM(debit_masuk) total FROM general WHERE jenis = 1";
		General.query(sql,function(err,respon){
			if(err) console.log('err',err);
			if (respon){
				var resp = JSON.parse(JSON.stringify(respon));
				console.log('resp',resp);
				// res.ok({label:'KMN',value:resp[0].Komunikasi},
				// 	   {label:'DVL',value:resp[1].Development},
				// 	   {label:'SPT',value:resp[2].Support})
//				res.ok(resp)
                res.ok({total:resp[0].total})
			}
		});
	},
    
    
    totalDebit : function(req, res){
		var sql = "SELECT SUM(total_harga) total FROM transaksi INNER JOIN general ON transaksi.id = general.transaksi WHERE jenis = 0";
		General.query(sql,function(err,respon){
			if(err) console.log('err',err);
			if (respon){
				var resp = JSON.parse(JSON.stringify(respon));
				console.log('resp',resp);
				// res.ok({label:'KMN',value:resp[0].Komunikasi},
				// 	   {label:'DVL',value:resp[1].Development},
				// 	   {label:'SPT',value:resp[2].Support})
//				res.ok(resp)
                res.ok({total:resp[0].total})
			}
		});
	},
    
    jumlahExpenditure : function(req, res){
		var sql = "SELECT count(*) total from general WHERE jenis = 1";
		General.query(sql,function(err,respon){
			if(err) console.log('err',err);
			if (respon){
				var resp = JSON.parse(JSON.stringify(respon));
				console.log('resp',resp);
				res.ok({total:resp[0].total})
			}
		});
	},
    
    jumlahIncome : function(req, res){
		var sql = "SELECT count(*) total from general WHERE jenis = 0";
		General.query(sql,function(err,respon){
			if(err) console.log('err',err);
			if (respon){
				var resp = JSON.parse(JSON.stringify(respon));
				console.log('resp',resp);
				res.ok({total:resp[0].total})
			}
		});
	},
    
    GL : function(req, res){
		var sql = "SELECT * from general";
		General.query(sql,function(err,respon){
			if(err) console.log('err',err);
			if (respon){
				var resp = JSON.parse(JSON.stringify(respon));
				console.log('resp',resp);
				res.ok({GL:resp})
			}
		});
	},
    
    chart : function(req, res){
		var sql = "SELECT * FROM general GROUP BY jenis";
		General.query(sql,function(err,respon){
			if(err) console.log('err',err);
			if (respon){
				var resp = JSON.parse(JSON.stringify(respon));
				console.log('resp',resp);
				// res.ok({label:'KMN',value:resp[0].Komunikasi},
				// 	   {label:'DVL',value:resp[1].Development},
				// 	   {label:'SPT',value:resp[2].Support})
				res.ok(resp)
			}
		});
	},
    
    
    
	
};

