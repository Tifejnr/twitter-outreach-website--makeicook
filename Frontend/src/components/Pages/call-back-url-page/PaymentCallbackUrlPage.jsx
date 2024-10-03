import { useState, useEffect } from "react";
import LandingPageToggle from "../../Main-nav-bar/LandingPageToggle";
import PagesNavItems from "../PagesNavItems";
import NavLogo from "../../auth/utils/components/NavLogo";
import changeTabTitle from "../../component-utils/change-tab-title/changeTabTitle";
import pagesTitleConstValues from "../../component-utils/comp-constant-values/pagesTitleConstValues";

export default function PaymentCallbackUrlPage() {
  const [isVerificationDone, setIsVerificationDone] = useState(false);
  const [percentLoaded, setPercentLoaded] = useState(0); // Initially 0%

  changeTabTitle(pagesTitleConstValues.paymentVerificationPage);

  useEffect(() => {
    const duration = 6; // Total duration in seconds
    const intervalTime = 100; // Time interval in milliseconds
    const steps = (duration * 1000) / intervalTime; // Total steps for 30 seconds
    const increment = 100 / steps; // Percentage increment per step

    let progress = 0;
    const interval = setInterval(() => {
      progress += increment;
      setPercentLoaded((prev) => (prev < 100 ? prev + increment : 100));
    }, intervalTime);

    if (progress >= 100) {
      clearInterval(interval);
      setIsVerificationDone(true);
    }

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  // CSS style to update the width of the progress bar
  const updateBarWidth = {
    width: `${percentLoaded}%`,
    animation: percentLoaded === 100 && "none",
  };

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

      <section className="verify-payment-section">
        <div className="loading" id="loading">
          {isVerificationDone ? (
            ""
          ) : (
            <div
              className={`barHolder ${
                percentLoaded < 100 ? "moveFlame-animation" : ""
              }`}
            >
              <p>{Math.round(percentLoaded)}%</p>
              <div
                className={`progressing-bar ${
                  percentLoaded < 100 ? "moveFlame-animation" : ""
                }`}
                style={updateBarWidth}
              ></div>
            </div>
          )}
          <section>
            {isVerificationDone ? (
              ""
            ) : (
              <section className="changing-ele-on-bar">
                {/* Render various pieces of information based on loading progress */}
                <h2 id="progressBarTitle" className="title">
                  {percentLoaded === 100
                    ? `Payment Verified`
                    : `Verifying Payment...`}
                </h2>

                <h2 className="title">
                  {percentLoaded === 100
                    ? `Redirecting ....`
                    : `Please don't close this page`}
                </h2>
              </section>
            )}
          </section>
        </div>
      </section>
    </>
  );
}
