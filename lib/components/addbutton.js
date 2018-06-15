'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import './addbutton.scss';

/*
Implementation of the medium-link side `+` button to insert various rich blocks
like Images/Embeds/Videos.
*/
var AddButton = function (_React$Component) {
  _inherits(AddButton, _React$Component);

  function AddButton(props) {
    _classCallCheck(this, AddButton);

    var _this = _possibleConstructorReturn(this, (AddButton.__proto__ || Object.getPrototypeOf(AddButton)).call(this, props));

    _this.state = {
      style: {},
      visible: false,
      isOpen: false
    };
    _this.node = null;
    _this.blockKey = '';
    _this.blockType = '';
    _this.blockLength = -1;

    _this.findNode = _this.findNode.bind(_this);
    _this.hideBlock = _this.hideBlock.bind(_this);
    _this.openToolbar = _this.openToolbar.bind(_this);
    return _this;
  }

  // To show + button only when text length == 0


  _createClass(AddButton, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var editorState = newProps.editorState;

      var contentState = editorState.getCurrentContent();
      var selectionState = editorState.getSelection();
      if (!selectionState.isCollapsed() || selectionState.anchorKey !== selectionState.focusKey || contentState.getBlockForKey(selectionState.getAnchorKey()).getType().indexOf('atomic') >= 0) {
        // console.log('no sel');
        this.hideBlock();
        return;
      }
      var block = contentState.getBlockForKey(selectionState.anchorKey);
      var bkey = block.getKey();
      if (block.getLength() > 0) {
        this.hideBlock();
        return;
      }
      if (block.getType() !== this.blockType) {
        this.blockType = block.getType();
        if (block.getLength() === 0) {
          setTimeout(this.findNode, 0);
        }
        this.blockKey = bkey;
        return;
      }
      if (this.blockKey === bkey) {
        // console.log('block exists');
        if (block.getLength() > 0) {
          this.hideBlock();
        } else {
          this.setState({
            visible: true
          });
        }
        return;
      }
      this.blockKey = bkey;
      if (block.getLength() > 0) {
        // console.log('no len');
        this.hideBlock();
        return;
      }
      setTimeout(this.findNode, 0);
    }

    // Show + button regardless of block length
    // componentWillReceiveProps(newProps) {
    //   const { editorState } = newProps;
    //   const contentState = editorState.getCurrentContent();
    //   const selectionState = editorState.getSelection();
    //   if (!selectionState.isCollapsed() || selectionState.anchorKey != selectionState.focusKey) {
    //     this.hideBlock();
    //     return;
    //   }
    //   const block = contentState.getBlockForKey(selectionState.anchorKey);
    //   const bkey = block.getKey();
    //   if (block.getType() !== this.blockType) {
    //     this.blockType = block.getType();
    //     setTimeout(this.findNode, 0);
    //     return;
    //   }
    //   if (this.blockKey === bkey) {
    //     this.setState({
    //       visible: true
    //     });
    //     return;
    //   }
    //   this.blockKey = bkey;
    //   setTimeout(this.findNode, 0);
    // }

  }, {
    key: 'hideBlock',
    value: function hideBlock() {
      if (this.state.visible) {
        this.setState({
          visible: false,
          isOpen: false
        });
      }
    }
  }, {
    key: 'openToolbar',
    value: function openToolbar() {
      var _this2 = this;

      this.setState({
        isOpen: !this.state.isOpen
      }, function () {
        // callback function
        // save page state
        var x = window.scrollX;
        var y = window.scrollY;
        // do focus
        _this2.props.focus();
        // back previous window state
        window.scrollTo(x, y);
      });
    }
  }, {
    key: 'findNode',
    value: function findNode() {
      // eslint-disable-next-line no-undef
      var node = (0, _util.getSelectedBlockNode)(window);
      if (node === this.node) {
        // console.log('Node exists');
        return;
      }
      if (!node) {
        // console.log('no node');
        this.setState({
          visible: false,
          isOpen: false
        });
        return;
      }
      // const rect = node.getBoundingClientRect();
      this.node = node;
      this.setState({
        visible: true,
        style: {
          top: node.offsetTop - 3
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (!this.state.visible) {
        return null;
      }
      return _react2.default.createElement(
        'div',
        { className: 'md-side-toolbar', style: this.state.style },
        _react2.default.createElement(
          'button',
          {
            onClick: this.openToolbar,
            className: 'md-sb-button md-add-button' + (this.state.isOpen ? ' md-open-button' : ''),
            type: 'button'
          },
          _react2.default.createElement(
            'svg',
            { width: '35px', height: '35px', viewBox: '0 0 100 100' },
            _react2.default.createElement(
              'g',
              { id: 'Page-1', stroke: 'none', strokWidth: '1', fill: 'none', fillRule: 'evenodd' },
              _react2.default.createElement(
                'g',
                { id: 'Artboard', transform: 'translate(-460.000000, -160.000000)', fill: '#4A4A4A', fillRule: 'nonzero' },
                _react2.default.createElement('path', { d: 'M545.434612,174.629049 C536.037588,165.22466 523.403811,160 510.039154,160 C496.674498,160 484.145132,165.22466 474.643696,174.629049 C455.118768,194.169279 455.118768,225.935214 474.643696,245.370951 C484.04072,254.77534 496.674498,260 510.039154,260 C523.403811,260 535.933177,254.77534 545.434612,245.370951 C564.855129,225.935214 564.855129,194.169279 545.434612,174.629049 Z M513,207 L513,193 C513,191.343146 511.656854,190 510,190 C508.343146,190 507,191.343146 507,193 L507,207 L493,207 C491.343146,207 490,208.343146 490,210 C490,211.656854 491.343146,213 493,213 L507,213 L507,227 C507,228.656854 508.343146,230 510,230 C511.656854,230 513,228.656854 513,227 L513,213 L527,213 C528.656854,213 530,211.656854 530,210 C530,208.343146 528.656854,207 527,207 L513,207 Z M510,255 C497.915937,255 486.672504,250.27972 478.161121,241.783217 C460.61296,224.265734 460.61296,195.734266 478.161121,178.111888 C486.672504,169.72028 497.915937,165 510,165 C522.084063,165 533.327496,169.72028 541.838879,178.216783 C559.38704,195.734266 559.38704,224.265734 541.838879,241.888112 C533.327496,250.27972 522.084063,255 510,255 Z' })
              )
            )
          )
        ),
        this.state.isOpen ? _react2.default.createElement(
          _CSSTransitionGroup2.default,
          {
            transitionName: 'md-example',
            transitionEnterTimeout: 200,
            transitionLeaveTimeout: 100,
            transitionAppearTimeout: 100,
            transitionAppear: true
          },
          this.props.sideButtons.map(function (button) {
            var Button = button.component;
            var extraProps = button.props ? button.props : {};
            return _react2.default.createElement(Button, _extends({
              key: button.title
            }, extraProps, {
              getEditorState: _this3.props.getEditorState,
              setEditorState: _this3.props.setEditorState,
              close: _this3.openToolbar
            }));
          })
        ) : null
      );
    }
  }]);

  return AddButton;
}(_react2.default.Component);

exports.default = AddButton;


AddButton.propTypes = {
  focus: _propTypes2.default.func,
  getEditorState: _propTypes2.default.func.isRequired,
  setEditorState: _propTypes2.default.func.isRequired,
  sideButtons: _propTypes2.default.arrayOf(_propTypes2.default.object)
};