import './ddwl.css';
import render from './items.art';
import {URL} from './config.js';
import {getData} from 'api/getData';

const layoutEl=document.querySelector('.ddwl .bd');
getData(URL).then(data=>{
    layoutEl.innerHTML=render(data);
}).catch(err=>{
    console.log("无法获取当地玩乐的信息");
})
