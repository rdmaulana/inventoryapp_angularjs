app.controller('isengCtrl', ['$scope', '$rootScope', '$modal', '$state', '$stateParams', '$http', 'TransactionList', 'Transaction',
	function($scope, $rootScope, $modal, $state, $stateParams, $http, TransactionList, Transaction){
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

		$scope.getTotal = function(){
		    var total = 0;
		    
		    for(var i = 0; i < $scope.trxResult.trxDetail.length; i++){
		        var b = $scope.trxResult.trxDetail[i];
		        var daysDiff = $scope.dayDiff(b.tgl_kembali, b.tgl_benar_kembali);
		        total += (b.idbarang.harga_sewa * b.qty * daysDiff);
		    }
		    return total; 
		};

		

}]);