export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

const SUFFIXE_MARQUE = 'Celine Lefevre - Ayurveda & Sante feminine';

export function buildPageTitle(title?: string): string {
  return title ? `${title} | ${SUFFIXE_MARQUE}` : SUFFIXE_MARQUE;
}
