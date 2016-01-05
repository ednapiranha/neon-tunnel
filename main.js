// modified version from: http://thecodeplayer.com/walkthrough/3d-perspective-projection-canvas-javascript

(function () {
  var canvas = document.querySelector('canvas');
  var body = document.body;
  var ctxWidth = canvas.width = window.innerWidth;
  var ctxHeight = canvas.height = window.innerHeight;
  var fov = 150;
  var ctx = canvas.getContext('2d');
  var start = window.mozAnimationStartTime || new Date().getTime();
  var cachedCircles = {};
  var pixels = [];
  var switchLayout = false;

  function generate() {
    var max = 350;

    if (switchLayout) {
      max = 500;
    }

    for (var x = -max; x < max; x += 50) {
      for (var z = -max; z < max; z += 50) {
        pixels.push(
          {
            x: max - 50,
            y: x,
            z: z
          },
          {
            x: -max,
            y: x,
            z: z
          });
      }
    }

    for (var x = -max; x < max; x += 50) {
      for (var z = -max; z < max; z += 50) {
        pixels.push(
          {
            x: x,
            y: max - 50,
            z: z
          },
          {
            x: x,
            y: -max,
            z: z
          });
      }
    }
  }

  function render() {
    ctx.clearRect(0, 0, ctxWidth, ctxHeight);

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
        var shapeType = Math.floor(Math.random() * 2 + 1);

        if (!cachedCircles[x2d + '-' + y2d + '-' + shapeType + '-' + switchLayout]) {
          var rad;

          if (shapeType === 1) {
            rad = ctx.createRadialGradient(x2d + 25, y2d + 25,  1, x2d + 50, y2d + 50, 50);
            rad.addColorStop(1, 'transparent');
            rad.addColorStop(0.1, 'rgba(255, 255, 255, 1.0)');
            rad.addColorStop(0.2, 'rgba(255, 255, 255, 0.1)');
            if (switchLayout) {
              rad.addColorStop(0.3, 'rgba(0, 173, 255, 0.5)');
              rad.addColorStop(0.4, 'rgba(0, 173, 255, 0.1)');
              rad.addColorStop(0.7, 'rgba(0, 173, 255, 0.1)');
              rad.addColorStop(0.7, 'rgba(255, 255, 133, 0.3)');
            } else {
              rad.addColorStop(0.3, 'rgba(255, 0, 133, 0.5)');
              rad.addColorStop(0.6, 'rgba(255, 0, 133, 0.1)');
              rad.addColorStop(0.7, 'rgba(255, 0, 133, 0.1)');
            }
          } else {
            rad = ctx.createRadialGradient(x2d + 5, y2d + 5,  1, x2d + 10, y2d + 10, 10);
            rad.addColorStop(1, 'transparent');
            rad.addColorStop(0.1, 'rgba(255, 255, 255, 1.0)');
            rad.addColorStop(0.2, 'rgba(255, 255, 255, 0.1)');
            rad.addColorStop(0.4, 'rgba(0, 173, 255, 0.1)');
            rad.addColorStop(0.7, 'rgba(47, 185, 255, 0.1)');
            rad.addColorStop(0.8, 'rgba(255, 0, 133, 0.3)');
          }

          cachedCircles[x2d + '-' + y2d + '-' + shapeType + '-' + switchLayout] = rad;
        }

        ctx.fillStyle = cachedCircles[x2d + '-' + y2d + '-' + shapeType + '-' + switchLayout];

        if (shapeType === 1) {
          ctx.fillRect(x2d, y2d, 100, 100);
        } else {
          ctx.fillRect(x2d, y2d, 200, 200);
        }

        // ctx.rotate(25 * Math.PI / 180);

      }

      pixel.z -= 1;

      if (pixel.z < -fov) {
        pixel.z += 5 * fov;
      }
    }

    setTimeout(function () {
      requestAnimationFrame(render);
    }, 1000 / 570);
  }

  generate(start);
  render();

  setInterval(function () {
    switchLayout = !switchLayout;

    if (switchLayout) {
      body.classList.add('switch')
    } else {
      body.classList.remove('switch');
    }

  }, 6000);
})();