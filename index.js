function paymentConfirmation(callback) {
    setTimeout(function() {
        // ...
    }, 2000);
}

function viewOrderSummary(callback) {
    setTimeout(function() {
        console.log("View Order Summary");
        callback();
    }, 2000);
}

function inventoryUpdate() {
    setTimeout(function() {
        console.log("Inventory Update");
    }, 2000);
}
