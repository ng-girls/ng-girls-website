* test url: https://orange-pond-046cb2d03.azurestaticapps.net/

# new ngGirls page with Scully
Repository's goal is to rewrite current ng-girls page to Angular and Scully. Thanks to that it will be possible to easily add new workshop's subpage.

## Steps
- [x] Create scully mechanism to autogenerate new workshops
- [x] Connect to GitHub pages to deploy changes automatically
- [ ] Recreate current secions and its styles in Angular approach
- [ ] Replace manual adding subpages with forms and APIs

## Running locally
-  `npm install`
-  `npm run scully:all`

## Git Flow
- Create feature branch from `base-branch`
- Add your changes
- When ready, merge to `base-branch`
- After merging, GitHub Action will rebuild project and deploy your changes to webpage
 
## Adding new workshop 
- `npm checkout -b <your-workshop-name>-branch`
- `npm run new-event`
- Prompt will ask you for the event name.
- Go to workshops folder and open file <event-name>.md
- update properties in md file
- create folder `src\assets\<your-workshop-name>` and add all assets there
- Run `npm install && npm run scully:all` to test it locally
- When ready create PR to `base-branch`

## Adding new blog post
- `npm checkout -b <your-post-name>-branch`
- `npm run new-post`
- Prompt will ask you for the event name.
- Go to blog folder and open file <post-name>.md
- update properties in md file
- Run `npm install && npm run scully:all` to test it locally
- When ready create PR to `base-branch`
