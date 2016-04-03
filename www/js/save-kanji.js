(function(document){
    //костыль для сохранения в локалсторедж начальных данных.
    //alert("start saving");
    var toSave = JSON.stringify(kanji);
    localStorage.setItem(kanji.index, toSave);
    toSave = JSON.stringify(kanji2);
    //alert(toSave);
    localStorage.setItem(kanji2.index, toSave);
    toSave = JSON.stringify(kanji3);
    localStorage.setItem(kanji3.index, toSave);
    toSave = JSON.stringify(kanji4);
    //alert(toSave);
    localStorage.setItem(kanji4.index, toSave);

  
})(document);  