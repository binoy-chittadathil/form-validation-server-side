var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function validate(userid,email,password,confirmPassword){
  let useridError="";
  let emailError="";
  let passwordError="";
  let confirmPasswordError=""
  let regex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

  if(userid.trim()===""){
    useridError='User id required'
  }
 else if(userid.trim().length<5){
  useridError='User id have minimum length 5'
 }
if(email.trim()===""){
  emailError='Email required'
}
 else if(!email.match(regex)){
  emailError='Enter valid email address'
 }
 if(password.trim()===""){
  passwordError='Password required'
 }
 else if(password.trim().length<8){
  passwordError='Password should have minimum length 8 '
 }
 if(confirmPassword!==password){
  confirmPasswordError='Check password'
 }
  return {useridError,emailError,passwordError,confirmPasswordError}
}

router.post('/submit',(req,res)=>{
  let userid=req.body.userid;
  let email=req.body.email;
  let password=req.body.password;
  let confirmPassword=req.body.confirmPassword

  const {useridError,emailError,passwordError,confirmPasswordError}=validate(userid,email,password,confirmPassword);
  if(useridError||emailError||passwordError||confirmPasswordError){
    return res.render('index',{useridError,emailError,passwordError,confirmPasswordError})
  }
  res.send('form submitted')
})

module.exports = router;
