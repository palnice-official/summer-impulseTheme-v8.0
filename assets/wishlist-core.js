console.log("wishlist-core loaded");
// window.Wishlist = (function () {
//   const STORAGE_KEY = "wishlist_items_v1";
//   const EXPIRY_DAYS = 30;

//   let config = {
//     mergeOnLogin: true,
//     toastEnabled: true,
//     animationEnabled: true,
//   };
//   //  _getLocal > intended to be "private" or for internal use only.
//   function _getLocal() {
//     const data = localStorage.getItem(STORAGE_KEY);
//     if (!data) return [];
//     const parsed = JSON.parse(data);
//     const expired = new Date.now() - EXPIRY_DAYS * 24 * 60 * 60 * 1000;
//     return parsed.filter((item) => item.timestamp > expired);
//   }

//   function _setLocal(items) {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
//   }

//   function addItem(product) {
//     let items = _getLocal();
//     if (!items.find((p) => p.variant_id === product.variant_id)) {
//       product.timestamp = Date.now();
//       items.push(product);
//       _setLocal(items);
//       _triggerToast("Added to Wishlist ❤️");
//       _triggerHeart(product.variant_id, true);
//     }
//   }

//   function removeItem(variant_id) {
//     let items = _getLocal().filter((p) => p.variant_id !== variant_id);
//     _triggerToast("Removed from Wishlist 💔");
//     _triggerHeart(variant_id, false);
//   }

//   function hasItem(variant_id) {
//     return _getLocal().some((p) => p.variant_id === variant_id);
//   }

//   function getItems() {
//     return _getLocal();
//   }

//   // Merging logic (guest > loggred in)
//   async function mergeToAccount(customerId) {
//     if (!config.mergeOnLogin) return;

//     const localItems = _getLocal();
//     // 1️⃣ Get server-side metafield (via your metafield endpoint)
//     // 2️⃣ Merge unique items, update metafield
//     // Simulated placeholder:
//     console.log(`Merging ${localItems.length} items to account ${customerId}`);
//     // After successful merge, clear local storage
//     localStorage.removeItem(STORAGE_KEY);
//   }

// //   Notification
//   function _triggerToast(msg) {
//     if(!config.toastEnabled) return;
//     const toast = document.createElement("div");
//     toast.className = "wishlist-toast";
//     toast.textContent = msg;
//     document.body.appendChild(toast);
//     setTimeout(() => toast.classList.add("visible"), 50);
//     setTimeout(() => toast.remove(), 2000);
//   }

//   function _triggerHeart(variant_id, state){
//     if(!config.animationEnabled) return;
//     const btn = document.querySelector(`[data-variant-id="${variant_id}"] .wishlist-heart`);
//     if(btn) state ? btn.classList.add("active") : btn.classList.remove("active");
//   }
// })();

window.Wishlist = (function() {
  const STORAGE_KEY = 'wishlist_items_v1';
  const EXPIRY_DAYS = 30;

  let config = { mergeOnLogin: true, toastEnabled: true, animationEnabled: true };

  function _getLocal() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    const expired = Date.now() - (EXPIRY_DAYS*24*60*60*1000);
    return parsed.filter(item => item.timestamp > expired);
  }

  function _setLocal(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function addItem(product) {
    let items = _getLocal();
    if (!items.find(p => p.variant_id === product.variant_id)) {
      product.timestamp = Date.now();
      items.push(product);
      _setLocal(items);
      _triggerToast('Added to Wishlist ❤️');
      _triggerHeart(product.variant_id, true);
      console.log("Added product >", product);
    }
  }

  function removeItem(variant_id) {
    let items = _getLocal().filter(p => p.variant_id !== variant_id);
    _setLocal(items);
    _triggerToast('Removed from Wishlist 💔');
    _triggerHeart(variant_id, false);
    console.log("Removed variant id >", variant_id);
  }

  function hasItem(variant_id) {
    return _getLocal().some(p => p.variant_id === variant_id);
  }

  function getItems() {
    return _getLocal();
  }

  // Merging logic (guest → logged in)
  async function mergeToAccount(customerId) {
    if (!config.mergeOnLogin) return;
    const localItems = _getLocal();
    // 1️⃣ Get server-side metafield (via your metafield endpoint)
    // 2️⃣ Merge unique items, update metafield
    // Simulated placeholder:
    console.log(`Merging ${localItems.length} items for customer #${customerId}`);
    localStorage.removeItem(STORAGE_KEY);
  }

  // Notifications
  function _triggerToast(msg) {
    if (!config.toastEnabled) return;
    const toast = document.createElement('div');
    toast.className = 'wishlist-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('visible'), 50);
    setTimeout(() => toast.remove(), 2000);
  }

  function _triggerHeart(variantId, state) {
    if (!config.animationEnabled) return;
    const btn = document.querySelector(`[data-variant-id="${variantId}"] .wishlist-heart`);
    if (btn) state ? btn.classList.add('active') : btn.classList.remove('active');
  }

  return { addItem, removeItem, hasItem, getItems, mergeToAccount, config };
})();