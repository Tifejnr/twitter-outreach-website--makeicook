import pagesLinkObj from "../../../component-utils/pageLinks/pagesLinkObj";

export default function ProductDetails() {
  return (
    <>
      <section>
        <h3>Product</h3>

        <ul>
          <a href={pagesLinkObj.toolsLink} target="_blank" rel="noreferrer">
            <p>Benefits</p>
          </a>
          <a href={pagesLinkObj.pricingLink} target="_blank" rel="noreferrer">
            <p>Pricing</p>
          </a>

          <a href={pagesLinkObj.faqLink} target="_blank" rel="noreferrer">
            <p>FAQ</p>
          </a>

          <a href={pagesLinkObj.reviewsLink} target="_blank" rel="noreferrer">
            <p>Testimonials</p>
          </a>

          {/* <a href={pagesLinkObj.pricingLink} target="_blank" rel="noreferrer">
            <p>Pricing</p>
          </a> */}

          {/* <ahref=""></a> */}
        </ul>
      </section>
    </>
  );
}
