const {registerPlugin, configValidator, logWarn, yellow} = require('@scullyio/scully');
const {JSDOM} = require('jsdom');

function wrap(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}
const addFlex = async (html, options) => {
  try {
    const dom = new JSDOM(html);
    const {window} = dom;
    // detect if h1, h2 or h3 first, normalize others
    const anchors = [...window.document.querySelectorAll('h3')];
    // TODO: h3, h2
    const paragraphs =  [...window.document.querySelectorAll('p, h4, ul')];
    let lenParagraphs = paragraphs.length;
    // anchors.forEach(a => {
      anchors.forEach((a, index) => {
        let flexChild = window.document.createElement('flex-child');
        flexChild.setAttribute('flexid', index.toString());
        wrap((a), flexChild);
        let isGroup = false;
        let groupNodes = [];
      // let group = false;
      let flexGroup = false;
      for(let i = 0; i < lenParagraphs; i++){
        if(!isGroup){
          flexGroup = window.document.createElement('flex-group');
          flexChild.append(flexGroup);
        }
        let flex1 = window.document.querySelectorAll('[flexid="'+ index +'"] + p, [flexid="'+ index +'"] + ul, [flexid="'+ index +'"] + h4');
        lenParagraphs--;
        if(flex1 && flex1[0]){
          let block = flex1[0];
          if(block.innerHTML.indexOf('[flex:50%]') !== -1 && !isGroup){
            isGroup = true;
            block.innerHTML = block.innerHTML.replace('[flex:50%]', '');
            flexGroup.setAttribute('flex-width', '50%')
          } else if(block.innerHTML.indexOf('[flex:end]') !== -1){
            isGroup = false;
            block.innerHTML = block.innerHTML.replace('[flex:end]', '');
          } 

          block.setAttribute('flex-item', i);
          flexGroup.append(block);
        } else {
          break;
        }
      }
    });
    return dom.serialize();
  } catch (e) {
    logWarn(`error in addFlex, didn't parse for route "${yellow(route.route)}"`);
  }
  // in case of failure return unchanged HTML to keep flow going
  return html;
};

const validator = async config => [];
registerPlugin('render', 'addFlex', addFlex, validator);