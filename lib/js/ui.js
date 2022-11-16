$(document).ready(function(){

    // 메인배너
    var main_swiper = new Swiper('.main-banner-wrap', {
        slidesPerView: 1,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        effect: "fade",
        pagination: {
            el: ".main-banner-pagination",
            type: "fraction",
        },
        on: {
			slideChange: function () {
				$('.main-banner-wrap .main-con p').css('transform', 'translateY(-'+ this.realIndex +'00%)');
			}
		},
    });


    // 섹션2 배너
    var sec02_swiper = new Swiper('.sec02-swiper', {
        slidesPerView: 1,
        effect: "fade",
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        on: {
			slideChange: function () {
				$('.section02 .img-wrap p').css('transform', 'translateX(-'+ this.realIndex +'00%)');
                $('.section02 .name-wrap p').removeClass('active');
                $('.section02 .name-wrap p:nth-child('+(this.realIndex+1)+')').addClass('active');
			}
		},
    });


    // 스크롤 매직 인터랙션
    var controller = new ScrollMagic.Controller();

    var slide_txt = TweenMax.to(".slide-txt", 1, {left: -40, ease: Linear.easeNone});
    
    var scene = new ScrollMagic.Scene({
        triggerElement: ".section03",
        triggerHook: 1, //onEnter
        duration:"100%"
    })
    .setTween(slide_txt)
    .addTo(controller);


    var circle = new TimelineMax()
    .to(".section03 .circle", 1, {width: "2500px",height: "2500px", ease: Linear.easeNone})
    .to(".bottom-desc", 1, {className : "bottom-desc active"});

    var scene2 = new ScrollMagic.Scene({
        triggerElement: ".section03", 
        triggerHook: 0,//onLeave
        duration:"200%",
    })
    .setPin(".section03")
    .setTween(circle)
    .addTo(controller);


    var slide = new TimelineMax()
    .to(".img-slide.slide01", 1, {className : "img-slide slide01 on"})
    .to(".img-slide.slide02", 1, {className : "img-slide slide02 on"})
    .to(".img-slide.slide03", 1, {className : "img-slide slide03 on"})

    var scene2 = new ScrollMagic.Scene({
        triggerElement: ".section04", 
        triggerHook: 0, 
        duration:"300%",
    })
    .setPin(".section04")
    .setTween(slide)
    .addTo(controller);


    //상단 헤더
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('#headerWrap .header').outerHeight();
    $(window).scroll(function(event){
        didScroll = true;
    });
    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);
    function hasScrolled() {
        var st = $(this).scrollTop();
        if(Math.abs(lastScrollTop - st) <= delta) return;
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $('#headerWrap .header').removeClass('up').addClass('down');
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $('#headerWrap .header').removeClass('down').addClass('up');
            }
        }
        lastScrollTop = st;
    }
});