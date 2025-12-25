window.addEventListener('load', () => {
    const card = document.getElementById('loginCard');

    // Sau khi fade-in xong thì gỡ animation
    setTimeout(() => {
        card.classList.remove('animate-fadeScale');
    }, 600);
});

const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const togglePassword = document.getElementById('togglePassword');
const passwordIcon = document.getElementById('passwordIcon');
const rememberCheckbox = document.getElementById('rememberMe');
const loginForm = document.getElementById('loginForm');
const loginCard = document.getElementById('loginCard');
const loginBtn = loginForm.querySelector('button[type="submit"]');

const DEMO_ACCOUNT = {
    email: 'admin@gmail.com',
    password: '123456'
};

// ===== Remember me =====
const REMEMBER_KEY = 'remember_login';

// Nếu có login lưu trước đó
const savedLogin = JSON.parse(localStorage.getItem(REMEMBER_KEY));
if (savedLogin) {
    emailInput.value = savedLogin.email || '';
    passwordInput.value = savedLogin.password || '';
    rememberCheckbox.checked = true;

    // trigger floating label
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
}

// ===== Toggle password =====
togglePassword.addEventListener('click', () => {
    const show = passwordInput.type === 'password';
    passwordInput.type = show ? 'text' : 'password';
    passwordIcon.className = show ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
});

// ===== Submit form =====
loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        showToast({
            message: 'Thiếu thông tin',
            sub: 'Vui lòng nhập email hoặc mật khẩu! 😒',
            type: 'error'
        });
        loginCard.classList.add('shake');
        setTimeout(() => loginCard.classList.remove('shake'), 400);
        return;
    }

    if (email !== DEMO_ACCOUNT.email || password !== DEMO_ACCOUNT.password) {
        showToast({
            message: 'Đăng nhập thất bại',
            sub: 'Email hoặc mật khẩu không đúng! 😢',
            type: 'error'
        });
        loginCard.classList.add('shake');
        setTimeout(() => loginCard.classList.remove('shake'), 400);
        return;
    }

    // ===== Lưu thông tin nếu nhớ đăng nhập =====
    if (rememberCheckbox.checked) {
        localStorage.setItem(REMEMBER_KEY, JSON.stringify({ email, password }));
    } else {
        localStorage.removeItem(REMEMBER_KEY); 
    }
    loginBtn.disabled = true;

    showToast({
        message: 'Đăng nhập thành công',
        sub: 'Cùng khám phá nào! 👋',
        type: 'success'
    });

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
});
