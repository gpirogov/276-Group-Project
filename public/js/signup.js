
function checkinput(value) {   // value = "pw"
console.log(value);
var input = document.getElementById(value);
  // var pwinput = document.getElementById("pw");
  // var genderinput = document.getElementById("gender");
  // var ageinput = document.getElementById("age");
  // var weightinput = document.getElementById("weight");
  // var heightinput = document.getElementById("height");

	if (input.value == "") {
		userinput.setCustomValidity("Please Enter a " + input.name);
    return false;
	} else {
  	userinput.setCustomValidity(""); // be sure to leave this empty!
	}

  // if (pwinput.value == "") {
  //   pwinput.setCustomValidity("Please Enter a password!");
  //   return false;
  // } else {
  //   pwinput.setCustomValidity(""); // be sure to leave this empty!
  // }
	//
  // if (ageinput.value == "") {
	// 	ageinput.setCustomValidity("Please Enter your age!");
  //   return false;
	// } else {
	// 	ageinput.setCustomValidity(""); // be sure to leave this empty!
	// }
	//
  // if (weightinput.value == "") {
	// 	weightinput.setCustomValidity("Please Enter your weight!");
  //   return false;
	// } else {
	// 	weightinput.setCustomValidity(""); // be sure to leave this empty!
	// }
	//
  // if (heightinput.value == "") {
	// 	heightinput.setCustomValidity("Please Enter your height!");
  //   return false;
	// } else {
	// 	heiinput.setCustomValidity(""); // be sure to leave this empty!
	// }

}
