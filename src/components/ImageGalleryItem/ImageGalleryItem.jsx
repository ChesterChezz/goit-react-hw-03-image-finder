import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';

export const ImageGalleryItem = ({ card }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [modalOpen]);

  return (
    <>
      <li className="gallery-item" onClick={openModal}>
        <img src={card.previewURL} alt={card.user} loading="lazy" />
      </li>
      {modalOpen && (
        <Modal
          src={card.largeImageURL}
          alt={card.user}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
export default ImageGalleryItem;
