document.addEventListener('DOMContentLoaded', function () {
  // Cart state
  let cart = [];

  // Elements
  const cartBtn = document.getElementById('cartBtn');
  const cartDropdown = document.getElementById('cartDropdown');
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const clearCartBtn = document.getElementById('clearCart');
  const closeCartBtn = document.getElementById('closeCart');
  const cartTotalDiv = document.getElementById('cartTotalDiv');
  const checkoutBtn = document.getElementById('checkoutBtn');
  // ...existing code...

  const cartToast = document.getElementById('cartToast');
  cartBtn.addEventListener('click', function () {
    cartDropdown.classList.toggle('hidden');
  cartBtn.addEventListener('click', function () {
    if (cartDropdown.classList.contains('hidden')) {
      cartDropdown.classList.remove('hidden');
    } else {
      cartDropdown.classList.add('hidden');
    }
  });
  });

  // Add to cart
  document.querySelectorAll('.add-to-cart').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const card = btn.closest('.product-card');
      const name = card.getAttribute('data-name');
      const price = parseInt(card.getAttribute('data-price'));
      const img = card.getAttribute('data-img');
      let item = cart.find(i => i.name === name);
      if (item) {
        item.qty++;
      } else {
        cart.push({ name, price, img, qty: 1 });
      }
      // Hiện toast thông báo
      cartToast.textContent = 'Đã thêm vào giỏ hàng!';
      cartToast.classList.remove('hidden');
      setTimeout(() => {
        cartToast.classList.add('hidden');
      }, 1500);
      updateCart();
      cartDropdown.classList.remove('hidden');
    });
  });

  // Clear cart
  clearCartBtn.addEventListener('click', function () {
    cart = [];
    updateCart();
  });

  // Update cart UI
  function updateCart() {
    cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.qty;
      let li = document.createElement('li');
      li.className = 'flex items-center gap-2 mb-2';
      li.innerHTML = `<img src="${item.img}" alt="${item.name}" class="w-10 h-10 rounded object-cover border">`
        + `<div class="flex-1">${item.name}<br><span class="text-xs text-gray-500">x${item.qty}</span></div>`
        + `<div class="text-right font-bold">₫${item.price.toLocaleString()}</div>`;
      cartItems.appendChild(li);
    });
    // Show total
    cartTotalDiv.textContent = 'Tổng: ₫' + total.toLocaleString();
    cartTotalDiv.style.display = cart.length ? 'block' : 'none';
    checkoutBtn.style.display = cart.length ? 'block' : 'none';
    clearCartBtn.style.display = cart.length ? 'block' : 'none';
  }

  // Checkout button click
  checkoutBtn.addEventListener('click', function () {
    alert('Chuyển đến trang thanh toán!');
  });

  // Initial update
  updateCart();
});
