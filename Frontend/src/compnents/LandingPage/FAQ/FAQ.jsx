import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Blueprint from './Blueprint'

import { faqArray } from './AllFaqsObj'

export default function FAQ() {

  return (
    <>
      <section className="faq__text-container" id="faq__text-container">
        <div className="faq__head">
          <h2 className="faq__heading">Frequently Asked Questions</h2>
        </div>

        <ul className="faq__faqs-list">

          {faqArray.map((faqObj, index) => (
              <Blueprint key={index} faqObj={faqObj} />
            ))}
  
        </ul>
      </section>
    </>
  )
}
