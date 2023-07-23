import React, {useState} from 'react'

export default function SliderTimeInterval() {
    const [sliderValue, setSliderValue] = useState(1);

   const handleSliderChange = (event) => {
    const newValue = parseInt(event.target.value, 10); // Parse the value to an integer
    setSliderValue(newValue);
  };


  return (
   <section className="time-interval-container">
        <article>
          <h2>Select time interval between additions:</h2>
          <label htmlForfor="timeIntervalSlider" className="number--label" id="timeIntervalLabel"><p>{sliderValue} seconds</p></label>
        </article>

        <input
          type="range"
          id="timeIntervalSlider"
          className="input-slider"
          onChange={handleSliderChange}
          min="0"
          max="20"
          step="1"
          value={sliderValue} />
        <p className="error">error</p>
    </section>
  )
}


  