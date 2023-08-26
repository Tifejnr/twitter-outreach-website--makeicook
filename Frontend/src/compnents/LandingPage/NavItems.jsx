import CustomLink from '../CustomLink'
import { smoothScroll } from '../../JS functions/Utilis/SmoothScrolling/scroll'
import { closeMenuBar } from '../../JS functions/Utilis/SmoothScrolling/scroll'
import handlePageRefreshOnLoad from '../utilis/refreshPageOnLoad';

const registerPageLink ="/register"
const signInPageLink ="/sign-in"

export default function NavItemsLandingPage() {
const faqSection = "#faq__text-container";
const pricingSection = ".pricing-section";
const toolsSection = ".tools-section-cont"

const faqClick = ()=> {
  smoothScroll(faqSection, 80)
  closeMenuBar()
}
const pricingClick = ()=> {
  smoothScroll(pricingSection, 5)
  closeMenuBar()
}
const toolsClick = ()=> {
  smoothScroll(toolsSection, 40)
  closeMenuBar()
}

  return (
      <>
      <ul>
        <li className="nav-list" onClick={toolsClick}>
           <h3 className="tools">Tools</h3>
        </li>
          <li className="nav-list" onClick={pricingClick}>
            <h3 className="pricing">Pricing</h3>
          </li>
          <li className="nav-list" onClick={faqClick}>
           <h3 className="faq">FAQ</h3>
          </li>
          <li className="nav-list">
              <h3 className="reviews">Reviews</h3>
          </li>
      </ul>

        <ul>
          <CustomLink to={signInPageLink} onClick={(e)=> {
            e.preventDefault();
            handlePageRefreshOnLoad(signInPageLink)
          }}>
           <h3 className="login">Log In</h3>
          </CustomLink>
          <CustomLink to={registerPageLink} className="sign-up-cont" onClick={(e)=> {
            e.preventDefault();
            handlePageRefreshOnLoad(registerPageLink)
          }}>
          <h4 className='sign-up'>Start for free</h4>
          </CustomLink>
        </ul>
</>
)
}



