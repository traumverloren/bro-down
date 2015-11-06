;(function(){
function authInterceptor(API, auth) {
  return {
    // automatically attach Authorization header
    request: function(config) {
      return config;
    },

    // If a token was sent back, save it
    response: function(res) {
      return res;
    },
  }
}

function authService($window) {
  var self = this;

  self.parseJwt = function(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse($window.atob(base64));
  }
}

function userService($http, auth) {
  var self = this;
  // add authentication methods here
  self.register = function(email, password) {
    return $http.post('/auth/register', {
      email: email,
        password: password
      })
  }

  self.login = function(email, password) {
  return $http.post('/auth/', {
        email: email,
        password: password
      })
  };

}

// We won't touch anything in here
function MainCtrl(user, auth) {
  var self = this;

  function handleRequest(res) {
    var token = res.data ? res.data.token : null;
    if(token) { console.log('JWT:', token); }
    self.message = res.data.message;
  }

  self.login = function() {
    user.login(self.email, self.password)
      .then(handleRequest, handleRequest)
      .then(console.log("hi"))

  }
  self.register = function() {
    user.register(self.email, self.password)
      .then(handleRequest, handleRequest)
  }

  self.logout = function() {
    auth.logout && auth.logout()
  }
  self.isAuthed = function() {
    return auth.isAuthed ? auth.isAuthed() : false
  }
}

angular.module('broDown', [])
.factory('authInterceptor', authInterceptor)
.service('user', userService)
.service('auth', authService)
.constant('API', 'http://test-routes.herokuapp.com')
.config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
})
.controller('Main', MainCtrl)
})();
