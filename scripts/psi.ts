const psi = require('psi');
const _FS = require('fs');

require('dotenv').config();
// console.log(process.env)
const {
    getSize, analyzeChange, isDevMode, _readFile, getType, DOCS_PATH,
    finishLoading, startLoading, LOG, _writeFile, printSize, colorize
} = require('./tools.ts');
const dir = DOCS_PATH;
const SETTINGS = `${DOCS_PATH}/settings.json`;
const ALL_AUDITS = `${DOCS_PATH}/all_audits.json`;
const HTML = `${DOCS_PATH}/index.html`;
const DECODED = `${DOCS_PATH}/decoded.json`;

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

if (!_FS.existsSync(dir)){
    _FS.mkdirSync(dir, { recursive: true });
}
if (!_FS.existsSync(SETTINGS)){
    _FS.writeFileSync(SETTINGS, '{}', { flag: 'a+' });
}
if (!_FS.existsSync(ALL_AUDITS)){
    _FS.writeFileSync(ALL_AUDITS, '{}', { flag: 'a+' });
}
let html = _FS.readFileSync('scripts/index.html', {encoding: 'utf8', flag: 'r'});



let lastCommitMsg = require('child_process').execSync(`git log -1 --pretty=%B | cat | tr -d '\r' | tr -d '\n'`).toString();
let lastCommitSha = require('child_process').execSync(`git log --pretty=format:'%H' -n 1`).toString();
LOG('ok', 'commit: ', '🆕');
LOG('newline', '   \x1b[4mmessage\x1b[0m: ' + lastCommitMsg);
LOG('newline', '   \x1b[4mSHA\x1b[0m:     ' + lastCommitSha);
// git log -1 --pretty=%B | cat





const KEYS = ['description', 'title', 'numericUnit', 'numericValue', 'scoreDisplayMode', 'acronym', 'group', 'id', 'displayValue'];

let allAudits = _readFile(ALL_AUDITS);
printSize(SETTINGS, 'existing settings');
printSize(ALL_AUDITS, 'existing audits');
const settings =  _readFile(SETTINGS);
const PREFIXES = {
    audits: '$a',
    // 'xxx': '$b',
    placeholders: '$c',
    replaceables: '$d',
    categoryGroups: '$e',
    auditRefs: '$f',
    auditValues: '$g',
    auditKeys: '$h',
    performance: '$i',
    rendererFormattedStrings: '$j',
    auditRefsKeys: '$k',  // auditRefKeys
    base: '$m',
    keys: '$n',  // 'categoryGroupsKeys'
    categoryGroupsCats: '$o',
    i18nKeys: '$p',
    last: '#',
    valuePlaceholders: '$r',
    valueKeys: '$s',
    detailsValues: '$t',
    detailsKeys: '$u',
    values: '$'
};
const config = {
    rendererFormattedStrings: { keys: 'i18nKeys', values: 'rendererFormattedStrings' },
    details: { keys: 'detailsKeys', values: 'detailsValues' },
    detailsNode: { keys: 'detailsKeys', values: 'placeholders' },
    detailsNodeValues: { keys: 'valueKeys', values: 'valuePlaceholders' },
};

const optimizeNodeKeys = (node, type) => {
    const properties = Object.keys(node);
    properties.forEach(key => {
        optimizeNodeBy(node[key], type, false);
    });
};
const optimizeNode = (key, node) => {
    optimizeNodeBy(node, config[key].values, true);
    optimizeNodeBy(node,  config[key].keys, false);
};
const addAudit = (audits, data, host) => {
    LOG('OK', `${getSize(`new Audit ${host.name} `, data.lighthouseResult)}`, '💾');
    const id = data.id;
    const platform = data.lighthouseResult.configSettings.emulatedFormFactor;
    const time = data.analysisUTCTimestamp;
    if (audits[id] === undefined){
        audits[id] = {};
    }
    if (audits[id][platform] === undefined){
        audits[id][platform] = {};
    }
    if (audits[id][platform][time] === undefined){
        audits[id][platform][time] = data.lighthouseResult;
    } else {
         analyzeChange(audits[id][platform][time], data.lighthouseResult, host);
    }
};
const getReport = async (path, opts, file) => {
    const timer = (startLoading('Loading Lighthouse data'))();
    const { data } = await psi(path, opts);
    finishLoading(timer, 'Lighthouse data loaded');
    if (!_FS.existsSync(file) && isDevMode()){
        _FS.writeFileSync(file, JSON.stringify(data), { flag: 'a+' });
        LOG('info', `write data to cache`);
    }
    return data;
};
const getData = async (host, process, indexPath) => {
    const path = host.path;
    const DATA_FILE = `${DOCS_PATH}/raw_${indexPath}.json`;
    const opts = {
        key: undefined,
        nokey: undefined,
        strategy: undefined
    };
    if (host.strategy){
        opts.strategy = host.strategy;
    }
    if (process.env.PSI_KEY){
        LOG('info', `Lighthouse API key loaded`, '🔑');
        opts.key = `${process.env.PSI_KEY}`;
    } else {
        LOG('info', `no Lighthouse API key loaded`);
        opts.nokey = 'true';
    }
    const hasRaw = (!_FS.existsSync(DATA_FILE))  ? false : true;

    const useCache = isDevMode() === true && hasRaw === true;
    const result = useCache ? _readFile(DATA_FILE) : await getReport(path, opts, DATA_FILE);
    const str = useCache ? `read data from cache for` : `generate new lighthouse data for`;
    LOG('OK', `${str} (${colorize(host.name)}) [size: ${getSize(``, result)}]`, '💾');
    return result;
};


const updateSettings = (type, value) => {
    if (settings[type] === undefined){
        settings[type] = [];
    }
    let index = settings[type].indexOf(value);
    if (index === -1){
        index =  settings[type].push(value) - 1;
    }
    return index;

};
const deleteDetailNode = (nodeBase, name) => {
    if (nodeBase[name]){
        const items = nodeBase[name];
        if (items.length > 0){
            items.forEach((item, index) => {
                optimizeNode('detailsNode', nodeBase[name][index]);
                const properties = Object.keys(item);
                properties.forEach(key => {
                    const value = item[key];
                    if (value && typeof value === 'object'){
                        optimizeNode('detailsNodeValues', value);
                    }
                });
            });
        } else {
            delete nodeBase[name];
        }
    }
};
const estimateIndexLength = (value, type) => {
    const existingIndex = settings[type] === undefined ? -1 : settings[type].indexOf(value);
    const settingsLength = settings[type] === undefined ? 0 : settings[type].length;
    const index = (existingIndex === -1) ? settingsLength : existingIndex;
    return index.toString().length + 1;
};
const updateStringValue = (value, type) => {
    let newValue = value;
    if (typeof value === 'string' && value.indexOf('$') === 0 && value.match(/^\$[a-zA-Z]*\d*$/)){
        return;
    }
    const prefix = PREFIXES[type] || '?';
    const estimatedIndex = estimateIndexLength(value, type);
    const valLength = (typeof value ===  'string') ? value.length : value.toString().length;
    if (valLength > estimatedIndex ){
        const index = updateSettings(type, value);
        if (index !== -1){
            newValue = prefix + index;
        }
    }
    return newValue;
};
const updatePrimitives = (node, key, type) => {
    if (node[key]){

        switch (typeof node[key]){
            case 'string':
                node[key] = updateStringValue(node[key], type);
                updateSettingsAndKey('keys', node, key);
                break;
            case 'number':
                node[key] = updateStringValue(node[key], 'values');
                updateSettingsAndKey('keys', node, key);
                break;
            default:
                console.log(node[key]);
        }
    }
};
const processArray = (element4, type) => {
    for (const entry4 of Object.entries(element4) ){
        if (typeof entry4 !== 'object'){ return; } /** NOOP */
        for (const [key5, element5] of Object.entries(entry4)) {
            switch (getType(element5)){
                case 'array':
                    for (const entry5 of Object.entries(element5) ){
                        if (typeof entry5 !== 'object'){ return; } /** NOOP */
                        for (const [key6, element6] of Object.entries(entry5)) {
                            switch (getType(element6)){
                                case 'array':
                                    updateArrayDeep(element6, type);
                                    break;
                                // case 'object': break; // NOOP ?
                                default:
                                    updatePrimitives(entry5, key6, type);
                            }
                        }
                    }
                    break;
                // case 'object': break; // NOOP ?
                default:
                    updatePrimitives(entry4, key5, type);
            }
        }

    }
};
const updateArrayDeep = (element6, type) => {
    for (const entry6 of element6 ){
        if (typeof entry6 !== 'object'){ return; } /** NOOP */
        for (const [key7, element7] of Object.entries(entry6)) {
            switch (getType(element7)){
                // case 'object': break; // NOOP ?
                case 'array':
                    for (const entry8 of Object.entries(element7) ){
                        if (typeof entry8 !== 'object'){ return; } /** NOOP */
                    }
                    break;
                default:
                    updatePrimitives(entry6, key7, type);
            }
        }
    }
};

const updateSettingsAndValue = (type, node, key) => {
    const value = node[key];
    if (value){
        switch (typeof value){
            case 'string':
                node[key] = updateStringValue(value, type);
                updateSettingsAndKey('keys', node[key], key);
                break;
            case 'number':
                node[key] = updateStringValue(value, 'values');
                updateSettingsAndKey('keys', node[key], key);
                break;
            case 'object':
                const keys = Object.keys(value);
                if (keys.length === 1 && keys[0].indexOf('$') === -1){
                    if (typeof value[keys[0]] !== 'object'){
                        if (typeof value[keys[0]] === 'number'){
                            const prefix = 'values';
                            const index = updateSettings(prefix, value[keys[0]]);
                            node[key][keys[0]] = PREFIXES[prefix] + index;
                            updateSettingsAndKey('keys', node[key], keys[0]);
                        }
                    }
                } else {
                    keys.forEach(keyValue => {
                        const isStringValue = (typeof value[keyValue] === 'string' && value[keyValue].indexOf('$') === -1);
                        if (isNaN(value[keyValue]) === false || isStringValue){
                            // updatePrimitives(value, keyValue, type);
                            return false;
                        } else {
                            const object1 = value[keyValue];
                            if (typeof object1 !== 'object'){ return; } /** NOOP */
                            Object.entries(object1).forEach(([key1, entries1]) => {
                                switch (getType(entries1)){
                                    case 'array':
                                    // TODO: need to be fixed
                                        for (const entry1 of Object.entries(entries1)) {
                                            switch (getType(entry1)){
                                                case 'array':  // TODO
                                                    break;
                                                case 'object':
                                                    Object.entries(entry1).forEach(([key2, element2]) => {
                                                        switch (getType(element2)){
                                                            case 'array':
                                                                for (const entry2 of Object.entries(element2) ){
                                                                    if (typeof entry2 !== 'object'){ return; } /** NOOP */
                                                                    Object.entries(entry2).forEach(([key3, element3]) => {
                                                                        switch (getType(element3)){
                                                                            case 'array':
                                                                                for (const entry3 of Object.entries(element3) ){
                                                                                    if (typeof entry3 !== 'object'){ return; } /** NOOP */
                                                                                    for (const [key4, element4] of Object.entries(entry3)) {
                                                                                        switch (getType(element4)){
                                                                                            case 'array':
                                                                                                processArray(element4, type);
                                                                                                break;
                                                                                            // case 'object': break; // NOOP ?
                                                                                            default:
                                                                                                updatePrimitives(entry3, key4, type);
                                                                                        }
                                                                                    }
                                                                                }
                                                                                break;
                                                                            // case 'object': break; // NOOP ?
                                                                            default:
                                                                                updatePrimitives(entry2, key3, type);
                                                                        }
                                                                    });
                                                                }
                                                                break;
                                                            case 'object':   break;
                                                            default:
                                                                updatePrimitives(entry1, key2, type);
                                                        }
                                                    });
                                                    break;
                                                default:
                                                    // noop
                                            }
                                        }
                                        break;
                                    case 'object':  break;
                                    default:
                                        if (typeof entries1 === 'string' && entries1.indexOf('$') !== 0){
                                            object1[key1] = updateStringValue(entries1, type);
                                            if (key1.indexOf('$') !== 0 && Array.isArray(object1) === false){
                                                updateSettingsAndKey('keys', object1, key1);
                                            }
                                        }
                                        if (typeof entries1 === 'number'){
                                            object1[key1] = updateStringValue(entries1, 'values');
                                        }
                                        // updatePrimitives(object1, key1, type);
                                }
                            });
                            // let index = updateSettings(prefix, value[key]);
                            // node[key][keyValue] = PREFIXES[prefix]+ index;
                            // updateSettingsAndKey('keys', node[key], keyValue);
                        }
                    });

                }
                break;
            default:
        }
    }
};
const updateSettingsAndKey = (type, node, key) => {
    if (key.indexOf('$') === -1){
        const index = updateSettings(type, key);
        if (key.length > 2 ){
            node[`${PREFIXES[type]}${index}`] = node[key];
            delete node[key];
        }
    }
};
const optimizeNodeBy = (node, type, isUpdateValue) => {
    const properties = Object.keys(node);
    properties.forEach(property => {
        if (node){
            isUpdateValue === true ? updateSettingsAndValue(type, node, property) : updateSettingsAndKey(type, node, property);
        }
    });
};
const optimizeAudits = (base, name,  deleteID, type ) => {
    LOG('newline', ` - ${name}`);
    const audits = Object.keys(base[name]);
    audits.forEach(auditKey => {
        const audit = base[name][auditKey];
        if (deleteID === true) { delete audit.id; }
        const allKeys = Object.keys(audit);
        allKeys.forEach(key => {
            if (KEYS.indexOf(key) === -1){
                if (Array.isArray(audit[key]) && audit[key].length === 0){
                   delete audit[key];
                }
            }
        });

        if (audit.details){
            //  TODO: otpimize more
            deleteDetailNode(audit.details, 'headings');
            deleteDetailNode(audit.details, 'items');
            deleteDetailNode(audit.details, 'nodes');
            deleteDetailNode(audit.details, 'chains');
            optimizeNode('details', audit.details);

        }
        KEYS.forEach(key => {
            // remove nullish
            if (audit.score !== undefined && audit.score === null){
                delete audit.score;
            }
            updateSettingsAndValue(type, audit, key);
            // TODO:  updateSettingsAndKey(type, audit, key);
        });
    });
};

const optimizeRefs = (node, type) => {
    if (settings[type] === undefined){
        settings[type] = [];
    }
    (node).forEach((element) => {
        const relevantAudits = element.relevantAudits;
        const optimizedAudits = [];
        if (relevantAudits){
            relevantAudits.forEach(auditID => {
                let newKey = settings[type].indexOf(auditID);
                if (newKey === -1){
                    newKey = settings[type].push(auditID) - 1;
                }
                const prefix = PREFIXES[type];
                optimizedAudits.push(`${prefix}${newKey}`);
            });
            element.relevantAudits = optimizedAudits;
        }
    });
};

(async () => {
    // TODO: rewrite to new host
    const hostUrl = 'https://black-water-05ac71003-19.westeurope.azurestaticapps.net';
    const hosts = [
        // {id: 0, name: 'HOME (m)', path: `${hostUrl}`, strategy: 'mobile'},
        {id: 1, name: 'HOME (d)', path: `${hostUrl}`, strategy: 'desktop'},
        // {id: 2, name: 'ngconf-2021 (m)', path: `${hostUrl}/workshops/ngconf-2021`, strategy: 'mobile'},
        {id: 3, name: 'ngconf-2021 (d)', path: `${hostUrl}/workshops/ngconf-2021`, strategy: 'desktop'},
    ];
    await asyncForEach(hosts, async (host, index) => {
        const data = await getData(host, process, index);
        delete data.lighthouseResult.audits['final-screenshot'].details;
        delete data.lighthouseResult.audits['screenshot-thumbnails'].details;
        delete data.lighthouseResult.audits['full-page-screenshot'].details;

        LOG('ok', 'optimize data', '🧹');
        optimizeAudits(data.lighthouseResult, 'audits', true, 'auditValues');
        optimizeAudits(data.lighthouseResult.categories, 'performance', true, 'performance');

        optimizeAudits(data.lighthouseResult, 'categoryGroups', false, 'categoryGroups');
        optimizeAudits(data.lighthouseResult.categories.performance, 'auditRefs', false, 'auditRefs');

        optimizeRefs(data.lighthouseResult.categories.performance.auditRefs, 'audits');

        optimizeNodeKeys(data.lighthouseResult.audits, 'auditKeys');
        optimizeNodeKeys(data.lighthouseResult.categories.performance.auditRefs, 'keys');
        optimizeNodeKeys(data.lighthouseResult.categoryGroups, 'keys');

        optimizeNodeBy(data.lighthouseResult.environment, 'base', true);
        optimizeNodeBy(data.lighthouseResult, 'base', true);

        optimizeNodeBy(data.lighthouseResult.audits, 'audits', false);
        optimizeNodeBy(data.lighthouseResult.categoryGroups, 'categoryGroupsCats', false);

        optimizeNode('rendererFormattedStrings', data.lighthouseResult.i18n.rendererFormattedStrings);
        data.commit = { msg: lastCommitMsg, sha: lastCommitSha};
        console.log(data.commit);
        addAudit(allAudits, data, host);
    });
    settings._prefixes = PREFIXES;
    const finalSettings = JSON.stringify(settings);

    _writeFile(ALL_AUDITS, 'all audits',  JSON.stringify( allAudits) ); // , { flag: 'a+' });
    _writeFile(SETTINGS, 'settings',  finalSettings, {} ); // overwrite

    // decode
    const decodedAudits = JSON.stringify(allAudits);
    // Object.entries(PREFIXES).forEach(([key, placeholder]) => {
    //     if (settings[key] ){
    //         for (let value of settings[key] ){
    //             const index = settings[key].indexOf(value);
    //             const regex = new RegExp('\"\\' + placeholder + index + '\"', 'g');
    //             if ( key === 'valuePlaceholders'){
    //                 value = value.replace(/\"/g, '\\"');
    //                 value = value.replace(/\n/g, '');
    //             }
    //             decodedAudits = decodedAudits.replace(regex, '"' + value + '"');
    //         }
    //     }
    //     // }
    // });
    let newData = '<table>';
    // console.log(decodedAudits);
    const decodedData = JSON.parse(decodedAudits);
    // TODO: fix
    // Object.entries(decodedData).forEach(([url, value]) => {
    //     console.log(url);
    //     Object.entries(value).forEach(([plattform, value2]) => {
    //         console.log(plattform);
    //         Object.entries(value2).forEach(([timestamp, data]) => {
    //             let audit: Audit = data;
    //             console.log('data');
    //             console.log(Object.keys(data));
    //             const commitMsg = data && data.commit  ? data['commit'].msg : '';

    //             newData += `<tr>
    // <td>${commitMsg}</td>
    // <td>${url}</td>
    // <td>${plattform}</td>
    // <td>${timestamp}</td><td>${data['categories'].performance.score}</td>
    // </tr>`;
    //         });
    //     });
    // });
    newData += '</table>';
    html = html.replace(/\{\{APP\}\}/, newData);
    _writeFile(DECODED, 'write decoded.json', decodedAudits);
    _writeFile(HTML, 'write index.html', html);
})();
