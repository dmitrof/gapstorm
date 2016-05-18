/**
 * Created by Дмитрий on 13.03.2016.
 */
var fill = function(i, card) {
    //alert("fill the card");
    $("#-1").attr("id", i);
    //alert("id changed");
    $("#" + i +" .bigkanji").html(card.bigkanji);

    $("#" + i +" .bigkanji").click(function() {
        alert("you clicked " + i);
    });

    $("#" + i + " .kana").html(card.kana);
    $("#" + i + " .examples").html(card.examples);
    $("#" + i + " .level").html(card.level);

    $("#" + i + " #nextcard").click(function() {

        DataPresenter.next();
    });

    $("#" + i + " #prevcard").click(function() {
        DataPresenter.prev();
    });


};