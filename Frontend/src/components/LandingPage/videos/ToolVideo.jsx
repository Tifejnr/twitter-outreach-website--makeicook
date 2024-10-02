import PropTypes from "prop-types";

ToolVideo.propTypes = {
  index: PropTypes.number.isRequired,
  videoUrl: PropTypes.string.isRequired,
};

export default function ToolVideo({ videoUrl }) {
  return (
    <div className="iframe-container">
      <img src={videoUrl} alt="wfr-tool" />
      {/* <iframe
        width="100%"
        height="315"
        src={videoUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      ></iframe> */}
    </div>
  );
}
