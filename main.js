// modified version from: http://thecodeplayer.com/walkthrough/3d-perspective-projection-canvas-javascript

(function () {
  var canvas = document.querySelector('canvas');
  var ctxWidth = canvas.width = window.innerWidth;
  var ctxHeight = canvas.height = window.innerHeight;
  var fov = 120;
  var ctx = canvas.getContext('2d');
  var pixels = [];

  function generate() {
    for (var x = -350; x < 350; x += 50) {
      for (var z = -350; z < 350; z += 50) {
        pixels.push(
          {
            x: 230,
            y: x,
            z: z
          },
          {
            x: -250,
            y: x,
            z: z
          });
      }
    }

    for (var x = -350; x < 350; x += 50) {
      for (var z = -350; z < 350; z += 50) {
        pixels.push(
          {
            x: x,
            y: 250,
            z: z
          },
          {
            x: x,
            y: -250,
            z: z
          });
      }
    }

    function render() {
      ctx.clearRect(0, 0, ctxWidth, ctxHeight);
      var imagedata = ctx.getImageData(0, 0, ctxWidth, ctxHeight);
      var i = pixels.length;

      while (i--) {
        var pixel = pixels[i];
        //calculating 2d position for 3d coordinates
        //fov = field of view = denotes how far the pixels are from us.
        //the scale will control how the spacing between the pixels will decrease with increasing distance from us.
        var scale = fov / (fov + pixel.z);
        var x2d = pixel.x * scale + ctxWidth / 2;
        var y2d = pixel.y * scale + ctxHeight / 2;

        //marking the points only if they are inside the screen
        if (x2d >= 0 && x2d <= ctxWidth && y2d >= 0 && y2d <= ctxHeight) {
          var rad = ctx.createRadialGradient(x2d + 10, y2d + 50,  10, x2d + 70, y2d + 130, 50);
          rad.addColorStop(0, 'transparent');
          rad.addColorStop(0.1, 'rgba(255, 255, 255, 1.0)');
          rad.addColorStop(0.2, 'rgba(255, 255, 255, 0.3)');
          rad.addColorStop(0.3, 'rgba(255, 0, 133, 0.6)');
          rad.addColorStop(0.8, 'rgba(255, 0, 133, 0.1)');
          ctx.fillStyle = rad;
          ctx.fillRect(x2d, y2d, 150, 90);
        }

        pixel.z -= 1;

        if (pixel.z < -fov) {
          pixel.z += 5 * fov;
        }
      }
    }

    setInterval(render, 1000 / 130);
  }

  generate();
})();