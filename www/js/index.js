
console.log("awdawd","Hello, console!");

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

        CBManager.setup();



        $("#-1" + " #nextcard").click(function() {
            DataPresenter.presentData();
            DataPresenter.next();
        });
        $("#-1" + " #prevcard").click(function() {
            DataPresenter.presentData();
            DataPresenter.prev();
        });

        $(document).on("swiperight", function() {
            DataPresenter.prev();
        });

        $(document).on("swipeleft", function() {
            DataPresenter.next();
        });


        $(document).swipe( {
            swipeUp:function(event, direction, distance, duration) {
                DataPresenter.toggleSide();
            },
            swipeDown:function(event, direction, distance, duration) {
                DataPresenter.toggleSide();
            },
            click:function(event, target) {
            },
            threshold:100,
            allowPageScroll:"vertical"
        });
    },
    // Update DOM on a Received Event

};
