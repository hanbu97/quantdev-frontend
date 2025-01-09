# Quantdev Frontend

Quantdev 是一个现代化的量化交易前端平台，提供实时市场数据监控和交易管理功能。

## 技术栈

### 核心框架
- Next.js 15.1.3 (使用 App Router)
- React 19
- TypeScript 5.x

### UI 组件和样式
- Tailwind CSS 3.4.1
- Radix UI 组件库
  - Dialog
  - Navigation Menu
  - Scroll Area
  - Switch
  - Tabs
  - Toast
  - Alert Dialog
  - Label
- Lucide React (图标库)
- Geist (字体)
- class-variance-authority (样式变体管理)
- tailwind-merge (Tailwind 类合并)
- tailwindcss-animate (动画库)

### 网络和数据
- Axios 1.7.9 (HTTP 请求)
- Socket.IO Client 4.8.1 (WebSocket 通信)

### 开发工具
- TurboRepo (开发服务器)
- ESLint (代码规范)
- PostCSS (CSS 处理器)

## 功能特性

- 📊 实时市场数据监控
- 🔄 交易所配置管理
- 📈 延迟监控图表
- ⚙️ 系统设置
- 📚 文档支持

## 快速开始

### 环境要求

- [Bun](https://bun.sh) 1.0 或更高版本

### 安装

```bash
# 克隆项目
git clone [your-repository-url]

# 进入项目目录
cd quantdev-frontend

# 安装依赖
bun install

# 启动开发服务器
bun dev
```

项目将在 `http://localhost:3000` 启动。

## 主要页面

### 首页 ([`/`](src/app/page.tsx))
- 多交易所实时延迟监控
- 交易所间价差分析

### 交易所 ([`/exchanges`](src/app/exchanges/page.tsx))
- 交易所币对数量显示
- 交易对搜索（各交易所支持情况）

### 文档 ([`/docs`](src/app/docs/page.tsx))
- 简单的文档示例

### 设置 ([`/settings`](src/app/settings/page.tsx))
- 查看/修改价差阈值

## 项目结构

### [`src/app`](src/app)
Next.js 15 App Router 页面目录：
- [`/page.tsx`](src/app/page.tsx) - 首页，展示延迟和价差监控
- [`/exchanges/page.tsx`](src/app/exchanges/page.tsx) - 交易所管理页面
- [`/docs/page.tsx`](src/app/docs/page.tsx) - 文档页面
- [`/settings/page.tsx`](src/app/settings/page.tsx) - 设置页面
- [`layout.tsx`](src/app/layout.tsx) - 全局布局组件

### [`src/apis`](src/apis)
API 接口和数据处理：
- [`/config`](src/apis/config) - 配置相关 API（价差阈值等）
- [`/data`](src/apis/data) - 数据相关 API（交易所数据等）

### [`src/components`](src/components)
可复用组件：
- [`/ui`](src/components/ui) - 基础 UI 组件（按钮、输入框等）
- [`Navigation.tsx`](src/components/Navigation.tsx) - 导航栏组件
- [`LatencyChart.tsx`](src/components/LatencyChart.tsx) - 延迟图表组件

### [`src/contexts`](src/contexts)
React Context 状态管理：
- [`SocketContext.tsx`](src/contexts/SocketContext.tsx) - WebSocket 连接管理
- [`ThemeContext.tsx`](src/contexts/ThemeContext.tsx) - 主题管理

### [`src/hooks`](src/hooks)
自定义 React Hooks：
- [`useSocket.ts`](src/hooks/useSocket.ts) - WebSocket 连接 Hook
- [`useToast.ts`](src/hooks/use-toast.ts) - 消息提示 Hook

### [`src/lib`](src/lib)
工具函数和通用逻辑：
- [`utils.ts`](src/lib/utils.ts) - 通用工具函数
- [`api.ts`](src/lib/api.ts) - API 请求封装

### [`src/config`](src/config)
配置文件：
- [`api.ts`](src/config/api.ts) - API 配置
- [`constants.ts`](src/config/constants.ts) - 常量定义



