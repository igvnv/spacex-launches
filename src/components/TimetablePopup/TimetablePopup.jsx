import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CloseButton from './CloseButton';
import GoToLaunchButton from './GoToLaunchButton';

class TimetablePopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parentElement: null,
      parentScrollLeft: 0,
      visible: false,
      x: 0,
    };

    this.attachTo = this.attachTo.bind(this);
    this.hide = this.hide.bind(this);
    this.onParentScroll = this.onParentScroll.bind(this);
    this.repaint = this.repaint.bind(this);
    this.show = this.show.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.repaint);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.repaint);
  }

  onParentScroll(parentScrollLeft) {
    const { parentScrollLeft: previousParentScrollLeft, x } = this.state;
    const newX = x - parentScrollLeft + previousParentScrollLeft;

    this.setState({
      x: newX,
      parentScrollLeft,
    });
  }

  show(parentElement) {
    const { parentElement: currentParentElement } = this.state;

    if (parentElement === currentParentElement) {
      // TODO: show->toggle?
      this.hide();
      return;
    }
    this.setState({ visible: true }, this.attachTo(parentElement));
  }

  repaint() {
    const { parentElement } = this.state;
    const { goToLaunch } = this.props;

    if (!parentElement) return;

    this.attachTo(parentElement);

    window.requestAnimationFrame(() => {
      goToLaunch(parentElement);
    });
  }

  hide() {
    this.setState({ visible: false, parentElement: null });
  }

  attachTo(parentElement) {
    const popupMinTopOffset = 10;

    // We must wait until component node is rendered to use actual getBoundingClientRect
    window.requestAnimationFrame(() => {
      this.node.style.height = 'auto';

      const parentBound = parentElement.getBoundingClientRect();
      let nodeBound = this.node.getBoundingClientRect();

      const x = parentBound.left + parentBound.width / 2 - nodeBound.width / 2;
      const y = parentBound.top - nodeBound.height + window.scrollY;

      this.node.style.top = `${y}px`;

      nodeBound = this.node.getBoundingClientRect();
      const maxHeight = nodeBound.top + nodeBound.height - popupMinTopOffset;

      // Popup is taller than awailable space on screen
      if (maxHeight < nodeBound.height) {
        const diff = nodeBound.height - maxHeight;
        this.node.style.top = `${y + diff}px`;
        this.node.style.height = `${maxHeight}px`;
      }

      this.setState({ x, parentElement });
    });
  }

  render() {
    const { visible, parentElement } = this.state;
    const { children, goToLaunch } = this.props;

    const minVisibleWidth = 10;
    const minArrowDiff = minVisibleWidth + 10;
    const pageWidth = document.documentElement.clientWidth;

    let { x } = this.state;
    let arrowDiff = 0;
    let showBackButtonLeft = false;
    let showBackButtonRight = false;

    if (visible && this.node) {
      const popupWidth = this.node.clientWidth;

      // Always display full popup when parent element is visible
      if (x < minVisibleWidth) {
        arrowDiff = x - minVisibleWidth;
        x = minVisibleWidth;
      } else if (pageWidth < minVisibleWidth + x + popupWidth) {
        const nodeDiff = pageWidth - minVisibleWidth - popupWidth;
        arrowDiff = x - nodeDiff;
        x = nodeDiff;
      }

      // Move popup out of the screen when parent element is not visible
      const arrowDeadline = popupWidth / 2 - minArrowDiff;
      if (arrowDiff < 0 && arrowDeadline < -arrowDiff) {
        const diff = arrowDeadline + arrowDiff;
        arrowDiff -= diff;
        x += diff;
      } else if (arrowDiff > 0 && arrowDeadline < arrowDiff) {
        const diff = arrowDeadline - arrowDiff;
        arrowDiff += diff;
        x -= diff;
      }

      // Popup is sticky and always visibly. At least for `minVisibleWidth` pixels
      if (x < minVisibleWidth - popupWidth) {
        x = minVisibleWidth - popupWidth;
        showBackButtonLeft = true;
      } else if (x > pageWidth - minVisibleWidth) {
        x = pageWidth - minVisibleWidth;
        showBackButtonRight = true;
      }
    }

    const style = { left: `${x}px` };

    return (
      <div
        ref={(node) => {
          this.node = node;
        }}
        className={`launch-data-short ${
          visible ? 'launch-data-short_visible' : ''
        }`}
        style={style}
      >
        <CloseButton onClick={this.hide} />
        {showBackButtonLeft && (
          <GoToLaunchButton
            direction="left"
            onClick={() => goToLaunch(parentElement)}
          />
        )}
        {showBackButtonRight && (
          <GoToLaunchButton
            direction="right"
            onClick={() => goToLaunch(parentElement)}
          />
        )}
        {children}
        <span
          className="launch-data-short__arrow"
          style={{ marginLeft: `${arrowDiff}px` }}
        />
      </div>
    );
  }
}
TimetablePopup.propTypes = {
  goToLaunch: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default TimetablePopup;
