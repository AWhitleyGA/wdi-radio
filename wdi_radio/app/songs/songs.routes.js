(function() {

  angular
    .module('wdiRadio')
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      Router
    ])

  function Router ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('songsIndex', {
        url: '/songs',
        controller: 'SongsIndex',
        controllerAs: 'vm',
        templateUrl: 'app/songs/index.html'
      })
      .state('songsShow', {
        url: '/songs/:id',
        controller: 'SongsShow',
        controllerAs: 'vm',
        templateUrl: 'app/songs/show.html'
      })
      .state('songsNew', {
        url: '/songs/new',
        controller: 'SongsNew',
        controllerAs: 'vm',
        templateUrl: 'app/songs/new.html'
      })
      .state('songsEdit', {
        url: '/songs/:id/edit',
        controller: 'SongsEdit',
        controllerAs: 'vm',
        templateUrl: 'app/songs/edit.html'
      })
    $urlRouterProvider.otherwise('/songs')
  }

}());
