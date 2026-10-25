/* =====================================================
   menu.js  —  RESTAURANT PAGES (ADD FOOD) 🍕
   -----------------------------------------------------
   JS TOPICS IN HERE:
     - function with parameter (the button)
     - DOM: parentElement, querySelector, innerText
     - string -> number:  Number(), replace()
     - object { } and array push()
     - for loop to find same food
     - && (AND) to check name + restaurant together
     - setTimeout
   ===================================================== */


/* ---------- 1. CAVEMAN CLICK "ADD" ---------- */

function addToCart(button) {
  // GO UP FROM BUTTON TO THE WHOLE FOOD BOX (.menu-item)
  let foodBox = button.parentElement.parentElement;

  // READ FOOD DETAILS FROM THE PAGE
  let name = foodBox.querySelector("h4").innerText.trim();
  let priceText = foodBox.querySelector(".price").innerText;   // "₹320"
  let price = Number(priceText.replace("₹", ""));               // 320
  let isVeg = !foodBox.querySelector(".veg-dot").classList.contains("nonveg");
  let restaurant = document.querySelector(".restaurant-banner-info h1").innerText;

  let cart = getCart();

  // CART CAN HAVE FOOD FROM MANY RESTAURANTS. NO PROBLEM.
  // SAME FOOD FROM SAME RESTAURANT ALREADY IN CART? JUST ADD +1.
  let found = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name == name && cart[i].restaurant == restaurant) {
      cart[i].qty = cart[i].qty + 1;
      found = true;
    }
  }

  // NEW FOOD? PUSH NEW OBJECT INTO ARRAY.
  if (found == false) {
    let food = {
      name: name,
      price: price,
      qty: 1,
      veg: isVeg,
      restaurant: restaurant
    };
    cart.push(food);
  }

  saveCart(cart);                   // (from common.js)
  showToast("✅ " + name + " added to cart!");
  showCartBar();

  // BUTTON SAY "ADDED" FOR A MOMENT
  button.innerText = "ADDED ✓";
  button.classList.add("added");
  setTimeout(function () {
    button.innerText = "ADD";
    button.classList.remove("added");
  }, 1200);
}


/* ---------- 2. RED BAR AT BOTTOM: "3 items · ₹540  View Cart →" ---------- */

function showCartBar() {
  let bar = document.getElementById("cartBar");

  // NO BAR YET? MAKE ONE.
  if (bar == null) {
    bar = document.createElement("a");
    bar.id = "cartBar";
    bar.className = "floating-cart-bar";
    bar.href = "cart.html";
    document.body.appendChild(bar);
  }

  let cart = getCart();
  if (cart.length == 0) {
    bar.classList.remove("show");   // EMPTY CART = HIDE BAR
    return;
  }

  let items = 0;
  let money = 0;
  for (let i = 0; i < cart.length; i++) {
    items = items + cart[i].qty;
    money = money + cart[i].price * cart[i].qty;
  }

  bar.innerHTML = items + " item(s) · ₹" + money + " <span>|</span> View Cart →";
  bar.classList.add("show");
}

showCartBar();   // SHOW BAR WHEN PAGE OPEN (IF CART HAVE FOOD)
