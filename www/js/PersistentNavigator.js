/**
 * Created by Дмитрий on 14.04.2016.
 */
//simple navigation algorithm
(function(exports){

    var card_x = -1;
    var card_y = 0;
    var cardsnumber = 0;
    var TAG = "PersistentNavigator";
    var currentStack = [];
    var stackAddition = [];
    var fullStack = [];
    var stackPromises = [];
    cardsList = {};


    function shuffle(a) {
        var j, x, i;
        for (i = a.length; i; i -= 1) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }

    exports.markCard = function() {

        if (stackAddition.indexOf(fullStack[card_x]) == -1) {
            console.log("added", fullStack[card_x]);
            stackAddition.push(fullStack[card_x]);
        }
        console.log(TAG, stackAddition);
    };
    //each currentStack cycle i do a restart
    function restart() {
        console.log(TAG, "restart");
        //now i add information about repeats to a database
        stackAddition.forEach(function(cardId) {
            cardId = username + "stat" + cardId;
            window.config.site.db.get(cardId, function(err, cardGet) {
                var cardPut = {};
                cardPut.stud_id = username;
                if (err) {
                    console.log(err);
                    cardPut.rep_count = 1;
                }
                else if (cardGet) {
                    console.log(cardGet);
                    cardPut._rev = cardGet._rev;
                    cardPut.rep_count = cardGet.rep_count + 1;
                }
                window.config.site.db.put(cardId, cardPut, function(err, ok) {
                    console.log(err, ok);
                });

            });
        });     //concatenating stacks
        currentStack = currentStack.concat(stackAddition);
        stackAddition = [];
        shuffle(currentStack);
        fullStack = fullStack.concat(currentStack);
        cardsnumber = fullStack.length;
        card_x++;
    }

    //this piece goes to prototype

    function fillStack(cardId) {
        //var cardId = cardInd;
        //console.log("cardId", cardId);
        var cardStatId = username + "stat" + cardId;
        promise = new Promise(function(resolve, reject) {
            window.config.site.db.get(cardStatId, function(err, cardGet) {
                if (err) {
                    console.log(err);
                }
                else if (cardGet) {
                    //console.log(cardGet.rep_count);
                    for (var i = 0; i < cardGet.rep_count; i++) {
                        currentStack.push(cardId);
                        cardsnumber++;
                    }
                }
                fullStack = currentStack;
                shuffle(fullStack);
                console.log("FULLSTACK", fullStack);
                resolve("card added!");
            });
        });
        stackPromises.push(promise);

    }

    exports.initStack = function(_cardsList) {
        currentStack = [];
        fullStack = [];
        stackAddition = [];
        console.log("INITATING STACK", _cardsList);
        for (var cardInd in _cardsList) {
            fillStack(cardInd);
        }
        cardsList = _cardsList;

        Promise.all(stackPromises).then(function(){
            exports.start();
            //console.log("stackpromises", stackPromises);

        });




        //console.log("cardsLIST", cardsList);
    };


    exports.start = function() {
        card_y = 0;
        card_x = 1;
        console.log(card_x, fullStack[card_x]);
        //var card = {};
        card_id = fullStack[card_x];
        $.mobile.pageContainer.pagecontainer("change", $("#" + card_id + "s" + card_y) , { transition : "slideup", reload : "false"});
        //return card;
    };

    exports.next = function() {
        card_y = 0;
        if (card_x < (cardsnumber - 1)) {
            card_x++;

        }
        else {
            restart();
        }
        console.log(card_x, fullStack[card_x]);
        var card = {};
        card.id = fullStack[card_x];
        card.side = card_y;
        return card;
    };



    exports.prev = function() {
        card_y = 0;
        if (card_x > 0) {
            card_x--;

        }
        else {
            card_x = cardsnumber - 1;
        }
        console.log(card_x);
        var card = {};
        card.id = fullStack[card_x];
        card.side = card_y;
        return card;
    };

    exports.flipUp = function() {
        var sidesnumber = cardsList[fullStack[card_x]];
        if (card_y < (sidesnumber - 1)) {

            card_y++;
        }
        else {
            card_y = 0;
        }
        var card = {};
        card.id = fullStack[card_x];
        card.side = card_y;
        return card;

    };

    exports.flipDown = function() {
        var sidesnumber = cardsList[fullStack[card_x]];
        if (card_y > 0) {

            card_y--;
        }
        else {
            card_y = sidesnumber - 1;
        }
        var card = {};
        card.id = fullStack[card_x];
        card.side = card_y;
        return card;

    };









})(this.PersistentNavigator = {});