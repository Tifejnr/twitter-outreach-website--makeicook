import React from 'react'
import { Link } from 'react-router-dom'
import checkMark from "../../../assets/SVGs/check-mark.svg";



export default function BasicCard(props) {
  return (
<div class="col-sm-4">
            <div class="card text-center">
              <picture class="title">
                <img
                  class="fa"
                  src={props.planObjs.planPic}
                  alt="basic plan icon" />

                <h2>{props.planObjs.planName}Basic</h2>
              </picture>
              <div class="price">
                <h4>$5</h4>

                <p>
                 Suitable if our tools usage by you will be more than {props.planObjs.suitabilityTimeUsage} times
                  in a month.
                </p>
              </div>
              <div class="option">
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
                    <p>No Expiration</p>
                  </li>
                  <li>
                    <img
                      src={checkMark}
                      alt="check mark icon" />
                    <p>Total Usage - {props.planObjs.planCreditsAmount * 2} times</p>
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
              <Link htmlFor="/">Get Plan</Link>
            </div>
    </div>
  )
}
