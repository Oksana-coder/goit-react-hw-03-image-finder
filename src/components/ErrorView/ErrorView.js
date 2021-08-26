import errorImage from './error-image_640.jpeg';
import PropTypes from "prop-types";

export default function ErrorView({ message }) {
  return (
    <div role="alert">
      <img src={errorImage} width="240" alt="sad-emoji" />
      <p>{message}</p>
    </div>
  );
}

ErrorView.propTypes = {
  message: PropTypes.string.isRequired
};