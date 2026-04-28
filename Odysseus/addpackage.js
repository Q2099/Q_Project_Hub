document.addEventListener("DOMContentLoaded", function () {
  if (!window.location.pathname.toLowerCase().includes("checkout.aspx")) {
    return; // stop if not checkout page
  }

  const table = document.querySelector("table.package-itinerary.mProItineraryTable");

  if (table) {
    table.insertAdjacentHTML("beforebegin", `
      <div class="my-custom-block">
        <h3>Injected on Checkout Only</h3>
      </div>
    `);
  }
});
