$(document).ready(function() {


//sum calories for each meal
var table = document.getElementById("dynamicMealTable");
var totalTableCals = 0;

for(var i = 1; i < table.rows.length; i++)
{
  totalTableCals = totalTableCals + parseInt(table.rows[i].cells[1].innerHTML);
}
document.getElementById("totalTableCals").innerHTML =  totalTableCals + " Calories";


//hiding delete buttons
$('#dynamicMealTable tr').on('mouseenter', function(){
  $(this).find(':last-child').show()
})

$('#dynamicMealTable tr').on('mouseleave', function(){
  if($(this)[0].className != "dynamicMealTableHeaders"){
    $(this).find('button').hide()
  }

})

})
