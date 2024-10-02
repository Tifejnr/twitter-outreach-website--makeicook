function isDataFromClientValid(pricesOfJobs, creditAmount) {
  const isItValid = pricesOfJobs.some(
    (eachPrice) => eachPrice === creditAmount
  );

  return isItValid;
}

export default isDataFromClientValid;
