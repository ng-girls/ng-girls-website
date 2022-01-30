const os = require('os');
let noEmojis = os.release().toLocaleLowerCase().includes('microsoft') && process.platform.includes('linux') && (!(process.env.TERM_PROGRAM && process.env.TERM_PROGRAM.includes('vscode')));
exports.DOCS_PATH =  './docs';
exports.DIST_PATH =  './dist';
const fs = require('fs');
// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const colors = {

    Reset : "\x1b[0m",
    Bright : "\x1b[1m",
    Dim : "\x1b[2m",
    Underscore : "\x1b[4m",
    Blink : "\x1b[5m",
    Reverse : "\x1b[7m",
    Hidden : "\x1b[8m",

    FgBlack : "\x1b[30m",
    FgRed : "\x1b[31m",
    FgGreen : "\x1b[32m",
    FgYellow : "\x1b[33m",
    FgBlue : "\x1b[34m",
    FgMagenta : "\x1b[35m",
    FgCyan : "\x1b[36m",
    FgWhite : "\x1b[37m",

    BgBlack : "\x1b[40m",
    BgRed : "\x1b[41m",
    BgGreen : "\x1b[42m",
    BgYellow : "\x1b[43m",
    BgBlue : "\x1b[44m",
    BgMagenta : "\x1b[45m",
    BgCyan : "\x1b[46m",
    BgWhite : "\x1b[47m",

}

const LOG_NEW = (key, message, context, BgColor, FgColor) => {
    console.log(`${BgColor}${FgColor}[${key}]${colors.Reset}: ${message}`);
    if(context){
        console.log(context);
    }
}

const _LOG = (type, message, icon?) => {
    icon = icon === undefined || noEmojis === true ? '' : ` ${icon}`;
    switch(type.toLowerCase()){
        case 'ok': console.log(`${colors.BgGreen} ✔ ${colors.Reset} ${icon} ${message}`); break;
        case 'fail': console.log(`${colors.BgRed} ✖ ${colors.Reset} ${icon} ${message}`); break;
        case 'warn': console.log(`${colors.BgYellow} ! ${colors.Reset} ${icon} ${message}`); break;
        case 'newline': console.log(`    ${icon} ${message}`); break;
        // case 'info': console.log(`${colors.BgWhite} I ${colors.Reset} ${message}`); break;
        default: console.log(`${colors.BgBlue} # ${colors.Reset} ${icon} ${message}`); break;
        // case 'ok':      console.log(`${colors.BgGreen}  OK  ${colors.Reset} ${message}`); break;
        // case 'fail':    console.log(`${colors.BgRed} FAIL ${colors.Reset} ${message}`); break;
        // case 'warn':    console.log(`${colors.BgYellow} WARN ${colors.Reset} ${message}`); break;
    }
}

// src: // https://www.netzprogrammierer.de/mit-javascript-auf-beliebige-dezimalstellen-runden/
const _round = (wert, dez) =>  {
    wert = parseFloat(wert);
    if (!wert) return 0;
    dez = parseInt(dez);
    if (!dez) dez=0;
    var umrechnungsfaktor = Math.pow(10,dez);
    return Math.round(wert * umrechnungsfaktor) / umrechnungsfaktor;
}
const _startLoading = (text) => {
    return function() {
        var P = ["\\", "|", "/", "-"];
        var DOTS = [".   ", "..  ", "... ", "...."];
        var x = 0;
        return setInterval(function() {
          process.stdout.write("\r\x1b[45m " + P[x++] + ' \x1b[0m  ' + text +' ' + DOTS[x++]);
          x &= 3;
        }, 250);
      }
}
const _finishLoading = (timer, text) => {
    clearInterval(timer);
    if(process && process.stdout && process.stdout.clearLine){
        process.stdout.clearLine(-1);
        process.stdout.cursorTo(0);
    }
    _LOG('ok', text);
}
const _isDevMode = () => {
    let isDev = false;
    process.argv.forEach(function (val) {
        if(val === '--dev') isDev = true;
    });
    return isDev;
}
const _getSize = (name, value) => {
    if(typeof value === 'object') value = JSON.stringify(value);
    let size = Buffer.from(value).length;
    const str = name !== '' ? `size of  ${name} is` : '';
    return `${str} ${_round(size /1024,2)} kb (${size} B)`;
    // LOG('OK', `size of  ${name} is ${round(size /1024,2)} kb (${size} B)`, '💾')
}

const _analyzeChange =  (oldData, newData, host) => {
    const strOldData = JSON.stringify(oldData); 
    const strNewData = JSON.stringify(newData); 
    let result = '';
    if(strNewData.length < strOldData.length){ // decreased
        let icon = noEmojis ? '↓' : '⬇️';
        let diff = Buffer.from(strOldData).length - Buffer.from(strNewData).length;
        result = `${colors.FgGreen}(${diff} Bytes ${icon} )${colors.Reset}`
    } else if (strOldData.length < strNewData.length){ // increased
        let icon = noEmojis ? '↑' : '⬆️';
        let diff = Buffer.from(strNewData).length - Buffer.from(strOldData).length;
        result = `${colors.FgRed}(${diff} Bytes ${icon} ) ${colors.Reset}`
    } else { // same
        result = `(is the same)`;
    }
    // print
    let isChange = strOldData !== strNewData;
    let suffix = isChange ? `differs to new one ${result}` : `has not changed`;
    let state = isChange ? 'fail' : 'ok';
    _LOG(state, `data entry for ${host.name}  already defined and ${suffix}`)
    if(isChange && _isDevMode()){
        __writeFile(`./tmp/diff_${host.id}_new.json`, `diff_${host.id}_new.json`, strNewData, {}, false)
        _LOG('newline', ` - ${colorize(`diff_${host.id}_new.json`)} created`);
        __writeFile(`./tmp/diff_${host.id}_old.json`, `diff_${host.id}_old.json`, strOldData,{}, false)
        _LOG('newline', ` - ${colorize(`diff_${host.id}_old.json`)} created`);
    }
}
const __writeFile = (path, name,  data, flag, optional ) => {
    optional = optional !== undefined ? optional :  true;
    fs.writeFileSync(path, data, flag); //, { flag: 'a+' });
    if(optional) printSize(path, name);
}

// read and parse
const __readFile = (file) => {
    const data = fs.readFileSync(file, {encoding:'utf8', flag:'r'});
    return JSON.parse(data);
}
const _printSize =  (path, name) => {
    const stats  = fs.statSync(path);
    LOG('OK', `size of ${name} is ${_round(stats.size /1024,2)} kb (${stats.size} B)`, '💾');
}

const _colorize =  (value, optional) => {
    optional = optional || 'FgYellow';
    return `${colors[optional]}${value}${colors.Reset}`;
}
const _getType =  (value) => {
    let type;
    if(Array.isArray(value)){
        return 'array';
    } else {
        return typeof value;
    }
}

exports.isDevMode = () =>  _isDevMode;
exports._writeFile = __writeFile;
exports.colorize = _colorize;
exports.getType = _getType;
exports.LOG  = _LOG;
exports.printSize = _printSize;
exports._readFile = __readFile;
exports.analyzeChange = _analyzeChange;
exports.getSize = _getSize;
exports.finishLoading = _finishLoading;
exports.startLoading = _startLoading;
exports.round = _round;
exports.LOG_OK  = (message: string, context?: string) => LOG_NEW('OK', message, context, colors.BgGreen, colors.FgBlack);
exports.LOG_FAIL  = (message: string, context?: string) => LOG_NEW('FAIL', message, context, colors.BgRed, colors.FgBlack);
exports.LOG_INFO = (message: string, context?: string) => LOG_NEW('INFO', message, context, colors.BgWhite, colors.FgBlack);
exports.LOG_WARN = (message: string, context?: string) => LOG_NEW('WARN', message, context, colors.BgYellow, colors.FgBlack);
