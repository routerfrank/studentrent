angular.module('firebase.config', [])
  .constant('FBURL', 'https://studentrent-dev.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password','facebook'])

  .constant('loginRedirectPath', '/login');
