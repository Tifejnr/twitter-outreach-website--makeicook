export default function customTransRefGenLemonsqueezy(coachCode, reference) {
  const timestamp = new Date().getTime().toString();
  //   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  //   let reference = "";
  //   for (let i = 0; i < 6; i++) {
  //     reference += chars.charAt(Math.floor(Math.random() * chars.length));
  //   }

  const customTransactionReference = `${coachCode}${reference}${timestamp}`;

  console.log(customTransactionReference);
  return customTransactionReference;
}
