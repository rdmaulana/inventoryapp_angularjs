/**
 * Pengguna.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    kode_pengguna:{
      type:'string',
      unique:true
    },
    nama_depan:"string",
    nama_belakang:"string",
    no_hp:"string",
    email:{
      type:'email',
      unique:true
    },
    password:"string",
    foto:"string",
    level:"string",
    divisi:{
      type:'string'
    },
    username: "string",
    alamat: "string",
    transaksi: {
      collection: 'Transaksi',
      via: 'pengguna'
    },
    request: {
      collection: 'Request',
      via: 'pengguna'
    },
      //one to many
    general:{
        collection: 'General',
        via: 'pengguna'
        },
    tagihan:{
      collection: 'Tagihan',
      via: 'pengguna'
    }
    
  }
};

