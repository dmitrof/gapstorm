/**
 * Created by Дмитрий on 07.03.2016.
 */
(function(exports){

    var index = {};
    index.x = -1;
    index.y = 0;
    var cardsnumber = 0;
    var sidesnumber = 2;
    var cardsList = {};
    var navList = [];
    var TAG = "DataPresenter";
    this.cardsNavigator = PersistentNavigator;
    //module for writing JSON data into DOM.

    exports.presentData = function() {
        var id = -1;
        console.log("presentData");
        window.config.site.views(["by_level", {group : true}], function(err, view) {
            if (err) {
                console.log("err ",err);
            }
            else if (view) {
                console.log("success", view.rows.length);
                view.rows.forEach(function(row) {
                    console.log(row);
                });
            }

        });
        window.config.site.views("get_kanji", function(err, view) {
            if (err) {
                console.log("err ",err);
            }
            else if (view) {
                console.log("by_name", view);
                cardsnumber = view.rows.length;

                view.rows.forEach(function(row) {
                    id = row.key._id;
                    writeDiv(id, row.key);
                    var navItem = {};
                    navItem.id = id;
                    navItem.sides = row.key.content.length;  //adding the card to navigation
                    navList.push(navItem);
                    cardsList[id] = navItem.sides;
                });
                cardsNavigator.initStack(cardsList);
                //console.log("Navigation", navList);
            }

        });
    };

    //function that creates new cardside in pagecontainer
    this.writeDiv = function(id, card) {
        var cardinfo = card.cardinfo;
        var cardsides = card.content;
        cardinfo.sides = cardsides.length;
        cardsides.forEach(function(cardside) {

            //console.log("Cardside", cardside);
            $.get("html/" + cardside.item_type + ".html", function(textdata) {
                $("body").prepend(textdata);

                fill(id, cardside, cardinfo);

            });

        });





    };

    exports.slideUp = function() {
        var navItem = cardsNavigator.flipUp();
        cardsNavigator.markCard();
        console.log(navItem.id, navItem.side);
        $.mobile.pageContainer.pagecontainer("change", $("#" + navItem.id + "s" + navItem.side) , { transition : "slideup", reload : "false"});


    };

    exports.slideDown = function() {
        var navItem = cardsNavigator.flipDown();
        cardsNavigator.markCard();
        console.log(navItem.id, navItem.side);
        $.mobile.pageContainer.pagecontainer("change", $("#" + navItem.id + "s" + navItem.side) , { transition : "slidedown", reload : "false"});


    };

    function generateRandom(max, x) {
        //console.log(TAG, x);
        var num = Math.floor(Math.random() * max);
        return (num === x) ? generateRandom(max, x) : num;
    }

    exports.next = function() {


        var navItem = cardsNavigator.next();
        //console.log(index.x, index.y);
        $.mobile.pageContainer.pagecontainer("change", $("#" + navItem.id + "s" + navItem.side) , { transition : "slide", reload : "true" });

    };

    exports.prev = function() {


        //$("#" + index).attr("show", "false");


        var navItem = cardsNavigator.prev();
        //console.log(index.x, index.y);
        $.mobile.pageContainer.pagecontainer("change", $("#" + navItem.id + "s" + navItem.side), { transition : "slide", reload : "true", reverse : "true" });

    };


})(this.DataPresenter = {});