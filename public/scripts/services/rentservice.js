'use strict';

angular.module('rentApp')
  .service('RentService', function (FBURL, $firebase) {
  	var rootRef = new Firebase(FBURL),
  		rentRef = rootRef.child("rents");
    return {
    	create:function(rent){
    		var rentObj = {
    			name:rent.name,
    			location:rent.location,
    			cost:rent.cost,
    			full_address:rent.full_address,
    			type:rent.type,
    			condition:rent.condition,
    			timestamp: Firebase.ServerValue.TIMESTAMP,
    			// pictureUrl: rent.pictureUrl
    		};
    	return $firebase(rentRef).$push(rentObj); 
    	}
    };
  });
