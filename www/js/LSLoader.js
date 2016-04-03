/**
 * Created by Дмитрий on 07.03.2016.
 */
(function(exports){
    //module for working with localstorage
    exports.initalLoad = function() {
        //here will be cycle for loading kanjis from db
        //alert("awdw");
        var dataarray = [JSON.parse(localStorage.getItem('kan1')),
            JSON.parse(localStorage.getItem('kan2')),
            JSON.parse(localStorage.getItem('kan3')),
            JSON.parse(localStorage.getItem('kan4'))];
        //alert(JSON.parse(localStorage.getItem('kan2')));
       // alert("from LSLOADER " + dataarray);
        return dataarray;
    }

    exports.queryLoad = function(query) {

    }



})(this.DBLoader = {});