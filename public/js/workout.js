/*
	Known bugs: - dragging and dropping an exercise outside of acceptable area will make you unable to 
				click-select an exercise again without dragging it.
				Note: first clicking to select, then dragging out of bounds does not result in a bug.

	To-do: 		- add padding to bottom of table. will probably have to use js for that.
*/



var oneRepMaxButtons = [];	//global vars
var oneRepMaxForms = [];


function toggleElementDisplay(elem) {
	if(elem.style.display == "none"){
		elem.style.display="initial";
	}else{
		elem.style.display="none";
	}
}

function updateOneRepMaxButton() {

	// had to reset event listeners. removeEventListener wasnt working but this did.
	// solution from https://stackoverflow.com/a/9251864
	oneRepMaxForms = document.getElementsByClassName("one-rep-max-weight-form");
	oneRepMaxButtons = document.getElementsByClassName("one-rep-max-button");
	for(var i = 0; i < oneRepMaxForms.length; i++) {
		(function () {
			var counter = i;
			var old_element = oneRepMaxButtons[counter];
			var new_element = old_element.cloneNode(true);
			old_element.parentNode.replaceChild(new_element, old_element);
		}());
	}

	oneRepMaxButtons = document.getElementsByClassName("one-rep-max-button");
	for(var i = 0; i < oneRepMaxForms.length; i++) {
		(function () {
			var counter = i;
			oneRepMaxForms[i].style.display="none";
			oneRepMaxButtons[i].addEventListener('click', function(){ toggleElementDisplay(oneRepMaxForms[counter]); });
		}());
	}
	console.log("test2");
}

window.addEventListener("load", function(){
	oneRepMaxForms = document.getElementsByClassName("one-rep-max-weight-form");
	for(var i = 0; i < oneRepMaxForms.length; i++) {
		(function () {	// adding this (the "function") fixed a big bug. solution from https://stackoverflow.com/a/19586183
			oneRepMaxForms[i].style.display="none";
		}());
	}



	updateDraggableExercises();
});



function updateDraggableExercises(){
	/* learned how to add drag and droppable table rows from https://stackoverflow.com/a/21807833 */
	$("#table1 .childgrid tr, #table2 .childgrid tr, #table3 .childgrid tr").draggable({
	      helper: function(){
	          var selected = $('.childgrid tr.selectedRow');
	        if (selected.length === 0) {
	          selected = $(this).addClass('selectedRow');
	          updateDraggableExercises();
	        }
	        var container = $('<div/>').attr('id', 'draggingContainer');
	    container.append(selected.clone().removeClass("selectedRow"));
	    return container;

	      }
	 });

	$("#table1 .childgrid, #table2 .childgrid, #table3 .childgrid").droppable({
	    drop: function (event, ui) {

		$(this).append(ui.helper.children());
		$('.selectedRow').remove();
	    updateDraggableExercises();	// need to have this for you to be able to move elements multiple times
	    updateDraggableExercises(); // i don't know why but calling this twice also fixes a bug :O
	    //console.log(ui.helper.children());
	    }
	});

	$(document).on("click", ".childgrid tr", function () {
	    
	    //alert("clicked: " + event.target.nodeName);

	    if(event.target.nodeName == "BUTTON"
	    || event.target.nodeName == "INPUT"
	    || event.target.nodeName == "SELECT"
	    || event.target.nodeName == "IMG"){
	    	// do nothing
	    }else{
	    	$(this).toggleClass("selectedRow");
	    }
	    
	});

	updateOneRepMaxButton();
}


// add "exercise-weight-plus-5" functionality.