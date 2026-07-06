export type UreesPage = {
  handle: string;
  title: string;
  bodyHtml: string;
};

export type UreesPolicy = {
  handle: string;
  title: string;
  bodyHtml: string;
};

export type UreesArticle = {
  handle: string;
  title: string;
  publishedAt: string;
  bodyHtml: string;
  image: string;
  path: string;
};

export type UreesHomepageSections = {
  heroImage: string;
  hero: {
    headline: string;
    cta: { label: string; href: string };
  };
  dreaming: {
    title: string;
    image: string;
  };
  reviving: Array<{
    title: string;
    image: string;
  }>;
};

export type UreesSiteData = {
  syncedAt: string;
  pages: UreesPage[];
  policies: UreesPolicy[];
  articles: UreesArticle[];
  homepage: UreesHomepageSections;
};
