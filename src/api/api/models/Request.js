/**
 * Request.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	tujuan: {
  		type: 'string'
  	},
  	namaBarang: {
  		type: 'string'
  	},
  	jumlah: {
  		type: 'integer'
  	},
  	status: {
  		type: 'boolean'
  	},
    kisaran_harga: {
      type: 'integer'
    },
  	pengguna: {
  		model: 'Pengguna'
  	},
    notification: {
      collection: 'Notification',
      via: 'request'
    }
  }
};

