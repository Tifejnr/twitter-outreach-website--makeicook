import { useRef } from "react";
import PropTypes from "prop-types";

export default function TestimonialPictureBlueprint({ eachImageSrc }) {
  const imageRef = useRef(null);

  const handleImageClick = () => {
    if (imageRef.current) {
      if (imageRef.current.requestFullscreen) {
        imageRef.current.requestFullscreen();
      } else if (imageRef.current.mozRequestFullScreen) {
        // Firefox
        imageRef.current.mozRequestFullScreen();
      } else if (imageRef.current.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        imageRef.current.webkitRequestFullscreen();
      } else if (imageRef.current.msRequestFullscreen) {
        // IE/Edge
        imageRef.current.msRequestFullscreen();
      }
    }
  };
  return (
    <article className="each-testimonial-container">
      <picture>
        <img
          src={eachImageSrc}
          alt="user feedback after testing WFR toolkit extension"
          onClick={handleImageClick}
          ref={imageRef}
        />
      </picture>
    </article>
  );
}

TestimonialPictureBlueprint.propTypes = {
  index: PropTypes.number.isRequired,
  eachImageSrc: PropTypes.string.isRequired,
};
