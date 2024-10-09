import LandingPageToggle from "../../Main-nav-bar/LandingPageToggle";
import PagesNavItems from "../PagesNavItems";
import NavLogo from "../../auth/utils/components/NavLogo";
import FooterPages from "../Footer/FooterPages";
import CTAForTermsPolicy from "../Terms-and-privacy/CTAForTermsPolicy";
import changeTabTitle from "../../component-utils/change-tab-title/changeTabTitle";
import pagesTitleConstValues from "../../component-utils/comp-constant-values/pagesTitleConstValues";

import compConstValues from "../../component-utils/comp-constant-values/compConstValues";
import { useEffect, useState } from "react";
import getAllTutorialsObjArrayFromServer from "./sections/getAllTutorialVideosFromServer";
import TutorialsBlueprint from "./sections/TutorialsBlueprint";

export default function TutorialsPage() {
  changeTabTitle(pagesTitleConstValues.tutorialsPage);

  const [allTutorialsArray, setAllTutorialsArray] = useState([]);
  useEffect(() => {
    runNow();
    async function runNow() {
      const allTutorialObjFromServer =
        await getAllTutorialsObjArrayFromServer();

      console.log("allTutorialObjFromServer", allTutorialObjFromServer);

      if (allTutorialObjFromServer) {
        const { allVideoTutorialsArray } = allTutorialObjFromServer;

        setAllTutorialsArray(allVideoTutorialsArray);
      }
    }
  }, []);

  return (
    <>
      <nav className="nav">
        <LandingPageToggle pagelink="#" noCredits={true} />

        <ul className="nav__menu">
          <section className="nav-logo-landing-page-cont">
            <NavLogo />
          </section>

          <PagesNavItems />
        </ul>
      </nav>

      <section className="tools-section-cont main-pricing-section-alone about-us-main">
        <section>
          <header>
            <h2>Tutorials</h2>
          </header>

          <section>
            {allTutorialsArray.map((tutorialObj, index) => (
              <TutorialsBlueprint
                key={index}
                tutorialObj={tutorialObj}
                indexNo={index}
              />
            ))}
          </section>
        </section>

        <CTAForTermsPolicy title={compConstValues.aboutUsPageCTA} />
      </section>
      <FooterPages />
    </>
  );
}
