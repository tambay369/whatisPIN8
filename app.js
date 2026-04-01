// PIN8 CLIENTS SYSTEM

// Toggle FAQ
function toggleFaq(element) {
    const answer = element.nextElementSibling;
    const isHidden = answer.classList.contains('hidden');
    
    // Close all FAQs
    document.querySelectorAll('.faq-answer').forEach(faq => {
        faq.classList.add('hidden');
    });
    document.querySelectorAll('.faq-question').forEach(q => {
        q.classList.remove('active');
    });
    
    // Open clicked if was closed
    if (isHidden) {
        answer.classList.remove('hidden');
        element.classList.add('active');
    }
}

// Submit Lead
function submitLead() {
    const name = document.getElementById('leadName').value.trim();
    const email = document.getElementById('leadEmail').value.trim();
    const phone = document.getElementById('leadPhone').value.trim();
    const business = document.getElementById('leadBusiness').value.trim();
    const painPoints = document.getElementById('leadPainPoints').value.trim();
    const needs = document.getElementById('leadNeeds').value.trim();
    const challenges = document.getElementById('leadChallenges').value.trim();
    const inquiry = document.getElementById('leadInquiry').value.trim();

    if (!name || !email) { 
        alert('Name and Email are required'); 
        return; 
    }

    const leadData = {
        name, email, phone, business,
        painPoints, needs, challenges, inquiry,
        stage: 'client_alignment_request',
        timestamp: new Date().toISOString()
    };

    saveLead(leadData);

    alert('✅ Thank you ' + name + '!\n\nYour information has been received.\n\nWe will reach out within 48 hours to schedule your alignment call.\n\nThis is a conversation, not a commitment.');

    // Clear form
    document.getElementById('leadName').value = '';
    document.getElementById('leadEmail').value = '';
    document.getElementById('leadPhone').value = '';
    document.getElementById('leadBusiness').value = '';
    document.getElementById('leadPainPoints').value = '';
    document.getElementById('leadNeeds').value = '';
    document.getElementById('leadChallenges').value = '';
    document.getElementById('leadInquiry').value = '';
}

// Save Lead to LocalStorage
function saveLead(data) {
    const leads = JSON.parse(localStorage.getItem('pin8_client_leads') || '[]');
    leads.push(data);
    localStorage.setItem('pin8_client_leads', JSON.stringify(leads));
    console.log('💾 Client Lead Saved:', data);
}

// Console Commands
console.log('%c📊 PIN8 CLIENT LEADS', 'color: #D4AF37; font-size: 20px; font-weight: bold;');
console.log('%cType viewClientLeads() to see collected data', 'color: #888;');

function viewClientLeads() {
    const leads = JSON.parse(localStorage.getItem('pin8_client_leads') || '[]');
    console.table(leads);
    return leads;
}
