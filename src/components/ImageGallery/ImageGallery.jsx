import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ data }) => {
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
