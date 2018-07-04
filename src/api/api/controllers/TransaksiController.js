/**
 * TransaksiController
 *
 * @description :: Server-side logic for managing transaksis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addUSer: function(req, res){
		var pengguna = {
			kode_pengguna: 'USER-002',
			nama_depan: 'Raden',
			nama_belakang: 'Maulanaz',
			no_hp: '089636490114',
			email: 'maulanaraden@yahoo.com',
			password: '123456',
			foto: 'raden.jpg',
			level: 'user',
			divisi: 'Komunikasi',
			username: 'maulanard',
			alamat: 'Bogor Utara'
		};
		Pengguna.create(pengguna).exec(function(err, result){

		});
	},

	add: function(req, res){
		var detail = {
			kode_barang: 'Y-005',
			tgl_kembali: new Date('2017-02-20'),
			tgl_benar_kembali: new Date('2017-02-20'),
			harga_barang: 25000
		};
		var pengguna = {
			kode_pengguna: 'USER-002',
			nama_depan: 'Raden',
			nama_belakang: 'Maulanaz',
			no_hp: '089636490114',
			email: 'maulanaraden@yahoo.com',
			password: '123456',
			foto: 'raden.jpg',
			level: 'user',
			divisi: 'Komunikasi',
			username: 'maulanard',
			alamat: 'Bogor Utara'
		};
		Transaksi_detail.create(detail).exec(function(err, result){
			Transaksi.create({
				kode_transaksi: 'TRX-007',
				tgl_pinjam: new Date('2017-01-20'),
				tujuan: 'Kebutuhan divisi',
				kategori: 'Internal',
				jenis_kebutuhan: false,
				status: false,
				total_harga: 25000,
				pengguna: result.id,
				detail: result.id
			}).exec(function (e, r){
				Transaksi_detail.update({id: result.id}, {transaksi: r.id}).exec(function(e1, r1){
					return res.json({result: r, error: e});	
				});				
			});
		});
	},
	viewTransaksi: function(req, res){
		Transaksi.find().populate('detail').populate('pengguna').exec(function(e, r){
			// Transaksi_detail.find().populate('barang').exec(function(e, r){
			// 	return res.json({Transaksi_detail: r});
			// });
			return res.json({Transaksi: r});
		});
	},
	view_all: function(req,res){
		var sql = "SELECT * FROM transaksi WHERE id = 5";
		Transaksi.query(sql,function(err,respon){
			if(err) console.log('err',err);
			if (respon){
				var resp = JSON.parse(JSON.stringify(respon));
				console.log('resp',resp);
				res.ok({transaksi:resp})
			}
		});
	},
	//details trx by id
	findTrxbyId: function(req, res){
		var id = req.param('id');
        Transaksi.findOne({ kode_transaksi: id }).populate('detail').populate('pengguna')
            .exec(function(err, user) {
                if (err) {
                    return res.json({
                        error: err
                    });
                }
                if (user === undefined) {
                    return res.notFound();
                } else
                    return res.json({
                        notFound: false,
                        trxData: user
                    });
            });
	},
	pendingLoan: function(req, res){
		var sql = "SELECT * FROM transaksi WHERE status = 0";
		Transaksi.query(sql,function(err,respon){
			if(err) console.log('err',err);
			if(respon){
                var resp = JSON.parse(JSON.stringify(respon));
				console.log('resp',resp);
				res.ok({pendingLoan:resp})
			}
		});
	},
	pendingLoanTotal: function(req, res){
		var sql = "SELECT count(*) total from transaksi WHERE status = 0";
		Transaksi.query(sql,function(err,respon){
			if(err) console.log('err',err);
			if (respon){
				var resp = JSON.parse(JSON.stringify(respon));
				console.log('resp',resp);
				res.ok({total:resp[0].total})
			}
		});
	},
	total : function(req, res){
		var sql = "SELECT count(*) total from transaksi";
		Transaksi.query(sql,function(err,respon){
			if(err) console.log('err',err);
			if (respon){
				var resp = JSON.parse(JSON.stringify(respon));
				console.log('resp',resp);
				res.ok({total:resp[0].total})
			}
		});
	},
	datachart : function(req, res){
		var sql = "SELECT divisi, COUNT(*) jumlah FROM pengguna INNER JOIN transaksi ON pengguna.id = transaksi.pengguna GROUP BY divisi";
		Transaksi.query(sql,function(err,respon){
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
    	desc: function(req, res){
		Transaksi.find().sort('updatedAt DESC')
			.exec(function callBack(err,results){
				if (err) {
					console.log('err',err);
				}
				if (results) {
					var resp = JSON.parse(JSON.stringify(results));
					console.log('resp', resp);
					// res.ok(resp[0].id)
					res.ok({id:resp[0]})
				}
			});
	},

	sorting: function(req, res){
		Transaksi.find().sort('createdAt DESC')
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
    
    //    finance
    totalTransaksi : function(req, res){
		var sql = "SELECT SUM(total_harga) total FROM transaksi WHERE status = 1";
		Transaksi.query(sql,function(err,respon){
			if(err) console.log('err',err);
			if (respon){
				var resp = JSON.parse(JSON.stringify(respon));
				console.log('resp',resp);
                res.ok({total:resp[0].total})
			}
		});
	},
    
    totalTransAcc : function(req, res){
		var sql = "SELECT count(*) total from transaksi WHERE status = 1";
		Transaksi.query(sql,function(err,respon){
			if(err) console.log('err',err);
			if (respon){
				var resp = JSON.parse(JSON.stringify(respon));
				console.log('resp',resp);
				res.ok({total:resp[0].total})
			}
		});
	},
};

