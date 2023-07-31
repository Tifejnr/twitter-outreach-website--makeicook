import React, { useEffect, useRef } from 'react';
import SliderTimeInterval from './Sliders/TimeInterval';
import useStore from '../../Hooks/Zustand/usersStore';



export default function Input(props) {
    const setTextAreaRefEl = useStore((state) => state.setTextAreaRefEl);
    const setTextAreaValue = useStore((state) => state.setTextAreaValue);
    const textAreaValue = useStore((state) => state.textAreaValue);
    const textareaRef = useRef(null);

  // Function to handle textarea value changes
  const handleTextareaChange = (event) => {
    setTextAreaValue(event.target.value);
  };

  useEffect(() => {
   setTextAreaRefEl(textareaRef.current)
  }, []);

  return (

    <>
        <section className="memberDetailsCont">
          <label htmlFor='memberDetailTextArea'><p>{props.inputLabel}</p></label>
          <textarea
            value={textAreaValue}
            onChange={handleTextareaChange}
            ref={textareaRef}
            id="memberDetailTextArea"
            cols="40"
            rows="6"
            placeholder={props.inputPlaceholderText}></textarea>
          <p className="error"></p>
        </section>

        <section>
          <SliderTimeInterval />
        </section>
        
    </>

  )
}


