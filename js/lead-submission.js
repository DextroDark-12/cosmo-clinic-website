/**
 * Lead Submission — n8n Webhook Integration
 *
 * Centralised helper that POSTs lead data to the production n8n webhook,
 * which forwards to Twilio for WhatsApp lead notification.
 *
 * Usage:
 *   submitLead({ name, email, phone, treatment, message })
 *     .then(response => { /* success */ })
 *     .catch(err => { /* error */ });
 *
 * The helper is intentionally decoupled from any specific form implementation
 * so it can be reused across booking, contact, and modal forms.
 */

(function () {
  'use strict';

  /** Production webhook endpoint (n8n -> Twilio WhatsApp pipeline) */
  const WEBHOOK_URL = 'https://unmanaged-manor-boxing.ngrok-free.dev/webhook/clinic-lead';

  /**
   * Submit a lead to the n8n webhook.
   *
   * @param {Object} data  - Form data with string fields
   * @param {string} data.name      - Patient / enquirer full name
   * @param {string} data.email     - Email address
   * @param {string} data.phone     - Phone number
   * @param {string} data.treatment - Treatment interest (optional)
   * @param {string} data.message   - Additional message / notes (optional)
   *
   * @returns {Promise<{ok: boolean, status?: number}>}
   */
  async function submitLead(data) {
    // Build the payload with only the fields the webhook expects
    var payload = {
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      treatment: data.treatment || '',
      message: data.message || ''
    };

    console.log('[LeadSubmission] Submitting form...', payload);

    try {
      var response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log('[LeadSubmission] Webhook response:', response);

      if (!response.ok) {
        console.error('[LeadSubmission] Webhook returned status', response.status);
        return { ok: false, status: response.status };
      }
      return { ok: true, status: response.status };
    } catch (err) {
      console.error('[LeadSubmission] Network / fetch error:', err);
      return { ok: false, status: 0 };
    }
  }

  /**
   * Convenience wrapper that submits a lead and provides
   * elegant, minimal toast feedback.
   *
   * @param {Object} data          - Same fields as submitLead
   * @param {Object} [options]
   * @param {Function} [options.onSuccess]  - Extra callback after success toast
   * @param {Function} [options.onError]    - Extra callback after error toast
   */
  function submitLeadWithFeedback(data, options) {
    options = options || {};

    // Show a subtle "Sending…" state so the user knows something is happening
    if (window.showToast) {
      window.showToast('Sending your request…', 'info');
    }

    return submitLead(data).then(function (result) {
      if (result.ok) {
        if (window.showToast) {
          // Replace the "Sending…" toast with a success confirmation
          window.showToast(
            'Thank you — we\'ll be in touch within 24 hours.',
            'success'
          );
        }
        if (typeof options.onSuccess === 'function') {
          options.onSuccess(result);
        }
      } else {
        if (window.showToast) {
          window.showToast(
            'Something went wrong. Please try again or call us.',
            'error'
          );
        }
        if (typeof options.onError === 'function') {
          options.onError(result);
        }
      }
      return result;
    }).catch(function (err) {
      if (window.showToast) {
        window.showToast(
          'Something went wrong. Please try again or call us.',
          'error'
        );
      }
      if (typeof options.onError === 'function') {
        options.onError(err);
      }
      return { ok: false, status: 0 };
    });
  }

  // Expose to the global scope so main.js, booking.js, etc. can use it
  window.submitLead = submitLead;
  window.submitLeadWithFeedback = submitLeadWithFeedback;
})();
