/* =====================================================
   signup.js  —  CREATE ACCOUNT PAGE 📝
   -----------------------------------------------------
   JS TOPICS IN HERE:
     - client-side form validation
     - event: "submit" + event.preventDefault()
     - check two passwords are same  ( != )
     - string methods: trim(), includes(), split()
     - localStorage + setTimeout
   ===================================================== */


let form = document.getElementById("signupForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();          // STOP! DON'T SEND FORM. ME CHECK FIRST.

  let name = document.getElementById("fullName").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value;
  let password2 = document.getElementById("password2").value;

  // RULE 1: NO EMPTY BOX
  if (name == "" || email == "" || password == "" || password2 == "") {
    showMessage("Fill all boxes first!", "error");
    return;
  }

  // RULE 2: EMAIL NEED "@" AND "."
  if (!email.includes("@") || !email.includes(".")) {
    showMessage("Enter a valid email.", "error");
    return;
  }

  // RULE 3: PASSWORD MUST BE 6+ LETTERS
  if (password.length < 6) {
    showMessage("Password too short. Need at least 6 characters.", "error");
    return;
  }

  // RULE 4: BOTH PASSWORDS MUST BE SAME
  if (password != password2) {
    showMessage("Passwords do not match.", "error");
    return;
  }

  // ALL RULES PASS! 🎉  USE FIRST NAME ONLY  ("Pranav Marjara" -> "Pranav")
  let firstName = name.split(" ")[0];

  localStorage.setItem("user", firstName);   // NOW CAVEMAN IS LOGGED IN
  showMessage("Account created! Welcome, " + firstName + " 🎉", "success");

  setTimeout(function () {                   // WAIT 1.5 SEC, THEN GO HOME
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
