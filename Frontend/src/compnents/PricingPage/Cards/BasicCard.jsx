import React, {useState,useRef} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import checkMark from "../../../assets/SVGs/check-mark.svg";
import getCheckoutLink from '../checkoutUrl/fetchUrl';



export default function BasicCard(props) {
  const planNameRef = useRef(null);
  const navigate = useNavigate();

    const planCheckout = async () => {
    if (!planNameRef.current) return console.log("plan name ref not found")
      const planName = planNameRef.current.innerHTML;
      const response = await getCheckoutLink(planName);
      if (response.unauthorizedToken)  return ( navigate('/register'))

      const checkoutUrl= response

    // Redirect the user to the specified link
    window.location.href = checkoutUrl
  };

  return (
<div className="col-sm-4">
            <div className="card text-center">
              <picture className="title">
                <img
                  className="fa"
                  src={props.planObjs.planPic}
                  alt="basic plan icon" />

                <h2 ref={planNameRef}> {props.planObjs.planName} </h2>
              </picture>
              <div className="price">
                <h4>${props.planObjs.planPrice}</h4>

                <p>
                 <b>Right choice</b> if tools usage is <b>{props.planObjs.choiceIndcator? "less than" : "more than"} {props.planObjs.suitabilityTimeUsage}</b> times a month.
                </p>
              </div>
              <div className="option">
                <ul>
                  <li>
                    <img
                      src={checkMark}
                      alt="check mark icon" />
                    <p> {props.planObjs.planCreditsAmount} Credits</p>
                  </li>
                  <li>
                    <img
                      src={checkMark}
                      alt="check mark icon" />
                    <p>Usage - <b>{props.planObjs.planCreditsAmount}</b> times</p>
                  </li>
                  <li>
                    <img
                      src={checkMark}
                      alt="check mark icon" />
                    <p>No Expiration</p>
                  </li>
                  <li>
                    <img
                      src={checkMark}
                      alt="check mark icon" />
                    <p>Access to All Tools</p>
                  </li>
                  <li>
                    <img
                      src={checkMark}
                      alt="check mark icon" />
                    <p>Access to All Training Material</p>
                  </li>
                </ul>
              </div>
              <button className='getPlanBtn' onClick={planCheckout} >Get Plan</button>
            </div>
    </div>
  )
}
