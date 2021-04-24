import './jjzyx.css';
//类似于函数传参
import render from './items.art';
//修改起来比较方便
import { URL } from './config';
//用getData将getJOSN封装起来
import { getData } from 'api/getData';


const layoutEl = document.querySelector('.jjzyx .bd');

getData(URL).then(data => {
  layoutEl.innerHTML = render(data);

}).catch(err => {
  console.log(err);
});

