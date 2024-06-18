import allImagesContainerArray from "../../auth/utils/images/allImagesContainer";
import TestimonialPictureBlueprint from "./testimonial-pictures/TestimonialPictureBlueprint";

export default function Testimonials() {
  return (
    <section className="hero-container testimonials-cont">
      <section className="hero-inner-container">
        <h2>Testimonials</h2>

        <h4>What users of the extension have said :</h4>

        <section className="all-testimonials-container">
          {allImagesContainerArray.map((eachImageSrc, index) => (
            <TestimonialPictureBlueprint
              key={index}
              eachImageSrc={eachImageSrc}
            />
          ))}
        </section>
      </section>
    </section>
  );
}
