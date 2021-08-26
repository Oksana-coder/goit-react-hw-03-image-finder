import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

export default function Button({ fetchImages }) {
  return (
    <button type="button" className="load-more-btn" onClick={fetchImages}>
      Load more
    </button>
  )
};

Button.propTypes = {
  fetchImages: PropTypes.func.isRequired,
};