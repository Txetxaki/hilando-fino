export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}

export class InMemoryRateLimiter {
  private readonly hits = new Map<string, number[]>();

  constructor(
    private readonly limit: number = 5,
    private readonly windowMs: number = 60_000,
    private readonly maxKeys: number = 1_000
  ) {}

  check(key: string, now = Date.now()): RateLimitResult {
    this.prune(now);
    const existing = this.hits.get(key)?.filter((timestamp) => now - timestamp < this.windowMs) ?? [];
    if (existing.length >= this.limit) {
      this.hits.set(key, existing);
      return { allowed: false, remaining: 0 };
    }
    existing.push(now);
    this.hits.set(key, existing);
    this.prune(now);
    return { allowed: true, remaining: this.limit - existing.length };
  }

  size(): number {
    return this.hits.size;
  }

  clear(): void {
    this.hits.clear();
  }

  private prune(now: number): void {
    for (const [key, timestamps] of this.hits.entries()) {
      const retained = timestamps.filter((timestamp) => now - timestamp < this.windowMs);
      if (retained.length === 0) this.hits.delete(key);
      else this.hits.set(key, retained);
    }

    while (this.hits.size > this.maxKeys) {
      const oldest = this.hits.keys().next().value as string | undefined;
      if (!oldest) break;
      this.hits.delete(oldest);
    }
  }
}
