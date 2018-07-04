app.factory('User', ['$resource', function($resource, $scope){
	return $resource('http://localhost:1337/pengguna/:id',{id:'@id'},{
        update: {
            method: 'PUT'
        }
    });
}]);
