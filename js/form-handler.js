/**
 * Form Handler — Production Webhook Submission
 *
 * Single source of truth for all form submissions to the n8n webhook.
 * JSON + CORS architecture. Native validation before fetch.
 */

(function() {
    'use strict';

    /* ── Configuration ─────────────────────────────────────────── */

    const WEBHOOK_URL = 'https://n8n-railway-production-7c29.up.railway.app/webhook/clinic-lead';

    const FORM_SELECTORS = [
        '#bookingForm',
        '.contact-form',
        '[data-webhook-submit]'
    ];

    /* ── Initialization ─────────────────────────────────────────── */

    function init() {
        var forms = findForms();
        forms.forEach(function(form, index) {
            initializeForm(form, index + 1);
        });
    }

    function findForms() {
        var forms = [];
        var seen = new Set();

        FORM_SELECTORS.forEach(function(selector) {
            var matches = document.querySelectorAll(selector);
            matches.forEach(function(form) {
                if (!seen.has(form)) {
                    seen.add(form);
                    forms.push(form);
                }
            });
        });

        return forms;
    }

    function initializeForm(form, formNumber) {
        try {
            // Neutralize native form submission
            form.removeAttribute('action');
            form.removeAttribute('method');
            form.removeAttribute('target');
            form.onsubmit = null;

            // Attach capture-phase listener
            form.addEventListener('submit', handleSubmit, true);

            // Mark as initialized
            form.setAttribute('data-form-handler-initialized', 'true');
        } catch(err) {
            console.error('[FormHandler] Error initializing form #' + formNumber, err);
        }
    }

    /* ── Submission Handler ─────────────────────────────────────── */

    function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        var form = e.target;

        // Re-strip any dynamically added attributes
        form.removeAttribute('action');
        form.removeAttribute('method');
        form.removeAttribute('target');

        // Block native form.submit()
        form.submit = function() { return false; };

        // ── Native browser validation ──
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // ── Double-submit prevention ──
        var submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.dataset.originalText = submitBtn.textContent || submitBtn.value;
            submitBtn.textContent = 'Sending\u2026';
        }

        // ── Collect form data ──
        var formData = new FormData(form);
        var payload = {
            name:     (formData.get('name') || '').toString().trim(),
            email:    (formData.get('email') || '').toString().trim(),
            phone:    (formData.get('phone') || '').toString().trim(),
            treatment: (formData.get('treatment') || '').toString().trim(),
            date:     (formData.get('date') || '').toString().trim(),
            message:  (formData.get('message') || '').toString().trim(),
            page:     window.location.href,
            timestamp: new Date().toISOString()
        };

        // ── Show pending status ──
        showInlineStatus(form, 'Sending your request\u2026', 'info');

        // ── Fetch to n8n webhook ──
        fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('HTTP ' + response.status);
            }
            showInlineStatus(form, 'Thank you \u2014 we\u2019ll be in touch within 24 hours.', 'success');
            form.reset();
        })
        .catch(function(error) {
            console.error('[FormHandler] Submission failed:', error);
            showInlineStatus(form, 'Something went wrong. Please try again or call us.', 'error');
        })
        .finally(function() {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = submitBtn.dataset.originalText || 'Submit';
            }
        });

        return false;
    }

    /* ── Inline Status ──────────────────────────────────────────── */

    function showInlineStatus(form, message, type) {
        var existing = form.querySelector('.form-handler-status');
        if (existing) {
            existing.remove();
        }

        var statusEl = document.createElement('div');
        statusEl.className = 'form-handler-status form-status-' + type;
        statusEl.textContent = message;
        statusEl.setAttribute('role', 'status');
        statusEl.setAttribute('aria-live', 'polite');

        statusEl.style.cssText = 'margin-top: 16px; padding: 16px; border-radius: 6px; font-size: 14px; line-height: 1.5; transition: opacity 0.3s ease;';

        if (type === 'success') {
            statusEl.style.backgroundColor = '#164e2a';
            statusEl.style.color = '#a3e6a3';
            statusEl.style.border = '1px solid #2e7d32';
        } else if (type === 'error') {
            statusEl.style.backgroundColor = '#4a1515';
            statusEl.style.color = '#ff8a8a';
            statusEl.style.border = '1px solid #b71c1c';
        } else {
            statusEl.style.backgroundColor = '#1a1a3e';
            statusEl.style.color = '#e8c98a';
            statusEl.style.border = '1px solid rgba(201, 169, 110, 0.4)';
        }

        var btn = form.querySelector('button[type="submit"], input[type="submit"]');
        if (btn && btn.parentNode) {
            btn.parentNode.insertBefore(statusEl, btn.nextSibling);
        } else {
            form.appendChild(statusEl);
        }
    }

    /* ── Global Error Handlers ──────────────────────────────────── */

    window.addEventListener('error', function(event) {
        console.error('[FormHandler] Uncaught error:', event.message);
    });

    window.addEventListener('unhandledrejection', function(event) {
        console.error('[FormHandler] Unhandled promise rejection:', event.reason ? (event.reason.message || String(event.reason)) : 'unknown');
    });

    /* ── Bootstrap ──────────────────────────────────────────────── */

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
