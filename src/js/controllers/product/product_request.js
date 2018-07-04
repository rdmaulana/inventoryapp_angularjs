app.controller('productRequestCtrl', ['swal', '$scope', '$timeout', '$state', 'Request', 'Request_detail', 'Sort_detail', '$localStorage', '$location', '$http',
	function(swal, $scope, $timeout, $state, Request, Request_detail, Sort_detail, $localStorage, $location, $http){
		if(!$localStorage.user) {
            $location.path('/access/signin');
            swal(
					'Oops...',
			        "You're not login!",
			        'error'
			);	
        }

        $scope.user = $localStorage.user.id;

        function generate(){
        	var d = new Date().getTime();
	        if (window.performance && typeof window.performance.now === "function") {
	            d += performance.now();
	        }
	        var uuid = 'REQ-xxxx'.replace(/[xy]/g, function(c) {
	            var r = (d + Math.random() * 16) % 16 | 0;
	            d = Math.floor(d / 16);
	            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	        });
	        return uuid;
        };

        generate();

		$scope.request = new Request();
		$scope.request.pengguna = $scope.user;
		$scope.request.kode_request = generate();
		$scope.tgl_request = new Date();

		$scope.createRequest = function(){
			$scope.request.pengguna = $scope.user;
			
			$scope.request.$save(function(){
				$http.get('http://localhost:1337/request/sorting')
	            .success(function(data){
	                var url2 = 'http://localhost:1337/notification'
	                var data_notif = {request: data.id, value: 0, transaksi:0};

	                $http.post(url2, data_notif).then(function(){
	                    console.log('Success');
	                });
	                //vm.notif.id = data.id;
	                console.log(data.id);
	            });
			})
		}

		 

		$scope.name = /^[a-zA-Z0-9 ]{1,50}$/;
	    $scope.value = /^[0-9]{1,50}$/;

	    /* ================================== STEP 2 ====================================== */

		$scope.datanya = []; // nampung last req
		$scope.hasil = []; //nampung id last req
		$scope.detail_now = []; //nampung data detail terakhir

		//function get data request terakhir (ambil id, dikirim di form detail_request)
		$scope.getLastReq = function(){
			$http.get('http://localhost:1337/request/desc')
			.success(function(data){
				$scope.datanya = data;
			});	
		};


		$scope.getID_Req = function(){
			$http.get('http://localhost:1337/request_detail/last_req')
				.success(function(res){
					$scope.hasil = res;

					var id = $scope.hasil.isi.id;

					$http.get('http://localhost:1337/request_detail/sort/'+ id)
		    		.then(function(data){
		    			$scope.detail_now = data;
		    		})
				});
		};

		// var link = $scope.datanya.isi.id;

		// $scope.getReq_detail = function(){
	 //    	$http.get('http://localhost:1337/request_detail/sort/')
	 //    		.then(function(data){
	 //    			$scope.detail_now = data;
	 //    			console.log('yeuh',data);
	 //    		})
	 //    };

		$scope.refresh = function(){
	        $timeout(function() {
	          $scope.getLastReq();
	          $scope.getID_Req();
	          $scope.refresh();
	        }, 1000)
	    };

	    $scope.refresh();

	    $scope.rowProduct = [];
/*
	    $scope.detail_req = new Request_detail();

	    $scope.addDetails = function(detail){
	    	var aideh = $scope.datanya.isi.id;

	    	$scope.detail_req.request = aideh;
	    	$scope.detail_req.status = false;
	    	$scope.detail_req.nama_barang = detail.nama_barang;
	    	$scope.detail_req.jumlah = detail.jumlah;
	    	$scope.detail_req.harga_barang = detail.harga_barang;

	    	$scope.detail_req.$save(function(){
	    		console.log('suck ess');
	    	});

	    	$scope.rowProduct.push({
		          'nama_barang': detail.nama_barang,
		          'jumlah': detail.jumlah,
		          'harga_barang': detail.harga_barang
		    });
	    };

	    $scope.fetchProducts = function(){
	    	$timeout(function() {
	    		$http.get('http://localhost:1337/request_detail/last_req')
				.success(function(res){
					$scope.hasil = res;
					var aideh = $scope.hasil.isi.id;

					$scope.rowProduct = Sort_detail.query({id: aideh});
				});
	    	},1000);

   		//  $scope.rowProduct = Sort_detail.query({id: aideh});
        };

        $scope.fetchProducts();

        $scope.hapus = function(detail){
        	detail.$delete(function(){
        		$scope.fetchProducts();
        	});
        };
*/

		$scope.reset = function() {
	        $scope.detail = {};
	        $scope.step2.$setPristine();
	    };

	    $scope.addDetail = function(detail){
	    	var aideh = $scope.datanya.isi.id;
	    	var params = {  
		    				request: aideh,
		    				nama_barang: detail.nama_barang,
		    				jumlah: detail.jumlah,
		    				harga_barang: detail.harga_barang,
		    				status: false
		    			};
		    $http.post('http://localhost:1337/request_detail', params)
		    	.then(function(data){

		    		console.log('Success',data);
		    });

		    $scope.rowProduct.push({
		      'id': detail.id,
	          'nama_barang': detail.nama_barang,
	          'jumlah': detail.jumlah,
	          'harga_barang': detail.harga_barang
	        });
	    };

	    $scope.getTotal = function(){
		    var total = 0;
		    for(var i = 0; i < $scope.rowProduct.length; i++){
		        var detail = $scope.rowProduct[i];
		        total += (detail.harga_barang * detail.jumlah);
		    }
		    return total; 
		};

	 //    //remove to the real data holder
		// $scope.removeItem = function(detail) {
		//     $scope.index = $scope.rowProduct.indexOf(detail);
		//     $scope.rowProduct.splice($scope.index, 1);
		// };

}]);