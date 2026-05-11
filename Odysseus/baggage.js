function uncheckBaggageFalseIfNoBagsFilterExists() {
    const baggageDiv = document.querySelector(
        'div[title="Include flights with no bags"]'
    );

    if (baggageDiv) {
        const checkbox = document.getElementById("BaggageFalse");

        if (checkbox) {
            checkbox.checked = false;
            checkbox.removeAttribute("checked");
        }
    }
}

// Run 5 seconds after DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(uncheckBaggageFalseIfNoBagsFilterExists, 7000);
});
