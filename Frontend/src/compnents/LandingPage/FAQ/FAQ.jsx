import React from 'react'
import Blueprint from './Blueprint'

export default function FAQ() {
  return (
    <>
      <section className="faq__text-container" id="faq__text-container">
        <div className="faq__head">
          <h2 className="faq__heading">Frequently Asked Questions</h2>
          <div className="search-input">
            <input id="search-btn" type="checkbox" checked />
            <input id="search-bar" type="text" placeholder="Search..." />
          </div>
        </div>
        <h2 id="no_search-found"></h2>
        <ul className="faq__faqs-list">
          <Blueprint/>
        </ul>
      </section>
    </>
  )
}
