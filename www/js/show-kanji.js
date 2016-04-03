(function(document){
	//alert(localStorage.getItem('kan1'));
    var localData = JSON.parse(localStorage.getItem('kan1'));
	alert(JSON.stringify(localData));
	alert(localData.kanji);
	var divkan = document.getElementById("divkan");
	divkan.innerHTML = divkan.innerHTML + " <h3> " + localData.kanji + " </h3>";
	
  
})(document);  