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

document.addEventListener(
    "DOMContentLoaded",
    uncheckBaggageFalseIfNoBagsFilterExists
);
