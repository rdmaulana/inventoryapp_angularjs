/**
 * Transaksi_detailController
 *
 * @description :: Server-side logic for managing transaksi_details
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// findTrxDetail: function(req, res){
	// 	var id = req.param('id');
 //        Transaksi_detail.findOne({ id: id }).populate('transaksi').populate('barang')
 //            .exec(function(err, response) {
 //                if (err) {
 //                    return res.json({
 //                        error: err
 //                    });
 //                }
 //                if (response === undefined) {
 //                    return res.notFound();
 //                } else
 //                    return res.json({
 //                        notFound: false,
 //                        trxDetail: response
 //                    });
 //            });
	// },

    findDetail: function(req,res){
        var id = req.param('id');
        Transaksi_detail.find({transaksi: id}).populate('idbarang') 
            .exec(function(err,response){
                Transaksi_detail.findOne({transaksi: id}).populate('transaksi') 
                    .exec(function(e, r){
                        if (e) {
                            console.log('err',err);
                        }
                        if (r) {
                            var resp = JSON.parse(JSON.stringify(r));
                            var resp2 = JSON.parse(JSON.stringify(response));
                            console.log('resp', resp);
                            
                            res.ok({trx: resp.transaksi, trxDetail: resp2})
                        }
                    })
            });
    },

    findTrxDetail: function(req, res){
        var sql = "SELECT * FROM transaksi_detail"
        if(req.param('transaksi')){ 
            sql += " WHERE transaksi = '"+ req.param('transaksi')+"'";
        }
        Transaksi_detail.query(sql,function(err,respon){
            if(err) console.log('err',err);
            if (respon){
                var resp = JSON.parse(JSON.stringify(respon));
                console.log('resp',resp);
                res.ok(resp)
            }
        });
    },

    findByTrx: function(req,res){
        Transaksi_detail.find().sort('transaksi')
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
    }
};

