# Serverless Cnode

[在线预览](https://cnode.yuga.chat)

使用 Next.js + TypeScript 开发，并且基于 Serverless 部署的 cnode 客户端

## 流程图

![Deploy Flow](./docs/ssr-deploy-flow.png)

## 功能

- [x] Typescript
- [x] Next.js
- [x] Express 自定义服务
- [x] LRU 渲染缓存
- [x] 基于 Next.js 的 Serverless 组件部署
- [x] 静态资源分离，自动部署到 COS
- [x] 自动为静态 COS 配置 CDN

## 本地开发

```bash
$ npm install

$ npm run dev
```

## 构建

```bash
$ npm run build
```

## 部署

```bash
$ npm run deploy
```

## License

MIT
