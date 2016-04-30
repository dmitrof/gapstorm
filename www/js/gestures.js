/**
 * Created by Дмитрий on 29.04.2016.
 */
$(document).ready(function() {
    $(".card").swipe( {
        swipeRight:function(event, direction, distance, duration) {
            DataPresenter.prev();
        },
        swipeLeft:function(event, direction, distance, duration) {
            DataPresenter.next();
        },
        swipeUp:function(event, direction, distance, duration) {
            DataPresenter.slideUp();
        },
        swipeDown:function(event, direction, distance, duration) {
            DataPresenter.slideDown();
        },
        click:function(event, target) {
        },
        threshold:100,
        allowPageScroll:"vertical"
    });
});
