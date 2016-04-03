/**
 * Created by Дмитрий on 07.03.2016.
 */
(function(exports){
    var index;
    //module for writing JSON data into DOM.
    exports.presentData = function(dataarray) {

        for (var i = 0; i < dataarray.length; i++) {
            var card = dataarray[i];

            writeDiv(i, card);


        }
        //make the first element visible
        $("#0").attr('show', 'true');
        index = 0;

    }

    //function that creates new div in main div
    this.writeDiv = function(i, card) {

        $("#slide").append(
            $("<div id=" + i + " class=card show=false>").load("html/" + pageRules[card.type] , function() {
                fill(i, card);

            }));
        $("#slide").append("</div>");
        $("#slide").append("<br>");
    };

    exports.next = function() {
        alert("next");
        $("#" + index).attr("show", "false");
        index++
        $("#" + index).attr("show", "true");
    };

    exports.prev = function() {
        alert("prev");
        $("#" + index).attr("show", "false");
        index--;
        $("#" + index).attr("show", "true");
    };


})(this.DataPresenter = {});