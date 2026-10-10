const form = document.getElementById('regForm');
const usersTable = document.getElementById('usersTable');
const successMsg = document.getElementById('successMsg');

// 1. Erekana users bamaze kwiyandikisha
window.onload = function() {
  let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  displayUsers(users);
}

// 2. Iyo ukoze Register
form.addEventListener('submit', function(e) {
  e.preventDefault();
  successMsg.innerHTML = "";

  let isValid = true;

  let name = document.getElementById('fullname');
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let cpassword = document.getElementById('cpassword');
  let agree = document.getElementById('agree');

  // Siba error zose za kera
  document.querySelectorAll('.error').forEach(el => el.innerHTML = "");
  document.querySelectorAll('input').forEach(el => el.classList.remove('error-border'));

  // Genzura Name
  if(name.value.trim() === "") {
    document.getElementById('nameError').innerHTML = "Full name is required";
    name.classList.add('error-border');
    isValid = false;
  }

  // Genzura Email
  if(email.value.trim() === "") {
    document.getElementById('emailError').innerHTML = "Email is required";
    email.classList.add('error-border');
    isValid = false;
  } else if(!email.value.includes("@")) {
    document.getElementById('emailError').innerHTML = "Enter a valid email";
    email.classList.add('error-border');
    isValid = false;
  }

  // Genzura Password
  if(password.value.trim() === "") {
    document.getElementById('passError').innerHTML = "Password is required";
    password.classList.add('error-border');
    isValid = false;
  } else if(password.value.length < 6) {
    document.getElementById('passError').innerHTML = "Password must be at least 6 characters";
    password.classList.add('error-border');
    isValid = false;
  }

  // Genzura Confirm Password
  if(cpassword.value !== password.value) {
    document.getElementById('cpassError').innerHTML = "Passwords do not match";
    cpassword.classList.add('error-border');
    isValid = false;
  }

  // Genzura Checkbox
  if(!agree.checked) {
    document.getElementById('agreeError').innerHTML = "You must agree to terms";
    isValid = false;
  }

  // Niba byose byuzuye
  if(isValid) {
    let newUser = {
      name: name.value,
      email: email.value,
      password: password.value // NOTE: password ntibikwa muri localStorage mu bikorwa nyabyo
    };

    let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));

    displayUsers(users);
    form.reset();
    
    successMsg.innerHTML = "Registration Successful!";
    setTimeout(() => { successMsg.innerHTML = ""; }, 3000);
  }
});

// 3. Function yo kwerekana muri table
function displayUsers(users) {
  usersTable.innerHTML = "";
  users.forEach(user => {
    let row = `<tr>
      <td>${user.name}</td>
      <td>${user.email}</td>
    </tr>`;
    usersTable.innerHTML += row;
  });
}