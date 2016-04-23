/**
 * Created by Дмитрий on 23.04.2016.
 */
(function(exports){
    var TAG = "MENUPRESENTER";

    exports.presentMenu = function() {
        console.log(TAG, "presentMenu");
        window.config.site.views(["get_decks"], function (err, view) {
                if (err) {
                    console.log(TAG, err)
                }
                else if (view) {
                    view.rows.forEach(function (row) {
                        console.log("deck", row)
                    });
                }

            }
        );
    }
})(this.MenuPresenter = {});