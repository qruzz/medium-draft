'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _model = require('../../model');

var _constants = require('../../util/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageButton = function (_React$Component) {
  _inherits(ImageButton, _React$Component);

  function ImageButton(props) {
    _classCallCheck(this, ImageButton);

    var _this = _possibleConstructorReturn(this, (ImageButton.__proto__ || Object.getPrototypeOf(ImageButton)).call(this, props));

    _this.onClick = _this.onClick.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(ImageButton, [{
    key: 'onClick',
    value: function onClick() {
      this.input.value = null;
      this.input.click();
    }

    /*
    This is an example of how an image button can be added
    on the side control. This Button handles the image addition locally
    by creating an object url. You can override this method to upload
    images to your server first, then get the image url in return and then
    add to the editor.
    */

  }, {
    key: 'onChange',
    value: function onChange(e) {
      // e.preventDefault();
      var file = e.target.files[0];
      if (file.type.indexOf('image/') === 0) {
        // console.log(this.props.getEditorState());
        // eslint-disable-next-line no-undef
        var src = URL.createObjectURL(file);
        this.props.setEditorState((0, _model.addNewBlock)(this.props.getEditorState(), _constants.Block.IMAGE, {
          src: src
        }));
      }
      this.props.close();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'button',
        {
          className: 'md-sb-button md-sb-img-button',
          type: 'button',
          onClick: this.onClick,
          title: 'Add an Image'
        },
        _react2.default.createElement(
          'svg',
          { width: '35px', height: '35px', viewBox: '0 0 100 100' },
          _react2.default.createElement(
            'g',
            { id: 'Page-1', stroke: 'none', fill: 'none', fillRule: 'evenodd' },
            _react2.default.createElement(
              'g',
              { id: 'Artboard', transform: 'translate(-570.000000, -160.000000)', fill: '#4A4A4A', fillRule: 'nonzero' },
              _react2.default.createElement('path', { d: 'M611.351351,190 C605.090784,190 600,195.090809 600,201.351347 L600,218.648653 C600,224.909191 605.090784,230 611.351351,230 L628.648649,230 C634.909216,230 640,224.909191 640,218.648653 L640,201.351347 C640,195.090809 634.909216,190 628.648649,190 L611.351351,190 Z M611.351351,193.243242 L628.648649,193.243242 C633.168557,193.243242 636.756757,196.831457 636.756757,201.351347 L636.756757,218.648653 C636.756757,223.168543 633.168557,226.756758 628.648649,226.756758 L611.351351,226.756758 C606.831443,226.756758 603.243243,223.168543 603.243243,218.648653 L603.243243,201.351347 C603.243243,196.831457 606.831443,193.243242 611.351351,193.243242 Z M630.810811,196.486484 C629.616649,196.486484 628.648649,197.454483 628.648649,198.648645 C628.648649,199.842753 629.616649,200.810806 630.810811,200.810806 C632.004919,200.810806 632.972973,199.842753 632.972973,198.648645 C632.972973,197.454483 632.004919,196.486484 630.810811,196.486484 Z M620,199.729726 C614.347081,199.729726 609.72973,204.347129 609.72973,210.000008 C609.72973,215.652871 614.347081,220.270274 620,220.270274 C625.652924,220.270274 630.27027,215.652871 630.27027,210.000008 C630.27027,204.347129 625.652924,199.729726 620,199.729726 Z M620,202.972968 C623.900135,202.972968 627.027027,206.099939 627.027027,210.000008 C627.027027,213.900061 623.900135,217.027032 620,217.027032 C616.099881,217.027032 612.972973,213.900061 612.972973,210.000008 C612.972973,206.099939 616.099881,202.972968 620,202.972968 Z M620,260 C592.385763,260 570,237.614237 570,210 C570,182.385763 592.385763,160 620,160 C647.614237,160 670,182.385763 670,210 C670,237.614237 647.614237,260 620,260 Z M620,255 C644.852814,255 665,234.852814 665,210 C665,185.147186 644.852814,165 620,165 C595.147186,165 575,185.147186 575,210 C575,234.852814 595.147186,255 620,255 Z' })
            )
          )
        ),
        _react2.default.createElement('input', {
          type: 'file',
          accept: 'image/*',
          ref: function ref(c) {
            _this2.input = c;
          },
          onChange: this.onChange,
          style: { display: 'none' }
        })
      );
    }
  }]);

  return ImageButton;
}(_react2.default.Component);

ImageButton.propTypes = {
  setEditorState: _propTypes2.default.func,
  getEditorState: _propTypes2.default.func,
  close: _propTypes2.default.func
};
exports.default = ImageButton;