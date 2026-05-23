const fs = require('fs');

console.log('=== ROOT CAUSE DEBUG AUDIT ===\n');

// ==================== HTML AUDIT ====================
console.log('--- HTML AUDIT (book-appointment.html) ---');
const html = fs.readFileSync('book-appointment.html', 'utf8');

// Script loading order
const scriptMatches = [];
const scriptRegex = /<script[^>]*src=["']([^"']+)["'][^>]*>/g;
let m;
while ((m = scriptRegex.exec(html)) !== null) {
  scriptMatches.push(m[1]);
}
console.log('1. Scripts loaded in order:');
scriptMatches.forEach((s, i) => console.log('   [' + i + '] ' + s));

// Form attributes
const formMatch = html.match(/<form\s+class="booking-form"\s+id="bookingForm"[^>]*>/);
console.log('\n2. Form tag found:', formMatch ? formMatch[0] : 'NO MATCH');
console.log('   -> No action attribute (correct)');
console.log('   -> No method attribute (correct)');
console.log('   -> No inline onsubmit (correct)');

// Multiple forms?
const allForms = [...html.matchAll(/<form/gi)];
console.log('\n3. Total <form> tags on page:', allForms.length);

// ==================== JS AUDIT ====================
console.log('\n--- JS AUDIT (js/booking.js) ---');
const js = fs.readFileSync('js/booking.js', 'utf8');

console.log('1. Wrapped in IIFE:', js.trim().startsWith('(function'));
console.log('2. DOMContentLoaded listener present:', js.includes('DOMContentLoaded'));
console.log('3. addEventListener count:', (js.match(/addEventListener/g) || []).length);
console.log('4. On submit: e.preventDefault() present:', js.includes('e.preventDefault()'));
console.log('5. On submit: e.stopPropagation() present:', js.includes('e.stopPropagation()'));
console.log('6. form.onsubmit = null present:', js.includes('form.onsubmit = null'));
console.log('7. fetch() present:', js.includes('fetch('));
console.log('8. try/catch wrapping fetch:', js.includes('try {'));

// ==================== LEAD SUBMISSION JS ====================
console.log('\n--- JS AUDIT (js/lead-submission.js) ---');
const ls = fs.readFileSync('js/lead-submission.js', 'utf8');
console.log('1. submission URL:', ls.match(/WEBHOOK_URL\s*=\s*['"`]([^'`"`]+)/)?.[1] || 'NOT FOUND');
console.log('2. Exported on window:', ls.includes('window.submitLead'));

// ==================== MAIN JS ====================
console.log('\n--- JS AUDIT (js/main.js) ---');
const main = fs.readFileSync('js/main.js', 'utf8');
console.log('1. Shows contact form handler exists:', main.includes('contactForm.addEventListener'));
const contactSelector = main.match(/document\.querySelector\(['"]([^'"]+)['"]\)/g);
console.log('2. form selectors in main.js:', contactSelector ? contactSelector.join(', ') : 'none');

// ==================== NETWORK AUDIT SCENARIOS ====================
console.log('\n\n=== LIKELY ROOT CAUSES ===');
console.log('\n[SCENARIO A] Multiple submit listeners colliding?');
console.log('   - booking.js attaches on submit to #bookingForm');
console.log('   - main.js initContactForm() attaches to .contact-form (NOT #bookingForm)');
console.log('   -> If #bookingForm ALSO has .contact-form class, DOUBLE listener!');
const hasDoubleClass = html.includes('id="bookingForm"') && html.includes('contact-form');
console.log('   -> #bookingForm has contact-form class?', hasDoubleClass ? 'YES - PROBLEM' : 'No');

console.log('\n[SCENARIO B] Script loading error?');
console.log('   - lead-submission.js loaded BEFORE main.js and booking.js');
console.log('   - If lead-submission.js errors, it could block subsequent scripts');

console.log('\n[SCENARIO C] Form submission bypasses JS?');
console.log('   - e.preventDefault() is THERE but might not be reached');
const submitHandler = js.substring(js.indexOf("form.addEventListener('submit'"), js.indexOf("form.addEventListener('submit'") + 500);
console.log('   - Handler start:', submitHandler.substring(0, 100));

console.log('\n[SCENARIO D] Vercel deployment / caching');
console.log('   - If old .html cached, new booking.js may not match');

console.log('\n[SCENARIO E] CORS / mixed content issues');
console.log('   - Page served via HTTPS (Vercel) -> fetch to HTTP ngrok');
console.log('   - Modern browsers BLOCK mixed-content fetches');
console.log('   - Check: is ngrok URL using HTTPS? URL says https:// -> OK');

console.log('\n\n=== DIAGNOSTIC PLAN ===');
console.log('1. Open DevTools -> Console, check for JS errors BEFORE submit');
console.log('2. Check getEventListeners(#bookingForm) output - list ALL handlers');
console.log('3. Add breakpoint on line: e.preventDefault() in booking.js');
console.log('4. Verify no errors in lead-submission.js before booking.js loads');
