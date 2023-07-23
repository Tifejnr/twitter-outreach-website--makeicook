import React from 'react'

export default function TimeInterval() {
  return (
   <section className="max-users-to-follow">
        <article>
          <h2>Interval between Each User:</h2>
          <label htmlForfor="timeIntervalSlider" className="number--label" id="timeIntervalLabel">0 minute</label>
        </article>

        <input
          type="range"
          id="timeIntervalSlider"
          className="input-slider"
          min="0"
          max="20"
          step="1"
          value="0" />
        <p className="error">error</p>
    </section>
  )
}


  