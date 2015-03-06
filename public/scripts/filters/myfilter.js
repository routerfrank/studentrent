'use strict';

/**
 * @ngdoc filter
 * @name rentApp.filter:myFilter
 * @function
 * @description
 * # myFilter
 * Filter in the rentApp.
 */
angular.module('rentApp')
  .filter('myFilter', function () {
    return function (input) {
      return 'myFilter filter: ' + input;
    };
  });

