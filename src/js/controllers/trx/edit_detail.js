app.controller('editDetailCtrl', ['$scope', '$state', '$stateParams', 'Transaction', 'TransactionEdit', 'TransactionDetail', 'Product', '$localStorage', '$location',
	function($scope, $state, $stateParams, Transaction, TransactionEdit, TransactionDetail, Product, $localStorage, $location){
		
		/*
		edit status transaksi (accept) 
			|--> stok berkurang (optional) 

		edit status transaksi (sudah dikembalikan)	
			|--> input tgl_benar_kembali (per barang)
				|--> update stok awal (table barang)
		*/
		
		// $http.put('/transaksi/'+ trx.id, {status: trx.status}) //update status (return)
		// 	.then(function(){
		// 		$scope.stock =
		// 		$http.put('/barang'+ trx.id, {stok:})
		// 	})

		if(!$localStorage.user) {
				$location.path('/access/signin');
				swal(
					'Oops...',
			        "You're not login!",
			        'error'
				);	
			}
		console.log('user',$localStorage.user);

		$scope.trxResult=Transaction.get({id:$stateParams.id});

		// $scope.go = function(){
		// 	steps.step2=true;
		// 	$state.go('app.trx.edit_date({id: $scope.edit_trx.id})');
		// };

		$scope.loadForm_trx=function(){
	        $scope.edit_trx=TransactionEdit.get({id:$stateParams.id});
	    };

	    // $scope.loadForm_detail=function(){
	    //     $scope.edit_detail=TransactionDetail.get({id:$stateParams.id});
	    // };

	    // $scope.loadForm_product = function(){
	    // 	$scope.edit_product=Product.get({id:$stateParams.id});
	    // }

	    $scope.loadForm_trx();
	    // $scope.loadForm_detail();
	    // $scope.loadForm_product();

		$scope.updateStatus=function(){
        	$scope.edit_trx.$update(function(){
            	// $state.go('app.trx.list');
            	console.log('Sukses');
            	$state.go('app.trx.edit_date',{id: $scope.trxResult.trx.id});
	        });
	    };

	    /*STEP 2 LONCAT EDIT TRANSAKSI DETAIL + STOK BARANG
	    	DARI STEP 1 UI-SREF KE ROUTING BARU (DETAIL / BARANG)
	    		STEP 3 FINISH KE TRX DETAIL (KALO BISA)*/
}]);