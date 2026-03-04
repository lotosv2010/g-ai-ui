import { defineConfig } from 'rspress/config'

export default defineConfig({
  title: 'g-ai-ui',
  description: '面向 AI 场景的 React 组件与工具函数体系',
  icon: '/rspress-icon.svg',
  lang: 'zh-CN',
  ssg: false,
  markdown: {
    showLineNumbers: true,
  },
  themeConfig: {
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
        text: '组件',
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
            text: 'Web Playground',
            link: '/guide/web',
          },
          {
            text: '样式定制',
            link: '/guide/theming',
          },
        ],
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '项目接入',
          items: ['/guide/getting-started'],
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
      '/components/': [
        {
          text: '核心组件',
          items: [
            { text: 'Welcome 欢迎区', link: '/components/welcome' },
            { text: 'Conversations 会话列表', link: '/components/conversations' },
            { text: 'Prompts 快捷提示', link: '/components/prompts' },
            { text: 'Attachments 附件列表', link: '/components/attachments' },
            { text: 'Bubble 消息气泡', link: '/components/bubble' },
            { text: 'Sender 输入发送器', link: '/components/sender' },
          ],
        },
      ],
    },
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/lotosv2010/g-ai-ui',
      },
    ],
  },
})
