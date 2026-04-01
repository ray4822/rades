document.addEventListener('DOMContentLoaded', function () {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Sécurité: Redirection si non connecté sur app.html
    if (!currentUser && window.location.pathname.includes('index.html')) {
        // window.location.href = 'auth.html'; 
    }

    // Navigation SPA
    window.showSection = function(sectionId) {
        document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));
        document.getElementById(sectionId).classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // UI Init
    if (currentUser) {
        document.getElementById('nav-logged-in')?.classList.remove('hidden');
        document.getElementById('nav-guest')?.classList.add('hidden');
        document.getElementById('welcome-message').innerText = `Ravi de vous voir, ${currentUser.username} ✨`;
        document.getElementById('prof-username').innerText = currentUser.username;
        document.getElementById('prof-email').innerText = currentUser.email;
        document.getElementById('stat-issues').innerText = currentUser.stats.issuesReported;
    }

    // Render Lists
    const loadData = () => {
        const ann = JSON.parse(localStorage.getItem('announcements')) || [];
        document.getElementById('announcements-list').innerHTML = ann.map(a => `
            <div class="mini-item"><strong>${a.title}</strong><br><small>${a.date}</small></div>
        `).join('');

        const issues = JSON.parse(localStorage.getItem('issues')) || [];
        document.getElementById('recent-issues-list').innerHTML = issues.slice(0, 3).map(i => `
            <li><i class="fas fa-exclamation-circle"></i> ${i.title} <span class="cat">${i.category}</span></li>
        `).join('');
    };
    loadData();

    // Logout
    document.getElementById('logout-btn')?.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        location.reload();
    });

    // Form Submit
    document.getElementById('report-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const newIssue = {
            title: document.getElementById('report-title').value,
            desc: document.getElementById('report-desc').value,
            category: document.getElementById('report-cat').value,
            date: new Date().toLocaleDateString()
        };

        const issues = JSON.parse(localStorage.getItem('issues')) || [];
        issues.unshift(newIssue);
        localStorage.setItem('issues', JSON.stringify(issues));
        
        // Update stats
        currentUser.stats.issuesReported++;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        alert('Merci ! Votre signalement a été enregistré.');
        showSection('home-section');
        loadData();
    });

document.addEventListener('DOMContentLoaded', function () {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Toggle Nav based on Auth
    if (currentUser) {
        document.getElementById('nav-logged-in')?.classList.remove('hidden');
        document.getElementById('nav-guest')?.classList.add('hidden');
        if(document.getElementById('welcome-message')) 
            document.getElementById('welcome-message').innerText = `Ravi de vous voir, ${currentUser.username} ✨`;
    } else {
        document.getElementById('nav-logged-in')?.classList.add('hidden');
        document.getElementById('nav-guest')?.classList.remove('hidden');
    }

    // Navigation SPA
    window.showSection = function(sectionId) {
        document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));
        document.getElementById(sectionId)?.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Logout
    document.getElementById('logout-btn')?.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        location.reload();
    });
});
    
});