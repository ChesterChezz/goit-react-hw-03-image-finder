import React, { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleEscKey);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.closeModal !== this.props.closeModal) {
      document.removeEventListener('keydown', this.handleEscKey);
      document.addEventListener('keydown', this.handleEscKey);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscKey);
  }

  handleEscKey = event => {
    if (event.key === 'Escape') {
      this.props.closeModal();
    }
  };

  handleOverlayClick = event => {
    if (event.target.classList.contains('overlay')) {
      this.props.closeModal();
    }
  };

  render() {
    const { src, alt } = this.props;

    return (
      <div className="overlay" onClick={this.handleOverlayClick}>
        <div className="modal">
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }
}

export default Modal;
