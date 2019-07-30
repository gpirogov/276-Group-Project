$(document).ready(function() {

function updateTotalTableCals(){
  //sum calories for each meal
  var table = document.getElementById("dynamicMealTable");
  var totalTableCals = 0;

  for(var i = 1; i < table.rows.length; i++)
  {
    totalTableCals = totalTableCals + parseInt(table.rows[i].cells[1].innerHTML);
  }
  document.getElementById("totalTableCals").innerHTML =  totalTableCals + " Calories";
}

//initial total cals
updateTotalTableCals()


//hiding delete buttons
$('#dynamicMealTable tr').on('mouseenter', function(){
  $(this).find(':last-child').show()
})

$('#dynamicMealTable tr').on('mouseleave', function(){
  if($(this)[0].className != "dynamicMealTableHeaders"){
    $(this).find('button').hide()
  }

})

//delete db rows
$('.deleteCell').on("click",function(e){
  // console.log($(e.target).parents('td').parents('tr'));

  //confirm delete
  var deleteFlag = confirm("Remove food from meal?")

  if (deleteFlag){
    //row to delete in html table
    var targetRowDelete = $(e.target).parents('td').parents('tr')[0].rowIndex

    //get keys
    var keyUser = $(e.target).parents('td').parents('tr')[0].className;
    var keyMeal = $(e.target).parents('td').parents('tr').children('td')[0].className;
    var keyDate = $(e.target).parents('td').parents('tr').children('td')[1].className;
    var keyFood = $(e.target).parents('td').parents('tr').children('td')[0].innerHTML;
    //adjust keyFood due to spaces
    keyFood = keyFood.trim()
    // console.log("keys to delete")
    // console.log({keyUser, keyMeal, keyDate, keyFood});

    var urlParts = window.location.href.split('/');
    var urlFull = (urlParts[0] + "//" + urlParts[2])

    $.ajax({
      method:"POST",
      url:urlFull + "/delete",
      data:{ keyUser: keyUser, keyMeal: keyMeal, keyDate: keyDate, keyFood: keyFood }
    })

    //delete html table row
    document.getElementById("dynamicMealTable").deleteRow(targetRowDelete)
    //update table cals
    updateTotalTableCals()
  }

})

})
