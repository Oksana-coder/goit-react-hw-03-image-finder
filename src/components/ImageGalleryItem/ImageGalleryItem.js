import React from "react";
import PropTypes from "prop-types";
import "./ImageGalleryItem.scss";

export default function ImageGalleryItem({ tags, webformatURL, onShowLargeImage }) {
  return (
    <li className="ImageGalleryItem">
      <img
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
        onClick={onShowLargeImage}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  onShowLargeImage: PropTypes.func.isRequired
};
