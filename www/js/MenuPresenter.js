/**
 * Created by Дмитрий on 23.04.2016.
 */
(function(exports){
    var TAG = "MENUPRESENTER";

    exports.presentMenu = function() {
        console.log(TAG, "presentMenu");
        window.config.site.views(["get_decks"], function (err, view) {
                if (err) {
                    console.log(TAG, err)
                }
                else if (view) {
                    view.rows.forEach(function (row) {
                        console.log("deck", row.key);
                        AddDeckToMenu(row.id, row.key);

                    });
                }

            }
        );

        window.config.site.views(["by_level", {group : true}], function(err, view) {
            if (err) {
                console.log("err ",err);
            }
            else if (view) {
                console.log("success", view.rows.length);
                view.rows.forEach(function(row) {
                    var deck = {};
                    deck.description = "JLPT  " + row.key;
                    deck.length = row.value;
                    deck.custom = true;
                    AddDeckToMenu(row.key, deck);
                });
            }

        });
    };




    this.AddDeckToMenu = function(deckId, deck) {

        var menu_info = {};
        menu_info.deck_id = deckId;
        menu_info.deck_name = deck.description;
        menu_info.deck_description = deck.description;
        if (deck.cards_list) {
            menu_info.deck_length = deck.cards_list.length;
        }
        else if (deck.length) {menu_info.deck_length = deck.length;}


        if (deck.custom) {
            $.get("html/menuitem.html", function (textdata) {
                $("#custom_menu").append(textdata);
                fill(menu_info);

            });
        }
        else {
            $.get("html/menuitem.html", function (textdata) {
                $("#decks_menu").append(textdata);
                fill(menu_info);

            });
        }
        //console.log("Cardside", cardside);

    }
})(this.MenuPresenter = {});