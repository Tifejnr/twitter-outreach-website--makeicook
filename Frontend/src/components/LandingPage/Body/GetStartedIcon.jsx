import allIconsContainer from "../../auth/utils/icons/allIconsContainer";
import allLinks from "../../auth/utils/links/allLinks";
import compConstValues from "../../component-utils/comp-constant-values/compConstValues";

const buttonLabel = "Install  extension";

export default function GetStartedIcon() {
  return (
    <>
      <a
        title="Get Twitter (X) prospecting extension on chrome web store"
        href={allLinks.extensionChromeStoreLink}
        rel="noreferrer"
        className="oauth-button real-oauth"
        id="oauth-button"
        target="_blank"
      >
        <section>
          <h2>{buttonLabel}</h2>
          <picture id="trelloIconForOauth">
            <img
              src={allIconsContainer.chromeIcon}
              alt="chrome icon"
              width={100}
              height={100}
            />
          </picture>
        </section>
      </a>

      <p id="onlyAvailableOnChromeText">
        {compConstValues.callToActionTextUnder}
      </p>
    </>
  );
}
