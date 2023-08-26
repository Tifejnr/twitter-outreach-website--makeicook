import {Link } from 'react-router-dom'
import facebookIcon from "../../../../assets/SVGs/facebook.svg"
import twitterIcon from "../../../../assets/SVGs/Twitter X.svg"
import instagramIcon from "../../../../assets/SVGs/instagram.svg"
import linkedInIcon from "../../../../assets/SVGs/linkedIn-icon.svg"

const linkedInLink = `https://www.linkedin.com/company/collab-for-trello/`;
const facebookLink = `https://www.facebook.com/people/Collab-for-Trello/61550452245234/`

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
                <picture><img src={instagramIcon} alt="instagram icon" title='Our Instagram' /></picture>
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
