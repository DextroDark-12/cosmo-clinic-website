document.addEventListener('DOMContentLoaded', function() {
    initTreatmentFilter();
    initTreatmentCards();
});

function initTreatmentFilter() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const treatmentCards = document.querySelectorAll('.treatment-detail-card');
    
    if (filterTabs.length === 0 || treatmentCards.length === 0) return;
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            treatmentCards.forEach(card => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'grid';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function initTreatmentCards() {
    const cards = document.querySelectorAll('.treatment-detail-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

function openTreatmentModal(treatmentId) {
    console.log('Opening treatment modal:', treatmentId);
}

function bookTreatment(treatmentName) {
    const select = document.getElementById('treatment');
    if (select) {
        select.value = treatmentName.toLowerCase().replace(/[^a-z0-9]/g, '-');
        window.location.href = 'book-appointment.html';
    }
}