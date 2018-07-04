app.controller('ngetestCtrl', ['$scope', '$http', 'Transaction',
	function($scope, $http, Transaction){
		$scope.datanya = [];

		$http.get('http://localhost:1337/transaksi_detail/findDetail/6')
			.then(function(data){
				console.log(data);
				$scope.datanya = data;
			});

		$scope.trxResult=Transaction.get({id:6});
	}]);