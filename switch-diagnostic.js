const fs = require('fs');
let html = fs.readFileSync('book-appointment.html', 'utf8');
html = html.replace(
  '<script src="js/booking.js"></script>',
  '<script src="js/booking-diagnostic.js"></script>'
);
fs.writeFileSync('book-appointment.html', html, 'utf8');
console.log('Switched to diagnostic script');
