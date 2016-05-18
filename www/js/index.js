
console.log("awdawd","Hello, console!");
//var username = "ttmitry";
//var password = "password";
/*var login = "";
var password = "";*/


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

        //CBManager.createDB();

        //$.blockUI();


        $("#starter" + " #nextcard").click(function() {
            MenuPresenter.presentMenu();

        });
        $("#starter" + " #prevcard").click(function() {
            $.mobile.pageContainer.pagecontainer("change", $("#menu") , { transition : "slidedown", reload : "false"});
            window.screen.unlockOrientation();
        });

        /*$("#starter" + " #auth_btn").click(function() {
            //$.mobile.pageContainer.pagecontainer("change", $("#menu") , { transition : "slidedown", reload : "false"});
            CBManager.changeUser("student_2", "1234qwer");
            window.screen.unlockOrientation();
        });*/

        $("#auth_form").submit(function(event) {
            //$.mobile.pageContainer.pagecontainer("change", $("#menu") , { transition : "slidedown", reload : "false"});

            var $inputs = $('#auth_form :input');
            var values = {};
            $inputs.each(function() {
                values[this.name] = $(this).val();
            });

            CBManager.changeUser(values['user'], values['pass']);
            window.screen.unlockOrientation();
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








    }
    // Update DOM on a Received Event

};
