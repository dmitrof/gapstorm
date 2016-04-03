/**
 * Created by Дмитрий on 31.03.2016.
 */

(function(exports){

    exports.downloadFile = function(){
        var filePath = "file:///android_asset/www/downloaded";
        var fileTransfer = new FileTransfer();
        var uri = encodeURI("http://192.168.0.54/KanjiBase/void.html");

        fileTransfer.download(
            uri,
            filePath,
            function(entry) {
                console.log("download complete: " + entry.fullPath);
            },
            function(error) {
                console.log("download error source " + error.source);
                console.log("download error target " + error.target);
                console.log("upload error code" + error.code);
            },
            false,
            {
                headers: {
                    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                }
            }
        );
    };

    exports.fetchFromServer = function() {
        downloadJSON("hoshi2.json");
        downloadJSON("hoshi3.json");
    }

    exports.downloadJSON = function(jname) {
        //$.ajaxSetup({ cache: false });

        var url = "http://192.168.0.54:8080/KanjiBase/" + jname;
        console.log(url);
        $.getJSON(url, function(card)
        {
            console.log(card);
            window.config.site.db.post(card, function(err, ok) {
                if (err) {
                    console.log(err);
                }
                if (ok) {
                    console.log(ok);
                }
            })
            alert(JSON.stringify(data));
            //$.ajaxSetup({ cache: true });
        }).fail(function (j, t, error) {
            console.log(error);
        });
    }


})(this.DownloadManager = {});


