import{mimePreset}from'../edx_mime-presets/mime-presets.js';const failureMessage='Please tell liledix4 that something is wrong with AJAX. Thank you!';function xhrDefaults(e){return e.method||(e.method='GET'),e.mime||(e.mime=mimePreset.html),e.async||(e.async=!0),e.contentCharset||(e.contentCharset='UTF-8'),e.contentType||(e.contentType=`${e.mime}; charset=${e.contentCharset}`),e}export function readTextFile(e,t){e=xhrDefaults(e);const n=new XMLHttpRequest;n.overrideMimeType(e.mime),n.open(e.method,e.url,e.async),e.headers&&e.headers.forEach((e=>{void 0!==e&&n.setRequestHeader(e.name,e.value)})),n.onerror=function(){},n.onreadystatechange=function(){4===n.readyState&&'200'==n.status&&t(n.responseText)},n.send(null)}