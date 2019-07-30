const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL//,
  // ssl : true
});

var globalName;
var searchName;
var globalRoutine = " ";
var food_total_cal;
var cal_goal;


today = new Date();
let day = today.getDate()
let month = today.getMonth()//Jan = 0, Dec = 11
let year = today.getFullYear()

// adjusting dates
month = month + 1;
if(month.toString().length<2){
  month = "0" + month
}
var date = (month + "/" + day + "/" + year)

var questionnaireAnswers = "";

express()
.use(express.static(path.join(__dirname, 'public')))
.use(express.json())
.use(express.urlencoded({extended:false}))

.post('/burning-plus.html', function(req,res){
  var loginname = req.body.username;
  var password = req.body.pw;
  globalName = loginname;

  if ( globalName != "admin")
  {
  pool.query("SELECT * from user_info WHERE username = '" + loginname + "'", (err,ans) =>{
    if ( ans.rowCount == 0)
    {
      res.render('pages/errorPage', {
        msg: "No account exists"
      })
    } else if ( ans.rowCount == 1 )
    {

      if ( password == ans.rows[0].password)
      {
        globalRoutine = ans.rows[0].routine;
        globalName = ans.rows[0].username;

        var username = ans.rows[0].username;
        var gender = ans.rows[0].gender;
        var age = ans.rows[0].age;
        var weight = ans.rows[0].weight;
        var height = ans.rows[0].height;
        var routine = ans.rows[0].routine;
        res.render('pages/profile', {
              username:username,
              age:age,
              gender:gender,
              weight:weight,
              height:height,
              routine:routine,
        })
      } else
      {
        res.render('pages/errorPage', {
          msg: "An error occured!"
        })
      }
    }
  })} else if ( globalName == "admin" )
  {
    if ( password == "admin" )
    {
      pool.query("SELECT * from user_info", (err ,correct) =>{
        res.render('pages/adminPage', {
          db:correct.rows
        })
      })
    }
  }
})

.post('/signup.html', function(req,res) {
  var username = req.body.username;
  globalName = req.body.username;
  var password = req.body.pw;
  var gender = req.body.gender;
  var age = req.body.age;
  var weight = req.body.weight;
  var height = req.body.height;


  const accountInfo = "INSERT INTO account(username,password) values ($1,$2)"
  const accountVal = [username,password]
  // pool.query(accountInfo, accountVal)

  const userInfo = "INSERT INTO user_info(username,password,gender,age,weight,height,routine) values ($1,$2,$3,$4,$5,$6,$7)"
  const userVal = [username,password,gender,age,weight,height," "]
  // pool.query(userInfo,userVal)

  pool.query("SELECT * from account WHERE username = '" + username + "'", (err,ans)=>{
    if ( ans.rowCount == 0)
    {
      pool.query(accountInfo, accountVal);
      pool.query(userInfo,userVal);
      //res.render('pages/welcomePage')
      res.redirect('questionnaire-start.html');

    } else if (ans.rowCount == 1 )
    {
      res.render('pages/SignUpError',{
        msg:'Existing Account'
      })
    }
  })
})


.post('/beginnerChoice', function(req,res){
  questionnaireAnswers = req.body.levelOfExperience;
  res.redirect('questionnaire-main.html');
})

.post('/intermediateChoice', function(req,res){
  questionnaireAnswers = req.body.levelOfExperience;
  res.redirect('questionnaire-main.html');
})

.post('/advancedChoice', function(req,res){
  res.redirect('questionnaire-main.html');
  questionnaireAnswers = req.body.levelOfExperience;
})

.post('/advancedChoiceSkip', function(req,res){
  res.render('pages/questionnaire-end-skip');
})

.post('/finishQuestionnaire', function(req,res){
  pool.query("UPDATE user_info SET routine = '" + req.body.routineRecommendation + "' WHERE username = '" + globalName + "'");
  globalRoutine = req.body.routineRecommendation;

  pool.query("SELECT * FROM user_info WHERE username = '" + globalName + "'", (err,ans)=>{
      console.log(ans.rows[0]);
      var username = ans.rows[0].username;
      var gender = ans.rows[0].gender;
      var age = ans.rows[0].age;
      var weight = ans.rows[0].weight;
      var height = ans.rows[0].height;
      //var routine = ans.rows[0].routine;
      var routine = req.body.routineRecommendation;
    res.render('pages/profile', {
          username:username,
          age:age,
          gender:gender,
          weight:weight,
          height:height,
          routine:routine,
    })
  })
})

/*.post('/experienceQuestion', function(req,res){

  pool.query("SELECT * FROM user_info WHERE username = '" + globalName + "'", (err,ans)=>{
      var username = ans.rows[0].username;
      var gender = ans.rows[0].gender;
      var age = ans.rows[0].age;
      var weight = ans.rows[0].weight;
      var height = ans.rows[0].height;

    res.render('pages/profile', {
          username:username,
          age:age,
          gender:gender,
          weight:weight,
          height:height,
    })
  })
})*/

.post('/1', function(req,res){
  var exercise = req.body.exercise;
  var routine = req.body.routine;
  var weight = req.body.weight;
  var unit = req.body.wType;
  var rep = req.body.setsAndReps;
  var workoutURL = "workout-" + routine + ".html";
  console.log(workoutURL);

  const userInfo = "INSERT INTO workout_table(username,routine,exercise,weight,unit,rep) values ($1,$2,$3,$4,$5,$6)"
  const userVal = [globalName,routine,exercise,weight,unit,rep]

  pool.query(userInfo,userVal);
  res.redirect(workoutURL);
})

.post('/2', function(req,res){
  var exercise = req.body.exercise;
  var routine = req.body.routine;
  var weight = req.body.weight;
  var unit = req.body.wType;
  var rep = req.body.setsAndReps;
  var workoutURL = "workout-" + routine + ".html";
  console.log(workoutURL);

  const userInfo = "INSERT INTO workout_table_max(username,routine,exercise,weight,unit,rep) values ($1,$2,$3,$4,$5,$6)"
  const userVal = [globalName,routine,exercise,weight,unit,1]

  pool.query(userInfo,userVal);
  res.redirect(workoutURL);
})


.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.get('/', (req, res) => res.render('pages/index'))
.get('/profile',(req,res)=>{
  if(globalRoutine == " "){
    res.render('pages/not-logged-in');
  }else{
	  pool.query("SELECT * FROM user_info WHERE username = '" + globalName + "'", (err,ans)=>{
	      var username = ans.rows[0].username;
	      var gender = ans.rows[0].gender;
	      var age = ans.rows[0].age;
	      var weight = ans.rows[0].weight;
	      var height = ans.rows[0].height;
	      var routine = ans.rows[0].routine;
	    res.render('pages/profile', {
	          username:username,
	          age:age,
	          gender:gender,
	          weight:weight,
	          height:height,
	          routine:routine
	    })
	  })
	}
})
.get('/logout',(req,res)=> res.render('pages/logout'))
.get('/questionnaire-restart',(req,res)=> res.redirect('questionnaire-start.html'))


/* =============================
 *  Forums:
 * ============================= */

 .get('/forums', (req,res) => {
   res.sendFile(path.join(__dirname + '/public/forum.html'));
 })

 .get('/forums/:topic', (req,res) => {

   if(globalRoutine == " ") {
     res.render('pages/not-logged-in');
   } else{
     // topic in req.params.topic
     var topic = req.params.topic;
     // var text = 'SELECT * FROM forums WHERE topic = $1';
     var text = 'SELECT * from (SELECT DISTINCT ON (title) * FROM forums WHERE topic = $1 ORDER BY title) originalpostsnotcommentspls order by time DESC';

     var values = [ req.params.topic ];

     // pool.query('SELECT * FROM forums', (err, result) => {
     // pool.query("SELECT * FROM forums WHERE topic = '" + topic + + "'", (err, result) => {
     pool.query(text, values, (err, result) => {
       // console.log(result.rows);
       res.render('pages/forumTopic', { results: result ? result.rows : null, topic: topic, username: globalName });
     });
   }
 })

 .get('/forums/:topic/:id', (req,res) => {
   // topic in req.params.topic

   if (globalRoutine == " ") {
     res.render('pages/not-logged-in');
   } else {
     var id = req.params.id;
     var topic = req.params.topic;
     var text = 'SELECT * FROM forums WHERE id = $1 ORDER BY time';
     var values = [ id ];
     console.log(id);


     // const result = pool.query(text, values);
     // const results = { results: result ? result.rows : null, topic: topic };
     // res.render('pages/forumPost', results);

     pool.query(text, values, (err, result) => {
       res.render('pages/forumPost', { results: result ? result.rows : null, topic: topic, id: id, username: globalName });
     });
     // console.log(req.params.id);
     // res.render('pages/forumPost');
   }
 })
 .post('/forumAddPost', (req, res) => {
   var text = 'INSERT INTO forums (title, content, topic, username, likes, time) VALUES ($1, $2, $3, $4, $5, to_timestamp($6 / 1000.0))';
   var values = [ req.body.title, req.body.content, req.body.topic, req.body.username, 0, Date.now() ];
   console.log(Date.now());
   pool.query(text, values, (err, result) => {
     res.redirect('/forums');
   });
 })

 .post('/forumAddPostReply', (req, res) => {
   var text = 'INSERT INTO forums (id, title, content, topic, username, likes, time) VALUES ($1, $2, $3, $4, $5, $6, to_timestamp($7 / 1000.0))';
   console.log("id of reply: " + req.body.id);
   var values = [ parseInt(req.body.id), req.body.title, req.body.content, req.body.topic, req.body.username, 0, Date.now() ];

   pool.query(text, values, (err, result) => {
     res.redirect('/forums');
   });
 })

 .post('/forumSearch', (req, res) => {
   var text = 'SELECT * FROM forums WHERE (LOWER(title) LIKE LOWER($1)) OR (LOWER(content) LIKE LOWER($2)) ORDER BY time DESC';
   // var text = 'SELECT DISTINCT ON (title) * FROM forums WHERE (LOWER(title) LIKE LOWER($1)) OR (LOWER(content) LIKE LOWER($2))';

   console.log("searching ... : " + req.body.search);
   var values = [ '%'+req.body.search+'%', '%'+req.body.search+'%' ];

   pool.query(text, values, (err, result) => {
        res.render('pages/forumSearch', { results: result ? result.rows : null, topic: 'All', username: globalName, search: req.body.search});
   });
 })

 .post('/forumLikePost', (req, res) => {
   var text = 'UPDATE forums SET likes = likes + 1 where uniqueid = $1';
   var values = [ parseInt(req.body.likeBtn) ];
   console.log("liked post's unique id " + req.body.likeBtn);

   pool.query(text, values, (err, result) => {
        // res.render('pages/forumSearch', { results: result ? result.rows : null, topic: 'All', username: globalName, search: req.body.search});
        res.redirect('/forums/' + req.body.topic + '/' + req.body.id);
   });
 })




  /* ====================
   *  Diet Functionalities
   * ====================*/

// CREATE TABLE meals_table (
//   foodName VARCHAR(30) NOT NULL,
//   cals real,
//   fat real,
//   carbs real,
//   protien real,
//   meal VARCHAR(10) NOT NULL,
//   date VARCHAR(30),
//   username VARCHAR(30)
// );
//
// .get('/diet', (req, res)=>{
//   res.redirect('diet.html')
//   pool.query("SELECT SUM(cals) as totalCals FROM meals_table WHERE date ='" + date + "' AND username = '" +  globalName + "'", (err,result) => {
//     if(err){ throw err;}
//     localStorage.setItem("foodCal", result.rows[0].totalCals)
//     console.log("YEET")
//   })
// })

//display today's total calories
.get('/diet', function (req,res){
  let dietQuery = ("SELECT SUM(cals) as totalCals FROM meals_table WHERE date ='" + date + "' AND username = '" +  globalName + "'")
  pool.query(dietQuery, (err,result) => {
    // console.log(result)
    if(err){ throw err;}
    food_total_cal = result.rows[0].totalcals;
    if(food_total_cal == null){food_total_cal = 0}
    res.render('pages/diet', {food_total_cal: food_total_cal, date:date})
  })
})

.post('/dietPast', (req, res) =>{
  let mealDate = req.body.dateMealSearch;
  pool.query("SELECT SUM(cals) as totalCals FROM meals_table WHERE date ='" + mealDate + "' AND username = '" +  globalName + "'" , (err,result) => {
    // console.log(result)
    if(err){ throw err;}
    food_total_cal = result.rows[0].totalcals;
    if(food_total_cal == null){food_total_cal = 0}
    res.render('pages/diet', {food_total_cal: food_total_cal, date:mealDate})
  })
})

.post('/add', function (req, res){
  var foodName = req.body.mealFood;
  var cals = req.body.mealCalories;
  var fat = req.body.mealFat;
  var carbs = req.body.mealCarbs;
  var protien = req.body.mealProtien;
  var meal = req.body.meal;
  var mealDate = req.body.mealDate

  if(cals == ""){cals = 0};
  if(fat == ""){fat = 0};
  if(carbs == ""){carbs = 0};
  if(protien == ""){protien = 0};


  const mealInfo = "INSERT INTO meals_table(foodName, cals, fat, carbs, protien, meal, date, username) values ($1,$2,$3,$4,$5,$6,$7,$8)"
  const mealVal = [foodName, cals, fat, carbs, protien, meal, mealDate, globalName]

  pool.query(mealInfo, mealVal, (err, result)=>{
    if(!err){
      console.log("added to db: " + foodName + " " +cals + " " +fat +" " + carbs + " " +protien + " " +meal + " " + mealDate + " " +globalName);
      res.render('pages/addMealPost', {date:date, msg: "Sucessfully added meal!"});
    }
    if(err){
      res.render('pages/addMealPost', {date:date, msg: 'Error: Please ensure meal is selected and all fields are filled.'});
    }
  });
})

.post('/delete', function (req, res){
  var keyUser = req.body.keyUser;
  var keyMeal = req.body.keyMeal;
  var keyDate = req.body.keyDate;
  var keyFood = req.body.keyFood;

  console.log("keys to delete")
  console.log({keyUser, keyMeal, keyDate, keyFood});

  pool.query("DELETE FROM meals_table WHERE ctid IN (SELECT ctid FROM meals_table WHERE username ='"
  + keyUser + "' AND meal = '" + keyMeal + "' AND date = '"+ keyDate + "' AND foodname = '" + keyFood + "' LIMIT 1)", (err, result) =>{
    if(err){throw err;}
    if(!err){
      console.log("deleted row with keys")
      console.log({keyUser, keyMeal, keyDate, keyFood});
    }
  })
})

.get('/addMeal', (req, res) =>{
  res.render('pages/addMeal', {date:date})
})

//display breakfast table for today
.get('/breakfast', (req, res) =>{
  pool.query("SELECT * FROM meals_table WHERE meal = 'breakfast' AND date ='"
  + date + "' AND username = '" +  globalName + "'" , (err,result) => {
    if(err){ throw err;}
    // console.log(result)
    res.render('pages/tableBreakfast' ,{data: result, date: date});
  })
})

//display breakfast past table
.post('/breakfastDateMealSearch', (req, res) =>{
  let mealDate = req.body.dateMealSearch;
  pool.query("SELECT * FROM meals_table WHERE meal = 'breakfast' AND date ='"
  + mealDate + "' AND username = '" +  globalName + "'" , (err,result) => {
    // console.log(result)
    if(err){ throw err;}
    res.render('pages/tableBreakfast' ,{ data: result, date: mealDate});
  })
})

//display lunch table for today
.get('/lunch', (req, res) =>{
  pool.query("SELECT * FROM meals_table WHERE meal = 'lunch' AND date ='"
   + date + "' AND username = '" +  globalName + "'" , (err,result) => {
    if(err){ throw err;}
    res.render('pages/tableLunch' ,{ data: result, date: date});
  })
})

//display past lunch table
.post('/lunchDateMealSearch', (req, res) =>{
  let mealDate = req.body.dateMealSearch;
  pool.query("SELECT * FROM meals_table WHERE meal = 'lunch' AND date ='"
  + mealDate + "' AND username = '" +  globalName + "'" , (err,result) => {
    if(err){ throw err;}
    res.render('pages/tableLunch' ,{ data: result, date: mealDate});
  })
})

//display dinner table today
.get('/dinner', (req, res) =>{
  pool.query("SELECT * FROM meals_table WHERE meal = 'dinner' AND date ='"
   + date + "' AND username = '" +  globalName + "'" , (err,result) => {
    if(err){ throw err;}
    res.render('pages/tableDinner' ,{ data: result, date: date});
  })
})

//display past dinner table
.post('/dinnerDateMealSearch', (req, res) =>{
  let mealDate = req.body.dateMealSearch;
  pool.query("SELECT * FROM meals_table WHERE meal = 'dinner' AND date ='"
  + mealDate + "' AND username = '" +  globalName + "'" , (err,result) => {
    if(err){ throw err;}
    res.render('pages/tableDinner' ,{ data: result, date: mealDate});
  })
})

//display snack table today
.get('/snacks', (req, res) =>{
  pool.query("SELECT * FROM meals_table WHERE meal = 'snack' AND date ='"
   + date + "' AND username = '" +  globalName + "'" , (err,result) => {
    if(err){ throw err;}
    res.render('pages/tableSnacks' ,{ data: result, date: date});
  })
})

//display past snack table
.post('/snacksDateMealSearch', (req, res) =>{
  let mealDate = req.body.dateMealSearch;
  pool.query("SELECT * FROM meals_table WHERE meal = 'snack' AND date ='"
  + mealDate + "' AND username = '" +  globalName + "'" , (err,result) => {
    if(err){ throw err;}
    res.render('pages/tableSnacks' ,{ data: result, date: mealDate});
  })
})


/* =============================
 *  Questionnaire-Related Code:
 * ============================= */

.post('/questionnaire-main.html', function (req, res){
  res.redirect('questionnaire-main.html');
})

.post('/questionnaire-end.html', function (req, res){
// found JSON parsing solution from https://stackoverflow.com/questions/28764822/req-body-cant-be-read-as-an-array
// and https://github.com/expressjs/express/issues/3264#issuecomment-290480516
req.body = JSON.parse(JSON.stringify(req.body));

  for (var key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      item = req.body[key];
      //console.log(item);
      questionnaireAnswers += item;
    }
  }

  var strengthRecommendationScore = 0;
  var physiqueRecommendationScore = 0;
  var conditioningRecommendationScore = 0;

  for (var i = 0; i < questionnaireAnswers.length; i+=3){
  	strengthRecommendationScore += parseInt(questionnaireAnswers[i]);
  	physiqueRecommendationScore += parseInt(questionnaireAnswers[i+1]);
  	conditioningRecommendationScore += parseInt(questionnaireAnswers[i+2]);
  }

  var highestScore = Math.max(strengthRecommendationScore, physiqueRecommendationScore, conditioningRecommendationScore);
  strengthRecommendationScore = ((strengthRecommendationScore/highestScore)*100).toFixed(1);;
  physiqueRecommendationScore = ((physiqueRecommendationScore/highestScore)*100).toFixed(1);;
  conditioningRecommendationScore = ((conditioningRecommendationScore/highestScore)*100).toFixed(1);;

  if(strengthRecommendationScore == 100.0){
    res.render('pages/questionnaire-end-strength', {
        strengthRecommendationScore:strengthRecommendationScore,
        physiqueRecommendationScore:physiqueRecommendationScore,
        conditioningRecommendationScore:conditioningRecommendationScore
    })
  }else if(conditioningRecommendationScore == 100.0){
    res.render('pages/questionnaire-end-conditioning', {
        strengthRecommendationScore:strengthRecommendationScore,
        physiqueRecommendationScore:physiqueRecommendationScore,
        conditioningRecommendationScore:conditioningRecommendationScore
    })
  }else{
    res.render('pages/questionnaire-end-physique', {
        strengthRecommendationScore:strengthRecommendationScore,
        physiqueRecommendationScore:physiqueRecommendationScore,
        conditioningRecommendationScore:conditioningRecommendationScore
    })
  }
  //res.redirect('questionnaire-end.html');
})

.post('/workout-physique.html', function (req, res){
  res.redirect('workout-physique.html');
})


/* =============================
 * =============================
 * ============================= */


/* =============================
 *     Nav-bar Related Code:
 * ============================= */

.post('/go-to-workout-page', function (req, res){
  if(globalRoutine == " "){
    res.render('pages/not-logged-in');
  }else{
    res.redirect('workout-' + globalRoutine + '.html');
  }
})

/* =============================
 * =============================
 * ============================= */


 /* =============================
          homepage Related
  * ============================= */

.get('/homepage',(req,res)=> res.render('pages/homepage'))

.post('/gen_graph',(req,res)=>{
    var routine = req.body.routine_option;
    var exercise = req.body.exercise_option;
    var record = req.body.record_option;
    if(record == 'normal'){
      const info = "SELECT weight,rep FROM workout_table where username = $1 and routine = $2 and exercise = $3";
      const value = [globalName,routine,exercise];
      pool.query(info,value,(err,ans)=>{
        // console.log(ans.rows);
        res.render('pages/homepagegraph', {
            test:ans.rows,
            routine:routine,
            exercise:exercise
        })
      })
    }else{
      const info = "SELECT weight,rep FROM workout_table_max where username = $1 and routine = $2 and exercise = $3";
      const value = [globalName,routine,exercise];
      pool.query(info,value,(err,ans)=>{
        // console.log(ans.rows);
        res.render('pages/homepagegraph', {
            test:ans.rows,
            routine:routine,
            exercise:exercise
        })
      })
   }
})

/* =============================
 * =============================
 * ============================= */



/* =============================
            admin Related
 * ============================= */

.get('/adminPage',(req,res)=>{
  pool.query("SELECT * from user_info", (err,ans)=>{
    res.render('pages/adminPage', {
      db : ans.rows,
    })
  })
})

.post('/admin',(req,res)=>{
  pool.query("SELECT * from user_info", (err,ans)=>{
    res.render('pages/adminPage', {
      db : ans.rows,
    })
  })
})

.post('/seeUser', (req,res)=>
{
  searchName = req.body.searchingName;
  pool.query("SELECT * FROM user_info WHERE username = '" + searchName + "'", (err,ans)=>{
    // console.log(ans.rows[0]);
    var username = ans.rows[0].username;
    var gender = ans.rows[0].gender;
    var age = ans.rows[0].age;
    var weight = ans.rows[0].weight;
    var height = ans.rows[0].height;
    var routine = ans.rows[0].routine;

    res.render('pages/admin_profile', {
      username : username,
      age : age,
      gender : gender,
      weight : weight,
      height : height,
      routine : routine,
    })
  })
})

.post('/admin-profile', (req,res)=>
{
  pool.query("SELECT * FROM user_info WHERE username = '" + searchName + "'", (err,ans)=>{
    // console.log(ans.rows[0]);
    var username = ans.rows[0].username;
    var gender = ans.rows[0].gender;
    var age = ans.rows[0].age;
    var weight = ans.rows[0].weight;
    var height = ans.rows[0].height;
    var routine = ans.rows[0].routine;

    res.render('pages/admin_profile', {
      username : username,
      age : age,
      gender : gender,
      weight : weight,
      height : height,
      routine : routine,
    })
  })
})

.post('/admin-workout',(req,res)=>{
  pool.query("select distinct exercise, routine from  workout_table where username = '" + searchName + "'", (err,ans)=>{
    console.log(ans.rows);
    res.render('pages/admin_workout', {
      db : ans.rows,
      name:searchName
    })
  })
})

.post('/admin-graph',(req,res)=>{
  var routine = req.body.routine;
  var exercise = req.body.exercise;
  const info = "SELECT weight FROM workout_table where username = $1 and routine = $2 and exercise = $3";
  const value = [searchName,routine,exercise];
  pool.query(info,value,(err,ans)=>{
    res.render('pages/admin_workoutgraph', {
        name:searchName,
        routine:routine,
        exercise:exercise,
        test:ans.rows
    })
  })
})

.post('/admin-diet',(req,res)=>{
  pool.query("SELECT distinct date FROM meals_table WHERE username = '" + searchName + "'", (err_date,ans_date)=>{
      res.render('pages/admin_diet', {
          db_date : ans_date.rows,
          name:searchName
      })
  })
})


.post('/diet-date',(req,res)=>{
    var reqDate = req.body.date;
    pool.query("SELECT * FROM meals_table WHERE username = '" + searchName + "' and date = '" + reqDate + "'", (err,ans) =>{
      res.render('pages/admin_diet_date', {
          db : ans.rows,
          name:searchName,
          date : reqDate
      })
  })
})


/* =============================
 * =============================
 * ============================= */




.listen(PORT, () => console.log(`Listening on ${ PORT }`))
