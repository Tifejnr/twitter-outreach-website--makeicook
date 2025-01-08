export default function getAccountDailyMessagesLimit(accountUser) {
  if (!accountUser.isPaid) {
    return 5;
  } else if (accountUser.paidFor.includes("Business") && accountUser.isPaid) {
    return 500;
  } else if (accountUser.paidFor.includes("Large") && accountUser.isPaid) {
    return 3000;
  }
}
