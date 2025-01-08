// import Link from "next/link";
import ToggleLabel from "./ToggleLabel";
import PropTypes from "prop-types"; // Import PropTypes

export default function LandingPageToggle(props) {
  // Define state variables to keep track of the toggle state
  // const isMenuIconShowing = useStore((state) => state.isMenuIconShowing);
  // const setIsMenuIconShowing = useStore((state) => state.setIsMenuIconShowing);
  const isMenuIconShowing = true;
  // const setIsMenuIconShowing = true;

  // Function to handle the button click and toggle the state
  const handleClick = () => {
    // setIsMenuIconShowing(!isMenuIconShowing);
  };

  return (
    <>
      <input
        type="checkbox"
        id="nav__checkbox"
        className="nav__checkbox"
        onChange={handleClick}
      />
      <section className="mainNavIcons">
        {props.noCredits ? (
          ""
        ) : (
          <article className="myProfileIcon">
            <a href={props.pageLink} rel="noreferrer" target="_blank">
              <button id="start-for-free-mobile-lp">
                <p>{props.innerText}</p>
              </button>
            </a>
          </article>
        )}
        <ToggleLabel isMenuIconShowing={isMenuIconShowing} />
      </section>
    </>
  );
}

// Add PropTypes validation
LandingPageToggle.propTypes = {
  pageLink: PropTypes.string, // Validate pageLink as a required string
  noCredits: PropTypes.bool, // Validate noCredits as a boolean
  innerText: PropTypes.string, // Validate innerText as a string
};
