import React from 'react'
import faqToggleIcon from "../../../assets/SVGs/faq-toggle-icon.svg"
import toggleOnClick from "../../../JS functions/Utilis/Faq/faqToggling"

export default function Blueprint() {
  return (
   <li className="faq__faq-item" onClick={toggleOnClick}>
            <section className="faq-item__summary">
              <p className="faq-item__description">1. When will I get my Invite?</p>
              <div className="faq-item__arrow-container">
                <img
                  src={faqToggleIcon}
                  alt="faq toggle icon"
                  className="faq-item__arrow-icon" />
              </div>
            </section>
            <section className="faq-item__detail">
              Within 6 hours of making request on niches you want jobs on.
              <p>
                Subsequent Invites will be sent within 12 hours of completion of
                previous job.
              </p>
            </section>
 </li>
  )
}
