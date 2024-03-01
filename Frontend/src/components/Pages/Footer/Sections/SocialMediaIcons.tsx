import Link from "next/link";
import allIconsContainer from "@/app/components/auth/utils/icons/allIconsContainer";
import Image from "next/image";

const linkedInLink = `https://www.linkedin.com/company/collab-for-trello/`;
const facebookLink = `https://www.facebook.com/people/Collab-for-Trello/61550452245234/`;
const youtubeLink = `https://www.youtube.com/channel/UCfe6dJjgsxMnLkM9VQmC2wQ`;

export default function SocialMediaIcons() {
  return (
    <section className="socials-icon-cont">
      <ul>
        <li>
          <picture>
            <Image
              src={allIconsContainer.twitterIcon}
              alt="x icon"
              title="Our X"
              width={100}
              height={100}
            />
          </picture>
        </li>

        <li>
          <Link href={youtubeLink}>
            <picture>
              <Image
                src={allIconsContainer.youtubeIcon}
                alt="youtube icon"
                title="Our Youtube"
                width={100}
                height={100}
              />
            </picture>
          </Link>
        </li>

        <li>
          <Link href={linkedInLink}>
            <picture>
              <Image
                src={allIconsContainer.linkedInIcon}
                alt="linkedIn icon"
                title="Our LinkedIn"
                width={100}
                height={100}
              />
            </picture>
          </Link>
        </li>

        <li>
          <Link href={facebookLink}>
            <picture>
              <Image
                src={allIconsContainer.facebookIcon}
                alt="facebook icon"
                title="Our Facebook"
                width={100}
                height={100}
              />
            </picture>
          </Link>
        </li>
      </ul>
    </section>
  );
}
