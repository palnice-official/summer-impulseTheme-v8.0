console.log("wishlist-ui loaded");

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.wishlist-button').forEach(btn => {
    if (btn.dataset.WishlistInit) return;
    btn.dataset.WishlistInit = true;
    const variantId = btn.dataset.variantId;
    // console.log("variant id from wishlist-iu >" ,variantId);
    if (Wishlist.hasItem(variantId)) btn.classList.add('active');

    btn.addEventListener('click', e => {
    
      e.preventDefault();
      e.stopPropagation();
      const product = JSON.parse(btn.dataset.productJson);
      console.log("product from wishlist-ui >", product);
      if (Wishlist.hasItem(product.variant_id)) Wishlist.removeItem(product.variant_id);
      else Wishlist.addItem(product);
    });
  });
});
