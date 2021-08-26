const os = require('os');
let noEmojis = os.release().toLocaleLowerCase().includes('microsoft') && process.platform.includes('linux') && (!(process.env.TERM_PROGRAM && process.env.TERM_PROGRAM.includes('vscode')));
exports.DIST_PATH = DIST_PATH = './dist/output';
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
exports.LOG = LOG = (type, message, icon) => {
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
exports.round = round = (wert, dez) =>  {
    wert = parseFloat(wert);
    if (!wert) return 0;
    dez = parseInt(dez);
    if (!dez) dez=0;
    var umrechnungsfaktor = Math.pow(10,dez);
    return Math.round(wert * umrechnungsfaktor) / umrechnungsfaktor;
}
exports.startLoading = (text) => {
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
exports.finishLoading = (timer, text) => {
    clearInterval(timer);
    if(process && process.stdout && process.stdout.clearLine){
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
    }
    LOG('ok', text);
}
exports.isDevMode = () => {
    let isDev = false;
    process.argv.forEach(function (val) {
        if(val === '--dev') isDev = true;
    });
    return isDev;
}
exports.getSize = (name, value) => {
    if(typeof value === 'object') value = JSON.stringify(value);
    let size = Buffer.from(value).length;
    const str = name !== '' ? `size of  ${name} is` : '';
    return `${str} ${round(size /1024,2)} kb (${size} B)`;
    // LOG('OK', `size of  ${name} is ${round(size /1024,2)} kb (${size} B)`, '💾')
}

exports.analyzeChange = analyzeChange = (oldData, newData, host) => {
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
    LOG(state, `data entry for ${host.name}  already defined and ${suffix}`)
    if(isChange && this.isDevMode()){
        _writeFile(`./tmp/diff_${host.id}_new.json`, `diff_${host.id}_new.json`, strNewData, {}, false)
        LOG('newline', ` - ${colorize(`diff_${host.id}_new.json`)} created`);
        _writeFile(`./tmp/diff_${host.id}_old.json`, `diff_${host.id}_old.json`, strOldData,{}, false)
        LOG('newline', ` - ${colorize(`diff_${host.id}_old.json`)} created`);
    }
}

exports._writeFile = _writeFile = (path, name,  data, flag, optional ) => {
    optional = optional !== undefined ? optional :  true;
    fs.writeFileSync(path, data, flag); //, { flag: 'a+' });
    if(optional) printSize(path, name);
}
// read and parse
exports._readFile = _readFile = (file) => {
    const data = fs.readFileSync(file, {encoding:'utf8', flag:'r'});
    return JSON.parse(data);
}
exports.printSize = printSize = (path, name) => {
    const stats  = fs.statSync(path);
    LOG('OK', `size of ${name} is ${round(stats.size /1024,2)} kb (${stats.size} B)`, '💾');
}

exports.colorize = colorize = (value, optional) => {
    optional = optional || 'FgYellow';
    return `${colors[optional]}${value}${colors.Reset}`;
}
exports.getType = getType = (value) => {
    let type;
    if(Array.isArray(value)){
        return 'array';
    } else {
        return typeof value;
 
    }
}