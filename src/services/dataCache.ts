interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export class DataCache {
  private static cache: Map<string, CacheEntry<any>> = new Map();
  private static DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

  static set<T>(key: string, data: T, ttl: number = DataCache.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  static get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  static clear(): void {
    this.cache.clear();
  }
}