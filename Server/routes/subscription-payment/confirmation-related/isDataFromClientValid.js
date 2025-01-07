function isDataFromClientValid(allPricingPlansObj, planPrice) {
  //is it naira payment.

  const isDollarOwnValid = allPricingPlansObj.find(
    (eachPrice) => eachPrice.planPrice === planPrice
  );

  if (isDollarOwnValid) return true;

  console.log("isDollarOwnValid");
  return false;
}

export default isDataFromClientValid;
