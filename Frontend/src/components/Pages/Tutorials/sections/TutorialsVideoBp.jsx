import PropTypes from "prop-types";

TutorialsVideoBp.propTypes = {
  videoUrl: PropTypes.string.isRequired,
};

export default function TutorialsVideoBp({ videoUrl }) {
  return (
    <div className="iframe-container">
      <iframe
        width="100%"
        height="315"
        src={videoUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
}
