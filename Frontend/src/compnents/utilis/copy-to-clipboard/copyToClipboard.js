export default async function copyToClipboard(value) {
  try {
    await navigator.clipboard.writeText(value);

    return true;
    // const copyBtn = document.getElementsByClassName("copy-btn")[0];
    // copyBtn.style.backgroundColor = "rgba(255, 0, 0, 0.65)";

    // setTimeout(() => {
    //   copyBtn.style.backgroundColor = "";
    // }, 3000);
  } catch (err) {
    console.error("Failed to copy text: ", err);

    return false;
  }
}
