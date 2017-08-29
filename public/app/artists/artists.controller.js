(function() {

  angular
    .module('wdiRadio')
    .controller('ArtistsIndex', [
      'Artist',
      'Song',
      '$state',
      '$scope',
      ArtistsIndex
    ])
    .controller('ArtistsShow', [
      'Artist',
      'Album',
      '$state',
      '$scope',
      ArtistsShow
    ])

  function ArtistsIndex (Artist, Song, $state, $scope) {
    this.artists = Artist.query()
    this.newArtist = new Artist()
    this.postArtist = function () {
      this.newArtist.$save((artist) => {
        $scope.$parent.vm.songs = Song.query()
        $state.go('artistsShow', { id: artist.id })
      })

    }
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
