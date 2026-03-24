/* ================================
   GLOBAL SETUP
================================ */
window.dataLayer = window.dataLayer || [];

function pushEvent(eventName, payload = {}) {
  window.dataLayer.push({
    event: eventName,
    ...payload
  });
}

/* HOTEL SELECTED */
const hotelBtn = e.target.closest('.bf_roomrates_selectbutton');
if (hotelBtn) {
  pushEvent('hotel_selected', {
    hotel_name: hotelBtn.getAttribute('bf_roomrates_roomname') || undefined,
    hotel_id: hotelBtn.getAttribute('data-hotel-id') || undefined,
    room_type: hotelBtn.getAttribute('data-room-type') || undefined,
    price: parseFloat(hotelBtn.getAttribute('data-price')) || undefined
  });
}

/* ================================
   PRODUCT VIEW (view_item)
================================ */
document.addEventListener('DOMContentLoaded', function () {
  if (window.location.pathname.includes('/product')) {
    if (window.productName && window.productId) {
      pushEvent('view_item', {
        ecommerce: {
          currency: 'GBP',
          value: window.productPrice || 0,
          items: [{
            item_name: window.productName,
            item_id: window.productId,
            price: window.productPrice || 0
          }]
        }
      });
    }
  }
});

/* ================================
   CART VIEW (view_cart)
================================ */
document.addEventListener('DOMContentLoaded', function () {
  if (window.location.pathname.includes('/cart')) {
    if (window.cartItems) {
      pushEvent('view_cart', {
        ecommerce: {
          currency: 'GBP',
          value: window.cartTotal || 0,
          items: window.cartItems
        }
      });
    }
  }
});

/* ================================
   BEGIN CHECKOUT (payment.php)
================================ */
document.addEventListener('DOMContentLoaded', function () {
  if (window.location.pathname.includes('payment.php')) {
    if (!sessionStorage.getItem('begin_checkout_fired')) {
      sessionStorage.setItem('begin_checkout_fired', 'true');

      pushEvent('begin_checkout', {
        ecommerce: {
          currency: 'GBP',
          value: window.cartTotal || 0,
          items: window.cartItems || []
        }
      });
    }
  }
});

/* ================================
   PURCHASE (thank you page)
================================ */
document.addEventListener('DOMContentLoaded', function () {
  if (window.location.pathname.includes('/thank-you')) {
    if (!sessionStorage.getItem('purchase_fired')) {
      sessionStorage.setItem('purchase_fired', 'true');

      pushEvent('purchase', {
        ecommerce: {
          transaction_id: window.orderId,
          value: window.orderTotal || 0,
          tax: window.orderTax || 0,
          shipping: window.orderShipping || 0,
          currency: 'GBP',
          items: window.orderItems || []
        }
      });
    }
  }
});

/* ================================
   CLICK-BASED EVENTS
================================ */
document.addEventListener('click', function (e) {

  /* ADD TO CART */
  const addBtn = e.target.closest('.js-add-to-cart');
  if (addBtn) {
    pushEvent('add_to_cart', {
      ecommerce: {
        currency: 'GBP',
        value: parseFloat(addBtn.dataset.price) || 0,
        items: [{
          item_name: addBtn.dataset.productName,
          item_id: addBtn.dataset.productId,
          price: parseFloat(addBtn.dataset.price) || 0,
          quantity: 1
        }]
      }
    });
  }

  /* REMOVE FROM CART */
  const removeBtn = e.target.closest('.js-bf_removeproduct');
  if (removeBtn) {
    pushEvent('remove_from_cart', {
      ecommerce: {
        items: [{
          item_name: removeBtn.dataset.productName,
          item_id: removeBtn.dataset.productId,
          price: parseFloat(removeBtn.dataset.price) || 0,
          quantity: 1
        }]
      }
    });
  }

  /* GENERIC TRACKING */
  const trackedEl = e.target.closest('[data-track-event]');
  if (trackedEl) {
    pushEvent(trackedEl.dataset.trackEvent, {
      element_text: trackedEl.innerText.trim(),
      element_class: trackedEl.className
    });
  }

});

/* ================================
   PAYMENT METHOD SELECTED
================================ */
document.addEventListener('change', function (e) {
  if (e.target.name === 'payment_method') {
    pushEvent('add_payment_info', {
      payment_type: e.target.value,
      ecommerce: {
        value: window.cartTotal || 0,
        items: window.cartItems || []
      }
    });
  }
});
