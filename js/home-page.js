/**
 * Created by mma on 12/22/16.
 */
var numberOfItemsInSmall = 1;
var numberOfItemsInMedium = 3;
var numberOfItemsInLarge = 6;
var requestURL = "http://localhost/home.json";
var titleOfActiveGame;

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

    $.ajax({
        url: requestURL, type: 'GET', headers: {'Access-Control-Allow-Origin': '*'}, success: function (data) {
            if (data.response.ok == true) {
                var gamesData = data.response.result.homepage;
                var num = gamesData.slider.length;

                initSliderOne(gamesData, num)
            }
        }
    });

});

function initSliderOne(gamesData, num) {
    addItemsToSliderOne(num, gamesData)

    var owl1 = $('#owl1');
    owl1.on('initialized.owl.carousel', function (event) {
        handleSliderOne(gamesData, event)
    })
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
    owl1.on('changed.owl.carousel', function (event) {
        handleSliderOne(gamesData, event)
    })
}
function addItemsToSliderOne(numberOfItems, gamesData) {
    for (var i = 0; i < numberOfItems; i++) {
        var id = i;
        var item = $('<div class="slider-item-one  text-right  vertical-align-wrap"' + 'id="' + id + '">' +
            '<p class="vertical-align text-info vertical-align--bottom h5"><strong>بررسی بازی ' +
            (gamesData.slider[i]).title + '</strong></p>' +
            '</div>').css('background', 'url(' + (gamesData.slider[i]).small_image + ') no-repeat center center').
        click(function () {
           handleSliderOneClick($(this),gamesData)
        })
        $('#owl1').append(item)
    }
}

function handleSliderOneClick(item , gamesData) {
    var sliderItem = item;
    console.log(sliderItem)
    var child = sliderItem.children();
    console.log(child)
    var title = child[0].textContent.substr(16)
    titleOfActiveGame = title;
    for (var i = 0; i < gamesData.slider.length; i++) {
        console.log((gamesData.slider[i]).title)
        if ("بازی " + title == (gamesData.slider[i]).title) {
            $("#main-content").fadeTo("slow", 0.8);
            $('#main-content').css({
                'background': 'url(' + (gamesData.slider[i]).large_image + ') no-repeat center center',
                'background-size': 'cover'
            })
            $("#main-content").fadeTo("slow",1);

            $("#subject").children().text((gamesData.slider[i]).title.substr(5))
            $("#explain").children().text((gamesData.slider[i]).abstract)
            break;
        }
    }
}

function handleSliderOne(gamesData, event) {
    var slider = document.getElementById('owl1')
    var activeItems = slider.getElementsByClassName('active')
    var id;
    if (activeItems.length == numberOfItemsInLarge) {
        id = event.item.index - 6;
    } else if (activeItems.length == numberOfItemsInMedium) {
        id = event.item.index - 3;
    } else {
        id = event.item.index - 2;
    }
    var sliderItem = document.getElementById(id);
    var child = sliderItem.childNodes;
    var title = child[0].textContent.substr(16)
    titleOfActiveGame = title;
    for (var i = 0; i < gamesData.slider.length; i++) {
        console.log((gamesData.slider[i]).title)
        if ("بازی " + title == (gamesData.slider[i]).title) {
            $("#main-content").fadeTo("slow", 0.8);
            $('#main-content').css({
                'background': 'url(' + (gamesData.slider[i]).large_image + ') no-repeat center center',
                'background-size': 'cover'
            })
            $("#main-content").fadeTo("slow",1);

            $("#subject").children().text((gamesData.slider[i]).title.substr(5))
            $("#explain").children().text((gamesData.slider[i]).abstract)
            break;
        }
    }
}
function enterGamePageBtnHandler(e) {

}