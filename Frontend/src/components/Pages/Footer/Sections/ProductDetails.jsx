import pagesLinkObj from "../../../component-utils/pageLinks/pagesLinkObj";

export default function ProductDetails() {
  return (
    <>
      <section>
        <h3>Product</h3>

        <ul>
          <a href={pagesLinkObj.toolsLink}>
            <p>WFR Toolkit</p>
          </a>

          <a href={pagesLinkObj.faqLink}>
            <p>FAQ</p>
          </a>

          <a href={pagesLinkObj.reviewsLink}>
            <p>Testimonials</p>
          </a>

          <a href={pagesLinkObj.pricingLink}>
            <p>Pricing</p>
          </a>

          {/* <ahref=""></a> */}
        </ul>
      </section>
    </>
  );
}
