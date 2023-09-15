import useStore from '../Hooks/Zustand/usersStore';
import CustomLink from '../CustomLink'
import { smoothScroll } from '../../JS functions/Utilis/SmoothScrolling/scroll'
import { closeMenuBar } from '../../JS functions/Utilis/SmoothScrolling/scroll'
import handlePageRefreshOnLoad from '../utilis/refreshPageOnLoad';
import { pagesLinkObj } from '../utilis/pageLinks/pagesLinkObj';

export default function NavItemsLandingPage() {
const setIsMenuIconShowing = useStore((state) => state.setIsMenuIconShowing);

const faqSection = "#faq__text-container";
const pricingSection = ".pricing-section";
const toolsSection = ".tools-section-cont"

const faqClick = ()=> {
  smoothScroll(faqSection, 80)
  closeMenuBar()
  setIsMenuIconShowing(true)
}
const pricingClick = ()=> {
  smoothScroll(pricingSection, 36)
  closeMenuBar()
    setIsMenuIconShowing(true)
}
const toolsClick = ()=> {
  smoothScroll(toolsSection, 60)
  closeMenuBar()
  setIsMenuIconShowing(true)
}

  return (
      <>
      <li>
        <ul className='inner-nav-item-container'>
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
      </li>

        <li>
          <ul className='inner-nav-item-container'>
            <CustomLink to={pagesLinkObj.signInPageLink} onClick={(e)=> {
              e.preventDefault();
              handlePageRefreshOnLoad(pagesLinkObj.signInPageLink)
            }}>
             <h3 id="loginLandingPage">Log In</h3>
            </CustomLink>
            <CustomLink to={pagesLinkObj.registerPageLink} className="sign-up-cont" onClick={(e)=> {
              e.preventDefault();
              handlePageRefreshOnLoad(pagesLinkObj.registerPageLink)
            }}>
            <h4 className='sign-up'>Start for free</h4>
            </CustomLink>
          </ul>
        </li>
</>
)
}



