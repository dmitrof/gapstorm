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

    function restart() {
        console.log(TAG, "restart");

        currentStack = currentStack.concat(stackAddition);
        stackAddition = [];
        shuffle(currentStack);
        fullStack = fullStack.concat(currentStack);
        cardsnumber = fullStack.length;
        card_x++;
    }

    //this piece goes to prototype

    exports.initStack = function(_cardsList) {

        for (cardId in _cardsList) {
            currentStack.push(cardId);
            cardsnumber++;
        }
        fullStack = currentStack;
        console.log(TAG, fullStack);
        cardsList = _cardsList;
        //console.log("cardsLIST", cardsList);
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