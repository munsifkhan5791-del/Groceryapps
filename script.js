let prices = { rice:50, wheat:40, milk:30, oil:120 };
let cart = JSON.parse(localStorage.getItem("cart")) || { rice:0, wheat:0, milk:0, oil:0 };
let history = JSON.parse(localStorage.getItem("history")) || [];

function changeQty(item, val) {
  cart[item] += val;
  if(cart[item]<0) cart[item]=0;
  document.getElementById(item+"Qty").innerText = cart[item];
  updateTotal();
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateTotal() {
  let total = 0;
  for(let item in cart) total += cart[item]*prices[item];
  document.getElementById("total").innerText = "₹"+total;
}

function searchItems() {
  let query = document.getElementById("search").value.toLowerCase();
  document.querySelectorAll(".card").forEach(c=>{
    c.style.display = c.dataset.name.includes(query)?"block":"none";
  });
}

function toggleMode() {
  document.body.classList.toggle("dark");
  document.getElementById("modeBtn").innerText = document.body.classList.contains("dark")?"☀ Light Mode":"🌙 Dark Mode";
}

function openCheckout() {
  let html = "";
  for(let item in cart) if(cart[item]>0) html+=`<p>${item} x ${cart[item]}</p>`;
  document.getElementById("summary").innerHTML = html||"No items";
  document.getElementById("checkout").style.display="flex";
}

function closeCheckout(){ document.getElementById("checkout").style.display="none"; }

function confirmOrder() {
  let total = 0;
  let order = [];
  for(let item in cart) {
    if(cart[item]>0){
      order.push(`${item} x ${cart[item]}`);
      total += cart[item]*prices[item];
      cart[item]=0;
      document.getElementById(item+"Qty").innerText = 0;
    }
  }
  if(order.length){
    history.push({items:order, total});
    localStorage.setItem("history", JSON.stringify(history));
    localStorage.setItem("cart", JSON.stringify(cart));
    updateTotal();
    alert("Order placed!");
  }
  closeCheckout();
}

function viewHistory() {
  let html="";
  history.forEach((h,i)=>{ html+=`<p>Order ${i+1}: ${h.items.join(", ")} = ₹${h.total}</p>` });
  document.getElementById("historyContent").innerHTML = html||"No history";
  document.getElementById("historyModal").style.display="flex";
}

function closeHistory(){ document.getElementById("historyModal").style.display="none"; }

window.onload = updateTotal;