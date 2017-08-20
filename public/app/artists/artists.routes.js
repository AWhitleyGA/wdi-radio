(function() {

  angular
    .module('wdiRadio')
    .config([
      '$stateProvider',
      artistsRoutes
    ])

  function artistsRoutes ($stateProvider) {
    $stateProvider
      .state('artistsIndex', {
        url: '/artists',
        controller: 'ArtistsIndex',
        controllerAs: 'vm',
        templateUrl: 'app/artists/index.html'
      })
      .state('artistsShow', {
        url: '/artists/:id',
        controller: 'ArtistsShow',
        controllerAs: 'vm',
        templateUrl: 'app/artists/show.html'
      })
  }

}());
