/**
 * Transaksi_detail.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    transaksi: { 
      model: 'Transaksi'
    },
//    barang: { //1 detail banyak barang
//      collection: 'Barang',
//      via: 'detail'
//    },
    idbarang: {
      model: 'Barang',
      required: false
    },
    tgl_kembali: "date",
    tgl_benar_kembali: "date"
  }
};

