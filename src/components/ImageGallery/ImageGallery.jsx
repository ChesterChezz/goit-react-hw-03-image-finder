import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';

const ImageGallery = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <>
      <ul className="gallery">
        {data.map(element => (
          <ImageGalleryItem card={element} key={element.id} />
        ))}
      </ul>
    </>
  );
};

export default ImageGallery;