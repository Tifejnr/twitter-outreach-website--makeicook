import React, { useEffect, useRef } from 'react';
// import SliderTimeInterval from './Sliders/TimeInterval';
import useStore from '../../Hooks/Zustand/usersStore';

const successColor = "#09c372";
const errorColor = "#ff3860";

export default function Input(props) {
    const textAreaError = useStore((state) => state.textAreaError);
    const setTextAreaValue = useStore((state) => state.setTextAreaValue);
    const textAreaValue = useStore((state) => state.textAreaValue);
    const textareaRef = useRef(null);

  // Function to handle textarea value changes
  const handleTextareaChange = (event) => {
    setTextAreaValue(event.target.value);
  };

    //text area border when error ocuurs
     const textareaStyle= {
        borderColor: textAreaError== null ? "" :  textAreaError ?  errorColor : successColor,
      }

     const textareaErrorStyle= {
        color: textAreaError== null ? "" :  textAreaError && errorColor 
      }

  return (
    <>
        <section className="memberDetailsCont">
          <label htmlFor='memberDetailTextArea'><p>{props.inputLabel}</p></label>
          <textarea
            style={textareaStyle}
            value={textAreaValue}
            onChange={handleTextareaChange}
            ref={textareaRef}
            id="memberDetailTextArea"
            cols="40"
            rows="6"
            placeholder={props.inputPlaceholderText}></textarea>
          <p className="error" style={textareaErrorStyle}>{textAreaError}</p>
        </section>       
    </>

  )
}


