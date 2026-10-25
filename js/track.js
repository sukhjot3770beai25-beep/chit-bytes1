/* =====================================================
   track.js  —  TRACK ORDER PAGE 🛵
   -----------------------------------------------------
   ⭐ MAIN TOPIC: PROMISE ⭐

   PROMISE = "ME PROMISE ME DO THIS THING LATER."
     resolve()  -> PROMISE KEPT 👍  -> next .then() runs
     reject()   -> PROMISE BROKEN 👎 -> jump to .catch()

   CHAIN:  checkOrder()            (is there an order?)
             .then(step 1)         Order placed
             .then(step 2)         Cooking
             .then(step 3)         Out for delivery
             .then(step 4)         Delivered
             .catch(error)         something went wrong

   ALSO:  setTimeout, setInterval + clearInterval,
          map() + join(), JSON.parse, template literals
   ===================================================== */

let order = JSON.parse(localStorage.getItem("order"));  // null IF NO ORDER
let timer;            // COUNTDOWN TIMER ID (to stop it later)
let secondsLeft = 13; // WHOLE DELIVERY TAKE 13 SEC (pretend minutes 😄)


/* ---------- PROMISE #1: IS THERE EVEN AN ORDER? ---------- */

function checkOrder() {
  return new Promise(function (resolve, reject) {
    if (order == null) {
      reject("No order found. Caveman must order food first! 🍖");
    } else {
      resolve(order);
    }
  });
}


/* ---------- PROMISE #2: ONE DELIVERY STEP ----------
   WAIT SOME SECONDS (setTimeout) -> LIGHT UP STEP -> resolve()     */

function deliveryStep(stepNumber, title, seconds) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      lightUpStep(stepNumber, title);
      resolve();                    // STEP DONE! NEXT .then() CAN GO.
    }, seconds * 1000);
  });
}


/* ---------- HELPER: MAKE STEP GREEN ---------- */

function lightUpStep(stepNumber, title) {
  document.getElementById("step" + stepNumber).classList.add("active");
  document.getElementById("trackTitle").innerText = title;

  // HOW LONG THE GREEN LINE IS FOR EACH STEP
  let fillWidth = [0, 0, 25, 50, 75];
  document.getElementById("fill").style.width = fillWidth[stepNumber] + "%";

  if (stepNumber == 3) {
    document.getElementById("rider").style.display = "flex";  // RIDER APPEAR
  }
}


/* ---------- HELPER: COUNTDOWN WITH setInterval ---------- */

function startCountdown() {
  let eta = document.getElementById("eta");
  eta.innerText = "Arriving in " + secondsLeft + " sec";

  timer = setInterval(function () {
    secondsLeft = secondsLeft - 1;

    if (secondsLeft <= 0) {
      clearInterval(timer);         // STOP THE CLOCK
    } else {
      eta.innerText = "Arriving in " + secondsLeft + " sec";
    }
  }, 1000);
}


/* ---------- HELPER: SHOW WHAT CAVEMAN ORDERED ---------- */

function showSummary(order) {
  // MAP: EVERY FOOD BECOME ONE LINE
  let lines = order.items.map(function (food) {
    return `<p>${food.qty} x ${food.name} (${food.restaurant}) <span>₹${food.price * food.qty}</span></p>`;
  });

  document.getElementById("summary").innerHTML = `
    <h4>Your order</h4>
    ${lines.join("")}
    <p class="summary-total">Total paid: ₹${order.total}</p>
    <p class="summary-time">Ordered at ${order.time}</p>`;
}


/* =====================================================
   🔥 THE PROMISE CHAIN 🔥  (one step after another)
   ===================================================== */

checkOrder()
  .then(function (order) {
    showSummary(order);
    startCountdown();
    return deliveryStep(1, "Order placed ✅", 1);
  })
  .then(function () {
    return deliveryStep(2, "Chef is cooking your food 🔥", 3);
  })
  .then(function () {
    return deliveryStep(3, "Out for delivery 🛵", 4);
  })
  .then(function () {
    return deliveryStep(4, "Delivered! Enjoy your food 🍗", 5);
  })
  .then(function () {
    clearInterval(timer);
    document.getElementById("eta").innerText =
      "Delivered at " + new Date().toLocaleTimeString();
    showToast("Food arrive. Caveman happy! 🍖");
  })
  .catch(function (error) {
    // PROMISE BROKEN -> SHOW ERROR, HIDE TRACKING STUFF
    document.getElementById("trackTitle").innerText = "Oops! 🦴";
    document.getElementById("eta").innerText = error;
    document.getElementById("progress").style.display = "none";
    document.getElementById("summary").style.display = "none";
    document.getElementById("goHome").style.display = "inline-block";
  });
