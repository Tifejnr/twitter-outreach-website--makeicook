import smoothScroll from "../../../../auth/utils/smooth-scroll/smoothScroll";
import ProfileIcon from "../profile-icon/ProfileIcon";
import all

export default function NavItemsHomepage() {
  function closeMenuBar() {
    const menuBarLabelEl = document.getElementById("nav__checkbox");
    menuBarLabelEl.checked = false;
  }

  function scrollToSafetyRulesContainer() {
    closeMenuBar();
    smoothScroll(".safety-rules-container", 140);
  }
  function scrollToMakeRequestContainer() {
    closeMenuBar();
    smoothScroll(".requestSection", 60);
  }
  function scrollToFaqContainer() {
    closeMenuBar();
    smoothScroll(".faq__text-container", 100);
  }

  return (
    <>
      <li className="nav-list" onClick={scrollToMakeRequestContainer}>
        <h3 className="makeRequest">Make Request</h3>
      </li>
      <li className="nav-list" onClick={scrollToSafetyRulesContainer}>
        <h3 className="rules">5 Rules</h3>
      </li>
      <li className="nav-list" onClick={scrollToFaqContainer}>
        <h3 className="faq">FAQ</h3>
      </li>

      <li className="nav-list">
        <a href={allLinks.userDashboardLink} className="userDashBoardLarge">
          <ProfileIcon />
        </a>
      </li>
    </>
  );
}
