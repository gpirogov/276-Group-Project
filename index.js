const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl : true
});

express()
.use(express.static(path.join(__dirname, 'public')))
.use(express.json())
.use(express.urlencoded({extended:false}))

.post('/signup.html', function(req,res) {
  var username = req.body.username;
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
      res.render('pages/SignUpError.ejs',{
        msg:'Exsiting Account'
      })
    }
  // pool.query('SELECT * FROM account', (err,ans)=>{
  //   console.log(ans);
  // })
  // console.log("---------------------------------");
  //
  // pool.query('SELECT * FROM user_info', (err,ans)=>{
  //   console.log(ans);
  // })
  })
})

.post('/burning-plus.html', function(req,res){
  var loginname = req.body.username;
  var password = req.body.pw;

  pool.query("SELECT * from account WHERE username = '" + loginname + "'", (err,ans) =>{
    if ( ans.rowCount == 0)
    {
      res.render('pages/errorPage', {
        msg: "No exsit account"
      })
    } else if ( ans.rowCount == 1 )
    {
      if ( password == ans.rows[0].password)
      {
        res.render('pages/errorPage', {
          msg: "CORRECT :)"
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

.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.get('/', (req, res) => res.render('pages/index'))

.listen(PORT, () => console.log(`Listening on ${ PORT }`))
