document.addEventListener('DOMContentLoaded', () => {

  MicroModal.init({
    openTrigger: 'data-micromodal-open',
    closeTrigger: 'data-micromodal-close',
    disableFocus: true,
    disableScroll: true,
    awaitOpenAnimation: true,
    awaitCloseAnimation: true
  })

  const swiperIMG = new Swiper('.slider-img', {
    loop: false,
    speed: 2400,
    parallax: true,
    pagination: {
      el: '.slider-pagination__count .total',
      type: 'custom',
      renderCustom: function (swiper, current, total) {
        const totalRes = total >= 10 ? total : `0${total}`
        return totalRes
      }
    },

  });
  const swiperText = new Swiper('.slider-text', {
    loop: false,
    speed: 2400,
    mousewheel: {
      invert: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
  swiperIMG.controller.control = swiperText
  swiperText.controller.control = swiperIMG

  const gear = document.querySelector('.slider-gear')
  swiperText.on('slideNextTransitionStart', function () {
    gsap.to(gear, 2.8, {
      rotation: '+=50',
      ease: Power2.easeOut
    })
  })
  swiperText.on('slidePrevTransitionStart', function () {
    gsap.to(gear, 2.8, {
      rotation: '-=50',
      ease: Power2.easeOut
    })
  })
  const curnum = document.querySelector('.slider-pagination__count .current'),
    pagecur = document.querySelector('.slider-pagination__current-num')

  swiperText.on('slideChange', function () {
    const ind = swiperText.realIndex + 1,
      indRes = ind >= 10 ? ind : `0${ind}`
        gsap.to(curnum, .2, {
          force3D: true,
          y: -10,
          opacity: 0,
          ease: Power2.easeOut,
          onComplete: function () {
            gsap.to(curnum, .1, {
              force3D: true,
              y: 10,
            })
            curnum.innerHTML = indRes
            pagecur.innerHTML = indRes
          }
        })
    gsap.to(curnum, .2, {
      force3D: true,
      y: 0,
      opacity: 1,
      ease: Power2.easeOut,
      delay: .3
    })
  })
});