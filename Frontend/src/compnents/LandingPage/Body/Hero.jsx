import React from "react";
import { Link } from "react-router-dom";
import handlePageRefreshOnLoad from "../../utilis/refreshPageOnLoad";
import { pagesLinkObj } from "../../utilis/pageLinks/pagesLinkObj";

export default function Hero() {
  return (
    <>
      <section className="hero-container">
        <div className="hero-inner-container">
          <h1>
            Add and remove same trello members from multiple boards and
            workspaces at once
          </h1>
          <h3>
            Save time and stress of manually adding and removing trello team
            members from multiple boards and workspaces
          </h3>

          <section className="call-to-action-cont">
            <Link
              to={pagesLinkObj.registerPageLink}
              className="oauth-button"
              onClick={(e) => {
                e.preventDefault();
                handlePageRefreshOnLoad(pagesLinkObj.registerPageLink);
              }}
            >
              <h2>Start for free</h2>
            </Link>
            <ul>
              <li>
                <p> 5 free credits for trial</p>
              </li>
              <li>
                {" "}
                <p>No credit card required</p>{" "}
              </li>
            </ul>
          </section>
        </div>
      </section>
    </>
  );
}
