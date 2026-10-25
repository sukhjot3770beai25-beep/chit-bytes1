/* =====================================================
   loading.js  —  LOADING SCREEN (index.html) ⏳
   -----------------------------------------------------
   JS TOPICS IN HERE:
     - setTimeout inside a for loop
     - string index:  words[i]
     - location.href (go to another page)
   ===================================================== */

const words = "Welcome to Chit-Bytes";
let typed = "";

// TYPE ONE LETTER EVERY 120 ms  (like a typewriter ⌨️)
for (let i = 0; i < words.length; i++) {
  setTimeout(function () {
    typed = typed + words[i];
    document.getElementById("typeText").innerText = typed;
  }, i * 120);
}

// AFTER 5 SEC, GO TO HOME PAGE
setTimeout(function () {
  location.href = "home.html";
}, 5000);
