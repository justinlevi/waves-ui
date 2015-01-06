'use strict';

var Layer = require('layer');
var accessors = (uniqueId = require('utils')).accessors, uniqueId = uniqueId.uniqueId;

var SegmentVis = (function(super$0){var DP$0 = Object.defineProperty;var MIXIN$0 = function(t,s){for(var p in s){if(s.hasOwnProperty(p)){DP$0(t,p,Object.getOwnPropertyDescriptor(s,p));}}return t};MIXIN$0(SegmentVis, super$0);

  function SegmentVis() {
    if (!(this instanceof SegmentVis)) return new SegmentVis();

    super$0.call(this);
    // set layer defaults
    this.params({ 
      type: 'segment', 
      opacity: 1 
    });

    this.__minWidth = 1;
    
    // initialize data accessors
    this.y(function(d) {var v = arguments[1];if(v === void 0)v = null;
      if (v === null) return +d.y || 0;
      d.y = (+v);
    });

    this.height(function(d) {var v = arguments[1];if(v === void 0)v = null;
      if (v === null) return +d.height || 1;
      d.height = (+v);
    });

    this.duration(function(d) {var v = arguments[1];if(v === void 0)v = null;
      if (v === null) return +d.duration || 1;
      d.duration = (+v);
    });

    this.start(function(d) {var v = arguments[1];if(v === void 0)v = null;
      if (v === null) return +d.start || 0;
      d.start = (+v);
    });

    this.color(function(d) {var v = arguments[1];if(v === void 0)v = null;
      if (v === null) return d.color ? d.color + '' : '#000000';
      d.color = v + '';
    });

    this.opacity(function(d) {var v = arguments[1];if(v === void 0)v = null;
      if (v === null) return d.opacity;
      d.opacity = v + '';
    });
  }SegmentVis.prototype = Object.create(super$0.prototype, {"constructor": {"value": SegmentVis, "configurable": true, "writable": true} });DP$0(SegmentVis, "prototype", {"configurable": false, "enumerable": false, "writable": false});


  SegmentVis.prototype.update = function(data) {
    super$0.prototype.update.call(this, data);

    var sel = this.g.selectAll('.' + this.param('unitClass'))
      .data(this.data(), this.sortIndex());

    this.items = sel.enter()
      .append('g')
      .classed('item', true)
      .classed(this.param('unitClass'), true);

    this.items.append('rect');

    if (this.params('interaction').editable) {
      this.items.append('line')
        .attr('class', 'handle left')
        .attr('stroke-width', this.param('handlerWidth'))
        .attr('stroke-opacity', this.param('handlerOpacity'));

      this.items.append('line')
        .attr('class', 'handle right')
        .attr('stroke-width', this.param('handlerWidth'))
        .attr('stroke-opacity', this.param('handlerOpacity'));
    }
    
    sel.exit().remove();
  }

  SegmentVis.prototype.draw = function() {var el = arguments[0];if(el === void 0)el = null;
    el = el || this.items; 

    var accessors = this.getAccessors();


    el.attr('transform', function(d)  {
      return 'translate(' + accessors.x(d) + ', ' + accessors.y(d) + ')';
    });

    el.selectAll('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', accessors.w)
      .attr('height', accessors.h)
      .attr('fill', accessors.color)
      .attr('fill-opacity', accessors.opacity);

    if (!!this.each()) { el.each(this.each()); }

    if (this.params('interaction').editable) {

      var _handlerWidth = parseInt(this.param('handlerWidth'), 10);
      var _halfHandler = _handlerWidth * 0.5;

      el.selectAll('.handle.left')
        .attr('x1', _halfHandler)
        .attr('x2', _halfHandler)
        .attr('y1', 0)
        .attr('y2', accessors.h)
        .style('stroke', accessors.color);

      el.selectAll('.handle.right')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', 0)
        .attr('y2', accessors.h)
        .attr('transform', function(d)  { 
          return 'translate(' + accessors.rhx(d) + ', 0)'; 
        })
        .style('stroke', accessors.color);
    }

  }

  // @NOTE add some caching system ?
  SegmentVis.prototype.getAccessors = function() {var this$0 = this;
    // reverse yScale to have logical sizes
    // only y is problematic this way
    var xScale = this.base.xScale;
    var yScale = this.yScale.copy();
    yScale.range(yScale.range().slice(0).reverse());
    var height = yScale.range()[1];

    var _x = this.start();
    var _y = this.y();
    var _w = this.duration();
    var _h = this.height();

    var _color    = this.color();
    var _opacity  = this.opacity();

    // define accesors
    var x = function(d)  { return xScale(_x(d)); };
    var w = function(d)  { return xScale(_w(d)); };
    var h = function(d)  { return yScale(_h(d)); };
    var y = function(d)  { return height - h(d) - yScale(_y(d)); };

    var color = function(d)  { return _color(d); };
    var opacity = function(d)  { return (_opacity(d) || this$0.param('opacity')); };

    var _handlerWidth = parseInt(this.param('handlerWidth'), 10);
    var _halfHandler = _handlerWidth * 0.5;

    // handler positions
    // var hh  = (d) => { return accessors.y(d) + accessors.h(d); }
    // var lhx = (d) => { return accessors.x(d) + _halfHandler; }
    var rhx = function(d)  {
      var width = accessors.w(d);

      return (width < (_handlerWidth * 2)) ?
        _handlerWidth + this$0.__minWidth : width - _halfHandler;
    };
    
    return { w: w, h: h, x: x, y: y, color: color, opacity: opacity, xScale: xScale, yScale: yScale, rhx: rhx };
  }

  SegmentVis.prototype.xZoom = function(val) {
    // console.log(this.xBaseDomain);
    // console.log('zooom');
    var that = this;
    var xScale = this.base.xScale;
    var min = xScale.domain()[0],
        max = xScale.domain()[1];

    var newData = [];

    this.data().forEach(function(d, i) {
      var start = that.start()(d);
      var duration = that.duration()(d);
      var end = start + duration;
      // if((start + dv.duration(d)) <= max && start >= min) nuData.push(d);
      if (
        (start > min && end < max) || 
        (start < min && end < max && end > min) || 
        (start > min && start < max && end > max) || 
        (end > max && start < min)
      ) {
        newData.push(d);
      }
      // if((end < min && start < min) || (end > max && start > max)) nuData.push(d);
    });

    // this.update(nuData);
    this.update();
    // var xAxis = this.graph[this.iName];
    // xAxis.scale(xScale);

    // this.g.call(xAxis);
  }

  // logic performed to select an item from the brush
  SegmentVis.prototype.handleBrush = function(extent, e) {
  // brushItem(extent, mode) {
    /*
    mode = mode || 'xy'; // default tries to match both

    var modeX = mode.indexOf('x') >= 0;
    var modeY = mode.indexOf('y') >= 0;
    var matchX = false, matchY = false;

    // data mappers
    var start = this.start();
    var duration = this.duration();
    var y = this.y();
    var height = this.height();

    this.g.selectAll('.selectable').classed('selected', (d, i) => {
      // var offsetTop = (that.top() || 0) + (that.base.margin().top || 0);
      // var offsetLeft = (that.left || 0) + (that.base.margin().left || 0);

      // X match
      if (modeX) {
        var x1 = start(d);
        var x2 = x1 + duration(d);
        //            begining sel               end sel
        var matchX1 = extent[0][0] <= x1 && x2 < extent[1][0];
        var matchX2 = extent[0][0] <= x2 && x1 < extent[1][0];

        matchX = (matchX1 || matchX2);
      } else {
        matchX = true;
      }

      // Y match
      if (modeY) {
        var y1 = y(d);
        var y2 = y1 + height(d);
        //            begining sel               end sel
        var matchY1 = extent[0][1] <= y1 && y2 < extent[1][1];
        var matchY2 = extent[0][1] <= y2 && y1 <= extent[1][1];

        matchY = (matchY1 || matchY2);
      } else {
        matchY = true;
      }

      return matchX && matchY;
    });
    */
  }

  SegmentVis.prototype.handleDrag = function(item, e) {
    if (item === null) { return; }

    var classList = e.target.classList;
    var mode = 'move';
    // if the target is an handler
    if (classList.contains('left')) { mode = 'resizeLeft'; }
    if (classList.contains('right')) { mode = 'resizeRight'; }

    this[mode](item, e.originalEvent.dx, e.originalEvent.dy);
  }

  SegmentVis.prototype.move = function(item, dx, dy) {
    item = this.d3.select(item);
    var datum = item.datum();
    // define constrains
    var constrains = this.param('edits');
    var canX = !!~constrains.indexOf('x');
    var canY = !!~constrains.indexOf('y');
    // early return if cannot edit x and y
    if (!canX && !canY) { return; }
    // else lock the corresponding axis
    if (!canX) { dx = 0; }
    if (!canY) { dy = 0; }

    var accessors = this.getAccessors();

    var xScale = accessors.xScale;
    var yScale = accessors.yScale;
    var xRange = xScale.range();
    var yRange = yScale.range();

    var x = accessors.x(datum);
    var w = accessors.w(datum);
    var h = accessors.h(datum);
    var y = yScale(this.y()(datum));

    // handle x position - lock to boundaries
    var targetX = x + dx;
    if (targetX >= xRange[0] && (targetX + w) <= xRange[1]) {
      x = targetX;
    } else if (targetX < xRange[0]) {
      x = xRange[0];
    } else if ((targetX + w) > xRange[1]) {
      x = xRange[1] - w;
    }

    // handle y position - lock to boundaries
    var targetY = y - dy;
    var yDisplayed = yRange[1] - h - targetY;

    if (yDisplayed >= yRange[0] && (yDisplayed + h) <= yRange[1]) {
      y = targetY;
    } else if (yDisplayed < yRange[0]) {
      y = yRange[1] - h;
    } else if ((yDisplayed + h) > yRange[1]) {
      y = yRange[0];
    }

    var xValue = xScale.invert(x);
    var yValue = yScale.invert(y);

    this.start()(datum, xValue);
    this.y()(datum, yValue);

    this.draw(item);
  }

  SegmentVis.prototype.resizeLeft = function(item, dx, dy) {
    item = this.d3.select(item);
    var datum = item.datum();

    var constrains = this.param('edits');
    var canW = !!~constrains.indexOf('width');
    // early return if cannot edit    
    if (!canW) { return; }

    var accessors = this.getAccessors();
    var xRange = accessors.xScale.range();

    var x = accessors.x(datum);
    var w = accessors.w(datum);

    var targetX = x + dx;
    var targetW = w - dx;

    if (targetX >= xRange[0] && targetW >= this.__minWidth) {
      x = targetX;
      w = targetW;
    }

    var xValue = accessors.xScale.invert(x);
    var wValue = accessors.xScale.invert(w);

    this.start()(datum, xValue);
    this.duration()(datum, wValue);

    this.draw(item);
  }

  SegmentVis.prototype.resizeRight = function(item, dx, dy) {
    item = this.d3.select(item);
    var datum = item.datum();

    var constrains = this.param('edits');
    var canW = !!~constrains.indexOf('width');
    // early return if cannot edit
    if (!canW) { return; }

    var accessors = this.getAccessors();
    var xRange = accessors.xScale.range();

    var x = accessors.x(datum);
    var w = accessors.w(datum);

    var targetW = w + dx;

    if (targetW >= this.__minWidth && (x + targetW) <= xRange[1]) {
      w = targetW;
    }

    var wValue = accessors.xScale.invert(w);
    this.duration()(datum, wValue);

    this.draw(item);
  }

;return SegmentVis;})(Layer);

// add and initialize our accessors
accessors.getFunction(SegmentVis.prototype, [
  'y', 'width', 'color', 'height', 'duration', 'start', 'sortIndex', 'opacity'
]);

module.exports = SegmentVis;
