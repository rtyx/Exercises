/* eslint-env node, jquery */

$(document).ready(function() {
    $('#photobox').on('mouseenter', function() {
        $('#doorknob').css('opacity', '1');
        $('#divider').css('opacity', '1');
        $('#photobox').on('mousemove', function drag(e) {
            if (e.which == 1) {
                var myPlace = e.pageX - $('#photobox').offset().left;
                console.log(myPlace);
                if (myPlace <= 0) {
                    myPlace = 0;
                } else if (myPlace >= $('#photobox').outerWidth()) {
                    myPlace = $('#photobox').outerWidth();
                }
                $('#dragger').css('left', myPlace);
                $('#beforebox').css('width', myPlace);
            }
        });
    });
    $('#photobox').on('mouseleave', function() {
        $('#doorknob').css('opacity', '0.1');
        $('#divider').css('opacity', '0.5');
    });
    $('#photobox').on('click', function drag(e) {
        var myPlace = e.pageX - $('#photobox').offset().left;
        console.log(myPlace);
        if (myPlace <= 0) {
            myPlace = 0;
        } else if (myPlace >= $('#photobox').outerWidth()) {
            myPlace = $('#photobox').outerWidth();
        }
        $('#dragger').css({
            "left": myPlace,
            "transition-property": "left",
            "transition-timing-function": "ease",
            "transition-duration": "1s"
        });
        $('#beforebox').css({
            "width": myPlace,
            "transition-property": "width",
            "transition-timing-function": "ease",
            "transition-duration": "1s"
        });
    });
});
