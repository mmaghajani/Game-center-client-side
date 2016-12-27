/**
 * Created by mma on 12/27/16.
 */

$(document).ready(function () {

    var keyword = getParameterByName('q');

    if (q != "") {
        var urlForHeader = my_domain + 'games_list.html' + '?q=' + keyword
        $.ajax({
            url: urlForHeader, type: 'GET', headers: {'Access-Control-Allow-Origin': '*'}, success: function (data) {
                if (data.response.ok == true) {

                }
            }
        });
    }

})