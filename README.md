# SpaceMV-ScAI Frontend

<div align="center">

[![License](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Build](https://img.shields.io/badge/Build-Rspack%20%2B%20Webpack-8DD6F9?logo=webpack&logoColor=black)](./package.json)
[![Graphics](https://img.shields.io/badge/Graphics-WebGL-990000?logo=webgl&logoColor=white)](https://www.khronos.org/webgl/)
[![Test](https://img.shields.io/badge/Test-Jest-C21325?logo=jest&logoColor=white)](https://jestjs.io/)

[简体中文](./README.md) | [English](./README_EN.md)

</div>

<img width="2564" height="1536" alt="Gemini_Generated_Image_7urlyp7urlyp7url" src="https://github.com/user-attachments/assets/b018204f-a95b-4f39-a104-1fda4432462f" />

`SpaceMV-ScAI Frontend` 是 `SpaceMV-ScAI` 星座智能管理平台前端客户端，负责卫星三维可视化、传感器与态势分析、星座管理、覆盖仿真结果展示，以及与后端服务、用户手册、ScAI Agent、ADS-B / AIS 等外部系统集成。

项目基于 [KeepTrack.Space](https://github.com/thkruz/keeptrack.space) 二次开发，当前版本已经扩展出登录鉴权、星座上传与删除、覆盖分析、流式仿真结果展示和多服务联动能力。

![Preview](./public/keeptrack10-preview.png)

## 当前版本能力

### 1. 三维可视化

- 地球、卫星、轨道、太阳、月球、星空场景渲染
- 卫星搜索、选中、高亮、轨道显示、信息框展示
- 时间轴、时间机器、夜昼切换、不同视角模式
- 卫星视图、立体地图、行星馆、天象视角

### 2. 传感器与分析

- 传感器列表、传感器详情、自定义传感器
- 单站 / 多站观测几何计算
- 传感器视场、短期围栏、监视围栏、卫星 FOV
- DOP 分析、极坐标图、轨道参考、接近目标分析

### 3. 星座与业务能力

- 星座分类展示：导航、通信、对地观测、自定义
- 星座查询与一键检索
- 星座文件上传、删除、刷新
- 覆盖分析插件
- 单星 / 星座两种级别分析
- 流式展示计算进度与结果
- 支持地面点、线、面目标
- 覆盖分析需要当前用户具备访问权限

### 4. 轨道与空间态势

- 新发射、发射日历、导弹仿真、解体事件
- 碰撞分析、碎片筛查、撞击预测
- 卫星变更、转发器频道数据、国家维度筛选
- ECI / ECF / RIC / Time2Lon / Lat2Lon / Inc2Alt / Inc2Lon 图形分析

### 5. 输出与外部集成

- 截图、屏幕录制、Video Director
- 目录导出：TLE / 3LE / CSV / 视场内目标
- 在线用户手册入口
- ScAI Agent 独立前端接入
- ADS-B / AIS 页面嵌入

## 技术栈

| 分类 | 技术 |
| :--- | :--- |
| 语言 | TypeScript |
| 构建 | Rspack、Webpack、Babel、TSX |
| 渲染 | WebGL、webgl-obj-loader |
| 计算 | Web Workers、ootk、gl-matrix、numeric |
| UI | Materialize CSS、Material Icons |
| 图表 | ECharts、ECharts GL |
| 国际化 | i18next、i18next-browser-languagedetector |
| 测试 | Jest、Testing Library、Cypress |

## 目录结构

| 目录 | 说明 |
| :--- | :--- |
| `src/` | 核心源码 |
| `src/plugins/` | 功能插件 |
| `src/singletons/` | 渲染、目录、时间、输入等核心单例 |
| `src/webworker/` | 位置与轨道计算线程 |
| `src/settings/` | 默认配置、插件开关、运行时设置 |
| `src/auth/` | 登录态读取与鉴权逻辑 |
| `build/` | 构建流程与环境变量读取 |
| `public/` | 静态资源、登录页、贴图、样式、示例数据 |
| `docs/` | Docsify 用户手册源码 |
| `deploy/nginx/` | Nginx 部署配置 |
| `test/` | Jest 测试与测试资源 |

## 运行依赖与接入方式

当前版本默认通过 Nginx 反向代理对外提供服务，而不是直接使用 `npm start` 暴露静态目录。

仓库内已提供可直接复用的 Nginx 配置文件：

- [`deploy/nginx/frontend.conf`](./deploy/nginx/frontend.conf)

### 前端依赖的主要入口

| 能力 | 默认入口 | 说明 |
| :--- | :--- | :--- |
| 登录 | `/api/login` | 登录页提交用户名密码 |
| 注册 | `/api/accountAdd` | 登录页注册表单 |
| 主业务 API | `/api/settings` | 卫星目录、星座、覆盖分析等接口基址 |
| 仿真结果页面 | `/simulation/*` | 覆盖分析结果页面 |
| 用户手册 | `/manual` | Docsify 文档入口 |
| ScAI Agent | `SCAI_AGENT_URL` | 独立前端地址 |
| ADS-B / AIS | `SCAI_ADSB_URL` / `SCAI_AIS_URL` | 外部嵌入页面地址 |

### `TIANXUN_SERVER_SETTINGS` 下当前代码会访问的接口

- `/satellites`
- `/constellations`
- `/constellations_find/:id`
- `/upload_constellation`
- `/simulation_stream`

## 快速开始

### 1. 环境准备

- Node.js `18.x` 及以上
- npm 或 pnpm
- Docker 或宿主机 Nginx
- 现代浏览器，建议 Chrome / Edge

### 2. 安装依赖

```bash
git clone https://github.com/tianxunweixiao/SpaceMV-ScAI-Frontend.git
cd SpaceMV-ScAI-Frontend
npm install
```

### 3. 配置环境变量

复制示例文件：

```bash
cp .env.example .env
```

### 4. 修改 `.env`

重点确认以下配置：

- `TIANXUN_SERVER_LOGIN=/api/login`
- `TIANXUN_SERVER_SETTINGS=/api/settings`
- `USER_MANUAL_URL=/manual`
- `SCAI_AGENT_URL`
- `SCAI_ADSB_URL`
- `SCAI_AIS_URL`

其中：

- `/api/login` 与 `/api/accountAdd` 通过 Nginx 反向代理到账户服务
- `/api/settings/` 通过 Nginx 反向代理到主业务后端
- `/simulation/` 通过 Nginx 反向代理到可视化 / 仿真结果服务
- `/manual/` 通过 Nginx 反向代理到 Docsify 用户手册

### 5. 构建前端产物

开发构建：

```bash
npm run build:dev
```

持续监听构建：

```bash
npm run build:watch
```

生产构建：

```bash
npm run build
```

构建完成后，前端静态文件输出到 `dist/`。

### 6. 可选：启动本地 Docsify 用户手册

```bash
cd docs
docker build -t spacemv-scai-docs .
docker run --rm -p 3000:3000 -v ${PWD}:/docs spacemv-scai-docs
```

如果没有通过 Nginx 代理文档服务，可以临时把 `.env` 中的 `USER_MANUAL_URL` 改成：

```text
http://localhost:3000
```

### 7. 通过 Nginx 启动前端

这是 README 推荐的默认启动方式。

Nginx 配置文件见：

- [`deploy/nginx/frontend.conf`](./deploy/nginx/frontend.conf)

该配置会同时处理：

- `dist/` 静态文件
- `/api/login`、`/api/accountAdd` -> `account-backend-svc:5001`
- `/api/settings/` -> `serve-backend-svc:8401`
- `/simulation/` -> `visual-backend-svc:8501`
- `/manual/` -> `scai-docs-svc:3000`

#### 方式一：Docker 启动 Nginx

先构建前端：

```bash
npm run build
```

Windows PowerShell：

```powershell
docker run --rm -p 80:80 `
  -v ${PWD}\dist:/opt/project/scai/frontend/dist:ro `
  -v ${PWD}\deploy\nginx\frontend.conf:/etc/nginx/conf.d/default.conf:ro `
  nginx:1.27
```

Linux / macOS：

```bash
docker run --rm -p 80:80 \
  -v "$(pwd)/dist:/opt/project/scai/frontend/dist:ro" \
  -v "$(pwd)/deploy/nginx/frontend.conf:/etc/nginx/conf.d/default.conf:ro" \
  nginx:1.27
```

启动后默认访问：

```text
http://localhost/
```

#### 方式二：宿主机 Nginx 启动

```bash
npm run build
sudo cp deploy/nginx/frontend.conf /etc/nginx/conf.d/scai-frontend.conf
sudo nginx -t
sudo systemctl reload nginx
```

如果不是 `systemd` 环境，也可以执行：

```bash
sudo nginx -s reload
```

#### 使用前说明

- `frontend.conf` 中的 `account-backend-svc`、`serve-backend-svc`、`visual-backend-svc`、`scai-docs-svc` 是服务发现名称。
- 如果不是在 Kubernetes 或同一容器网络内运行，需要把这些名字替换成实际可达地址。
- 配置默认假定前端构建产物挂载到 `/opt/project/scai/frontend/dist`；如果挂载路径不同，需要同步修改 `root`。
- `npm start` 仍可用于本地快速预览 `dist/`，但不是 README 推荐的正式启动方式。

## 环境变量说明

| 变量 | 示例值 | 说明 |
| :--- | :--- | :--- |
| `SETTINGS_PATH` | `public/settings/settingsOverride.js` | 构建时复制到 `dist/settings/settingsOverride.js` 的设置覆写文件 |
| `FAVICON_PATH` | `public/img/favicons/favicon.ico` | 构建时使用的 favicon |
| `LOADING_SCREEN_CSS_PATH` | `public/css/loading-screen.css` | 启动画面样式文件 |
| `STYLE_CSS_PATH` | `public/css/style.css` | 主样式文件 |
| `TEXT_LOGO_PATH` | `public/img/logo.png` | 文本 logo |
| `PRIMARY_LOGO_PATH` | `public/img/logo-primary.png` | 主 logo |
| `SECONDARY_LOGO_PATH` | `public/img/logo-secondary.png` | 次 logo |
| `MODE` | `development` | 构建模式。当前实现中 `.env` 的值会覆盖脚本参数，生产打包前请确认是否需要改成 `production` |
| `IS_PRO` | `false` | 是否启用 Pro 插件路径切换 |
| `TIANXUN_SERVER_LOGIN` | `/api/login` | 登录页构建注入值，建议与反向代理配置保持一致 |
| `TIANXUN_SERVER_SETTINGS` | `/api/settings` | 主业务接口基址 |
| `USER_MANUAL_URL` | `/manual` | 用户手册入口 |
| `SCAI_AGENT_URL` | `http://10.0.10.213:80/` | ScAI Agent 前端地址 |
| `SCAI_ADSB_URL` | `http://10.0.88.5:8511` | ADS-B 页面地址 |
| `SCAI_AIS_URL` | `http://10.0.88.5:8510` | AIS 页面地址 |

## 常用脚本

| 命令 | 说明 |
| :--- | :--- |
| `npm run setenv <name>` | 将 `.env.<name>` 复制为 `.env` |
| `npm run build` | 构建静态产物到 `dist/` |
| `npm run build:dev` | 开发模式构建 |
| `npm run build:watch` | 监听源码变化并持续构建 |
| `npm start` | 仅用于本地快速预览 `dist/`，不作为正式启动方式 |
| `npm test` | 运行 Jest 测试 |
| `npm run lint` | 运行 ESLint |
| `npm run cypress:open` | 打开 Cypress |

## 开发说明

### 登录与权限

- 入口文件 [`src/main.ts`](./src/main.ts) 会在页面加载时检查本地登录态。
- 未登录访问非认证页面时会自动跳转到 [`/login.html`](./public/login.html)。
- 登录信息默认保存在 `localStorage` 的 `auth-token` 和 `user-info`。

### 数据加载逻辑

- 卫星目录优先从 `${TIANXUN_SERVER_SETTINGS}/satellites` 获取。
- 如果请求失败且属于网络不可达，会回退到 `public/tle/tle.json`。
- 星座列表会在启动后拉取并缓存，相关插件复用同一份缓存数据。

### 外部页面接入行为

- `SCAI_AGENT_URL`、`SCAI_ADSB_URL`、`SCAI_AIS_URL` 都支持绝对 URL。
- 如果地址写成 `localhost` 或 `127.0.0.1`，前端会自动替换为当前浏览器访问的主机名，方便局域网联调。

## 故障排查

| 问题 | 排查建议 |
| :--- | :--- |
| 打开首页立即跳到登录页 | 检查 `localStorage` 中是否存在有效的 `auth-token` 和 `user-info` |
| 页面没有卫星数据 | 检查 `/api/settings/satellites` 是否可访问；如果后端不可达，确认 `public/tle/tle.json` 是否存在 |
| 星座列表为空或上传失败 | 检查 `/api/settings/constellations`、`/api/settings/upload_constellation`、`/api/settings/constellations_find/:id` |
| 覆盖分析按钮不可用 | 当前账号需要 `coverageAnalysisPermission=1` |
| Agent / ADS-B / AIS 点击后提示未配置 | 更新 `.env` 对应地址后重新构建，并重新加载 Nginx |
| 在线手册打不开 | 检查 `USER_MANUAL_URL` 是否可访问，或是否已正确代理到 `docs/` 服务 |
| 改了 `.env` 但页面没变化 | 重新执行构建，并重新加载 Nginx 配置 |

## 致谢

- 原始开源项目：[KeepTrack.Space](https://github.com/thkruz/keeptrack.space)
- 本项目使用 AGPL-3.0 许可证，详见 [LICENSE](./LICENSE)

## 联系方式

- Email: `code@spacemv.com`
- Issues: <https://github.com/tianxunweixiao/SpaceMV-ScAI-Frontend/issues>

更多信息可关注公司微信公众号：

<img width="106" height="106" alt="image" src="https://github.com/user-attachments/assets/69a02ad0-422c-422a-bf5f-9b7890cf31ab" />
