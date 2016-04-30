
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

        //$.blockUI();
        /*$("#starter" + " #nextcard").click(function() {
            MenuPresenter.presentMenu();

        });*/
        $("#starter" + " #prevcard").click(function() {
            $.mobile.pageContainer.pagecontainer("change", $("#menu") , { transition : "slidedown", reload : "false"});

        });


        $("#cards_place").on("swipeleft", ".card", function() {
            //console.log("left");
            DataPresenter.next();
        });
        $("#cards_place").on("swiperight", ".card", function() {
            //console.log("right");
            DataPresenter.prev();
        });
        $("#cards_place").on("swipeup", ".card", function() {
            //console.log("up");
            DataPresenter.slideUp();
        });
        $("#cards_place").on("swipedown", ".card", function() {
            //console.log("down");
            DataPresenter.slideDown();
        });




        /*$(".card").swipe( {
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
        });*/
    }
    // Update DOM on a Received Event

};
