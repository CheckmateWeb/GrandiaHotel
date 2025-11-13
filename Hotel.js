// Display welcome message (Document write)
document.write('<h2 style="text-align:center; color:white; margin-bottom:20px;">Grandia Hotel Booking System</h2>');

let selectedRoom = "";
let selectedRate = "";
let editingRow = null;

// Booking Form Functions
function openBookingForm(room, rate, imgSrc, rowToEdit = null) {
  selectedRoom = room;
  selectedRate = rate;
  editingRow = rowToEdit;
  document.getElementById("selectedRoom").innerText = `${room} — ${rate}`;
  document.getElementById("bookingForm").classList.remove("hidden");
}

function closeForm() {
  document.getElementById("bookingForm").classList.add("hidden");
  document.getElementById("reservationForm").reset();
  editingRow = null;
}

// Handle form submission
document.getElementById("reservationForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("guestName").value;
  const email = document.getElementById("guestEmail").value;
  const checkIn = document.getElementById("checkIn").value;
  const checkOut = document.getElementById("checkOut").value;

  const tableBody = document.querySelector("#reservationTable tbody");

  // Create a new row (Create Element)
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${selectedRoom}</td>
    <td>${selectedRate}</td>
    <td>${name}</td>
    <td>${email}</td>
    <td>${checkIn}</td>
    <td>${checkOut}</td>
    <td>
      <button class="edit-booking" onclick="editBooking(this)">Edit</button>
      <button class="cancel-booking" onclick="cancelBooking(this)">Cancel</button>
    </td>
  `;

  if (editingRow) {
    tableBody.replaceChild(newRow, editingRow); // Edit (Replace Child)
  } else {
    if (tableBody.firstChild) {
      tableBody.insertBefore(newRow, tableBody.firstChild); // Add at top (insert before)
    } else {
      tableBody.appendChild(newRow); // Add at bottom (append child)
    }
  }

  closeForm();
});

// Cancel Booking (remove child)
function cancelBooking(btn) {
  const row = btn.parentElement.parentElement;
  const tableBody = row.parentElement;
  tableBody.removeChild(row); 
}

// Edit Booking
function editBooking(btn) {
  const row = btn.parentElement.parentElement;
  const cells = row.children;

  openBookingForm(
    cells[0].innerText,
    cells[1].innerText,
    '',
    row
  );

  document.getElementById("guestName").value = cells[2].innerText;
  document.getElementById("guestEmail").value = cells[3].innerText;
  document.getElementById("checkIn").value = cells[4].innerText;
  document.getElementById("checkOut").value = cells[5].innerText;
}

// Room Details Modal
function showRoomDetails(title, price, description) {
  document.getElementById("roomTitle").innerText = title;
  document.getElementById("roomPrice").innerText = price;
  document.getElementById("roomDescription").innerText = description;
  document.getElementById("roomDetailsModal").classList.remove("hidden");
}

function closeRoomDetails() {
  document.getElementById("roomDetailsModal").classList.add("hidden");
}

// Close modal by clicking outside
document.getElementById("roomDetailsModal").addEventListener("click", function(e) {
  if (e.target === this) closeRoomDetails();
});
