/* Native Horizon owns cart contents, focus handling, checkout and stock. */
(() => {
  let deadline = 0;
  let interval;
  const drawer = () => document.getElementById('cart-drawer');
  function paint() {
    const current = drawer();
    if (!current?.hasAttribute('open')) return;
    const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    const display = current.querySelector('[data-mom-time]');
    if (display) display.textContent = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`;
    if (!remaining) clearInterval(interval);
  }
  function start() {
    if (!drawer()?.querySelector('[data-mom-cart-timer]')) return;
    clearInterval(interval);
    deadline = Date.now() + 600000;
    paint();
    interval = setInterval(paint, 1000);
  }
  document.addEventListener('theme-drawer:open', (event) => {
    if (event.target.id === 'cart-drawer') start();
  });
  document.addEventListener('theme-drawer:close', (event) => {
    if (event.target.id === 'cart-drawer') clearInterval(interval);
  });
  document.addEventListener('visibilitychange', paint);
  document.addEventListener('shopify:section:load', () => {
    if (drawer()?.hasAttribute('open')) start();
  });
  if (drawer()?.hasAttribute('open')) start();
})();
