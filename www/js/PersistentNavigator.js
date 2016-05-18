/**
 * Created by Дмитрий on 14.04.2016.
 */
//simple navigation algorithm
(function(exports){

    var card_x = -1;
    var card_y = 0;
    var cardsnumber = 0;
    var deckId;
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

    exports.shuffleArray = shuffle;

    exports.markCard = function(actionType) {

        var taskType = cardsList[fullStack[card_x]].task_type;
        //console.log("THIS CARD's Type : ", taskType);
        var taskObj = markRules[taskType];
        var modifier = taskObj[actionType];
        //console.log("MODIFIER FOR THIS CARD IS", modifier);
        if (stackAddition.indexOf(fullStack[card_x]) == -1) {
            console.log("added", fullStack[card_x]);
            var addition = {};
            addition.id = fullStack[card_x];
            addition.modifier = modifier;
            stackAddition.push(addition);
        }
        console.log(TAG, stackAddition);
    };
    //each currentStack cycle i do a restart
    function restart() {
        console.log("restart, stack addition: ", stackAddition);
        //now i add information about repeats to a database
        stackAddition.forEach(function(addition) {
            userInfo = CBManager.getUser();
            var cardStatId = "stat_" + userInfo.username + "_" + addition.id;

            var modifier = addition.modifier;
            currentStack.push(addition.id);
            //console.log("PUSHED TO CURRENT STACK", currentStack);
            window.config.site.db.get(cardStatId, function(err, cardGet) {
                var cardPut = {};
                cardPut.stud_id = login;
                if (err) {
                    console.log(err);
                    cardPut.rep_count = 1;
                    cardPut.doc_type = "card_stat";
                    cardPut.doc_channels = [];
                }
                else if (cardGet) {
                    console.log(cardGet);
                    cardPut._rev = cardGet._rev;
                    cardPut.rep_count = cardGet.rep_count + modifier;
                }
                window.config.site.db.put(cardStatId, cardPut, function(err, ok) {
                    console.log(err, ok);
                });

            });
        });     //concatenating stacks
        //currentStack = currentStack.concat(stackAddition);
        //console.log("BEFORESHUFFLE", currentStack);
        shuffle(currentStack);
        //console.log("CURRENTSTACK", currentStack);
        fullStack = fullStack.concat(currentStack);
        cardsnumber = fullStack.length;
        card_x++;
        stackAddition = [];
        //console.log("FULLSTACK", fullStack);
    }

    //this piece goes to prototype

    function fillStack(cardId) {
        //var cardId = cardInd;
        //console.log("cardId", cardId);
        userInfo = CBManager.getUser();
        var cardStatId = "stat_" + userInfo.username + "_" + cardId;
        promise = new Promise(function(resolve, reject) {
            window.config.site.db.get(cardStatId, function(err, cardGet) {
                if (err) {
                    console.log(err);
                    var cardPut = {};
                    cardPut.stud_id = login;
                    console.log(err);
                    cardPut.rep_count = 1;
                    cardPut.doc_type = "card_stat";
                    cardPut.doc_channels = [];
                    currentStack.push(cardId);
                    cardsnumber++;
                    window.config.site.db.put(cardStatId, cardPut, function(err, ok) {
                        console.log(err, ok);
                    });
                }
                else if (cardGet) {
                    //console.log(cardGet.rep_count);
                    if (!cardGet.rep_count || cardGet.rep_count == 0) {

                    }
                    for (var i = 0; i < Math.floor(cardGet.rep_count); i++) {
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

    exports.initStack = function(_deckId, _cardsList) {
        deckId = _deckId;
        stackPromises = [];
        currentStack = [];
        fullStack = [];
        stackAddition = [];
        cardsnumber = 0;
        card_x = -1;
        card_y = 0;
        console.log("INITATING STACK " + _deckId, _cardsList);
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
        card_x = 0;
        console.log(card_x, fullStack[card_x]);
        //var card = {};
        card_id = fullStack[card_x];

        var task_type = cardsList[fullStack[card_x]].task_type;
        if (task_type == "kanji_card") {
            window.screen.lockOrientation('landscape');
        }
        else if (task_type == "vocab_test"){
            window.screen.lockOrientation('portrait');
        }
        else {
            window.screen.unlockOrientation();
        }
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
        var task_type = cardsList[fullStack[card_x]].task_type;
        if (task_type == "kanji_card") {
            window.screen.lockOrientation('landscape');
        }
        else if (task_type == "vocab_test"){
            window.screen.lockOrientation('portrait');
        }
        else {
            window.screen.unlockOrientation();
        }

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
        var task_type = cardsList[fullStack[card_x]].task_type;
        if (task_type == "kanji_card") {
            window.screen.lockOrientation('landscape');
        }
        else if (task_type == "vocab_test"){
            window.screen.lockOrientation('portrait');
        }
        else {
            window.screen.unlockOrientation();
        }
        return card;
    };

    exports.flipUp = function() {
        var sidesnumber = cardsList[fullStack[card_x]].sides;
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
        var sidesnumber = cardsList[fullStack[card_x]].sides;
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