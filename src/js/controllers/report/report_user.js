app.controller('reportUserCtrl', ['$scope', '$http', '$localStorage', '$location',
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

	$scope.datas = [];
	$http.get('http://localhost:1337/pengguna')
		.success(function(data){
			$scope.datas = data; 
		});

	$scope.filter_d = [];
	$http.get('http://localhost:1337/pengguna/development')
		.success(function(data){
			$scope.filter_d = data; 
		});

	$scope.filter_c = [];
	$http.get('http://localhost:1337/pengguna/communication')
		.success(function(data){
			$scope.filter_c = data; 
		});

	$scope.filter_s = [];
	$http.get('http://localhost:1337/pengguna/support')
		.success(function(data){
			$scope.filter_s = data; 
		});

	$scope.filter_i = [];
	$http.get('http://localhost:1337/pengguna/infrastructure')
		.success(function(data){
			$scope.filter_i = data; 
		});

	$scope.dataTableOpt = {
	   //custom datatable options 
	  // or load data through ajax call also
	  "aLengthMenu": [[10, 50, 100,-1], [10, 50, 100,'All']],
	};
}]);