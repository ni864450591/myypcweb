var backtotop = document.getElementById('backtotop');
backtotop.style.display = 'none';
backtotop.onclick = function(){
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}
window.onscroll = function () {
    // 卷动值
    var scrollTop = document.documentElement.scrollTop || window.scrollY;

    // 页面没有卷动，那么返回顶部按钮就隐藏掉
    if (scrollTop == 0) {
        backtotop.style.display = 'none';
    } else {
        backtotop.style.display = 'block';
    }
}
