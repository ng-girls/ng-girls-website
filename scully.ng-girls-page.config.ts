import { ScullyConfig } from '@scullyio/scully';
require('./extraPlugin/workshop-add-flex');
// const {DisableAngular} = require('scully-plugin-disable-angular');

const postRenderers = ['addFlex' ];
// const postRenderers = ['addFlex', DisableAngular ];


export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "ng-girls-page",
  outDir: './dist/static',
  defaultPostRenderers: postRenderers,
  routes: {
    '/blog/:slug': {
        type: 'contentFolder',
        slug: {
            folder: "./blog"
        }
    },
    '/workshops/:workshopId': {
      type: 'contentFolder',
      // postRenderers: ['addFlex'],
      workshopId: {
        folder: "./workshops"
      }
    }
},
extraRoutes: [
  '/coc',
  '/faq'
],
  puppeteerLaunchOptions: {
    args: ['--no-sandbox']
  }
};