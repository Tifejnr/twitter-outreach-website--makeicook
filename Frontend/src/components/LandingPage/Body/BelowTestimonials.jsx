import compConstValues from "../../component-utils/comp-constant-values/compConstValues";
import GetStartedIcon from "./GetStartedIcon";

export default function BelowTestimonials() {
  return (
    <section className="hero-container">
      <div className="hero-inner-container">
        <h2>
          <span>{compConstValues.belowFaqFirstHeadingText}</span>
        </h2>
        <h3 className="secondHeadingtext">
          {compConstValues.heroSecondHeadingtext}
        </h3>

        <section className="call-to-action-cont">
          <GetStartedIcon />
        </section>
      </div>
    </section>
  );
}
