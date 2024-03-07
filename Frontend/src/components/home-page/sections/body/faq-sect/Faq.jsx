import faqArray from "./all-faq-objects-array/allFaqObjs";
import FaqBlueprint from "./FaqBlueprint";

export default function Faq() {
  return (
    <>
      {/* how-it-works-container safety-rules-container */}
      <section className="how-it-works-container" id="faq__text-container">
        <div className="faq__head">
          <h2 className="faq__heading">Frequently Asked Questions</h2>
          <div className="search-input"></div>
        </div>

        <ul className="faq__faqs-list">
          {faqArray.map((faqObj, index) => (
            <FaqBlueprint key={index} index={index} {...faqObj} />
          ))}
        </ul>
      </section>
    </>
  );
}
