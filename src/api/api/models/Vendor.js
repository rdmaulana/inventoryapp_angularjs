/**
 * Vendor.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      kode_vendor:{
          type:'string',
          unique:true
      },
      nama:"string",
      telepon:"string",
      alamat:"string"
//      general:{
//        collection: 'General',
//      via: 'vendor'
//    }
  }
};

