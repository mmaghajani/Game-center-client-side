/**
 * Created by mma on 12/22/16.
 */
$(document).ready(function () {
    var owl2 = $('#owl');
    owl2.owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        responsive: {
            0: {
                items: 1,
                nav: true,
                dots: false
            },
            600: {
                items: 3,
                nav: false
            },
            800: {
                items: 4,
                loop: false
            }
        }
    })



    // $.ajaxSetup({
    //     beforeSend: function(xhr) {
    //         xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    //     }
    // });

    // owl1.on('changed.owl.carousel', function (event) {
    //     console.log(event.item.index)
    //
    // })

    $.ajax({
        url: "http://localhost/home.json", type: 'GET', header:{'Access-Control-Allow-Origin' : '*'} , Origin: '*', success: function (data) {
            if (data.response.ok == true) {
                var gamesData = data.response.result.homepage;
                var num = gamesData.slider.length;
                var slider = document.getElementById('owl1');
                console.log(slider)
                for( var i = 0 ; i < num ; i++ ){
                    var y = $('<div class="slider-item-one  text-right  vertical-align-wrap">' +
                        '<p class="vertical-align text-info vertical-align--bottom h5"><strong>بررسی بازی ' +
                        (gamesData.slider[i]).title + '</strong></p>' +
                        '</div>').css('background' , 'url('+ (gamesData.slider[i]).small_image + ') no-repeat center center')
                    $('#owl1').append(y)
                }
                var owl1 = $('#owl1');
                owl1.owlCarousel({
                    loop: true, dots: false, responsiveClass: true, animateOut: 'fadeOut',
                    animateIn: 'fadeIn',
                    autoplay: true,
                    autoplayTimeout: 5000,
                    autoplayHoverPause: true,
                    responsive: {
                        0: {
                            items: 1,
                            nav: true
                        },
                        600: {
                            items: 3,
                            nav: false
                        },
                        1000: {
                            items: 6,
                            loop: true,
                            center: true
                        }
                    }
                });

                owl1.on('changed.owl.carousel', function(event) {

                })
            }
        }
    });

});

function enterGamePageBtnHandler(e) {

}