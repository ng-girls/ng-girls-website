
const fs = require('fs');
require('dotenv').config();

const DIST_PATH = './dist';
const STATIC_PATH = `${DIST_PATH}/static`;
const INDEX_FILE = `${STATIC_PATH}/index.html`;

const LOG { 
    LOG_NEW
} = require('./tools.ts');



const LOG_OK = (message: string, context?: string) => LOG('OK', message, context, colors.BgGreen, colors.FgBlack);
const LOG_FAIL = (message: string, context?: string) => LOG('FAIL', message, context, colors.BgRed, colors.FgBlack);
const LOG_INFO = (message: string, context?: string) => LOG('INFO', message, context, colors.BgWhite, colors.FgBlack);
const LOG_WARN = (message: string, context?: string) => LOG('WARN', message, context, colors.BgYellow, colors.FgBlack);

const runCommandSync = (command) => {
    let output = require('child_process').execSync(command).toString();
    LOG_INFO(output);
}
const runCommand = (command) => {
    require('child_process').execSync(`${command}`, (error, stdout, stderr) => {
        if (error) {
            LOG_FAIL(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            LOG_FAIL(`stderr: ${stderr}`);
            return;
        }
        LOG_OK(`command: ${command}`);
        console.log(`${stdout}`);
    });
}

const checkFolderExists = (path) => {
    if (!fs.existsSync(path)){
        LOG_FAIL(`no path "${path}" detected`);
        runCommand(`ls -al ${path}`);
    } else {
        LOG_OK(`path "${path}" exists`);
    }
}




const getVersion = (data) => {
    return data.match(/(<meta\sname="version"[^\>]*)/ig);
}
const hasVersions = (data) => {
    const versions = getVersion(data);
    return versions && versions.length >= 1;
}
runCommandSync('pwd');
checkFolderExists(DIST_PATH);
checkFolderExists(STATIC_PATH);
checkFolderExists(INDEX_FILE);

let data = fs.readFileSync(INDEX_FILE, {encoding:'utf8', flag:'r'});
LOG_INFO(` read data (len: ${data.length})`);
const lenData = data.length;

// runCommand('ls -la');
// runCommand('ls -la dist/');
// runCommand('ls -la dist/static');
// runCommand('grep "version" dist/static/index.html');

const rev = fs.readFileSync('.git/HEAD').toString().trim();
let gitMsg = '';
if (rev.indexOf(':') === -1) {
    gitMsg =  rev;
} else {
    LOG_INFO('start git')
    gitMsg = fs.readFileSync('.git/' + rev.substring(5)).toString().trim();
    LOG_INFO('end git')
}
if(gitMsg && gitMsg !== ''){
    LOG_OK(`gitMsg: ${gitMsg}`);
} else {
    LOG_FAIL('no gitMsg found');
}

const head = /(<head>)/ig;
const header = data.match(head);
const GITHUB_RUN_NUMBER = process.env.GITHUB_RUN_NUMBER;
const GITHUB = {
    SERVER_URL: process.env.GITHUB_SERVER_URL,
    REPOSITORY: process.env.GITHUB_REPOSITORY,
    RUN_ID: process.env.GITHUB_RUN_ID
}
const BUILD_URL = `${GITHUB.SERVER_URL}/${GITHUB.REPOSITORY}/actions/runs/${GITHUB.RUN_ID}`;
if(hasVersions(data)){
    LOG_WARN(`has already versions set`)
} else {

 
    if(!GITHUB_RUN_NUMBER) LOG_FAIL(`no run number ${GITHUB_RUN_NUMBER}`);
    data = data.replace(header[0], `<head><meta name="version" content="${gitMsg},${process.env.GITHUB_RUN_NUMBER}">`)
   
    LOG_INFO(`try to set version ${gitMsg}`)
    if(hasVersions(data)){
        LOG_OK(`version ${gitMsg} replaced`)
    } else {
        LOG_OK(`nothing happend`)
    }
}

const regex = /(<script\ssrc.*<\/script>)/;
const styles = /(<link\srel="stylesheet"[^\>]*)/
const regexOptimized = /(<script\sid="optimized"\ssrc.*<\/script>)/
let m = data.match(regex);
let allES5 = '';
let allES6 = '';
if(styles){
    let style = data.match(styles);
    // <link rel="stylesheet" href="styles.315effb89cdf9675a6b4.css"
    let styleID = style[1].match(/href="([^\"]*)"/)[1];
    let newStyles = style[1];
    // newStyles = newStyles.replace('>', '></noscript>' );
    newStyles = newStyles.replace('<link rel="stylesheet"', `<link rel="preload" href="${styleID}" as="style" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" `);
    
    // DISABLE
    // data = data.replace(style[1], newStyles);
    // data = data.replace('.css"><style>', '.css"></noscript><style>' );
    
}
if(!m){
    console.log('cant find inout')
} else {
    LOG_INFO('start scripts')
    let replaceable = m[1];
    const scripts = replaceable.split('><');
    scripts.forEach(script => {
        let x = script.match(/.*src="([^\"]*)\".*/);
        // let file = x[1];
        if(x && x.length > 1){
            const file = x[1];
            let d = fs.readFileSync(`dist/static/${file}`,
            {encoding:'utf8', flag:'r'});
            LOG_INFO(`read file ${file}` );
            if(file.indexOf('-es2015') !== -1){
                allES6 += 
                `
                //${file}
${d}
`
} else {
    allES5 += 
    `
    //${file}
    ${d}
    `
}

}

});
LOG_INFO('end scripts')
fs.writeFileSync('dist/static/all-es5.js', allES5, {encoding:'utf8'});
fs.writeFileSync('dist/static/all-es6.js', allES6, {encoding:'utf8'});
    LOG_OK(`es5/es6 created`);
    const buildLink = `<a href="${BUILD_URL}" style="color: #AAA">build: #${GITHUB_RUN_NUMBER}</a>`
    data = data.replace(replaceable, `<script id="optimized" src="all-es6.js" type="module"></script><script src="all-es5.js" nomodule="" defer=""></script><small>${buildLink}</small>`)

}
var n =data.match(regexOptimized);
if(n && n[1]){
    LOG_OK(`code is optimized`);
}
fs.writeFileSync('dist/static/index.html', data, {encoding:'utf8',flag:'w'});
LOG_OK(`index.html file rewritten`);
LOG_INFO(` write data (len: ${data.length} AND different: ${lenData !== data.length})`);

const finalData = fs.readFileSync('dist/static/index.html', {encoding:'utf8', flag:'r'});
console.log(getVersion(finalData));
// if(hasVersions(finalData)){
//     LOG_OK('version written');
// }
// runCommand('ls -la');
// runCommand('ls -la dist/');
// runCommand('ls -la dist/static');
// runCommand('grep "version" dist/static/index.html');