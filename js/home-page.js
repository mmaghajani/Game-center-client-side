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


    var requestURL = "http://localhost/home.json";
    var titleOfActiveGame;

    $.ajax({
        url: requestURL , type: 'GET', headers:{'Access-Control-Allow-Origin' : '*'} , success: function (data) {
            if (data.response.ok == true) {
                var gamesData = data.response.result.homepage;
                var num = gamesData.slider.length;
                var slider = document.getElementById('owl1');
                console.log(slider)
                for( var i = 0 ; i < num ; i++ ){
                    var id = i;
                    var y = $('<div class="slider-item-one  text-right  vertical-align-wrap"' + 'id="' + id + '">' +
                        '<p class="vertical-align text-info vertical-align--bottom h5"><strong>بررسی بازی ' +
                        (gamesData.slider[i]).title + '</strong></p>' +
                        '</div>').css('background' , 'url('+ (gamesData.slider[i]).small_image + ') no-repeat center center')
                    $('#owl1').append(y)
                }
                var owl1 = $('#owl1');
                var numberOfItemsInSmall = 1;
                var numberOfItemsInMedium = 3 ;
                var numberOfItemsInLarge = 6 ;
                owl1.owlCarousel({
                    loop: true, dots: false, responsiveClass: true, animateOut: 'fadeOut',
                    animateIn: 'fadeIn',
                    autoplay: true,
                    autoplayTimeout: 5000,
                    autoplayHoverPause: true,
                    responsive: {
                        0: {
                            items: numberOfItemsInSmall,
                            nav: true
                        },
                        600: {
                            items: numberOfItemsInMedium,
                            nav: false
                        },
                        1000: {
                            items: numberOfItemsInLarge,
                            loop: true,
                            center: true
                        }
                    }
                });

                owl1.on('changed.owl.carousel', function(event) {
                    //
                    // if(event.item)
                    var s = document.getElementById('owl1')
                    var g = s.getElementsByClassName('active')
                    var id;
                    if( g.length == numberOfItemsInLarge ){
                        id = event.item.index - 6;
                    }else if( g.length == numberOfItemsInMedium ){
                        id = event.item.index - 3;
                    }else {
                        id = event.item.index - 2;
                    }
                    var sliderItem = document.getElementById(id);
                    var child = sliderItem.childNodes;
                    var title = child[0].textContent.substr(16)
                    titleOfActiveGame = title;
                    for( var i = 0 ; i < gamesData.slider.length ; i++){
                        console.log((gamesData.slider[i]).title)
                        if( "بازی " + title == (gamesData.slider[i]).title){
                            $('#main-content').css({'background' :
                            'url('+ (gamesData.slider[i]).large_image + ') no-repeat center center', 'background-size' : 'cover'})
                        }
                    }
                })
            }
        }
    });

});

function enterGamePageBtnHandler(e) {

}