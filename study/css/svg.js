(function(){
  "use strict";
  
  function createDF(){
      return document.createDocumentFragment();
  }
  function createSvg(id){
    var svg = document.createElementNS(xmlns, 'svg');
    svg.id=id;
    return svg;
  }

  function _drawLine(id, x1, y1, x2, y2, color){
    var line = document.createElementNS(xmlns, 'line');
    line.id = id;
    line.setAttributeNS(null, 'x1', x1);
    line.setAttributeNS(null, 'y1', y1);
    line.setAttributeNS(null, 'x2', x2);
    line.setAttributeNS(null, 'y2', y2);
    line.setAttributeNS(null, 'stroke', color)
    line.setAttributeNS(null, 'fill', color)
    return line;
  }
  function Line(id, wrapper, startPoint){
      this.wrapper = wrapper;
      this.startPoint = startPoint;
      this.endPoint = startPoint;
      this.$line = _drawLine(id, startPoint.x, startPoint.y, startPoint.x, startPoint.y, "black");
      wrapper.appendChild(this.$line);
  }
  Line.prototype.updateView = function(){
    this.$line.setAttributeNS(null, 'x1', this.startPoint.x);
    this.$line.setAttributeNS(null, 'y1', this.startPoint.y);
    this.$line.setAttributeNS(null, 'x2', this.endPoint.x);
    this.$line.setAttributeNS(null, 'y2', this.endPoint.y);
  }

  Line.prototype.destroy = function(){}

  Line.prototype.draw = function(x, y){
      this.endPoint = {
        x: x,
        y: y
      };
      this.updateView();
  }
  Line.prototype.move = function(movementX, movementY){
    this.startPoint.x += movementX;
    this.startPoint.y += movementY;
    this.endPoint.x += movementX;
    this.endPoint.y += movementY;
    this.updateView();
  }

  function _drawRect(id, x, y, width, height, color){
    var rect = document.createElementNS(xmlns, 'rect');
    rect.id = id;
    rect.setAttributeNS(null, 'x', x);
    rect.setAttributeNS(null, 'y', y);
    rect.setAttributeNS(null, 'width', width);
    rect.setAttributeNS(null, 'height', height);
    rect.setAttributeNS(null, 'stroke', color);
    rect.setAttributeNS(null, 'fill', 'transparent');
    return rect;
  }

  function Rect(id, wrapper, startPoint){
      this.wrapper = wrapper;
      this.startPoint = startPoint;
      this.$rect = _drawRect(id, startPoint.x, startPoint.y, 0, 0, 'black');
      wrapper.appendChild(this.$rect);
    }

  Rect.prototype.draw = function(x, y){
    this.$rect.setAttributeNS(null, 'width', Math.abs(x - this.startPoint.x));
      this.$rect.setAttributeNS(null, 'height', Math.abs(y - this.startPoint.y));
  };

  Rect.prototype.move = function(movementX, movementY){
    this.startPoint.x += movementX;
    this.startPoint.y += movementY;
    this.$rect.setAttributeNS(null, 'x', this.startPoint.x);
    this.$rect.setAttributeNS(null, 'y', this.startPoint.y);
  };

  var Select = function(){
    this.targetShape = null;
  };

  Select.prototype.initTarget = function(target){
    this.targetShape = target;
  }

  Select.prototype.move = function(movementX, movementY){
    this.targetShape && this.targetShape.move(movementX, movementY);
  }

  function getId(type){
    return (type ? type : '_') + Date.now();
  }

  var drawShape = {
    select: new Select(),
    line: Line,
    rect: Rect
  }

  var xmlns = "http://www.w3.org/2000/svg";
  var commandObj = {
      select: 'select',
      line: 'line',
      rect: 'rect'
  };
  var container = {};

  var currCommand = commandObj.select;
  var readyToMove = false;
  var lineProperties = ['x', 'y', 'width', 'height', 'stroke', 'stroke-width', 'fill'];
  var rectProperties =['x','y', 'rx', 'ry', 'width', 'height', 'stroke', 'stroke-width', 'fill'];
  var mouseDownPos = null;

  var SvgManager = function(bg){
    this.bg = bg;
    this.currShape = null;
    this.initEvent();
  };
  
  function mouseupHandle(e){
     this.reset();
  }
  function mousedownHandle(e){
    if(currCommand === commandObj.select){
      if(container[e.target.id]){
        readyToMove = true;
        drawShape.select.initTarget(container[e.target.id]);
      }
    } else{
      mouseDownPos = {
        x: e.offsetX,
        y: e.offsetY
      };
    }    
  }

  function mousemoveHandle(e){
      if(currCommand !== commandObj.select && mouseDownPos) {
        if(undefined === drawShape[currCommand]) return;
        if(!this.currShape){
          var id = getId();
          this.currShape = new drawShape[currCommand](id, this.bg, mouseDownPos);
          container[id] = this.currShape;
        }
        this.currShape.draw(e.offsetX, e.offsetY);
        return;
      }
      if(currCommand === commandObj.select && readyToMove){
        drawShape.select.move(e.movementX, e.movementY);
      }
  }
  function clickHandle(e){
     
  }


  SvgManager.prototype.initEvent = function(){
    // add event
    this.bg.addEventListener('mousedown', mousedownHandle.bind(this));
    this.bg.addEventListener('mouseup', mouseupHandle.bind(this));
    this.bg.addEventListener('mousemove', mousemoveHandle.bind(this));
    this.bg.addEventListener('click', clickHandle.bind(this));
  };
  SvgManager.prototype.reset = function(){
    mouseDownPos = null;
    readyToMove = false;
    this.currShape = null;
  }

  SvgManager.prototype.switch = function(newCommand){
    if(undefined === commandObj[newCommand]) return;
    currCommand = newCommand;
    this.reset();
  }

  window.SvgManager = SvgManager;
})();