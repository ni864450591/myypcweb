// 新增
import {
  ERROR_HTTP_CODE,
  ERROR_NETWORK,
  ERROR_TIMEOUT,
  ERROR_ABORT,
  ERROR_HTTP_CODE_TEXT,
  ERROR_NETWORK_TEXT,
  ERROR_TIMEOUT_TEXT,
  ERROR_ABORT_TEXT
} from './constants.js';
import Ajax from './ajax.js';

// 新增
const ajax = (url, options) => {
  let xhr;
  const promise = new Promise((resolve, reject) => {
    xhr = new Ajax(url, {
      ...options,
      ...{
        success(response) {
          resolve(response);
        },
        httpCodeError(status) {
          reject({
            type: ERROR_HTTP_CODE,
            text: `${ERROR_HTTP_CODE_TEXT}：${status}`
          });
        },
        error() {
          reject({
            type: ERROR_NETWORK,
            text: ERROR_NETWORK_TEXT
          });
        },
        abort() {
          reject({
            type: ERROR_ABORT,
            text: ERROR_ABORT_TEXT
          });
        },
        timeout() {
          reject({
            type: ERROR_TIMEOUT,
            text: ERROR_TIMEOUT_TEXT
          });
        }
      }
    }).getXHR();  //获得里面的xhr对象
  });

  promise.xhr = xhr;             //ajax{  promise{xhr}}
  promise.ERROR_HTTP_CODE = ERROR_HTTP_CODE;
  promise.ERROR_NETWORK = ERROR_NETWORK;
  promise.ERROR_TIMEOUT = ERROR_TIMEOUT;
  promise.ERROR_ABORT = ERROR_ABORT;

  return promise;
};

const get = (url, options) => {
  return ajax(url, { ...options, method: 'GET' });  //通过get的方法发送数据
};

const getJSON = (url, options) => {
  return ajax(url, { ...options, method: 'GET', responseType: 'json' });  //通过get的方法获得JSON数据
};

const post = (url, options) => {
  return ajax(url, { ...options, method: 'POST' });   //通过post方法发送数据
};

export { ajax, get, getJSON, post };
