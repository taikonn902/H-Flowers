window.addEventListener('load', () => {
    const card = document.getElementById('registerCard');

    // Sau khi fade-in xong thì gỡ animation
    setTimeout(() => {
        card.classList.remove('animate-fadeScale');
    }, 600);
});

/* =====================
   Elements
===================== */
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const bar = document.getElementById('strengthBar');
const text = document.getElementById('strengthText');
const card = document.getElementById('registerCard');

const toast = document.getElementById('toast');
const toastText = document.getElementById('toastText');
const toastSubText = document.getElementById('toastSubText');
const toastIcon = document.getElementById('toastIcon');
const toastIconInner = document.getElementById('toastIconInner');
const toastProgress = document.getElementById('toastProgress');

/* =====================
   Toggle password
===================== */
function togglePassword(id, btn) {
    const input = document.getElementById(id);
    const icon = btn.querySelector('i');

    input.type = input.type === 'password' ? 'text' : 'password';
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
}

/* =====================
   Password strength
===================== */
password.addEventListener('input', () => {
    const val = password.value;
    let strength = 0;

    if (val.length >= 8) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;

    const map = [
        { w: '25%', c: 'bg-red-400', t: 'Yếu' },
        { w: '50%', c: 'bg-yellow-400', t: 'Trung bình' },
        { w: '75%', c: 'bg-blue-400', t: 'Khá mạnh' },
        { w: '100%', c: 'bg-green-500', t: 'Mạnh' }
    ];

    if (!val) {
        bar.style.width = '0';
        bar.className = 'h-full';
        text.textContent = '';
        return;
    }

    const s = map[strength - 1] || map[0];
    bar.style.width = s.w;
    bar.className = `h-full ${s.c}`;
    text.textContent = `Độ mạnh: ${s.t}`;
});

/* =====================
   Toast (success / error)
===================== */
const toastContainer = document.getElementById('toast-container');

function showToast({
  message,
  sub = '',
  type = 'success',
  duration = 3000
}) {
  // ===== Tạo toast =====
  const toast = document.createElement('div');
  toast.className = `
    toast toast-in
    w-[340px] flex items-start gap-4 px-5 py-4
    rounded-2xl bg-white shadow-2xl border
    pointer-events-auto
  `;

  // ===== Icon =====
  const icon = document.createElement('div');
  icon.className =
    'mt-1 w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0';

  const iconInner = document.createElement('i');

  // ===== Content =====
  const content = document.createElement('div');
  content.className = 'flex-1';

  const title = document.createElement('div');
  title.className = 'font-semibold text-gray-900';
  title.textContent = message;

  const desc = document.createElement('div');
  desc.className = 'text-sm text-gray-500 mt-1';
  desc.textContent = sub;

  // ===== Progress =====
  const progressWrap = document.createElement('div');
  progressWrap.className =
    'absolute left-0 bottom-0 h-1 w-full bg-gray-100 rounded-b-2xl overflow-hidden';

  const progress = document.createElement('div');
  progress.className = 'h-full w-full rounded-full progress-animate';

  // ===== Type =====
  if (type === 'success') {
    toast.classList.add('border-green-200');
    icon.classList.add('bg-green-100', 'text-green-600');
    iconInner.className = 'fa-solid fa-check text-lg';
    progress.classList.add('bg-green-500');
  } else {
    toast.classList.add('border-red-200');
    icon.classList.add('bg-red-100', 'text-red-600');
    iconInner.className = 'fa-solid fa-circle-exclamation text-lg';
    progress.classList.add('bg-red-500');
  }

  // ===== Build DOM =====
  icon.appendChild(iconInner);
  content.append(title, desc);
  progressWrap.appendChild(progress);
  toast.append(icon, content, progressWrap);

  // ===== Đẩy toast mới lên trên (toast cũ bị đẩy xuống mượt) =====
  toastContainer.prepend(toast);

  // ===== Animate progress =====
  progress.style.animationDuration = `${duration}ms`;

  // ===== Auto remove =====
  setTimeout(() => {
    toast.classList.remove('toast-in');
    toast.classList.add('toast-out');

    setTimeout(() => toast.remove(), 300);
  }, duration);
}


/* =====================
   Submit form
===================== */
document.getElementById('registerForm').addEventListener('submit', e => {
    e.preventDefault();

    // ❌ Password mismatch
    if (password.value !== confirmPassword.value) {
        showToast({
            message: 'Mật khẩu không khớp',
            sub: 'Vui lòng kiểm tra lại mật khẩu',
            type: 'error',
            duration: 3000
        });

        card.classList.add('shake');
        setTimeout(() => card.classList.remove('shake'), 400);
        return;
    }

    // ✅ Success
    showToast({
        message: 'Đăng ký thành công!',
        sub: 'Đang chuyển tới đăng nhập...',
        type: 'success',
        duration: 3000
    });

    setTimeout(() => {
        window.location.href = 'login.html';
    }, 3000);
});
