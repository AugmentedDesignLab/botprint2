beforeEach(function() {
    this.addMatchers({
// example
//        toBePlaying: function(expectedSong) {
//            var player = this.actual;
//            return player.currentlyPlayingSong === expectedSong &&
//                player.isPlaying;
//        }
        toBeInstalled: function(parts) {
            var robot = this.actual;
            return robot.find
        }
    });
});
