// ⚙️ CONFIG
const API_URL = "https://script.google.com/macros/s/AKfycbxMaIMLjGLpGNeR-SCGV8UdmYJ0ywgkrQH9IBeAfbim0i_4Eo9_nMcU7nNYHS5vaBw1zQ/exec";

// 🟢 FETCH ORDERS
async function loadOrders() {
  const res = await fetch(`${API_URL}?action=pending`);
  const data = await res.json();
  const tbody = document.querySelector("#ordersTable tbody");
  tbody.innerHTML = "";

  data.orders.forEach((o) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${o.timestamp}</td>
      <td>${o.nome}</td>
      <td>${o.email}</td>
      <td>${o.causale}</td>
      <td>€${o.importo}</td>
      <td>${o.status}</td>
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
