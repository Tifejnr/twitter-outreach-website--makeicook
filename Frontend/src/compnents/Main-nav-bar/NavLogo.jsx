import letterC from "../../assets/SVGs/letter-c.svg"
import letterF from "../../assets/SVGs/letter-f.svg"
import letterT from "../../assets/SVGs/letter-t.svg"
import handlePageRefreshOnLoad from "../../compnents/utilis/refreshPageOnLoad"

const homePageLink = "/"


export default function NavLogo() {
  return (
    <>
        <section className="logo-container" onClick={(e)=> {
              e.preventDefault()
              handlePageRefreshOnLoad(homePageLink)
          }}>

            <section className="logoIconsContainer">
              <picture className='logo-icon'>
                <img src={letterC} alt="letter-c" />
              </picture>
              <picture className="logo-icon letter-f">
                <img src={letterF} alt="letter-f" />
              </picture>
              <picture className="logo-icon letter-t">
                <img src={letterT} alt="letter-t" />
              </picture>
            </section>
            <h2 className="logo-title">Collab for Trello</h2>
        </section>
    </>
  )
}
