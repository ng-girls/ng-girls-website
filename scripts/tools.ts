const os = require('os');
const isMicrosoft = os.release().toLocaleLowerCase().includes('microsoft');
const hasLinuxPlattform = process.platform.includes('linux');
const isVSCode = (process.env.TERM_PROGRAM && process.env.TERM_PROGRAM.includes('vscode'));
let noEmojis = isMicrosoft && hasLinuxPlattform && (!isVSCode);
exports.DOCS_PATH =  './docs';
exports.DIST_PATH =  './dist';
const fs = require('fs');
// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const colors = {

    Reset : '\x1b[0m',
    Bright : '\x1b[1m',
    Dim : '\x1b[2m',
    Underscore : '\x1b[4m',
    Blink : '\x1b[5m',
    Reverse : '\x1b[7m',
    Hidden : '\x1b[8m',

    FgBlack : '\x1b[30m',
    FgRed : '\x1b[31m',
    FgGreen : '\x1b[32m',
    FgYellow : '\x1b[33m',
    FgBlue : '\x1b[34m',
    FgMagenta : '\x1b[35m',
    FgCyan : '\x1b[36m',
    FgWhite : '\x1b[37m',

    BgBlack : '\x1b[40m',
    BgRed : '\x1b[41m',
    BgGreen : '\x1b[42m',
    BgYellow : '\x1b[43m',
    BgBlue : '\x1b[44m',
    BgMagenta : '\x1b[45m',
    BgCyan : '\x1b[46m',
    BgWhite : '\x1b[47m',

};

const AddSourceCode = (file, sourceCode) => {
    return `
//${file}
${sourceCode}
    `;
};
const LOG_NEW = (key, message, context, BgColor, FgColor) => {
    const isInline = typeof context === 'string' && context.length < 60 || typeof context !== 'object';
    if (isInline){
        console.log(`${BgColor}${FgColor}[${key}]${colors.Reset}: ${message}  ${context !== undefined ? context : ''} `);
    } else {
        console.log(`${BgColor}${FgColor}[${key}]${colors.Reset}: ${message}`);
        console.log(`${context !== undefined ? context : ''}`);
    }
};

const _LOG = (type, message, icon = undefined) => {
    icon = icon === undefined || noEmojis === true ? '' : ` ${icon}`;
    switch (type.toLowerCase()){
        case 'ok': console.log(`${colors.BgGreen} [OK] ${colors.Reset} ${icon} ${message}`); break;
        case 'fail': console.log(`${colors.BgRed} [FAIL] ${colors.Reset} ${icon} ${message}`); break;
        case 'warn': console.log(`${colors.BgYellow} [WARN] ${colors.Reset} ${icon} ${message}`); break;
        case 'newline': console.log(`    ${icon} ${message}`); break;
        // case 'info': console.log(`${colors.BgWhite} I ${colors.Reset} ${message}`); break;
        default: console.log(`${colors.BgBlue} [INFO] ${colors.Reset} ${icon} ${message}`); break;
        // case 'ok':      console.log(`${colors.BgGreen}  OK  ${colors.Reset} ${message}`); break;
        // case 'fail':    console.log(`${colors.BgRed} FAIL ${colors.Reset} ${message}`); break;
        // case 'warn':    console.log(`${colors.BgYellow} WARN ${colors.Reset} ${message}`); break;
    }
};
const _LOG_OK  = (message, context = undefined) => LOG_NEW('OK', message, context, colors.BgGreen, colors.FgBlack);
const _LOG_FAIL  = (message, context = undefined) => LOG_NEW('FAIL', message, context, colors.BgRed, colors.FgBlack);
const _LOG_INFO = (message, context = undefined) => LOG_NEW('INFO', message, context, colors.BgWhite, colors.FgBlack);
const _LOG_WARN = (message, context = undefined) => LOG_NEW('WARN', message, context, colors.BgYellow, colors.FgBlack);

// src: // https://www.netzprogrammierer.de/mit-javascript-auf-beliebige-dezimalstellen-runden/
const Round = (wert, dez) =>  {
    wert = parseFloat(wert);
    if (!wert) { return 0; }
    dez = parseInt(dez, 10);
    if (!dez) { dez = 0; }
    const umrechnungsfaktor = Math.pow(10, dez);
    return Math.round(wert * umrechnungsfaktor) / umrechnungsfaktor;
};
const getPuppeteerArgs = (isWSL) => {
    const args = isWSL ? [
        "--disable-gpu",
        "--renderer",
        "--no-sandbox",
        "--no-service-autorun",
        "--no-experiments",
        "--no-default-browser-check",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
        "--disable-extensions"
      ] : ['--no-sandbox'];
    if (isWSL && args.length > 10){
        _LOG_OK('WSL-CHECK', `specified args loaded`);
    } else if (isWSL){
        _LOG_FAIL('WSL-CHECK', `missing args: len ${args.length}`);
    } else {
        _LOG_INFO('WSL-CHECK', `no wsl environment`);
    }
    return args;
};
const environmentCheck = () => {
    _LOG_INFO('Environment check', {plattform: process.platform, os: os.release(), terminal: process.env.TERM_PROGRAM });
};
const StartLoading = (text) => {
    return () => {
        const P = ['\\', '|', '/', '-'];
        const DOTS = ['.   ', '..  ', '... ', '....'];
        let x = 0;
        return setInterval(() => {
          process.stdout.write('\r\x1b[45m ' + P[x++] + ' \x1b[0m  ' + text + ' ' + DOTS[x++]);
        //   x &= 3;
        }, 250);
      };
};
const FinishLoading = (timer, text) => {
    clearInterval(timer);
    if (process && process.stdout && process.stdout.clearLine){
        process.stdout.clearLine(-1);
        process.stdout.cursorTo(0);
    }
    _LOG('ok', text);
};
const IsDevMode = () => {
    let isDev = false;
    process.argv.forEach( (val) => {
        if (val === '--dev'){ isDev = true; }
    });
    return isDev;
};
const GetSize = (name, value) => {
    if (typeof value === 'object'){ value = JSON.stringify(value); }
    const size = Buffer.from(value).length;
    const str = name !== '' ? `size of  ${name} is` : '';
    return `${str} ${Round(size / 1024, 2)} kb (${size} B)`;
    // LOG('OK', `size of  ${name} is ${round(size /1024,2)} kb (${size} B)`, '💾')
};

const AnalyzeChange = (oldData, newData, host) => {
    const strOldData = JSON.stringify(oldData);
    const strNewData = JSON.stringify(newData);
    let result = '';
    if (strNewData.length < strOldData.length){ // decreased
        const icon = noEmojis ? '↓' : '⬇️';
        const diff = Buffer.from(strOldData).length - Buffer.from(strNewData).length;
        result = `${colors.FgGreen}(${diff} Bytes ${icon} )${colors.Reset}`;
    } else if (strOldData.length < strNewData.length){ // increased
        const icon = noEmojis ? '↑' : '⬆️';
        const diff = Buffer.from(strNewData).length - Buffer.from(strOldData).length;
        result = `${colors.FgRed}(${diff} Bytes ${icon} ) ${colors.Reset}`;
    } else { // same
        result = `(is the same)`;
    }
    // print
    const isChange = strOldData !== strNewData;
    const suffix = isChange ? `differs to new one ${result}` : `has not changed`;
    const state = isChange ? 'fail' : 'ok';
    _LOG(state, `data entry for ${host.name}  already defined and ${suffix}`);
    if (isChange && IsDevMode()){
        WriteFile(`./tmp/diff_${host.id}_new.json`, `diff_${host.id}_new.json`, strNewData, {}, false);
        _LOG('newline', ` - ${Colorize(`diff_${host.id}_new.json`)} created`);
        WriteFile(`./tmp/diff_${host.id}_old.json`, `diff_${host.id}_old.json`, strOldData, {}, false);
        _LOG('newline', ` - ${Colorize(`diff_${host.id}_old.json`)} created`);
    }
};
const WriteFile = (path, name,  data, flag, optional ) => {
    optional = optional !== undefined ? optional :  true;
    fs.writeFileSync(path, data, flag); // , { flag: 'a+' });
    if (optional) { PrintSize(path, name); }
};

// read and parse
const ReadFile = (file) => {
    const data = fs.readFileSync(file, {encoding: 'utf8', flag: 'r'});
    return JSON.parse(data);
};
const PrintSize =  (path, name) => {
    const stats  = fs.statSync(path);
    _LOG('OK', `size of ${name} is ${Round(stats.size / 1024, 2)} kb (${stats.size} B)`, '💾');
};

const Colorize =  (value, optional = undefined) => {
    optional = optional || 'FgYellow';
    return `${colors[optional]}${value}${colors.Reset}`;
};
const GetType =  (value) => {
    if (Array.isArray(value)){
        return 'array';
    } else {
        return typeof value;
    }
};



exports.isDevMode = () =>  IsDevMode;
exports._writeFile = WriteFile;
exports.colorize = Colorize;
exports.getType = GetType;
exports.LOG  = _LOG;
exports.printSize = PrintSize;
exports._readFile = ReadFile;
exports.analyzeChange = AnalyzeChange;
exports.getSize = GetSize;
exports.finishLoading = FinishLoading;
exports.startLoading = StartLoading;
exports.round = Round;
exports.getPuppeteerArgs = getPuppeteerArgs;
exports.environmentCheck = environmentCheck;
exports.isWSL = isMicrosoft && hasLinuxPlattform;
exports.LOG_OK  = (message, context = undefined) => LOG_NEW('OK', message, context, colors.BgGreen, colors.FgBlack);
exports.LOG_FAIL  = (message, context = undefined) => LOG_NEW('FAIL', message, context, colors.BgRed, colors.FgBlack);
exports.LOG_INFO = (message, context = undefined) => LOG_NEW('INFO', message, context, colors.BgWhite, colors.FgBlack);
exports.LOG_WARN = (message, context = undefined) => LOG_NEW('WARN', message, context, colors.BgYellow, colors.FgBlack);
exports.addSourceCode = AddSourceCode;
