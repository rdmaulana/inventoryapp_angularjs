/**
 * BarangController
 *
 * @description :: Server-side logic for managing barangs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	allproducts : function(req, res){
		var sql = "SELECT count(*) value from barang";
		Barang.query(sql,function(err,respon){
			if(err) console.log('err',err);
			if (respon){
				var resp = JSON.parse(JSON.stringify(respon));
				console.log('resp',resp);
				res.ok({label:'All Products',value:resp[0].value})
			}
		});
	},

	available : function(req, res){
		var sql = "SELECT count(*) value from barang WHERE kondisi = 1";
		Barang.query(sql,function(err,respon){
			if(err) console.log('err',err);
			if (respon){
				var resp = JSON.parse(JSON.stringify(respon));
				console.log('resp',resp);
				res.ok({label:'Available',jumlah:'nol',value:resp[0].value})
			}
		});
	},

	// count: function(req, res){
	// 	Barang.count({divisi:'Infrastruktur'}).exec(function countCB(err, found){
	// 	  //console.log('There are '+found+' users called "Charger".');
	// 	  if(err) console.log('err',err);
	// 		if (found){
	// 			var value = [];
	// 			var resp = JSON.parse(JSON.stringify(found));
	// 			console.log('found',found);
	// 			res.ok({label:'Infrastruktur',value:found[0].value})
	// 		}
	// 	});
	// },

	onLoan : function(req, res){
		var sql = "SELECT count(*) value from transaksi WHERE kategori = 'Pinjam'";
		Barang.query(sql,function(err,respon){
			if(err) console.log('err',err);
			if (respon){
				var resp = JSON.parse(JSON.stringify(respon));
				console.log('resp',resp);
				res.ok({label:'Loan',value:resp[0].value})
			}
		});
	},

	pendingTrx : function(req, res){
		var sql = "SELECT count(*) value from transaksi WHERE status = 0";
		Barang.query(sql,function(err,respon){
			if(err) console.log('err',err);
			if (respon){
				var resp = JSON.parse(JSON.stringify(respon));
				console.log('resp',resp);
				res.ok({label:'Pending Tr',value:resp[0].value})
			}
		});
	},

	product_divisi: function(req, res){
		var sql = "SELECT divisi, COUNT(*) AS jumlah FROM barang GROUP BY divisi";
		Barang.query(sql,function(err,respon){
			if(err) console.log('err',err);
			if (respon){
				var resp = JSON.parse(JSON.stringify(respon));
				console.log('resp',resp);
				res.ok(resp)
			}
		});
	},

	upload: function  (req, res) {
	  if(req.method === 'GET')
	   return res.json({'status':'GET not allowed'});      
	  
	  sails.log.debug('We have entered the uploading process ');

	  var uploadFile = req.file('userPhoto')._files[0].stream.filename;
	  var filename = uploadFile;
	  
	  req.file('userPhoto').upload(
	  	filename,function(err,files){
			   //sails.log.debug('file is :: ', +files);
			   maxBytes: 10000000;
			   if (err) return res.serverError(err);        
			   console.log(files);
			   res.json({status:200,file:files});
		});
	},

	uplod: function  (req, res) {
	  if(req.method === 'GET')
	   return res.json({'status':'GET not allowed'});      
	  
	  sails.log.debug('We have entered the uploading process ');

	  var myForm = req.file('userPhoto')._files[0].stream.filename;
	  var filename = myForm;
	  
	  req.file('userPhoto').upload(
	  	filename,function(err,files){
			   //sails.log.debug('file is :: ', +files);
			   maxBytes: 10000000;
			   if (err) return res.serverError(err);        
			   console.log(files);
			   res.json({status:200,file:files});
		});
	},

	uploads: function  (req, res) {
	  if(req.method === 'GET')
	   return res.json({'status':'GET not allowed'});      
	  
	  sails.log.debug('We have entered the uploading process ');

	  var filename = req.file('userPhoto')._files[0].stream.filename;
	  var direktori = {dirname: '../../assets/images/'};
	  
	  req.file('userPhoto')
	  	.upload(filename,direktori,function(err,files){
			   //sails.log.debug('file is :: ', +files);
			   maxBytes: 10000000;
			   if (err) return res.serverError(err);        
			   console.log(files);
			   res.json({status:200,file:files});
		});
	},

	uploadz: function(req, res) {
	    if (req.method === 'GET')
	        return res.json({ 'status': 'GET not allowed' });
	    //	Call to /upload via GET is error

	    var uploadFile = req.file('uploadFile');
	    console.log(uploadFile);

	    uploadFile.upload(function onUploadComplete(err, files) {
	        //	Files will be uploaded to .tmp/uploads

	        if (err) return res.serverError(err);
	        //	IF ERROR Return and send 500 error with error

	        console.log(files);
	        res.json({ status: 200, file: files });
	    });
	}
};

