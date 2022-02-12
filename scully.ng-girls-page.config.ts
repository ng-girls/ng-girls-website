import { ScullyConfig } from '@scullyio/scully';
require('./extraPlugin/workshop-add-flex');
const {
  LOG, LOG_INFO, LOG_WARN, LOG_OK, isWSL, LOG_FAIL, getPuppeteerArgs, environmentCheck,
} = require('./scripts/tools.ts');

const postRenderers = ['addFlex' ];
const args = getPuppeteerArgs(isWSL);

environmentCheck();

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'ng-girls-page',
  outDir: './dist/static',
  defaultPostRenderers: postRenderers,
  routes: {
    '/blog/:slug': {
        type: 'contentFolder',
        slug: {
            folder: './blog'
        }
    },
    '/workshops/:workshopId': {
      type: 'contentFolder',
      // postRenderers: ['addFlex'],
      workshopId: {
        folder: './workshops'
      }
    }
},
extraRoutes: [
  '/coc',
  '/faq'
],
  puppeteerLaunchOptions: {
    args
  }
};
