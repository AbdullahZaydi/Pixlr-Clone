var sliders = [
  "red",
  "green",
  "blue",
  "alpha",
  "brightness",
  "hue",
  "saturation",
  "luminance",
  "value",
  "noise",
  "pixelSize",
  "levels",
  "enhance",
  "blurRadius"
];

var sliderInitials = [
    {slider: "red", value: 150},
    {slider: "green", value: 150},
    {slider: "blue", value: 150},
    {slider: "alpha", value: 0},
    {slider: "brightness", value: 0},
    {slider: "hue", value: 0},
    {slider: "saturation", value: 0},
    {slider: "luminance", value: 0},
    {slider: "value", value: 0},
    {slider: "noise", value: 0},
    {slider: "pixelSize", value: .1},
    {slider: "levels", value: 1},
    {slider: "enhance", value: 0},
    {slider: "blurRadius", value: 0}
];

var bgSliders = [
  "bgred",
  "bggreen",
  "bgblue",
  "bgalpha",
  "bgbrightness",
  "bghue",
  "bgsaturation",
  "bgluminance",
  "bgvalue",
  "bgnoise",
  "bgpixelSize",
  "bglevels",
  "bgenhance",
  "bgblurRadius"
];

var bgSliderInitials = [
    {slider: "bgred", value: 150},
    {slider: "bggreen", value: 150},
    {slider: "bgblue", value: 150},
    {slider: "bgalpha", value: 0},
    {slider: "bgbrightness", value: 0},
    {slider: "bghue", value: 0},
    {slider: "bgsaturation", value: 0},
    {slider: "bgluminance", value: 0},
    {slider: "bgvalue", value: 0},
    {slider: "bgnoise", value: 0},
    {slider: "bgpixelSize", value: .1},
    {slider: "bglevels", value: 1},
    {slider: "bgenhance", value: 0},
    {slider: "bgblurRadius", value: 0}
];
var lastLayer = null;
// Here for the draggable feature
const makeLayerDraggable = () => {
  $( ".dragdrop" ).draggable({ revert: true, helper: "clone", axis: "y" });

  $(".dragdrop").droppable({
    accept: ".dragdrop",
    activeClass: "ui-state-hover",
    hoverClass: "ui-state-active",
    drop: function( event, ui ) {

        let draggable = ui.draggable, droppable = $(this),
            dragPos = draggable.position(), dropPos = droppable.position();

        draggable.swap(droppable);
    }
  }); 
}
var isCropping = false;
jQuery.fn.swap = function(b){ 
  // method from: http://blog.pengoworks.com/index.cfm/2008/9/24/A-quick-and-dirty-swap-method-for-jQuery
  b = jQuery(b)[0]; 
  let a = this[0]; 
  let t = a.parentNode.insertBefore(document.createTextNode(''), a); 
  b.parentNode.insertBefore(a, b); 
  t.parentNode.insertBefore(b, t); 
  t.parentNode.removeChild(t); 
  let objOf_a = stage.find('.'+a.id)[0];
  let objOf_b = stage.find('.'+b.id)[0];
  
  let valueOf_a = objOf_a.zIndex();
  let valueOf_b = objOf_b.zIndex();

  objOf_a.zIndex(valueOf_b)
  objOf_b.zIndex(valueOf_a)
  objOf_a.batchDraw()
  objOf_b.batchDraw()
  return b; 
};
const layerDivHTML = (name, imageSource) => {
  let layerName = imageSource === undefined || imageSource === null ? name : "";
  let bg = imageSource === undefined || imageSource === null ? 
  "style=\"background: white;background-size: cover;background-position: center;background-repeat: no-repeat;\""
  : "style=\"background: url("+imageSource+");background-size: cover;background-position: center;background-repeat: no-repeat;\"";
  let html = "<div class=\"popupDiv dragdrop\" id=\""+name+"\">"+
  "<div class=\"popupImage\" "+bg+">"+
      "<div  class=\"menuDots\" id=\"threeDots\">"+
          "<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" width=\"16\" height=\"16\" fill=\"currentColor\""+
              "class=\"bi bi-three-dots\" viewBox=\"0 0 16 16\">"+
              "<path"+
                  "d=\"M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z\" />"+
          "</svg>"+
      "</div>"+
      "<div class=\"text-center\"><strong>"+layerName+"</strong></div>"+
      "<div class=\"twoIcons\">"+
          "<i class=\"fas fa-unlock\" onclick=\"lockLayer(this, '"+name+"')\"></i>"+
      "</div>"
  "</div>";
  let html2 = "<div class=\"popUp hide\" style=\"z-Index:1\" id=\"popUp\">"+
  "<div class=\"closeIcon2\" id=\"popupClose\">"+
      "<i class=\"fas fa-times\"></i>"+
  "</div>"+
  "<div class=\"inputDivMain\">"+
    "<div class=\"inputDiv\">"+
        "<label>Name</label>"+
        "<input type=\"text\" placeholder=\"Hintergrund\">"+
      "</div>"+
      "<div class=\"inputDiv\">"+
        "<label>Mischmodus</label>"+
        "<select>"+
            "<option value=\"original\">Custom</option>"+
            "<option value=\"full-width\">Full Width</option>"+
            "<option value=\"full-height\">Full Height</option>"+
          "</select>"+
        "</div>"+
    "</div>"+
  "<div class=\"rme-range-slider\">"+
      "<div class=\"rangeTitle\">"+
        "<span>Transparenz</span>"+
        "<span class=\"rme-control-value\">100%</span>"+
      "</div>"+
      "<input class=\"rme-range-slider__range\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" value=\"100\">"+
    "</div>"+

  "<div class=\"btn-group btn-group-toggle\" data-toggle=\"buttons\">"+
      "<label class=\"btn btn-secondary active two\">"+
        "<input type=\"radio\" name=\"options\" id=\"option1\" autocomplete=\"off\" checked> FREIGEGEBEN</label>"+
      "<label class=\"btn btn-secondary\">"+
        "<input type=\"radio\" name=\"options\" id=\"option3\" autocomplete=\"off\"> GESPERRT"+
      "</label>"+
    "</div>"+
    "<div class=\"btn-group btn-group-toggle\" data-toggle=\"buttons\">"+
      "<label class=\"btn btn-secondary active\">"+
        "<input type=\"radio\" name=\"options\" id=\"option1\" autocomplete=\"off\" checked> SICHTBAR"+
      "</label>"+
      "<label class=\"btn btn-secondary two\">"+
        "<input type=\"radio\" name=\"options\" id=\"option3\" autocomplete=\"off\"> VERSTECKT"+
      "</label>"+
    "</div>"+

    "<ul class=\"icon-button-set pad-20\" style=\"text-align: right\">"+
      "<li id=\"layer-settings-merge-down\" tooltip=\"Merge Down (CTRL+E)\" flow=\"up\"><img"+
            "+src=\"https://static-cdn.pixlr.com/img/icon/merge-down.svg\"></li>"+
            "<li id=\"layer-settings-merge-visible\" tooltip=\"Merge Visible\" flow=\"up\"><img"+
            "src=\"https://static-cdn.pixlr.com/img/icon/merge-visible.svg\"></li>"+
      "<li id=\"layer-settings-merge-flatten\" tooltip=\"Flatten Image\" flow=\"up\"><img"+
      "src=\"https://static-cdn.pixlr.com/img/icon/merge-flatten.svg\"></li>"+
    "</ul>"+
    "<ul class=\"icon-button-set pad-10\" style=\"text-align: right\">"+
      "<li id=\"layer-settings-duplicate\" tooltip=\"Duplicate layer\" flow=\"up\"><img"+
          "src=\"https://static-cdn.pixlr.com/img/icon/copy.svg\"></li>"+
      "<li id=\"layer-settings-delete\" tooltip=\"Delete layer (DEL)\" flow=\"up\"><img"+
      "src=\"https://static-cdn.pixlr.com/img/icon/delete.svg\"></li>"+
    "</ul>"+
"</div>"+
"</div>";
return html+html2;
}
let lockedLayers = [];
const addLayer = (layerName, imageSource) => {
    let html = "<div class=\"dragdrop\" id=\""+layerName+"\" style=\"top:0px;left: 0px\">"+ layerName +"</div>";
    document.getElementById("layer-tab").innerHTML = $('#layer-tab').html() + layerDivHTML(layerName, imageSource);
    makeLayerDraggable();
    lockedLayers.forEach(attr => {
      $('#'+attr.name).draggable('disable')
      $('#'+attr.name).droppable('disable')
      console.log(attr)
    })
}
const lockLayer = (e, name) => {
  if(e.className == "fas fa-unlock") {
    e.className = "fas fa-lock";
    $('#'+name).draggable('disable')
    $('#'+name).droppable('disable')
    lockedLayers.push({evt: e, name: name})
  }
  else {
    e.className = "fas fa-unlock"
    $('#'+name).draggable('enable')
    $('#'+name).droppable('enable')
    let index = lockedLayers.indexOf({evt: e, name: name})
    lockedLayers.splice(index, 1)
    makeLayerDraggable()
  }
  stage.fire('click')
};
var imageObj = new Image();
var image = null;
var layer = new Konva.Layer();
var bgLayer = new Konva.Layer();
var bgImageLayer = new Konva.Layer();
var tr = new Konva.Transformer();
var stage = new Konva.Stage({
  container: "container",
  width: 740,
  height: 420
});
var background = null;
var backgroundImage = null;
const loadImage = (imageSource) => {
  tr.zIndex(stage.children.length - 1)
  background = new Konva.Rect({
    x: 0,
    y: 0,
    width: stage.width(),
    height: stage.height(),
    fill:"transparent",
    // remove background from hit graph for better perf
    // because we don't need any events on the background
    listening: false,
  });
  bgLayer.add(background);
  stage.add(bgLayer);
  bgImageLayer.zIndex(1);
  stage.add(bgImageLayer)
  // var newImage = new Image();
  // newImage.src = "./assets/bg.jpg";
  // backgroundImage = new Konva.Image({
  //   image: newImage
  // });
  // backgroundImage.width(stage.width());
  // backgroundImage.height(stage.height());
  // backgroundImage.draggable(true)
  // newImage.onload = () => {
  //   backgroundImage.cache();
  //   layer.clear()
  //   bgImageLayer.add(backgroundImage);
  //   stage.add(bgImageLayer);
    
  //   // Sliders
  //   updateSliders();
  // }
  // bgImageLayer.zIndex(1)
  // Cross origin image
  imageObj.crossOrigin = "";
  imageObj.src = imageSource;
  document.getElementById("showCutOut").src = imageSource;
  document.getElementById("showCutOut2").src = imageSource;
  $(".imageViewRight").attr('style', 'background: url('+ imageSource +');background-size: cover;background-position: center;background-repeat: no-repeat;')
  // Konva Image
  image = new Konva.Image({
    image: imageObj
  });
  image.position({
    x: -0,
    y: -0
  });
  image.width(400);
  image.height(300);
  image.draggable(true); // ?
  image.filters([
    Konva.Filters.RGBA,
    Konva.Filters.Brighten,
    Konva.Filters.HSL,
    Konva.Filters.HSV,
    Konva.Filters.Noise,
    Konva.Filters.Pixelate,
    Konva.Filters.Posterize,
    Konva.Filters.Enhance,
    Konva.Filters.Blur
  ]);  
  imageObj.onload = function() {
    // Important
    image.cache();
    // Adding elements
    layer.add(image);
    stage.add(layer);
    // Sliders
    updateSliders(image, layer);
  };  
  layer.addName("cutout")
  addLayer("cutout", imageSource)
  layer.add(tr);
  tr.nodes([image]);
}
var cropLayer = new Konva.Layer();
var cropTool = null;
const addCropLayer = (height, width) => {
  if(cropTool !== null) {
    cropLayer.destroy()
  }
  cropTool = new Konva.Rect({
    x: 0,
    y: 0,
    width: stage.width(),
    height: stage.height(),
    fill:"rgba(63, 63, 63, 0.49)",
    name: "cropRect"
  });
  cropTool.draggable(true);
  cropLayer.add(cropTool);
  stage.add(cropLayer);
  cropTool.draw();
  cropLayer.batchDraw();
  stage.draw();
  tr.nodes([cropTool]);
  tr.zIndex(1)
  tr.draw();
  isCropping = true;
}

const crop = () => {
  stage.width(tr.width())
  stage.height(tr.height())
  stage.draw();
  cropLayer.destroy();
  tr.nodes([]);
  tr.draw()
  isCropping = false;
};
// clicks should select/deselect shapes
stage.on('click tap', function (e) {
  if (e.target === stage) {
    tr.nodes([]);
    layer.draw();
    return;
  }
  
  // do nothing if clicked NOT on our rectangles
  if(e.target.attrs.text !== undefined) {
    tr.nodes([e.target])
    tr.show()
    getSelectedTextNode()
  }

  if(e.target.attrs.image !== undefined) {
    tr.nodes([e.target])
    tr.show()
    getSelected() 
  }
  if(e.target.attrs.name == "background") {
    tr.hide()
  }

  // do we pressed shift or ctrl?
  const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
  const isSelected = tr.nodes().indexOf(e.target) >= 0;

  if (!metaPressed && !isSelected) {
    // if no key pressed and the node is not selected
    // select just one
    tr.nodes([e.target]);
    tr.show()
  } else if (metaPressed && isSelected) {
    // if we pressed keys and node was selected
    // we need to remove it from selection:
    const nodes = tr.nodes().slice(); // use slice to have new copy of array
    // remove node from array
    nodes.splice(nodes.indexOf(e.target), 1);
    tr.nodes(nodes);
    tr.show()
  } else if (metaPressed && !isSelected) {
    // add the node into selection
    const nodes = tr.nodes().concat([e.target]);
    tr.nodes(nodes);
    tr.show()
  }
  var isLocked = $('#'+e.target.parent.attrs.name).draggable('option', 'disabled');
  if(isLocked) {
    const selectedNode = 
    
    tr.nodes()[0];
    const selectedLayer = selectedNode.parent;
    selectedNode.draggable(false)
    selectedNode.draw()
    selectedLayer.batchDraw()
    tr.nodes([])
  }
  else {
    const selectedNode = tr.nodes()[0];
    const selectedLayer = selectedNode.parent;
    selectedNode.draggable(true)
    selectedNode.draw()
    selectedLayer.draw()
  }

  if(e.target.attrs.name == "cropRect" || isCropping) {
    tr.nodes([cropTool]);
    tr.show();
    tr.zIndex(1);
    const selectedNode = tr.nodes()[0];
    const selectedLayer = selectedNode.parent;
    selectedNode.draggable(true)
    selectedNode.draw()
    selectedLayer.draw();
  }

  layer.draw();
});

var isRunningFirstTime = true;
function updateSliders(sourceImage, sourceLayer) {
  sliders.forEach(function(attr) {
    let slider = document.getElementById(attr);
    const update = () => {
      sourceImage.cache()
      //console.log(attr,slider.value);
      if(attr == "red") {
        sourceImage[attr](parseFloat(sourceImage.red()))
        slider.value = sourceImage.red();
      }
      else if(attr == "green") {
        sourceImage[attr](parseFloat(sourceImage.green()))
        slider.value = sourceImage.green();
      }
      else if(attr == "blue") {
        sourceImage[attr](parseFloat(sourceImage.blue()))
        slider.value = sourceImage.blue();
      }
      else if(attr == "alpha") {
        sourceImage[attr](isRunningFirstTime == true ? 0 : parseFloat(sourceImage.alpha()))
        slider.value = sourceImage.alpha();
      }
      else if(attr == "brightness") {
        sourceImage[attr](parseFloat(sourceImage.brightness()))
        slider.value = sourceImage.brightness();
      }
      else if(attr == "enhance") {
        sourceImage[attr](parseFloat(sourceImage.enhance()))
        slider.value = sourceImage.enhance();
      }
      else if(attr == "levels") {
        sourceImage[attr](parseFloat(sourceImage.levels()))
        slider.value = sourceImage.levels();
      }
      else if(attr == "luminance") {
        sourceImage[attr](parseFloat(sourceImage.luminance()))
        slider.value = sourceImage.luminance();
      }
      else if(attr == "saturation") {
        sourceImage[attr](parseFloat(sourceImage.saturation()))
        slider.value = sourceImage.saturation();
      }
      else if(attr == "value") {
        sourceImage[attr](parseFloat(sourceImage.value()))
        slider.value = sourceImage.value();
      }
      else if(attr == "hue") {
        sourceImage[attr](parseFloat(sourceImage.hue()))
        slider.value = sourceImage.hue();
      }
      else if(attr == "blurRadius") {
        sourceImage[attr](parseFloat(sourceImage.blurRadius()))
        slider.value = sourceImage.blurRadius();
      }
      else if(attr == "noise") {
        sourceImage[attr](isRunningFirstTime == true ? 0 : parseFloat(sourceImage.noise()))
        slider.value = sourceImage.noise();
      }
      else if(attr == "pixelSize") {
        sourceImage[attr](isRunningFirstTime == true ? .1 : parseFloat(sourceImage.pixelSize()))
        slider.value = sourceImage.pixelSize();
      }
      sourceLayer.batchDraw();
      //console.log(image);
    };
    update();
  });
  sliders.forEach(function(attr) {
    let slider = document.getElementById(attr);
    const update = () => {
      sourceImage.cache()
      //console.log(attr,slider.value);
      sourceImage[attr](parseFloat(slider.value));
      sourceLayer.batchDraw();
      //console.log(image);
      document.getElementById(attr + '-val').innerText = slider.value;
    };
    slider.oninput = update;
    update();
  });
}

const reset = () => {
    sliderInitials.forEach(function(attr) {
        document.getElementById(attr.slider).value = attr.value;
        let slider = document.getElementById(attr.slider);
        const update = () => {
        //console.log(attr,slider.value);
        image[attr.slider](parseFloat(slider.value));
        layer.batchDraw();
        //console.log(image);
        };       
        update();
    });
}
const setValues = (sliderValues) => {
  sliderValues.forEach(function(attr) {
      document.getElementById(attr.slider).value = attr.value;
      let slider = document.getElementById(attr.slider);
      const update = () => {
      //console.log(attr,slider.value);
      image[attr.slider](parseFloat(slider.value));
      layer.batchDraw();
      //console.log(image);
      };       
      update();
  });
}

var imageSrc = "./assets/testpic.png";
loadImage(imageSrc)


var bgLayer = new Konva.Layer();
var bgImage = null;
$('#imageInput').change((e) => {
  setImage()
});
$('#threeDots').click(() => {
  document.getElementById("popUp").classList.toggle("show")
})
const setImage = (imageSource) => {
  let file = document.querySelector("#imageInput").files[0];
  let reader = new FileReader();
  if (file) {
    fileName = file.name;
    if(imageSource !== undefined) {
      fileName = imageSource;
    }
    reader.readAsDataURL(file);
  }
  let ImageObject = new Image();
  ImageObject.crossOrigin = "Anonymous";
  if(imageSource !== undefined) {
    $('#'+bgImageLayer.attrs.name).remove();
    bgImageLayer.destroyChildren();
    if(bgImageLayer.clear())

    ImageObject.src = imageSource;

    bgImage = new Konva.Image({
      image: ImageObject,
      name: "background"
    });
    bgImage.filters([
      Konva.Filters.RGBA,
      Konva.Filters.Brighten,
      Konva.Filters.HSL,
      Konva.Filters.HSV,
      Konva.Filters.Noise,
      Konva.Filters.Pixelate,
      Konva.Filters.Posterize,
      Konva.Filters.Enhance,
      Konva.Filters.Blur,
    ]);            
    bgImageLayer.addName("bg-image")
    addLayer("bg-image", imageSource)
    bgImage.width(stage.width())
    bgImage.height(stage.height())
    bgImageLayer.add(bgImage);
    bgImageLayer.batchDraw()
    stage.draw();
    setTimeout(() => {
      updateBgSliders()
    }, 2000);
  }
  else {  
    reader.addEventListener(
      "load",
      () => {
        $('#'+bgImageLayer.attrs.name).remove()
        bgImageLayer.destroyChildren();
        if(bgImageLayer.clear())

        ImageObject.src = reader.result;

        bgImage = new Konva.Image({
          image: ImageObject,
          name: "background"
        });
        bgImage.filters([
          Konva.Filters.RGBA,
          Konva.Filters.Brighten,
          Konva.Filters.HSL,
          Konva.Filters.HSV,
          Konva.Filters.Noise,
          Konva.Filters.Pixelate,
          Konva.Filters.Posterize,
          Konva.Filters.Enhance,
          Konva.Filters.Blur,
        ]);            
        bgImageLayer.addName("bg-image")
        addLayer("bg-image", reader.result)
        bgImage.width(stage.width())
        bgImage.height(stage.height())
        bgImageLayer.add(bgImage);
        bgImageLayer.batchDraw()
        stage.draw();
        setTimeout(() => {
          updateBgSliders()
        }, 2000);
      },
      false
    );
  }
}
const changeScale = (value) => {
  if(value == 0) {
    bgImage.width(stage.width())
    bgImage.height(stage.height())
  }
  else if(value == 1) {
    bgImage.width(stage.width())
  }
  else if(value == 2) {
    bgImage.height(stage.height())
  }
  bgImage.draw()
  bgLayer.draw()
}
const setBgImage = (value) => {
  setImage(value)
  console.log(value)
}
function updateBgSliders() {
  bgSliders.forEach(function(attr) {
    let slider = document.getElementById(attr);
    const update = () => {
      bgImage.cache();
      bgImage[attr.slice(2)](parseFloat(slider.value));
      
      bgImageLayer.batchDraw();
      // console.log(attr, slider.value)
      stage.draw()
      //console.log(image);
      $('#'+attr+'-val').text(slider.value)
    };
    slider.oninput = update;
    update();
  });
}

const resetBg = () => {
  bgSliderInitials.forEach(function(attr) {
      document.getElementById(attr.slider).value = attr.value;
      let slider = document.getElementById(attr.slider);
      const update = () => {
      //console.log(attr,slider.value);
      bgImage[attr.slider](parseFloat(slider.value));
      bgImageLayer.batchDraw();
      //console.log(image);
      };       
      update();
  });
}
const changeColor = (value) => {
  var colorCode = value;
  background.fill(colorCode);
  bgLayer.draw()
  stage.draw()
  document.getElementById("color_code").innerText = colorCode;
  $('.pointer.color-picker--color').attr('style', 'background: ' + colorCode)
  $('.color-picker--icon').attr('style', 'background: ' + colorCode)
};

const setStageSize = (wth, ht) => {
  let width = wth;
  let height = ht;
  stage.width(width)
  stage.height(height)
  background.width(stage.width())
  background.height(stage.height())
  if(bgImage != null) {
    bgImage.width(stage.width())
    bgImage.height(stage.height())  
    bgImage.draw()
    bgImageLayer.batchDraw()
  }
  bgLayer.draw()
  stage.draw()
}
const SetSize = () => {
  setStageSize($('#width').val(), $('#height').val())
}
const downloadURI = (uri, name) => {
  let link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
}
const SaveImage = () => {
  let dataURL = stage.toDataURL({ pixelRatio: 3 });
  downloadURI(dataURL, 'magicremove_edited.png');
}
var textSr = 1;
var textLayer = new Konva.Layer();  
const addText = (fontSize) => {
  textLayer.zIndex(image.zIndex() + 1);
  tr.zIndex(stage.children.length - 1)
  stage.add(textLayer);
  var textNode = new Konva.Text({
    text: 'Double Tap to edit text',
    x: 50,
    y: 80,
    fontSize: fontSize,
    draggable: true,
    width: 200
  });

  textLayer.add(textNode);
  textLayer.addName("text-" + textSr)
  addLayer("text-" + textSr)
  textSr++;

  // Essential for all the text objects because it makes the transformer move according to the transformer
  textNode.on('transform', function () {
    // reset scale, so only with is changing by transformer
    textNode.setAttrs({
      width: textNode.width() * textNode.scaleX(),
      scaleX: 1,
    });
  });

  textLayer.draw();

  textNode.on('dblclick', () => {
    // hide text node and transformer:
    textNode.hide();
    tr.hide()
    textLayer.draw();

    // create textarea over canvas with absolute position
    // first we need to find position for textarea
    // how to find it?

    // at first lets find position of text node relative to the stage:
    let textPosition = textNode.absolutePosition();

    // then lets find position of stage container on the page:
    let stageBox = stage.container().getBoundingClientRect();

    // so position of textarea will be the sum of positions above:
    let areaPosition = {
      x: stageBox.left + textPosition.x,
      y: stageBox.top + textPosition.y,
    };

    // create textarea and style it
    let textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    // apply many styles to match text on canvas as close as possible
    // remember that text rendering on canvas and on the textarea can be different
    // and sometimes it is hard to make it 100% the same. But we will try...
    textarea.value = textNode.text();
    textarea.style.position = 'absolute';
    textarea.style.top = areaPosition.y + 'px';
    textarea.style.left = areaPosition.x + 'px';
    textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
    textarea.style.height =
    textNode.height() - textNode.padding() * 2 + 5 + 'px';
    textarea.style.fontSize = textNode.fontSize() + 'px';
    textarea.style.border = 'none';
    textarea.style.padding = '0px';
    textarea.style.margin = '0px';
    textarea.style.overflow = 'hidden';
    textarea.style.background = 'none';
    textarea.style.outline = 'none';
    textarea.style.resize = 'none';
    textarea.style.lineHeight = textNode.lineHeight();
    textarea.style.fontFamily = textNode.fontFamily();
    textarea.style.transformOrigin = 'left top';
    textarea.style.textAlign = textNode.align();
    textarea.style.color = textNode.fill();
    rotation = textNode.rotation();
    let transform = '';
    if (rotation) {
      transform += 'rotateZ(' + rotation + 'deg)';
    }

    let px = 0;
    // also we need to slightly move textarea on firefox
    // because it jumps a bit
    let isFirefox =
      navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (isFirefox) {
      px += 2 + Math.round(textNode.fontSize() / 20);
    }
    transform += 'translateY(-' + px + 'px)';

    textarea.style.transform = transform;

    // reset height
    textarea.style.height = 'auto';
    // after browsers resized it we can set actual value
    textarea.style.height = textarea.scrollHeight + 3 + 'px';

    textarea.focus();

    function removeTextarea() {
      textarea.parentNode.removeChild(textarea);
      window.removeEventListener('click', handleOutsideClick);
      textNode.show();
      tr.show()
      textLayer.draw();
    }

    function setTextareaWidth(newWidth) {
      if (!newWidth) {
        // set width for placeholder
        newWidth = textNode.placeholder.length * textNode.fontSize();
      }
      // some extra fixes on different browsers
      var isSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent
      );
      var isFirefox =
        navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      if (isSafari || isFirefox) {
        newWidth = Math.ceil(newWidth);
      }

      var isEdge =
        document.documentMode || /Edge/.test(navigator.userAgent);
      if (isEdge) {
        newWidth += 1;
      }
      textarea.style.width = newWidth + 'px';
    }

    textarea.addEventListener('keydown', function (e) {
      // hide on enter
      // but don't hide on shift + enter
      if (e.keyCode === 13 && !e.shiftKey) {
        textNode.text(textarea.value);
        textLayer.draw();
        removeTextarea();
      }
      // on esc do not set value back to node
      if (e.keyCode === 27) {
        removeTextarea();
        textLayer.draw();
      }
    });

    textarea.addEventListener('keydown', function (e) {
      scale = textNode.getAbsoluteScale().x;
      setTextareaWidth(textNode.width() * scale);
      textarea.style.height = 'auto';
      textarea.style.height =
        textarea.scrollHeight + textNode.fontSize() + 'px';
    });

    function handleOutsideClick(e) {
      if (e.target !== textarea) {
        textNode.text(textarea.value);
        textLayer.draw();
        removeTextarea();
      }
    }
    setTimeout(() => {
      window.addEventListener('click', handleOutsideClick);
    });
  });
}

$('#add-imageLayer').change((e) => {
  let file = document.querySelector("#add-imageLayer").files[0];
  let reader = new FileReader();
  if (file) {
    fileName = file.name;
    reader.readAsDataURL(file);
  }
  reader.addEventListener(
    "load",
    () => {
      addImage(reader.result)
    },
    false
  );
});

var layerImgSr = 1;
const addImage = (fileUrl) => {
  let layer = new Konva.Layer();
  stage.add(layer);
  let imageObj = new Image();
  imageObj.crossOrigin = "";
  imageObj.src = fileUrl;
  let image = new Konva.Image({
    image: imageObj
  });
  image.width(200); 
  image.height(200);
  image.draggable(true)
  image.filters([
    Konva.Filters.RGBA,
    Konva.Filters.Brighten,
    Konva.Filters.HSL,
    Konva.Filters.HSV,
    Konva.Filters.Noise,
    Konva.Filters.Pixelate,
    Konva.Filters.Posterize,
    Konva.Filters.Enhance,
    Konva.Filters.Blur
  ]);
  layer.add(image)
  layer.addName("layer-image-"+layerImgSr);
  addLayer("layer-image-"+layerImgSr, fileUrl);
  layerImgSr++;
  tr.zIndex(stage.children.length - 1)
  layer.batchDraw();
  stage.draw()
}
const getSelected = () => {
  const selectedNode = tr.nodes()[0];
  const selectedLayer = selectedNode.parent;
  updateSliders(selectedNode, selectedLayer)
}

const invertX = () => {
  const selectedNode = tr.nodes()[0];
  const selectedLayer = selectedNode.parent;
  if(selectedNode.scaleX() > 0) {
    selectedNode.scaleX(-1)
  }
  else {
    selectedNode.scaleX(1)
  }
  selectedNode.draw()
  selectedLayer.batchDraw()
}

const invertY = () => {
  const selectedNode = tr.nodes()[0];
  const selectedLayer = selectedNode.parent;
  if(selectedNode.scaleY() > 0) {
    selectedNode.scaleY(-1)
  }
  else {
    selectedNode.scaleY(1)
  }
  selectedNode.draw()
  selectedLayer.batchDraw()
}

const destroyNode = () => {
  const selectedNode = tr.nodes()[0];
  const selectedLayer = selectedNode.parent;
  $('#'+selectedLayer.attrs.name).remove();
  selectedLayer.destroy();
  tr.nodes([])
  console.log(selectedNode)
}

const getSelectedTextNode = () => {
  const selectedNode = tr.nodes()[0];
  const selectedLayer = selectedNode.parent;
  changeFont(selectedNode, $('.scaleSelect'), selectedLayer)
}

const triggerChangeFont = (e) => {
  const selectedNode = tr.nodes()[0];
  const selectedLayer = selectedNode.parent;
  changeFont(selectedNode, $(e), selectedLayer)
}
const changeStyle = (e,variant) => {
  const selectedNode = tr.nodes()[0];
  const selectedLayer = selectedNode.parent;
  if(variant === "underline") {
    if(selectedNode.textDecoration().toString().includes(variant)) {
      selectedNode.textDecoration(selectedNode.textDecoration().replace(variant, ''))
    }
    else {
      selectedNode.textDecoration(variant);
    }
  }
  else {
    if(selectedNode.fontStyle().toString().includes(variant)) {
      selectedNode.fontStyle(selectedNode.fontStyle().replace(variant, ''))
    }
    else {
      selectedNode.fontStyle(selectedNode.fontStyle() + " " + variant);
    }
  }
  selectedNode.draw()
  selectedLayer.draw()
  e.classList.toggle('active')
}
const changeAlign = (e,variant) => {
  const selectedNode = tr.nodes()[0];
  const selectedLayer = selectedNode.parent;
  selectedNode.align(variant);
  selectedNode.draw()
  selectedLayer.draw()
  e.classList.toggle('active')
}
function reportWindowSize() {
  if(window.innerWidth < 768) {
    stage.width(300)
    stage.height(240)
    background.width(stage.width())
    background.height(stage.height())
    bgLayer.draw()
    stage.draw()
  }
  else {
    stage.width(740)
    stage.height(420)
    background.width(stage.width())
    background.height(stage.height())
    bgLayer.draw()
    stage.draw()    
  }
}

window.onresize = reportWindowSize;
const changeFont = (textNode, obj, textLayer) => {
  let font = obj.val();
  textNode.fontFamily(font);
  textLayer.draw()
}
let enabled = false
const isShadowEnabled = (e) => {
  const selectedNode = tr.nodes()[0];
  const selectedLayer = selectedNode.parent;
  selectedNode.shadowEnabled(!enabled);
  selectedNode.draw()
  selectedLayer.draw()
}
const shadowColorChanged = (e) => {
  const selectedNode = tr.nodes()[0];
  const selectedLayer = selectedNode.parent;
  selectedNode.shadowColor(e.value);
  selectedNode.draw()
  selectedLayer.draw()
}
const textColorChanged = (e) => {
  const selectedNode = tr.nodes()[0];
  const selectedLayer = selectedNode.parent;
  selectedNode.fill(e.value);
  selectedNode.draw()
  selectedLayer.draw()
  document.getElementById("textColor").innerText = e.value;
}
const shadowBlurChanged = (e) => {
  const selectedNode = tr.nodes()[0];
  const selectedLayer = selectedNode.parent;
  selectedNode.shadowBlur(e.value);
  selectedNode.draw()
  selectedLayer.draw()
}

const shadowOpacityChanged = (e) => {
  const selectedNode = tr.nodes()[0];
  const selectedLayer = selectedNode.parent;
  selectedNode.shadowOpacity(e.value);
  selectedNode.draw()
  selectedLayer.draw()
}

const shadowOffSetXChanged = (e) => {
  const selectedNode = tr.nodes()[0];
  const selectedLayer = selectedNode.parent;
  selectedNode.shadowOffsetX(e.value);
  selectedNode.draw()
  selectedLayer.draw()
}

const shadowOffSetYChanged = (e) => {
  const selectedNode = tr.nodes()[0];
  const selectedLayer = selectedNode.parent;
  selectedNode.shadowOffsetY(e.value);
  selectedNode.draw()
  selectedLayer.draw()
}
makeLayerDraggable()

// This is for zooming canvas.
let scaleBy = 1.02;
stage.on('wheel', (e) => {
  e.evt.preventDefault();
  var oldScale = stage.scaleX();

  var pointer = stage.getPointerPosition();

  var mousePointTo = {
    x: (pointer.x - stage.x()) / oldScale,
    y: (pointer.y - stage.y()) / oldScale,
  };

  var newScale =
    e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
  stage.scale({ x: newScale, y: newScale });
  var newPos = {
    x: pointer.x - mousePointTo.x * newScale,
    y: pointer.y - mousePointTo.y * newScale,
  };
  stage.position(newPos);
  stage.batchDraw();
});

let zoomPositive = 1.00;
let x = 388.609375;
let y = 209.125;
const zoomIn = () => {
  var oldScale = stage.scaleX();

  var pointer = stage.getPointerPosition();

  var mousePointTo = {
    x: (x - stage.x()) / oldScale,
    y: (y - stage.y()) / oldScale,
  };

  var newScale =
    zoomPositive > 0 ? oldScale * scaleBy : oldScale / scaleBy;

  stage.scale({ x: newScale, y: newScale });

  var newPos = {
    x: x - mousePointTo.x * newScale,
    y: y - mousePointTo.y * newScale,
  };
  stage.position(newPos);
  stage.batchDraw();
}

let zoomNegative = -1.00;
const zoomOut = () => {
  var oldScale = stage.scaleX();

  var pointer = stage.getPointerPosition();

  var mousePointTo = {
    x: (x - stage.x()) / oldScale,
    y: (y - stage.y()) / oldScale,
  };

  var newScale =
    zoomNegative > 0 ? oldScale * scaleBy : oldScale / scaleBy;

  stage.scale({ x: newScale, y: newScale });

  var newPos = {
    x: x - mousePointTo.x * newScale,
    y: y - mousePointTo.y * newScale,
  };
  stage.position(newPos);
  stage.batchDraw();
}

const cancelCrop = () => {
  if(cropTool != null) {
    cropLayer.destroy();
    isCropping = false;
    tr.nodes([]);
    tr.draw();
  }
}

let circleCropLayer = new Konva.Layer({draggable: false});
let newRect = null;
let croppingRect = null;
var posStart;
var posNow;
var mode = '';
function startDrag(posIn){
  posStart = {x: posIn.x, y: posIn.y};
  posNow = {x: posIn.x, y: posIn.y};
}

function updateDrag(posIn){ 
  // update rubber rect position
  posNow = {x: posIn.x, y: posIn.y};
  var posRect = reverse(posStart,posNow);
  croppingRect.x(posRect.x1);
  croppingRect.y(posRect.y1);
  croppingRect.width(posRect.x2 - posRect.x1);
  croppingRect.height(posRect.y2 - posRect.y1);
  croppingRect.visible(true);  
   
  stage.draw(); // redraw any changes. 
}

function updateDragStar(posIn){ 
  // update rubber rect position
  posNow = {x: posIn.x, y: posIn.y};
  var posRect = reverse(posStart,posNow);
  croppingRect.x(posRect.x1);
  croppingRect.y(posRect.y1);
  croppingRect.innerRadius(posRect.x2 - posRect.x1);
  croppingRect.outerRadius(posRect.y2 - posRect.y1);
  croppingRect.visible(true);
  stage.draw(); // redraw any changes. 
}

function updateDragCircle(posIn){ 
  // update rubber rect position
  posNow = {x: posIn.x, y: posIn.y};
  var posRect = reverse(posStart,posNow);
  croppingRect.x(posRect.x1);
  croppingRect.y(posRect.y1);
  croppingRect.visible(true);
  croppingRect.radius(Math.abs(posIn.x - posIn.y))
  stage.draw(); // redraw any changes. 
}


function reverse(r1, r2){
  var r1x = r1.x, r1y = r1.y, r2x = r2.x,  r2y = r2.y, d;
  if (r1x > r2x ){
    d = Math.abs(r1x - r2x);
    console.log(d)
    r1x = r2x; r2x = r1x + d;
  }
  if (r1y > r2y ){
    d = Math.abs(r1y - r2y);
    console.log(d)
    r1y = r2y; r2y = r1y + d;
  }
    return ({x1: r1x, y1: r1y, x2: r2x, y2: r2y}); // return the corrected rect.     
}

var shapeColor = '#000000'
const shapeColorChanged = (value) => {
  shapeColor = value;
  $('#shapeColor').css('background-color', value);
  $('#shapeColorTxt').text(value);
}


const prepareDrawSquare = () => {
  stage.add(circleCropLayer);
  newRect = new Konva.Rect({x: 0, y: 0, width: stage.width(), height: stage.height(), fill: 'transparent'});
  circleCropLayer.add(newRect);
  croppingRect = new Konva.Rect({x: 0, y: 0, width: 0, height: 0, stroke: 'red', dash: [2,2]});
  croppingRect.listening(false);
  circleCropLayer.add(croppingRect);
  stage.draw();
  newRect.on('mousedown', function(e){ 
    mode = 'drawing';
    startDrag({x: e.evt.layerX, y: e.evt.layerY})
    })
  
  // update the rubber rect on mouse move - note use of 'mode' var to avoid drawing after mouse released.
  newRect.on('mousemove', function(e){ 
      if (mode === 'drawing'){
        updateDrag({x: e.evt.layerX, y: e.evt.layerY})
      }
  })
  
  newRect.on('mouseup', function(e){ 
    mode = '';
    croppingRect.visible(false);
    var rect = new Konva.Rect({
      x: croppingRect.x(),
      y: croppingRect.y(),
      width: croppingRect.width(),
      height: croppingRect.height(),
      fill: shapeColor,
      listening: false
    })
    circleCropLayer.add(rect);
    stage.draw();
  })
}

const prepareDrawTriangle = () => {
  stage.add(circleCropLayer);
  newRect = new Konva.Rect({x: 0, y: 0, width: stage.width(), height: stage.height(), fill: 'transparent'});
  circleCropLayer.add(newRect);
  croppingRect = new Konva.Shape({sceneFunc: function (context, shape) {
    context.beginPath();
    context.moveTo(20, 50);
    context.lineTo(220, 80);
    context.quadraticCurveTo(150, 100, 260, 170);
    context.closePath();

    // (!) Konva specific method, it is very important
    context.fillStrokeShape(shape);
  }, stroke: 'red', dash: [2,2]});
  croppingRect.listening(false);
  circleCropLayer.add(croppingRect);
  stage.draw();
  newRect.on('mousedown', function(e){ 
    mode = 'drawing';
    startDrag({x: e.evt.layerX, y: e.evt.layerY})
    })
  
  // update the rubber rect on mouse move - note use of 'mode' var to avoid drawing after mouse released.
  newRect.on('mousemove', function(e){ 
      if (mode === 'drawing'){
        updateDrag({x: e.evt.layerX, y: e.evt.layerY})
      }
  })
  
  newRect.on('mouseup', function(e){ 
    mode = '';
    croppingRect.visible(false);
    var rect = new Konva.Rect({
      sceneFunc: function (context, shape) {
        context.beginPath();
        context.moveTo(20, 50);
        context.lineTo(220, 80);
        context.closePath();
    
        // (!) Konva specific method, it is very important
        context.fillStrokeShape(shape);
      },
      fill: shapeColor,
      listening: false
    })
    circleCropLayer.add(rect);
    stage.draw();
  })
}

const prepareDrawCircle = () => {
  stage.add(circleCropLayer);
  newRect = new Konva.Rect({x: 0, y: 0, width: stage.width(), height: stage.height(), fill: 'transparent'});
  circleCropLayer.add(newRect);
  croppingRect = new Konva.Circle({x: 0, y: 0, radius: 0, stroke: 'red', dash: [2,2]});
  croppingRect.listening(false);
  circleCropLayer.add(croppingRect);
  stage.draw();
  newRect.on('mousedown', function(e){ 
    mode = 'drawing';
    startDrag({x: e.evt.layerX, y: e.evt.layerY})
    })
  
  // update the rubber rect on mouse move - note use of 'mode' var to avoid drawing after mouse released.
  newRect.on('mousemove', function(e){ 
      if (mode === 'drawing'){
        updateDragCircle({x: e.evt.layerX, y: e.evt.layerY})
      }
  })
  
  newRect.on('mouseup', function(e){ 
    mode = '';
    croppingRect.visible(false);
    var rect = new Konva.Circle({
      x: croppingRect.x(),
      y: croppingRect.y(),
      radius: croppingRect.radius(),
      fill: shapeColor,
      listening: false
    })
    circleCropLayer.add(rect);
    stage.draw();
  })
}

const prepareDrawStar = () => {
  stage.add(circleCropLayer);
  newRect = new Konva.Rect({x: 0, y: 0, width: stage.width(), height: stage.height(), fill: 'transparent'});
  circleCropLayer.add(newRect);
  croppingRect = new Konva.Star({x: 0,
    y: 0,
    numPoints: 5,
    innerRadius: 0,
    outerRadius: 0, stroke: 'red', dash: [2,2]});
  croppingRect.listening(false);
  circleCropLayer.add(croppingRect);
  stage.draw();
  newRect.on('mousedown', function(e){ 
    mode = 'drawing';
    startDrag({x: e.evt.layerX, y: e.evt.layerY})
    })
  
  // update the rubber rect on mouse move - note use of 'mode' var to avoid drawing after mouse released.
  newRect.on('mousemove', function(e){ 
      if (mode === 'drawing'){
        updateDragStar({x: e.evt.layerX, y: e.evt.layerY})
      }
  })
  
  newRect.on('mouseup', function(e){ 
    mode = '';
    croppingRect.visible(false);
    var rect = new Konva.Star({
      x: croppingRect.x(),
      y: croppingRect.y(),
      width: croppingRect.innerRadius(),
      height: croppingRect.outerRadius(),
      fill: shapeColor,
      listening: false
    })
    circleCropLayer.add(rect);
    stage.draw();
  })
}

var strokeSize = 4;
const StrokeSizeChanged = (value) => {
  strokeSize = value;
  $('#brushSizeTxt').text(value)
}
const prepareFreeDrawing = () => {
  var drawingLayer = new Konva.Layer({draggable: false});
  stage.add(drawingLayer);
  var r = new Konva.Rect({x:0, y: 0,  width: stage.width(), height: stage.height(), fill: 'transparent', opacity: 0.1})
  drawingLayer.add(r);
  stage.draw();

  var drawingLine = null; // handle to the line we are drawing
  var isPaint = false; // flag to indicate we are painting
  r.on('mousedown touchstart', function () {
    isPaint = true;
    var pos = stage.getPointerPosition();
    drawingLine = newLine(pos.x, pos.y);
    drawingLine.points(drawingLine.points().concat(pos.x,pos.y)); 
    drawingLayer.draw();
  });

  stage.on('mouseup touchend', function () {
    isPaint = false;
    drawingLine = null;
  });
  
  r.on('mousemove touchmove', function () {
    if (!isPaint) {
      return;
    }
  
    var pos = stage.getPointerPosition();
    drawingLine.points(drawingLine.points().concat(pos.x,pos.y)); 
    drawingLayer.draw();  
  })

  function newLine(x,y){
    var line = new Konva.Line({
        points: [x,y,x,y],
        stroke: shapeColor,
        strokeWidth: strokeSize,
        lineCap: 'round',
        lineJoin: 'round'
      });
      
    drawingLayer.add(line)
    return line;
  }
}

const squareCrop = () => {
  stage.add(circleCropLayer);
  newRect = new Konva.Rect({x: 0, y: 0, width: stage.width(), height: stage.height(), fill: 'transparent'});
  circleCropLayer.add(newRect);
  croppingRect = new Konva.Rect({x: 0, y: 0, width: 0, height: 0, stroke: 'red', dash: [2,2]});
  croppingRect.listening(false);
  circleCropLayer.add(croppingRect);
  stage.draw();
  newRect.on('mousedown', function(e){ 
    mode = 'drawing';
    startDrag({x: e.evt.layerX, y: e.evt.layerY})
    })
  
  // update the rubber rect on mouse move - note use of 'mode' var to avoid drawing after mouse released.
  newRect.on('mousemove', function(e){ 
      if (mode === 'drawing'){
        updateDrag({x: e.evt.layerX, y: e.evt.layerY})
      }
  })
  
  newRect.on('mouseup', function(e){ 
    mode = '';
    croppingRect.visible(false);
    stage.x(croppingRect.x())
    stage.y(croppingRect.y())
    stage.width(croppingRect.width())
    stage.height(croppingRect.height())
    stage.draw();
    circleCropLayer.destroy();
  })
}

const circleCrop = () => {
  stage.add(circleCropLayer);
  newRect = new Konva.Rect({x: 0, y: 0, width: stage.width(), height: stage.height(), fill: 'transparent'});
  circleCropLayer.add(newRect);
  croppingRect = new Konva.Rect({x: 0, y: 0, width: 0, height: 0, stroke: 'red', dash: [2,2]});
  croppingRect.listening(false);
  circleCropLayer.add(croppingRect);
  stage.draw();
  newRect.on('mousedown', function(e){ 
    mode = 'drawing';
    startDrag({x: e.evt.layerX, y: e.evt.layerY})
    })
  
  // update the rubber rect on mouse move - note use of 'mode' var to avoid drawing after mouse released.
  newRect.on('mousemove', function(e){ 
      if (mode === 'drawing'){
        updateDrag({x: e.evt.layerX, y: e.evt.layerY})
      }
  })
  
  newRect.on('mouseup', function(e){ 
    mode = '';
    croppingRect.visible(false);
    stage.x(croppingRect.x())
    console.log(stage.x(), croppingRect.x())
    stage.y(croppingRect.y())
    stage.width(croppingRect.width())
    stage.height(croppingRect.height())
    stage.draw();
    circleCropLayer.destroy();
  })
}

