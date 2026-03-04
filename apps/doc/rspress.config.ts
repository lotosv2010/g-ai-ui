import { defineConfig } from 'rspress/config'

export default defineConfig({
  title: 'Turborepo ui',
  description: '一个现代化的组件库演示项目',
  icon: '/rspress-icon.svg',
  lang: 'zh-CN',
  markdown: {
    showLineNumbers: true,
  },
  themeConfig: {
    // 导航栏配置
    nav: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '指南',
        link: '/guide/getting-started',
      },
      {
        text: '组件',
        link: '/components/',
        activeMatch: '^/components/',
      },
      {
        text: '更多',
        items: [
          {
            text: '主题定制',
            link: '/guide/theming',
          },
          {
            text: 'Web 应用',
            link: '/guide/web',
          }
        ],
      },
    ],
    // 侧边栏配置（左侧导航）
    sidebar: {
      // 指南页面的侧边栏
      '/guide/': [
        {
          text: '开始使用',
          items: [
            '/guide/getting-started',
          ],
        },
        {
          text: '深入指南',
          items: [
            '/guide/components',
            '/guide/utils',
            '/guide/theming',
            '/guide/web',
          ],
        },
      ],
      // 组件页面的侧边栏
      '/components/': [
        {
          text: '对话组件',
          items: [
            {
              text: 'ChatBubble 对话气泡',
              link: '/components/chat-bubble',
            },
            {
              text: 'ChatInput 对话输入',
              link: '/components/chat-input',
            },
          ],
        },
      ],
    },
    // 社交链接（右上角图标）
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/lotosv2010/g-ai-ui',
      },
    ],
  },
})
