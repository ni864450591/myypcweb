import './tsddty.css';
import {URL}  from './config.js';
import {getData} from 'api/getData';
import render from './items.art';


const layoutEl=document.querySelector('.tsddty .bd')


getData(URL).then(data=>{
    layoutEl.innerHTML=render({items:data});
}).catch(err=>{
    console.log("无法获取特色当地体验的信息");
})