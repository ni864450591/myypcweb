import './fav-ad.css'


import render from './fav-ad.art';
import{URL} from './config.js';
import{getData} from 'api/getData';

const layoutEl=document.querySelector('.fav-ad-layout');

getData(URL).then(data=>{
    //console.log(data);
    layoutEl.innerHTML = render({
        items: data
      })
    
}).catch(err=>{
    console.log("无法获取广告部分的图片");
})