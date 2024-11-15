// analytics.js
class SimpleAnalytics {
    constructor() {
        this.storageKey = 'page_visits';
        this.passwordKey = 'analytics_auth';
        this.password = 'EctorStaty888-'; // Change this to your desired password
        this.initStorage();
    }

    initStorage() {
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify({}));
        }
    }

    trackPageView() {
        const currentPath = window.location.pathname;
        const visits = JSON.parse(localStorage.getItem(this.storageKey));
        
        const today = new Date().toISOString().split('T')[0];
        
        if (!visits[currentPath]) {
            visits[currentPath] = {};
        }
        
        if (!visits[currentPath][today]) {
            visits[currentPath][today] = 0;
        }
        
        visits[currentPath][today]++;
        localStorage.setItem(this.storageKey, JSON.stringify(visits));
    }

    getStats() {
        const visits = JSON.parse(localStorage.getItem(this.storageKey));
        const stats = {
            totalVisits: 0,
            pageStats: {},
            dailyStats: {}
        };

        for (const page in visits) {
            stats.pageStats[page] = 0;
            for (const date in visits[page]) {
                const count = visits[page][date];
                stats.totalVisits += count;
                stats.pageStats[page] += count;
                
                if (!stats.dailyStats[date]) {
                    stats.dailyStats[date] = 0;
                }
                stats.dailyStats[date] += count;
            }
        }

        return stats;
    }

    login(password) {
        if (password === this.password) {
            localStorage.setItem(this.passwordKey, 'true');
            return true;
        }
        return false;
    }

    logout() {
        localStorage.removeItem(this.passwordKey);
    }

    isLoggedIn() {
        return localStorage.getItem(this.passwordKey) === 'true';
    }
}

// Initialize analytics
const analytics = new SimpleAnalytics();
analytics.trackPageView();

// Only show the button if logged in or after successful login
function checkAndShowControls() {
    const controls = document.getElementById('analytics-controls');
    if (controls) {
        controls.style.display = analytics.isLoggedIn() ? 'block' : 'none';
    }
}
