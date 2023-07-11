export default async function setCookie(jwtToken) {
  try {
    // Calculate expiry date
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    // Set the cookie
    document.cookie = `cftAuth=${jwtToken}; expires=${expiryDate.toUTCString()}; path=/`;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
