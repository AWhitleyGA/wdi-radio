(function () {

  angular
    .module('wdiRadio')
    .controller('SongsIndex', [
      'Song',
      'Album',
      'Artist',
      '$sce',
      '$scope',
      '$state',
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
    .controller('SongsEdit', [
      'Song',
      '$stateParams',
      '$state',
      SongsEdit
    ])

  function SongsIndex (Song, Album, Artist, $sce, $scope, $state) {
    this.songs = Song.query()
    this.selectSong = $scope.$parent.vm.selectSong.bind($scope.$parent.vm)

    this.newSong = new Song()
    this.hasSearched = false

    this.search = function () {
      fetch(`https://itunes.apple.com/search?term=${this.searchSong}&media=music&entity=song`, {
        headers: new Headers({
          'Accept': 'application/json'
        })
      })
      .then((res) => {
        res.json().then((res) => {
          this.hasSearched = true
          this.songList = res.results
          $scope.$apply()
        })
      })
      .catch((err) => {
        console.log(err)
      })
    }

    this.updatePreview = function (trackId) {
      this.selectedSong = this.songList.find((song) => song.trackId === parseInt(trackId))
    }

    this.addSong = function () {
      this.newSong.name = this.selectedSong.trackName
      this.newSong.preview_url = this.selectedSong.previewUrl
      this.newSong.itunes_id = this.selectedSong.trackId
      this.newSong.album_id = this.selectedSong.collectionId
      this.newSong.artist_id = this.selectedSong.artistId
      this.newSong.$save((res) => {
        $state.go('songsShow', { id: res.id })
      })
    }
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
