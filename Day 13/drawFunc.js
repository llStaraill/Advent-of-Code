function drawImage(arr, canvasSize, pixelSize) {
  let imageColors = {
    0: "rgb(255,255,255,0)",
    1: "rgb(0,0,0)",
    2: "rgba(0,0,0,0.5)",
    3: "rgb(63,136,143)",
    4: "rgb(212,175,55)"
  };
  const c = {
    width: canvasSize[0],
    height: canvasSize[1]
  };
  const pS = pixelSize;
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.canvas.height = c.height * pS;
  ctx.canvas.width = c.width * pS;
  ctx.fillStyle = "rgb(150,150,150)";
  ctx.fillRect(0, 0, c.width * pS, c.height * pS);

  // Drawing //

  arr.map(i => {
    if (i.x === -1 && i.y === 0) {
      let score = i.t;
      document.getElementById("score").innerHTML = score;
    } else {
      ctx.fillStyle = imageColors[i.t];
      ctx.fillRect(i.x * pS, i.y * pS, pS, pS);
    }
  });
}
