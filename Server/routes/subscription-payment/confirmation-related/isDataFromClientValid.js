function isDataFromClientValid(allPricingPlansObj, planPrice) {
  const { nairaPricingPlansObjArray, dollarPricingPlansObjArray } =
    allPricingPlansObj;

  //is it naira payment.

  const isNairaOwnValid = nairaPricingPlansObjArray.find(
    (eachPrice) => eachPrice.planPrice === planPrice
  );
  const isDollarOwnValid = dollarPricingPlansObjArray.find(
    (eachPrice) => eachPrice.planPrice === planPrice
  );

  if (isNairaOwnValid || isDollarOwnValid) return true;

  console.log("isNairaOwnValid || isDollarOwnValid");
  return false;
}

export default isDataFromClientValid;
