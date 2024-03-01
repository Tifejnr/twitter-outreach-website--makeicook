import faqArray from "./all-faq-objects-array/allFaqObjs";
import FaqBlueprint from "./FaqBlueprint";
import { FaqObjType } from "./all-faq-objects-array/allFaqObjs";

export default function Faq() {
  return (
    <>
      <section className="faq__text-container" id="faq__text-container">
        <div className="faq__head">
          <h2 className="faq__heading">Frequently Asked Questions</h2>
          <div className="search-input"></div>
        </div>

        <ul className="faq__faqs-list">
          {faqArray.map((faqObj: FaqObjType, index) => (
            <FaqBlueprint key={index} index={index} {...faqObj} />
          ))}
        </ul>
      </section>
    </>
  );
}
