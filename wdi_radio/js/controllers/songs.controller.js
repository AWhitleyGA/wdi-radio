(function () {

  angular
    .module('wdiRadio')
    .controller('SongsIndex', [
      'Song',
      '$sce',
      '$scope',
      SongsIndex
    ])
    .controller('SongsShow', [
      'Song',
      'Album',
      '$stateParams',
      '$sce',
      '$scope',
      SongsShow
    ])
    .controller('SongsNew', [
      'Song',
      'Album',
      'Artist',
      '$state',
      SongsNew
    ])
    .controller('SongsEdit', [
      'Song',
      '$stateParams',
      '$state',
      SongsEdit
    ])

  function SongsIndex (Song, $sce, $scope) {
    this.songs = Song.query()
    this.selectSong = $scope.$parent.vm.selectSong.bind($scope.$parent.vm)
  }

  function SongsShow(Song, Album, $stateParams, $sce, $scope) {
    this.song = Song.get({ id: $stateParams.id }, (song) => {
      song.album = Album.get({ id: song.album.id }, (album) => {
        album.songs = album.songs.filter((s) => s.id != song.id)
      })
      return song
    })
    this.selectSong = $scope.$parent.vm.selectSong.bind($scope.$parent.vm)
    this.currentSong = $scope.$parent.vm.selectedSong
  }

  function SongsNew(Song, Album, Artist, $state) {
    this.song = new Song()
    this.albums = Album.query()
    this.artists = Artist.query()

    this.create = function () {
      this.song.$save().then((res) => {
        $state.go('songsShow', { id: res.id })
      })
    }

    this.updateAlbumList = function () {
      Artist.get({ id: this.song.artist_id }, (res) => {
        this.albums = res.albums
      })
    }

    this.updateArtistList = function () {
      Album.get({ id: this.song.album_id }, (res) => {
        this.selectedArtist = res.artist
      })
    }
  }

  function SongsEdit(Song, $stateParams, $state) {
    this.song = Song.get({ id: $stateParams.id })
    this.update = function () {
      this.song.$update({ id: this.song.id }).then((res) => {
        $state.go('songsShow', { id: res.id })
      })
    }
    this.destroy = function () {
      this.song.$delete({ id: this.song.id }).then(() => {
        $state.go('songsIndex')
      })
    }
  }

})()
