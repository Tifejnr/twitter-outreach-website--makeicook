import React from 'react'
import facebookIcon from "../../../../assets/SVGs/facebook.svg"
import twitterIcon from "../../../../assets/SVGs/twitter.svg"
import instagramIcon from "../../../../assets/SVGs/instagram.svg"

export default function SocialMediaIcons() {
  return (
    <section className='socials-icon-cont'>

        <ul>
            <li>
                <picture>
                    <img src={twitterIcon} alt="twitter icon"  title='Our Twitter'/>
                </picture>

            </li>

            <li>
                <picture><img src={instagramIcon} alt="instagram icon" title='Our Instagram' /></picture>
            </li>

            <li>
                <picture><img src={facebookIcon} alt="facebook icon" title='Our Facebook'/></picture>
            </li>
        </ul>

    </section>
  )
}
