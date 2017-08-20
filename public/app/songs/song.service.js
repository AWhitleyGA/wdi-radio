(function () {

  angular
    .module('wdiRadio')
    .factory('Song', [
      '$resource',
      Song
    ])

  function Song ($resource) {
    return $resource('/api/songs/:id', {}, {
      update: { method: 'PUT' }
    })
  }

})()
