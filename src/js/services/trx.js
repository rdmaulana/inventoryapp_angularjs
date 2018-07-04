app.factory('Transaction', ['$resource', function($resource){
	return $resource('http://localhost:1337/transaksi_detail/findDetail/:id',{id:'@id'},{
        update: {
            method: 'PUT'
        }
    });
}]);

app.factory('TransactionList', ['$resource', function($resource){
	return $resource('http://localhost:1337/transaksi/view/:id',{id:'@id'},{
        update: {
            method: 'PUT'
        }
    });
}]);

app.factory('TransactionDetail', ['$resource', function($resource){
    return $resource('http://localhost:1337/transaksi_detail/:id',{id:'@id'},{
        update: {
            method: 'PUT'
        }
    });
}]);

app.factory('TransactionEdit', ['$resource', function($resource){
    return $resource('http://localhost:1337/transaksi/:id',{id:'@id'},{
        update: {
            method: 'PUT'
        }
    });
}]);
