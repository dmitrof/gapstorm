/**
 * Created by Дмитрий on 07.03.2016.
 */
(function(exports){

    var index = {};
    index.x = -1;
    index.side = "front";
    var cardsnumber = 0;
    //module for writing JSON data into DOM.
    /*exports.presentData = function(dataarray) {
        cardsnumber = dataarray.length;

        for (var i = 0; i < dataarray.length; i++) {
            var card = dataarray[i];
            var id = i;
            writeDiv(id, card);
        }
    }*/

    exports.presentData = function() {
        var id = -1;
        console.log("presentData");
        window.config.site.views(["by_level", {group : true}], function(err, view) {
            if (err) {
                console.log("err ",err);
            }
            else if (view) {
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
        //console.log("here it is ",JSON.stringify(card));
        //alert("write div" + card.bigkanji);
        var pages = pageRules[card.item_type];

        //ajax page load and append
        for (var t = 0; t < pages.length; t++) {
            //alert(pages[t] + " " + t);
            console.log(pages[t]);
            $.get("html/" + pages[t], function(textdata) {
                $("body").prepend(textdata);
                fill(id, card);

            });
        }

    };

    exports.toggleSide = function() {
        if (index.side === "front") {
            index.side = "back";
        }
        else {
            index.side = "front";
        }

        $.mobile.pageContainer.pagecontainer("change", $("#" + index.x + index.side) , { transition : "flip", reload : "true", reverse : "true" });


    };

    exports.next = function() {
        if (index.x < (cardsnumber - 1)) {

            index.x++;
        }
        else {

            index.x = 0;
        }

        console.log(index.x, index.side);
        $.mobile.pageContainer.pagecontainer("change", $("#" + index.x + index.side) , { transition : "slide", reload : "true", });

    };

    exports.prev = function() {

        //$("#" + index).attr("show", "false");

        if (index.x > 0) {
            index.x--;
        }
        else {
            index.x = cardsnumber - 1;
        }


        console.log(index.x, index.side);
        $.mobile.pageContainer.pagecontainer("change", $("#" + index.x + index.side), { transition : "slide", reload : "true", reverse : "true" });

    };


})(this.DataPresenter = {});