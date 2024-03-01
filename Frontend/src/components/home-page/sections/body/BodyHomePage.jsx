import HowItWorks from "./how-it-works-sect/HowItWorks";
import AccountRules from "./5-rules-sect/AccountRules";
import Faq from "./faq-sect/Faq";
import MakeRequestSect from "./make-request-sect/MakeRequestSect";

export default function BodyHomePage() {
  return (
    <section className="faq">
      <HowItWorks />
      <AccountRules />
      <Faq />
      <MakeRequestSect />
    </section>
  );
}
