app.controller('FilterReqCtrl', ['$scope', '$http', '$localStorage', '$location',
	function ($scope, $http, $localStorage, $location) {
		if(!$localStorage.user) {
				$location.path('/access/signin');
				swal(
					'Oops...',
			        "You're not login!",
			        'error'
				);	
			}
		console.log('user',$localStorage.user);

		$scope.filter_data = [];
		$http.get('http://localhost:1337/transaksi/request')
			.success(function(data){
				$scope.filter_data = data;
			});
	}
]);