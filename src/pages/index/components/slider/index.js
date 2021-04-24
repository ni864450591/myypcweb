import './slider.css';
import './btn.css';

import Slider from './module/index.js';
import render from './slider.art';
import { getData, getDelayedData } from 'api/getData';
import {URL} from './config.js'

const layoutEl = document.getElementById('slider-layout');

//接口验证
getData(URL).then(data => {
  // console.log(data);
  // [ {url: "http://alimc}]
  //把他当成一个函数往里面传参数
  layoutEl.innerHTML = render({
    items: data
  })

//实例化子类
const slider = new Slider(document.querySelector('.slider'), {
  initialIndex: 0,
  animation: true,
  // 切换速度，单位 ms
  speed: 300,
  // 自动切换，单位 ms
  autoplay: 0
});

const bannerEl = document.getElementById('banner');
const leftbtnEl = document.getElementById('leftbtn');
const rightbtnEl = document.getElementById('rightbtn');
const circles = document.querySelectorAll('#circles li');

leftbtnEl.addEventListener(
  'click',
  () => {
    slider.prev();
    setCircle();
  },
  false
);
rightbtnEl.addEventListener(
  'click',
  () => {
    slider.next();
    setCircle();
  },
  false
);

bannerEl.addEventListener(
  'mouseenter',
  () => {
    slider.pause();
  },
  false
);
bannerEl.addEventListener(
  'mouseleave',
  () => {
    slider.autoplay();
    setCircle();
  },
  false
);



function setCircle() {
  for (var i = 0; i < circles.length; i++) {
      circles[i].className = '';
  }
  circles[slider.currIndex % 5].className = 'cur';
}

// 小圆点的监听
for (var i = 0; i < circles.length; i++) 
{
  (function (i) 
  {
      circles[i].onclick = function ()
       {
        slider.to(i);
        setCircle();
      }
  }
  )(i);
}
});
