app.controller('headerCtrl', ['$scope', '$state', '$localStorage', '$http', '$timeout',
	function($scope, $state, $localStorage, $http, $timeout){
		$scope.user = $localStorage.user;

		/* 
			get data length total notif diambil aja dr get smua data notif dengan value 1
			trus di angular get datanya trs di .length
		*/

		var vm = this;

		vm.time = new Date();

		$scope.lengthTRX = function(){
			$http.get('http://localhost:1337/transaksi/requested')
			.success(function(data){
				$scope.all = data.length;
				$scope.res = data;
			});	
		};

		$scope.refresh = function(){
	        $timeout(function() {
	          $scope.lengthTRX();
	          $scope.refresh();
	        }, 1000)
	    };

	    $scope.refresh();
		
	    $scope.response = []; 
	    
		// Function to get the data
	    $scope.getData = function(){
	        $http.get('http://localhost:1337/notification/filter')
	            .success(function(data){
	            	$scope.count = data.length;
	            	$scope.response = data;
	            });
	    };

	    $scope.response2 = [];

	    //update notif value untuk trx
	    $scope.save = function(d){
	        $http.put('http://localhost:1337/notification/'+ d.id, {value: 2})
	            .success(function(data){
	                console.log(data.value);
	                $scope.response2 = data;
	                $state.go('app.trx.detail',{id: $scope.response2.transaksi.id});
	                //$state.go('app.barang');
	            })
	    };

	    //update value notif untuk req detail
	    $scope.save2 = function(d){
	        $http.put('http://localhost:1337/notification/'+ d.id, {value: 2})
	            .success(function(data){
	                console.log(data.value);
	                $scope.response2 = data;
	                $state.go('app.product.request_detail',{id: $scope.response2.request.id});
	                // $state.go('app.product.request_detail({id: d.request.id})');
	            })
	    };

	    // Function to replicate setInterval using $timeout service.
	    $scope.intervalFunction = function(){
	        $timeout(function() {
	          $scope.getData();
	          $scope.intervalFunction();
	        }, 1000)
	    };

	    // Kick off the interval
	    $scope.intervalFunction();
}]);