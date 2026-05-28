/**
 * Form Handler — Centralized Production Webhook Submission System
 *
 * Single source of truth for ALL form submissions to the n8n webhook.
 * Replaces competing handlers with one deterministic, production-safe system.
 *
 * Architecture:
 *   - IIFE isolation (no global pollution except window.formHandlerDebug)
 *   - Capture-phase listeners with stopImmediatePropagation
 *   - Guaranteed fetch execution (no fallback branches that skip fetch)
 *   - Deterministic logging at every stage
 *   - Double-submit prevention via button disable
 *   - Luxury inline status feedback (no alert popups)
 */

(function() {
    'use strict';

    // ========================================================================
    // CONFIGURATION
    // ========================================================================

    /** Production webhook endpoint (n8n → Twilio WhatsApp pipeline) */
    const WEBHOOK_URL = 'https://n8n-railway-production-7c29.up.railway.app/webhook/clinic-lead';

    /** Form selectors to auto-initialize (in priority order) */
    const FORM_SELECTORS = [
        '#bookingForm',
        '.contact-form',
        '[data-webhook-submit]'
    ];

    // ========================================================================
    // INITIALIZATION
    // ========================================================================

    /**
     * Initialize the form handler.
     * Called immediately if DOM is ready, otherwise waits for DOMContentLoaded.
     */
    function init() {
        dbg('INIT called', { readyState: document.readyState });
        var forms = findForms();

        if (forms.length === 0) {
            dbg('INIT WARNING: no forms found', FORM_SELECTORS);
            return;
        }

        forms.forEach(function(form, index) {
            initializeForm(form, index + 1);
        });

        dbg('INIT complete', { formCount: forms.length });
    }

    /**
     * Find all forms matching the configured selectors.
     * @returns {Array<HTMLFormElement>}
     */
    function findForms() {
        const forms = [];
        const seen = new Set();

        FORM_SELECTORS.forEach(function(selector) {
            const matches = document.querySelectorAll(selector);
            matches.forEach(function(form) {
                if (!seen.has(form)) {
                    seen.add(form);
                    forms.push(form);
                }
            });
        });

        return forms;
    }

    /**
     * Initialize a single form for webhook submission.
     * @param {HTMLFormElement} form
     * @param {number} formNumber
     */
    function initializeForm(form, formNumber) {
        try {
            // Neutralize native form submission vectors
            form.removeAttribute('action');
            form.removeAttribute('method');
            form.removeAttribute('target');

            // Clear any inline onsubmit handler
            form.onsubmit = null;

            // Attach CAPTURE-phase listener with immediate propagation stop
            form.addEventListener('submit', handleSubmit, true);

            // Mark as initialized
            form.setAttribute('data-form-handler-initialized', 'true');

            dbg('Form #' + formNumber + ' initialized', { id: form.id, className: form.className, hasAction: !!form.getAttribute('action') });
        } catch(err) {
            dbg('EXCEPTION in initializeForm', { formNumber: formNumber, name: err.name, message: err.message });
        }
    }

    // ========================================================================
    // VISIBLE DEBUG PANEL (TEMPORARY — REMOVE AFTER DIAGNOSIS)
    // ========================================================================

    var debugPanel = null;
    var debugLog = [];

    function ensureDebugPanel() {
        if (debugPanel) return;
        debugPanel = document.createElement('div');
        debugPanel.id = 'form-debug-panel';
        debugPanel.style.cssText = 'position:fixed;bottom:0;left:0;right:0;max-height:40vh;overflow-y:auto;background:#111;color:#0f0;font:11px/1.4 monospace;z-index:999999;padding:8px;border-top:2px solid #c9a96e;white-space:pre-wrap;word-break:break-all;';
        document.body.appendChild(debugPanel);
    }

    function dbg(label, data) {
        var entry = '[' + new Date().toISOString().substr(11, 12) + '] ' + label;
        if (data !== undefined) {
            try { entry += ': ' + (typeof data === 'string' ? data : JSON.stringify(data)); }
            catch(e) { entry += ': [circular/unserializable]'; }
        }
        console.log('[DBG] ' + entry);
        debugLog.push(entry);
        try {
            ensureDebugPanel();
            debugPanel.textContent = debugLog.join('\n');
            debugPanel.scrollTop = debugPanel.scrollHeight;
        } catch(e) { /* panel failure must not break submission */ }
    }

    // ========================================================================
    // SUBMISSION HANDLER
    // ========================================================================

    /**
     * Handle form submission.
     * Fully instrumented for mobile debugging.
     * @param {Event} e
     */
    function handleSubmit(e) {
        dbg('SUBMIT EVENT FIRED', { type: e.type, target: e.target.id || e.target.className, eventPhase: e.eventPhase, cancelable: e.cancelable });

        try {
            // === CRITICAL: Stop ALL other handlers ===
            e.preventDefault();
            dbg('preventDefault done', { defaultPrevented: e.defaultPrevented });
            e.stopPropagation();
            e.stopImmediatePropagation();
            dbg('stopPropagation + stopImmediatePropagation done');
        } catch(err) {
            dbg('EXCEPTION in event stop', { name: err.name, message: err.message });
        }

        var form;
        try {
            form = e.target;
            dbg('form reference', { id: form.id, className: form.className, tagName: form.tagName });
        } catch(err) {
            dbg('EXCEPTION getting form', { name: err.name, message: err.message });
            return;
        }

        try {
            // Defensive: re-strip any dynamically added attributes
            form.removeAttribute('action');
            form.removeAttribute('method');
            form.removeAttribute('target');
            dbg('stripped action/method/target', { action: form.getAttribute('action'), method: form.getAttribute('method') });

            // Block the native form.submit() method
            form.submit = function() {
                dbg('BLOCKED native form.submit()');
                return false;
            };
        } catch(err) {
            dbg('EXCEPTION in form hardening', { name: err.name, message: err.message });
        }

        // Get submit button
        var submitBtn;
        try {
            submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
            dbg('submitBtn found', { found: !!submitBtn, disabled: submitBtn ? submitBtn.disabled : 'N/A' });
        } catch(err) {
            dbg('EXCEPTION finding submitBtn', { name: err.name, message: err.message });
        }

        try {
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.dataset.originalText = submitBtn.textContent || submitBtn.value;
                submitBtn.textContent = 'Sending\u2026';
                dbg('submitBtn disabled');
            }
        } catch(err) {
            dbg('EXCEPTION disabling submitBtn', { name: err.name, message: err.message });
        }

        // Collect form data
        var formData, payload;
        try {
            formData = new FormData(form);
            dbg('FormData created', { keys: Array.from(formData.keys()).join(',') });

            // Check each field individually for mobile-specific issues
            var rawName = formData.get('name');
            var rawEmail = formData.get('email');
            var rawPhone = formData.get('phone');
            var rawTreatment = formData.get('treatment');
            var rawDate = formData.get('date');
            var rawMessage = formData.get('message');

            dbg('raw fields', {
                name: rawName,
                email: rawEmail,
                phone: rawPhone,
                treatment: rawTreatment,
                date: rawDate,
                date_type: rawDate !== null ? typeof rawDate : 'null',
                message: rawMessage
            });

            payload = {
                name: (rawName || '').toString().trim(),
                email: (rawEmail || '').toString().trim(),
                phone: (rawPhone || '').toString().trim(),
                treatment: (rawTreatment || '').toString().trim(),
                date: (rawDate || '').toString().trim(),
                message: (rawMessage || '').toString().trim(),
                page: window.location.href,
                timestamp: new Date().toISOString()
            };

            dbg('PAYLOAD BUILT', payload);
        } catch(err) {
            dbg('EXCEPTION building payload', { name: err.name, message: err.message, stack: err.stack });
            showInlineStatus(form, 'Error building form data. Please try again.', 'error');
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitBtn.dataset.originalText || 'Submit'; }
            return;
        }

        // Verify fetch is available
        try {
            dbg('fetch available', { hasFetch: typeof fetch === 'function' });
            if (typeof fetch !== 'function') {
                dbg('CRITICAL: fetch() not available on this browser');
                showInlineStatus(form, 'Your browser does not support this form. Please call us.', 'error');
                if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitBtn.dataset.originalText || 'Submit'; }
                return;
            }
        } catch(err) {
            dbg('EXCEPTION checking fetch', { name: err.name, message: err.message });
        }

        // Verify WEBHOOK_URL
        dbg('webhook URL', { url: WEBHOOK_URL, type: typeof WEBHOOK_URL });

        // Log UA for mobile debugging
        dbg('userAgent', navigator.userAgent);

        // Show inline status
        try {
            showInlineStatus(form, 'Sending your request\u2026', 'info');
            dbg('showInlineStatus(info) done');
        } catch(err) {
            dbg('EXCEPTION in showInlineStatus info', { name: err.name, message: err.message });
        }

        // === FETCH EXECUTION ===
        var fetchBody;
        try {
            fetchBody = JSON.stringify(payload);
            dbg('JSON.stringify succeeded', { length: fetchBody.length, first100: fetchBody.substring(0, 100) });
        } catch(err) {
            dbg('EXCEPTION in JSON.stringify', { name: err.name, message: err.message });
            showInlineStatus(form, 'Error preparing data. Please try again.', 'error');
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitBtn.dataset.originalText || 'Submit'; }
            return;
        }

        dbg('FETCH STARTING', { url: WEBHOOK_URL, method: 'POST', mode: 'no-cors', contentType: 'text/plain', bodyLength: fetchBody.length });

        try {
            fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: fetchBody,
                mode: 'no-cors'
            })
            .then(function(response) {
                dbg('FETCH THEN fired', { type: typeof response, ok: response ? response.ok : 'N/A', status: response ? response.status : 'N/A' });
                try {
                    showInlineStatus(form, 'Thank you \u2014 we\u2019ll be in touch within 24 hours.', 'success');
                    dbg('showInlineStatus(success) done');
                } catch(err) {
                    dbg('EXCEPTION in success showInlineStatus', { name: err.name, message: err.message });
                }
                try {
                    form.reset();
                    dbg('form.reset() done');
                } catch(err) {
                    dbg('EXCEPTION in form.reset()', { name: err.name, message: err.message });
                }
            })
            .catch(function(error) {
                dbg('FETCH CATCH fired', { name: error.name, message: error.message, stack: error.stack ? error.stack.substring(0, 200) : 'N/A' });
                try {
                    showInlineStatus(form, 'Something went wrong. Please try again or call us.', 'error');
                } catch(err2) {
                    dbg('EXCEPTION in error showInlineStatus', { name: err2.name, message: err2.message });
                }
            })
            .finally(function() {
                dbg('FETCH FINALLY fired');
                try {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = submitBtn.dataset.originalText || 'Submit';
                        dbg('submitBtn re-enabled');
                    }
                } catch(err) {
                    dbg('EXCEPTION in finally re-enable', { name: err.name, message: err.message });
                }
            });
        } catch(err) {
            dbg('EXCEPTION calling fetch() itself', { name: err.name, message: err.message, stack: err.stack });
            showInlineStatus(form, 'Network error. Please try again or call us.', 'error');
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitBtn.dataset.originalText || 'Submit'; }
        }

        // Return false as extra safety
        return false;
    }

    /**
     * Show inline status message below the form.
     * @param {HTMLFormElement} form
     * @param {string} message
     * @param {string} type - 'info', 'success', 'error'
     */
    function showInlineStatus(form, message, type) {
        // Remove any existing status
        const existing = form.querySelector('.form-handler-status');
        if (existing) {
            existing.remove();
        }

        // Create status element
        const statusEl = document.createElement('div');
        statusEl.className = 'form-handler-status form-status-' + type;
        statusEl.textContent = message;
        statusEl.setAttribute('role', 'status');
        statusEl.setAttribute('aria-live', 'polite');

        // Inline styles for luxury aesthetic (gold accent colors)
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
            // info
            statusEl.style.backgroundColor = '#1a1a3e';
            statusEl.style.color = '#e8c98a';
            statusEl.style.border = '1px solid rgba(201, 169, 110, 0.4)';
        }

        // Append to form (before submit button if possible)
        const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
        if (submitBtn && submitBtn.parentNode) {
            submitBtn.parentNode.insertBefore(statusEl, submitBtn.nextSibling);
        } else {
            form.appendChild(statusEl);
        }
    }

    // ========================================================================
    // GLOBAL ERROR HANDLING
    // ========================================================================

    /**
     * Global error handler to catch any uncaught exceptions.
     */
    window.addEventListener('error', function(event) {
        dbg('GLOBAL ERROR', { message: event.message, filename: event.filename, lineno: event.lineno, colno: event.colno });
    });

    window.addEventListener('unhandledrejection', function(event) {
        dbg('UNHANDLED PROMISE REJECTION', { reason: event.reason ? (event.reason.message || String(event.reason)) : 'unknown' });
    });

    // ========================================================================
    // DEBUGGING / VERIFICATION
    // ========================================================================

    /**
     * Expose minimal debug interface for console verification.
     * Usage: window.formHandlerDebug.status()
     */
    window.formHandlerDebug = {
        status: function() {
            const forms = document.querySelectorAll('#bookingForm, .contact-form, [data-webhook-submit]');
            const initialized = document.querySelectorAll('[data-form-handler-initialized]');
            return {
                formsFound: forms.length,
                initialized: initialized.length,
                webhookUrl: WEBHOOK_URL,
                timestamp: new Date().toISOString()
            };
        },
        testSubmit: function(formId) {
            const form = document.getElementById(formId) || document.querySelector(formId);
            if (!form) {
                console.error('[FormHandler Debug] Form not found:', formId);
                return;
            }
            const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
            form.dispatchEvent(submitEvent);
        }
    };

    // ========================================================================
    // BOOTSTRAP
    // ========================================================================

    dbg('IIFE executing', { readyState: document.readyState, URL: WEBHOOK_URL });

    if (document.readyState === 'loading') {
        dbg('DOM still loading, waiting for DOMContentLoaded');
        document.addEventListener('DOMContentLoaded', init);
    } else {
        dbg('DOM already ready, calling init() immediately');
        init();
    }

})();
