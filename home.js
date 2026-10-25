/* =====================================================
   home.js  —  HOME PAGE MAGIC 🔥
   -----------------------------------------------------
   JS TOPICS IN HERE:
     - new Date(), getHours(), toLocaleTimeString()
     - setInterval  (live running clock)
     - if / else if / else
     - events: "keyup"
     - string methods: toLowerCase(), trim(), includes()
     - for loop + DOM style (show / hide)
   ===================================================== */


/* ---------- 1. LIVE CLOCK. TICK TOCK EVERY 1 SEC ⏰ ---------- */

function showClock() {
  let now = new Date();
  document.getElementById("clock").innerText = now.toLocaleTimeString();
}

showClock();                    // SHOW TIME RIGHT NOW
setInterval(showClock, 1000);   // THEN SHOW AGAIN EVERY 1000 ms (1 SEC)


/* ---------- 2. GOOD MORNING / GOOD NIGHT ☀️🌙 ---------- */

function showGreeting() {
  let hour = new Date().getHours();         // HOUR IS 0 TO 23
  let name = localStorage.getItem("user");  // WHO LOGGED IN?

  if (name == null) {
    name = "foodie";
  }

  let text = "";

  if (hour < 12) {
    text = "Good morning, " + name + " ☀️ Breakfast time!";
  } else if (hour < 17) {
    text = "Good afternoon, " + name + " 🌤️ Lunch time!";
  } else if (hour < 21) {
    text = "Good evening, " + name + " 🌆 Snack time!";
  } else {
    text = "Late night, " + name + "? 🌙 Midnight cravings!";
  }

  document.getElementById("greeting").innerText = text;
}

showGreeting();


/* ---------- 3. SEARCH RESTAURANT 🔍 ----------
   EVERY TIME KEY GO UP:
   ME CHECK EVERY CARD. WORD MATCH = SHOW. NO MATCH = HIDE.          */

let searchBox = document.getElementById("searchBox");

searchBox.addEventListener("keyup", function () {
  let word = searchBox.value.toLowerCase().trim();
  let cards = document.querySelectorAll(".restaurant-card");
  let shown = 0;

  for (let i = 0; i < cards.length; i++) {
    let cardText = cards[i].innerText.toLowerCase();  // NAME + FOOD + AREA

    if (cardText.includes(word)) {
      cards[i].style.display = "";         // SHOW CARD
      shown = shown + 1;
    } else {
      cards[i].style.display = "none";     // HIDE CARD
    }
  }

  // NOTHING FOUND? TELL CAVEMAN.
  let noResult = document.getElementById("noResult");
  if (shown == 0) {
    noResult.style.display = "block";
    noResult.innerText = '😢 No restaurant found for "' + searchBox.value + '"';
  } else {
    noResult.style.display = "none";
  }
});
