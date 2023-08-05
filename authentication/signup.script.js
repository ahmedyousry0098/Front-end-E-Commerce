
function validateEmail(email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
  const passwordPattern = /^[A-Za-z0-9@_-]{4,20}$/
  return passwordPattern.test(password);
}

function validateName(username) {
  const userNamePattern = /^[a-zA-Z0-9]+([._ ]?[a-zA-Z0-9]+)*$/
  return userNamePattern.test(username);
}

function validatePasswordMatch(password, confirmPassword) {
  return password === confirmPassword;
}


function handleSignupSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("username").value; 
  const email = document.getElementById("singupemail").value;
  const password = document.getElementById("signuppass").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  if (
    validateName(name) &&
    validateEmail(email) &&
    validatePassword(password) &&
    validatePasswordMatch(password, confirmPassword)
  ) {
    localStorage.setItem('username', name)
    localStorage.setItem('email', email)
    localStorage.setItem('password', password)
    alert("Signup Done Successfully");
    window.location.replace("./signin.html");
  } else {
    alert(
      "Singup Failed , Invalid user Input ,Make Sure everything matches out Registeration Rules"
    );
  }
}

document.getElementById('signupform').addEventListener('submit', handleSignupSubmit)

  
function Efunction(){
  const email = document.getElementById("singupemail").value;
  if(validateEmail(email)){
    document.getElementById("E").innerHTML="valid email "
    document.getElementById('E').style.color = 'green'
  }
  else{
    document.getElementById("E").innerHTML="invalid email"
    document.getElementById('E').style.fontWeight = 'bold'
  }
}

// function Pfunction(){
//   const password = document.getElementById("signuppass").value;
//   if(validatePassword(password)){
//     document.getElementById("P").innerHTML="valid Password "
//     document.getElementById("P").style.color="color"
//   }
//   else{
//     document.getElementById("P").innerHTML="invalid Password"
//   }
// }

function cfunction() 
{
  const confirmPassword=document.getElementById("confirmPassword").value;
  const password = document.getElementById("signuppass").value;
    if(validatePasswordMatch(password, confirmPassword) && validatePassword(password)){
      document.getElementById("c").innerHTML="valid Password "
      document.getElementById("c").style.color="green "
      document.getElementById("c").style.fontWeight="bold "
    }
    else if (!validatePasswordMatch(password, confirmPassword)) {
      document.getElementById("c").innerHTML="Confirmation Password Must be equal Password"
      document.getElementById("c").style.color="red"
      document.getElementById("c").style.fontWeight="bold"
    }
    else if (!validatePassword(password)) {
      document.getElementById("c").innerHTML="Invalid Or Too Short Password "
      document.getElementById("c").style.color="red "
      document.getElementById("c").style.fontWeight="bold "
    }
}

function userNameErr() {
  const username = document.getElementById("username").value;
  if(validateName(username)){
    document.getElementById("U").innerHTML="valid username "
    document.getElementById('U').style.color = 'green'
  }
  else{
    document.getElementById("U").innerHTML="invalid username"
    document.getElementById('U').style.fontWeight = 'bold'
  }
}