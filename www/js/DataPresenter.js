/**
 * Created by Дмитрий on 07.03.2016.
 */
(function(exports){

    var index = {};
    index.x = -1;
    index.y = 0;
    var cardsnumber = 0;
    var sidesnumber = 2;
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
                    id++;
                    writeDiv(id, row.key);
                });
            }

        });
    };

    //function that creates new div in main div
    this.writeDiv = function(id, card) {
        console.log("writeDiv");

        var cardsides = card.content;
        cardsides.forEach(function(cardside) {
            //console.log("Cardside", cardside);
            $.get("html/" + cardside.item_type + ".html", function(textdata) {
                $("body").prepend(textdata);
                fill(id, cardside, card.cardinfo);

            });

        });




    };

    exports.slideUp = function() {
        if (index.y < (sidesnumber - 1)) {

            index.y++;
        }
        else {
            index.y = 0;
        }


        $.mobile.pageContainer.pagecontainer("change", $("#" + index.x + "s" + index.y) , { transition : "slideup", reload : "false"});


    };

    exports.slideDown = function() {
        if (index.y > 0) {

            index.y--;
        }
        else {
            index.y = sidesnumber - 1;
        }


        $.mobile.pageContainer.pagecontainer("change", $("#" + index.x + "s" + index.y) , { transition : "slidedown", reload : "false"});


    };

    exports.next = function() {
        if (index.x < (cardsnumber - 1)) {

            index.x++;
        }
        else {

            index.x = 0;
        }

        console.log(index.x, index.y);
        $.mobile.pageContainer.pagecontainer("change", $("#" + index.x + "s" + index.y) , { transition : "slide", reload : "true" });

    };

    exports.prev = function() {

        //$("#" + index).attr("show", "false");

        if (index.x > 0) {
            index.x--;
        }
        else {
            index.x = cardsnumber - 1;
        }


        console.log(index.x, index.y);
        $.mobile.pageContainer.pagecontainer("change", $("#" + index.x + "s" + index.y), { transition : "slide", reload : "true", reverse : "true" });

    };


})(this.DataPresenter = {});