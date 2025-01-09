export default {
  themeConfig: {
    sidebar: {
      '/libraries/': [
        {
          text: 'QuantDev 库',
          items: [
            { text: '总览', link: '/libraries/' }
          ]
        },
        {
          text: 'Core 核心库',
          collapsed: false,
          items: [
            { text: '核心功能概述', link: '/libraries/core/' },
            { text: '配置指南', link: '/libraries/core/configuration' },
            { text: 'API参考', link: '/libraries/core/api-reference' }
          ]
        },
        {
          text: 'Data 数据库',
          collapsed: false,
          items: [
            { text: '数据库概述', link: '/libraries/data/' },
            { text: '数据源', link: '/libraries/data/data-sources' },
            { text: '数据处理', link: '/libraries/data/data-processing' }
          ]
        },
        {
          text: 'ML 机器学习',
          collapsed: false,
          items: [
            { text: 'ML库概述', link: '/libraries/ml/' },
            { text: '模型介绍', link: '/libraries/ml/models' },
            { text: '训练指南', link: '/libraries/ml/training' }
          ]
        },
        {
          text: 'Trading 交易',
          collapsed: false,
          items: [
            { text: '交易系统概述', link: '/libraries/trading/' },
            { text: '策略开发', link: '/libraries/trading/strategies' },
            { text: '执行系统', link: '/libraries/trading/execution' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hanbu97/quantdev' }
    ]
  }
} 