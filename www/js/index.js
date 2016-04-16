
console.log("awdawd","Hello, console!");
var username = "ttmitry";
var password = "password";

var app = {

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        //document.addEventListener('dbready', DataPresenter.presentData);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        CBManager.createDB();



        $("#-1" + " #nextcard").click(function() {
            DataPresenter.presentData();

        });
        $("#-1" + " #prevcard").click(function() {
            DataPresenter.presentData();

        });

        $(document).on("swiperight", function() {
            DataPresenter.prev();
        });

        $(document).on("swipeleft", function() {
            DataPresenter.next();
        });


        $(document).swipe( {
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
    },
    // Update DOM on a Received Event

};
