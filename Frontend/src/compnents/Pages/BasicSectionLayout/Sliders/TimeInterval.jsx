import React, { useEffect, useRef} from "react";
import useStore from "../../../Hooks/Zustand/usersStore";

export default function SliderTimeInterval() {

const timeInterval = useStore((state) => state.timeInterval);
const setTimeInterval = useStore((state) => state.setTimeInterval);
const timeIntervalRef = useStore((state) => state.timeIntervalRef);
const setTimeIntervalRef = useStore((state) => state.setTimeIntervalRef);

  const timeIntervalSliderRef = useRef(null);
  const handleSliderChange = (event) => {
    const newValue = parseInt(event.target.value, 10); // Parse the value to an integer
    setTimeInterval(newValue);
  };

  useEffect(() => {
    setTimeIntervalRef(timeIntervalSliderRef.current);
  }, [timeIntervalRef]);

  return (
    <section className="time-interval-container">
      <article>
        <h2>Set time interval between additions:</h2>
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
       Drag the slider to set desired time interval
      </p>
    </section>
  );
}
