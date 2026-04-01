// PIN8 FUNDERS SYSTEM
let nickname = '';

// Enter Funder Access
function enterFunderAccess() {
    nickname = document.getElementById('nickname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const permission = document.getElementById('permissionCheck').checked;
    const code = document.getElementById('accessCode').value.trim();

    if (!nickname) { showError('Please enter a nickname'); return; }
    if (!email) { showError('Please enter your email'); return; }
    if (!permission) { showError('Please confirm your interest'); return; }
    if (code !== 'YIELD369') { showError('Invalid Access Code'); return; }

    document.getElementById('welcomeName').innerText = 'Welcome, ' + nickname;
    document.getElementById('watermark').innerText = nickname + ' • FUNDER BRIEFING • CONFIDENTIAL';

    document.getElementById('page-1').classList.add('hidden');
    document.getElementById('page-2').classList.remove('hidden');
    window.scrollTo(0, 0);

    // Save lead preliminary
    saveLead({ nickname, email, phone, stage: 'funder_access', timestamp: new Date().toISOString() });
}

// Submit Lead
function submitLead() {
    const name = document.getElementById('leadName').value.trim();
    const email = document.getElementById('leadEmail').value.trim();
    const phone = document.getElementById('leadPhone').value.trim();
    const company = document.getElementById('leadCompany').value.trim();
    const questions = document.getElementById('leadQuestions').value.trim();

    if (!name || !email) { alert('Name and Email required'); return; }

    const leadData = {
        nickname, name, email, phone, company, questions,
        stage: 'funder_alignment_request',
        timestamp: new Date().toISOString()
    };

    saveLead(leadData);

    alert('✅ Thank you ' + name + '!\n\nYour alignment call request has been received.\n\nWe will reach out within 48 hours to schedule your confidential briefing.');

    document.getElementById('leadName').value = '';
    document.getElementById('leadEmail').value = '';
    document.getElementById('leadPhone').value = '';
    document.getElementById('leadCompany').value = '';
    document.getElementById('leadQuestions').value = '';
}

// Save Lead to LocalStorage
function saveLead(data) {
    const leads = JSON.parse(localStorage.getItem('pin8_funder_leads') || '[]');
    leads.push(data);
    localStorage.setItem('pin8_funder_leads', JSON.stringify(leads));
    console.log('💾 Funder Lead Saved:', data);
}

// Logout
function logout() {
    location.reload();
}

// Error Handler
function showError(msg) {
    const err = document.getElementById('errorMsg');
    err.innerText = msg;
    err.classList.remove('hidden');
    setTimeout(() => err.classList.add('hidden'), 8000);
}

// Console Commands
console.log('%c📊 PIN8 FUNDER LEADS', 'color: #D4AF37; font-size: 20px; font-weight: bold;');
console.log('%cType viewFunderLeads() to see collected data', 'color: #888;');

function viewFunderLeads() {
    const leads = JSON.parse(localStorage.getItem('pin8_funder_leads') || '[]');
    console.table(leads);
    return leads;
}
