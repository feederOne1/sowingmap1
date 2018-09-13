//点击-->切换图片（改变left） 自动轮播 -->（left）
//点解btn按钮和小圆点切换图片
//nowIndex --->prevBtn (nowindex--) --> nextBtn (nowindex ++)
//li --> $(this).index()
//自动播放 --> 隔一段时间点击nextBtn

var nowIndex = 0,
    len = 5,
    key = true,
    timer = null,
    itemWidth = 400;
init();
function init(){
    bindEvent();
    sliderAuto();
}
function bindEvent(){
    $('.prevBtn')
    .add($('.nextBtn'))
    .add($('.order li'))
       .on('click',function(){
        if($(this).attr('class') == 'prevBtn'){
            move('prev')
        }else if($(this).attr('class') == 'nextBtn'){
            move('next')
        }else{
            move($(this).index());
        }   
    })
    $('.wrapper').on('mouseenter',function(){
        $('.btn').show();
        clearTimeout(timer);
    }).on('mouseleave',function(){
        $('.btn').hide();
        sliderAuto();
    });
}
function move(dir){
    if(key){
        key = false;
        if(dir == 'prev' || dir == 'next'){
            if(dir == 'prev'){
                if(nowIndex == 0){
                    $('.img-box').css('left',-(len * itemWidth));
                    nowIndex = len - 1;
                }else{
                    nowIndex --;
                }
            }else{
                if(nowIndex == 4){
                    $('.img-box').animate({
                        'left' : -(len * itemWidth)
                    },function(){
                        $('.img-box').css('left','0');
                    });
                    nowIndex = 0;
                }else{
                    nowIndex ++;
                }
            }
        }else{
            nowIndex = dir;
        }
        
        slider();
        changeStyle();
    }
    
}
function slider(){
    $('.img-box').animate({
        'left' : -(nowIndex * itemWidth)
    },function(){
        sliderAuto();
        key = true;
    })

}
function changeStyle(){
    $('.active').removeClass('active');
    $('.order li').eq(nowIndex).addClass('active');
}
function sliderAuto(){
    clearInterval(timer);
    timer = setInterval(function(){
        move('next')
    },1500);
    // clearTimeout(timer);
    // timer = setTimeout(function(){
    //     move('next');
    // },1000);
}