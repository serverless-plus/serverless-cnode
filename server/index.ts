import { join } from 'path';
import Next from 'next';
import Express from 'express';
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
    } else {
      Cache.set(key, html);
      res.setHeader('X-Cache', 'MISS');
      res.send(html);
    }
  } catch (err) {
    res.statusCode = 500;
    app.renderError(err, req, res, reqPath, req.query);
  }
}

// not report route for custom monitor
const noReportRoutes = ['/_next', '/static'];

async function startServer() {
  await app.prepare();

  const server = Express();
  server.use(Express.static(join(__dirname, '../public/static')));

  server.get('/', async (req, res) => {
    return cacheRender(req, res);
  });

  server.get('/user', async (req, res) => {
    return cacheRender(req, res);
  });

  server.get('/about', async (req, res) => {
    return cacheRender(req, res);
  });

  server.get('/login', async (req, res) => {
    return handle(req, res);
  });

  server.get('/add', async (req, res) => {
    return handle(req, res);
  });
  server.get('/message', async (req, res) => {
    return handle(req, res);
  });

  server.get('*', (req, res) => {
    noReportRoutes.forEach((route) => {
      if (req.path.indexOf(route) === 0) {
        req['__SLS_NO_REPORT__'] = true;
      }
    });
    return handle(req, res);
  });

  // define binary type for response
  // if includes, will return base64 encoded, very useful for images
  server['binaryTypes'] = ['*/*'];

  return server;
}

if (process.env.SERVERLESS) {
  module.exports = startServer;
} else {
  try {
    startServer().then((server) => {
      server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
      });
    });
  } catch (e) {
    throw e;
  }
}

process.on('unhandledRejection', (e) => {
  throw e;
});
