function addpkgpopup() {
  const path = window.location.pathname.toLowerCase();

  // Run only on checkout.aspx OR booking_details.aspx
  if (
    !path.includes("checkout.aspx") &&
    !path.includes("booking_details.aspx")
  ) {
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
      <h2>Want to Enhance your Cruise booking?</h2>
      <p>Click below to add a flight or hotel to supplement your cruise. or close the pop up to continue with your cruise booking</p>
      <a class="custom-link1 nav-links addprod-popup" target="_blank" href="https://www.jtaholidays.co.uk/enhance-your-cruise/?utm_source=cruise">Add a Package</a>
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

    // Prevent background clicks from doing anything
    overlay.addEventListener("click", function (e) {
      e.stopPropagation();
    });

  }, 1500);
}

// Run it when DOM is ready
document.addEventListener("DOMContentLoaded", addpkgpopup);
