/**
 * General.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      jenis:"boolean",
      kode_general:{
          type:'string',
          unique:true
      },
      keterangan:"string",
      tanggal:{
          type:'datetime'
      },
      detail_barang:"string",
//      total_harga:{
//            type: 'integer'
//        },
      debit_masuk:"integer",
      //1 to many
      transaksi:{
          model: 'Transaksi',
            required: false
      },
      //1 to 1
      pengguna:{
          model: 'Pengguna',
          required: false
      },
      
      vendor:{
          model: 'Vendor',
          required: false
      },

  }
};

