import React from 'react'

export default function ContactUs() {
  return (
   <>
    <section className="form-main">
      <section className="main-wrapper">
        <h2 className="form-head">Contact From</h2>
        <form className="form-wrapper">
          <section className="form-card">
            <input
              className="form-input"
              type="text"
              name="full_name"
              required="required" />
            <label className="form-label" for="full_name">Full Name</label>
          </section>

          <section className="form-card">
            <input
              className="form-input"
              type="email"
              name="email"
              required="required" />
            <label className="form-label" for="email">Email</label>
          </section>

          <section className="form-card">

            <textarea
              className="form-textarea"
              maxlength="600"
              rows="5"
              name="phone_number"
              required="required"></textarea>
            <label className="form-textarea-label" for="phone_number">Query</label>

            <p>Tuau</p>
          </section>

          <section className="btn-wrap">
            <button>Submit</button>
          </section>
        </form>
      </section>
    </section>
   </>
  )
}
