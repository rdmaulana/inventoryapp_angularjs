app.controller('RequestDetailCtrl', ['swal', '$scope', '$timeout', '$state', '$stateParams','Request', 'Request_detail', 'Sort_detail', '$localStorage', '$location', '$http',
	function(swal, $scope, $timeout, $state, $stateParams, Request, Request_detail, Sort_detail, $localStorage, $location, $http){
		if(!$localStorage.user) {
            $location.path('/access/signin');
            swal(
					'Oops...',
			        "You're not login!",
			        'error'
			);	
        }

        $scope.user = $localStorage.user.id;

		$scope.detail = Request.get({id: $stateParams.id});

		$scope.detail.detail = [];

		$scope.getTotal = function(){
		    var total = 0;
		    for(var i = 0; i < $scope.detail.detail.length; i++){
		        var d = $scope.detail.detail[i];
		        total += (d.harga_barang * d.jumlah);
		    }
		    return total; 
		};
}]);