
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



        $("#starter" + " #nextcard").click(function() {
            //DataPresenter.presentData();
            MenuPresenter.presentMenu();
            /*window.config.site.db.get("kan11", function(err, ok) {
                //db.get(["kan6", "atta.txt", {"rev" : "8-a1d83409b54c1c35d9d2883258dd9142"}], function(err, ok) {
                if (err) {
                    console.log("DB CREATION CHECK, ERR", err);
                }
                if (ok) {

                    console.log("DB CREATION CHECK, OK", ok);
                }
            });*/

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
