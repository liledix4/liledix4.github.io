import { mime } from '../js_mime_presets/mime_presets.js';

const failureMessage = 'Please tell liledix4 that something is wrong with AJAX. Thank you!';

/**
 *
 *
 * @param {object} xhrRequest
 * @return {object} Same `xhrRequest` object, but with additional data that was missing.
 * @since 0.1
 */
function xhrDefaults(xhrRequest) {
    if (!xhrRequest.method) {
        xhrRequest.method = 'GET';
    }
    if (!xhrRequest.mime) {
        xhrRequest.mime = mime.html;
    }
    if (!xhrRequest.async) {
        xhrRequest.async = true;
    }
    if (!xhrRequest.contentCharset) {
        xhrRequest.contentCharset = 'UTF-8';
    }
    if (!xhrRequest.contentType) {
        xhrRequest.contentType = `${xhrRequest.mime}; charset=${xhrRequest.contentCharset}`;
    }
    return xhrRequest;
}

/**
 *  ----
 *
 *  @example
 *  // Shortest
 *  readTextFile( { url: './file.json' }, content => { console.log( content ) } );
 *
 *  // More complex
 *  readTextFile(
 *      {
 *          url: './path/to/file.json',
 *          method: 'GET',
 *          mime: mime.json
 *      },
 *      fileContent => {
 *          console.log( fileContent );
 *      }
 *  );
 *  @param {{
 *      url: String,
 *      headers?: Array.<{
 *          name: String,
 *          value: String
 *      }>,
 *      method?: String,
 *      mime?: String,
 *      async?: Boolean,
 *      contentCharset?: String,
 *      contentType?: String
 *  }} xhrRequest
 *  | Required | Object key | Purpose |
 *  | -------: | :--------- | :------ |
 *  | ⚠️ | `xhrRequest.url` | Path to the file you get using XMLHttpRequest |
 *  |   | `xhrRequest.headers[]` | Array with [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader) for sending to the server. By default, there are none |
 *  | 🟢 | `xhrRequest.headers[].name` | Name of HTTP header |
 *  | 🟢 | `xhrRequest.headers[].value` | Value of HTTP header |
 *  |   | `xhrRequest.method` | [HTTP request method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods). Default is `GET` |
 *  |   | `xhrRequest.mime` | [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml). *MIME presets* can be used. Default is `application/x-www-form-urlencoded` |
 *  |   | `xhrRequest.async` | [Asynchronous performing of operation](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open#async). Default is `true` |
 *  |   | `xhrRequest.contentCharset` | Content charset. Default is `UTF-8` |
 *  |   | `xhrRequest.contentType` | A combination of MIME type and content charset, however you can customize it to your needs |
 *  @param {() => void} callback Your custom function that is executed after successful fetching of data
 *  @returns {void}
 *  @description Get the contents of file or perform other operations using XMLHttpRequest.
 *
 *  ----
 *
 *  @author [liledix4 🎸](https://liledix4.github.io)
 *  @version 0.1.1
 *  @license Apache-2.0
 */
export function readTextFile(xhrRequest, callback) {
    xhrRequest = xhrDefaults(xhrRequest);
    const xhr = new XMLHttpRequest(); // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/XMLHttpRequest

    xhr.overrideMimeType(xhrRequest.mime); // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/overrideMimeType
    xhr.open( // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open
        xhrRequest.method,  // method
        xhrRequest.url,     // url
        xhrRequest.async    // async
    );
    if (xhrRequest.headers) {
        xhrRequest.headers.forEach(header => {
            if (header !== undefined) {
                xhr.setRequestHeader(
                    header.name,
                    header.value
                );
            }
        });
    }
    xhr.onerror = function() {
        console.error(failureMessage);
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status == '200' && callback)
                callback(xhr.responseText);
            else
                console.log('XHR status: %d', parseInt(xhr.status));
        }
    }
    xhr.send(null); // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send
}