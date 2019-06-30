// add "exercise-weight-plus-5" functionality.


var oneRepMaxButtons = [];	//global vars
var oneRepMaxForms = [];


window.addEventListener("load", function(){

	oneRepMaxForms = document.getElementsByClassName("one-rep-max-weight-form");
	oneRepMaxButtons = document.getElementsByClassName("one-rep-max-button");
	for(var i = 0; i < oneRepMaxForms.length; i++){
		var currentForm = oneRepMaxForms[i];
		currentForm.style.display="none";
		
		oneRepMaxButtons[i].addEventListener('click', function(){
			if(currentForm.style.display == "none"){
				currentForm.style.display="initial";
			}else{
				currentForm.style.display="none";
			}
		});
	}
});