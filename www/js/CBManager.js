/**
 * Created by Дмитрий on 31.03.2016.
 */
(function(exports){
    var order = 0;
    var coax = require("coax");
    var appDbName = "gapstorm";
    var TAG = "CBManager";
    this.user = "ttmitry@gmail.com";
    //module for working with localstorage
    exports.createDB = function() {

        window.cblite.getURL(function(err,url) {
            var db = coax([url, appDbName]);

            db.del(function(err, ok) {
                if (err) {
                    console.log(TAG, err);
                }
                if (ok) {
                    console.log(TAG, ok);
                }

            });
            setupDb(db, function(err, info){
                console.log("setupDb: " + order +" " + info.doc_count);
                setupViews(db, function(err, views) {
                    setupConfig(url, db, views, info);
                    triggerSync();
                    db.get("kan6", function(err, ok) {
                        //db.get(["kan6", "atta.txt", {"rev" : "8-a1d83409b54c1c35d9d2883258dd9142"}], function(err, ok) {
                        if (err) {
                            console.log("DB CREATION CHECK, ERR", err);
                        }
                        if (ok) {

                            console.log("DB CREATION CHECK, OK", ok);
                        }
                    });

                });

            });







        });
        return 1;


    };


    function setupConfig(url, db, views, info) {
        window.config = {
            site : {
                syncUrl : "http://" + username + ":" + password+ "@192.168.0.54:4984/gapstorm/",
                db : db,
                s : coax(url),
                info : info,
                views : views,
                server : url

            }
        };

    }

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
                        get_kanji: {
                            map: function (doc) {
                                if (doc.cardinfo.tasktype && doc.cardinfo.tasktype == "kanjicard") {
                                emit(doc, null);
                                 }
                            }.toString()
                        },
                    get_cards: {
                        map: function (doc) {
                            if (doc.cardinfo.tasktype && doc.cardinfo.tasktype == "kanjicard") {
                                emit(doc, null);
                            }

                        }.toString()
                    },
                    by_level: {
                        map: function (doc) {
                            if (doc.cardinfo) {
                                emit(doc.cardinfo.lvl, 1);
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

                    function() {
                        $.when(cb(false, db([design, "_view"]))).done(function() {


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
                    views : {
                        get_kanji: {
                            map: function (doc) {
                                //if (doc.item_type && doc.item_type === "kanjicard") {
                                emit(doc, null);
                                // }

                            }.toString()
                        },
                        get_cards: {
                            map: function (doc) {
                                //if (doc.item_type && doc.item_type === "kanjicard") {
                                emit(doc, null);
                                // }

                            }.toString()
                        },
                        by_level: {
                            map: function (doc) {
                                //if (doc.item_type && doc.item_type == "kanjicard") {
                                emit(doc.cardinfo.lvl, 1);
                                //}

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
                };


                db.put(design, view_doc,

                    function(err, success) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(success);
                            $.when(cb(false, db([design, "_view"]))).done(function() {

                                //DataPresenter.presentData();

                            });
                        }

                    })

            }
        });


    }



    function triggerSync(cb, retryCount) {

        /*    if (!config.user) {
         return log("no user")
         }
         */
        var challenged = false;
        console.log(window.config.site.syncUrl);
        var remote = {
                url : window.config.site.syncUrl
            },
            push = {
                source : appDbName,
                target : remote,
                continuous : true
            }, pull = {
                target : appDbName,
                source : remote,
                continuous : true
            };

        pushSync = syncManager(window.config.site.server, push);
        pullSync = syncManager(window.config.site.server, pull);

        if (typeof retryCount == "undefined") {
            retryCount = 3
        }

        pushSync.on("error", function(err){
            if (challenged) {return}
            console.log("err", err)
        })
        pushSync.on("connected", function(){
            pullSync.start()
        })
        pullSync.on("error", function(err){
            if (challenged) {return}
            console.log("err", err)
        })
        pullSync.on("connected", function(){
            console.log("connected", "connected")
        })
        // setTimeout(function(){
        pushSync.start();
        // }, 10000)

    }


    function syncManager(serverUrl, syncDefinition) {
        var handlers = {}

        function callHandlers(name, data) {
            (handlers[name]||[]).forEach(function(h){
                h(data)
            })
        }

        function doCancelPost(cb) {
            var cancelDef = JSON.parse(JSON.stringify(syncDefinition))
            cancelDef.cancel = true
            coax.post([serverUrl, "_replicate"], cancelDef, function(err, info){
                if (err) {
                    callHandlers("error", err)
                    if (cb) {cb(err, info)}
                } else {
                    callHandlers("cancelled", info)
                    if (cb) {cb(err, info)}
                }
            })
        }

        function doStartPost() {
            var tooLate;
            function pollForStatus(info, wait) {
                if (wait) {
                    setTimeout(function() {
                        tooLate = true
                    }, wait)
                }
                processTaskInfo(info.session_id, function(done){
                    if (!done && !tooLate) {
                        setTimeout(function() {
                            pollForStatus(info)
                        }, 200)
                    } else if (tooLate) {
                        callHandlers("error", "timeout")
                    }
                })
            }

            var callBack;
            if (syncDefinition.continuous) {
                // auth errors not detected for continuous sync
                // we could use _active_tasks?feed=continuous for this
                // but we don't need that code for this app...
                callBack = function(err, info) {
                    log("continuous sync callBack", err, info, syncDefinition)
                    if (err) {
                        callHandlers("error", err)
                    } else {
                        pollForStatus(info, 10000)
                        callHandlers("started", info)
                    }
                }
            } else { // non-continuous
                callBack = function(err, info) {
                    log("sync callBack", err, info, syncDefinition)
                    if (err) {
                        if (info.status == 401) {
                            err.status = info.status;
                            callHandlers("auth-challenge", err)
                        } else {
                            err.status = info.status;
                            callHandlers("error", err)
                        }
                    } else {
                        callHandlers("connected", info)
                    }

                }
            }
            console.log("start sync",JSON.stringify(syncDefinition));
            coax.post([serverUrl, "_replicate"], syncDefinition, callBack);
            // coax.post([serverUrl, "_replicator"], syncDefinition, callBack)
        }

        function processTaskInfo(id, cb) {
            taskInfo(id, function(err, task) {
                if (err) {return cb(err)}
                log("task", task)

                publicAPI.task = task
                if (task.error && task.error[0] == 401) {
                    cb(true)
                    callHandlers("auth-challenge", {status : 401, error : task.error[1]})
                } else if (task.error && task.error[0] == 502) {
                    cb(true)
                    callHandlers("auth-challenge", {status : 502, error : task.error[1]})
                } else if (task.status == "Idle" || task.status == "Stopped" || (/Processed/.test(task.status) && !/Processed 0/.test(task.status))) {
                    cb(true)
                    callHandlers("connected", task)
                } else if (/Processed 0 \/ 0 changes/.test(task.status)) {
                    // cb(false) // keep polling? (or does this mean we are connected?)
                    cb(true)
                    callHandlers("connected", task)
                } else {
                    cb(false) // not done
                }
            })
        }

        function taskInfo(id, cb) {
            coax([serverUrl,"_active_tasks"], function(err, tasks) {
                var me;
                for (var i = tasks.length - 1; i >= 0; i--) {
                    if (tasks[i].task == id) {
                        me = tasks[i]
                    }
                }
                cb(false, me);
            })
        }

        var publicAPI = {
            start : doStartPost,
            cancel : doCancelPost,
            on : function(name, cb) {
                handlers[name] = handlers[name] || []
                handlers[name].push(cb)
            }
        }
        return publicAPI;
    }

    function log() {
        console.log.apply(console, arguments)
    }

})(this.CBManager = {});