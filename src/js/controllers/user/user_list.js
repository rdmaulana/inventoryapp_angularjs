app.controller('userListCtrl', ['$scope', '$http', '$localStorage', '$location',
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

	$scope.list = [];
	$http.get('http://localhost:1337/pengguna')
		.success(function(data){
			$scope.list = data;
		});

	$scope.TableOpt = {
	   //custom datatable options 
	  // or load data through ajax call also
	  "aLengthMenu": [[10, 50, 100,-1], [10, 50, 100,'All']],
	};
}]);