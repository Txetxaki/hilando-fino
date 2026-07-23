import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { pageByPath } from '../../content/content-matrix';
import { notFoundContent } from '../../content/not-found';
import { siteConfig } from '../../../environments/site-config';
import { schemaForPage } from './schema';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  applyForPath(path: string): void {
    const page = pageByPath(path);
    const siteUrl = this.siteUrl();
    const title = page?.title ?? notFoundContent.title;
    const description = page?.description ?? notFoundContent.body;
    const canonicalPath = page?.canonicalPath ?? notFoundContent.canonicalPath;
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: page?.noindex === false ? 'index, follow' : 'noindex, nofollow' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:locale', content: 'es_ES' });
    this.setCanonical(`${siteUrl}${canonicalPath}`);
    this.setJsonLd(page ? schemaForPage(siteUrl, page) : []);
  }

  private siteUrl(): string {
    return siteConfig.siteUrl;
  }

  private setCanonical(href: string): void {
    const existing = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const link = existing ?? this.document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', href);
    if (!existing) this.document.head.appendChild(link);
  }

  private setJsonLd(nodes: unknown[]): void {
    this.document.querySelectorAll('script[data-hf-jsonld]').forEach((node) => node.remove());
    for (const node of nodes) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-hf-jsonld', 'true');
      script.textContent = JSON.stringify(node);
      this.document.head.appendChild(script);
    }
  }
}
