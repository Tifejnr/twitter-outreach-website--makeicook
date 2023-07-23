import React, { useContext, useEffect, useRef } from 'react';
import SliderTimeInterval from './Sliders/TimeInterval';
import { MyContext } from '../../Hooks/Contexts/UserContext';

export default function Input(props) {
    const { textAreaValue, setTextAreaValue, textAreaRefEl, setTextAreaRefEl } = useContext(MyContext);
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
            rows="10"
            placeholder={props.inputPlaceholderText}></textarea>
          <p className="error"></p>
        </section>

        <section>
          <SliderTimeInterval />
        </section>
        
    </>

  )
}


