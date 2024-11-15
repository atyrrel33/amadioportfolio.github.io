// analytics.js
class SimpleAnalytics {
    constructor() {
        this.storageKey = 'page_visits';
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
        
        // Get current date in YYYY-MM-DD format
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
}

// Usage example:
const analytics = new SimpleAnalytics();
analytics.trackPageView();

// Display stats in console
console.log('Website Statistics:', analytics.getStats());
