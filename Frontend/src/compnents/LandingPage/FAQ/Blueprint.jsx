import React , {useState} from 'react'
import faqToggleIcon from "../../../assets/SVGs/faq-toggle-icon.svg"

export default function Blueprint(props) {
    const [isClicked, setIsClicked] = useState(false);

    const handleToggle= ()=> {
         setIsClicked((prevState)=>!prevState)
    }

   const rotateOnToggle = {
    transform: isClicked && "rotate(180deg)"
  };

 const openFaqDetailsStyle= {
        maxHeight: isClicked &&  "100%",
        marginTop: isClicked && '1.2rem',
        overflow: isClicked &&  'visible',
      }

  return (
   <li className="faq__faq-item" onClick={handleToggle}>
          <section className="faq-item__summary">
              <p className="faq-item__description">{props.faqObj.question}</p>
              <div className="faq-item__arrow-container">
                <img
                style={rotateOnToggle}
                  src={faqToggleIcon}
                  alt="faq toggle icon"
                  className="faq-item__arrow-icon" />
              </div>
          </section>

          <section  className='faq-item__detail' style={openFaqDetailsStyle}>
            <p>{props.faqObj.answer}  </p> 
          </section>
   
 </li>
  )
}
