import {Link } from 'react-router-dom'
import facebookIcon from "../../../../assets/SVGs/socials/facebook.svg"
import twitterIcon from "../../../../assets/SVGs/socials/Twitter X.svg"
import youtubeIcon from "../../../../assets/SVGs/socials/youtube-icon.svg"
import linkedInIcon from "../../../../assets/SVGs/socials/linkedIn-icon.svg"

const linkedInLink = `https://www.linkedin.com/company/collab-for-trello/`;
const facebookLink = `https://www.facebook.com/people/Collab-for-Trello/61550452245234/`
const youtubeLink = `https://www.youtube.com/channel/UCfe6dJjgsxMnLkM9VQmC2wQ`

export default function SocialMediaIcons() {
  return (
    <section className='socials-icon-cont'>

        <ul>
            <li>
                <picture>
                    <img src={twitterIcon} alt="x icon"  title='Our X'/>
                </picture>

            </li>

            <li>
                <Link to={youtubeLink}>
                   <picture><img src={youtubeIcon} alt="youtube icon" title='Our Youtube' /></picture>
                </Link>
            </li>

            <li>
              <Link to={linkedInLink}>
                <picture><img src={linkedInIcon} alt="linkedIn icon" title='Our LinkedIn'/></picture>
               </Link>
            </li>

            <li>
                <Link to={facebookLink}>
                 <picture><img src={facebookIcon} alt="facebook icon" title='Our Facebook'/></picture>
                </Link>
            </li>
        </ul>

    </section>
  )
}
