document.addEventListener('DOMContentLoaded', function() {
    initFAQ();
});

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                faqItems.forEach(i => i.classList.remove('active'));
                
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

function expandFAQ(element) {
    const faqItem = element.closest('.faq-item');
    const faqAnswer = faqItem.querySelector('.faq-answer');
    const icon = faqItem.querySelector('.faq-icon');
    
    if (faqItem.classList.contains('active')) {
        faqItem.classList.remove('active');
        faqAnswer.style.maxHeight = '0';
        if (icon) icon.textContent = '+';
    } else {
        document.querySelectorAll('.faq-item.active').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.maxHeight = '0';
            item.querySelector('.faq-icon').textContent = '+';
        });
        
        faqItem.classList.add('active');
        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
        if (icon) icon.textContent = '−';
    }
}

function searchFAQ(query) {
    const faqItems = document.querySelectorAll('.faq-item');
    const lowerQuery = query.toLowerCase();
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question')?.textContent.toLowerCase() || '';
        const answer = item.querySelector('.faq-answer')?.textContent.toLowerCase() || '';
        
        if (question.includes(lowerQuery) || answer.includes(lowerQuery)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function filterFAQ(category) {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const itemCategory = item.dataset.category || 'general';
        
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function expandAllFAQs() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.classList.add('active');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
        if (icon) icon.textContent = '−';
    });
}

function collapseAllFAQs() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.classList.remove('active');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        if (answer) answer.style.maxHeight = '0';
        if (icon) icon.textContent = '+';
    });
}