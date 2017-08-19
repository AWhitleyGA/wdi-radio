(function() {
  angular
    .module('wdiRadio')
    .directive('songPlayer', [
      'Song',
      songPlayer
    ])


  function songPlayer () {
    return {
      templateUrl: 'app/directives/player.html',
      scope: {
        song: '='
      },
      link: function ($scope, $element) {
        $scope.closePlayer = function () {
          $scope.$parent.vm.selectedSong = null
          $element.find('audio')[0].pause()
        }
        $element.find('audio').bind('ended', function () {
          let randomIndex = Math.floor(Math.random() * $scope.$parent.vm.songs.length)
          let randomSong = $scope.$parent.vm.songs[randomIndex]
          $scope.$parent.vm.selectSong(randomSong)
          $scope.$apply()
        })
      }
    }
  }

}());
