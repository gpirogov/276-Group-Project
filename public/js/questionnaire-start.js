
var skipChecked = false;



window.addEventListener("load", function(){
	document.getElementById("advanced-radio").addEventListener("click", function(){
	  document.getElementById("skip-questionnaire-row").hidden = false;
	  if(!skipChecked){
	  	document.getElementById("experience-form").action = "/advancedChoice";
	  }
	});
	document.getElementById("intermediate-radio").addEventListener("click", function(){
	  document.getElementById("skip-questionnaire-row").hidden = true;
	  document.getElementById("skip-questionnaire-checkbox").checked = false;
	  document.getElementById("experience-form").action = "/intermediateChoice";
	});
	document.getElementById("beginner-radio").addEventListener("click", function(){
	  document.getElementById("skip-questionnaire-row").hidden = true;
	  document.getElementById("skip-questionnaire-checkbox").checked = false;
	  document.getElementById("experience-form").action = "/beginnerChoice";
	});
	document.getElementById("skip-questionnaire-checkbox").addEventListener("click", function(){
	  if(!skipChecked){
	  	document.getElementById("experience-form").action = "/advancedChoiceSkip";
	  	skipChecked = true;
	  }else{
	  	document.getElementById("experience-form").action = "/advancedChoice";
	  	skipChecked = false;
	  }
	});
});
