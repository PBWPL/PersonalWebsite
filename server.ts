/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync, writeFileSync } from 'fs';
import { request, RequestOptions } from 'https';
import { environment } from 'src/environments/environment';

// The Express app is exported so that it can be used by serverless Functions.
export function app(lang: string): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), `dist/personal-website/browser/${lang}`);
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule
    })
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y'
    })
  );

  server.get('/api/feelings', (req, res) => {
    let path = join(__dirname, 'feelings.json');
    if (existsSync(path)) {
      return res.header('Content-Type', 'application/json').sendFile(path);
    } else {
      return res.status(500).json({
        message: 'File missing!',
        success: false
      });
    }
  });

  server.post('/api/feelings', (req, res) => {
    let authHeader = req.headers.authorization;

    if (req.headers['content-type'] !== 'text/csv') {
      return res.status(400).json({
        message: 'File missing!',
        success: false
      });
    }

    if (!isAccess(authHeader)) {
      return res.status(403).json({
        message: 'Not authenticated!',
        success: false
      });
    }

    function convertCSVtoJSON() {
      return new Promise((res) => {
        let csv = '';
        let json = '';
        req.on('data', function (data) {
          csv += data;
        });

        req.on('end', function () {
          let lines = csv.toString().split('\r');

          let feelings = [];
          for (let i = 1; i < lines.length - 1; i++) {
            let obj: any = {};

            let properties = lines[i].replace('\n', '').split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/g);

            obj['full_date'] = new Date(`${properties[0]}T${properties[3]}`);
            obj['mood'] = properties[4];
            obj['activities'] = properties[5].split(' | ').map((item) => item.trim());
            obj['note_title'] = properties[6] !== '""' ? properties[6].replace(/\"/g, '') : null;
            obj['note'] = properties[7] !== '""' ? properties[7].replace(/\"|#private.*?#private/g, '') : null;

            feelings.push(obj);
          }

          json = JSON.stringify(feelings);
          writeFileSync(join(__dirname, 'feelings.json'), json);
          return res(json);
        });
      });
    }

    return convertCSVtoJSON()
      .then((json) => {
        return res.status(403).json({
          message: 'File updated!',
          success: true,
          json: JSON.parse(json as string)
        });
      })
      .catch(() => {
        return res.status(500).json({
          message: 'Something wrong!',
          success: false
        });
      });
  });

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  const appPL = app('pl');
  const appDE = app('de');
  const appEN = app('en');

  // Start up the Node server
  const server = express();
  server.use('/pl', appPL);
  server.use('/de', appDE);
  server.use('/en', appEN);
  server.use('', appEN);

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

function isAccess(authHeader: any): boolean {
  if (authHeader) {
    let auth = new (Buffer as any).from(authHeader.split(' ')[1], 'base64').toString().split(':');
    return auth[0] === environment.security.user && auth[1] === environment.security.password;
  }
  return false;
}

function translateNotes(notes: string, lang: string, callback: any) {
  let options: RequestOptions = {
    hostname: 'api-free.deepl.com',
    port: 443,
    path: '/v2/translate',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  let data =
    `${encodeURI('auth_key')}=${encodeURI(environment.deeplAPIKey)}` +
    `&${encodeURI('text')}=${encodeURI(notes)}` +
    `&${encodeURI('target_lang')}=${encodeURI(lang)}`;

  let newNotes = '';
  let req = request(options, function (res) {
    res.setEncoding('utf8');

    let body = '';
    res.on('data', function (data) {
      body += data;
    });

    res.on('end', function () {
      return callback(null, body);
    });
  });

  req.write(data);
  req.end();
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
