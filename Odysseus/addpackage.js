document.addEventListener("DOMContentLoaded", function () {
  const table = document.querySelector("table.package-itinerary.mProItineraryTable");

  if (table) {
    table.insertAdjacentHTML("beforebegin", `
      <div class="my-custom-block">
        <h3>Injected Content</h3>
      </div>
    `);
  }
});
