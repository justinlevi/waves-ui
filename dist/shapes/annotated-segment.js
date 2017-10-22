'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _segment = require('./segment');

var _segment2 = _interopRequireDefault(_segment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A shape to display a segment with annotation.
 *
 * [example usage](./examples/layer-segment.html)
 */
var AnnotatedSegment = function (_Segment) {
  (0, _inherits3.default)(AnnotatedSegment, _Segment);

  function AnnotatedSegment() {
    (0, _classCallCheck3.default)(this, AnnotatedSegment);
    return (0, _possibleConstructorReturn3.default)(this, (AnnotatedSegment.__proto__ || (0, _getPrototypeOf2.default)(AnnotatedSegment)).apply(this, arguments));
  }

  (0, _createClass3.default)(AnnotatedSegment, [{
    key: 'getClassName',
    value: function getClassName() {
      return 'annotated-segment';
    }
  }, {
    key: '_getAccessorList',
    value: function _getAccessorList() {
      var list = (0, _get3.default)(AnnotatedSegment.prototype.__proto__ || (0, _getPrototypeOf2.default)(AnnotatedSegment.prototype), '_getAccessorList', this).call(this);
      list.text = 'default';
      return list;
    }
  }, {
    key: 'render',
    value: function render(renderingContext) {
      this.$el = (0, _get3.default)(AnnotatedSegment.prototype.__proto__ || (0, _getPrototypeOf2.default)(AnnotatedSegment.prototype), 'render', this).call(this, renderingContext);
      var height = renderingContext.height;

      this.$label = document.createElementNS(this.ns, 'text');
      this.$label.setAttributeNS(null, 'x', 3);
      this.$label.setAttributeNS(null, 'y', 11);
      this.$label.setAttributeNS(null, 'transform', 'matrix(1, 0, 0, -1, 0, ' + height + ')');
      this.$label.style.fontSize = '10px';
      this.$label.style.fontFamily = 'monospace';
      this.$label.style.color = '#242424';
      this.$label.style.mozUserSelect = 'none';
      this.$label.style.webkitUserSelect = 'none';
      this.$label.style.userSelect = 'none';

      this.$el.appendChild(this.$label);

      return this.$el;
    }
  }, {
    key: 'update',
    value: function update(renderingContext, datum) {
      (0, _get3.default)(AnnotatedSegment.prototype.__proto__ || (0, _getPrototypeOf2.default)(AnnotatedSegment.prototype), 'update', this).call(this, renderingContext, datum);

      if (this.$label.firstChild) {
        this.$label.removeChild(this.$label.firstChild);
      }

      var $text = document.createTextNode(this.text(datum));
      this.$label.appendChild($text);
    }
  }]);
  return AnnotatedSegment;
}(_segment2.default);

exports.default = AnnotatedSegment;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFubm90YXRlZC1zZWdtZW50LmpzIl0sIm5hbWVzIjpbIkFubm90YXRlZFNlZ21lbnQiLCJsaXN0IiwidGV4dCIsInJlbmRlcmluZ0NvbnRleHQiLCIkZWwiLCJoZWlnaHQiLCIkbGFiZWwiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnROUyIsIm5zIiwic2V0QXR0cmlidXRlTlMiLCJzdHlsZSIsImZvbnRTaXplIiwiZm9udEZhbWlseSIsImNvbG9yIiwibW96VXNlclNlbGVjdCIsIndlYmtpdFVzZXJTZWxlY3QiLCJ1c2VyU2VsZWN0IiwiYXBwZW5kQ2hpbGQiLCJkYXR1bSIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsIiR0ZXh0IiwiY3JlYXRlVGV4dE5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFHQTs7Ozs7SUFLcUJBLGdCOzs7Ozs7Ozs7O21DQUNKO0FBQUUsYUFBTyxtQkFBUDtBQUE2Qjs7O3VDQUUzQjtBQUNqQixVQUFJQyxpS0FBSjtBQUNBQSxXQUFLQyxJQUFMLEdBQVksU0FBWjtBQUNBLGFBQU9ELElBQVA7QUFDRDs7OzJCQUVNRSxnQixFQUFrQjtBQUN2QixXQUFLQyxHQUFMLG9KQUF3QkQsZ0JBQXhCO0FBQ0EsVUFBTUUsU0FBU0YsaUJBQWlCRSxNQUFoQzs7QUFFQSxXQUFLQyxNQUFMLEdBQWNDLFNBQVNDLGVBQVQsQ0FBeUIsS0FBS0MsRUFBOUIsRUFBa0MsTUFBbEMsQ0FBZDtBQUNBLFdBQUtILE1BQUwsQ0FBWUksY0FBWixDQUEyQixJQUEzQixFQUFpQyxHQUFqQyxFQUFzQyxDQUF0QztBQUNBLFdBQUtKLE1BQUwsQ0FBWUksY0FBWixDQUEyQixJQUEzQixFQUFpQyxHQUFqQyxFQUFzQyxFQUF0QztBQUNBLFdBQUtKLE1BQUwsQ0FBWUksY0FBWixDQUEyQixJQUEzQixFQUFpQyxXQUFqQyw4QkFBd0VMLE1BQXhFO0FBQ0EsV0FBS0MsTUFBTCxDQUFZSyxLQUFaLENBQWtCQyxRQUFsQixHQUE2QixNQUE3QjtBQUNBLFdBQUtOLE1BQUwsQ0FBWUssS0FBWixDQUFrQkUsVUFBbEIsR0FBK0IsV0FBL0I7QUFDQSxXQUFLUCxNQUFMLENBQVlLLEtBQVosQ0FBa0JHLEtBQWxCLEdBQTBCLFNBQTFCO0FBQ0EsV0FBS1IsTUFBTCxDQUFZSyxLQUFaLENBQWtCSSxhQUFsQixHQUFrQyxNQUFsQztBQUNBLFdBQUtULE1BQUwsQ0FBWUssS0FBWixDQUFrQkssZ0JBQWxCLEdBQXFDLE1BQXJDO0FBQ0EsV0FBS1YsTUFBTCxDQUFZSyxLQUFaLENBQWtCTSxVQUFsQixHQUErQixNQUEvQjs7QUFFQSxXQUFLYixHQUFMLENBQVNjLFdBQVQsQ0FBcUIsS0FBS1osTUFBMUI7O0FBRUEsYUFBTyxLQUFLRixHQUFaO0FBQ0Q7OzsyQkFFTUQsZ0IsRUFBa0JnQixLLEVBQU87QUFDOUIsdUpBQWFoQixnQkFBYixFQUErQmdCLEtBQS9COztBQUVBLFVBQUksS0FBS2IsTUFBTCxDQUFZYyxVQUFoQixFQUE0QjtBQUMxQixhQUFLZCxNQUFMLENBQVllLFdBQVosQ0FBd0IsS0FBS2YsTUFBTCxDQUFZYyxVQUFwQztBQUNEOztBQUVELFVBQU1FLFFBQVFmLFNBQVNnQixjQUFULENBQXdCLEtBQUtyQixJQUFMLENBQVVpQixLQUFWLENBQXhCLENBQWQ7QUFDQSxXQUFLYixNQUFMLENBQVlZLFdBQVosQ0FBd0JJLEtBQXhCO0FBQ0Q7Ozs7O2tCQXRDa0J0QixnQiIsImZpbGUiOiJhbm5vdGF0ZWQtc2VnbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTZWdtZW50IGZyb20gJy4vc2VnbWVudCc7XG5cblxuLyoqXG4gKiBBIHNoYXBlIHRvIGRpc3BsYXkgYSBzZWdtZW50IHdpdGggYW5ub3RhdGlvbi5cbiAqXG4gKiBbZXhhbXBsZSB1c2FnZV0oLi9leGFtcGxlcy9sYXllci1zZWdtZW50Lmh0bWwpXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFubm90YXRlZFNlZ21lbnQgZXh0ZW5kcyBTZWdtZW50IHtcbiAgZ2V0Q2xhc3NOYW1lKCkgeyByZXR1cm4gJ2Fubm90YXRlZC1zZWdtZW50JzsgfVxuXG4gIF9nZXRBY2Nlc3Nvckxpc3QoKSB7XG4gICAgbGV0IGxpc3QgPSBzdXBlci5fZ2V0QWNjZXNzb3JMaXN0KCk7XG4gICAgbGlzdC50ZXh0ID0gJ2RlZmF1bHQnO1xuICAgIHJldHVybiBsaXN0O1xuICB9XG5cbiAgcmVuZGVyKHJlbmRlcmluZ0NvbnRleHQpIHtcbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcihyZW5kZXJpbmdDb250ZXh0KTtcbiAgICBjb25zdCBoZWlnaHQgPSByZW5kZXJpbmdDb250ZXh0LmhlaWdodDtcblxuICAgIHRoaXMuJGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHRoaXMubnMsICd0ZXh0Jyk7XG4gICAgdGhpcy4kbGFiZWwuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3gnLCAzKTtcbiAgICB0aGlzLiRsYWJlbC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneScsIDExKTtcbiAgICB0aGlzLiRsYWJlbC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAndHJhbnNmb3JtJywgYG1hdHJpeCgxLCAwLCAwLCAtMSwgMCwgJHtoZWlnaHR9KWApO1xuICAgIHRoaXMuJGxhYmVsLnN0eWxlLmZvbnRTaXplID0gJzEwcHgnO1xuICAgIHRoaXMuJGxhYmVsLnN0eWxlLmZvbnRGYW1pbHkgPSAnbW9ub3NwYWNlJztcbiAgICB0aGlzLiRsYWJlbC5zdHlsZS5jb2xvciA9ICcjMjQyNDI0JztcbiAgICB0aGlzLiRsYWJlbC5zdHlsZS5tb3pVc2VyU2VsZWN0ID0gJ25vbmUnO1xuICAgIHRoaXMuJGxhYmVsLnN0eWxlLndlYmtpdFVzZXJTZWxlY3QgPSAnbm9uZSc7XG4gICAgdGhpcy4kbGFiZWwuc3R5bGUudXNlclNlbGVjdCA9ICdub25lJztcblxuICAgIHRoaXMuJGVsLmFwcGVuZENoaWxkKHRoaXMuJGxhYmVsKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIHVwZGF0ZShyZW5kZXJpbmdDb250ZXh0LCBkYXR1bSkge1xuICAgIHN1cGVyLnVwZGF0ZShyZW5kZXJpbmdDb250ZXh0LCBkYXR1bSk7XG5cbiAgICBpZiAodGhpcy4kbGFiZWwuZmlyc3RDaGlsZCkge1xuICAgICAgdGhpcy4kbGFiZWwucmVtb3ZlQ2hpbGQodGhpcy4kbGFiZWwuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgY29uc3QgJHRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLnRleHQoZGF0dW0pKTtcbiAgICB0aGlzLiRsYWJlbC5hcHBlbmRDaGlsZCgkdGV4dCk7XG4gIH1cbn1cbiJdfQ==