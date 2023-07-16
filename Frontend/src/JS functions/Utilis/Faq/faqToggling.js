function toggleOnClick() {
  const clickedItem = e.target.closest("li");
  const itemDetail = clickedItem.querySelector(".faq-item__detail");
  const clickedItemActive = clickedItem.classList.contains("active");
  clickedItem.classList.toggle("active");
  if (clickedItemActive) {
    itemDetail.style.maxHeight = null;
  } else {
    const scrollHeight = itemDetail.scrollHeight;
    itemDetail.style.maxHeight = `${scrollHeight}px`;
  }
}

export { toggleOnClick };
