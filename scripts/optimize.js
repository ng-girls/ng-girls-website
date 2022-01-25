const fs = require('fs');
let data = fs.readFileSync('dist/static/index.html',
{encoding:'utf8', flag:'r'});

const regex = /(<script\ssrc.*<\/script>)/;
const styles = /(<link\srel="stylesheet"[^\>]*)/
const regexOptimized = /(<script\sid="optimized"\ssrc.*<\/script>)/
let m = data.match(regex);
let allES5 = '';
let allES6 = '';
if(styles){
    let style = data.match(styles);
    console.log(style[1]);
    // <link rel="stylesheet" href="styles.315effb89cdf9675a6b4.css"
    let styleID = style[1].match(/href="([^\"]*)"/)[1];
    console.log(styleID);
    let newStyles = style[1];
    // newStyles = newStyles.replace('>', '></noscript>' );
    newStyles = newStyles.replace('<link rel="stylesheet"', `<link rel="preload" href="${styleID}" as="style" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" `);
    newStyles = newStyles.replace('.css"><style>', '.css"></noscript><style>' );
console.log(newStyles);
data = data.replace(style[1], newStyles);

}
if(!m){
    console.log('cant find inout')
} else {
    let replaceable = m[1];
    const scripts = replaceable. split('><');
    scripts.forEach(script => {
        let x = script.match(/.*src="([^\"]*)\".*/);
        // let file = x[1];
        if(x && x.length > 1){
            file = x[1];
            let d = fs.readFileSync(`dist/static/${file}`,
            {encoding:'utf8', flag:'r'});
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
    fs.writeFileSync('dist/static/all-es5.js', allES5, {encoding:'utf8'});
    fs.writeFileSync('dist/static/all-es6.js', allES6, {encoding:'utf8'});
    data = data.replace(replaceable, `<script id="optimized" src="all-es6.js" type="module"></script><script src="all-es5.js" nomodule="" defer=""></script>`)

}
var n =data.match(regexOptimized);
if(n && n[1]){
    console.log('code is optimized');
}
fs.writeFileSync('dist/static/index.html', data, {encoding:'utf8'});