/**
 * Transaksi.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
        // detail: {
        //     model: 'Transaksi_detail',
        //     required: false
        // },
        detail: {
          collection: 'Transaksi_detail',
          via: 'transaksi'
        },
        pengguna: {
            model: 'Pengguna'
        },
        kode_transaksi: 
            {
            type: 'string',
            unique: true
            },
        tgl_pinjam: "date",
        tujuan:{
            type: 'string'
        },
        jenis_kebutuhan:{
            type: "boolean"
        },
        status: {
            type: "boolean",
            defaultsTo: false
        },
        total_harga:{
            type: 'integer'
        },
        notification: {
          collection: 'Notification',
          via: 'transaksi'
        }
//        tagihan:{
//            model: 'Tagihan',
//            required: false
//        },
//        general:{
//            model: 'General',
//                required: false
//        }
    }
};

