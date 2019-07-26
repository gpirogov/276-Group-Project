$(document).ready(function() {
  
//sum calories for each meal
var table = document.getElementById("dynamicMealTable");
var totalTableCals = 0;

for(var i = 1; i < table.rows.length; i++)
{
  totalTableCals = totalTableCals + parseInt(table.rows[i].cells[1].innerHTML);
}
document.getElementById("totalTableCals").innerHTML = "Calories: " + totalTableCals;

})
