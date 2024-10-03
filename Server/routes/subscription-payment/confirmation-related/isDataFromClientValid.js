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

  console.log(
    "isNairaOwnValid || isDollarOwnValid",
    isNairaOwnValid,
    isDollarOwnValid
  );

  if (isNairaOwnValid || isDollarOwnValid) return true;
  return false;
}

export default isDataFromClientValid;
