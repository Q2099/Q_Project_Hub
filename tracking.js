<script>
(function() {
  window.dataLayer = window.dataLayer || [];

  /**
   * UTILITIES
   */
  const firedEvents = new Set();

  function pushEvent(eventName, data = {}) {
    const key = eventName + JSON.stringify(data);

    if (!firedEvents.has(key)) {
      window.dataLayer.push({
        event: eventName,
        ...data
      });
      firedEvents.add(key);
    }
  }

  /**
   * HELPERS: PRODUCT DATA
   */
  function getCategory(container) {
    if (container.closest('.hotel')) return 'hotel';
    if (container.closest('.flight')) return 'flight';
    if (container.closest('.extra')) return 'extra';
    return 'unknown';
  }

  function getProductData(el) {
    const container = el.closest('.bf-product, .room, .result-item') || document;

    const nameEl = container.querySelector('.bf_hotelname');
    const priceEl = container.querySelector('.bf_price');

    const priceRaw = priceEl ? priceEl.innerText : '';
    const priceMatch = priceRaw.replace(/[^0-9.]/g, '');

    return {
      item_name: nameEl ? nameEl.innerText.trim() : 'unknown',
      price: priceMatch ? parseFloat(priceMatch) : undefined,
      currency: 'GBP', // hardcoded as requested
      item_category: getCategory(container)
    };
  }

  /**
   * CLICK EVENT MAP
   */
  const clickEventMap = [
    {
      selector: 'button.bf_addprod_basketbutton',
      event: 'open_cart',
      getData: (el) => ({
        button_text: el.innerText.trim()
      })
    },
    {
      selector: 'div.js-bf_slideboxremoveonclose.bf_slidebox_basket_custom',
      event: 'close_cart'
    },
    {
      selector: 'div.bf_roomrates_selectbutton, button.js-bf_selectproduct',
      event: 'add_to_cart'
    },
    {
      selector: 'button.js-bf_removeproduct',
      event: 'remove_from_cart'
    }
  ];

  /**
   * CLICK TRACKING
   */
  document.addEventListener('click', function(e) {

    // Standard mapped events
    clickEventMap.forEach(item => {
      const el = e.target.closest(item.selector);

      if (el) {
        const data = item.getData ? item.getData(el) : {};
        pushEvent(item.event, data);
      }
    });

    // VIEW ITEM DETAILS (enhanced)
    const detailsEl = e.target.closest('a.js-bf_showdetails');
    if (detailsEl) {
      const productData = getProductData(detailsEl);

      pushEvent('view_item_details', {
        ...productData
      });
    }

  });

  /**
   * PAGE EVENT MAP
   */
  const pageEventMap = [
    { match: 'payment.php', event: 'payment_started' },
    { match: 'paying.php', event: 'booking_pay' },
    { match: '/results/', event: 'view_item_list' }
  ];

  /**
   * PAGE TRACKING
   */
  const path = window.location.pathname.toLowerCase();

  pageEventMap.forEach(item => {
    if (path.includes(item.match)) {
      pushEvent(item.event);
    }
  });

  /**
   * SESSION TRACKING
   */
  const SESSION_KEY = 'user_session_data';
  const now = Date.now();
  let sessionData = JSON.parse(sessionStorage.getItem(SESSION_KEY) || '{}');

  // First visit
  if (!localStorage.getItem('first_visit')) {
    pushEvent('first_visit');
    localStorage.setItem('first_visit', now);
  }

  // Session start
  if (!sessionData.start) {
    sessionData.start = now;
    pushEvent('session_start');
  }

  sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));

  // Session duration
  window.addEventListener('beforeunload', function() {
    const sessionEnd = Date.now();
    const start = sessionData.start || sessionEnd;
    const durationSeconds = Math.round((sessionEnd - start) / 1000);

    pushEvent('session_duration', {
      duration_seconds: durationSeconds
    });
  });

})();
</script>
