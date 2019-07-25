/*
	Known bugs: - dragging and dropping an exercise outside of acceptable area will make you unable to
				click-select an exercise again without dragging it.
				Note: first clicking to select, then dragging out of bounds does not result in a bug.

	To-do: 		- add padding to bottom of table. will probably have to use js for that.
				- add "exercise-weight-plus-5" functionality.
				- add ability to add custom comments. (important)
				- comment box is slightly off center.
				- find way to add color to draggable exercises.
*/



var oneRepMaxButtons = [];	
var oneRepMaxForms = [];//global vars


function toggleElementDisplay(elem) {
	if(elem.style.display == "none"){
		elem.style.display="initial";
	}else{
		elem.style.display="none";
	}
}

// set "visibilityNone" to true if element is hidden on document load (like 1-rep-max form).
function updateButtons(buttonClassName, elementClassName = "", visibilityNone = false, classNameToToggle = "") {
	// had to reset event listeners. removeEventListener wasnt working but this did.
	// solution from https://stackoverflow.com/a/9251864
	var myElements = document.getElementsByClassName(elementClassName);
	var myButtons = document.getElementsByClassName(buttonClassName);
	for(var i = 0; i < myButtons.length; i++) {
		(function () {
			var counter = i;
			var old_element = myButtons[counter];
			var new_element = old_element.cloneNode(true);
			old_element.parentNode.replaceChild(new_element, old_element);
		}());
	}

	myButtons = document.getElementsByClassName(buttonClassName);
	for(var i = 0; i < myButtons.length; i++) {
		(function () {
			var counter = i;
			myButtons[i].addEventListener('click', function(){ 
				if(visibilityNone) toggleElementDisplay(myElements[counter]);
				myButtons[counter].classList.toggle("clicked-button");
				myElements[counter].classList.toggle(classNameToToggle);
			});

		}());
	}
}



window.addEventListener("load", function(){
	var oneRepMaxForms = document.getElementsByClassName("one-rep-max-weight-form");
	for(var i = 0; i < oneRepMaxForms.length; i++) {
		(function () {	// adding this (the "function") fixed a big bug. solution from https://stackoverflow.com/a/19586183
			//oneRepMaxForms[i].style.display="none";\
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

	
	updateButtons("one-rep-max-button", "one-rep-max-weight-form", true);
	updateButtons("exercise-comment-button", "exercise-comment-form", false, "show");
	updateButtons("one-rep-max-exercise-submit-button", "draggable_tr", false, "completedOneRepMaxRow");
	updateButtons("normal-exercise-submit-button", "draggable_tr", false, "completedNormalRow");
	updateButtons("round-complete-button");

}




//change div by button

function show_shoudler(){
    document.getElementById("main-day-div-shoudler").style.display = "inline-block";
    document.getElementById("main-day-div-back").style.display = "none";
    document.getElementById("main-day-div-leg").style.display = "none";
    document.getElementById("main-day-div-chest").style.display = "none";
  }

function show_back(){
    document.getElementById("main-day-div-shoudler").style.display = "none";
    document.getElementById("main-day-div-back").style.display = "inline-block";
    document.getElementById("main-day-div-leg").style.display = "none";
    document.getElementById("main-day-div-chest").style.display = "none";
  }

function show_leg(){
    document.getElementById("main-day-div-shoudler").style.display = "none";
    document.getElementById("main-day-div-back").style.display = "none";
    document.getElementById("main-day-div-leg").style.display = "inline-block";
    document.getElementById("main-day-div-chest").style.display = "none";
  }

function show_chest(){
    document.getElementById("main-day-div-shoudler").style.display = "none";
    document.getElementById("main-day-div-back").style.display = "none";
    document.getElementById("main-day-div-leg").style.display = "none";
    document.getElementById("main-day-div-chest").style.display = "inline-block";
  }

function show_biceps(){
    document.getElementById("secondary-day-div-biceps").style.display = "inline-block";
    document.getElementById("secondary-day-div-tricep").style.display = "none";
  }

function show_tricep(){
    document.getElementById("secondary-day-div-biceps").style.display = "none";
    document.getElementById("secondary-day-div-tricep").style.display = "inline-block";
  }
