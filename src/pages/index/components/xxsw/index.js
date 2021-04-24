import './xxsw.css';

import render from './items.art';
import {URL} from './config.js';
import {getData} from 'api/getData';

const layoutEl=document.querySelector('.xxsw .bd')
getData(URL).then(data=>{
    layoutEl.innerHTML=render({items:data});
}).catch(err=>{
console.log('无法获取新鲜甩尾的图片');
})