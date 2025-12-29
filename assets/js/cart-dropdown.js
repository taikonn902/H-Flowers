document.addEventListener('DOMContentLoaded', function () {
  /* ===================== CART CONFIG ===================== */
  const CART_KEY = 'flower_cart';
  let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  /* ===================== ELEMENTS ===================== */
  const cartBtn = document.getElementById('cartBtn');
  const cartDropdown = document.getElementById('cartDropdown');
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartCountText = document.getElementById('cartCountText');
  const cartEmpty = document.getElementById('cartEmpty');
  const clearCartBtn = document.getElementById('clearCart');
  const cartTotalDiv = document.getElementById('cartTotalDiv');
  const checkoutBtn = document.getElementById('checkoutBtn');

  window.cartState = { isCartOpen: false };

  /* ===================== UTILS ===================== */
  function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  /* ===================== TOAST ===================== */
  const toastContainer = document.getElementById('toast-container');

  function showToast({ message, sub = '', type = 'success', duration = 2500 }) {
    if (!toastContainer) return;

    const isMobile = window.innerWidth < 768;
    const toast = document.createElement('div');

    toast.className =
      'toast bg-white border rounded-2xl shadow-xl px-5 py-4 flex gap-4 items-start';

    toast.style.pointerEvents = 'auto';
    toast.style.opacity = '0';
    toast.style.transform = isMobile
      ? 'translateY(-40px) scale(0.95)'
      : 'translateY(-20px) scale(0.95)';
    toast.style.transition =
      'transform .35s cubic-bezier(.22,1,.36,1), opacity .25s ease';

    /* icon */
    const icon = document.createElement('div');
    icon.className =
      'w-10 h-10 flex items-center justify-center rounded-full shrink-0';

    const iconInner = document.createElement('i');

    if (type === 'success') {
      icon.classList.add('bg-green-100', 'text-green-600');
      iconInner.className = 'fa-solid fa-check';
    } else {
      icon.classList.add('bg-red-100', 'text-red-600');
      iconInner.className = 'fa-solid fa-circle-exclamation';
    }

    icon.appendChild(iconInner);

    /* content */
    const content = document.createElement('div');
    content.innerHTML = `
      <div class="font-semibold text-gray-800">${message}</div>
      ${sub ? `<div class="text-sm text-gray-500 mt-1">${sub}</div>` : ''}
    `;

    toast.append(icon, content);
    toastContainer.prepend(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0) scale(1)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = isMobile
        ? 'translateY(-30px) scale(0.95)'
        : 'translateY(-12px) scale(0.95)';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  /* ===================== CART BUTTON ===================== */
  if (cartBtn) {
    cartBtn.addEventListener('click', function () {
      const isMobile = window.innerWidth < 768;
      const now = Date.now();
      const DOUBLE_CLICK_DELAY = 500;

      if (isMobile) {
        window.location.href = 'cart.html';
        return;
      }

      if (now - (cartBtn.lastClickTime || 0) < DOUBLE_CLICK_DELAY) {
        window.location.href = 'cart.html';
        return;
      }
      cartBtn.lastClickTime = now;

      cartDropdown?.classList.toggle('hidden');
      window.cartState.isCartOpen = !window.cartState.isCartOpen;
    });
  }

  /* ===================== ADD TO CART ===================== */
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function () {
      const card = btn.closest('.product-card');
      if (!card) return;

      const name = card.dataset.name;
      const price = parseInt(card.dataset.price);
      const img = card.dataset.img;

      const item = cart.find(i => i.name === name);
      if (item) item.qty++;
      else cart.push({ name, price, img, qty: 1 });

      showToast({
        message: 'Đã thêm vào giỏ hàng',
        sub: name,
        type: 'success'
      });

      updateCart();
    });
  });

  /* ===================== CLEAR CART ===================== */
  clearCartBtn?.addEventListener('click', function () {
    if (!confirm('Xóa toàn bộ giỏ hàng?')) return;
    cart = [];
    updateCart();
    showToast({ message: 'Đã xóa toàn bộ giỏ hàng', type: 'success' });
  });

  /* ===================== + / − ===================== */
  cartItems?.addEventListener('click', function (e) {
    const plus = e.target.closest('.qty-plus');
    const minus = e.target.closest('.qty-minus');
    if (!plus && !minus) return;

    const name = (plus || minus).dataset.name;
    const item = cart.find(i => i.name === name);
    if (!item) return;

    if (plus) {
      item.qty++;
      updateCart();
      return;
    }

    if (minus) {
      if (item.qty > 1) {
        item.qty--;
        updateCart();
      } else {
        if (confirm(`Xóa "${item.name}" khỏi giỏ hàng?`)) {
          cart = cart.filter(i => i.name !== item.name);
          updateCart();
          showToast({
            message: 'Đã xóa sản phẩm',
            sub: item.name,
            type: 'success'
          });
        }
      }
    }
  });

  /* ===================== UPDATE CART ===================== */
  function updateCart() {
    const totalQty = cart.reduce((s, i) => s + i.qty, 0);
    cartCount && (cartCount.textContent = totalQty);
    cartCountText && (cartCountText.textContent = `${totalQty} sản phẩm`);

    if (!cartItems) {
      saveCart();
      return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
      cartEmpty?.classList.remove('hidden');
      cartTotalDiv && (cartTotalDiv.textContent = 'Tổng: ₫0');
      checkoutBtn && (checkoutBtn.style.display = 'none');
      clearCartBtn && (clearCartBtn.style.display = 'none');
      saveCart();
      return;
    }

    cartEmpty?.classList.add('hidden');

    cart.forEach(item => {
      total += item.price * item.qty;

      const li = document.createElement('li');
      li.className = 'flex items-center gap-4';

      li.innerHTML = `
        <img src="${item.img}" class="w-14 h-14 rounded-xl object-cover border">

        <div class="flex-1">
          <p class="font-medium text-gray-800">${item.name}</p>

          <div class="mt-2 flex items-center gap-3">
            <span class="text-sm text-gray-500">
              ₫${item.price.toLocaleString()}
            </span>

            <div class="flex items-center gap-2 ml-4">
              <button class="qty-minus w-7 h-7 rounded-full border border-pink-300 text-pink-500" data-name="${item.name}">−</button>
              <span class="min-w-[22px] text-center font-semibold">${item.qty}</span>
              <button class="qty-plus w-7 h-7 rounded-full border border-pink-300 text-pink-500" data-name="${item.name}">+</button>
            </div>
          </div>
        </div>

        <div class="font-semibold text-gray-800 text-sm">
          ₫${(item.price * item.qty).toLocaleString()}
        </div>
      `;
      cartItems.appendChild(li);
    });

    cartTotalDiv && (cartTotalDiv.textContent = 'Tổng: ₫' + total.toLocaleString());
    checkoutBtn && (checkoutBtn.style.display = 'block');
    clearCartBtn && (clearCartBtn.style.display = 'block');

    saveCart();
  }

  /* ===================== INIT ===================== */
  updateCart();
});
