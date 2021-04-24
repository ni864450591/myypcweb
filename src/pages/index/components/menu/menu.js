import render2 from './menu2.art';
import {getData} from 'api/getData';


const layoutEl2=document.querySelector('.v-menu-box .menus');
// 垂直菜单的实现
var menu_fn=function(){
    // 得到所有菜单触碰项li标签
    var menu_lis = document.querySelectorAll('#v-menu li[data-n]');
    // 得到vmenubox盒子
    var vmenubox = document.querySelector('#v-menu-box');
    // 批量添加监听
    for (var i = 0; i < menu_lis.length; i++) {
        (function (i) {
            // 鼠标触碰某个菜单项
            menu_lis[i].onmouseenter = function () {

                // // 让所有菜单隐藏，去掉active类
                for (var j = 0; j < menu_lis.length; j++) {
                    menu_lis[j].className = '';
                }
                // 让序号相同的菜单项添加menu类
                menu_lis[i].className = 'active';

                 var type=menu_lis[i].getAttribute("data-n");
                 getData(`https://www.imooc.com/api/mall-PC/index/menu/${type}`).then(data=>{
                        layoutEl2.innerHTML=render2({
                            type:type,
                            items:data
                        });
                        
                        var menus = document.querySelector('#menus .menu');
                        menus.className = 'menu active';
                 });
                
            }
        })(i);
    }

    // 鼠标离开整个vmenubox盒子
    vmenubox.onmouseleave = function () {

        var menus = document.querySelector('#menus .menu');
        menus.className='menu';
}
}


export default menu_fn;