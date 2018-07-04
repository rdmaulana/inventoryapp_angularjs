app.controller('trxSupplyCtrl', ['$scope', '$http' , '$localStorage', '$location',
	function($scope, $http, $localStorage, $location) {
		if(!$localStorage.user) {
				$location.path('/access/signin');
				swal(
					'Oops...',
			        "You're not login!",
			        'error'
				);	
			}
		console.log('user',$localStorage.user);

		$scope.list = [];

		$http.get('http://localhost:1337/transaksi/out')
			.then(function(data){
				$scope.list = data;
				console.log('here datas',data);
			});

		$scope.TrxOpt = {
		   //custom datatable options 
		  // or load data through ajax call also
		  "aLengthMenu": [[10, 50, 100,-1], [10, 50, 100,'All']],
		};
	}]);