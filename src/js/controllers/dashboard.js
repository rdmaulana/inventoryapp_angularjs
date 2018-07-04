'use strict';

app.controller('dashboardCtrl', ['$scope', 'swal', '$http', '$timeout', '$location', '$localStorage', 
	function($scope, swal, $http, $timeout, $location, $localStorage){
		if(!$localStorage.user) {
				$location.path('/access/signin');
				swal(
					'Oops...',
			        "You're not login!",
			        'error'
				);	
			}
		console.log('user',$localStorage.user);

		$http.get('http://localhost:1337/transaksi/chart') //reading the studentRecord.json file
		  .success(function(data1) {
		    $scope.dataSource = data1; // binding the data to the $scope variable
		    
		    FusionCharts.ready(function() {
		      //alert("1");
		      var conversionChart = new FusionCharts({
		        type: 'column2d',
		        renderAt: 'chart-container',
		        width: "600",
		        height: 246,
		        dataFormat: 'json',
		        dataSource: {
		                      "chart": {
		                                  "caption": "Loan statistics of 2017",
		                  				  "subcaption": "Statistics loan of this year",
		                  				  "xAxisName": "Month",
                						  "yAxisName": "Value of loan",
		                  				  "plotTooltext": $scope.dataSource.label,
		                  				  "theme": "fint",
							              "baseFontSize":"12",
		                              },
		                      "data": $scope.dataSource
		                    }
		      });
		      conversionChart.render();
		    });
		  });

		// total stok barang
		$scope.total_0 = [];
		$http.get('http://localhost:1337/barang/stok')
			.success(function(data){
				$scope.total_0 = data;
			})

		// total product
		$scope.total_1 = [];
		$http.get('http://localhost:1337/barang/allproducts')
			.success(function(data){
				$scope.total_1 = data;
			})
		
		// total pending trx		
		$scope.total_2 = [];
		$http.get('http://localhost:1337/transaksi/pendingLoanTotal')
			.success(function(data){
				$scope.total_2 = data;
			})

		// total user
		$scope.total_3 = [];
		$http.get('http://localhost:1337/pengguna/total')
			.success(function(data){
				$scope.total_3 = data;
			})

		// total trx
		$scope.total_4 = [];
		$http.get('http://localhost:1337/transaksi/total')
			.success(function(data){
				$scope.total_4 = data;
			})

		// length pending trx
		$scope.length_1 = [];
		$http.get('http://localhost:1337/transaksi/request_length')
			.success(function(data){
				$scope.length_1 = data;
			})
		
		//table status = request
		$scope.data_status = [];
		$scope.max = 5;
		$http.get('http://localhost:1337/transaksi/request')
			.success(function(data){
				$scope.data_status = data;
			})

		//table request
		$scope.data_request = [];
		$http.get('http://localhost:1337/request')
			.success(function(data){
				$scope.data_request = data;
			})

		$scope.d0_1 = [ [0,7],[1,6.5],[2,12.5],[3,7],[4,9],[5,6],[6,11],[7,6.5],[8,8],[9,7] ];

	    $scope.d0_2 = [ [0,4],[1,4.5],[2,7],[3,4.5],[4,3],[5,3.5],[6,6],[7,3],[8,4],[9,3] ];
}]);