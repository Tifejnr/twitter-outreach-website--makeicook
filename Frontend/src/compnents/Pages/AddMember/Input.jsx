import React from 'react'

export default function Input(props) {
  return (
      <section className="form-container">
          <form id="survey-form" >
            <article className='input-form'> 
              <p> {props.inputLabel}</p> 
              <input
              className='inputValue'
                type="text"
                id="resultoo"
                placeholder={props.inputPlaceholderText}
               />
            </article>
          </form>
        </section>
  )
}
