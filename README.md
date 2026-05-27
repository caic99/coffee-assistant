# Coffee Brewing Assistant · 咖啡冲煮助手

手冲咖啡冲煮看板。挑方案、调粉量、定粉水比，生成分段注水时间表。

A pour-over brewing assistant — pick a recipe, set the dose, get a step-by-step pour schedule.

**Live:** <https://coffee.caic.ac.cn>

## 特性

- 五种冲煮方案，从日常基准到世界赛配方
- 粉量滑块按手指相对位移调整，不会"点哪儿跳哪儿"；10–20 g 可滑，超出范围支持手动输入
- URL hash 分享方案：`/#classic`、`/#four_six`、`/#one_pour`、`/#carlos`、`/#du`
- localStorage 记住方案、粉量、详述展开状态
- PWA 离线可用，可加到主屏
- 纯静态单文件，无后端

## 方案

| Hash key   | 方案                | 默认粉水比 | 适用场景                      |
|------------|---------------------|------------|-------------------------------|
| `classic`  | 经典三段式           | 1:15 可调  | 日常基准，高容错               |
| `four_six` | 粕谷哲 四六冲煮法    | 1:15       | 浅~深烘，需配温度策略           |
| `one_pour` | 极致一刀流           | 1:16       | 浅烘单品，干净轻盈              |
| `carlos`   | Carlos 五段精准法    | 1:16.1     | 平底滤杯，结构清晰              |
| `du`       | 杜嘉宁 高温快冲法    | 1:15       | 极细研磨 + 高温，爆发花果香     |

## 技术栈

- 纯 HTML + CSS + JS，单文件 `index.html`
- Service Worker（`sw.js`）：离线缓存 + 版本化失效
- PWA manifest（`manifest.json`）
- SVG favicon（V60 滤杯侧视图）
- 部署：Vercel + 自定义域名

## 本地预览

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## 部署

```bash
vercel --prod
```

每次发布时记得：

1. `index.html` 里的 `?v=` 版本号统一 +1
2. `sw.js` 里的 `CACHE_NAME` 也同步升级
