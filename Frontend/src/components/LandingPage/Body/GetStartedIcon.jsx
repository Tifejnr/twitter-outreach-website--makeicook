import Link from "next/link";
import allIconsContainer from "../../auth/utils/icons/allIconsContainer";
import Image from "next/image";
import allLinks from "../../auth/utils/links/allLinks";
import compConstValues from "../../component-utils/comp-constant-values/compConstValues";

const buttonLabel = "Get  extension";

export default function GetStartedIcon() {
  return (
    <>
      <Link
        title="Get WFR Toolkit on chrome web store"
        href={allLinks.extensionChromeStoreLink}
        className="oauth-button real-oauth "
        target="_blank"
      >
        <section>
          <h2>{buttonLabel}</h2>
          <picture id="trelloIconForOauth">
            <Image
              src={allIconsContainer.chromeIcon}
              alt="chrome icon"
              width={100}
              height={100}
            />
          </picture>
        </section>
      </Link>

      <p id="onlyAvailableOnChromeText">
        {compConstValues.callToActionTextUnder}
      </p>
    </>
  );
}
