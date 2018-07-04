app.controller('trxListCtrl', ['$scope', '$http', '$localStorage', '$location',
	function($scope, $http, $localStorage, $location){

	if(!$localStorage.user) {
				$location.path('/access/signin');
				swal(
					'Oops...',
			        "You're not login!",
			        'error'
				);	
			}
		console.log('user',$localStorage.user);

	$scope.trxList = [];
	$http.get('http://localhost:1337/transaksi/inventory')
		.success(function(data){
			$scope.trxList = data;
		});

	$scope.trxSupply = [];
	$http.get('http://localhost:1337/transaksi/out')
		.success(function(data){
			$scope.trxSupply = data;
		});

	$scope.TrxOpt = {
	   //custom datatable options 
	  // or load data through ajax call also
	  "aLengthMenu": [[10, 50, 100,-1], [10, 50, 100,'All']],
	};
}]);