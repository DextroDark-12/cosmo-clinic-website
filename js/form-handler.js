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
    const WEBHOOK_URL = 'https://unmanaged-manor-boxing.ngrok-free.dev/webhook/clinic-lead';

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
        const forms = findForms();

        if (forms.length === 0) {
            console.warn('[FormHandler] No forms found matching selectors:', FORM_SELECTORS.join(', '));
            return;
        }

        forms.forEach(function(form, index) {
            initializeForm(form, index + 1);
        });

        console.log('[FormHandler] Initialized', forms.length, 'form(s)');
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
        // Neutralize native form submission vectors
        form.removeAttribute('action');
        form.removeAttribute('method');
        form.removeAttribute('target');

        // Clear any inline onsubmit handler
        form.onsubmit = null;

        // Attach CAPTURE-phase listener with immediate propagation stop
        // The 'true' third argument sets capture phase (runs before bubble)
        form.addEventListener('submit', handleSubmit, true);

        // Mark as initialized to prevent double-initialization
        form.setAttribute('data-form-handler-initialized', 'true');

        console.log('[FormHandler] Form #' + formNumber + ' initialized:', form.id || form.className || 'unnamed');
    }

    // ========================================================================
    // SUBMISSION HANDLER
    // ========================================================================

    /**
     * Handle form submission.
     * This is the single execution path for ALL webhook submissions.
     * NO fallback branches that skip fetch.
     * @param {Event} e
     */
    function handleSubmit(e) {
        // === CRITICAL: Stop ALL other handlers ===
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();  // Blocks other listeners on same element

        const form = e.target;

        // Defensive: re-strip any dynamically added attributes
        form.removeAttribute('action');
        form.removeAttribute('method');
        form.removeAttribute('target');

        // Block the native form.submit() method
        form.submit = function() {
            console.warn('[FormHandler] Blocked native form.submit() call');
            return false;
        };

        // Get submit button for disable/feedback
        const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');

        // Disable button to prevent double-submit
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.dataset.originalText = submitBtn.textContent || submitBtn.value;
            submitBtn.textContent = 'Sending…';
        }

        // Collect form data
        const formData = new FormData(form);
        const payload = {
            name: (formData.get('name') || '').toString().trim(),
            email: (formData.get('email') || '').toString().trim(),
            phone: (formData.get('phone') || '').toString().trim(),
            treatment: (formData.get('treatment') || '').toString().trim(),
            message: (formData.get('message') || '').toString().trim(),
            page: window.location.href,
            timestamp: new Date().toISOString()
        };

        // === DETERMINISTIC LOGGING ===
        console.log('[FormHandler] Submitting payload:', payload);
        console.log('[FormHandler] Webhook URL:', WEBHOOK_URL);

        // Show inline status
        showInlineStatus(form, 'Sending your request…', 'info');

        // === GUARANTEED FETCH EXECUTION ===
        // No conditional branches that could skip this
        fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload),
            // Prevent browser from caching
            cache: 'no-cache'
        })
        .then(function(response) {
            console.log('[FormHandler] Response received:', response.status, response.statusText);

            if (!response.ok) {
                // Log response body for debugging
                return response.text().then(function(body) {
                    console.error('[FormHandler] Error response body:', body);
                    throw new Error('HTTP ' + response.status + ': ' + response.statusText);
                });
            }

            // Try to parse JSON, but don't fail if empty
            return response.json().catch(function() {
                return { success: true };
            });
        })
        .then(function(data) {
            console.log('[FormHandler] Success:', data);
            showInlineStatus(form, 'Thank you — we\'ll be in touch within 24 hours.', 'success');
            form.reset();
        })
        .catch(function(error) {
            console.error('[FormHandler] Fetch error:', error);
            showInlineStatus(form, 'Something went wrong. Please try again or call us.', 'error');
        })
        .finally(function() {
            // Re-enable submit button
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = submitBtn.dataset.originalText || 'Submit';
            }
        });

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
        console.error('[Global Error]', {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            error: event.error ? event.error.stack : null
        });
    });

    /**
     * Catch unhandled promise rejections (e.g., fetch failures).
     */
    window.addEventListener('unhandledrejection', function(event) {
        console.error('[Unhandled Promise Rejection]', event.reason);
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

})();
