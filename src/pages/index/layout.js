(function(){
    var hd_lis=document.querySelectorAll('.layer .hd .tabbar ul li');
    for(var i=0;i<hd_lis.length;i++)
    {
        (function(i){
            hd_lis[i].onmouseenter=function(){
                for(var j=0;j<hd_lis.length;j++)
                {
                    hd_lis[j].className='';
                }
                hd_lis[i].className='current';
            }
        })(i);
    }
})();