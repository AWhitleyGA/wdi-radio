(function() {

  angular
    .module('wdiRadio')
    .config([
      '$locationProvider',
      '$urlRouterProvider',
      routesConfig
    ])

  function routesConfig ($locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true)
    $urlRouterProvider.otherwise('/songs')
  }
}());
