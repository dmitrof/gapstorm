/**
 * Created by Дмитрий on 07.03.2016.
 */
(function(exports){

    var cardsList = {};
    var TAG = "DataPresenter";
    this.cardsNavigator = PersistentNavigator;
    var cardsSet = [];
    var deckReadyPromises = [];
    //module for writing JSON data into DOM.
    //promises = [];

    exports.presentDeck = function(deck_id) {
        cardsSet = [];
        cardsList = [];
        var promises = [];
        window.config.site.db.get(deck_id, function(err, deck) {
            if (err) {console.log(TAG, err)}
            else if (deck) {
                //console.log(TAG, deck);
                if (deck.cards_list) {
                    deck.cards_list.forEach(function(card_id) {
                        //console.log("CARD_ID", card_id);
                        promise = new Promise(function(resolve, reject) {
                                window.config.site.db.get(card_id, function(err, card) {
                                    if (err) {console.log(TAG, err)}
                                    else if (card) {
                                        cardsSet.push(card);
                                        resolve("get finished!");
                                    }

                                    //start();
                                });
                        });
                        /*promise.then(function() {
                           console.log("CardsSet", cardsSet);
                        });*/
                        promises.push(promise);
                    });
                }
            }
            Promise.all(promises).then(function(){
                presentData(deck_id);
                console.log("promises", promises);

            });
        });
    };

    exports.presentCustomDeck = function(cards_list) {
        cardsSet = [];
        cardsList = [];
        var promises = [];
        cards_list.forEach(function(card_id) {
            promise = new Promise(function(resolve, reject) {
                window.config.site.db.get(card_id, function(err, card) {
                    if (err) {console.log(TAG, err)}
                    else if (card) {
                        cardsSet.push(card);
                        resolve("get finished!");
                    }
                });
            });
            /*promise.then(function() {
             console.log("CardsSet", cardsSet);
             });*/
            promises.push(promise);
        });
        Promise.all(promises).then(function(){
            presentData("custom");
            console.log("promises", promises);

        });


    };

    this.presentData = function(deckId) {

        $("#cards_place").empty();
        //$("div.card").remove();
        var id = -1;
        console.log("presentData", cardsSet);
        cardsSet.forEach(function(row) {
            id = row._id;
            console.log(id, row);
            writeDiv(id, row);
            var navItem = {};
            navItem.id = id;
            navItem.sides = row.content.length;  //adding the card to navigation
            navItem.task_type = row.card_info.task_type;
            //cardsList[id] = navItem.sides;
            cardsList[id] = navItem;
        });
        cardsNavigator.initStack(deckId, cardsList);


    };

    //function that creates new cardside in pagecontainer
    this.writeDiv = function(id, card) {
        var card_info = card.card_info;
        var cardsides = card.content;
        card_info.sides = cardsides.length;
        cardsides.forEach(function(cardside) {

            //console.log("Cardside", cardside);
            $.get("html/" + cardside.item_type + ".html", function(textdata) {
                $("#cards_place").append(textdata);

                fill(id, cardside, card_info);

            });

        });
    };

    /*exports.start = function() {
        var navItem = cardsNavigator.start();
        console.log(navItem.id, navItem.side);
        $.mobile.pageContainer.pagecontainer("change", $("#" + navItem.id + "s" + navItem.side) , { transition : "slideup", reload : "false"});
    };*/

    exports.slideUp = function() {
        var navItem = cardsNavigator.flipUp();

        cardsNavigator.markCard("flip");
        console.log(navItem.id, navItem.side);
        $.mobile.pageContainer.pagecontainer("change", $("#" + navItem.id + "s" + navItem.side) , { transition : "slideup", reload : "false"});


    };

    exports.slideDown = function() {
        var navItem = cardsNavigator.flipDown();
        cardsNavigator.markCard("flip");
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


/*window.config.site.views("get_kanji", function(err, view) {
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
 cardsList[id] = navItem.sides;
 });
 cardsNavigator.initStack(cardsList);
 }

 });*/