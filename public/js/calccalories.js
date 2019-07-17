//calculating calories


let goalCal = 2000 //will be set by questionaire
let excercise = 0
let food = 0
let net = food - excercise




function updateCalorieGoal(goal){
  document.getElementById('calorieGoal').innerHTML = "Daily Calories Goal: " + goalCal
}
function updateCalorieNet(){
  document.getElementById('calorieNet').innerHTML = ("Daily Net Calories: " + net)
}

updateCalorieGoal()
updateCalorieNet()
