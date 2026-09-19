import { defineCocoWikiConfig } from 'cocowiki'

export default defineCocoWikiConfig({
  title: 'CoCoWiki 文档',
  description: 'CoCoWiki 的使用指南、配置参考与页面示例。',
  lang: 'zh-CN',
  // 部署到子目录时可改为 '/my-wiki/'，根目录部署保持 '/'。
  base: '/',
  logo: '/cocowiki-logo.png',
  favicon: '/favicon.png',
  navigation: [
    { text: '首页', link: '/' },
    {
      text: '开始使用',
      link: '/guide/introduction',
      items: [
        { text: '认识 CoCoWiki', link: '/guide/introduction' },
        { text: '快速开始', link: '/guide/getting-started' },
        { text: '项目目录', link: '/guide/project-structure' }
      ]
    },
    {
      text: '内容创作',
      link: '/content/markdown',
      items: [
        { text: 'Markdown 与扩展', link: '/content/markdown' },
        { text: 'Frontmatter', link: '/content/frontmatter' },
        { text: '三种页面形式', link: '/content/page-types' },
        { text: '使用 Vue 组件', link: '/content/vue-components' }
      ]
    },
    {
      text: '站点能力',
      link: '/features/search-and-archive',
      items: [
        { text: '搜索与归档', link: '/features/search-and-archive' },
        { text: '贡献者与署名', link: '/features/contributors' },
        { text: '图鉴示例', link: '/atlas' },
        { text: '归档索引', link: '/archive' }
      ]
    },
    {
      text: '配置与发布',
      link: '/config/site',
      items: [
        { text: '站点配置', link: '/config/site' },
        { text: '首页与导航', link: '/config/home-and-navigation' },
        { text: '布局与主题', link: '/config/layout-and-theme' },
        { text: '配置参考', link: '/reference/config' },
        { text: 'CLI 命令', link: '/reference/cli' },
        { text: '构建与部署', link: '/deployment/build-and-deploy' }
      ]
    }
  ],
  home: {
    visual: {
      image: '/cocowiki-logo.png',
      labels: ['Markdown', 'Vue', 'Search', 'Static', 'Theme', 'Archive']
    }
  },
  search: { enabled: true },
  markdown: { spoiler: true, wikiLink: true },
  content: {
    outline: true,
    showPrevNext: true,
    showLastUpdated: true
  }
})
