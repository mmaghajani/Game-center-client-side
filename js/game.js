/**
 * Created by mma on 12/22/16.
 */
$(document).ready(function(){

    setCorrectTab()

    console.log(foo)
    var owl4 = $('#owl4');
    owl4.owlCarousel({
        loop:true,
        margin:10,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true,
                dots:false
            },
            600:{
                items:3,
                nav:false,
                dots:false
            },
            1000:{
                items:4,
                loop:true,
                dots:false
            }
        }
    })
    var owl3 = $('#owl3');
    owl3.owlCarousel({
        loop:true,
        margin:10,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true,
                dots:false
            },
            600:{
                items:3,
                nav:false,
                dots:false
            },
            1000:{
                items:4,
                loop:true,
                dots:false
            }
        }
    })
    var owl2 = $('#owl2');
    owl2.owlCarousel({
        loop:true,
        margin:10,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true,
                dots:false
            },
            600:{
                items:3,
                nav:false,
                dots:false
            },
            1000:{
                items:4,
                loop:true,
                dots:false
            }
        }
    })
    var owl1 = $('#owl1');
    owl1.owlCarousel({
        loop:true,
        margin:10,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true,
                dots:false
            },
            600:{
                items:3,
                nav:false,
                dots:false
            },
            1000:{
                items:4,
                loop:true,
                dots:false
            }
        }
    })
});

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function setCorrectTab() {
    var tabItem = getParameterByName('tab');
    if( tabItem == 'videos'){
        $("#info").removeClass('in active')
        $("#info-tab-title").removeClass('active')
        $("#comment-tab-title").removeClass('active')
        $("#comment-ta").removeClass('in active')
        $("#score-tab-title").removeClass('active')
        $("#score-tab").removeClass('in active')
        $("#same-game-tab-title").removeClass('active')
        $("#same-game").removeClass('in active')
        $("#videos").addClass('in active')
        $("#videos-tab-title").addClass('active')
    }else if(tabItem == "comment"){
        $("#info").removeClass('in active')
        $("#info-tab-title").removeClass('active')
        $("#comment-tab-title").addClass('active')
        $("#comment").addClass('in active')
        $("#score-tab-title").removeClass('active')
        $("#score-tab").removeClass('in active')
        $("#same-game-tab-title").removeClass('active')
        $("#same-game").removeClass('in active')
        $("#videos").removeClass('in active')
        $("#videos-tab-title").removeClass('active')
    }
}