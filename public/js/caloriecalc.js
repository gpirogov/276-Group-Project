$(document).ready(function() {

  //calculating calories
  

  let goalCal = 2000 //will be set by questionaire
  let food= 0 //set by calculating foods
  let excercise = 0
  let net = food - excercise

  //api id and key
  var appId= "83211bdc";
  var appKey = "af5b66e27d11815d0bb1d0f58651e563";

  function updateCalorieGoal(goal){
    $('#calorieGoal').text("Daily Calories Goal: " + goalCal.toString())
  }
  function updateCalorieNet(){
    $('#calorieNet').text("Daily Net Calories: " + net)
  }

  updateCalorieGoal()
  updateCalorieNet()

  // set Date
  today = new Date();
  let day = today.getDate()
  let monthNum = today.getMonth()//Jan = 0, Dec = 11
  let year = today.getFullYear()

  //changing monthNum to monthNames
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month = monthNames[monthNum]

  $('#date').html(month + " " + day.toString() + " " + year.toString())
  // document.getElementById("date").innerHTML = DATE

  //toggle add meal page
  $('#addMealButton').on("click",function(){
    $('#dietMain').hide()
    $('#addMeal').show()
  })
  //return to main diet page
  $('#backButton').on("click",function(){
    $('#dietMain').show()
    $('#addMeal').hide()
  })

//api search for food
  $('#apiSearchButton').on("click",function(){
    let selectedMeal = $('#mealSelector :selected').val()
    let food = $('#searchBar').val()
    console.log(food)
    $.ajax({
      type:"GET",
      url:"https://api.edamam.com/api/food-database/parser",
      data:{
        ingr: food,
        app_id: appId,
        app_key: appKey
      },
      success: function(res){
        console.log(res);
        var foodName = res.hints[0].food.label
        var cals = res.hints[0].food.nutrients.ENERC_KCAL
        var carbs = res.hints[0].food.nutrients.CHOCDF
        var fat = res.hints[0].food.nutrients.FAT
        var protien = res.hints[0].food.nutrients.PROCNT
        console.log({foodName, cals, carbs, fat, protien});

        //add to tableAddMeal
        // let tableAddMeal = document.getElementById('tableAddMeal')
        // let row = tableAddMeal.insertRow(1)
        // let cell0 = row.insertCell(0)
        // let cell1 = row.insertCell(1)
        // let cell2 = row.insertCell(2)
        // let cell3 = row.insertCell(3)
        // let cell4 = row.insertCell(4)
        // cell0.innerHTML = foodName
        // cell1.innerHTML = cals
        // cell2.innerHTML = fat
        // cell3.innerHTML = carbs
        // cell4.innerHTML = protien
        document.getElementById('mealFoodCell').value = foodName
        document.getElementById('mealCaloriesCell').value = cals
        document.getElementById('mealFatCell').value = fat
        document.getElementById('mealCarbsCell').value = carbs
        document.getElementById('mealProtienCell').value = protien
        }
      })
    })


  // $('#apiTestButton').on("click",function(){
  //   $.ajax({
  //     type:"GET",
  //     url:"https://api.edamam.com/api/food-database/parser",
  //     data:{
  //       ingr: "ham sandwich",
  //       app_id: appId,
  //       app_key: appKey
  //     },
  //     success: function(res){
  //       console.log(res);
  //     }
  //
  //   })
  // })

})
