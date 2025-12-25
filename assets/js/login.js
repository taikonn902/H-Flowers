const passwordInput = document.getElementById('passwordInput');
const togglePassword = document.getElementById('togglePassword');
const passwordIcon = document.getElementById('passwordIcon');
const emailInput = document.getElementById('emailInput');
const rememberCheckbox = document.getElementById('rememberMe');
const loginForm = document.querySelector('form');

// button show hide pássword
togglePassword.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';

    passwordInput.type = isPassword ? 'text' : 'password';
    passwordIcon.className = isPassword
        ? 'fa-solid fa-eye-slash'
        : 'fa-solid fa-eye';
});


// ===== Load saved login ===== 
const REMEMBER_KEY = 'remember_login';

const savedLogin = JSON.parse(localStorage.getItem(REMEMBER_KEY));
if (savedLogin) {
    emailInput.value = savedLogin.email || '';
    passwordInput.value = savedLogin.password || '';
    rememberCheckbox.checked = true;

    // trigger floating label
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
}

// ===== Submit login =====
loginForm.addEventListener('submit', function (e) {
    e.preventDefault(); // demo frontend

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        alert('Vui lòng nhập đầy đủ thông tin');
        return;
    }

    if (rememberCheckbox.checked) {
        localStorage.setItem(
            REMEMBER_KEY,
            JSON.stringify({ email, password })
        );
    } else {
        localStorage.removeItem(REMEMBER_KEY);
    }

    // ===== Demo login success =====
    alert('Đăng nhập thành công!');
    // window.location.href = 'index.html';
});

