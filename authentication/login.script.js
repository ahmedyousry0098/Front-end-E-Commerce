function validateEmail(email) {
    // Other Pattern "[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
  const passwordPattern = /^[A-Za-z0-9@_-]{4,20}$/
  return passwordPattern.test(password);
}

function handleLoginSubmit(event) {
    event.preventDefault();
  
    const email = document.getElementById("signinemail").value;
    const password = document.getElementById("signinpass").value;
    const referenceEmail = localStorage.getItem('email') 
    const referencePassword = localStorage.getItem('password')
  
    if (validateEmail(email) && validatePassword(password)) {
      if (email === referenceEmail && password === referencePassword) {
        alert("Logged in Successfully");
        window.location.replace("../home/index.html");
      } else {
        alert('Invalid authentication credntials Please Try Again')
      }
    } else {
      alert("Invalid Email or Password Please Try Again");
    }
}

document.getElementById('loginform').addEventListener('submit', handleLoginSubmit)

function togglePasswordVisability() {
    var x = document.getElementById("signinpass");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}

document.getElementById('signinemail').addEventListener('blur', function() {
    const statusContainer = document.getElementById('emailStatus')
    const email = this.value
    if (validateEmail(email)) {
        statusContainer.innerHTML = 'valid Email'
        statusContainer.style.color = 'green'
        statusContainer.style.fontWeight = 'bold'
    } else {
        statusContainer.innerHTML = 'invalid Email'
        statusContainer.style.color = 'red'
        statusContainer.style.fontWeight = 'bold'
    }
})
document.getElementById('signinemail').addEventListener('focus', function() {
    const statusContainer = document.getElementById('emailStatus')
    statusContainer.innerHTML = ""
})

document.getElementById('signinpass').addEventListener('blur', function() {
    const statusContainer = document.getElementById('passwordStatus')
    const password = this.value
    if (validatePassword(password)) {
        statusContainer.innerHTML += 'valid password'
        statusContainer.style.color = 'green'
        statusContainer.style.fontWeight = 'bold'
    } else {
        statusContainer.innerHTML += 'invalid password'
        statusContainer.style.color = 'red'
        statusContainer.style.fontWeight = 'bold'
    }
})
document.getElementById('signinpass').addEventListener('focus', function() {
    const statusContainer = document.getElementById('passwordStatus')
    statusContainer.innerHTML = ""
})