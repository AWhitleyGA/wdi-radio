(function() {

  angular
    .module('wdiRadio')
    .controller('ArtistsIndex', [
      'Artist',
      ArtistsIndex
    ])
    .controller('ArtistsShow', [
      'Artist',
      'Album',
      '$state',
      '$scope',
      ArtistsShow
    ])

  function ArtistsIndex (Artist) {
    this.artists = Artist.query()
  }

  function ArtistsShow (Artist, Album, $state, $scope) {
    this.artist = Artist.get({ id: $state.params.id }, (artist) => {
      artist.albums = artist.albums.map((album) => {
        return Album.get({ id: album.id })
      })
      return artist
    })
    this.selectSong = $scope.$parent.vm.selectSong.bind($scope.$parent.vm)
  }

}());
