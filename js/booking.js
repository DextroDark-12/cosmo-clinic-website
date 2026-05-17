(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initBookingForm();
        initDatePicker();
        initTimeSlots();
    });

    function initBookingForm() {
        const form = document.getElementById('bookingForm');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            console.log('Booking submitted:', data);

            if (window.showToast) {
                showToast('Appointment request submitted successfully. We will contact you within 24 hours to confirm.', 'success');
            }

            form.reset();
        });
    }

    function initDatePicker() {
        const dateInput = document.getElementById('date');
        if (!dateInput) return;

        const today = new Date();
        const minDate = today.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);

        dateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const day = selectedDate.getDay();
            
            if (day === 0) {
                showToast('We are closed on Sundays. Please select another day.', 'warning');
                this.value = '';
            }
        });
    }

    function initTimeSlots() {
        const timeSelect = document.getElementById('time');
        if (!timeSelect) return;

        const slots = [
            '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
            '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
            '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
            '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
        ];

        slots.forEach(function(slot) {
            const option = document.createElement('option');
            option.value = slot;
            option.textContent = slot;
            timeSelect.appendChild(option);
        });
    }

    function validateBookingForm() {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,}$/;
        
        let isValid = true;
        
        if (!name.value.trim()) {
            showToast('Please enter your name', 'error');
            isValid = false;
        }
        
        if (!emailRegex.test(email.value)) {
            showToast('Please enter a valid email', 'error');
            isValid = false;
        }
        
        if (!phoneRegex.test(phone.value.replace(/\D/g, ''))) {
            showToast('Please enter a valid phone number', 'error');
            isValid = false;
        }
        
        return isValid;
    }

    window.openBookingModal = function(treatment) {
        const modal = document.createElement('div');
        modal.className = 'booking-modal';
        modal.innerHTML = '<div class="booking-modal-content"><button class="close-modal">&times;</button><h3>Book ' + treatment + '</h3><form id="modalBookingForm"></form></div>';
        
        document.body.appendChild(modal);
        
        const form = document.getElementById('modalBookingForm');
        if (form) {
            form.innerHTML = '<div class="form-group"><label>Name</label><input type="text" name="name" required></div><div class="form-group"><label>Email</label><input type="email" name="email" required></div><div class="form-group"><label>Phone</label><input type="tel" name="phone" required></div><button type="submit" class="btn btn-primary">Confirm Booking</button>';
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                showToast('Booking confirmed!', 'success');
                modal.remove();
            });
        }
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target.classList.contains('close-modal')) {
                modal.remove();
            }
        });
    };

})();