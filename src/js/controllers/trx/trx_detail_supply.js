app.controller('trxDetailSupplyCtrl', ['$scope', '$rootScope', '$modal', '$state', '$stateParams', '$http', 'TransactionList', 'Transaction', '$localStorage', '$location',
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

		$scope.openModal = function(modal_id, modal_size, modal_backdrop)
		{
			$rootScope.currentModal = $modal.open({
				templateUrl: modal_id,
				size: modal_size,
				backdrop: typeof modal_backdrop == 'undefined' ? true : modal_backdrop
			});
		};
}]);