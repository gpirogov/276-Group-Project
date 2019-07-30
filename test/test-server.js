var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index.js');
var should = chai.should();
var expect = chai.expect;
var assert = chai.assert;

chai.use(chaiHttp);

//server = 'https://paradox-project.herokuapp.com';
server = 'http://localhost:5000';   //".request(server)" didnt work without this.








// see documentation on why this doesnt work / is commented out.







/*describe('Profile Page', function() {
  it('should have status 200', function(done) {
    chai
      .request(server) //alternatively: .request('http://localhost:5000')
      .get('/profile')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
});*/


/*describe('Questionnaire Skip', function() {
  it('should have status 200', function(done) {
    chai
      .request(server)
      .post('/advancedChoiceSkip')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
});*/


/*global.globalRoutine = "physique";

describe('Nav Bar - Workout', function() {
  it('Navbar should redirect user with physique routine to "workout-physique.html"', function(done) {
    chai
      .request(server)
      .get('/logout');


    chai
      .request(server)
      .post('/go-to-workout-page')
      
      .end(function(err, res){
        res.should.redirectTo('workout-physique.html');
        done();
      });
  });
});*/


/*describe('Sign Up Page', function() {
  it('Registering a new user should start questionnaire', function(done) {
    chai
      .request(server)
      .post('/signup.html')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({username : 'newuser1', pw : 'newpass1', gender : 'M', age : 21, weight : 180, height : 6})
      .redirects(0)
      .end(function(err, res){
        res.should.redirectTo(server + '/questionnaire-start.html');
        done();
      });
  });
  it('Registering an existing user should return "Existing Account" message', function(done) {
    chai
      .request(server)
      .post('/signup.html')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({username : 'tester', pw : 'mypassword', gender : 'other', age : 0, weight : 0, height : 0})
      .end(function(err, res){
        expect(res.body.errorMsg).to.equal("Existing Account");
        done();
      });
  });
});*/



/*describe('Sign In Page', function() {
  it('existing regular user should load correctly', function(done) {
    chai
      .request(server)
      .post('/burning-plus.html')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({username : 'tester', pw : 'mypassword'})
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

  it('non-existing user should return "No account exists" message', function(done) {
    chai
      .request(server)
      .post('/burning-plus.html')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({username : 'notARealUser', pw : 'fakepass'})
      .end(function(err, res){
        expect(res.body.errorMsg).to.equal("No account exists");
        done();
      });
  });
  it('incorrect password, correct user should return "An error occurred!" message', function(done) {
    chai
      .request(server)
      .post('/burning-plus.html')
      //.set('content-type', 'application/x-www-form-urlencoded')
      .send({username : 'tester', pw : 'fakepass'})
      .end(function(err, res){

        res.should.be.json;

        //console.log(err);
        //console.log(res);
        //console.log(res.text);
        //res.text.should.be.eql('test');
        //console.log(res.body);
        //console.log(res.errorMsg);
        //console.log("testxxxxx");


        //expect(errorMsg).to.equal("No account exists");
        //expect(body).to.equal('test');
        //assert.typeOf(errorMsg, 'string');
        done();
      });
  });
});*/


