(function () {

  angular
    .module('wdiRadio')
    .factory('Artist', [
      '$resource',
      Artist
    ])

  function Artist ($resource) {
    return $resource('/api/artists/:id', {}, {
      update: { method: 'PUT' }
    })
  }

}())
