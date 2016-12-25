/**
 * Created by mma on 12/22/16.
 */
var numberOfItemsInSmall = 1;
var numberOfItemsInMedium = 3;
var numberOfItemsInLarge = 6;
var requestURL = "http://localhost/home.json";
var titleOfActiveGame = "";

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
        loop: false, rewind:true , center:false, dots: false, responsiveClass: true, animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
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
                loop: false,
                rewind:true,
                center: false
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
        var item = $('<div class="slider-item-one  text-right vertical-align-wrap" id="' + id + '">' +
            '<p class="vertical-align text-info vertical-align--bottom h5"><strong>بررسی ' +
            (gamesData.slider[i]).title + '</strong></p>' +
            '</div>').css('background', 'url(' + (gamesData.slider[i]).small_image + ') no-repeat center center').click(function () {
            handleSliderOneClick($(this), gamesData)
        })
        $('#owl1').append(item)
    }
}

function handleSliderOneClick(item, gamesData) {
    var sliderItem = item;
    var child = sliderItem.children();
    setActiveGame(gamesData, child, item)
}

function handleSliderOne(gamesData, event) {
    var slider = document.getElementById('owl1')
    var activeItems = slider.getElementsByClassName('active')
    // var id;
    // if (activeItems.length == numberOfItemsInLarge) {
    //     id = event.item.index - 6;
    // } else if (activeItems.length == numberOfItemsInMedium) {
    //     id = event.item.index - 3;
    // } else {
    //     id = event.item.index - 2;
    // }
    //var sliderItem = document.getElementById(id);
    var id = event.item.index
    var sliderItem = $("#" + id);
    //console.log(sliderItem)
    var child = $(sliderItem).children();
    setActiveGame(gamesData, child, sliderItem)
}

// function getTitleOfGame(child) {
//     var title = child[0].textContent.substr(6)
//     if(title.substring(0,3) == "بازی") {
//         console.log(true)
//         return title
//     }else{
//
//         return $(child[0]).children()[0].textContent
//     }
// }
function setActiveGame(gamesData, child, item) {
    var title = $(child[0]).children()[0].textContent.substr(6)
    console.log(title)
    titleOfActiveGame = title;
    for (var i = 0; i < gamesData.slider.length; i++) {
        if ( title == (gamesData.slider[i]).title) {
            $("#main-content").fadeTo("slow", 0.8);
            $('#main-content').css({
                'background': 'url(' + (gamesData.slider[i]).large_image + ') no-repeat center center',
                'background-size': 'cover'
            })
            $("#main-content").fadeTo("slow", 1);
            // console.log(i)
           // console.log(item);
            $(item).empty()
            //console.log(item);
            var template = $('<div class="slider-item-one-frame slider-item-one-active text-right vertical-align-wrap">'
                + '<div class="vertical-align--middle">' +
                '<p class="h4 text-info">' + title + '</p>' +
                '<p class="h6 text-info">'+ 'تعداد نظرات : ' + (gamesData.slider[i]).number_of_comments + '</p>' +
                '<br>' +
                '<button type="button" class="text-muted btn-default" onclick="enterGamePageBtnHandler()">صفحه بازی</button>' +
                '</div></div>');
            $(item).append(template)
           // console.log(item);
            $("#subject").children().text((gamesData.slider[i]).title.substr(5))
            $("#explain").children().text((gamesData.slider[i]).abstract)
            break;
        }
    }

    var allItems = $("#owl1").children(".owl-stage-outer").children(".owl-stage").children(".owl-item").children();
    for (var i = 0; i < allItems.length; i++) {
        var but = $(allItems[i]).children();

        var classes = $(but[0]).attr('class').split(' ');
        if( containes(classes , "slider-item-one-frame")){
            var title = ($($(but[0]).children()[0]).children()[0]).textContent;
            console.log(title)
            if( title != titleOfActiveGame){
                $(allItems[i]).children().remove()
                var template = $('<p class="vertical-align text-info vertical-align--bottom h5"><strong>بررسی ' +
                    title+ '</strong></p>');
                $(allItems[i]).append(template)
            }
        }
    }
}

function containes(arr , key){
    for( var i = 0 ; i < arr.length ; i++ ){
        if( arr[i] == key){
            return true
        }
    }
    return false;
}

function enterGamePageBtnHandler(e) {
    window.location.href = ("./games.html?game=" + titleOfActiveGame);
}

function enterGamePageBtnHandlerTrailer(e){
    $('#trailer-link').attr("href" , "./games.html#videos?game=" + titleOfActiveGame + "&tab=videos")
    window.location.href = ("./games.html#videos?game=" + titleOfActiveGame + "&tab=videos" );
}