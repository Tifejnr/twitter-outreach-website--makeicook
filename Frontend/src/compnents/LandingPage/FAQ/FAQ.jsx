import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Blueprint from './Blueprint'

export default function FAQ() {
const [faqObj1,setFaqObj1 ]= useState({
    question : "What are credits?",
    answer : "Credits are the Pro subscription’s currency and can be used to download icons and illustrations. When you subscribe to Pro, you will get a number of credits added to your account each month. When downloading premium products, you will “pay” in credits. 1 icon = 1 credit, 1 illustration = 5 credits, 1 3D illustration = 5 credits. Any unused credits will roll over to the following month."
})

const [faqObj2,setFaqObj2 ]= useState({
    question : "Do credits expire?",
    answer : "No. Credits bought are everlasting"
})

const [faqObj3,setFaqObj3 ]= useState({
    question : "Is there delete team member from multiple boards feature",
    answer : `Yes there is`
})
const [faqObj4,setFaqObj4 ]= useState({
    question : "Is there workspaces delete and add features aswell?",
    answer : `Yes there is`
})

  return (
    <>
      <section className="faq__text-container" id="faq__text-container">
        <div className="faq__head">
          <h2 className="faq__heading">Frequently Asked Questions</h2>
        </div>

        <ul className="faq__faqs-list">
          <Blueprint faqObj={faqObj1}/>
          <Blueprint faqObj={faqObj2}/>
          <Blueprint faqObj={faqObj3}/>
          <Blueprint faqObj={faqObj4}/>
        </ul>
      </section>
    </>
  )
}
