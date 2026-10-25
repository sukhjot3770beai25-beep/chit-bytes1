/* =====================================================
   cart.js  —  CART PAGE 🛒
   -----------------------------------------------------
   JS TOPICS IN HERE:
     - map()     -> turn every food into an HTML row
     - filter()  -> remove one food
     - reduce()  -> add all prices into one total
     - template literals  `Hello ${name}`
     - const, Math.round()
     - JSON + localStorage (save the order)
   ===================================================== */

const DELIVERY_FEE = 40;
const TAX_PERCENT = 5;


/* ---------- 1. DRAW THE CART ON PAGE ---------- */

function showCart() {
  let cart = getCart();
  let box = document.getElementById("cartBox");

  // NO FOOD? SHOW SAD MESSAGE.
  if (cart.length == 0) {
    box.innerHTML = `
      <div class="empty-cart">
        <div class="empty-icon">🍽️</div>
        <h3>Your cart is empty</h3>
        <p>Caveman hungry? Go hunt some food.</p>
        <a href="home.html">Browse restaurants</a>
      </div>`;
    return;
  }

  // MAP: EVERY FOOD BECOME ONE HTML ROW
  let rows = cart.map(function (food, index) {
    let dotClass = "veg-dot";
    if (food.veg == false) {
      dotClass = "veg-dot nonveg";
    }

    return `
      <div class="cart-item">
        <div>
          <span class="${dotClass}"></span>
          <span class="cart-item-name">${food.name}</span>
          <div class="cart-item-from">from ${food.restaurant}</div>
          <div class="cart-item-price">₹${food.price} x ${food.qty} = ₹${food.price * food.qty}</div>
        </div>
        <div class="cart-item-right">
          <div class="qty-control">
            <button onclick="changeQty(${index}, -1)">−</button>
            <span>${food.qty}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
          </div>
          <button class="remove-btn" onclick="removeFood(${index})">Remove</button>
        </div>
      </div>`;
  });

  // REDUCE: SQUASH ALL PRICES INTO ONE NUMBER
  let itemTotal = cart.reduce(function (sum, food) {
    return sum + food.price * food.qty;
  }, 0);

  let tax = Math.round(itemTotal * TAX_PERCENT / 100);
  let toPay = itemTotal + DELIVERY_FEE + tax;

  box.innerHTML = `
    <div class="cart-restaurant-name">Ordering from <strong>${getRestaurantNames(cart)}</strong></div>

    ${rows.join("")}

    <div class="bill-summary">
      <div class="bill-row"><span>Item total</span><span>₹${itemTotal}</span></div>
      <div class="bill-row"><span>Delivery fee</span><span>₹${DELIVERY_FEE}</span></div>
      <div class="bill-row"><span>Taxes (${TAX_PERCENT}%)</span><span>₹${tax}</span></div>
      <div class="bill-row total"><span>To pay</span><span>₹${toPay}</span></div>
    </div>

    <button class="place-order-btn" onclick="placeOrder(${toPay})">Place Order · ₹${toPay}</button>`;
}


/* ---------- HELPER: ALL RESTAURANT NAMES, NO REPEAT ----------
   CART: Pizza, Pizza, Momo  ->  "Pizza Point, Momo Magic"            */

function getRestaurantNames(cart) {
  let names = [];

  for (let i = 0; i < cart.length; i++) {
    let name = cart[i].restaurant;
    if (names.includes(name) == false) {   // NOT IN LIST YET? ADD IT.
      names.push(name);
    }
  }

  return names.join(", ");
}


/* ---------- 2. + AND − BUTTONS ---------- */

function changeQty(index, change) {
  let cart = getCart();
  cart[index].qty = cart[index].qty + change;

  if (cart[index].qty <= 0) {      // ZERO FOOD? REMOVE IT.
    removeFood(index);
    return;
  }

  saveCart(cart);
  showCart();                      // DRAW AGAIN
}


/* ---------- 3. REMOVE BUTTON ---------- */

function removeFood(index) {
  let cart = getCart();

  // FILTER: KEEP EVERY FOOD EXCEPT THE ONE CAVEMAN NO WANT
  cart = cart.filter(function (food, i) {
    return i != index;
  });

  saveCart(cart);
  showCart();
}


/* ---------- 4. PLACE ORDER ---------- */

function placeOrder(total) {
  let order = {
    items: getCart(),
    total: total,
    time: new Date().toLocaleTimeString()
  };

  localStorage.setItem("order", JSON.stringify(order));  // SAVE ORDER
  localStorage.removeItem("cart");                       // EMPTY CART
  location.href = "track.html";                          // GO TRACK PAGE
}


showCart();   // DRAW CART WHEN PAGE OPEN
