import { useRef } from "react";
import allIconsContainer from "../../auth/utils/icons/allIconsContainer";
// import getCheckoutLink from "../checkoutUrl/fetchUrl";

import PropTypes from "prop-types";
import getCheckoutLink from "../checkoutUrl/getCheckoutLink";
import { useNavigate } from "react-router-dom";

export default function BasicCard(props) {
  const planNameRef = useRef(null);
  // const navigate = useNavigate();

  const { planObjs } = props;

  const { planName, planPrice } = planObjs;

  const navigate = useNavigate();

  const planCheckout = async () => {
    const response = await getCheckoutLink(planPrice);
    console.log(response);

    if (response.unauthorizedToken) return navigate("/register");

    if (response.invalidJWT) return navigate("/sign-in");

    const checkoutUrl = response.checkoutUrl;

    // Redirect the user to the specified link in a new tab
    if (checkoutUrl) window.open(checkoutUrl, "_blank");
  };

  return (
    <div className="col-sm-4">
      <div className="card text-center">
        <picture className="title">
          <h2 ref={planNameRef}> {props.planObjs.planName} </h2>
        </picture>
        <div className="price">
          <h4>
            ${props.planObjs.planPrice}
            <span className="per-month-text">/month</span>
          </h4>

          <p>
            <b>Right choice</b> if tool usage is <span></span>
            <b>{props.planObjs.suitabilityTimeUsage}</b>
          </p>
        </div>

        {planName == "Free" && (
          <div className="option">
            <ul>
              <li>
                <img
                  src={allIconsContainer.checkMarkIcon}
                  alt="check mark icon"
                  width={100}
                  height={100}
                />
                <p>
                  Send up to <b>{props.planObjs.planDailyMessageLimit}</b>{" "}
                  messages
                  <span className="span-per-day-text"> per day</span>
                </p>
              </li>

              <li>
                <img
                  src={allIconsContainer.checkMarkIcon}
                  alt="check mark icon"
                  width={100}
                  height={100}
                />
                <p>Messages are spin-taxed with AI to bypass spam detection</p>
              </li>
              <li>
                <img
                  src={allIconsContainer.checkMarkIcon}
                  alt="check mark icon"
                  width={100}
                  height={100}
                />
                <p>
                  Interact with tweets (like/reply) before messaging to increase
                  response rates
                </p>
              </li>

              <li>
                <img
                  src={allIconsContainer.checkMarkIcon}
                  alt="check mark icon"
                  width={100}
                  height={100}
                />
                <p>Smart greeting logic (uses “Hi” if name isn’t human-like)</p>
              </li>

              <li>
                <img
                  src={allIconsContainer.checkMarkIcon}
                  alt="check mark icon"
                  width={100}
                  height={100}
                />
                <p>Leads filtering (criteria/AI-based)</p>
              </li>
              {/* <li>
                <img
                  src={allIconsContainer.checkMarkIcon}
                  alt="check mark icon"
                  width={100}
                  height={100}
                />
                <p>You don&apos;t need</p>
              </li> */}
            </ul>
          </div>
        )}

        {planName == "Business" && (
          <div className="option">
            <ul>
              <li>
                <img
                  src={allIconsContainer.checkMarkIcon}
                  alt="check mark icon"
                  width={100}
                  height={100}
                />
                <p>Everything in Free, plus...</p>
              </li>
              <li>
                <img
                  src={allIconsContainer.checkMarkIcon}
                  alt="check mark icon"
                  width={100}
                  height={100}
                />
                <p>
                  Send up to <b>{props.planObjs.planDailyMessageLimit}</b>{" "}
                  messages
                  <span className="span-per-day-text"> per day</span>
                </p>
              </li>

              <li>
                <img
                  src={allIconsContainer.checkMarkIcon}
                  alt="check mark icon"
                  width={100}
                  height={100}
                />
                <p>Auto follow-up with profiles yet to reply your DMs</p>
              </li>

              <li>
                <img
                  src={allIconsContainer.checkMarkIcon}
                  alt="check mark icon"
                  width={100}
                  height={100}
                />
                <p>
                  Save scripts for 1-click access and chat with AI while
                  prospecting
                </p>
              </li>
              <li>
                <img
                  src={allIconsContainer.checkMarkIcon}
                  alt="check mark icon"
                  width={100}
                  height={100}
                />
                <p>
                  Get comprehensive info summaries about prospects who reply
                </p>
              </li>
            </ul>
          </div>
        )}

        {planName == "Large Scale" && (
          <div className="option">
            <ul>
              <li>
                <img
                  src={allIconsContainer.checkMarkIcon}
                  alt="check mark icon"
                  width={100}
                  height={100}
                />
                <p>Everything in business, plus...</p>
              </li>
              <li>
                <img
                  src={allIconsContainer.checkMarkIcon}
                  alt="check mark icon"
                  width={100}
                  height={100}
                />
                <p>
                  Send up to <b>{props.planObjs.planDailyMessageLimit}</b>{" "}
                  messages
                  <span className="span-per-day-text"> per day</span>
                </p>
              </li>
            </ul>
          </div>
        )}

        {planName != "Free" && (
          <button
            className="getPlanBtn"
            onClick={async (e) => {
              e.preventDefault();
              await planCheckout();
            }}
          >
            Get Plan
          </button>
        )}
      </div>
    </div>
  );
}

BasicCard.propTypes = {
  planObjs: PropTypes.shape({
    planName: PropTypes.string,
    planPrice: PropTypes.number,
    suitabilityTimeUsage: PropTypes.string,
    planDailyMessageLimit: PropTypes.number,
  }),
};
