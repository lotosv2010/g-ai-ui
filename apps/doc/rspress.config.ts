import { defineConfig } from 'rspress/config'

export default defineConfig({
  title: 'g-ai-ui',
  description: '面向 AI 场景的 React 组件与工具函数体系',
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
        text: '快速开始',
        link: '/guide/getting-started',
      },
      {
        text: '组件能力',
        link: '/components/',
        activeMatch: '^/components/',
      },
      {
        text: '工程实践',
        items: [
          {
            text: '工具函数',
            link: '/guide/utils',
          },
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
          text: '项目接入',
          items: [
            '/guide/getting-started',
          ],
        },
        {
          text: '能力与实践',
          items: [
            '/guide/components',
            '/guide/utils',
            '/guide/web',
            '/guide/theming',
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
