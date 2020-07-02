import { join } from 'path';
import Next from 'next';
import Express from 'express';
import { ParsedUrlQuery } from 'querystring';
import Cache from './cache';

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 8000;

const app = Next({ dev });
const handle = app.getRequestHandler();

function getCacheKey(req) {
  return `${req.url}`;
}
async function cacheRender(req, res) {
  const key = getCacheKey(req);
  // reder /list to /
  // const reqPath = req.path === '/list' ? '/' : req.path;
  const reqPath = req.path;
  if (Cache.has(key)) {
    res.setHeader('X-Cache', 'HIT');
    res.send(Cache.get(key));
    return;
  }

  try {
    const html = await app.renderToHTML(req, res, reqPath, req.query);
    if (res.statusCode !== 200) {
      res.send(html);
      return;
    }
    Cache.set(key, html);
    res.setHeader('X-Cache', 'MISS');
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, reqPath, req.query);
  }
}

async function startServer() {
  await app.prepare();

  const server = Express();
  app.setAssetPrefix(process.env.STATIC_PATH);
  server.use(Express.static(join(__dirname, '../public/static')));

  server.get('/', async (req, res) => {
    return cacheRender(req, res);
  });

  server.get('/user', async (req, res) => {
    return await cacheRender(req, res);
  });

  server.get('/about', async (req, res) => {
    return await cacheRender(req, res);
  });

  server.get('/login', async (req, res) => {
    return await cacheRender(req, res);
  });

  server.get('/add', async (req, res) => {
    return await cacheRender(req, res);
  });
  server.get('/message', async (req, res) => {
    return await app.renderToHTML(
      req,
      res,
      req.path,
      req.query as ParsedUrlQuery,
    );
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
}

try {
  startServer();
} catch (e) {
  throw e;
}

process.on('unhandledRejection', (e) => {
  throw e;
});
