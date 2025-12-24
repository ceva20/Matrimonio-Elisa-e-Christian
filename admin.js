// ⚙️ CONFIG
const API_URL = window.WEDDING_CONFIG.API_URL;


// 🟢 FETCH ORDERS
async function loadOrders() {
  const res = await fetch(`${API_URL}?action=pending`);
  const data = await res.json();
  const tbody = document.querySelector("#ordersTable tbody");
  tbody.innerHTML = "";

  data.orders.forEach((o) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${o.ts}</td>
      <td>${o.nome}</td>
      <td>${o.email}</td>
      <td>${o.causale}</td>
      <td>€${o.totale}</td>
      <td><span class="tag">PENDING</span></td>

      <td>
        <button onclick="confirmOrder('${o.order_id}')">✅ Conferma</button>
        <button onclick="cancelOrder('${o.order_id}')">🗑 Annulla</button>
        <button onclick="window.location='mailto:${o.email}?subject=Conferma regalo&body=Ciao ${o.nome},%0Apuoi inviarci una copia della contabile per il regalo con causale ${o.causale}?'">📧 Contabile</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ✅ CONFERMA
async function confirmOrder(id) {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ action: "confirm", order_id: id })
  });
  loadOrders();
}

// ❌ ANNULLA
async function cancelOrder(id) {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ action: "cancel", order_id: id })
  });
  loadOrders();
}

// ▶️ INIT
loadOrders();
