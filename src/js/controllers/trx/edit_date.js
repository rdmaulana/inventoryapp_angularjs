app.controller('editDateCtrl', ['$scope','$rootScope', '$modal', '$state', '$stateParams', 'Transaction', 'TransactionEdit', 'TransactionDetail', 'Product', '$http', 'toaster', '$localStorage', '$location',
	function($scope, $rootScope, $modal, $state, $stateParams, Transaction, TransactionEdit, TransactionDetail, Product, $http, toaster, $localStorage, $location){
		
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
		$scope.trxResult.trxDetail = [];

		$scope.getTotal = function(){
		    var total = 0;
		    for(var i = 0; i < $scope.trxResult.trxDetail.length; i++){
		        var b = $scope.trxResult.trxDetail[i];
		        total += (b.idbarang.harga_sewa * b.qty);
		    }
		    return total; 
		};

	    $scope.loadForm_detail=function(){
	        $scope.edit_detail=TransactionDetail.query();
	    };

	    $scope.loadForm_product = function(){
	    	$scope.edit_product= Product.query();
	    };

	    $scope.loadForm_detail();
	    $scope.loadForm_product();

	    $scope.editDialog = function(detail){
			var modalInstance = $modal.open({
		        templateUrl: 'tpl/trx/modal-edit-date.html',
		        controller: $scope.model,
		        resolve: {
			        oldDetail: function () {
			          return detail;
			        }
		        }
		    });
		}

		$scope.model = function($scope, $modalInstance, oldDetail, Product, TransactionDetail){
		 	$scope.detail = oldDetail;

		 	// $scope.updateDtl = function(){
		 	// 	var qty = $scope.detail.qty;
			 //   	var stok = $scope.detail.idbarang.stok;
			 //   	$scope.result = qty + stok;

		  //   	var params = {
		  //   					tgl_benar_kembali: $scope.detail.tgl_benar_kembali,
		  //   					transaksi: $stateParams.id,
		  //   					idbarang: {
		  //   						stok: $scope.result,
			 //    					nama: $scope.detail.idbarang.nama,
			 //    					kategori: $scope.detail.idbarang.kategori,
			 //    					tgl_masuk: $scope.detail.idbarang.tgl_masuk,
			 //    					harga_barang: $scope.detail.idbarang.harga_barang,
			 //    					harga_sewa: $scope.detail.idbarang.harga_sewa,
			 //    					divisi: $scope.detail.idbarang.divisi,
			 //    					kode_barang:
		  //   					}
		  //   				 };
		  //   	$http.put('http://localhost:1337/transaksi_detail/'+$scope.detail.id, params)
		  //   		.then(function(data){
		  //   			$modalInstance.close();
		  //   			$scope.toaster = {
				// 	        type: 'success',
				// 	        title: 'Success',
				// 	        text: 'Update return date success'
				// 	    };
				// 	    $scope.pop = function(){
				// 	        toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
				// 	    }; 

				// 	    $scope.pop();
		  //   		})
		  //   }

			$scope.updateDetail = function(){
			   var qty = $scope.detail.qty;
			   var stok = $scope.detail.idbarang.stok;
			   $scope.result = qty + stok;

		       $scope.detail.idbarang.stok = $scope.result;
		       $scope.detail.transaksi = $stateParams.id;

		       $modalInstance.close();
		       $scope.toaster = {
					type: 'success',
					title: 'Success',
					text: 'Update return date success'
			   };
			   $scope.pop = function(){
					toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
			   }; 

			   $scope.pop();

		       TransactionDetail.update(oldDetail, function(res){
		       	// console.log('sukses update date');
		       	// $modalInstance.close(res);	
		      });
		    };

		    $scope.cancel = function () {
		      $modalInstance.dismiss('cancel');
		    };	
		}

	    /*STEP 2 LONCAT EDIT TRANSAKSI DETAIL + STOK BARANG
	    	DARI STEP 1 UI-SREF KE ROUTING BARU (DETAIL / BARANG)
	    		STEP 3 FINISH KE TRX DETAIL (KALO BISA)*/
}]);