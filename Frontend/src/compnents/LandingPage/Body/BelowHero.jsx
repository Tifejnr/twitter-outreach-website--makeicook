import addingStartPage from "../../../assets/adding-start-page-400x300.png"
// import addingInProgress from "../../../assets/adding-in-progress-400x300.png"
import addingCompleted from "../../../assets/adding-sucess-400x300.png"

export default function BelowHero() {
  return (
    <section className='product-pic-container'>

        <article>
            <h2>Adding Member Via Email</h2>
            <picture> <img src={addingStartPage} alt="Adding Member Via Email picture" /></picture>
        </article>

        <article>
            <h2>Adding Member Completion</h2>
            <picture> <img src={addingCompleted} alt="Adding Member Completed Picture" /></picture>
        </article>

    </section>
  )
}