import React, { useEffect } from 'react';

export const Modal = ({ src, alt, closeModal }) => {
  const handleOverlayClick = event => {
    if (event.target.classList.contains('overlay')) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleEscKey = event => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [closeModal]);

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};
export default Modal;
