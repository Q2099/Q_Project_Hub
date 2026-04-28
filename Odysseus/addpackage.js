document.addEventListener("DOMContentLoaded", function () {
  if (!window.location.pathname.toLowerCase().includes("checkout.aspx")) {
    return; // stop if not checkout page
  }

  const table = document.querySelector("div.card-body.pr-0.mProParentItineraryContainer");

  if (table) {
    table.insertAdjacentHTML("beforebegin", `
      <div class="my-custom-block">
       <a class="custom-link1 nav-links addprod2" target="_blank" href="https://www.jtaholidays.co.uk/enhance-your-cruise/?utm_source=cruise">Add a Package</a>
      </div>
    `);
  }
});
