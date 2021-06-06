"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require('./extraPlugin/workshop-add-flex');
// const {DisableAngular} = require('scully-plugin-disable-angular');
var postRenderers = ['addFlex'];
// const postRenderers = ['addFlex', DisableAngular ];
exports.config = {
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