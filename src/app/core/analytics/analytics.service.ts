import { Injectable } from '@angular/core';

import { AnalyticsEventName, SafeAnalyticsEvent, SafeAnalyticsProperties, sanitizeAnalyticsProperties } from './analytics.types';

export interface AnalyticsAdapter {
  dispatch(event: SafeAnalyticsEvent): void;
}

class NoopAnalyticsAdapter implements AnalyticsAdapter {
  dispatch(event: SafeAnalyticsEvent): void {
    void event;
    // Intentionally empty: the draft preview has no third-party analytics sink and must not retain events in memory.
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly adapter: AnalyticsAdapter = new NoopAnalyticsAdapter();

  track(name: AnalyticsEventName, properties: SafeAnalyticsProperties = {}): void {
    this.adapter.dispatch({
      name,
      properties: sanitizeAnalyticsProperties(properties as Record<string, unknown>),
      createdAt: new Date().toISOString()
    });
  }

}
