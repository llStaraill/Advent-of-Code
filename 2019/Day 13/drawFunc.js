function drawImage(map, canvasSize, pixelSize) {
  let imageColors = {
    0: "rgb(150,150,150)",
    1: "rgb(0,0,0)",
    2: "rgba(0,0,0,0.5)",
    3: "rgb(63,136,143)",
    4: "rgb(212,175,55)",
    5: "rgba(250,128,114,0.5)"
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

  map.forEach((value, key) => {
    let entry = new Tile(...key.split(","), value);
   
      ctx.fillStyle = imageColors[entry.t];
      ctx.fillRect(entry.x * pS, entry.y * pS, pS, pS);
    
  });
}
/*
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
*/
