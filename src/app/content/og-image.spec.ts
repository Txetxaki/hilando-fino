import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ogImageAlt, ogImagePath } from './site-images';

describe('social share image', () => {
  it('uses the "Cómo trabajo" photo, not the old placeholder', () => {
    expect(ogImagePath).toBe('images/og-como-trabajo.jpg');
    expect(existsSync(resolve('public', ogImagePath))).toBe(true);
    expect(existsSync(resolve('public/images/og-hilando-fino.jpg'))).toBe(false);
  });

  it('describes the photo that is actually shown', () => {
    expect(ogImageAlt).toMatch(/libro/i);
  });
});
