/**
 * Barang.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
//    detail:{
//      model: 'Transaksi_detail'
//    },
    detail: {
      model: 'Transaksi_detail',
      required: false
    },
    nama:"string",
    kode_barang: {
      type : "string",
      unique : true
    },
    tgl_masuk: {
      type : "datetime"
    },
    divisi: {
      type : "string",
      size : 15
    },
    harga_barang: "integer",
    harga_sewa: "integer",
    kondisi: "boolean",
    status: "boolean",
    foto_barang: "string"
  }
};