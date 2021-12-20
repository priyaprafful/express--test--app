import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import * as prismicH from '@prismicio/helpers';
import { client, repoName } from './config/prismicConfig.js';

const app = express();
const port = 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'views')));

const prismicAutoPreviewsMiddleware = (req, _res, next) => {
  client.enableAutoPreviewsFromReq(req);
  next();
};

app.use(prismicAutoPreviewsMiddleware);

// Add a middleware function that runs on every route. It will inject
// the prismic context to the locals so that we can access these in
// our templates.
app.use((req, res, next) => {
  res.locals.ctx = {
    prismicH,
    repoName,
  };
  next();
});

app.get('/preview', async (req, res) => {
  const redirectUrl = await client.resolvePreviewURL({});
  res.redirect(302, redirectUrl);
});

// Query for the root path.
app.get('/', async (req, res) => {
  // Here we are retrieving the first document from your API endpoint
  const document = await client.getSingle('homepage');
  res.render('homepage', { document });
});

// Listen to application port.
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
