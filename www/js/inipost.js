/**
 * Created by Дмитрий on 14.04.2016.
 */
var initPost = function() {

    /*window.config.site.db.del(function(err, ok) {
     if (err) {
     console.log(TAG, err);
     }
     if (ok) {
     console.log(TAG, ok);
     }

     });*/

    var kan = {};
    kan.task_type="kanjicard";
    kan.name="joyo";
    kan.indx="kan";

    var kanji1 = {};
    kanji1.indx = "kan1";
    kanji1.item_type = "kanjicard";
    kanji1.bigkanji = "星";
    kanji1.kana = "ほし";
    kanji1.lvl = "N2";
    kanji1.words = "words",
        kanji1.backside = {
            kanjitrans : "starrrr",
            romaji : "hoshi"
        };





    var kanji2 = {};
    kanji2.indx = "kan4";
    kanji2.item_type = "kanjicard";
    kanji2.bigkanji = "家";
    kanji2.kana = "いえ、";
    kanji2.words = "家族";
    kanji2.lvl = "N4";
    kanji2.backside = {
        kanjitrans: "houseeee",
        romaji : "joyo"
    }


    //update cards syntax
    window.config.site.db.get(kanji1.indx, function(err, ok) {
        if (err) {
            console.log(TAG, err);
        }
        if (ok) {
            kanji1._rev = ok._rev;
            console.log(TAG, ok);


        }
        window.config.site.db.put(kanji1.indx, kanji1, function(err, ok) {
            if (err) {
                console.log(TAG, err);
                console.log(kanji1._rev);
            } else
            if (ok) {
                console.log(TAG, ok);
            }

        });


    });

    window.config.site.db.get(kanji2.indx, function(err, ok) {
        if (err) {
            console.log(TAG, err);

        }
        if (ok) {
            kanji2._rev = ok._rev;
            console.log(TAG, ok);


        }
        window.config.site.db.put(kanji2.indx, kanji2, function(err, ok) {
            if (err) {
                console.log(TAG, err);
                console.log(kanji2._rev);
            } else
            if (ok) {
                console.log(TAG, ok);
            }

        });

    });


};
