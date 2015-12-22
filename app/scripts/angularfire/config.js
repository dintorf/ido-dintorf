angular.module('firebase.config', [])
  .constant('FBURL', 'https://ido-dintorf.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password','facebook','google','twitter'])

  .constant('loginRedirectPath', '/login');
