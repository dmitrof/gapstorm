/**
 * Created by Дмитрий on 23.04.2016.
 */
(function(exports){
    var TAG = "MENUPRESENTER";
    var menuReadyPromises = [];

    exports.presentMenu = function() {
        console.log(TAG, "presentMenu");

        $("#decks_menu").empty();
        $("#custom_menu").empty();
        //window.config.site.db.info
        window.config.site.views(["get_decks"], function (err, view) {
                if (err) {
                    console.log(TAG, err)
                }
                else if (view) {
                    view.rows.forEach(function (row) {
                        //console.log("deck", row.key);
                        AddDeckToMenu(row.id, row.key);

                    });
                }

            }
        );

        window.config.site.views(["kanji_cards_by_level", {group : true}], function(err, view) {
            if (err) {
                console.log("err ",err);
            }
            else if (view) {
                //console.log("success", view.rows);
                view.rows.forEach(function(row) {
                    var deck = {};
                    deck.description = "JLPT  " + row.key;
                    deck.deck_name = "JLPT  " + row.key;
                    deck.length = row.value.length;
                    deck.custom = true;
                    deck.cards_list = row.value;
                    deck.type = "kanji_cards_deck";
                    AddDeckToMenu(row.key, deck);
                });

            }

        });

        window.config.site.views(["cards_by_feature", {group : true}], function(err, view) {
            if (err) {
                console.log("err ",err);
            }
            else if (view) {
                //console.log("success", view.rows);
                view.rows.forEach(function(row) {
                    var deck = {};
                    deck.description = "JLPT  " + row.key;
                    deck.deck_name = featureTranslate[row.key];
                    deck.length = row.value.length;
                    deck.custom = true;
                    deck.cards_list = row.value;
                    deck.type = "kanji_cards_deck";
                    AddDeckToMenu(row.key, deck);

                });

            }
            Promise.all(menuReadyPromises).then(function() {
                console.log("menuReadyPromises", menuReadyPromises);
                $.mobile.pageContainer.pagecontainer("change", $("#menu") , { transition : "slidedown", reload : "false"});
            });


        });

        /*window.config.site.views(["cards_by_feature_by_level", {group : true}], function(err, view) {
            if (err) {
                console.log("err ",err);
            }
            else if (view) {
                console.log("success", view.rows);
                view.rows.forEach(function(row) {
                    console.log("by_fe_by_le", row);
                    var deck = {};
                    deck.description = "JLPT  " + row.key.lvl + row.key.feature;
                    deck.deck_name = featureTranslate[row.key.feature] + " JLPT" + row.key.lvl ;
                    deck.length = row.value.length;
                    deck.custom = true;
                    deck.cards_list = row.value;
                    deck.type = "kanji_cards_deck";
                    AddDeckToMenu("JLPT_" + row.key.lvl + row.key.feature, deck);

                });

            }


        });*/



    };

    this.AddDeckToMenu = function(deckId, deck) {



        if (deck.custom) {
            promise = new Promise(function(resolve, reject) {
                $.get("html/menuitem.html", function (textdata) {
                    $("#custom_menu").append(textdata);

                    fill(deckId, deck);
                    resolve("deck added to menu!");
                });
            });
            menuReadyPromises.push(promise);
        }
        else {
            promise = new Promise(function(resolve, reject) {
                $.get("html/menuitem.html", function (textdata) {
                    $("#decks_menu").append(textdata);
                    fill(deckId, deck);
                    resolve("deck added to menu!");
                });
            });
            menuReadyPromises.push(promise);
        }
        //console.log("Cardside", cardside);

    }
})(this.MenuPresenter = {});