import './zsj.css';

import {URL} from './config.js';
import render from './items.art';
import {getData} from 'api/getData';

const layoutEl=document.querySelector('.zsj .bd');

getData(URL).then(data=>{
    layoutEl.innerHTML=render(data);
}).catch(err=>{
    console.log('无法获取最世界的信息');
})
