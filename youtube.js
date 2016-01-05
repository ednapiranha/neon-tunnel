(function () {
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  var player;
  var videoArray = ['en-HmMPpze4', 'MYlaH763igI', '49P4GUA4AIY', 'CGjm61lZ2W8', 'JCUPc9zVfyo'];

  videoArray = shuffle(videoArray);

  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '190',
      width: '340',
      videoId: videoArray[0],
      events: {
        'onReady': onPlayerReady
      }
    });
  }

  function onPlayerReady(event) {
    event.target.playVideo();
  }

  window.onload = function() {
    onYouTubeIframeAPIReady();
  };
})();