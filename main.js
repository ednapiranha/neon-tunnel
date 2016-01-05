// modified version from: http://thecodeplayer.com/walkthrough/3d-perspective-projection-canvas-javascript

(function () {
  var canvas = document.querySelector('canvas');
  var body = document.body;
  var ctxWidth = canvas.width = window.innerWidth;
  var ctxHeight = canvas.height = window.innerHeight;
  var fov = 250;
  var ctx = canvas.getContext('2d');
  var start = window.mozAnimationStartTime || new Date().getTime();
  var cachedCircles = {};
  var pixels = [];
  var switchLayout = false;

  function generate() {
    for (var x = -350; x < 350; x += 50) {
      for (var z = -350; z < 350; z += 50) {
        pixels.push(
          {
            x: 300,
            y: x,
            z: z
          },
          {
            x: -350,
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
            y: 300,
            z: z
          },
          {
            x: x,
            y: -350,
            z: z
          });
      }
    }

    render();
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
              rad.addColorStop(0.7, 'rgba(0, 173, 255, 0.1)');
              rad.addColorStop(0.7, 'rgba(0, 173, 255, 0.1)');
            } else {
              rad.addColorStop(0.3, 'rgba(255, 0, 133, 0.5)');
              rad.addColorStop(0.6, 'rgba(255, 0, 133, 0.3)');
              rad.addColorStop(0.7, 'rgba(255, 0, 133, 0.1)');
            }
          } else {
            rad = ctx.createRadialGradient(x2d + 5, y2d + 5,  1, x2d + 10, y2d + 10, 10);
            rad.addColorStop(1, 'transparent');
            rad.addColorStop(0.1, 'rgba(255, 255, 255, 1.0)');
            rad.addColorStop(0.2, 'rgba(255, 255, 255, 0.1)');
            rad.addColorStop(0.3, 'rgba(0, 173, 255, 0.5)');
            rad.addColorStop(0.7, 'rgba(47, 185, 255, 0.1)');
          }

          cachedCircles[x2d + '-' + y2d + '-' + shapeType + '-' + switchLayout] = rad;
        }

        ctx.fillStyle = cachedCircles[x2d + '-' + y2d + '-' + shapeType + '-' + switchLayout];


        ctx.translate(ctx.width, ctx.height);

        if (switchLayout) {
          ctx.rotate(180);
        } else {
          ctx.rotate(0);
        }

        if (shapeType === 1) {
          ctx.fillRect(x2d, y2d, 100, 100);
        } else {
          ctx.fillRect(x2d, y2d, 200, 200);
        }

      }

      pixel.z -= 1;

      if (pixel.z < -fov) {
        pixel.z += 2 * fov;
      }
    }

    setTimeout(function () {
      requestAnimationFrame(render);
    }, 1000 / 30);
  }

  generate(start);

  window.onclick = function () {
    switchLayout = !switchLayout;
    ctx.clearRect(0, 0, ctxWidth, ctxHeight);
    if (switchLayout) {
      body.classList.add('switch');
    } else {
      body.classList.remove('switch');
    }
  }
})();