(function () {

  angular
    .module('wdiRadio')
    .factory('Album', [
      '$resource',
      Album
    ])

  function Album ($resource) {
    return $resource('/api/albums/:id', {}, {
      update: { method: 'PUT' }
    })
  }

}())
