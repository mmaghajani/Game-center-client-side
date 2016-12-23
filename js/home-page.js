/**
 * Created by mma on 12/22/16.
 */
$(document).ready(function(){
    var owl2 = $('#owl');
    owl2.owlCarousel({
        loop:true,
        margin:10,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:3,
                nav:false
            },
            1000:{
                items:4,
                loop:false
            }
        }
    })

    var owl1 = $('.owl-carousel');
    owl1.owlCarousel({loop:true , dots:false ,responsiveClass:true ,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:3,
                nav:false
            },
            1000:{
                items:4,
                loop:false
            }
        }});

    // var owl2 = $('#owl');
    // owl2.owlCarousel({
    //     loop:true,
    //     margin:10,
    //     responsiveClass:true,
    //     responsive:{
    //         0:{
    //             items:1,
    //             nav:true
    //         },
    //         600:{
    //             items:3,
    //             nav:false
    //         },
    //         1000:{
    //             items:4,
    //             loop:false
    //         }
    //     }
    // })
});