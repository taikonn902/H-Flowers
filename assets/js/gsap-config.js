document.addEventListener('DOMContentLoaded', () => {

    const mm = gsap.matchMedia();

    mm.add({
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)"
    }, (context) => {

        const { isMobile } = context.conditions;

        /* ================= INITIAL STATES ================= */

        gsap.set('.hero-bg-soft, .hero-bg-deep', {
            opacity: 0
        });

        gsap.set('.hero-image', {
            x: isMobile ? 0 : 60,
            y: isMobile ? 20 : 0,
            scale: 0.96,
            opacity: 0
        });

        gsap.set('.hero-item', {
            y: 26,
            opacity: 0
        });

        gsap.set('.hero-btn-left', {
            x: isMobile ? -16 : -48,
            opacity: 0
        });

        gsap.set('.hero-btn-right', {
            x: isMobile ? 16 : 48,
            opacity: 0
        });

        gsap.set('.hero-accent-line', {
            scaleX: 0,
            transformOrigin: 'left center'
        });

        /* ================= TIMELINE ================= */

        const tl = gsap.timeline({
            defaults: {
                ease: 'power3.out'
            }
        });

        tl
            /* Background wash */
            .to('.hero-bg-soft', {
                opacity: 1,
                duration: 1.2
            })
            .to('.hero-bg-deep', {
                opacity: 1,
                duration: 1.2
            }, '-=0.85')

            /* Image slide-in (MAIN MOMENT) */
            .to('.hero-image', {
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                duration: isMobile ? 0.9 : 1.15
            }, '-=0.6')

            /* Text stagger */
            .to('.hero-item', {
                y: 0,
                opacity: 1,
                duration: 0.75,
                stagger: 0.16
            }, '-=0.55')

            /* CTA buttons from sides */
            .to('.hero-btn-left', {
                x: 0,
                opacity: 1,
                duration: 0.6
            }, '-=0.3')
            .to('.hero-btn-right', {
                x: 0,
                opacity: 1,
                duration: 0.6
            }, '-=0.5')

            /* Accent line */
            .to('.hero-accent-line', {
                scaleX: 1,
                duration: 0.8
            }, '-=0.4');

    });

});

function pulseControls(direction = 'next') {
    const target =
        direction === 'next'
            ? '#nextBtn'
            : '#prevBtn';

    gsap.fromTo(
        target,
        {
            scale: 1,
            boxShadow: '0 8px 18px rgba(0,0,0,0.15)'
        },
        {
            scale: 1.12,
            boxShadow: '0 14px 28px rgba(255,122,162,0.35)',
            duration: 0.22,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
        }
    );
}
dots.forEach((dot, i) => {
    dot.onclick = () => {
        if (isAnimating) return;

        index = i + 1;
        moveSlider();
        updateDots(i);

        pulseControls(i > currentIndex ? 'next' : 'prev');
    };
});
