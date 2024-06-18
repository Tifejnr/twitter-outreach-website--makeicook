import allIconsContainer from "../../../auth/utils/icons/allIconsContainer";
import allLinks from "../../../auth/utils/links/allLinks";

export default function SocialMediaIcons() {
  return (
    <section className="socials-icon-cont">
      <ul>
        <li>
          <a
            href={allLinks.twitterAccountLink}
            target="_blank"
            rel="noreferrer"
          >
            <picture>
              <img
                src={allIconsContainer.twitterIcon}
                alt="x icon"
                title="Our X"
                width={100}
                height={100}
              />
            </picture>
          </a>
        </li>

        <li>
          <a
            href={allLinks.youtubeAccountLink}
            target="_blank"
            rel="noreferrer"
          >
            <picture>
              <img
                src={allIconsContainer.youtubeIcon}
                alt="youtube icon"
                title="Our Youtube"
                width={100}
                height={100}
              />
            </picture>
          </a>
        </li>

        {/* <li>
          <a href={linkedInLink}>
            <picture>
              <img
                src={allIconsContainer.linkedInIcon}
                alt="linkedIn icon"
                title="Our LinkedIn"
                width={100}
                height={100}
              />
            </picture>
          </a>
        </li>

        <li>
          <a href={facebookLink}>
            <picture>
              <img
                src={allIconsContainer.facebookIcon}
                alt="facebook icon"
                title="Our Facebook"
                width={100}
                height={100}
              />
            </picture>
          </a>
        </li> */}
      </ul>
    </section>
  );
}
