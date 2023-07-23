import React, { useEffect, useRef, useContext } from "react";
import { MyContext } from "../../../Hooks/Contexts/UserContext";

export default function SliderTimeInterval() {
  const {
    t,
    setT,
    tRefEl,
    setTec,
    timeInterval,
    setTimeInterval,
    timeIntervalRef,
    setTimeIntervalRef,
  } = useContext(MyContext);

  const timeIntervalSliderRef = useRef(null);
  const handleSliderChange = (event) => {
    const newValue = parseInt(event.target.value, 10); // Parse the value to an integer
    setTimeInterval(newValue);
  };

  useEffect(() => {
    setTimeIntervalRef(timeIntervalSliderRef.current);
  }, []);
  return (
    <section className="time-interval-container">
      <article>
        <h2>Select time interval between additions:</h2>
        <label
          htmlFor="timeIntervalSlider"
          className="number--label"
          id="timeIntervalLabel">
          { timeInterval === 1 ? (
            <p> { timeInterval} second</p>
          ) : (
            <p> { timeInterval} seconds</p>
          )}
        </label>
      </article>

      <input
        ref={timeIntervalSliderRef}
        type="range"
        id="timeIntervalSlider"
        className="input-slider"
        onChange={handleSliderChange}
        min="0"
        max="20"
        step="1"
        value={timeInterval}
      />
      <p className="error">
        Move the slider above to select desired time interval
      </p>
    </section>
  );
}
