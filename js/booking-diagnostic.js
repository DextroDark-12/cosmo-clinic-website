(function() {
    'use strict';

    // ========================================================================
    // DIAGNOSTIC BOOKING FORM
    // This file logs every critical step to the browser console so you can
    // identify exactly where the flow breaks (or if it breaks at all).
    // ========================================================================

    var WEBHOOK_URL = 'https://n8n-railway-production-7c29.up.railway.app/webhook/clinic-lead';

    document.addEventListener('DOMContentLoaded', function() {
        console.log('[Booking] DOM ready. Init form...');
        initBookingForm();
        initDatePicker();
        initTimeSlots();
    });

    function initBookingForm() {
        var form = document.getElementById('bookingForm');
        if (!form) {
            console.error('[Booking] CRITICAL: #bookingForm not found in DOM');
            return;
        }
        console.log('[Booking] Form found:', form);

        // Remove any conflicting/default HTML form behavior
        form.removeAttribute('action');
        form.removeAttribute('method');
        form.onsubmit = null;
        console.log('[Booking] Stripped action, method, and inline onsubmit');

        // Helper
        function byId(id) {
            var el = document.getElementById(id);
            return el ? el.value.trim() : '';
        }

        form.addEventListener('submit', async function(e) {
            console.log('[Booking] Submit EVENT fired');
            e.preventDefault();
            e.stopPropagation();
            console.log('[Booking] e.preventDefault() and e.stopPropagation() executed');

            var payload = {
                name:      byId('name'),
                email:     byId('email'),
                phone:     byId('phone'),
                treatment: byId('treatment'),
                message:   byId('message')
            };

            console.log('[Booking] Payload built:', payload);

            // ====== DIAGNOSTIC: show a visible indicator ======
            showInlineStatus('Sending…', 'info');

            try {
                console.log('[Booking] Starting fetch to:', WEBHOOK_URL);
                var response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                console.log('[Booking] fetch resolved. status:', response.status, 'ok:', response.ok);

                if (response.ok) {
                    showInlineStatus('Thank you — we’ll be in touch within 24 hours.', 'success');
                    form.reset();
                } else {
                    console.error('[Booking] Webhook returned error status', response.status);
                    showInlineStatus('Something went wrong. Please try again or call us.', 'error');
                }
            } catch (error) {
                console.error('[Booking] fetch() THREW:', error);
                showInlineStatus('Network error. Please check your connection and try again.', 'error');
            }
        });
        console.log('[Booking] Submit listener attached.');
    }

    // ===================================================================
    // Inline status helper (no dependency on showToast from main.js)
    // ===================================================================
    function showInlineStatus(message, type) {
        var existing = document.querySelector('.booking-status-msg');
        if (existing) existing.remove();

        var el = document.createElement('div');
        el.className = 'booking-status-msg ' + (type || 'info');
        el.textContent = message;
        el.style.cssText = 'margin-top:12px;padding:12px 16px;border-radius:6px;font-size:.9em;';

        if (type === 'success') {
            el.style.background = '#164e2a';
            el.style.color = '#a3e6a3';
            el.style.border = '1px solid #2e7d32';
        } else if (type === 'error') {
            el.style.background = '#4a1515';
            el.style.color = '#ff8a8a';
            el.style.border = '1px solid #b71c1c';
        } else {
            el.style.background = '#1a1a3e';
            el.style.color = '#e8c98a';
            el.style.border = '1px solid rgba(201,169,110,0.4)';
        }

        var form = document.getElementById('bookingForm');
        if (form) {
            // Insert after the submit button
            var submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn && submitBtn.nextElementSibling) {
                form.insertBefore(el, submitBtn.nextElementSibling);
            } else {
                form.appendChild(el);
            }
        }
    }

    function initDatePicker() {
        var dateInput = document.getElementById('date');
        if (!dateInput) return;

        var today = new Date();
        var minDate = today.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);

        dateInput.addEventListener('change', function() {
            var selectedDate = new Date(this.value);
            var day = selectedDate.getDay();
            if (day === 0) {
                showInlineStatus('We are closed on Sundays. Please select another day.', 'warning');
                this.value = '';
            }
        });
    }

    function initTimeSlots() {
        var timeSelect = document.getElementById('time');
        if (!timeSelect) return;

        var slots = [
            '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
            '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
            '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
            '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
        ];

        slots.forEach(function(slot) {
            var option = document.createElement('option');
            option.value = slot;
            option.textContent = slot;
            timeSelect.appendChild(option);
        });
    }

})();
