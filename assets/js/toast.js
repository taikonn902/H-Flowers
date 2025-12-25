const toastContainer = document.getElementById('toast-container');

function showToast({ message, sub = '', type = 'success', duration = 3000 }) {
    const existingToasts = Array.from(toastContainer.children);

    // ===== Tạo toast mới =====
    const toast = document.createElement('div');
    toast.className = 'toast bg-white border rounded-2xl shadow-xl px-5 py-4 flex gap-4 relative';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px) scale(0.95)';
    toast.style.transition = 'transform 0.35s cubic-bezier(.22,1,.36,1), opacity 0.25s ease';

    // ===== Icon =====
    const icon = document.createElement('div');
    icon.className = 'w-10 h-10 flex items-center justify-center rounded-full';
    const iconInner = document.createElement('i');

    // ===== Nội dung =====
    const content = document.createElement('div');
    content.innerHTML = `<div class="font-semibold text-gray-800">${message}</div>
                         <div class="text-sm text-gray-500 mt-1">${sub}</div>`;

    // ===== Progress =====
    const progressWrap = document.createElement('div');
    progressWrap.className = 'absolute bottom-0 left-0 w-full h-1 bg-gray-200 rounded-b-2xl overflow-hidden';
    const progress = document.createElement('div');
    progress.className = 'h-full rounded-full progress-animate';
    progressWrap.appendChild(progress);

    if (type === 'success') {
        icon.classList.add('bg-green-100','text-green-600');
        iconInner.className = 'fa-solid fa-check';
        progress.classList.add('bg-green-500');
    } else {
        icon.classList.add('bg-red-100','text-red-600');
        iconInner.className = 'fa-solid fa-circle-exclamation';
        progress.classList.add('bg-red-500');
    }

    icon.appendChild(iconInner);
    toast.append(icon, content, progressWrap);

    // ===== Thêm toast mới lên container =====
    toastContainer.prepend(toast);

    // ===== Push down toast cũ =====
    const gap = 4; // khoảng cách giữa các toast
    existingToasts.forEach(oldToast => {
        const prevTranslate = parseFloat(oldToast.dataset.translate || 0);
        const newTranslate = prevTranslate + toast.offsetHeight + gap;
        oldToast.style.transform = `translateY(${newTranslate}px)`;
        oldToast.dataset.translate = newTranslate;
    });

    // ===== Animate toast mới =====
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0) scale(1)';
    });

    progress.style.animation = `progress ${duration}ms linear forwards`;

    toast.addEventListener('mouseenter', () => progress.style.animationPlayState = 'paused');
    toast.addEventListener('mouseleave', () => progress.style.animationPlayState = 'running');

    // ===== Remove toast sau duration =====
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-12px) scale(0.95)';

        existingToasts.forEach(oldToast => {
            const prevTranslate = parseFloat(oldToast.dataset.translate || 0);
            const newTranslate = prevTranslate - (toast.offsetHeight + gap);
            oldToast.style.transform = `translateY(${newTranslate}px)`;
            oldToast.dataset.translate = newTranslate;
        });

        setTimeout(() => toast.remove(), 300);
    }, duration);
}
