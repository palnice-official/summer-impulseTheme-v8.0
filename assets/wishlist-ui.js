document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".wishlist-button").forEach((btn) => {
    const variant_id = btn.dataset.variant_id;
    if (Wishlist.hasItem(variant_id)) btn.classList.add("active");
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const product = JSON.parse(btn.dataset.product); //check this part
      if (Wishlist.hasItem(product.variant_id))
        Wishlist.removeItem(product.variant_id);
      else Wishlist.addItem(product);
    });
  });
});
