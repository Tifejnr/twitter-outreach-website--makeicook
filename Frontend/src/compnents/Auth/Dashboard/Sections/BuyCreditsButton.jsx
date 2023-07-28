import React from 'react'
import { Link } from 'react-router-dom'

export default function BuyCreditsButton() {
  return (
  <button className='buy-credits-btn'><Link to={"/pricing"}>Buy Credits</Link></button>
  )
}
