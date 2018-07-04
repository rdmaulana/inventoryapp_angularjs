app.factory('Product', ['$resource', function($resource){
	return $resource(
    		'http://localhost:1337/barang/:id', 
    		{id: '@id'},
    		{
    			update: {
    				  // To send the HTTP Put request when calling this custom update method.
    			      method: 'PUT' 
    				  
    			}
    			
    		}
    );
}]);

app.service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});

app.factory('Request', ['$resource', function($resource){
    return $resource(
            'http://localhost:1337/request/:id', 
            {id: '@id'},
            {
                update: {
                      // To send the HTTP Put request when calling this custom update method.
                      method: 'PUT' 
                      
                }
                
            }
    );
}]);

app.factory('Request_detail', ['$resource', function($resource){
    return $resource(
            'http://localhost:1337/request_detail/:id', 
            {id: '@id'},
            {
                update: {
                      // To send the HTTP Put request when calling this custom update method.
                      method: 'PUT' 
                      
                }
                
            }
    );
}]);

app.factory('Sort_detail', ['$resource', function($resource){
    return $resource(
            'http://localhost:1337/request_detail/sort/:id', 
            {id: '@id'},
            {
                update: {
                      // To send the HTTP Put request when calling this custom update method.
                      method: 'PUT' 
                      
                }
                
            }
    );
}]);