// add "exercise-weight-plus-5" functionality.


var oneRepMaxButtons = [];	//global vars
var oneRepMaxForms = [];


function toggleElementDisplay(elem) {
	if(elem.style.display == "none"){
		elem.style.display="initial";
	}else{
		elem.style.display="none";
	}
}

window.addEventListener("load", function(){

	oneRepMaxForms = document.getElementsByClassName("one-rep-max-weight-form");
	oneRepMaxButtons = document.getElementsByClassName("one-rep-max-button");
	for(var i = 0; i < oneRepMaxForms.length; i++) {
		(function () {	// adding this fixed a big bug. solution from https://stackoverflow.com/a/19586183
			var counter = i;
			oneRepMaxForms[i].style.display="none";
			oneRepMaxButtons[i].addEventListener('click', function(){ toggleElementDisplay(oneRepMaxForms[counter]); });
		}());
	}
});