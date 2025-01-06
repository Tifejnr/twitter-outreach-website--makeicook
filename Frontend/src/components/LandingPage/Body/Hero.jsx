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

          <iframe
            width="100%"
            height="315"
            src={
              "https://www.youtube.com/embed/sYKheJ2jIL4?si=fG7bPA1yHxOBpTbh"
            }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </>
  );
}
