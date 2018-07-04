/**
 * Tagihan.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      kode_tagihan:{
          type:'string',
          unique:true
      },
      tanggal:{
          type:'datetime'
      },
      //total_harga:"integer",
      //one to many
      pengguna:{
          model: 'Pengguna'
      },
      
      //one to one
      transaksi:{
          model: 'Transaksi',
            required: false
      }

  }
};
