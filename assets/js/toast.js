const toastContainer = document.getElementById('toast-container');

function showToast({ message, sub = '', type = 'success', duration = 3000 }) {
    const existingToasts = Array.from(toastContainer.children);

    // ===== Tạo toast mới =====
    const toast = document.createElement('div');
    toast.className = 'toast bg-white border rounded-2xl shadow-xl px-5 py-4 flex gap-4 relative';
    // Đảm bảo toast có cùng chiều ngang
    toast.style.width = '320px';
    toast.style.minWidth = '320px';
    toast.style.maxWidth = '320px';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-50px) scale(0.95)';
    toast.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease-out';

    // ===== Icon =====
    const icon = document.createElement('div');
    icon.className = 'w-10 h-10 flex items-center justify-center rounded-full';
    const iconInner = document.createElement('i');

    // ===== Nội dung =====
    const content = document.createElement('div');
    content.innerHTML = `<div class="font-semibold text-gray-800">${message}</div>
                         <div class="text-sm text-gray-500 mt-1">${sub}</div>`;

    // ===== Progress Bar =====
    const progressWrap = document.createElement('div');
    progressWrap.className = 'absolute bottom-0 left-0 w-full h-1 bg-gray-200 rounded-b-2xl overflow-hidden';
    const progress = document.createElement('div');
    progress.className = 'h-full rounded-full progress-animate';
    progress.style.width = '100%';
    progress.style.height = '100%';
    progress.style.borderRadius = '9999px';
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

    // ===== Push down toast cũ - đợi toast mới render để lấy chiều cao chính xác =====
    const gap = 8; // khoảng cách cố định giữa các toast (giảm từ 16px xuống 8px)
    
    // BƯỚC 1: Chuẩn bị toast cũ TRƯỚC - đảm bảo transform và transition được set
    existingToasts.forEach((oldToast) => {
        // Lấy vị trí hiện tại từ dataset
        let prevTranslate = parseFloat(oldToast.dataset.translate || 0);
        
        // QUAN TRỌNG: Đảm bảo toast cũ có transform được set trong style
        // Nếu chưa có, set ngay (kể cả khi ở 0) để browser nhận ra sự thay đổi
        const currentTransform = oldToast.style.transform;
        if (!currentTransform || currentTransform === 'none' || !currentTransform.includes('translateY')) {
            // Set transform ban đầu
            oldToast.style.transform = `translateY(${prevTranslate}px)`;
            oldToast.dataset.translate = prevTranslate;
        }
        
        // Set transition ngay từ đầu
        oldToast.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
    
    // Force reflow để đảm bảo các style đã được apply
    if (existingToasts.length > 0) {
        void existingToasts[0].offsetHeight;
    }
    
    // BƯỚC 2: Đợi DOM update và toast mới render xong, sau đó mới thay đổi transform
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            // Tính toán vị trí cho toast mới và toast cũ
            let toastNewPosition = 0; // Vị trí của toast mới (sẽ là vị trí của toast cũ)
            
            if (existingToasts.length > 0) {
                // Lấy toast cũ đầu tiên (gần nhất với vị trí top)
                const firstOldToast = existingToasts[0];
                
                // Lấy vị trí hiện tại của toast cũ
                const oldToastTranslate = parseFloat(firstOldToast.dataset.translate || 0);
                
                // Toast mới sẽ xuất hiện ở VỊ TRÍ CỦA toast cũ (không phải vị trí cuối)
                toastNewPosition = oldToastTranslate;
                
                // Sử dụng spacing cố định hợp lý để tránh đẩy xuống quá xa
                // Chiều cao toast thường khoảng 80-100px, dùng giá trị cố định 96px (80px + 16px gap)
                const spacing = 88; // Khoảng cách cố định giữa các toast (80px chiều cao + 8px gap)
                
                // QUAN TRỌNG: Đẩy toast cũ xuống TRƯỚC để nhường chỗ cho toast mới
                existingToasts.forEach((oldToast) => {
                    // Lấy vị trí hiện tại từ dataset
                    const prevTranslate = parseFloat(oldToast.dataset.translate || 0);
                    
                    // Đẩy toast cũ xuống ngay lập tức
                    const newTranslate = prevTranslate + spacing;
                    oldToast.style.transform = `translateY(${newTranslate}px)`;
                    oldToast.dataset.translate = newTranslate;
                });
            }
            
            // ===== Animate toast mới - trượt từ trên xuống ở vị trí đã tính =====
            // Đặt vị trí ban đầu của toast mới (từ trên vị trí của toast cũ)
            if (existingToasts.length > 0) {
                const firstOldToast = existingToasts[0];
                const oldToastTranslate = parseFloat(firstOldToast.dataset.translate || 0);
                // Toast mới bắt đầu từ vị trí của toast cũ - 50px (để trượt xuống)
                toast.style.transform = `translateY(${oldToastTranslate - 50}px) scale(0.95)`;
            }
            
            // Đợi một chút để đảm bảo toast cũ đã được đẩy xuống
            setTimeout(() => {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        toast.style.opacity = '1';
                        toast.style.transform = `translateY(${toastNewPosition}px) scale(1)`;
                        // Lưu vị trí vào dataset cho toast mới
                        toast.dataset.translate = toastNewPosition.toString();
                        // QUAN TRỌNG: Đảm bảo toast mới có transform được set ngay từ đầu
                        // Điều này giúp toast này sẽ di chuyển mượt mà khi có toast mới sau này
                        // Force reflow để đảm bảo transform được apply
                        void toast.offsetHeight;
                    });
                });
            }, 16); // ~1 frame delay
        });
    });

    // ===== Khởi động progress bar animation =====
    // Đợi toast render xong trước khi start animation
    requestAnimationFrame(() => {
        progress.style.animation = `progress ${duration}ms linear forwards`;
    });

    // Pause progress khi hover
    toast.addEventListener('mouseenter', () => {
        if (progress.style.animation) {
            progress.style.animationPlayState = 'paused';
        }
    });
    toast.addEventListener('mouseleave', () => {
        if (progress.style.animation) {
            progress.style.animationPlayState = 'running';
        }
    });

    // ===== Remove toast sau duration - trượt lên trên và ẩn đi =====
    setTimeout(() => {
        // Thay đổi transition để animation ẩn mượt mà hơn
        toast.style.transition = 'transform 0.35s cubic-bezier(0.55, 0.055, 0.675, 0.19), opacity 0.3s ease-in';
        
        // Trượt lên trên một đoạn và fade out
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-40px) scale(0.9)';

        // Cập nhật lại vị trí các toast còn lại sau khi toast này bị xóa
        // Tính toán spacing dựa trên chiều cao thực tế của toast đang bị xóa
        const toastHeight = toast.offsetHeight || 80;
        const spacing = toastHeight + gap;
        
        // Đảm bảo toast cũ có transition mượt mà TRƯỚC KHI tính toán vị trí mới
        existingToasts.forEach(oldToast => {
            oldToast.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
        
        // Đợi một chút để đảm bảo transition được set
        requestAnimationFrame(() => {
            existingToasts.forEach(oldToast => {
                // Lấy vị trí hiện tại từ dataset
                const prevTranslate = parseFloat(oldToast.dataset.translate || 0);
                // Trừ đi spacing để di chuyển lên
                const newTranslate = Math.max(0, prevTranslate - spacing);
                oldToast.style.transform = `translateY(${newTranslate}px)`;
                oldToast.dataset.translate = newTranslate;
            });
        });

        // Xóa toast sau khi animation hoàn thành
        setTimeout(() => toast.remove(), 350);
    }, duration);
}
