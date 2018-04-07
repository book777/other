var histH = 120,
  img,
  prevImg,
  canv,
  ctx;

window.onload = function() {
  img = document.getElementById("sourc");
  canv = document.getElementById("canv");
  ctx = canv.getContext('2d');

  reDraw();

  document.getElementById("sizeInfo").innerHTML = img.naturalWidth + " width, " + img.naturalHeight + " height";

  canv.onmousedown = function() {
    document.addEventListener('mousemove', draw);

    canv.onmouseup = function() {
      document.removeEventListener('mousemove', draw);
      canv.onmouseup = null;
    };
  };

  canv.onmousemove = function(event) {
    var pos = getMousePos(canv, event);
    var posx = Math.floor(pos.x * (canv.width / img.width));
    var posy = Math.floor(pos.y * (canv.height / img.height));

    var dataImg = ctx.getImageData(posx, posy, 1, 1).data;

    document.getElementById("posInfo").innerHTML = "<div class='text-red init'>" + dataImg[0] + "</div>, <div class='text-green init'>"
      + dataImg[1] + "</div>, <div class='text-blue init'>" + dataImg[2] + "</div>; " + posx + " width, " + posy + " height";
  };

  canv.onmouseout = function() {
    document.getElementById("posInfo").innerHTML = '';
  };

  document.getElementById("picField").onchange = function(evt) {
    var tgt = evt.target || window.event.srcElement,
      files = tgt.files;

    if(FileReader && files && files.length) {
      var fr = new FileReader();
      fr.onload = function() {
        document.getElementById("sourc").src = fr.result;
      };
      fr.readAsDataURL(files[0]);
    }
  };

  document.onkeydown = function(e) {
    if(e.keyCode === 27)
      canvUndo();
  }

};

function confirmRGB() {
  let r = parseInt(document.forms['formRGB']['red'].value);
  let g = parseInt(document.forms['formRGB']['green'].value);
  let b = parseInt(document.forms["formRGB"]["blue"].value);

  let dataImg = ctx.getImageData(0, 0, canv.width, canv.height).data;
  let red;
  canvBackup();

  for(let i = 0; i < canv.height; ++i)
    for(let j = 0; j < canv.width; ++j) {
      red = (i * canv.width + j) * 4;
      ctx.fillStyle = 'rgba(' + (dataImg[red] + r) + ', ' + (dataImg[red + 1] + g) + ', ' + (dataImg[red + 2] + b) + ', ' + (dataImg[red + 3]) + ')';
      ctx.fillRect(j, i, 1, 1);
    }

  updateHistogram();
}


function brightnes(pxies) {
  let dataImg = ctx.getImageData(0, 0, canv.width, canv.height).data;
  let red;
  canvBackup();

  for(let i = 0; i < canv.height; ++i)
    for(let j = 0; j < canv.width; ++j) {
      red = (i * canv.width + j) * 4;
      ctx.fillStyle = 'rgba(' + (dataImg[red] + pxies) + ', ' + (dataImg[red + 1] + pxies) + ', ' + (dataImg[red + 2] + pxies) + ', ' + (dataImg[red + 3]) + ')';
      ctx.fillRect(j, i, 1, 1);
    }

  updateHistogram();
}

function contrast(contrast) {
  let dataImg = ctx.getImageData(0, 0, canv.width, canv.height).data;
  let red;
  canvBackup();
  contrast = parseFloat((contrast/100) + 1);
  var intercept = 127 * (1 - contrast);
  for(let i = 0; i < canv.height; ++i)
    for(let j = 0; j < canv.width; ++j) {
      red = (i * canv.width + j) * 4;
      ctx.fillStyle = 'rgba(' + parseInt(dataImg[red]*contrast + intercept)
        + ', ' + parseInt(dataImg[red+1]*contrast + intercept)
        + ', ' + parseInt(dataImg[red+2]*contrast + intercept)
        + ', ' + (dataImg[red + 3]) + ')';
      ctx.fillRect(j, i, 1, 1);
    }

  updateHistogram();
}


function brightnessBtn() {
  brightnes(parseInt(document.getElementById('range-br').value));
}

function darknessBtn() {
  brightnes(-parseInt(document.getElementById('range-drk').value));
}

function brightnesPow(step) {
  let dataImg = ctx.getImageData(0, 0, canv.width, canv.height).data;
  let red;
  canvBackup();

  for(let i = 0; i < canv.height; ++i)
    for(let j = 0; j < canv.width; ++j) {
      red = (i * canv.width + j) * 4;
      ctx.fillStyle = 'rgba(' + Math.round(Math.pow(dataImg[red] / 255, step) * 255) + ', ' + Math.round(Math.pow(dataImg[red + 1] / 255, step) * 255) + ', ' + Math.round(Math.pow(dataImg[red + 2] / 255, step) * 255) + ', ' + (dataImg[red + 3]) + ')';
      ctx.fillRect(j, i, 1, 1);
    }

  updateHistogram();
}

function negationBtn() {
  let dataImg = ctx.getImageData(0, 0, canv.width, canv.height).data;
  let red;
  canvBackup();

  for(let i = 0; i < canv.height; ++i)
    for(let j = 0; j < canv.width; ++j) {
      red = (i * canv.width + j) * 4;
      ctx.fillStyle = 'rgba(' + (255 - dataImg[red]) + ', ' + (255 - dataImg[red + 1]) + ', ' + (255 - dataImg[red + 2]) + ', ' + (dataImg[red + 3]) + ')';
      ctx.fillRect(j, i, 1, 1);
    }

  updateHistogram();
}

function draw(e) {
  var boxSize = 8;//!!!

  var pos = getMousePos(canv, e);
  var posx = pos.x * (canv.width / img.width);
  var posy = pos.y * (canv.height / img.height);

  ctx.fillStyle = "#ddd";//!!!
  ctx.fillRect(posx - boxSize, posy - boxSize, boxSize, boxSize);

  updateHistogram();
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}


function reDraw() {
  canv.width = img.naturalWidth;
  canv.height = img.naturalHeight;

  ctx = canv.getContext('2d');
  ctx.drawImage(img, 0, 0);

  updateHistogram();
}

function reDrawSize() {
  ctx = canv.getContext('2d');
  ctx.drawImage(img, 0, 0, canv.width, canv.height);

  updateHistogram();
}


function canvBackup() {
  prevImg = new Image();
  prevImg.src = canv.toDataURL("image/png");
  document.getElementById("canvUndo").style.display = 'initial';
}

function canvUndo() {
  let bUndo = document.getElementById("canvUndo");
  if(bUndo.style.display !== 'none') {
    canv.getContext("2d").drawImage(prevImg, 0, 0);
    bUndo.style.display = 'none';
  }
  updateHistogram();
}

function blend(types, alfa) {
  //img
  let canvImg = document.createElement('canvas');
  canvImg.width = canv.width;
  canvImg.height = canv.height;
  let ctxImg = canvImg.getContext('2d');
  ctxImg.drawImage(img, 0, 0, canv.width, canv.height);
  let dataImg = ctxImg.getImageData(0, 0, canv.width, canv.height).data;

  //canv
  let ctx = canv.getContext('2d');
  let data = ctx.getImageData(0, 0, canv.width, canv.height).data;
  canvBackup();

  let red, rgba = [];

  for(let i = 0; i < canv.height; ++i)
    for(let j = 0; j < canv.width; ++j) {
      red = (i * canv.width + j) * 4;
      rgba[3] = dataImg[red + 3] + data[red + 3];

      for(let k = 0; k < 3; ++k) {
        switch(types) {
          case 1:
            rgba[k] = dataImg[red + k] + data[red + k];
            break;
          case 2:
            rgba[k] = dataImg[red + k] + data[red + k] - 255;
            break;
          case 3:
            rgba[k] = Math.abs(dataImg[red + k] - data[red + k]);
            break;
          case 4:
            rgba[k] = (dataImg[red + k] * data[red + k]) / 255;
            break;
          case 5:
            rgba[k] = (1 - (1 - dataImg[red + k] / 255) * (1 - data[red + k] / 255) ) * 255;
            break;
          case 6:
            rgba[k] = 255 - Math.abs(255 - dataImg[red + k] - data[red + k]);
            break;
          case 7:
            rgba[k] = dataImg[red + k] < data[red + k] ? dataImg[red + k] : data[red + k];
            break;
          case 8:
            rgba[k] = dataImg[red + k] > data[red + k] ? dataImg[red + k] : data[red + k];
            break;
          case 9:
            rgba[k] = (dataImg[red + k] / 255 + data[red + k] / 255 - (2 * dataImg[red + k] / 255 * data[red + k] / 255) ) * 255;
            break;
          case 10:
            rgba[k] = dataImg[red + k] < 127 ? (1 / 127 * (data[red + k] * dataImg[red + k])) : (1 - 2 * (1 - data[red + k] / 255) * (1 - dataImg[red + k] / 255)) * 255;
            break;
          case 11:
            rgba[k] = data[red + k] < 127 ? (2 * (data[red + k] / 255 * dataImg[red + k] / 255)) * 255 : (1 - 2 * (1 - data[red + k] / 255) * (1 - dataImg[red + k] / 255)) * 255;
            break;
          case 12:
            rgba[k] = data[red + k] < 127
              ? ( 2 * (data[red + k] / 255 * dataImg[red + k] / 255) + Math.pow(data[red + k] / 255, 2) * (1 - dataImg[red + k] / 127) ) * 255
              : ( Math.sqrt(data[red + k] / 255) * (dataImg[red + k] / 127 - 1) + dataImg[red + k] / 127 * (1 - dataImg[red + k]) ) * 255;
            break;
          case 13:
            rgba[k] = (data[red + k] === 255) ? 255 : (dataImg[red + k] / 255 / (1 - data[red + k] / 255)) * 255;
            break;
          case 14:
            rgba[k] = data[red + k] === 0 ? 0 : (1 - (1 - dataImg[red + k] / 255) / (data[red + k] / 255)) * 255;
            break;
          case 15:
            rgba[k] = dataImg[red + k] * dataImg[red + k] / (255 - data[red + k]);
            break;
          case 16:
            rgba[k] = ((1 - alfa) * dataImg[red + k] / 255 + alfa * data[red + k] / 255) * 255;
            break;
          default:
            console.log("error");
            rgba[k] = data[red + k];
        }
        rgba[k] = Math.round(rgba[k]);
      }
      ctx.fillStyle = "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + rgba[3] + ")";
      ctx.fillRect(j, i, 1, 1);
    }
  updateHistogram();
}





function updateHistogram(restore) {
  let histR = new Array(256).fill(0);
  let histG = new Array(256).fill(0);
  let histB = new Array(256).fill(0);

  let dataImg = document.getElementById("canv").getContext('2d').getImageData(0, 0, canv.width, canv.height).data;
  for(let i = 0; i < canv.height; ++i)
    for(let j = 0; j < canv.width; ++j) {
      red = (i * canv.width + j) * 4;
      histR[dataImg[red]]++;
      histG[dataImg[red + 1]]++;
      histB[dataImg[red + 2]]++;
    }

  // canvas red
  let canvHist = document.getElementById("canvHistR");
  canvHist.width = 256;
  canvHist.height = histH;
  let indexMax = histR.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
  let ctx = canvHist.getContext('2d');
  ctx.clearRect(0, 0, 256, histH);
  ctx.fillStyle = 'red';
  for(var w = 0; w < 256; ++w)
    for(var h = histH-Math.round(histR[w]/histR[indexMax]*histH); h < histH; ++h)
      ctx.fillRect(w, h, 1, 100);


  // canvas green
  canvHist = document.getElementById("canvHistG");
  canvHist.width = 256;
  canvHist.height = histH;
  indexMax = histG.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
  ctx = canvHist.getContext('2d');
  ctx.clearRect(0, 0, 256, histH);
  ctx.fillStyle = 'green';
  for(var w = 0; w < 256; ++w)
    for(var h = histH-Math.round(histG[w]/histG[indexMax]*histH); h < histH; ++h)
      ctx.fillRect(w, h, 1, 1);


  // canvas blue
  canvHist = document.getElementById("canvHistB");
  canvHist.width = 256;
  canvHist.height = histH;
  indexMax = histB.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
  ctx = canvHist.getContext('2d');
  ctx.clearRect(0, 0, 256, histH);
  ctx.fillStyle = 'blue';
  for(var w = 0; w < 256; ++w)
    for(var h = histH-Math.round(histB[w]/histB[indexMax]*histH); h < histH; ++h)
      ctx.fillRect(w, h, 1, 1);


  // canvas mean
  var sum = histR.map(function (num, idx) {
    return num + histG[idx] + histB[idx];
  });
  canvHist = document.getElementById("canvHistM");
  canvHist.width = 256;
  canvHist.height = histH;
  indexMax = sum.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
  ctx = canvHist.getContext('2d');
  ctx.clearRect(0, 0, 256, histH);
  ctx.fillStyle = 'black';
  for(var w = 0; w < 256; ++w)
    for(var h = histH-Math.round(sum[w]/sum[indexMax]*histH); h < histH; ++h)
      ctx.fillRect(w, h, 1, 1);
}