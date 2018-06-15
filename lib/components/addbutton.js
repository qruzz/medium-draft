import PropTypes from 'prop-types';
// import './addbutton.scss';

import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import { getSelectedBlockNode } from '../util';


/*
Implementation of the medium-link side `+` button to insert various rich blocks
like Images/Embeds/Videos.
*/
export default class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {},
      visible: false,
      isOpen: false,
    };
    this.node = null;
    this.blockKey = '';
    this.blockType = '';
    this.blockLength = -1;

    this.findNode = this.findNode.bind(this);
    this.hideBlock = this.hideBlock.bind(this);
    this.openToolbar = this.openToolbar.bind(this);
  }

  // To show + button only when text length == 0
  componentWillReceiveProps(newProps) {
    const { editorState } = newProps;
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    if (!selectionState.isCollapsed() || selectionState.anchorKey !== selectionState.focusKey || contentState.getBlockForKey(selectionState.getAnchorKey()).getType().indexOf('atomic') >= 0) {
      // console.log('no sel');
      this.hideBlock();
      return;
    }
    const block = contentState.getBlockForKey(selectionState.anchorKey);
    const bkey = block.getKey();
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
          visible: true,
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

  hideBlock() {
    if (this.state.visible) {
      this.setState({
        visible: false,
        isOpen: false,
      });
    }
  }

  openToolbar() {
    this.setState({
      isOpen: !this.state.isOpen,
    }, () => { // callback function
      // save page state
      const x = window.scrollX;
      const y = window.scrollY;
      // do focus
      this.props.focus();
      // back previous window state
      window.scrollTo(x, y);
    });
  }

  findNode() {
    // eslint-disable-next-line no-undef
    const node = getSelectedBlockNode(window);
    if (node === this.node) {
      // console.log('Node exists');
      return;
    }
    if (!node) {
      // console.log('no node');
      this.setState({
        visible: false,
        isOpen: false,
      });
      return;
    }
    // const rect = node.getBoundingClientRect();
    this.node = node;
    this.setState({
      visible: true,
      style: {
        top: node.offsetTop - 3,
      },
    });
  }

  render() {
    if (!this.state.visible) {
      return null;
    }
    return (
      <div className="md-side-toolbar" style={this.state.style}>
        <button
          onClick={this.openToolbar}
          className={`md-sb-button md-add-button${this.state.isOpen ? ' md-open-button' : ''}`}
          type="button"
        >
          <svg width="35px" height="35px" viewBox="0 0 100 100">
            <g id="Page-1" stroke="none" strokWidth="1" fill="none" fillRule="evenodd">
              <g id="Artboard" transform="translate(-460.000000, -160.000000)" fill="#4A4A4A" fillRule="nonzero">
                <path d="M545.434612,174.629049 C536.037588,165.22466 523.403811,160 510.039154,160 C496.674498,160 484.145132,165.22466 474.643696,174.629049 C455.118768,194.169279 455.118768,225.935214 474.643696,245.370951 C484.04072,254.77534 496.674498,260 510.039154,260 C523.403811,260 535.933177,254.77534 545.434612,245.370951 C564.855129,225.935214 564.855129,194.169279 545.434612,174.629049 Z M513,207 L513,193 C513,191.343146 511.656854,190 510,190 C508.343146,190 507,191.343146 507,193 L507,207 L493,207 C491.343146,207 490,208.343146 490,210 C490,211.656854 491.343146,213 493,213 L507,213 L507,227 C507,228.656854 508.343146,230 510,230 C511.656854,230 513,228.656854 513,227 L513,213 L527,213 C528.656854,213 530,211.656854 530,210 C530,208.343146 528.656854,207 527,207 L513,207 Z M510,255 C497.915937,255 486.672504,250.27972 478.161121,241.783217 C460.61296,224.265734 460.61296,195.734266 478.161121,178.111888 C486.672504,169.72028 497.915937,165 510,165 C522.084063,165 533.327496,169.72028 541.838879,178.216783 C559.38704,195.734266 559.38704,224.265734 541.838879,241.888112 C533.327496,250.27972 522.084063,255 510,255 Z" />
              </g>
            </g>
          </svg>
        </button>
        {this.state.isOpen ? (
          <CSSTransitionGroup
            transitionName="md-example"
            transitionEnterTimeout={200}
            transitionLeaveTimeout={100}
            transitionAppearTimeout={100}
            transitionAppear
          >
            {this.props.sideButtons.map((button) => {
              const Button = button.component;
              const extraProps = button.props ? button.props : {};
              return (
                <Button
                  key={button.title}
                  {...extraProps}
                  getEditorState={this.props.getEditorState}
                  setEditorState={this.props.setEditorState}
                  close={this.openToolbar}
                />
              );
            })}
          </CSSTransitionGroup>
        ) : null}
      </div>
    );
  }
}

AddButton.propTypes = {
  focus: PropTypes.func,
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  sideButtons: PropTypes.arrayOf(PropTypes.object),
};
