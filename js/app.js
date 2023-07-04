$(function () {


    AOS.init(
        {
            easing: 'linear',
            once: true,
            duration: 1000,
            anchorPlacement: 'top-bottom',
        }
    );

    // 滾輪 smooth
    const lenis = new Lenis();
    lenis.on('scroll', (e) => {

    });
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

})