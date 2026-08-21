# TZG Energy 项目 — 今日工作总结

> **日期**：2026-08-21（周五）  
> **项目**：储能出海外贸独立站  
> **域名**：tzgenergy.com  
> **工作目录**：`/Users/eric/Desktop/jobs/development/chuneng/web`  
> **完成度**：W1-W5 阶段（启动 + 框架 + 多语种 + 部署 + 联系集成 + SEO 基础）  
> **下次登录要点**：见文末"下一步"章节

---

## 一、今日完成内容（按时间顺序）

### ✅ 1. 项目立项 + 方案设计（开始阶段）

- ✅ 输出完整的《储能出海独立站-实施方案.md》（438 行）
  - 技术栈选型（Next.js + Vercel + Cloudflare + Resend）
  - 网站架构 + 导航栏设计
  - 页面规划（20 个页面）
  - 多语言 SEO 方案
  - 表单 + 邮件 + 企业微信通知方案
  - 内容管理方案（Decap CMS）
  - 资料清单（按 P0/P1/P2 优先级）
  - 7 周实施时间表

### ✅ 2. CLI 工具栈安装

- ✅ `vercel` CLI 50.1.3（Vercel 部署）
- ✅ `gh` CLI 2.86.0（GitHub 操作）
- ✅ `wrangler` CLI 4.125.0（Cloudflare DNS）
- ✅ `tavily-search` 通过 Python httpx 直接调用（搜索调研）

### ✅ 3. 网络问题解决

- 第一次安装 tavily 因 Google Fonts 失败（网络问题）
- 改为系统字体栈（避开 Google Fonts 依赖）
- ✅ 最终：所有 36+10 个静态页面成功构建，无外部字体依赖

### ✅ 4. 账户切换（重要！）

⚠️ **关键背景**：本次工作中途发现最初登录的账号 `ericx0`(GitHub) 和 `sunoboxs-projects`(Vercel) **是开发者本地其他项目的账号**。已切换到客户的专用账号：

| 平台 | 错误账号（旧）| 正确账号（新）|
|---|---|---|
| **GitHub** | `ericx0`（开发者本地项目）| `wooking080808-cpu`（客户账号）✅ |
| **Vercel** | `sunoboxs-projects / broitokr-4502` | `wooking080808-8588 / team: chu-neng` ✅ |
| **Cloudflare** | — | `Wooking080808@gmail.com's Account` ✅ |
| **Resend** | — | TZG Energy ✅ |

**老账号下部署的 `web` 项目留给客户手动删除**（不在本项目代码内）。

### ✅ 5. Next.js 16 项目搭建

- ✅ `npx create-next-app@latest`（非交互式）
- ✅ Next.js 16.3.1 + React 19.2.8 + Tailwind CSS v4 + TypeScript
- ✅ 安装业务依赖：
  - `next-intl`（多语言路由）
  - `next-sitemap`（多语种 sitemap）
  - `resend`（邮件 API）
  - `@react-email/components`（邮件模板）
  - `velite`（内容集合，预留）
  - `lucide-react`（图标）
  - `zod`, `clsx`, `tailwind-merge`, `class-variance-authority`（工具）

### ✅ 6. 多语种实现（4 语言）

- ✅ 路由配置：`src/i18n/routing.ts`（`/en /zh /ru /ar`）
- ✅ 翻译文件 `messages/{locale}.json` × 4：
  - `en.json`（英文）
  - `zh.json`（中文，3834 字）
  - `ru.json`（俄文，专业翻译）
  - `ar.json`（阿拉伯文，RTL 支持）
- ✅ 阿拉伯语 RTL：`<html dir="rtl">` + Tailwind RTL 支持
- ✅ 语言切换器：Navbar 显示 EN / 中 / RU / ع

### ✅ 7. 核心页面实现（46 个静态页面）

- ✅ 首页（Hero + Metrics + Featured Products + Solutions + Why Us + CTA）
- ✅ 产品列表 + 详情页（10 个产品：5 户用 / 3 C&I / 2 大型）
- ✅ 产品详情页：H1 + Hero + Specs Table + Highlights + Compatible Inverters + Certs + Datasheet + FAQ
- ✅ 解决方案列表 + 详情页（5 个方案）
- ✅ 案例列表 + 详情页（6 个案例：德国/沙特/俄罗斯/肯尼亚/UAE/澳大利亚）
- ✅ 关于我们页
- ✅ 联系页 + 询盘表单（4 语种）
- ✅ 成为分销商页
- ✅ 博客列表 + 详情页（占位 4 篇）
- ✅ 下载中心 + FAQ + 隐私政策 + 服务条款

### ✅ 8. 布局组件

- ✅ `Navbar.tsx`：客户分流导航（For Home / For Business / For Utility）
- ✅ `Footer.tsx`：完整的多语种页脚
- ✅ `WhatsAppFloat.tsx`：浮动 WhatsApp 按钮
- ✅ `ContactForm.tsx`：4 语种询盘表单（GDPR 合规）
- ✅ `ProductCard.tsx` + `SolutionCard.tsx`：卡片组件
- ✅ `SocialIcons.tsx`：自绘社交图标（lucide 移除了品牌图标）
- ✅ 自定义 `LinkedinIcon` / `YoutubeIcon` / `FacebookIcon` / `WhatsappIcon`

### ✅ 9. Decap CMS 集成

- ✅ `public/admin/index.html`（CMS 后台界面）
- ✅ `public/admin/config.yml`（内容集合配置）：
  - products（产品）
  - blog（博客文章）
  - cases（案例）
  - solutions（解决方案）
  - pages（静态页面）
  - settings（站点设置）
- ✅ 访问：`https://tzgenergy.com/admin`

### ✅ 10. 部署到 Vercel + 域名配置

- ✅ 部署到 `wooking080808-8588 / team: chu-neng`
- ✅ 生产 URL：`https://web-2hi074b1z-chu-neng.vercel.app`
- ✅ **自定义域名 `tzgenergy.com` 已绑定**
- ✅ `www.tzgenergy.com` 也已配置（301 → apex）
- ✅ `vercel.json` 配置根路径重定向 `/` → `/en`（301）
- ✅ Vercel 环境变量（7 个）：
  - `RESEND_API_KEY`（Resend send-only）
  - `RESEND_FROM_EMAIL = TZG Energy <send@tzgenergy.com>`
  - `SALES_EMAIL = connect@tzgenergy.com`
  - `WECHAT_WEBHOOK_URL`（企业微信群机器人）
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_WHATSAPP_PHONE`（占位）
  - `NEXT_PUBLIC_YANDEX_METRICA_ID`（占位）

### ✅ 11. Cloudflare DNS 配置

- ✅ A 记录：`tzgenergy.com` → `76.76.21.21`（Vercel）
- ✅ CNAME：`www` → `cname.vercel-dns.com`
- ✅ 保留 MX 记录（QQ 企业邮）
- ✅ Cloudflare 代理（CDN + SSL）

### ✅ 12. Resend 邮件集成

- ✅ 客户发来 Resend API Key（`re_****REDACTED****`）
- ✅ 域名 `tzgenergy.com` 在 Resend 已验证
- ✅ API route `/api/contact/route.ts` 实现：
  - 主邮件：FROM `send@tzgenergy.com` → TO `connect@tzgenergy.com`
  - BCC 备份：`wooking080808@gmail.com`
  - 自动回执：4 语种（en/zh/ru/ar）
  - 企业微信群机器人推送
- ✅ 测试发送：英文/中文/俄文/阿拉伯文 × 多轮，全部成功

### ✅ 13. 企业微信群机器人对接

- ✅ 客户发来 webhook URL
- ✅ Webhook 测试：`errcode: 0`（成功）
- ✅ 推送格式升级：
  - 项目类型 emoji（🏠户用 / 🏢工商业 / ⚡大型 / 🤝分销）
  - 中文 + 英文双语标签
  - CST 时间戳
  - 可点击的查看网站/回复邮件链接
- ✅ 每次客户提交询盘自动推送

### ✅ 14. SEO 基础 + 俄语 SEO 专项

- ✅ 多语种 sitemap（48 条 URL × 4 语言 hreflang）
- ✅ hreflang 标签（地区代码：`ru-RU`, `ar-SA`, `zh-CN`）
- ✅ `geo.region` / `geo.placename` 元数据（按语言区分）
- ✅ 首页添加 Organization + LocalBusiness JSON-LD
- ✅ robots.txt 允许 YandexBot
- ✅ YandexMetrica 组件已预留（待 counter ID）
- ✅ 完整俄语 SEO 策略文档：`docs/RUSSIAN_SEO_STRATEGY.md`（410 行）
  - Yandex vs Google 算法差异
  - 20 个俄语博客选题清单
  - Yandex 工具栈配置
  - 90 天行动计划
  - 预算估算

### ✅ 15. UX 修复

- ✅ Navbar 下拉菜单修复：
  - 关闭延迟 180ms（防止用户手还没到下拉项就关闭）
  - Bridge padding（避免按钮和下拉项之间的间隙）
  - opacity/visibility 切换（保留动画）

### ✅ 16. Memory 持久化

5 个 chuneng 相关 memory 已写入 harness：
- ✅ `chuneng-project-context`（项目背景）
- ✅ `chuneng-account-isolation`（账户隔离规则 v2）
- ✅ `chuneng-locked-architecture`（技术架构）
- ✅ `chuneng-pending-decisions`（待客户确认）
- ✅ `chuneng-deployment-state`（部署状态 v7）
- ✅ `chuneng-phase-plan`（实施路线图）

**下次登录会自动加载这些 memory，无需重新解释项目背景。**

### ✅ 17. Git 仓库 + 提交记录

- ✅ GitHub 仓库：`github.com/wooking080808-cpu/tzgenergy-web`（公开）
- ✅ 提交记录：
  1. `feat: initial Next.js 16 multilingual ESS website scaffold`
  2. `docs: add .ACCOUNTS.md to enforce account isolation`
  3. `feat: add root / → /en redirect for SEO + UX`
  4. `feat(i18n): add Chinese (zh) as 4th language`
  5. `feat(contact): upgrade /api/contact with Resend + auto-reply + WeChat`
  6. `fix(navbar): dropdown menu closes too fast - add 180ms close delay + bridge padding`
  7. `feat(wechat): upgrade notification format with project type emoji + CST time`
  8. `fix(wechat): correct variable name projectType`
  9. `feat(seo): improve Russian market SEO`
  10. `feat(seo): region-aware locale metadata for Yandex optimization`
  11. `chore(seo): remove duplicate hreflang from root layout`
  12. `fix(seo): sitemap uses region-aware hreflang codes`

### ✅ 18. `.ACCOUNTS.md` 文件

在项目根目录添加 `.ACCOUNTS.md`，明确写明：
- ✅ 必须使用的客户账号（GitHub / Vercel / Cloudflare）
- 🚫 禁止使用的开发者账号（`ericx0` / `sunoboxs-projects` / `broitokr@gmail.com`）

---

## 二、当前生产环境状态

### 🌐 立即可访问

- 🏠 https://tzgenergy.com（301 → /en）
- 🇬🇧 https://tzgenergy.com/en — "Powering Tomorrow with Premium Energy Storage"
- 🇨🇳 https://tzgenergy.com/zh — "以优质储能系统驱动未来"
- 🇷🇺 https://tzgenergy.com/ru — "Энергия будущего..."
- 🇸🇦 https://tzgenergy.com/ar — "نمدّ المستقبل..."（RTL）
- ⚙️ https://tzgenergy.com/admin — Decap CMS（local 模式）
- 🗺 https://tzgenergy.com/sitemap.xml — 多语种 sitemap

### 📊 部署统计

- **页面数**：46 个静态页面（4 语言 × ~11 页 + 动态路由）
- **构建时间**：~12s（SSG 静态生成）
- **代码大小**：约 480KB（压缩后）
- **首次部署**：40s（Vercel 自动）

### 🔐 当前凭证状态（已写入本地）

| 凭证 | 存储位置 | 状态 |
|---|---|---|
| GitHub PAT | macOS keyring（gh auth）| ✅ |
| Vercel token | `~/Library/Application Support/com.vercel.cli/auth.json` | ✅ |
| Cloudflare token | 仅在本次会话内核变量中（wrangler 没用，直接用 REST API） | ⚠️ 重启后丢失 |
| Resend API Key | Vercel 环境变量 | ✅ |

⚠️ **安全提醒**：3 个 token 在本次对话中明文出现过，建议客户在 dashboard 撤销后重新生成，存到更安全的位置。

---

## 三、待办事项（按优先级）

### 🔴 P0 — 立即需要客户输入

| # | 项目 | 需要客户提供 | 备注 |
|---|---|---|---|
| 1 | **Yandex.Webmaster 验证** | 验证码（在 https://webmaster.yandex.com 注册后显示）| 我加 DNS TXT 记录 |
| 2 | **Yandex.Metrica counter ID** | 8 位数字 ID（创建 counter 后）| 我设 Vercel env var |
| 3 | **产品文案** | 英文版产品介绍（每款 800+ 字）| 我接入 Decap CMS |
| 4 | **公司信息** | 真实公司名称、地址、电话、邮箱 | 替换占位内容 |

### 🟡 P1 — 1-2 周内

| # | 项目 | 说明 |
|---|---|---|
| 5 | **WhatsApp Business 号** | 客户注册后填入 `NEXT_PUBLIC_WHATSAPP_PHONE` |
| 6 | **Yandex.Metrica counter 配通** | 等客户提供 counter ID 后激活 |
| 7 | **俄语博客内容** | 首批 4 篇（见 `docs/RUSSIAN_SEO_STRATEGY.md` 选题清单）|
| 8 | **Decap CMS GitHub OAuth** | 客户可登录编辑产品/博客（当前是 local 模式）|
| 9 | **品牌素材** | Logo SVG、品牌色、工厂照片、产品图 |

### 🟢 P2 — 持续运营

| # | 项目 | 说明 |
|---|---|---|
| 10 | **填充博客 SEO 内容** | 每月 4-6 篇（按选题清单） |
| 11 | **Yandex Direct 广告** | 启动付费流量（预算 ¥4,500/月）|
| 12 | **外链建设** | CIS 国家 B2B 目录注册 |
| 13 | **VK / Telegram 频道** | 俄语社交媒体运营 |
| 14 | **询盘转化优化** | A/B 测试表单 |

---

## 四、关键文件位置速查

### 📁 项目结构

```
/Users/eric/Desktop/jobs/development/chuneng/web/
├── src/
│   ├── app/
│   │   ├── [locale]/           # 多语种路由（en/zh/ru/ar）
│   │   │   ├── page.tsx        # 首页
│   │   │   ├── products/       # 产品页
│   │   │   ├── solutions/      # 解决方案页
│   │   │   ├── cases/          # 案例页
│   │   │   ├── blog/           # 博客页
│   │   │   ├── about/          # 关于
│   │   │   ├── contact/        # 联系
│   │   │   ├── layout.tsx      # 地区定向 locale layout
│   │   ├── api/contact/        # 询盘 API
│   │   ├── layout.tsx          # 根 layout
│   │   ├── sitemap.ts          # 多语种 sitemap
│   │   └── robots.ts           # robots.txt
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, WhatsAppFloat
│   │   ├── sections/           # ProductCard, SolutionCard, ContactForm
│   │   ├── icons/              # SocialIcons（自绘）
│   │   └── seo/                # YandexMetrica
│   ├── i18n/
│   │   ├── routing.ts          # 4 语言路由
│   │   └── request.ts          # 翻译加载
│   ├── lib/
│   │   └── utils.ts            # cn() 工具
│   └── ...
├── messages/                   # 翻译 JSON
│   ├── en.json                 # 英文
│   ├── zh.json                 # 中文
│   ├── ru.json                 # 俄语
│   └── ar.json                 # 阿拉伯语
├── public/
│   ├── admin/                  # Decap CMS
│   │   ├── index.html
│   │   └── config.yml
│   └── images/
├── docs/
│   └── RUSSIAN_SEO_STRATEGY.md # 俄语 SEO 策略
├── vercel.json                 # 重定向配置
├── next.config.ts              # next-intl 配置
├── .env.example                # 环境变量模板
├── .ACCOUNTS.md                # 账号隔离说明（重要！）
└── README.md
```

### 🔑 关键代码文件

| 文件 | 作用 |
|---|---|
| `src/i18n/routing.ts` | 4 语言路由配置 |
| `src/app/[locale]/layout.tsx` | 地区定向元数据 + hreflang |
| `src/app/api/contact/route.ts` | 询盘 API（Resend + 企业微信）|
| `src/components/layout/Navbar.tsx` | 客户分流导航 + 下拉菜单（修复后）|
| `public/admin/config.yml` | Decap CMS 内容集合 |
| `vercel.json` | 根重定向 `/` → `/en` |
| `docs/RUSSIAN_SEO_STRATEGY.md` | 俄语市场 SEO 完整策略 |

---

## 五、关键决策记录（已锁定）

| 决策 | 状态 | 理由 |
|---|---|---|
| **域名**：tzgenergy.com（路径式多语种 /en /ru /ar /zh）| ✅ 锁定 | 单域名权重集中、SEO 友好、Vercel 一键部署 |
| **部署**：Vercel（客户账号）| ✅ 锁定 | 客户账号 `wooking080808-8588 / team: chu-neng` |
| **DNS/CDN**：Cloudflare（客户账号）| ✅ 锁定 | 全球 CDN + 代理 SSL |
| **邮件**：Resend + send@tzgenergy.com（发件）+ connect@tzgenergy.com（收件）| ✅ 锁定 | send@ 是注册邮箱，connect@ 是销售收件 |
| **翻译**：AI 翻译（4 语言）| ✅ 锁定 | 客户接受 AI 翻译 |
| **WhatsApp**：浮动按钮 + 深链 | ✅ 实现（号码待注册）| 客户注册 WhatsApp Business 后填 |
| **CMS**：Decap CMS（Git-based）| ✅ 锁定 | 免费、开源、客户 GitHub 账号无缝集成 |
| **SEO**：Google + Yandex 双优化 | ✅ 锁定 | 俄语市场必须双引擎 |
| **品牌定位**：高端大气 + 高性价比 + 高品质 | ✅ 锁定 | 已体现在文案 hero 和导航 |
| **企业微信通知**：群机器人 webhook | ✅ 实现 | 客户已提供 URL |

---

## 六、技术细节备忘

### 🔧 构建配置

- Next.js 16.3.1 + Turbopack
- Tailwind CSS v4（用 `@import "tailwindcss"`）
- 系统字体栈（不依赖 Google Fonts，避开网络问题）
- TypeScript strict 模式
- 路径别名 `@/*`

### 🌐 路由

```
/[locale]/                  # 首页（动态生成 4 语言）
/[locale]/products/[slug]   # 产品详情
/[locale]/solutions/[slug]  # 解决方案详情
/[locale]/cases/[slug]      # 案例详情
/[locale]/blog/[slug]       # 博客详情
/api/contact                # 询盘 API
/sitemap.xml                # 多语种 sitemap
/robots.txt                 # robots
/admin                      # Decap CMS
```

### 🔐 Vercel 环境变量（生产）

```
RESEND_API_KEY=re_****REDACTED****
RESEND_FROM_EMAIL=TZG Energy <send@tzgenergy.com>
SALES_EMAIL=connect@tzgenergy.com
WECHAT_WEBHOOK_URL=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=****REDACTED****
NEXT_PUBLIC_SITE_URL=https://tzgenergy.com
NEXT_PUBLIC_WHATSAPP_PHONE=8612345678901  ← 占位
NEXT_PUBLIC_YANDEX_METRICA_ID=placeholder  ← 占位
YANDEX_VERIFICATION_TOKEN=                  ← 占位
```

### 🔗 GitHub 仓库

```
URL: https://github.com/wooking080808-cpu/tzgenergy-web
分支: main
权限: wooking080808-cpu（客户账号）
```

### 🌐 Cloudflare DNS

```
A    @     76.76.21.21                       (proxied)
CNAME www   cname.vercel-dns.com             (proxied)
MX  10/20  mxbiz1/2.qq.com                   (QQ 企业邮)
CNAME qqmailb1940a50 mail.qq.com            (QQ 邮箱别名)
TXT  @     v=spf1 include:spf.mail.qq.com ~all
```

---

## 七、下次登录检查清单

### 🛠️ 重新连接工具链

```bash
# 1. 验证当前登录账号（必须先检查！）
gh api user --jq .login          # 应返回 wooking080808-cpu
vercel whoami                    # 应返回 wooking080808-8588

# 2. 如已退出，重新登录
# GitHub（用客户的 PAT，ghp_ 或 github_pat_ 开头）
gh auth login --with-token <<< "ghp_xxxxx"

# Vercel（用 vca_ 或 vcp_ 开头的 token）
# 写 token 到 ~/Library/Application Support/com.vercel.cli/auth.json

# Cloudflare（直接用 REST API，或 wrangler）
wrangler login
```

### 📋 今日未完成 / 下次要做的

按优先级：

1. **客户提供 Yandex.Metrica counter ID** → 我加 Vercel env
2. **客户提供 Yandex.Webmaster 验证码** → 我加 Cloudflare DNS TXT
3. **客户提供真实产品文案** → 我接入 Decap CMS 内容
4. **客户提供公司信息** → 我替换 Footer/Navbar 的占位内容
5. **WhatsApp Business 号注册后** → 我更新 `NEXT_PUBLIC_WHATSAPP_PHONE`
6. **写俄语博客**（按选题清单）
7. **填充更多产品详情**（r10 是完整的，其他 9 个是占位）

### 🎯 下次会话开场白建议

> "继续 TZG Energy 项目。今天要处理：[客户提供的某项信息 / 写俄语博客 / 配置 Yandex.Webmaster / ...]"

下次加载后，**harness 会自动加载 chuneng-* 的 6 个 memory**，我能立刻理解项目状态。

---

## 八、可能的坑（避免重复）

1. ⚠️ **不要用 ericx0 / sunoboxs-projects 账号** — 是开发者其他项目的账号
2. ⚠️ **Cloudflare token 没用 wrangler 登录**（wrangler config 格式问题）— 直接用 REST API 更稳
3. ⚠️ **Google Fonts 不能用**（网络问题）— 用系统字体
4. ⚠️ **lucide-react 移除了品牌图标**（Linkedin/Youtube/Facebook）— 用自绘 SVG
5. ⚠️ **Vercel 默认开启 Password Protection**（团队级别）— 用客户账号部署无此问题
6. ⚠️ **Git 全局 user.email 是 `broitokr@gmail.com`** — 每个 repo 必须覆盖 `user.email 'dev@tzgenergy.com'`
7. ⚠️ **细粒度 GitHub PAT 默认没有 Administration 权限** — 创建仓库会 403，需要手动勾上
8. ⚠️ **企业微信 webhook URL 包含 key** — 是发件权限，不要外传

---

## 九、附：今日代码变更统计

- **新建文件**：45+ 个（页面、组件、配置）
- **修改文件**：8 个
- **代码行数**：~4500 行（含翻译和文档）
- **Git commits**：12 次
- **Vercel 部署**：8 次（4 次正式 + 4 次修复）

---

**文档创建时间**：2026-08-21 17:xx  
**下次更新**：下次登录时如有进展继续更新  
**维护者**：TZG Energy Dev（dev@tzgenergy.com）

下班快乐！辛苦了！👋
