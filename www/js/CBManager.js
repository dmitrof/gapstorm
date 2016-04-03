/**
 * Created by Дмитрий on 31.03.2016.
 */
(function(exports){
    var order = 0;
    var coax = require("coax");
    var appDbName = "gapstorm";
    var TAG = "CBManager";
    //module for working with localstorage
    exports.setup = function() {

        window.cblite.getURL(function(err,url) {
            var db = coax([url, appDbName]);
            setupDb(db, function(err, info){
                order++;
                //console.log("setupDb: " + order +" " + info.doc_count);
                updateViews(db, function(err, views) {
                    console.log("setting up configs");
                    window.config = {
                        site : {
                            //syncUrl : "http://sync.couchbasecloud.com/registration/",
                            db : db,
                            s : coax(url),
                            info : info,
                            views : views,
                            server : url

                        }
                    };

                });

            });

        });
        return 1;


    };


    function setupDb(db, cb) {
        // db.del(function(){
        db.put(function(){
            db.get(cb)
        });
        // })
    }

    function setupViews(db, cb) {
        var design = "_design/gapstorm";


                db.put(design,  {
                    views : {
                    get_cards: {
                        map: function (doc, meta) {
                            if (doc.item_type && doc.item_type === "kanjicard") {
                                emit(doc, 1);
                            }

                        }.toString()
                    },
                    by_level: {
                        map: function (doc, meta) {
                            if (doc.item_type && doc.item_type === "kanjicard") {
                                emit(doc.lvl, 1);
                            }

                        }.toString(),
                        reduce: function (keys, values, rereduce) {
                            if (!rereduce) {
                                return values.length;
                            } else {
                                var sum = 0;
                                for (i in values) {
                                    sum += values[i];
                                }
                                return sum;
                            }
                        }.toString()


                    }

                     }
                },

                    function(err, success) {

                            $.when(cb(false, db([design, "_view"]))).done(function() {
                                $.when(initPost()).done(function() {
                                    document.dispatchEvent(new Event('dbready'));
                               });
                                //DataPresenter.presentData();

                            });


                    });





    }

    function updateViews(db, cb) {
        var design = "_design/gapstorm";
        /*db.del(design, function(err, ok) {
         console.log(err, ok);
         });*/
        db.get(design, function(err, ok) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(ok);
                var view_doc = ok;
                view_doc.views = {
                    get_cards : {
                        map : function(doc, meta) {
                            if (doc.item_type && doc.item_type === "kanjicard") {
                                emit(doc, 1);
                            }

                        }.toString()
                    },
                    by_level : {
                        map : function(doc, meta) {
                            if (doc.item_type && doc.item_type === "kanjicard") {
                                emit(doc.lvl, 1);
                            }

                        }.toString(),
                        reduce : function (keys, values, rereduce) {
                            if(!rereduce) {
                                return values.length;
                            } else {
                                var sum = 0;
                                for (i in values) {
                                    sum += values[i];
                                }
                                return sum;
                            }
                        }.toString()



                    }

                }
                db.put(design, view_doc,

                    function(err, success) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(success);
                            $.when(cb(false, db([design, "_view"]))).done(function() {
                                $.when(initPost()).done(function() {
                                    document.dispatchEvent(new Event('dbready'));
                                });
                                //DataPresenter.presentData();

                            });
                        }

                    })

            }
        });


    }


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
                window.config.site.db.put(kanji1.indx, kanji1, function(err, ok) {
                    if (err) {
                        console.log(TAG, err);
                        console.log(kanji1._rev);
                    } else
                    if (ok) {
                        console.log(TAG, ok);
                    }

                });

            }

        });

        window.config.site.db.get(kanji2.indx, function(err, ok) {
            if (err) {
                console.log(TAG, err);

            }
            if (ok) {
                kanji2._rev = ok._rev;
                console.log(TAG, ok);
                window.config.site.db.put(kanji2.indx, kanji2, function(err, ok) {
                    if (err) {
                        console.log(TAG, err);
                        console.log(kanji2._rev);
                    } else
                    if (ok) {
                        console.log(TAG, ok);
                    }

                });

            }

        });


    };





})(this.CBManager = {});