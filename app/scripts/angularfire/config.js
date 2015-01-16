angular.module('firebase.config', [])
  .constant('FBURL', 'https://studentrent-prod.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password'])

  .constant('loginRedirectPath', '/login');
