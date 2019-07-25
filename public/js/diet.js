$(document).ready(function() {

  //api id and key
  var appId= "83211bdc";
  var appKey = "af5b66e27d11815d0bb1d0f58651e563";


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

        //adjusting values if needed to fit database
        while(foodName.length>30){
          foodName = foodName.substring(0, foodName.length - 1);
        }

        if(cals == undefined){cals = 0};
        if(fat == undefined){fat = 0};
        if(carbs == undefined){carbs = 0};
        if(protien == undefined){protien = 0};

        cals = cals.toFixed(2);
        carbs = carbs.toFixed(2);
        fat = fat.toFixed(2);
        protien = protien.toFixed(2);

        //display data
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
