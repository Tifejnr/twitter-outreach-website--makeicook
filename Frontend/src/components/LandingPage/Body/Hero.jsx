import compConstValues from "../../component-utils/comp-constant-values/compConstValues";
import GetStartedIcon from "./GetStartedIcon";

export default function Hero() {
  return (
    <>
      <section className="hero-container">
        <div className="hero-inner-container">
          <h1>
            <span>{compConstValues.heroFirstHeadingText}</span>
          </h1>
          <h3 className="secondHeadingtext">
            <span>{compConstValues.heroSecondHeadingtext}</span>
          </h3>

          <section className="call-to-action-cont">
            <GetStartedIcon />
          </section>
        </div>
      </section>
    </>
  );
}
