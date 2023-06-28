import addingStartPage from "../../../assets/adding-start-page.png"
import addingInProgress from "../../../assets/adding-in-progress.png"
import addingCompleted from "../../../assets/adding-sucess.png"

export default function BelowHero() {
  return (
    <section className='product-pic-container'>

        <article>
            <h2>Adding Member Via Email</h2>
            <picture> <img src={addingStartPage} alt="Adding Member Via Email picture" /></picture>
        </article>

        <article>
            <h2>Adding Member in Progress</h2>
            <picture> <img src={addingInProgress} alt="Adding Member in Progress Picture" /></picture>
        </article>

        <article>
            <h2>Adding Member Completion</h2>
            <picture> <img src={addingCompleted} alt="Adding Member Completed Picture" /></picture>
        </article>

    </section>
  )
}
