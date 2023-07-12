import letterC from "../../assets/SVGs/letter-c.svg"
import letterF from "../../assets/SVGs/letter-f.svg"
import letterT from "../../assets/SVGs/letter-t.svg"

export default function NavLogo() {
  return (
    <>

          <section className="logo-container">
            <section className="logoIconsContainer">
              <picture className='logo-icon'>
                <img src={letterC} alt="" />
              </picture>
              <picture className="logo-icon letter-f">
                <img src={letterF} alt="" />
              </picture>
              <picture className="logo-icon letter-t">
                <img src={letterT} alt="" />
              </picture>
            </section>
            <h2 className="logo-title">Collab for Trello</h2>
          </section>
    </>
  )
}
