document.addEventListener("DOMContentLoaded", function () {

  if (!window.location.pathname.toLowerCase().includes("checkout.aspx")) {
    return;
  }

  // Delay before showing popup
  setTimeout(() => {

    const overlay = document.createElement("div");
    overlay.id = "checkout-popup-overlay";

    const popup = document.createElement("div");
    popup.id = "checkout-popup";

    popup.innerHTML = `
      <button id="checkout-popup-close-x" aria-label="Close popup">✖</button>
      <h2>Important Information</h2>
      <p>This message is shown only on checkout.</p>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Only allow closing via X button
    document.getElementById("checkout-popup-close-x").addEventListener("click", function () {
      overlay.remove();
    });

    // Block ESC key closing
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        e.preventDefault();
      }
    });

    // Block click outside popup from closing it
    overlay.addEventListener("click", function (e) {
      e.stopPropagation();
    });

  }, 1500); // delay in ms

});
