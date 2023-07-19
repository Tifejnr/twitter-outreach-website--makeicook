import CustomLink from '../CustomLink'
import { smoothScroll } from '../../JS functions/Utilis/SmoothScrolling/scroll'
import { closeMenuBar } from '../../JS functions/Utilis/SmoothScrolling/scroll'

export default function NavItemsLandingPage() {
const faqSection = "#faq__text-container";
const pricingSection = ".pricing-section";
const toolsSection = ".tools-section-cont"

const faqClick = ()=> {
  smoothScroll(faqSection, 80)
  closeMenuBar()
}
const pricingClick = ()=> {
  smoothScroll(pricingSection, 70)
  closeMenuBar()
}
const toolsClick = ()=> {
  smoothScroll(toolsSection, 40)
  closeMenuBar()
}

  return (
      <>
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

        <CustomLink to="/sign-in">
         <h3 className="login">Log In</h3> 
        </CustomLink>

        <CustomLink to="/register" className="sign-up-cont">
        <h4 className='sign-up'>Start for free</h4> 
        </CustomLink>
</>
)
}



