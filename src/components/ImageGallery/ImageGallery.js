import React from "react";
import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem";
import "./ImageGallery.scss";

export default function ImageGallery({ images, onShowLargeImage }) {
  const showLargeImage = path => {
    onShowLargeImage(path);
  };

  return (
    <ul className="ImageGallery">
      {images.map(({ id, tags, webformatURL, largeImageURL }) => (

        <ImageGalleryItem
          key={id}
          tags={tags}
          webformatURL={webformatURL}
          onShowLargeImage={() => showLargeImage(largeImageURL)}
        />
    ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
