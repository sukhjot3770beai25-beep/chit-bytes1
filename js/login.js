/* =====================================================
   login.js  —  LOGIN PAGE 🔐
   -----------------------------------------------------
   JS TOPICS IN HERE:
     - client-side form validation
     - event: "submit" + event.preventDefault()
     - string methods: trim(), includes(), split(), charAt(), slice()
     - isNaN()  (is it a number?)
     - && (AND)  || (OR)  ! (NOT)
     - localStorage + setTimeout
   ===================================================== */


let form = document.getElementById("loginForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();          // STOP! DON'T SEND FORM. ME CHECK FIRST.

  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value;

  // RULE 1: NO EMPTY BOX
  if (email == "" || password == "") {
    showMessage("Fill both boxes first!", "error");
    return;
  }

  // RULE 2: EMAIL NEED "@" AND "."   OR   PHONE NEED 10 NUMBERS
  let isEmail = email.includes("@") && email.includes(".");
  let isPhone = !isNaN(email) && email.length == 10;

  if (!isEmail && !isPhone) {
    showMessage("Enter a valid email or 10-digit phone number.", "error");
    return;
  }

  // RULE 3: PASSWORD MUST BE 6+ LETTERS
  if (password.length < 6) {
    showMessage("Password too short. Need at least 6 characters.", "error");
    return;
  }

  // ALL RULES PASS! 🎉  MAKE A NAME FROM EMAIL  (pranav@gmail.com -> Pranav)
  let name = "Foodie";
  if (isEmail) {
    name = email.split("@")[0];
    name = name.charAt(0).toUpperCase() + name.slice(1);
  }

  localStorage.setItem("user", name);   // REMEMBER WHO LOGGED IN
  showMessage("Welcome, " + name + "! Taking you home...", "success");

  setTimeout(function () {              // WAIT 1.5 SEC, THEN GO HOME
    location.href = "home.html";
  }, 1500);
});


/* ---------- SHOW RED (error) OR GREEN (success) MESSAGE ---------- */

function showMessage(text, type) {
  let box = document.getElementById("msgBox");
  box.className = "msg-box " + type;

  if (type == "error") {
    box.innerText = "⚠️ " + text;
  } else {
    box.innerText = "✅ " + text;
  }
}


/* ---------- SHOW / HIDE PASSWORD 👁️ ---------- */

function togglePassword() {
  let input = document.getElementById("password");
  let eye = document.getElementById("eyeBtn");

  if (input.type == "password") {
    input.type = "text";          // SHOW LETTERS
    eye.innerText = "🙈";
  } else {
    input.type = "password";      // HIDE LETTERS
    eye.innerText = "👁️";
  }
}
