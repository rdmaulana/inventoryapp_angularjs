app.controller('trxDetailCtrl', ['$scope', '$rootScope', '$modal', '$state', '$stateParams', '$http', 'TransactionList', 'Transaction', '$localStorage', '$location',
	function($scope, $rootScope, $modal, $state, $stateParams, $http, TransactionList, Transaction, $localStorage, $location){

		if(!$localStorage.user) {
				$location.path('/access/signin');
				swal(
					'Oops...',
			        "You're not login!",
			        'error'
				);	
			}
		console.log('user',$localStorage.user);

		//get info detail trx
		$scope.trxResult=Transaction.get({id:$stateParams.id});
		$scope.trxResult.trxDetail = [];
		
		$scope.user = [];

		//get info user
		$scope.trxData=TransactionList.get({id:$stateParams.id});

		$scope.formatString = function(format) {
		    var pieces = format.split('-'), 
		        year   = parseInt(pieces[0]), 
		        month  = parseInt(pieces[1]), 
		        day    = parseInt(pieces[2]),
		        date   = new Date(year, month - 1, day);
		    
		    return date; 
		  }

		  $scope.dayDiff = function(fromdate,todate){
		      var date2 = new Date($scope.formatString(fromdate));
		      var date1 = new Date($scope.formatString(todate));
		      var timeDiff = Math.abs(date2.getTime() - date1.getTime());   
		      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
		      return diffDays;
		  }

		  $scope.fromDate = $scope.trxResult.trxDetail.tgl_kembali;
		  $scope.toDate = $scope.trxResult.trxDetail.tgl_benar_kembali;

		  $scope.dayBorrow = function(borrowdate,returndate){
		      var date2 = new Date($scope.formatString(borrowdate));
		      var date1 = new Date($scope.formatString(returndate));
		      var timeDiff = Math.abs(date2.getTime() - date1.getTime());   
		      var diffDay = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
		      return diffDay;
		  }
		  
		  // $scope.borrowDate = $scope.trxResult.trx.tgl_pinjam;
		  // $scope.returnDate = $scope.trxResult.trxDetail.tgl_benar_kembali;

		$scope.getTotal = function(){
		    var total = 0;
		    
		    for(var i = 0; i < $scope.trxResult.trxDetail.length; i++){
		        var b = $scope.trxResult.trxDetail[i];
		        var daysDiff = $scope.dayDiff(b.tgl_kembali, b.tgl_benar_kembali);
		        var borrowDiff = $scope.dayBorrow(b.transaksi.tgl_pinjam, b.tgl_kembali);
		        total += ( borrowDiff * b.idbarang.harga_sewa * b.qty + (daysDiff * 10000));
		    }
		    return total;  
		};

		$scope.getTotal_awal = function(){
		    var total = 0;
		    
		    for(var i = 0; i < $scope.trxResult.trxDetail.length; i++){
		        var c = $scope.trxResult.trxDetail[i];
		        var borrowDiff = $scope.dayBorrow(c.transaksi.tgl_pinjam, c.tgl_kembali);
		        total += ( borrowDiff * c.idbarang.harga_sewa * c.qty);
		    }
		    return total;  
		};
}]);