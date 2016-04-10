/**
 * Created by Дмитрий on 07.03.2016.
 */
(function(exports){

    var index = {};
    index.x = -1;
    index.y = 0;
    var cardsnumber = 0;
    var sidesnumber = 2;
    var navList = [];
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
                });
                console.log("Navigation", navList);
            }

        });
    };

    //function that creates new cardside in pagecontainer
    this.writeDiv = function(id, card) {
        console.log("writeDiv");
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
        var item = navList[index.x];
        sidesnumber = item.sides;
        if (index.y < (sidesnumber - 1)) {

            index.y++;
        }
        else {
            index.y = 0;
        }

        console.log(index.x, index.y);
        $.mobile.pageContainer.pagecontainer("change", $("#" + item.id + "s" + index.y) , { transition : "slideup", reload : "false"});


    };

    exports.slideDown = function() {
        var item = navList[index.x];
        sidesnumber = item.sides;
        if (index.y > 0) {

            index.y--;
        }
        else {
            index.y = sidesnumber - 1;
        }

        console.log(index.x, index.y);
        $.mobile.pageContainer.pagecontainer("change", $("#" + item.id + "s" + index.y) , { transition : "slidedown", reload : "false"});


    };

    exports.next = function() {

        index.y = 0;
        if (index.x < (cardsnumber - 1)) {

            index.x++;
        }
        else {

            index.x = 0;
        }
        var navItem = navList[index.x];
        console.log(index.x, index.y);
        $.mobile.pageContainer.pagecontainer("change", $("#" + navItem.id + "s" + index.y) , { transition : "slide", reload : "true" });

    };

    exports.prev = function() {

        index.y = 0;
        //$("#" + index).attr("show", "false");

        if (index.x > 0) {
            index.x--;
        }
        else {
            index.x = cardsnumber - 1;
        }
        var navItem = navList[index.x];

        console.log(index.x, index.y);
        $.mobile.pageContainer.pagecontainer("change", $("#" + navItem.id + "s" + index.y), { transition : "slide", reload : "true", reverse : "true" });

    };


})(this.DataPresenter = {});