"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var BaseShape = require("./base-shape");

var Marker = (function (_BaseShape) {
  function Marker() {
    _classCallCheck(this, Marker);

    if (_BaseShape != null) {
      _BaseShape.apply(this, arguments);
    }
  }

  _inherits(Marker, _BaseShape);

  _createClass(Marker, {
    _getAccessorList: {
      value: function _getAccessorList() {
        return { x: 0, color: "#000000" };
      }
    },
    _getDefaults: {
      value: function _getDefaults() {
        return {
          handlerWidth: 7,
          handlerHeight: 10
        };
      }
    },
    render: {
      value: function render(renderingContext) {
        if (this.shape) {
          return this.shape;
        }

        var height = renderingContext.height;

        this.shape = document.createElementNS(this.ns, "g");
        this.line = document.createElementNS(this.ns, "rect");
        this.handler = document.createElementNS(this.ns, "rect");

        // draw line
        this.line.setAttributeNS(null, "x", 0);
        this.line.setAttributeNS(null, "y", 0);
        this.line.setAttributeNS(null, "width", 1);
        this.line.setAttributeNS(null, "height", height);
        this.line.setAttributeNS(null, "shape-rendering", "crispEdges");

        this.handler.setAttributeNS(null, "x", -((this.params.handlerWidth - 1) / 2));
        this.handler.setAttributeNS(null, "y", renderingContext.height - this.params.handlerHeight);
        this.handler.setAttributeNS(null, "width", this.params.handlerWidth);
        this.handler.setAttributeNS(null, "height", this.params.handlerHeight);
        this.handler.setAttributeNS(null, "shape-rendering", "crispEdges");

        this.shape.appendChild(this.line);
        this.shape.appendChild(this.handler);

        return this.shape;
      }
    },
    update: {
      value: function update(renderingContext, group, datum, index) {
        var x = renderingContext.xScale(this.x(datum));
        var color = this.color(datum);

        group.setAttributeNS(null, "transform", "translate(" + x + ", 0)");

        this.line.style.fill = color;
        this.handler.style.fill = color;
      }
    },
    inArea: {
      value: function inArea(renderingContext, datum, x1, y1, x2, y2) {
        // handlers only are selectable
        var x = renderingContext.xScale(this.x(datum));
        var shapeX1 = x - (this.params.handlerWidth - 1) / 2;
        var shapeX2 = shapeX1 + this.params.handlerWidth;
        var shapeY1 = renderingContext.height - this.params.handlerHeight;
        var shapeY2 = renderingContext.height;

        var xOverlap = Math.max(0, Math.min(x2, shapeX2) - Math.max(x1, shapeX1));
        var yOverlap = Math.max(0, Math.min(y2, shapeY2) - Math.max(y1, shapeY1));
        var area = xOverlap * yOverlap;

        return area > 0;
      }
    }
  });

  return Marker;
})(BaseShape);

module.exports = Marker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi90aW1lbGluZS1zdGF0ZXMvc2VsZWN0aW9uLXN0YXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDOztJQUVwQyxNQUFNO1dBQU4sTUFBTTswQkFBTixNQUFNOzs7Ozs7O1lBQU4sTUFBTTs7ZUFBTixNQUFNO0FBQ1Ysb0JBQWdCO2FBQUEsNEJBQUc7QUFDakIsZUFBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDO09BQ25DOztBQUVELGdCQUFZO2FBQUEsd0JBQUc7QUFDYixlQUFPO0FBQ0wsc0JBQVksRUFBRSxDQUFDO0FBQ2YsdUJBQWEsRUFBRSxFQUFFO1NBQ2xCLENBQUE7T0FDRjs7QUFFRCxVQUFNO2FBQUEsZ0JBQUMsZ0JBQWdCLEVBQUU7QUFDdkIsWUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQUUsaUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztTQUFFOztBQUV0QyxZQUFNLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7O0FBRXZDLFlBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3BELFlBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3RELFlBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7QUFHekQsWUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN2QyxZQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFF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T0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUM1RSxZQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzVFLFlBQU0sSUFBSSxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUM7O0FBRWpDLGVBQU8sSUFBSSxHQUFHLENBQUMsQ0FBQztPQUNqQjs7OztTQS9ERyxNQUFNO0dBQVMsU0FBUzs7QUFrRTlCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDIiwiZmlsZSI6ImVzNi90aW1lbGluZS1zdGF0ZXMvc2VsZWN0aW9uLXN0YXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQmFzZVNoYXBlID0gcmVxdWlyZSgnLi9iYXNlLXNoYXBlJyk7XG5cbmNsYXNzIE1hcmtlciBleHRlbmRzIEJhc2VTaGFwZSB7XG4gIF9nZXRBY2Nlc3Nvckxpc3QoKSB7XG4gICAgcmV0dXJuIHsgeDogMCwgY29sb3I6ICcjMDAwMDAwJyB9O1xuICB9XG5cbiAgX2dldERlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBoYW5kbGVyV2lkdGg6IDcsXG4gICAgICBoYW5kbGVySGVpZ2h0OiAxMFxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcihyZW5kZXJpbmdDb250ZXh0KSB7XG4gICAgaWYgKHRoaXMuc2hhcGUpIHsgcmV0dXJuIHRoaXMuc2hhcGU7IH1cblxuICAgIGNvbnN0IGhlaWdodCA9IHJlbmRlcmluZ0NvbnRleHQuaGVpZ2h0O1xuXG4gICAgdGhpcy5zaGFwZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyh0aGlzLm5zLCAnZycpO1xuICAgIHRoaXMubGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyh0aGlzLm5zLCAncmVjdCcpO1xuICAgIHRoaXMuaGFuZGxlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyh0aGlzLm5zLCAncmVjdCcpO1xuXG4gICAgLy8gZHJhdyBsaW5lXG4gICAgdGhpcy5saW5lLnNldEF0dHJpYnV0ZU5TKG51bGwsICd4JywgMCk7XG4gICAgdGhpcy5saW5lLnNldEF0dHJpYnV0ZU5TKG51bGwsICd5JywgMCk7XG4gICAgdGhpcy5saW5lLnNldEF0dHJpYnV0ZU5TKG51bGwsICd3aWR0aCcsIDEpO1xuICAgIHRoaXMubGluZS5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaGVpZ2h0JywgaGVpZ2h0KTtcbiAgICB0aGlzLmxpbmUuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3NoYXBlLXJlbmRlcmluZycsICdjcmlzcEVkZ2VzJyk7XG5cbiAgICB0aGlzLmhhbmRsZXIuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3gnLCAtKCh0aGlzLnBhcmFtcy5oYW5kbGVyV2lkdGggLSAxKSAvIDIpKTtcbiAgICB0aGlzLmhhbmRsZXIuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3knLCByZW5kZXJpbmdDb250ZXh0LmhlaWdodCAtIHRoaXMucGFyYW1zLmhhbmRsZXJIZWlnaHQpO1xuICAgIHRoaXMuaGFuZGxlci5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnd2lkdGgnLCB0aGlzLnBhcmFtcy5oYW5kbGVyV2lkdGgpO1xuICAgIHRoaXMuaGFuZGxlci5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaGVpZ2h0JywgdGhpcy5wYXJhbXMuaGFuZGxlckhlaWdodCk7XG4gICAgdGhpcy5oYW5kbGVyLnNldEF0dHJpYnV0ZU5TKG51bGwsICdzaGFwZS1yZW5kZXJpbmcnLCAnY3Jpc3BFZGdlcycpO1xuXG4gICAgdGhpcy5zaGFwZS5hcHBlbmRDaGlsZCh0aGlzLmxpbmUpO1xuICAgIHRoaXMuc2hhcGUuYXBwZW5kQ2hpbGQodGhpcy5oYW5kbGVyKTtcblxuICAgIHJldHVybiB0aGlzLnNoYXBlO1xuICB9XG5cbiAgdXBkYXRlKHJlbmRlcmluZ0NvbnRleHQsIGdyb3VwLCBkYXR1bSwgaW5kZXgpIHtcbiAgICBjb25zdCB4ID0gcmVuZGVyaW5nQ29udGV4dC54U2NhbGUodGhpcy54KGRhdHVtKSk7XG4gICAgY29uc3QgY29sb3IgPSB0aGlzLmNvbG9yKGRhdHVtKTtcblxuICAgIGdyb3VwLnNldEF0dHJpYnV0ZU5TKG51bGwsICd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7eH0sIDApYCk7XG5cbiAgICB0aGlzLmxpbmUuc3R5bGUuZmlsbCA9IGNvbG9yO1xuICAgIHRoaXMuaGFuZGxlci5zdHlsZS5maWxsID0gY29sb3I7XG4gIH1cblxuICBpbkFyZWEocmVuZGVyaW5nQ29udGV4dCwgZGF0dW0sIHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgLy8gaGFuZGxlcnMgb25seSBhcmUgc2VsZWN0YWJsZVxuICAgIGNvbnN0IHggPSByZW5kZXJpbmdDb250ZXh0LnhTY2FsZSh0aGlzLngoZGF0dW0pKTtcbiAgICBjb25zdCBzaGFwZVgxID0geCAtICh0aGlzLnBhcmFtcy5oYW5kbGVyV2lkdGggLSAxKSAvIDI7XG4gICAgY29uc3Qgc2hhcGVYMiA9IHNoYXBlWDEgKyB0aGlzLnBhcmFtcy5oYW5kbGVyV2lkdGg7XG4gICAgY29uc3Qgc2hhcGVZMSA9IHJlbmRlcmluZ0NvbnRleHQuaGVpZ2h0IC0gdGhpcy5wYXJhbXMuaGFuZGxlckhlaWdodDtcbiAgICBjb25zdCBzaGFwZVkyID0gcmVuZGVyaW5nQ29udGV4dC5oZWlnaHQ7XG5cbiAgICBjb25zdCB4T3ZlcmxhcCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHgyLCBzaGFwZVgyKSAtIE1hdGgubWF4KHgxLCBzaGFwZVgxKSk7XG4gICAgY29uc3QgeU92ZXJsYXAgPSBNYXRoLm1heCgwLCBNYXRoLm1pbih5Miwgc2hhcGVZMikgLSBNYXRoLm1heCh5MSwgc2hhcGVZMSkpO1xuICAgIGNvbnN0IGFyZWEgPSB4T3ZlcmxhcCAqIHlPdmVybGFwO1xuXG4gICAgcmV0dXJuIGFyZWEgPiAwO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTWFya2VyOyJdfQ==