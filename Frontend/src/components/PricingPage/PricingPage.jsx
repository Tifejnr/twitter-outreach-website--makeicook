import { useEffect, useState } from "react";
import BasicCard from "./Cards/BasicCard";
import getAllPlansFromServer from "./getAllPlansFromServer";

export default function PricingPage() {
  const [allPricingPlansObjArray, setAllPricingPlansObjArray] = useState([]);

  useEffect(() => {
    runRightNow();
    async function runRightNow() {
      const response = await getAllPlansFromServer();

      const { allPricingPlansObj } = response;

      setAllPricingPlansObjArray(allPricingPlansObj ? allPricingPlansObj : []);
    }
  }, []);

  if (allPricingPlansObjArray.length == 0)
    return <h2>Loading pricing plans</h2>;

  return (
    <>
      <section className="pricing-section">
        <header>
          <h2>Pricing</h2>
          <p>Select plan tailored to your needs below.</p>
        </header>
        <section className="pricing-cont">
          {allPricingPlansObjArray.map((planObj, index) => (
            <BasicCard key={index} planObjs={planObj} />
          ))}
        </section>
      </section>
    </>
  );
}
