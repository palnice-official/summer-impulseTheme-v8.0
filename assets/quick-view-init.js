//chatgpt generated code
document.addEventListener('DOMContentLoaded', () => {
    console.log('quick view init script loaded');
  // Delegate all quick-view buttons
  document.querySelectorAll('.quick-view-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const handle = btn.dataset.productHandle;

      // Ensure container exists
      let container = document.querySelector('#QuickViewContainer');
      if (!container) {
        container = document.createElement('div');
        container.id = 'QuickViewContainer';
        document.body.appendChild(container);
      }

      // Fetch quick-buy section for this product
      fetch(`/products/${handle}?section_id=quick-buy-popover`)
        .then(res => res.text())
        .then(html => {
          container.innerHTML = html;
          // console.log('Quick view content html data >> ',html);

          // Show modal
          const popover = container.querySelector('quick-buy-popover');
          // popover.id = `quick-buy-popover-${ product}`
          popover.classList.add('active');

          // Attach close behavior
          popover.querySelectorAll('[data-action="close"]').forEach(closeEl => {
            closeEl.addEventListener('click', () => {
              popover.classList.remove('active');
              container.innerHTML = ''
            });
          });
        });
    });
  });
});