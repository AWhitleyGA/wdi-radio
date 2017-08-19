(function() {

  angular
    .module('wdiRadio')
    .controller('HomeController', [
      'Song',
      '$sce',
      HomeController
    ])

  function HomeController (Song, $sce) {
    this.songs = Song.query()
    this.selectedSong = null
    this.selectSong = function (song) {
      this.selectedSong = Object.assign({}, this.songs.find((s) => s.id == song.id))
      this.selectedSong.album = Object.assign({}, this.selectedSong.album)
      this.selectedSong.preview_url = $sce.trustAsResourceUrl(this.selectedSong.preview_url)
      this.selectedSong.album.image_url = this.selectedSong.album.image_url.replace('100x100', `200x200`)
    }
  }

}());
