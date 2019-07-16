const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl : true
});

var globalName

express()
.use(express.static(path.join(__dirname, 'public')))
.use(express.json())
.use(express.urlencoded({extended:false}))
.post('/burning-plus.html', function(req,res){
  var loginname = req.body.username;
  var password = req.body.pw;
  globalName = loginname;
  pool.query("SELECT * from user_info WHERE username = '" + loginname + "'", (err,ans) =>{
    if ( ans.rowCount == 0)
    {
      res.render('pages/errorPage', {
        msg: "No exsit account"
      })
    } else if ( ans.rowCount == 1 )
    {
      if ( password == ans.rows[0].password)
      {
        var username = ans.rows[0].username;
        var gender = ans.rows[0].gender;
        var age = ans.rows[0].age;
        var weight = ans.rows[0].weight;
        var height = ans.rows[0].height;
        var status = ans.rows[0].status;
        res.render('pages/profile', {
              username:username,
              age:age,
              gender:gender,
              weight:weight,
              height:height,
              status:status,
        })
      } else
      {
        res.render('pages/errorPage', {
          msg: "OH SHIT !"
        })
      }
    }
  })
})

.post('/signup.html', function(req,res) {
  var username = req.body.username;
  globalName = req.body.username;
  var password = req.body.pw;
  var gender = req.body.Gender;
  var age = req.body.age;
  var weight = req.body.weight;
  var height = req.body.height;


  const accountInfo = "INSERT INTO account(username,password) values ($1,$2)"
  const accountVal = [username,password]
  //pool.query(accountInfo, accountVal)

  const userInfo = "INSERT INTO user_info(username,password,gender,age,weight,height) values ($1,$2,$3,$4,$5,$6)"
  const userVal = [username,password,gender,age,weight,height]
  //pool.query(userInfo,userVal)

  pool.query("SELECT * from account WHERE username = '" + username + "'", (err,ans)=>{
    if ( ans.rowCount == 0)
    {
      pool.query(accountInfo, accountVal);
      pool.query(userInfo,userVal);
      res.render('pages/welcomePage')

    } else if (ans.rowCount == 1 )
    {
      res.render('pages/SignUpError',{
        msg:'Exsiting Account'
      })
    }
  })
})


.post('/beginnerChoice', function(req,res){
  res.render('pages/questionarie')
  pool.query("UPDATE user_info SET status = 'beginner' WHERE username = '" + globalName + "'");

})

.post('/beginnerQuestion', function(req,res){

  pool.query("SELECT * FROM user_info WHERE username = '" + globalName + "'", (err,ans)=>{
      var username = ans.rows[0].username;
      var gender = ans.rows[0].gender;
      var age = ans.rows[0].age;
      var weight = ans.rows[0].weight;
      var height = ans.rows[0].height;
      var status = ans.rows[0].status;
    res.render('pages/profile', {
          username:username,
          age:age,
          gender:gender,
          weight:weight,
          height:height,
          status:status,
    })
  })
})

.post('/experienceChoice', function(req,res){
  res.render('pages/proquestion')
  pool.query("UPDATE user_info SET status = 'experience' WHERE username = '" + globalName + "'" );
})

.post('/experienceQuestion', function(req,res){

  pool.query("SELECT * FROM user_info WHERE username = '" + globalName + "'", (err,ans)=>{
      var username = ans.rows[0].username;
      var gender = ans.rows[0].gender;
      var age = ans.rows[0].age;
      var weight = ans.rows[0].weight;
      var height = ans.rows[0].height;
      var status = ans.rows[0].status;

    res.render('pages/profile', {
          username:username,
          age:age,
          gender:gender,
          weight:weight,
          height:height,
          status:status,
    })
  })
})

.post('/1', function(req,res){
  var exercise = req.body.exercise;
  var routine = req.body.routine
  var weight = req.body.weight;
  var unit = req.body.wType;
  var rep = req.body.setsAndReps;

  const userInfo = "INSERT INTO workout_table(username,routine,exercise,weight,unit,rep) values ($1,$2,$3,$4,$5,$6)"
  const userVal = [globalName,routine,exercise,weight,unit,rep]

  pool.query(userInfo,userVal);
  //res.redirect("workout-physique.html")
})

.post('/2', function(req,res){
  var exercise = req.body.exercise;
  var routine = req.body.routine
  var weight = req.body.weight;
  var unit = req.body.wType;
  var rep = req.body.setsAndReps;

  const userInfo = "INSERT INTO workout_table_max(username,routine,exercise,weight,unit,rep) values ($1,$2,$3,$4,$5,$6)"
  const userVal = [globalName,routine,exercise,weight,unit,1]

  pool.query(userInfo,userVal);
  //res.redirect("workout-physique.html")
})

.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.get('/', (req, res) => res.render('pages/index'))
.get('/profile',(req,res)=>{
  pool.query("SELECT * FROM user_info WHERE username = '" + globalName + "'", (err,ans)=>{
      var username = ans.rows[0].username;
      var gender = ans.rows[0].gender;
      var age = ans.rows[0].age;
      var weight = ans.rows[0].weight;
      var height = ans.rows[0].height;
      var status = ans.rows[0].status;
    res.render('pages/profile', {
          username:username,
          age:age,
          gender:gender,
          weight:weight,
          height:height,
          status:status,
    })
  })
})
.get('/logout',(req,res)=> res.render('pages/logout'))


// forums
.get('/forums/:topic', (req,res) => {
  // topic in req.params.topic
  var topic = JSON.stringify(req.params.topic);
  console.log(topic);
  var text = 'SELECT * FROM forums WHERE topic = $1';
  var values = [ req.params.topic ];

  // pool.query('SELECT * FROM forums', (err, result) => {
  // pool.query("SELECT * FROM forums WHERE topic = '" + topic + + "'", (err, result) => {
  pool.query(text, values, (err, result) => {
    console.log(result.rows);
    res.render('pages/forumTopic', { results: result ? result.rows : null, topic: topic });
  });
})

.get('/forums/:topic/:id', (req,res) => {
  // topic in req.params.topic
  var id = req.params.id;
  var topic = req.params.id;
  var text = 'SELECT * FROM forums WHERE id = $1';
  var values = id;


  // const result = pool.query(text, values);
  // const results = { results: result ? result.rows : null, topic: topic };
  // res.render('pages/forumPost', results);

  pool.query("SELECT * FROM forums", (err, result) => {
    res.render('pages/forumPost', { results: result ? result.rows : null, topic: topic });
  })})

.get('/homepage',(req,res)=> res.render('pages/homepage'))

.listen(PORT, () => console.log(`Listening on ${ PORT }`))
