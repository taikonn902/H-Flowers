document.addEventListener('DOMContentLoaded', function () {
  const CART_KEY = 'flower_cart';
  let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  // Elements
  const cartBtn = document.getElementById('cartBtn');
  const cartDropdown = document.getElementById('cartDropdown');
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartCountText = document.getElementById('cartCountText');
  const cartEmpty = document.getElementById('cartEmpty');
  const clearCartBtn = document.getElementById('clearCart');
  const cartTotalDiv = document.getElementById('cartTotalDiv');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const cartToast = document.getElementById('cartToast');

  window.cartState = { isCartOpen: false };

  function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  // ======================== Cart button click
  cartBtn.addEventListener('click', function () {
    const isMobile = window.innerWidth < 768; // Tailwind md breakpoint
    const now = Date.now();
    const DOUBLE_CLICK_DELAY = 500;

    if (isMobile) {
      // Mobile → chuyển thẳng tới cart.html
      window.location.href = 'cart.html';
      return;
    }

    // Desktop → double click chuyển trang
    if (now - (cartBtn.lastClickTime || 0) < DOUBLE_CLICK_DELAY) {
      window.location.href = 'cart.html';
      return;
    }
    cartBtn.lastClickTime = now;

    // Toggle dropdown
    if (!window.headerState || !window.headerState.isHeaderHidden) {
      if (!window.cartState.isCartOpen) {
        cartDropdown.classList.remove('hidden');
        window.cartState.isCartOpen = true;
      } else {
        cartDropdown.classList.add('hidden');
        window.cartState.isCartOpen = false;
      }
    }
  });

  // ======================== Add to cart buttons
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function () {
      const card = btn.closest('.product-card');
      const name = card.dataset.name;
      const price = parseInt(card.dataset.price);
      const img = card.dataset.img;

      let item = cart.find(i => i.name === name);
      item ? item.qty++ : cart.push({ name, price, img, qty: 1 });

      // Toast thông báo
      if (cartToast) {
        cartToast.textContent = 'Đã thêm vào giỏ hàng!';
        cartToast.classList.remove('hidden');
        setTimeout(() => cartToast.classList.add('hidden'), 1500);
      }

      updateCart();
    });
  });

  // ======================== Clear cart
  clearCartBtn.addEventListener('click', function () {
    cart = [];
    saveCart();
    updateCart();
  });

  // ======================== Update cart UI
  function updateCart() {
    const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
    cartCount.textContent = totalQty;
    cartCountText.textContent = `${totalQty} sản phẩm`;

    cartItems.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
      cartEmpty.classList.remove('hidden');
      cartTotalDiv.textContent = 'Tổng: ₫0';
      checkoutBtn.style.display = 'none';
      clearCartBtn.style.display = 'none';
      saveCart();
      return;
    }

    cartEmpty.classList.add('hidden');

    cart.forEach(item => {
      total += item.price * item.qty;

      const li = document.createElement('li');
      li.className = 'flex items-center gap-4';
      li.innerHTML = `
        <img src="${item.img}" alt="${item.name}" class="w-14 h-14 rounded-xl object-cover border">
        <div class="flex-1">
          <p class="font-medium text-gray-800 leading-snug">${item.name}</p>
          <div class="mt-1 text-xs text-gray-500 flex items-center gap-2">
            <span>₫${item.price.toLocaleString()}</span>
            <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span>x${item.qty}</span>
          </div>
        </div>
        <div class="font-semibold text-gray-800 text-sm">₫${(item.price*item.qty).toLocaleString()}</div>
      `;
      cartItems.appendChild(li);
    });

    cartTotalDiv.textContent = 'Tổng: ₫' + total.toLocaleString();
    checkoutBtn.style.display = 'block';
    clearCartBtn.style.display = 'block';

    saveCart();
  }

  // ======================== Checkout button
  checkoutBtn.addEventListener('click', function () {
    alert('Chuyển đến trang thanh toán!');
  });

  // ======================== Initial render
  updateCart();
});
