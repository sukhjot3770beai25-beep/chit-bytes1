/* =====================================================
   common.js  —  ME RUN ON EVERY PAGE 🪨
   -----------------------------------------------------
   JS TOPICS IN HERE:
     - function
     - array + object
     - for loop
     - JSON.stringify / JSON.parse
     - localStorage (browser cave that remember things)
     - DOM: querySelector, createElement, appendChild
     - classList.toggle  (dark mode)
     - addEventListener + anonymous function + callback
     - setTimeout
     - confirm() dialog box
   ===================================================== */


/* ---------- 1. CART LIVE IN BROWSER CAVE (localStorage) ----------
   CAVE ONLY KEEP TEXT. SO ME USE JSON:
   ARRAY  --JSON.stringify-->  TEXT   (to save)
   TEXT   --JSON.parse------>  ARRAY  (to use)                      */

function getCart() {
  let text = localStorage.getItem("cart");     // ME LOOK IN CAVE

  if (text == null) {
    return [];                                 // CAVE EMPTY. NO FOOD.
  }

  return JSON.parse(text);                     // TEXT BECOME ARRAY
}

function saveCart(cart) {
  let text = JSON.stringify(cart);             // ARRAY BECOME TEXT
  localStorage.setItem("cart", text);          // ME PUT IN CAVE
  showCartCount();                             // UPDATE RED NUMBER ON CART
}


/* ---------- 2. SHOW HOW MANY FOOD ON "CART" LINK ---------- */

function showCartCount() {
  let cart = getCart();
  let count = 0;

  for (let i = 0; i < cart.length; i++) {      // LOOP. COUNT EVERY FOOD.
    count = count + cart[i].qty;
  }

  let cartLinks = document.querySelectorAll('.nav-links a[href="cart.html"]');

  for (let i = 0; i < cartLinks.length; i++) {
    if (count > 0) {
      cartLinks[i].innerHTML = '🛒 Cart <span class="cart-badge">' + count + '</span>';
    } else {
      cartLinks[i].innerHTML = "🛒 Cart";
    }
  }
}


/* ---------- 3. SMALL POP MESSAGE (TOAST) 🍞 ----------
   NO MORE UGLY alert(). ME MAKE PRETTY BOX.
   BOX COME IN, WAIT 2 SEC, GO AWAY.                                 */

function showToast(message) {
  let toast = document.createElement("div");   // ME MAKE NEW DIV
  toast.className = "toast";
  toast.innerText = message;
  document.body.appendChild(toast);            // ME PUT DIV ON PAGE

  setTimeout(function () {                     // TINY WAIT, THEN SLIDE IN
    toast.classList.add("show");
  }, 10);

  setTimeout(function () {                     // 2 SEC LATER, SLIDE OUT
    toast.classList.remove("show");
  }, 2000);

  setTimeout(function () {                     // THEN THROW BOX AWAY
    toast.remove();
  }, 2500);
}


/* ---------- 4. DARK MODE (NIGHT IN CAVE) 🌙 ----------
   classList.toggle("dark-mode"):
   CLASS THERE?     -> REMOVE IT
   CLASS NOT THERE? -> ADD IT                                        */

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  let button = document.getElementById("darkBtn");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "on");    // REMEMBER FOR NEXT PAGE
    button.innerText = "☀️";
  } else {
    localStorage.setItem("darkMode", "off");
    button.innerText = "🌙";
  }
}

function addDarkButton() {
  let nav = document.querySelector(".nav-links");
  if (nav == null) {
    return;                                    // NO NAV ON PAGE? DO NOTHING.
  }

  let button = document.createElement("button");  // ME MAKE BUTTON WITH JS
  button.id = "darkBtn";
  button.className = "dark-btn";
  button.innerText = "🌙";
  button.title = "Toggle dark mode";
  button.addEventListener("click", toggleDarkMode); // toggleDarkMode = CALLBACK
  nav.prepend(button);                         // PUT BUTTON FIRST IN NAV

  if (localStorage.getItem("darkMode") == "on") {   // WAS DARK LAST TIME?
    document.body.classList.add("dark-mode");
    button.innerText = "☀️";
  }
}


/* ---------- 5. SAY HI TO LOGGED-IN CAVEMAN 👋 ---------- */

function showUserName() {
  let user = localStorage.getItem("user");
  if (user == null) {
    return;                                    // NOBODY LOGGED IN
  }

  let link = document.querySelector(".btn-signup");
  if (link == null) {
    return;
  }

  link.innerText = "Hi, " + user + " 👋";
  link.href = "#";

  link.addEventListener("click", function (event) {   // ANONYMOUS FUNCTION
    event.preventDefault();                           // DON'T JUMP PAGE
    let sure = confirm("Log out, " + user + "?");     // confirm() DIALOG BOX

    if (sure) {
      localStorage.removeItem("user");
      location.reload();                              // REFRESH PAGE
    }
  });
}


/* ---------- 6. START EVERYTHING 🔥 ---------- */
addDarkButton();
showCartCount();
showUserName();
