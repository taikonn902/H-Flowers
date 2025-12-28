document.addEventListener('DOMContentLoaded', () => {
  const CART_KEY = 'flower_cart';

  const cartList = document.getElementById('cartList');
  const cartTotal = document.getElementById('cartTotal');
  const cartCountText = document.getElementById('cartCountText');
  const clearCartBtn = document.getElementById('clearCart');
  const checkoutBtn = document.getElementById('checkoutBtn');

  let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  /* ================= UTIL ================= */
  const formatPrice = n => '₫' + n.toLocaleString('vi-VN');

  const saveCart = () => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  };

  /* ================= RENDER ================= */
  const renderCart = () => {
    cartList.innerHTML = '';

    if (cart.length === 0) {
      cartList.innerHTML = `
        <div class="bg-white rounded-2xl p-10 text-center text-gray-400">
          Giỏ hàng của bạn đang trống 🌸
        </div>
      `;
      cartTotal.textContent = '₫0';
      cartCountText.textContent = '(0 sản phẩm)';
      checkoutBtn.style.display = 'none';
      clearCartBtn.style.display = 'none';
      return;
    }

    let total = 0;
    let totalQty = 0;

    cart.forEach((item, index) => {
      total += item.price * item.qty;
      totalQty += item.qty;

      cartList.innerHTML += `
        <div class="bg-white rounded-2xl p-4 shadow-sm flex gap-4">
          <img src="${item.img}"
               class="w-24 h-24 rounded-xl object-cover border" />

          <div class="flex-1">
            <h3 class="font-semibold text-lg">${item.name}</h3>
            <p class="text-sm text-gray-500 mb-2">
              ${formatPrice(item.price)}
            </p>

            <div class="flex items-center gap-3">
              <button class="qty-minus w-8 h-8 rounded-full bg-gray-100">−</button>
              <span>${item.qty}</span>
              <button class="qty-plus w-8 h-8 rounded-full bg-gray-100">+</button>
            </div>
          </div>

          <div class="flex flex-col items-end justify-between">
            <span class="font-semibold">
              ${formatPrice(item.price * item.qty)}
            </span>
            <button class="remove text-sm text-pink-500 hover:underline">
              Xóa
            </button>
          </div>
        </div>
      `;
    });

    cartTotal.textContent = formatPrice(total);
    cartCountText.textContent = `(${totalQty} sản phẩm)`;

    checkoutBtn.style.display = 'block';
    clearCartBtn.style.display = 'block';

    bindEvents();
    saveCart();
  };

  /* ================= EVENTS ================= */
  const bindEvents = () => {
    document.querySelectorAll('.qty-plus').forEach((btn, i) => {
      btn.onclick = () => {
        cart[i].qty++;
        renderCart();
      };
    });

    document.querySelectorAll('.qty-minus').forEach((btn, i) => {
      btn.onclick = () => {
        if (cart[i].qty > 1) {
          cart[i].qty--;
        } else {
          cart.splice(i, 1);
        }
        renderCart();
      };
    });

    document.querySelectorAll('.remove').forEach((btn, i) => {
      btn.onclick = () => {
        cart.splice(i, 1);
        renderCart();
      };
    });
  };

  clearCartBtn.onclick = () => {
    cart = [];
    renderCart();
  };

  checkoutBtn.onclick = () => {
    alert('Chuyển đến trang thanh toán!');
  };

  renderCart();
});
