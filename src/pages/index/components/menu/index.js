import menu_fn from './menu.js';
import './menu.css';


import{URL1} from './config.js';
import {getData} from 'api/getData';
import render from './menu1.art';
const layoutEL1=document.querySelector('.v-menu-box .v-menu');


getData(URL1).then(data=>{
    layoutEL1.innerHTML=render({
        data:data
    });
    menu_fn();
}).catch(err=>{
    console.log('无法获取一级菜单的内容');
})