import React from 'react'

export default function Input() {
  return (
      <section className="form-container">
          <form id="survey-form">
            <article> 
              <p>Trello-name:</p> 
              <input
              className='inputValue'
                type="text"
                id="resultoo"
                placeholder="Enter Email"
               />
            </article>
          </form>
        </section>
  )
}
