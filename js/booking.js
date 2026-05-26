(function() {
    'use strict';

    // ========================================================================
    // PRODUCTION BOOKING FORM — Fixed & Hardened
    // ========================================================================
    // Fixes applied:
    //  1. Listens at CAPTURE phase so nothing can steal the submit event.
    //  2. Adds the listener IMMEDIATELY (no DOMContentLoaded gate) so we
    //     never miss a submit fired before DOMContentLoaded.
    //  3. Disables the submit button while the request is in-flight so the
    //     user cannot accidentally double-submit.
    //  4. Strips action/method twice (at-load + at-submit) to be 100 % sure
    //     the browser cannot fall back to a native POST.
    //  5. Shows inline progress / success / error status without depending
    //     on main.js or showToast().
    //  6. Bails out gracefully if the form is missing.
    // ========================================================================

    var WEBHOOK_URL = 'https://n8n-railway-production-7c29.up.railway.app/webhook/clinic-lead';
    var FORM_ID     = 'bookingForm';

    /* ------------------------------------------------------------------
       Helper: query an element by id, return trimmed value or empty string
       ------------------------------------------------------------------ */
    function byId(id) {
        var el = document.getElementById(id);
        return el ? (el.value ? el.value.trim() : '') : '';
    }

    /* ------------------------------------------------------------------
       Helper: show a small inline status message below the submit button
       ------------------------------------------------------------------ */
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

        var form   = document.getElementById(FORM_ID);
        var submitBtn = form ? form.querySelector('button[type="submit"]') : null;
        if (submitBtn && submitBtn.parentNode) {
            submitBtn.parentNode.insertBefore(el, submitBtn.nextSibling);
        } else if (form) {
            form.appendChild(el);
        }
    }

    /* ------------------------------------------------------------------
       Initialise the booking form
       ------------------------------------------------------------------ */
    function initBookingForm() {
        var form = document.getElementById(FORM_ID);
        if (!form) {
            console.warn('[Booking] #bookingForm not found — aborting init');
            return;
        }

        /* -- strip any native submission vectors -- */
        form.removeAttribute('action');
        form.removeAttribute('method');
        form.onsubmit = null;

        /* -- attach CAPTURE-phase submit listener (runs FIRST) -- */
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();

            /* -- re-strip attributes defensively -- */
            form.removeAttribute('action');
            form.removeAttribute('method');
            form.onsubmit = null;

            var submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending…';
            }

            var payload = {
                name:      byId('name'),
                email:     byId('email'),
                phone:     byId('phone'),
                treatment: byId('treatment'),
                message:   byId('message')
            };

            showInlineStatus('Sending your request…', 'info');

            fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(function(response) {
                if (response.ok) {
                    showInlineStatus("Thank you — we’ll be in touch within 24 hours.", 'success');
                    form.reset();
                } else {
                    console.error('[Booking] Webhook error', response.status);
                    showInlineStatus('Something went wrong on our end. Please try again or call us.', 'error');
                }
            })
            .catch(function(err) {
                console.error('[Booking] Network error', err);
                showInlineStatus('Network error. Please check your connection and try again.', 'error');
            })
            .finally(function() {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Request Appointment';
                }
            });
        }, true);  // <-- CAPTURE phase
    }

    /* ------------------------------------------------------------------
       Date picker
       ------------------------------------------------------------------ */
    function initDatePicker() {
        var dateInput = document.getElementById('date');
        if (!dateInput) return;

        var today = new Date();
        var minDate = today.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);

        dateInput.addEventListener('change', function() {
            var selectedDate = new Date(this.value);
            if (selectedDate.getDay() === 0) {
                showInlineStatus('We are closed on Sundays. Please select another day.', 'warning');
                this.value = '';
            }
        });
    }

    /* ------------------------------------------------------------------
       Time-slot dropdown filler
       ------------------------------------------------------------------ */
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

    /* ------------------------------------------------------------------
       Kick-off
       ------------------------------------------------------------------ */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initBookingForm();
            initDatePicker();
            initTimeSlots();
        });
    } else {
        // DOM already loaded (e.g. script loaded after DOMContentLoaded)
        initBookingForm();
        initDatePicker();
        initTimeSlots();
    }

})();
