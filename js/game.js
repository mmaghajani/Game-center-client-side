/**
 * Created by mma on 12/22/16.
 */
var domain = "http://localhost/";
var tabItem;
var numberOfTotalComments;
var gameTitle

$(document).ready(function () {

    setCorrectTab()

    $(document).ready(function () {
         gameTitle = getParameterByName('game');
        var urlForHeader = domain + gameTitle + '/header.json';

        $.ajax({
            url: urlForHeader, type: 'GET', headers: {'Access-Control-Allow-Origin': '*'}, success: function (data) {
                if (data.response.ok == true) {
                    var gamesData = data.response.result.game;
                    initHeader(gamesData)
                }
            }
        });

        urlForHeader = domain + gameTitle + '/' + tabItem + '.json'
        console.log(urlForHeader)
        $.ajax({
            url: urlForHeader, type: 'GET', headers: {'Access-Control-Allow-Origin': '*'}, success: function (data) {
                if (data.response.ok == true) {
                    console.log(data)
                    var tabData;
                    if (tabItem == 'gallery') {
                        tabData = data.response.result.gallery;
                        initGalleryTab(tabData)
                    } else if (tabItem == 'info') {
                        tabData = data.response.result.game;
                        initInfoTab(tabData)
                    } else if (tabItem == 'comments') {
                        tabData = data.response.result.comments;
                        initCommentTab(tabData)
                    }
                }
            }
        });


    });

    // var owl4 = $('#owl4');
    // owl4.owlCarousel({
    //     loop: true,
    //     margin: 10,
    //     responsiveClass: true,
    //     responsive: {
    //         0: {
    //             items: 1,
    //             nav: true,
    //             dots: false
    //         },
    //         600: {
    //             items: 3,
    //             nav: false,
    //             dots: false
    //         },
    //         1000: {
    //             items: 4,
    //             loop: true,
    //             dots: false
    //         }
    //     }
    // })
    // var owl3 = $('#owl3');
    // owl3.owlCarousel({
    //     loop: true,
    //     margin: 10,
    //     responsiveClass: true,
    //     responsive: {
    //         0: {
    //             items: 1,
    //             nav: true,
    //             dots: false
    //         },
    //         600: {
    //             items: 3,
    //             nav: false,
    //             dots: false
    //         },
    //         1000: {
    //             items: 4,
    //             loop: true,
    //             dots: false
    //         }
    //     }
    // })
    // var owl2 = $('#owl2');
    // owl2.owlCarousel({
    //     loop: true,
    //     margin: 10,
    //     responsiveClass: true,
    //     responsive: {
    //         0: {
    //             items: 1,
    //             nav: true,
    //             dots: false
    //         },
    //         600: {
    //             items: 3,
    //             nav: false,
    //             dots: false
    //         },
    //         1000: {
    //             items: 4,
    //             loop: true,
    //             dots: false
    //         }
    //     }
    // })
    // var owl1 = $('#owl1');
    // owl1.owlCarousel({
    //     loop: true,
    //     margin: 10,
    //     responsiveClass: true,
    //     responsive: {
    //         0: {
    //             items: 1,
    //             nav: true,
    //             dots: false
    //         },
    //         600: {
    //             items: 3,
    //             nav: false,
    //             dots: false
    //         },
    //         1000: {
    //             items: 4,
    //             loop: true,
    //             dots: false
    //         }
    //     }
    // })
});

function nextComments(event) {
    var urlForHeader = domain + gameTitle + '/comments' + $($("#comments").children()[0]).children().length + '.json'
    console.log(urlForHeader)
    $.ajax({
        url: urlForHeader, type: 'GET', headers: {'Access-Control-Allow-Origin': '*'}, success: function (data) {
            if (data.response.ok == true) {
                console.log(data)
                var tabData = data.response.result.comments;
                console.log(tabData)
                for (var i = 0; i < tabData.length; i++) {
                    var id = i;
                    var length = $($("#comments").children()[0]).children().length ;
                    var numOfRate = tabData[i].rate;
                    var s = '<div class="row">';
                    if (length % 2 == 0) {
                        s += '<div class="list-item-even">'
                    } else {
                        s += '<div class="list-item">'
                    }

                    s += '<div class="stars-block">' +
                        '<div class="stars">';
                    if (numOfRate > 0) {
                        for (var j = 0; j < numOfRate; j++) {
                            s += '<i class="material-icons md-18 dark_gray_start">star</i>'
                        }
                        for (var j = 5; j > numOfRate; j--) {
                            s += '<i class="material-icons md-18 light_gray_star">star</i>'
                        }
                    }
                    s += '</div>' +
                        '</div>' +
                        '<div class="personal-image">';
                    if (tabData[i].player.avatar == "") {
                        s += '<img src="assets/prof2.jpg" class="list-image">'
                    } else {
                        s += '<img src="' + tabData[i].player.avatar + '" class="list-image">'
                    }
                    s += '</div>' +
                        '<div class="information">' +
                        '<div class="text-muted h6">' +
                        tabData[i].date +
                        '</div>' +
                        '<div class="text-success h5">' +
                        tabData[i].player.name + ' : ' + tabData[i].text +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                    $($('#comments').children()[0]).append(s)
                }
            }
        }
    });
}
function addItemToCommentPanel(tabData) {
    for (var i = 0; i < tabData.length; i++) {
        var id = i;
        var numOfRate = tabData[i].rate;
        var s = '<div class="row">';
        if (i % 2 == 0) {
            s += '<div class="list-item-even">'
        } else {
            s += '<div class="list-item">'
        }

        s += '<div class="stars-block">' +
            '<div class="stars">';
        if (numOfRate > 0) {
            for (var j = 0; j < numOfRate; j++) {
                s += '<i class="material-icons md-18 dark_gray_start">star</i>'
            }
            for (var j = 5; j > numOfRate; j--) {
                s += '<i class="material-icons md-18 light_gray_star">star</i>'
            }
        }
        s += '</div>' +
            '</div>' +
            '<div class="personal-image">';
        if (tabData[i].player.avatar == "") {
            s += '<img src="assets/prof2.jpg" class="list-image">'
        } else {
            s += '<img src="' + tabData[i].player.avatar + '" class="list-image">'
        }
        s += '</div>' +
            '<div class="information">' +
            '<div class="text-muted h6">' +
            tabData[i].date +
            '</div>' +
            '<div class="text-success h5">' +
            tabData[i].player.name + ' : ' + tabData[i].text +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        $($('#comments').children()[0]).append(s)
    }
}

function initCommentTab(tabData) {
    if (tabData.length > 0) {
        numberOfTotalComments = tabData[0].game.number_of_comments;
        console.log($("#comment-number"))
        $("#comment-number").text("( " + numberOfTotalComments + " نظر )");
    }

    addItemToCommentPanel(tabData)
}

function addItemToInfoPanel(data) {
    var s = '<p class="h5 text-primary text-justify">' + data.info + '</p>';
    //
    $('#info').append(s).addClass('text-justify')
    var images = $('#info').find('img')
    for (var i = 0; i < images.length; i++) {
        $(images[i]).addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12 img-responsive')
    }
}
function initInfoTab(tabData) {
    addItemToInfoPanel(tabData)
}

function addItemToSlider(gamesData) {
    var numberOfItems = gamesData.images.length;
    for (var i = 0; i < numberOfItems; i++) {
        var id = i;
        var s = '<div class="slider-item-two slider-item-video text-right owl-item">' +
            '<div class="picture row vertical-align-wrap" id="' + id + '">' +
            '<div class="text-center vertical-align--middle">' +
            '<button type="button" class="btn-default trailer-button text-center"><i class="ionicons ion-ios-play"></i></span></button>' +
            '</div>' +
            '</div>' +
            '</div>';
        //
        console.log($($(s).children()[0]))
        $('#owl4').append(s)
        $('#' + i).css({
            'background': 'url(' + (gamesData.images[i]).url + ') no-repeat center center',
            'background-size': 'cover'
        })
    }
    var owl4 = $('#owl4');

    owl4.owlCarousel({
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
                items: 2,
                nav: true,
                dots: false
            },
            1000: {
                items: 4,
                center: true,
                dots: true
            }
        }
    })
}
function initGalleryTab(data) {
    var video = videojs('trailer');
    var tab = $("#videos");
    console.log($("#trailer"))
    $("#trailer").attr('title', (data.videos[0]).title)

    video.src((data.videos[0]).url)

    addItemToSlider(data);
}

function addHeaderItem(gamesData) {

    $("#main-content").css({
        'background': 'url(' + gamesData.large_image + ') no-repeat center center',
        'background-size': 'cover'
    })
    $($($($("#header-content").children()[1]).children()[0]).children()[0]).children()[0].textContent = gamesData.title.substr(5);
    $($($($("#header-content").children()[1]).children()[0]).children()[0]).children()[1].textContent = gamesData.categories;

    var doubleRate = gamesData.rate
    var numOfComments = gamesData.number_of_comments
    var rate = parseInt(gamesData.rate)
    doubleRate = String(doubleRate).substring(0, 3)
    var starsBlock = $($($("#header-content").children()[1]).children()[0]).children()[2];
    for (var i = 0; i < rate; i++) {
        $(starsBlock).append('<i class="material-icons md-18 blue_star">star</i>')
    }
    for (var i = 5; i > rate; i--) {
        $(starsBlock).append('<i class="material-icons md-18 light_gray_star">star</i>')
    }
    $(starsBlock).append('<span class="text-muted">' + ' ' + doubleRate + '( ' + numOfComments + 'رای )' + '</span>');

    var pic = $($($("#header-content").children()[1]).children()[1]).css('background', 'url(' + gamesData.small_image + ') no-repeat center center');
}

function initHeader(gamesData) {
    addHeaderItem(gamesData)
}

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
    tabItem = getParameterByName('tab');
    if (tabItem == 'gallery') {
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
        tabItem = 'gallery';
    } else if (tabItem == "comments") {
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
        tabItem = 'comments';
    } else {
        tabItem = 'info';
    }
}