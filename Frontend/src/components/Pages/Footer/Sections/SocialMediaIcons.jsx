import allIconsContainer from "../../../auth/utils/icons/allIconsContainer";

const linkedInLink = `https://www.linkedin.com/company/collab-for-trello/`;
const facebookLink = `https://www.facebook.com/people/Collab-for-Trello/61550452245234/`;
const youtubeLink = `https://www.youtube.com/channel/UCfe6dJjgsxMnLkM9VQmC2wQ`;

export default function SocialMediaIcons() {
  return (
    <section className="socials-icon-cont">
      <ul>
        <li>
          <picture>
            <img
              src={allIconsContainer.twitterIcon}
              alt="x icon"
              title="Our X"
              width={100}
              height={100}
            />
          </picture>
        </li>

        <li>
          <a href={youtubeLink}>
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

        <li>
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
        </li>
      </ul>
    </section>
  );
}
