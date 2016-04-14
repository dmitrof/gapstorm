/**
 * Created by Дмитрий on 14.04.2016.
 */
//simple navigation algorithm
(function(exports){

    var index = {};
    var x = -1;
    var y = 0;
    var cardsnumber = 0;
    var TAG = "SimpleNavigator";
    var currentStack = [];
    var nextStack = [];

    exports.initStack = function(cardsList) {
        for (cardId in cardsList) {
            currentStack.push(cardId);
        }
        console.log(TAG, currentStack);
        x = 0;
    }

    exports.nextCard = function() {
        x++;
        return currentStack[x];
    }

    exports.prevCard = function() {
        x++;
        return currentStack[x];
    }





})(this.MyNavigator = {});