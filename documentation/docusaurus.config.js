module.exports = {
  title: 'Restyle',
  tagline:
    'A type-enforced system for building UI components in React Native with TypeScript.',
  url: 'https://restyle.docs.shopify.io',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/shopify-logo.svg',
  organizationName: 'Shopify',
  projectName: 'restyle',
  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    prism: {
      additionalLanguages: ['ruby', 'sql'],
    },
    navbar: {
      title: 'Restyle',
      logo: {
        alt: 'Shopify Logo',
        src: 'img/shopify-logo.svg',
      },
      items: [
        {
          href: 'https://github.com/shopify/restyle',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting started',
              to: '/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              to: 'https://discord.gg/njT6GY46',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/shopify/restyle',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Shopify Inc.`,
    },
  },
  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        docsDir: 'docs',
        indexPages: true,
        docsRouteBasePath: '/',
      },
    ],
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/shopify/restyle/edit/master/docusaurus/',
        },
        blog: false,
        pages: false,
        sitemap: false,
      },
    ],
  ],
};
