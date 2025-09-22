export interface Activity {
  type: 'lesson' | 'test' | 'sow';
  title: string;
  date: string;
  link: string;
  metadata?: Record<string, unknown>;
}

export class ActivityTracker {
  private static readonly STORAGE_KEY = 'recentActivities';
  private static readonly MAX_ACTIVITIES = 10;

  static addActivity(activity: Omit<Activity, 'date'>) {
    const activities = this.getActivities();

    const newActivity: Activity = {
      ...activity,
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };

    // Remove duplicate if exists (same link)
    const filtered = activities.filter(a => a.link !== activity.link);

    // Add new activity at the beginning
    const updated = [newActivity, ...filtered].slice(0, this.MAX_ACTIVITIES);

    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
    }

    return updated;
  }

  static getActivities(): Activity[] {
    if (typeof window === 'undefined') return [];

    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return [];

    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }

  static clearActivities() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  static getRecentLessons(): Activity[] {
    return this.getActivities().filter(a => a.type === 'lesson');
  }

  static getLastTest(): Activity | null {
    return this.getActivities().find(a => a.type === 'test') || null;
  }

  static getLastSOW(): Activity | null {
    return this.getActivities().find(a => a.type === 'sow') || null;
  }
}