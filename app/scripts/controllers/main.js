'use strict';

/**
 * @ngdoc function
 * @name rentApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rentApp
 */
angular.module('rentApp')
  .controller('MainCtrl', function ($scope, $upload, RentService) {
    //create rent
    $scope.createRent = function(rent){
    	RentService.create(rent).then(function(rent){
    		if(rent){
    			toastr.info("Succefully Saved")
    		}
    	})
    }

    $scope.onFileSelect = function(){
    	var file = $scope.myFiles[0],
			filename = file.name
    	$upload.upload({
	        url: 'https://studentrent-bucket.s3-us-west-2.amazonaws.com/',
	        method: 'POST',
	        data : {
	          key: filename,
	          AWSAccessKeyId: 'AKIAISEQHWBOLTLYDFYQ', 
	          acl: 'private',
	          policy: 'ewogICJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwKICAiY29uZGl0aW9ucyI6IFsKICAgIHsiYnVja2V0IjogInN0dWRlbnRyZW50LWJ1Y2tldCJ9LAogICAgWyJzdGFydHMtd2l0aCIsICIka2V5IiwgIiJdLAogICAgeyJhY2wiOiAicHJpdmF0ZSJ9LAogICAgWyJzdGFydHMtd2l0aCIsICIkQ29udGVudC1UeXBlIiwgIiJdLAogICAgWyJzdGFydHMtd2l0aCIsICIkZmlsZW5hbWUiLCAiIl0sCiAgICBbImNvbnRlbnQtbGVuZ3RoLXJhbmdlIiwgMCwgNTI0Mjg4MDAwXQogIF0KfQ==',
	          signature: 'g/OPVsj8f1k5XsFEZ8BkSZDDRIc=',
	          "Content-Type" : file.type === null || file.type === '' ? 'application/octet-stream' : file.type,
	          filename: filename
	        },
	        file: file
    	}).success(function() {
 			toastr.info("Uploaded Succefully")
		}).error(function(){
			toastr.info("Failed to uploaded to S3")
		})
  	}

  });
							